
'use client'
import { useRef, useState } from 'react';

const InputImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    //   onFileUpload(file);
    }
  };

  const handleClear = () => {
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // onFileClear();
  };

  return (
    <div className='pb-4'>
      <button
        type="button"
        className="relative flex w-full border overflow-hidden border-gray-300 shadow-sm rounded-lg text-sm focus:outline-none focus:z-10 focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-[#f9fafb] dark:text-neutral-400 dark:focus:border-neutral-600"
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="h-full py-3 px-4 bg-[#f9fafb] text-nowrap">
          Choose File
        </span>
        <span className="group grow flex overflow-hidden h-full py-3 px-4">
          {fileName ? (
            <div className="flex items-center w-full">
              <span className="grow-0 overflow-hidden truncate">
                {fileName.split('.').slice(0, -1).join('.')}
              </span>
              <span className="grow-0">.</span>
              <span className="grow-0">
                {fileName.split('.').pop()}
              </span>
            </div>
          ) : (
            <span>No Chosen File</span>
          )}
        </span>
      </button>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default InputImage;
