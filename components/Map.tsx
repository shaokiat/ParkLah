'use client';
import React from 'react';
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api';
import { CarparkType, CoordinatesType } from 'types/types';
import { parseCoordinates } from 'utils/utils';

interface CustomMarkerProps {
  lat: number;
  lng: number;
  details: string;
}

interface CarparkListProps {
  carparks: CarparkType[];
  currentLocation?: CoordinatesType;
}

const CustomMarker = ({ lat, lng, details }: CustomMarkerProps) => (
  <OverlayView
    position={{ lat, lng }}
    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    getPixelPositionOffset={(width, height) => ({
      x: -(width / 2),
      y: -(height / 2),
    })}
  >
    <div
      style={{
        position: 'absolute',
        display: 'inline-block',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        padding: '4px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
      }}
    >
      {details}
    </div>
  </OverlayView>
);

const Map = ({ carparks, currentLocation }: CarparkListProps) => {
  const containerStyle = {
    width: '75vw',
    height: '100vh',
  };
  const center = currentLocation ? currentLocation : { lat: 44, lng: -80 };
  const markerCoordinates: CoordinatesType[] = carparks.map((carpark) =>
    parseCoordinates(carpark.geometries[0]),
  );
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
      >
        {markerCoordinates.map((coordinate, i) => (
          <Marker
            key={`${coordinate.lat}${coordinate.lng}${i}`}
            position={{ lat: coordinate.lat, lng: coordinate.lng }}
          >
            <CustomMarker
              lat={coordinate.lat}
              lng={coordinate.lng}
              details="parking"
            />
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
