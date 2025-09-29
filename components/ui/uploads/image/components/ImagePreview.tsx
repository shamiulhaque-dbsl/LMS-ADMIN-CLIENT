import { Icons } from "@/components/Icons";
import { ImagePreviewProps, sizeConfig, SHAPE_VARIANT } from "@/components/ui/uploads/image";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  size,
  variant,
  onEdit,
  onDelete,
  showEditButton,
  showDeleteButton,
  disabled,
  readOnly,
}) => {
  const shapeClass = variant === SHAPE_VARIANT.CIRCLE ? "rounded-full" : "rounded-lg";
  const isSmall = size <= sizeConfig.sm;

  return (
    <div className="relative group flex-shrink-0" style={{ width: size, height: size }}>
      <Image
        className={`w-full h-full ${shapeClass} object-cover border-2 border-gray-200 shadow-md transition-all duration-300 ${
          !readOnly && !disabled ? "group-hover:brightness-90 cursor-pointer" : ""
        }`}
        src={src}
        alt={alt}
        fill
        onClick={!readOnly && !disabled ? onEdit : undefined}
      />

      {!readOnly && !isSmall && (
        <div
          className={`absolute inset-0 ${shapeClass} bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 pointer-events-none`}
        >
          <div className="pointer-events-auto flex gap-2">
            {showEditButton && (
              <Button
                className="h-auto bg-white text-gray-700 p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onEdit}
                disabled={disabled}
                aria-label="Edit image"
              >
                <Icons.edit size={16} />
              </Button>
            )}

            {showDeleteButton && (
              <Button
                className="h-auto bg-white text-red-600 p-2 rounded-lg shadow-lg hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onDelete}
                disabled={disabled}
                aria-label="Remove image"
              >
                <Icons.trash size={16} />
              </Button>
            )}
          </div>
        </div>
      )}

      {!readOnly && isSmall && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
          {showEditButton && (
            <Button
              className="bg-white text-gray-700 p-1.5 rounded shadow-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
              onClick={onEdit}
              disabled={disabled}
              aria-label="Edit image"
            >
              <Icons.edit size={12} />
            </Button>
          )}

          {showDeleteButton && (
            <Button
              className="bg-white text-red-600 p-1.5 rounded shadow-md hover:bg-red-50 transition-colors duration-200 disabled:opacity-50"
              onClick={onDelete}
              disabled={disabled}
              aria-label="Remove image"
            >
              <Icons.trash size={12} />
            </Button>
          )}
        </div>
      )}

      {!isSmall && (
        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1 shadow-md">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

ImagePreview.displayName = "ImagePreview";
