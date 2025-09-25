"use client";
import Image from "next/image";
import { useRef, useState } from "react";

const UploadImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        handleFileUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setTimeout(() => {
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 100);
  };

  const handleFileUpload = (file: File) => {};

  return (
    <div className="flex flex-wrap items-center w-full">
      <div className="group flex  w-full py-1">
        <span
          className={`group-has-[div]:hidden flex shrink-0 justify-center items-center border  border-gray-300  text-gray-400 cursor-pointer hover:bg-gray-50  dark:text-neutral-600  ${
            previewUrl ? "hidden" : ""
          }
                        relative rounded-lg w-full h-[30vh] md:h-[40vh] 
                        `}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg
            className="shrink-0 size-8"
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
        </span>

        {previewUrl && (
          <div
            className="relative rounded-lg w-full h-full lg:h-[40vh] py-3   cursor-pointer border border-gray-300
                    flex flex-col items-center bg-gray-50
                    "
          >
            <Image
              className=" my-auto px-1 md:px-0 rounded-md"
              src={previewUrl as string}
              alt="Preview"
              width={200}
              height={200}
              onClick={() => fileInputRef.current?.click()}
            />
          </div>
        )}
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
