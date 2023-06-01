export type CoordinatesString = {
  coordinates: string;
};
export type CoordinatesType = {
  lat: number;
  lng: number;
};

export type CarparkType = {
  ppCode: string;
  ppName: string;
  parkCapacity: number;
  geometries: Array<CoordinatesString>;
};

export type SearchFormType = {
  address: string;
};
