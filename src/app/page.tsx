'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { headers } from 'next/headers';

import ReactCompareImage from 'react-compare-image';

export default function Home() {
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState<any>(null);

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

  return (
    <main>
      {/* {imageURL && <img src={imageURL} />} */}
      <p>{loading && 'loading'}</p>
      <input
        type="file"
        onChange={handleUploadFile}
      />
      <button onClick={fetchImageURL}>Remove Background</button>
      {imageURL && (
        <ReactCompareImage
          leftImage={img}
          rightImage={imageURL}
        />
      )}
      ;
    </main>
  );
}
