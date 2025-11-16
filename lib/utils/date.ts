/**
 * Formats a date string or Date object into a locale date string.
 *
 * @param date - The date to format (string or Date object)
 * @param options - Optional Intl.DateTimeFormatOptions
 * @returns Formatted date string
 *
 * @example
 * formatDate("2025-11-16") // "11/16/2025" (depends on locale)
 * formatDate(new Date(), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
 * // "Sunday, November 16, 2025" (example)
 */
export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(undefined, options);
};

/**
 * Formats a date in full standard format: Month Day, Year
 *
 * @param date - Date string or Date object
 * @returns Formatted date string
 *
 * @example
 * formatDateFull("2025-11-16") // "November 16, 2025"
 * formatDateFull(new Date())   // "November 16, 2025" (today's date)
 */
export const formatDateFull = (date: string | Date) =>
  formatDate(date, { year: "numeric", month: "long", day: "numeric" });

/**
 * Formats a date in short format: MM/DD/YY
 *
 * @param date - Date string or Date object
 * @returns Formatted date string
 *
 * @example
 * formatDateShort("2025-11-16") // "11/16/25"
 * formatDateShort(new Date())   // "11/16/25"
 */
export const formatDateShort = (date: string | Date) =>
  formatDate(date, { year: "2-digit", month: "numeric", day: "numeric" });

/**
 * Formats a date with date and time: MMM DD, YYYY, HH:MM:SS
 *
 * @param date - Date string or Date object
 * @returns Formatted date-time string
 *
 * @example
 * formatDateTime("2025-11-16T14:30:00") // "Nov 16, 2025, 02:30:00 PM"
 * formatDateTime(new Date())            // "Nov 16, 2025, 01:23:45 PM" (current time)
 */
export const formatDateTime = (date: string | Date) =>
  new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
