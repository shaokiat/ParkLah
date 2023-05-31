import axios from 'axios';
import { CarparkType } from 'types/types';

export async function getCarparks(token: string): Promise<CarparkType[]> {
  const TOKEN_URL = 'http://localhost:3000/api/get-carparks';
  const config = {
    method: 'get',
    url: TOKEN_URL,
    headers: {
      AccessKey: process.env.NEXT_PUBLIC_URA_KEY,
      token: token,
    },
  };
  try {
    const response = await axios.request(config);
    console.log('DATA', response.data.Result);
    return response.data.Result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
