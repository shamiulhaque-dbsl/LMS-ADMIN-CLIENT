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
    <div className="group relative flex-shrink-0" style={{ width: size, height: size }}>
      <Image
        className={`h-full w-full ${shapeClass} border-2 border-gray-200 object-cover shadow-md transition-all duration-300 ${
          !readOnly && !disabled ? "cursor-pointer group-hover:brightness-90" : ""
        }`}
        src={src}
        alt={alt}
        fill
        onClick={!readOnly && !disabled ? onEdit : undefined}
      />

      {!readOnly && !isSmall && (
        <div
          className={`absolute inset-0 ${shapeClass} pointer-events-none flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
        >
          <div className="pointer-events-auto flex gap-2">
            {showEditButton && (
              <Button
                className="h-auto rounded-lg bg-white p-2 text-gray-700 shadow-lg transition-colors duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={onEdit}
                disabled={disabled}
                aria-label="Edit image"
              >
                <Icons.edit size={16} />
              </Button>
            )}

            {showDeleteButton && (
              <Button
                className="h-auto rounded-lg bg-white p-2 text-red-600 shadow-lg transition-colors duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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
        <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {showEditButton && (
            <Button
              className="rounded bg-white p-1.5 text-gray-700 shadow-md transition-colors duration-200 hover:bg-gray-100 disabled:opacity-50"
              onClick={onEdit}
              disabled={disabled}
              aria-label="Edit image"
            >
              <Icons.edit size={12} />
            </Button>
          )}

          {showDeleteButton && (
            <Button
              className="rounded bg-white p-1.5 text-red-600 shadow-md transition-colors duration-200 hover:bg-red-50 disabled:opacity-50"
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
        <div className="absolute -right-1 -top-1 rounded-full bg-green-500 p-1 text-white shadow-md">
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
