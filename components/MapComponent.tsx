'use client';
import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import SearchBar from './SearchBar';

const Map = () => {
  const containerStyle = {
    width: '75vw',
    height: '100vh',
  };
  const center = { lat: 44, lng: -80 };
  const mapOptions = {
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: [],
    },
  };
  return (
    <div className="z-0 w-[75%] h-full">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={containerStyle}
        options={mapOptions}
      ></GoogleMap>
    </div>
  );
};

const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'NO_API_KEY',
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="flex flex-row relative z-0">
      <Map />
      <SearchBar />
      <div>Parking List</div>
    </div>
  );
};

export default MapComponent;
