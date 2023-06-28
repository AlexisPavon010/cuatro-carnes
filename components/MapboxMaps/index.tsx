import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { Alert, AutoComplete, Button, Input, Modal, Space, notification, } from 'antd';
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { useRouter } from 'next/router';
import 'mapbox-gl/dist/mapbox-gl.css';

import { setShowMap, setUserDirection, setUserLocation } from '@/store/places/placesSlice';
import { getUserLocation } from '@/utils/getUserLocation';
import styles from './styles.module.scss';
import { parseCookies, setCookie } from "nookies";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
const libraries: Libraries = ["places"];

export const MapboxMaps = () => {
  const { userLocation, isMapVisible } = useSelector((state: any) => state.places)
  const [selectedPlaces, setSelectedPlaces] = useState('')
  const markerRef = useRef<Marker | any>(null)
  const mapDiv = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>()
  const router = useRouter()
  const cookies = parseCookies();
  const { isLoaded, loadError } = useGoogleMapsScript({ googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!, libraries, });
  const dispatch = useDispatch()
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue: '',
    requestOptions: {
      location: {
        lat: () => -34.603722,
        lng: () => -58.381592
      },
      radius: 200
    }
  });

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      dispatch(setUserLocation([lng, lat]))
      setSelectedPlaces(address);
    } catch (error) {
      console.error(`😱 Error:`, error);
    }
  };

  const getCurrentPosition = async () => {
    getUserLocation()
      .then((location) => {
        const [lng, lat] = location
        dispatch(setUserLocation(location))
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}`)
          .then((res) => res.json())
          .then(({ results }) => {
            setValue(results[0].formatted_address)
            setSelectedPlaces(results[0].formatted_address);
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

  const saveUserAddress = (address: string, location: number[]) => {
    const MAX_ADDRESSES = 5;

    let addresses = cookies.userAddresses ? JSON.parse(cookies.userAddresses) : [];

    // Remover la última dirección si ya se alcanzó el límite
    if (addresses.length === MAX_ADDRESSES) {
      addresses.pop();
    }

    // Agregar la nueva dirección al principio del array
    addresses.unshift({ userDirection: address, userLocation: location });

    // Guardar el array de direcciones en las cookies
    setCookie(null, 'userAddresses', JSON.stringify(addresses), {
      maxAge: 30 * 24 * 60 * 60, // 30 días de duración de la cookie
      path: '/',
    });
  };

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

    markerRef.current.on('dragend', async () => {
      const lngLat = markerRef.current.getLngLat();
      const { lng, lat } = lngLat
      // Obtener la dirección utilizando el servicio de geocodificación de Google Maps
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}`);
        const { results } = await response.json()
        setValue(results[0].formatted_address)
        setSelectedPlaces(results[0].formatted_address);
      } catch (error) {
        console.log(error)
        console.log('Error buscando lugar por coordenadas')
      }
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
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}`)
          .then((res) => res.json())
          .then(({ results }) => {
            setValue(results[0].formatted_address)
            setSelectedPlaces(results[0].formatted_address);
          })
      })
  }, [])

  const userAddresses = cookies.userAddresses ? JSON.parse(cookies.userAddresses) : [];
  const userOptions = userAddresses.map(({ userDirection }: { userDirection: string }) => ({
    value: userDirection,
    label: userDirection,
  }));

  const userAddressesOption = {
    label: 'Mis direcciones',
    options: userOptions,
  };

  const options = [
    ...data.map(({ place_id, description }) => ({ value: description, key: place_id })),
    userAddressesOption,
  ];

  if (!isLoaded) return null;
  if (loadError) return <div>Error loading</div>;

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
        saveUserAddress(selectedPlaces, [lngLat.lng, lngLat.lat])
        dispatch(setShowMap(false))
        router.push('/products')
      }}
      okText='Selecionar'
      cancelText='Cancelar'
    >
      <Space.Compact size='large' style={{ width: '100%', marginBottom: '20px' }}>
        <AutoComplete
          value={value}
          onChange={handleChange}
          disabled={!ready}
          className={styles.autocomplete_input}
          options={options}
          onSelect={handleSelect}
        >
          <Input placeholder="Seleccione la dirección de entrega" />
        </AutoComplete>
        <Button loading={false} onClick={getCurrentPosition} icon={<MdOutlineLocationOn size={24} />} type="default" />
      </Space.Compact>
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