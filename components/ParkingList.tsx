import React from 'react';
import { CarparkType } from 'types/types';

interface CarparkListProps {
  carparks: CarparkType[];
}

interface CarparkCardProps {
  carpark: CarparkType;
}

const CarparkCard = ({ carpark }: CarparkCardProps) => {
  const { weekdayRate, weekdayMin, ppName, ppCode, parkCapacity } = carpark;
  return (
    <div className="m-2 mb-4 rounded-md shadow-md">
      <div className="p-1 bg-gray-700 text-white rounded-t-md flex flex-row justify-between text-sm ">
        <h2 className="pl-2">{ppName}</h2>
        <text className="pr-2 ml-2 text-end">{`${parkCapacity} lots`}</text>
      </div>
      <div className="p-2">
        <text className="font-bold text-lg text-bg-gray-700">
          {weekdayRate}
        </text>
        <text className="ml-2">{`per ${weekdayMin}`}</text>
      </div>
    </div>
  );
};

const ParkingList = ({ carparks }: CarparkListProps) => {
  return (
    <div className="h-screen w-[25%] overflow-auto">
      {carparks.map((carpark, i) => (
        <CarparkCard key={i} carpark={carpark} />
      ))}
    </div>
  );
};

export default ParkingList;
