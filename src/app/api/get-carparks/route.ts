import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const URA_URL = 'https://www.ura.gov.sg/uraDataService';

export async function GET(request: NextRequest) {
  const token = request.headers.get('token');

  // Check if the token exists
  if (!token) {
    return new NextResponse('Token is required', { status: 400 });
  }

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${URA_URL}/invokeUraDS?service=Car_Park_Details`,
    headers: {
      AccessKey: process.env.NEXT_PUBLIC_URA_KEY,
      token: token,
    },
  };

  try {
    const response = await axios.request(config);
    const res = response.data;
    // console.log('RES', res);
    return new NextResponse(JSON.stringify(res), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
