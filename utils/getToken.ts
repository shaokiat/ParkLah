import axios from 'axios';

export async function getToken(): Promise<string> {
  const TOKEN_URL = 'http://localhost:3000/api/get-token';
  const config = {
    method: 'get',
    url: TOKEN_URL,
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
