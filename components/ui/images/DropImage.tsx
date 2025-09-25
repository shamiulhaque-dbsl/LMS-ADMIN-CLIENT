'use client';
import { useRef, useState } from 'react';
import { FiTrash2 } from "react-icons/fi";

const DropImage = () => {
  const [files, setFiles] = useState<File[]>([]); 
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); 
    const selectedFiles = Array.from(e.target.files || []); 
    if (selectedFiles.length === 0) return;

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  const handleRemoveFile = (index: number) => { 
    setTimeout(() => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }, 100);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleUploadSectionClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  return (
    // max-w-md
    <div className="w-full mx-auto">
      <div
        className={`cursor-pointer p-12 flex justify-center bg-[#f9fafb] border ${
          isDragging ? 'border-blue-500' : ' border-gray-300 '
        } rounded-xl `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadSectionClick} 
      >
        <div className="text-center ">
          <span className="inline-flex justify-center items-center size-16 bg-gray-100 text-gray-800 rounded-full">
            <svg
              className="shrink-0 size-6"
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

          <div className="mt-4 flex flex-wrap justify-center text-sm leading-6 text-gray-600">
            <span className="pe-1 font-medium text-gray-400">
              {isDragging ? 'Drop your files here' : <p>Drop your file here or <span className='underline decoration-blue-600 text-blue-600'>browse</span></p>}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-400">Pick a file up to 2MB.</p>
        </div>
      </div>

      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
        multiple
      />

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative p-2 bg-[#f9fafb] border border-gray-300 rounded-xl"
            >
              <img
                className="mb-2 w-full h-20 object-cover rounded-lg"
                src={URL.createObjectURL(file)}
                alt="preview"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full text-xs hover:bg-red-700"
                onClick={() => handleRemoveFile(index)}
              >
                <FiTrash2 className="text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropImage;