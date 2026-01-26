import DOMPurify from "dompurify";
import parse from "html-react-parser";

export const cleanHTML = (html: string = "") => {
  if (typeof window === "undefined") return null;

  const cleaned = DOMPurify.sanitize(html);
  return parse(cleaned);
};
