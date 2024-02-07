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
    const res = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify(img),
      headers: { 'content-type': 'application/json' }
    });
    const data = await res.json();
    setImageURL(data.message);
    setLoading(false);
  }

  function downloadImage() {
    saveAs(imageURL, 'image.jpg'); // Put your image URL here.
  }

  return (
    <main
      style={{
        display: 'flex',
        // justifyContent: 'center',
        paddingTop: '5rem',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        width: '100%'
      }}
    >
      {/* {imageURL && <img src={imageURL} />} */}
      <p>{loading && 'loading'}</p>
      <Input
        type="file"
        onChange={handleUploadFile}
        style={{ width: '250px' }}
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
        <ReactCompareImage
          leftImage={img}
          rightImage={imageURL}
        />
      )}
    </main>
  );
}
