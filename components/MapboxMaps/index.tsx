import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { AutoComplete, Button, Input, Modal, Space, notification, } from 'antd';
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { setShowMap, setUserDirection, setUserLocation } from '@/store/places/placesSlice';
import { getUserLocation } from '@/utils/getUserLocation';
import styles from './styles.module.scss';

const libraries: Libraries = ["places"];

export const MapboxMaps = () => {
  const { userLocation, isMapVisible } = useSelector((state: any) => state.places)
  const [selectedPlaces, setSelectedPlaces] = useState('')
  const router = useRouter()
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

  const options = status === "OK" ? data.map(({ place_id, description }) => ({ value: description, key: place_id })) : [];

  if (!isLoaded) return null;
  if (loadError) return <div>Error loading</div>;

  return (
    <Modal
      title='Agregar nueva dirección'
      style={{ top: 20 }}
      open={isMapVisible}
      onCancel={() => dispatch(setShowMap(false))}
      onOk={() => {
        dispatch(setUserDirection(selectedPlaces))
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
    </Modal>
  )
}