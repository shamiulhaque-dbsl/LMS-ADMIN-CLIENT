"use client";

import { useState, useRef, useCallback, ChangeEvent, useEffect } from "react";
import {
  validateFile,
  readFileAsDataURL,
  getImageSource,
  ImageUploadProps,
} from "@/components/ui/uploads/image";
import { uploadFile } from "@/api/upload";

export const useImageUpload = ({
  value,
  onChange,
  onError,
  maxSizeInMB = 1,
  acceptedFormats = ["image/*"],
  disabled = false,
  readOnly = false,
  onUpload,
}: Pick<
  ImageUploadProps,
  "value" | "onChange" | "onError" | "maxSizeInMB" | "acceptedFormats" | "disabled" | "readOnly"
> & {
  onUpload?: (uploaded: { url: string; key: string }) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    if (value && !(value instanceof File)) return getImageSource(value);
    return null;
  });
  const [internalError, setInternalError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value && !(value instanceof File)) {
      setPreviewUrl(getImageSource(value));
    }
  }, [value]);

  const handleFileChange = useCallback(
    async (file: File | null) => {
      if (!file) return;

      setInternalError(null);

      const validation = validateFile(file, maxSizeInMB, acceptedFormats);
      if (!validation.valid) {
        const errorMsg = validation.error || "Invalid file";
        setInternalError(errorMsg);
        onError?.(errorMsg);
        return;
      }

      try {
        const dataUrl = await readFileAsDataURL(file);
        setPreviewUrl(dataUrl); // update preview
        onChange?.(file); // update parent form state

        // Upload file to server
        if (onUpload) {
          setLoading(true);
          const response = await uploadFile(file);
          if (response.status === "success" && response.data && response.data.length > 0) {
            setPreviewUrl(response.data[0].url ?? null);
            onUpload({ url: response.data[0].url, key: response.data[0].key });
          } else {
            const errMsg = response.message || "Upload failed";
            setInternalError(errMsg);
            onError?.(errMsg);
          }
        }
      } catch (err: any) {
        console.log("File upload error:", err);
        const errorMsg = err?.message || "Failed to read file";
        setInternalError(errorMsg);
        onError?.(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    [maxSizeInMB, acceptedFormats, onChange, onError, onUpload]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      handleFileChange(file);
    },
    [handleFileChange]
  );

  const handleClear = useCallback(() => {
    setPreviewUrl(null);
    setInternalError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange?.(null);
  }, [onChange]);

  const triggerFileInput = useCallback(() => {
    if (!disabled && !readOnly) fileInputRef.current?.click();
  }, [disabled, readOnly]);

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled && !readOnly) setIsDragging(true);
    },
    [disabled, readOnly]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled || readOnly) return;
      const file = e.dataTransfer.files[0] || null;
      handleFileChange(file);
    },
    [disabled, readOnly, handleFileChange]
  );

  return {
    fileInputRef,
    previewUrl,
    internalError,
    isDragging,
    loading,
    handleInputChange,
    handleClear,
    triggerFileInput,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
};
