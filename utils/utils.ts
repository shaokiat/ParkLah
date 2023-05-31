import proj4 from 'proj4';
import { CoordinatesString, CoordinatesType } from 'types/types';

export function convertToLatLng(x: number, y: number): CoordinatesType {
  const svy21Projection =
    '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs';

  const [longitude, latitude] = proj4(svy21Projection, 'WGS84', [x, y]);
  return { lat: latitude, lng: longitude };
}

export const parseCoordinates = (
  coordinates: CoordinatesString,
): CoordinatesType => {
  const coord = coordinates.coordinates.split(',');
  const x = Number.parseInt(coord[0]);
  const y = Number.parseInt(coord[1]);
  const newCoord = convertToLatLng(x, y);
  return { lat: newCoord.lat, lng: newCoord.lng };
};
