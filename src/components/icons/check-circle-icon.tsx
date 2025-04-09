import { IconProps } from "@/interfaces/common.interface";

interface CheckCircleIconProps extends IconProps {
  selected?: boolean;
  fillBg?: boolean;
  fillStroke?: boolean;
}

function CheckCircleIcon({
  className,
  selected = true,
  fillBg = false,
  fillStroke = false,
}: CheckCircleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fillBg ? "url(#gradient)" : "none"}
      stroke={fillStroke ? "url(#gradient)" : "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <defs>
        <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4280ff" />
          <stop offset="100%" stopColor="#ad4bfa" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" />
      {selected && <path d="m9 12 2 2 4-4" />}
    </svg>
  );
}

export { CheckCircleIcon };
