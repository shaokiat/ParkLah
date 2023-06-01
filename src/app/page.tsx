import MapComponent from 'components/MapComponent';
import { getCarparks } from 'utils/getCarparks';
import { getToken } from 'utils/getToken';

const getAllCarparks = async () => {
  const token = await getToken();
  const carparks = await getCarparks(token);
  return carparks;
};

export default async function Home() {
  const allCarparks = await getAllCarparks();

  return (
    <main>
      <MapComponent allCarparks={allCarparks} />
    </main>
  );
}
