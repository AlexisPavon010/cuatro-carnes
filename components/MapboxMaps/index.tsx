import { useEffect, useRef, useState } from 'react';
import { Alert, AutoComplete, Button, Input, Modal, Space, notification, } from 'antd';
import mapboxgl, { Map, Marker } from 'mapbox-gl'
import { useDispatch, useSelector } from 'react-redux';
import { getUserLocation } from '@/utils/getUserLocation';
import { setShowMap, setUserDirection, setUserLocation } from '@/store/places/placesSlice';
import { MdOutlineLocationOn } from 'react-icons/md';
import { searchApi } from '@/client/Places';
import { useRouter } from 'next/router';

import styles from './styles.module.scss'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export const MapboxMaps = () => {
  const { userLocation, isMapVisible } = useSelector((state: any) => state.places)
  const [selectedPlaces, setSelectedPlaces] = useState('')
  const markerRef = useRef<Marker | any>(null)
  const mapDiv = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>()
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!isMapVisible) return

    if (!mapRef.current) {
      mapRef.current = new Map({
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 14
      })
    }

    markerRef.current = new Marker({
      draggable: true
    })
      .setLngLat(mapRef.current.getCenter())
      .addTo(mapRef.current)

    markerRef.current.on('dragend', () => {
      const lngLat = markerRef.current.getLngLat();
      const { lng, lat } = lngLat
      searchApi
        .get(`${lng},${lat}.json/`, {
          params: {
            proximity: userLocation.join(","),
          },
        })
        .then(({ data }) => {
          setSelectedPlaces(data.features[0].place_name)
        })
    });


  }, [userLocation, isMapVisible])


  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.remove()
        markerRef.current = undefined
      }

      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = undefined
      }
    }
  }, [userLocation, isMapVisible])

  useEffect(() => {
    getUserLocation()
      .then((location) => {
        const [lng, lat] = location
        dispatch(setUserLocation(location))
        searchApi
          .get(`${lng},${lat}.json/`, {
            params: {
              proximity: userLocation.join(","),
            },
          })
          .then(({ data }) => {
            setSelectedPlaces(data.features[0].place_name)
          })
      })
  }, [])

  return (
    <Modal
      title='Agregar nueva dirección'
      style={{ top: 20 }}
      open={isMapVisible}
      onCancel={() => dispatch(setShowMap(false))}
      onOk={() => {
        const lngLat = markerRef.current.getLngLat();
        dispatch(setUserLocation([lngLat.lng, lngLat.lat]))
        dispatch(setUserDirection(selectedPlaces))
        dispatch(setShowMap(false))
        router.push('/products')
      }}
      okText='Selecionar'
      cancelText='Cancelar'
    >
      <CustomSearch
        setSelectedPlaces={setSelectedPlaces}
        selectedPlaces={selectedPlaces}
      />
      <Alert
        style={{ marginBottom: '20px' }}
        message="Puede arrastrar el pin hacia su ubicación"
        type="info"
        closable
      />
      <div className={styles.mapboxgl_map} ref={mapDiv} />
    </Modal>
  )
}

const CustomSearch = ({ setSelectedPlaces, selectedPlaces }: any) => {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout>()
  const dispatch = useDispatch()
  const { userLocation } = useSelector((state: any) => state.places)


  const onQueryChanged = (query: string) => {
    if (query.length === 0) {
      setOptions([]);
      return;
    }
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      console.log(query);
      searchApi
        .get(`${query}.json/`, {
          params: {
            limit: 5,
            proximity: userLocation.join(","),
          },
        })
        .then(({ data }) => {
          console.log(data.features);
          setOptions(
            data.features.map((place: any) => ({
              label: place.place_name,
              value: place.geometry.coordinates,
            }))
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
  };

  const getCurrentPosition = async () => {
    getUserLocation()
      .then((location) => {
        const [lng, lat] = location
        dispatch(setUserLocation(location))
        searchApi
          .get(`${lng},${lat}.json/`, {
            params: {
              proximity: userLocation.join(","),
            },
          })
          .then(({ data }) => {
            setSelectedPlaces(data.features[0].place_name)
          })
      })
      .catch(() =>
        notification.error({
          message: 'No pudimos acceder a tu ubicación',
          placement: 'bottomLeft',
          duration: 3
        })
      )
  }

  const onSelect = (value: string, values: any) => {
    setSelectedPlaces(values.label)
    dispatch(setUserLocation(values.value))
  }

  return (
    <Space.Compact size='large' style={{ width: '100%', marginBottom: '20px' }}>
      <AutoComplete
        value={selectedPlaces}
        style={{ width: '100%' }}
        popupClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={500}
        options={options}
        onSelect={onSelect}
        onSearch={onQueryChanged}
        onChange={(value) => setSelectedPlaces(value)}
      >
        <Input placeholder="Seleccione la dirección de entrega" />
      </AutoComplete>
      <Button loading={loading} onClick={getCurrentPosition} icon={<MdOutlineLocationOn size={24} />} type="default" />
    </Space.Compact>
  )
}