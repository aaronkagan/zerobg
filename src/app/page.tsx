'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { headers } from 'next/headers';

import ReactCompareImage from 'react-compare-image';

import { saveAs } from 'file-saver';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [img, setImg] = useState<any>('');

  function handleUploadFile(e) {
    console.log(e.target.files);
    const data = new FileReader();
    data.addEventListener('load', () => {
      setImg(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  }

  async function fetchImageURL() {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify(img),
        headers: { 'content-type': 'application/json' }
      });
      const data = await res.json();
      setImageURL(data.message);
    } catch (err) {
      setError('There was an unexpected error: ' + err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function downloadImage() {
    saveAs(imageURL, 'image.jpg');
  }

  return (
    <main className="flex gap-[2rem] flex-col items-center pt-[5rem]">
      <p>{loading && 'loading'}</p>
      {error && JSON.stringify(error)}
      <Input
        type="file"
        onChange={handleUploadFile}
        className="w-[250px]"
      />

      {img && (
        <Button
          variant="outline"
          onClick={fetchImageURL}
        >
          Remove Background
        </Button>
      )}

      {imageURL && (
        <Button
          variant="outline"
          onClick={downloadImage}
        >
          Download Image
        </Button>
      )}
      {imageURL && (
        <div className="w-[50%]">
          <ReactCompareImage
            leftImage={img}
            rightImage={imageURL}
          />
        </div>
      )}
    </main>
  );
}
