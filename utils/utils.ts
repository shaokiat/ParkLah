import proj4 from 'proj4';
import { CarparkType, CoordinatesString, CoordinatesType } from 'types/types';

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

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function calculateDistance(
  coord1: CoordinatesType,
  coord2: CoordinatesType,
): number {
  const earthRadius = 6371; // Earth's radius in kilometers
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

// Filter carparks within range of radius(km)
export const filterCarparks = (
  carparks: CarparkType[],
  coordinate: CoordinatesType,
  radius: number,
) => {
  return carparks.filter((carpark) => {
    if (!carpark.geometries[0]) {
      return;
    }
    const cpCoord = parseCoordinates(carpark.geometries[0]);
    const distance = calculateDistance(cpCoord, coordinate);
    return distance <= radius;
  });
};
