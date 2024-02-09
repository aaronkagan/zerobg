'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { headers } from 'next/headers';

import ReactCompareImage from 'react-compare-image';

import { saveAs } from 'file-saver';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

export default function Home() {
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [img, setImg] = useState<any>('');

  const { toast } = useToast();

  function handleUploadFile(e) {
    const data = new FileReader();
    data.addEventListener('load', () => {
      setImg(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  }

  async function fetchImageURL() {
    setLoading(true);
    setIsError(false);

    try {
      const res = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify(img),
        headers: { 'content-type': 'application/json' }
      });
      const data = await res.json();
      setImageURL(data.message);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: 'Please Try Again',
        className: 'bg-[red] text-[white]'
      });
      setIsError(true);
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

      {isError && <Toaster />}
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
