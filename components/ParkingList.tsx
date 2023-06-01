import React from 'react';
import { CarparkType } from 'types/types';

interface CarparkListProps {
  carparks: CarparkType[];
}

const ParkingList = ({ carparks }: CarparkListProps) => {
  return (
    <div className="h-screen overflow-auto">
      {carparks.map((carpark, i) => (
        <div key={i}>{carpark.ppName}</div>
      ))}
    </div>
  );
};

export default ParkingList;
