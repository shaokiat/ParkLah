import React from 'react';
import { CarparkType } from 'types/types';

interface CarparkListProps {
  carparks: CarparkType[];
}

const ParkingList = ({ carparks }: CarparkListProps) => {
  return (
    <div>
      {carparks.map((carpark, i) => (
        <div key={i}>{carpark.ppName}</div>
      ))}
    </div>
  );
};

export default ParkingList;
