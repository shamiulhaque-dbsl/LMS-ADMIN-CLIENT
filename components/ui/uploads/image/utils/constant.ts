export const sizeConfig = {
  sm: 80,
  md: 120,
  lg: 160,
  xl: 200,
};

export const SHAPE_VARIANT = {
  CIRCLE: "circle",
  SQUARE: "square",
};

export const DEFAULT_IMAGE_UPLOAD_CONFIG = {
  maxSizeInMB: 5,
  acceptedFormats: ["image/*"],
  placeholder: "Upload Image",
  recommendedSize: { width: 200, height: 200 },
  showEditButton: true,
  showDeleteButton: true,
  showUploadGuideline: true,
};

export const UPLOAD_ICON_SIZE = {
  sm: 14,
  md: 18,
  lg: 20,
  xl: 28,
} as const;
