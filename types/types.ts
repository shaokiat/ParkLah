export type CoordinatesString = {
  coordinates: string;
};
export type CoordinatesType = {
  lat: number;
  lng: number;
};

export type CarparkType = {
  weekdayMin: string;
  weekdayRate: string;
  satdayMin: string;
  startTime: string;
  endTime: string;
  ppCode: string;
  ppName: string;
  parkCapacity: number;
  geometries: Array<CoordinatesString>;
};

export type SearchFormType = {
  address: string;
};
