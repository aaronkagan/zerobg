import { NextResponse } from 'next/server';

import Replicate from 'replicate';
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(req) {
  const data = await req.json();
  // console.log(data);

  try {
    const output = await replicate.run(
      'cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003',
      {
        input: {
          image: data
        }
      }
    );

    return NextResponse.json({
      message: output
    });
  } catch (err) {
    console.log(err);
  }
}
