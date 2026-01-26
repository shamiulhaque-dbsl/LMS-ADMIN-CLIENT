import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import parse from "html-react-parser";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const cleanHTML = (html: string = "") => {
  const cleaned = DOMPurify.sanitize(html);
  const convertedHTML = parse(cleaned);
  return convertedHTML;
};
