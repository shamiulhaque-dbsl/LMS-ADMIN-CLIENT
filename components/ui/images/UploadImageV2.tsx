
'use client'
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FiTrash2 } from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";

const UploadImage = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(null);

    const handleFileChange = (e: any) => {
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
        setTimeout(() => {
            setPreviewUrl(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }, 100);
    };

    const handleFileUpload = (file: File) => {
  
    };


    return (
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 ">
            <div className="group flex  w-full md:w-fit">
                <span
                    className={`group-has-[div]:hidden flex shrink-0 justify-center items-center size-20 border-2 border-dotted border-gray-300 text-gray-400 cursor-pointer rounded-full hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-600  ${previewUrl ? 'hidden' : ''
                        }
                        relative
                        `}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <svg
                        className="shrink-0 size-7 "
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
                    <button
                            type="button"
                            className="absolute bottom-0 right-1 bg-red-600 text-white p-1 rounded-full text-xs hover:bg-red-700"
                        >
                            <MdModeEdit className="text-sm"/>
                        </button>
                
                </span>
              
                {previewUrl && (
                    <div className="relative size-20 cursor-pointer rounded-full"
                       
                    >
                       
                       <Image
                            className="w-full h-full rounded-full"
                            src={previewUrl as string}
                            alt="Preview"
                            width={100}
                            height={100}
                            onClick={() => fileInputRef.current?.click()}
                        />
                       {/* delete button */}
                        <button
                            type="button"
                            className="absolute bottom-0 right-1 bg-red-600 text-white p-1 rounded-full text-xs hover:bg-red-700"
                           
                            onClick={() => {
                                handleClear();
                            }}
                        >
                            <MdModeEdit className="text-sm" />
                        </button>
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