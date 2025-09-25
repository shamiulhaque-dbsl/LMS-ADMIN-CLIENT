// components/FileUpload.js
'use client'
import Image from 'next/image';
import { useRef, useState } from 'react';

const UploadImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        // onFileUpload(file);
        handleFileUpload(file); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // onFileClear();
  };

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
  };


  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-5">
      <div className="group flex justify-center w-full md:w-fit">
        <span
          className={`group-has-[div]:hidden flex shrink-0 justify-center items-center size-20 border-2 border-dotted border-gray-300 text-gray-400 cursor-pointer rounded-full hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-600  ${
            previewUrl ? 'hidden' : ''
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg
            className="shrink-0 size-7"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
          </svg>
        </span>
        {previewUrl && (
          <div className="size-20">
            <Image
              className="w-full h-full rounded-full"
              src={previewUrl as string}
              alt="Preview"
              width={100}
              height={100}
            />
          </div>
        )}
      </div>

      <div className="grow">
        <div className="flex items-center gap-x-2 justify-center md:justify-start">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
            Upload photo
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 "
            onClick={handleClear}
          >
            Delete
          </button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImage;