"use client";

import { useRef, useState } from "react";

const InputImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      //   onFileUpload(file);
    }
  };

  const handleClear = () => {
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // onFileClear();
  };

  return (
    <div className="pb-4">
      <button
        type="button"
        className="relative flex w-full overflow-hidden rounded-lg border border-gray-300 bg-[#f9fafb] text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:focus:border-neutral-600"
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="h-full text-nowrap bg-[#f9fafb] px-4 py-3">Choose File</span>
        <span className="group flex h-full grow overflow-hidden px-4 py-3">
          {fileName ? (
            <div className="flex w-full items-center">
              <span className="grow-0 overflow-hidden truncate">
                {fileName.split(".").slice(0, -1).join(".")}
              </span>
              <span className="grow-0">.</span>
              <span className="grow-0">{fileName.split(".").pop()}</span>
            </div>
          ) : (
            <span>No Chosen File</span>
          )}
        </span>
      </button>

      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default InputImage;
