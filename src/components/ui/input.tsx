import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./form";
import SearchIcon from "../icons/search";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, type, label, required, ...props }, ref) => {
    return (
      <div id={id} className={cn("flex w-full flex-col gap-4", className)}>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <span>{" *"}</span>}
          </Label>
        )}
        <div className="transition-colors duration-200 flex w-full h-10 gap-2 rounded-md bg-neutral-100 px-4 py-2 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50">
          <SearchIcon className="h-5 aspect-square grow-0 shrink-0 text-neutral-400" />
          <input
            id={id}
            type={type}
            className={cn(
              "flex h-10 w-full text-base text-neutral-600 placeholder:text-black-200 focus:border-none focus:outline-none",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

interface FormInputProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
}

function FormInput<T extends FieldValues>({
  control,
  name,
  className,
  ...props
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          <FormControl>
            <Input {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { Input, FormInput };
