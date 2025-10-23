import { cn } from "@/lib/utils/tailwind-utils";

interface TakaProps {
  className?: string;
}

export default function Taka({ className }: TakaProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("icon line-color", className)}
    >
      <g id="SVGRepo_iconCarrier">
        <path
          d="M6,3H6A3,3,0,0,1,9,6V17.34A3.66,3.66,0,0,0,12.66,21h0A3.66,3.66,0,0,0,16,18.83l1.75-3.94A2.87,2.87,0,0,0,16,11h0"
          stroke="#333333"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="6"
          y1="11"
          x2="12"
          y2="11"
          stroke="#101314"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
