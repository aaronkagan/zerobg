import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error('Error parsing request body:', err);
    return NextResponse.json({ error: 'Invalid request body', status: 400 });
  }

  try {
    const output = await replicate.run(
      'cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003',
      {
        input: {
          image: body
        }
      }
    );

    return NextResponse.json({ message: output, status: 200 });
  } catch (err) {
    console.error('Error calling Replicate API:', err);
    return NextResponse.json({ error: 'Failed to process image', status: 500 });
  }
}
