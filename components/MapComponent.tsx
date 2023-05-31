'use client';
import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import SearchBar from './SearchBar';
import ParkingList from './ParkingList';
import Map from './Map';
import { getCarparks } from 'utils/getCarparks';
import { getToken } from 'utils/getToken';
import { CarparkType, CoordinatesType } from 'types/types';

const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'NO_API_KEY',
  });

  const [allCarparks, setAllCarparks] = useState<CarparkType[]>([]);
  const [currentLocation, setCurrentLocation] = useState<CoordinatesType>();

  const getAllCarparks = async () => {
    const token = await getToken();
    // const cookies = new Cookies();
    // cookies.set('token', token, { maxAge: 3600 });

    const carparks = await getCarparks(token);
    setAllCarparks(carparks.slice(0, 10));
  };

  useEffect(() => {
    getAllCarparks();
    // Get the current location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting current location:', error);
      },
    );
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="flex flex-row relative z-0">
      <Map carparks={allCarparks} currentLocation={currentLocation} />
      <SearchBar />
      <ParkingList carparks={allCarparks} />
    </div>
  );
};

export default MapComponent;
