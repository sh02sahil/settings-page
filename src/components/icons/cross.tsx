import { IconProps } from "@/interfaces/common.interface";
import React from "react";

const CrossIcon = ({ className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 37 36"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M11.324 25.425l14.85-14.85M11.324 10.575l14.85 14.85"
      ></path>
    </svg>
  );
};

export default CrossIcon;
