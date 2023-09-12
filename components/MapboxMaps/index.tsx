import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { Alert, AutoComplete, Button, Input, Modal, Space, notification, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { setShowMap, setUserDirection, setUserLocation } from '@/store/places/placesSlice';
import { getUserLocation } from '@/utils/getUserLocation';
import styles from './styles.module.scss';
import { parseCookies, setCookie } from "nookies";

export const MapboxMaps = () => {
  const { userLocation, isMapVisible } = useSelector((state: any) => state.places)
  const [selectedPlaces, setSelectedPlaces] = useState('')
  const [options, setOptions] = useState([]);
  const cookies = parseCookies();
  const router = useRouter()
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
    if (!address || !location) return

    const MAX_ADDRESSES = 5;

    let addresses = cookies.userAddresses ? JSON.parse(cookies.userAddresses) : [];

    // Filtrar direcciones existentes para evitar duplicados
    addresses = addresses.filter((item: any) => item.userDirection !== address);

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
    // Obtener las direcciones guardadas de las cookies
    const userAddresses = cookies.userAddresses ? JSON.parse(cookies.userAddresses) : [];

    // Crear las opciones de usuario solo si hay direcciones guardadas
    const userOptions = userAddresses.map(({ userDirection }: { userDirection: string }) => ({
      value: userDirection,
      label: userDirection,
    }));

    const userAddressesOption: any = {
      label: 'Mis direcciones',
      options: userOptions,
    };

    // Actualizar las opciones de selección
    const updatedOptions: any = [...data.map(({ place_id, description }) => ({ value: description, key: place_id }))];

    if (userOptions.length > 0) {
      updatedOptions.push(userAddressesOption);
    }

    // Actualizar las opciones en el estado
    setOptions(updatedOptions);
  }, [data]);

  // const options = status === "OK" ? data.map(({ place_id, description }) => ({ value: description, key: place_id })) : [];

  // if (!isLoaded) return null;
  // if (loadError) return <div>Error loading</div>;

  return (
    <Modal
      title='Agregar nueva dirección'
      style={{ top: 20 }}
      open={isMapVisible}
      onCancel={() => dispatch(setShowMap(false))}
      onOk={() => {
        dispatch(setUserDirection(selectedPlaces))
        saveUserAddress(selectedPlaces, userLocation)
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
      <Alert message="Si no encuentra  su dirección exacta, recuerde que siempre tendrá la opción de modificarla al final del pedido." type="info" closable />
    </Modal>
  )
}