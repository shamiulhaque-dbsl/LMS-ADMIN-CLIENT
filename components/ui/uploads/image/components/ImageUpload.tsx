"use client";

import { Icons } from "@/components/Icons";
import {
  ImageUploadProps,
  sizeConfig,
  SHAPE_VARIANT,
  DEFAULT_IMAGE_UPLOAD_CONFIG,
  ImagePreview,
  useImageUpload,
  UPLOAD_ICON_SIZE,
} from "@/components/ui/uploads/image";

export const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const {
    fileInputRef,
    previewUrl,
    internalError,
    isDragging,
    handleInputChange,
    handleClear,
    triggerFileInput,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useImageUpload(props);

  const {
    className = "",
    size = "md",
    variant = SHAPE_VARIANT.SQUARE,
    disabled = false,
    readOnly = false,
    showEditButton = DEFAULT_IMAGE_UPLOAD_CONFIG.showEditButton,
    showDeleteButton = DEFAULT_IMAGE_UPLOAD_CONFIG.showDeleteButton,
    showUploadGuideline = DEFAULT_IMAGE_UPLOAD_CONFIG.showUploadGuideline,
    placeholder = DEFAULT_IMAGE_UPLOAD_CONFIG.placeholder,
    name,
    recommendedSize = DEFAULT_IMAGE_UPLOAD_CONFIG.recommendedSize,
    maxSizeInMB = DEFAULT_IMAGE_UPLOAD_CONFIG.maxSizeInMB,
    acceptedFormats = DEFAULT_IMAGE_UPLOAD_CONFIG.acceptedFormats,
  } = props;

  const containerSize = sizeConfig[size];
  const shapeClass = variant === SHAPE_VARIANT.CIRCLE ? "rounded-full" : "rounded-lg";
  const isSmall = containerSize <= sizeConfig.sm;

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`flex ${isSmall ? "flex-col sm:flex-row" : "flex-col lg:flex-row"} gap-4 items-start`}
      >
        {/* Preview */}
        <div className="flex-shrink-0">
          {previewUrl ? (
            <ImagePreview
              src={previewUrl}
              alt="Uploaded image"
              size={containerSize}
              variant={variant}
              onEdit={triggerFileInput}
              onDelete={handleClear}
              showEditButton={showEditButton}
              showDeleteButton={showDeleteButton}
              disabled={disabled}
              readOnly={readOnly}
            />
          ) : (
            <div
              className={`relative flex flex-col items-center justify-center border-2 transition-all duration-200 ${shapeClass} ${
                isDragging
                  ? "border-blue-500 bg-blue-50 border-solid"
                  : "border-dashed border-gray-300 hover:border-blue-400 hover:bg-gray-50"
              } ${disabled || readOnly ? "opacity-50 cursor-not-allowed bg-gray-100" : "cursor-pointer bg-white"}`}
              style={{ width: containerSize, height: containerSize }}
              onClick={triggerFileInput}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div
                className={`relative z-10 flex flex-col items-center ${isSmall ? "gap-1 p-2" : "gap-2 p-4"}`}
              >
                <div
                  className={`${isSmall ? "p-2" : "p-3"} ${shapeClass} bg-blue-500 text-white shadow-sm`}
                >
                  <Icons.upload
                    size={
                      isSmall
                        ? UPLOAD_ICON_SIZE.sm
                        : size === "md"
                          ? UPLOAD_ICON_SIZE.md
                          : size === "lg"
                            ? UPLOAD_ICON_SIZE.lg
                            : UPLOAD_ICON_SIZE.xl
                    }
                  />
                </div>
                {!isSmall && size !== "md" && (
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">{placeholder}</p>
                    <p className="text-xs text-gray-500 mt-0.5">or drag & drop</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info Panel */}
        {!previewUrl && showUploadGuideline && (
          <div className="flex-1 min-w-0">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-gray-900">Upload Guidelines</h3>
                <UploadInfo
                  label="Recommended size:"
                  value={`${recommendedSize.width} × ${recommendedSize.height} pixels`}
                />
                <UploadInfo label="Maximum size:" value={`${maxSizeInMB}MB`} />
                <UploadInfo label="Accepted formats:" value={acceptedFormats.join(", ")} />
                <UploadInfo value="Click the upload area or drag and drop your image" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {internalError && (
        <div className="flex items-center gap-2 p-3 mt-3 bg-red-50 border border-red-200 rounded-lg">
          <Icons.x size={16} className="text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700 font-medium">{internalError}</p>
        </div>
      )}

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        className="hidden"
        accept={acceptedFormats.join(",")}
        onChange={handleInputChange}
        disabled={disabled || readOnly}
      />
    </div>
  );
};

const UploadInfo = ({ label, value }: { label?: string; value: string }) => (
  <div className="flex items-start gap-2 text-xs text-gray-700">
    <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
    <div>
      {label && <span className="font-medium">{label} </span>}
      <span className="text-gray-600">{value}</span>
    </div>
  </div>
);
