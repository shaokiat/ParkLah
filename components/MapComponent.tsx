'use client';
import React, { useEffect, useState } from 'react';
import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api';
import SearchBar from './SearchBar';
import ParkingList from './ParkingList';
import Map from './Map';
import { getCarparks } from 'utils/getCarparks';
import { getToken } from 'utils/getToken';
import { CarparkType, CoordinatesType } from 'types/types';

const containerStyle = {
  width: '75vw',
  height: '100vh',
};

const mapOptions = {
  mapTypeControl: true,
  mapTypeControlOptions: {
    mapTypeIds: [],
  },
};

const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'NO_API_KEY',
    libraries: ['places'],
  });

  const [allCarparks, setAllCarparks] = useState<CarparkType[]>([]);
  const [coordinates, setCoordinates] = useState<CoordinatesType>();

  if (coordinates === null) {
    setCoordinates({ lat: 1.3139946, lng: 103.6794405 });
  }

  const getAllCarparks = async () => {
    const token = await getToken();
    // const cookies = new Cookies();
    // cookies.set('token', token, { maxAge: 3600 });

    const carparks = await getCarparks(token);
    setAllCarparks(carparks.slice(0, 10));
  };

  const setLiveLocation = () => {
    // Get the current location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting current location:', error);
        throw error;
      },
    );
  };

  useEffect(() => {
    getAllCarparks();
    setLiveLocation();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="flex flex-row relative z-0">
      <GoogleMap
        zoom={14}
        center={coordinates}
        mapContainerStyle={containerStyle}
        options={mapOptions}
      >
        <Map carparks={allCarparks} coordinates={coordinates} />
        <SearchBar setCoordinates={setCoordinates} />
      </GoogleMap>
      <ParkingList carparks={allCarparks} />
    </div>
  );
};

export default MapComponent;
