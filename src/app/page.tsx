'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

import ReactCompareImage from 'react-compare-image';
import { saveAs } from 'file-saver';
import Confetti from 'react-confetti-boom';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [img, setImg] = useState<any>('');

  const { toast } = useToast();

  async function fetchImageURL() {
    setLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const res = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify(img),
        headers: { 'content-type': 'application/json' },
        cache: 'no-store'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setImageURL(data.message);
      setIsSuccess(true);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: 'Please Try Again or Try A Different Image',
        className: 'bg-[red] text-[white]'
      });
      setIsError(true);
      console.error('Error fetching image URL:', err);
    } finally {
      setLoading(false);
    }
  }

  function downloadImage() {
    saveAs(imageURL, 'image.jpg');
    setImageURL('');
  }

  function handleReset() {
    location.reload();
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new FileReader();

    file.onload = function () {
      setImg(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <main className="flex gap-[2rem] flex-col items-center  min-h-[100vh] text-center max-w-[95%]">
      <nav className="flex w-[90%] justify-between items-center">
        <div
          className="text-[40px] font-bold cursor-pointer"
          onClick={() => location.reload()}
        >
          <span className="text-[blue]">zero</span>
          <span className="">bg</span>
        </div>
      </nav>

      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        Remove backgrounds from images with a click
      </h1>
      <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
        Easily cut out the background of any photo using our AI-powered tool. No
        design skills required.
      </p>

      {!img && (
        <div
          className="flex justify-center cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="border border-gray-400 border-dashed w-[300px] md:w-[400px] max-w-[90%] h-[150px] flex flex-col items-center gap-[1rem]   bg-[#dcedf9] rounded-[8px] p-3">
              <div className="h-[50%] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M0 0h48v48h-48z"
                    fill="none"
                  />
                  <path
                    fill="blue"
                    d="M38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93zm-10.71 5.93v8h-8v-8h-6l10-10 10 10h-6z"
                  />
                </svg>
              </div>

              <p className="text-gray-500">Drop image here ...</p>
            </div>
          ) : (
            <div className="border border-gray-400 border-dashed w-[300px] md:w-[400px] max-w-[90%] h-[150px] flex flex-col items-center gap-[1rem] rounded-[8px] p-3">
              <div className="h-[50%] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M0 0h48v48h-48z"
                    fill="none"
                  />
                  <path
                    fill="blue"
                    d="M38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93zm-10.71 5.93v8h-8v-8h-6l10-10 10 10h-6z"
                  />
                </svg>
              </div>

              <p className="text-gray-500">
                Drag &apos;n&apos; drop an image here, or click to select an
                image
              </p>
            </div>
          )}
        </div>
      )}

      {img && !loading && !isSuccess && (
        <>
          <Image
            alt="uploaded image"
            src={img}
            width={200}
            height={200}
            className=" rounded-[8px] h-[100%] w-[300px] md:w-[400px] max-w-[90%]"
          />

          <Button
            variant="outline"
            onClick={fetchImageURL}
          >
            Remove Background
          </Button>
        </>
      )}

      {loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-[300px] h-[40px] flex items-center mt-10"
        >
          <circle
            fill="#9CA3AF"
            stroke="#9CA3AF"
            strokeWidth="1"
            r="70"
            cx="-200"
            cy="100"
          >
            <animate
              attributeName="opacity"
              calcMode="spline"
              dur="2"
              values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle
            fill="#9CA3AF"
            stroke="#9CA3AF"
            strokeWidth="1"
            r="70"
            cx="100"
            cy="100"
          >
            <animate
              attributeName="opacity"
              calcMode="spline"
              dur="2"
              values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle
            fill="#9CA3AF"
            stroke="#9CA3AF"
            strokeWidth="1"
            r="70"
            cx="400"
            cy="100"
          >
            <animate
              attributeName="opacity"
              calcMode="spline"
              dur="2"
              values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg>
      )}
      {imageURL && (
        <div className=" w-[300px] md:w-[400px] max-w-[90%] border-black border rounded-[8px] ">
          <ReactCompareImage
            leftImage={img}
            rightImage={imageURL}
          />
        </div>
      )}

      {imageURL && (
        <Button
          variant="outline"
          onClick={downloadImage}
        >
          Download Image
        </Button>
      )}

      {img && !loading && (
        <Button
          variant="outline"
          onClick={handleReset}
        >
          Process A Different Image
        </Button>
      )}

      {isError && <Toaster />}
      {isSuccess && (
        <Confetti
          particleCount={200}
          effectInterval={1000}
          effectCount={3}
          spreadDeg={360}
          mode="boom"
          y={0.2}
        />
      )}
      <footer className="flex flex-col items-center justify-center gap-2 py-4 mt-auto mb-0 text-sm font-medium">
        <p className="text-gray-500">
          Designed and Developed by{' '}
          <a
            className="text-[black]"
            href="https://www.aaronkagan.dev/"
          >
            Aaron Kagan
          </a>
        </p>

        <div className="flex gap-3">
          <p className="text-[black]">
            <a href="https://github.com/aaronkagan/zerobg">Github Repo</a>
          </p>
          <p className="text-[black]">
            <a href="https://www.linkedin.com/in/aaron-kagan/">LinkedIn</a>
          </p>
        </div>

        <p className="text-gray-500">© 2024 ZeroBG. All rights reserved.</p>
      </footer>
    </main>
  );
}
