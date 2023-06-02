'use client';
import React from 'react';
import { Marker, OverlayView } from '@react-google-maps/api';
import { CarparkType, CoordinatesType } from 'types/types';
import { parseCoordinates } from 'utils/utils';

interface CustomMarkerProps {
  lat: number;
  lng: number;
  details: string;
}

interface CarparkListProps {
  carparks: CarparkType[];
  coordinates?: CoordinatesType;
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
    <div className="absolute right-[25px] bottom-[10px] p-1 inline-block text-center font-bold text-[14px] bg-gray-700 text-white rounded-md">
      {details}
    </div>
  </OverlayView>
);

const Map = ({ carparks, coordinates }: CarparkListProps) => {
  return (
    <div className="z-0 w-[75%] h-full">
      {coordinates && (
        <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />
      )}
      {carparks.map((carpark, i) => {
        const coordinate = parseCoordinates(carpark.geometries[0]);
        return (
          <CustomMarker
            key={`${coordinate.lat}${coordinate.lng}${i}`}
            lat={coordinate.lat}
            lng={coordinate.lng}
            details={`${carpark.weekdayRate}`}
          />
        );
      })}
    </div>
  );
};

export default Map;
