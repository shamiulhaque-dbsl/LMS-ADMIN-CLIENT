import { SHAPE_VARIANT } from "@/components/ui/uploads/image";
export interface ImageUploadProps {
  value?: string | File | null;
  onChange?: (file: File | null) => void;
  onError?: (error: string) => void;
  maxSizeInMB?: number;
  acceptedFormats?: string[];
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: (typeof SHAPE_VARIANT)[keyof typeof SHAPE_VARIANT];
  disabled?: boolean;
  readOnly?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showUploadGuideline?: boolean;
  placeholder?: string;
  name?: string;
  recommendedSize?: {
    width: number;
    height: number;
  };
}

export interface ImagePreviewProps {
  src: string;
  alt: string;
  size: number;
  variant: (typeof SHAPE_VARIANT)[keyof typeof SHAPE_VARIANT];
  onEdit: () => void;
  onDelete: () => void;
  showEditButton: boolean;
  showDeleteButton: boolean;
  disabled: boolean;
  readOnly: boolean;
}
