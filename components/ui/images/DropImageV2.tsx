'use client';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { FiTrash2 } from "react-icons/fi";

const FileUpload = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadButton, setUploadButton] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length === 0) return;

        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Remove a selected file
    const handleRemoveFile = (index: number) => {
        setTimeout(() => {
            setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        }, 100);
    };

    // Handle drag events
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

    // Open file input
    const handleUploadSectionClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Automatically update uploadButton state when files change
    useEffect(() => {
        setUploadButton(files.length === 0);
    }, [files]);

    return (
        <div className="">
           
            {files.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2 p-2">
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

                    
                    <div
                        className=" h-fit w-fit flex justify-center items-center bg-[#f9fafb] rounded-lg shadow-lg p-4 cursor-pointer"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleUploadSectionClick}
                    >
                        {/* bg-[#f9fafb]  */}
                        <span className={`size-20 bg-[#f9fafb]  text-gray-800 rounded-full flex items-center justify-center ${isDragging ? 'border-blue-500' : 'border-gray-300'}`}>
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
                    </div>
                </div>
            )}

           
            {uploadButton && (
                <div
                    className="h-fit w-fit flex  items-center p-4 cursor-pointer bg-[#f9fafb] rounded-lg shadow-lg"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleUploadSectionClick}
                >
                    <span className={`size-20  bg-[#f9fafb]  text-gray-800 rounded-full flex items-center justify-center ${isDragging ? 'border-blue-500' : 'border-gray-300'}`}>
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
                </div>
            )}

            {/* Hidden File Input */}
            <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
                multiple
            />
        </div>
    );
};

export default FileUpload;
