export const validateFile = (
  file: File,
  maxSizeInMB: number,
  acceptedFormats: string[]
): { valid: boolean; error?: string } => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  if (file.size > maxSizeInBytes) {
    return {
      valid: false,
      error: `File size must be less than ${maxSizeInMB}MB`,
    };
  }

  const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  const isValidFormat = acceptedFormats.some(
    (format) =>
      format.toLowerCase() === fileExtension ||
      format === "image/*" ||
      file.type.startsWith("image/")
  );

  if (!isValidFormat) {
    return {
      valid: false,
      error: `Only ${acceptedFormats.join(", ")} formats are accepted`,
    };
  }

  return { valid: true };
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getImageSource = (value: string | File | null | undefined): string | null => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value instanceof File) return URL.createObjectURL(value);
  return null;
};
