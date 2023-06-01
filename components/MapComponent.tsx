'use client';
import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import SearchBar from './SearchBar';
import ParkingList from './ParkingList';
import Map from './Map';
import { CarparkType, CoordinatesType } from 'types/types';
import { filterCarparks } from 'utils/utils';

const RADIUS_TO_FILTER = 3;

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

const libraries: (
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'places'
  | 'visualization'
)[] = ['places'];

interface MapComponentProps {
  allCarparks: CarparkType[];
}

const MapComponent = ({ allCarparks }: MapComponentProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'NO_API_KEY',
    libraries: libraries,
  });

  const [carparks, setCarparks] = useState<CarparkType[]>([]);
  const [coordinates, setCoordinates] = useState<CoordinatesType>();

  if (coordinates === null) {
    setCoordinates({ lat: 1.3139946, lng: 103.6794405 });
  }

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
    setLiveLocation();
  }, []);

  useEffect(() => {
    if (coordinates !== undefined) {
      const filteredCarparks = filterCarparks(
        allCarparks,
        coordinates,
        RADIUS_TO_FILTER,
      );
      setCarparks(filteredCarparks);
    }
  }, [allCarparks, coordinates]);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="flex flex-row relative z-0">
      <GoogleMap
        zoom={14}
        center={coordinates}
        mapContainerStyle={containerStyle}
        options={mapOptions}
      >
        <Map carparks={carparks} coordinates={coordinates} />
        <SearchBar setCoordinates={setCoordinates} />
      </GoogleMap>
      <ParkingList carparks={carparks} />
    </div>
  );
};

export default React.memo(MapComponent);
