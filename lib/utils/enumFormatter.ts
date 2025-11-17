/**
 * Converts enum/value strings like "self_paced", "in_progress" into "Self Paced", "In Progress"
 */
export const formatEnumLabel = (value: string): string => {
  return value
    .replace(/_/g, " ") // replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize first letter of each word
};

/**
 * Converts an array of enum strings into value/label objects
 *
 * Example:
 * Input:  ["video", "pdf", "audio_file"]
 * Output: [
 *   { value: "video", label: "Video" },
 *   { value: "pdf", label: "Pdf" },
 *   { value: "audio_file", label: "Audio File" }
 * ]
 */
export const formatEnumOptions = (enumArray: string[]) => {
  return enumArray.map((v) => ({ value: v, label: formatEnumLabel(v) }));
};
