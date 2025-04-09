import React from "react";
import CrossIcon from "../icons/cross";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Badge({
  className,
  children,
  onDelete,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border border-black-400 font-geist text-white-200 group transition-colors duration-300 gap-1 px-4 py-2 rounded-3xl min-h-6 text-sm",
        className
      )}
      {...props}
    >
      <span className="font-medium sm:text-base">{children}</span>
      <Button onClick={onDelete} variant="transparent" size="icon">
        <CrossIcon className="aspect-square w-5 shrink-0 grow-0 cursor-pointer text-black-100 transition-colors duration-300 group-hover:text-white-100" />
      </Button>
    </div>
  );
}
