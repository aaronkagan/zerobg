import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { NextApiRequest } from 'next';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(req: NextApiRequest) {
  let body;
  try {
    body = await req.body;
  } catch (err) {
    console.error('Error parsing request body:', err);
    return NextResponse.json({ error: 'Invalid request body', status: 400 });
  }

  try {
    const output = await replicate.run(
      'lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1',
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
