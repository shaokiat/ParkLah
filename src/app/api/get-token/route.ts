import axios from 'axios';
import { NextResponse } from 'next/server';

export const URA_URL = 'https://www.ura.gov.sg/uraDataService';

export async function GET() {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${URA_URL}/insertNewToken.action`,
    headers: {
      AccessKey: process.env.NEXT_PUBLIC_URA_KEY,
    },
  };

  try {
    const response = await axios.request(config);
    console.log(response);
    const token = response.data.Result;
    return new NextResponse(token, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
