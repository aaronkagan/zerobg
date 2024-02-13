'use client';
import { useState, useCallback } from 'react';
import styles from './page.module.css';
import { headers } from 'next/headers';

import ReactCompareImage from 'react-compare-image';

import { saveAs } from 'file-saver';

import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

import Confetti from 'react-confetti-boom';

import { useDropzone } from 'react-dropzone';

import Image from 'next/image';

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
        headers: { 'content-type': 'application/json' }
      });
      const data = await res.json();
      setImageURL(data.message);
      setIsSuccess(true);
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

  const onDrop = useCallback((acceptedFiles) => {
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
        {/* <Button className="text-[20px] cursor-pointer">Login</Button> */}
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
          className="flex justify-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="border border-gray-400 border-dashed w-[300px] max-w-[90%] h-[150px] flex flex-col items-center gap-[1rem]   bg-[#dcedf9] rounded-[8px] p-3">
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
            <div className="border border-gray-400 border-dashed w-[300px]  max-w-[90%] h-[150px] flex flex-col items-center gap-[1rem] rounded-[8px] p-3">
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
            className="rounded-[8px]"
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
            stroke-width="1"
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
            stroke-width="1"
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
            stroke-width="1"
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

        // <svg
        //   width="135"
        //   height="135"
        //   viewBox="0 0 135 135"
        //   xmlns="http://www.w3.org/2000/svg"
        //   fill="blue"
        // >
        //   <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
        //     <animateTransform
        //       attributeName="transform"
        //       type="rotate"
        //       from="0 67 67"
        //       to="-360 67 67"
        //       dur="2.5s"
        //       repeatCount="indefinite"
        //     />
        //   </path>
        //   <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
        //     <animateTransform
        //       attributeName="transform"
        //       type="rotate"
        //       from="0 67 67"
        //       to="360 67 67"
        //       dur="8s"
        //       repeatCount="indefinite"
        //     />
        //   </path>
        // </svg>
      )}
      {imageURL && (
        <div className="w-[200px] border-black border rounded-[8px] ">
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
      <footer className="flex items-center justify-center gap-2 py-4 mt-auto mb-0 text-sm font-medium">
        <p className="text-gray-500">© 2024 ZeroBG. All rights reserved.</p>
      </footer>
    </main>
  );
}
