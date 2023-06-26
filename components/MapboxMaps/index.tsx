import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import { useState } from 'react';
import { Alert, AutoComplete, Button, Input, Modal, Space, notification, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLocation } from '@/utils/getUserLocation';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useRouter } from 'next/router';

import { setShowMap, setUserDirection, setUserLocation } from '@/store/places/placesSlice';
import styles from './styles.module.scss'

export const MapboxMaps = () => {
  const { userLocation, isMapVisible } = useSelector((state: any) => state.places)
  const [selectedPlaces, setSelectedPlaces] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  // useEffect(() => {
  //   getUserLocation()
  //     .then((location) => {
  //       const [lng, lat] = location
  //       dispatch(setUserLocation(location))
  //       searchApi
  //         .get(`${lng},${lat}.json/`, {
  //           params: {
  //             proximity: userLocation.join(","),
  //           },
  //         })
  //         .then(({ data }) => {
  //           setSelectedPlaces(data.features[0].place_name)
  //         })
  //     })
  // }, [])

  return (
    <Modal
      title='Agregar nueva dirección'
      style={{ top: 20 }}
      open={isMapVisible}
      onCancel={() => dispatch(setShowMap(false))}
      onOk={() => {
        // const lngLat = markerRef.current.getLngLat();
        // dispatch(setUserLocation([lngLat.lng, lngLat.lat]))
        dispatch(setUserDirection(selectedPlaces))
        dispatch(setShowMap(false))
        router.push('/products')
      }}
      okText='Selecionar'
      cancelText='Cancelar'
    >
      <CustomSearch onSelectAddress={(value) => setSelectedPlaces(value)} />
      <Alert
        style={{ marginBottom: '20px' }}
        message="Puede arrastrar el pin hacia su ubicación"
        type="info"
        closable
      />
    </Modal>
  )
}

interface ISearchBoxProps {
  onSelectAddress: (address: string) => void;
  defaultValue?: string;
}

const libraries: Libraries = ["places"];

const CustomSearch = ({ onSelectAddress, defaultValue = '' }: ISearchBoxProps) => {
  const { isLoaded, loadError } = useGoogleMapsScript({ googleMapsApiKey: "AIzaSyCZ9NKA4zi5wRAYx8UbYXAP_fehw4Vdzw0", libraries, });
  const dispatch = useDispatch()
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300, defaultValue });

  if (!isLoaded) return null;
  if (loadError) return <div>Error loading</div>;

  const handleChange = (value: string) => {
    setValue(value);
    if (value === "") {
      onSelectAddress("");
    }
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelectAddress(address);
    } catch (error) {
      console.error(`😱 Error:`, error);
    }
  };

  const getCurrentPosition = async () => {
    getUserLocation()
      .then((location) => {
        const [lng, lat] = location
        dispatch(setUserLocation(location))
      })
      .catch(() =>
        notification.error({
          message: 'No pudimos acceder a tu ubicación',
          placement: 'bottomLeft',
          duration: 3
        })
      )
  }

  const options = status === "OK" ? data.map(({ place_id, description }) => ({ value: description, key: place_id })) : [];

  return (
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
  )
}