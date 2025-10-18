import * as React from "react";
import { cn } from "@/lib/utils";
import { handleTrimSpaces } from "@/utils/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ignoreSpecificChar?: boolean;
  trimOnBlur?: boolean;
  className?: string;
  inputClassName?: string;
}

const isNumberValueValid = (value: string) => /^\d*$/.test(value);
const isAlphaOrSpaceOnly = (value: string) => /^[\p{L}\s]*$/u.test(value);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      type = "text",
      onChange,
      onBlur,
      ignoreSpecificChar = false,
      trimOnBlur = true,
      ...props
    },
    ref
  ) => {
    const isValidWholeValue = (v: string) =>
      type === "number"
        ? isNumberValueValid(v)
        : ignoreSpecificChar
        ? isAlphaOrSpaceOnly(v)
        : true;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isValidWholeValue(e.target.value)) return;
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (trimOnBlur) {
        const trimmed = handleTrimSpaces(e.target.value);
        if (trimmed !== e.target.value) {
          e.target.value = trimmed;
          onChange?.({
            ...e,
            target: { ...e.target, value: trimmed },
            currentTarget: { ...e.currentTarget, value: trimmed },
          } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
      }
      onBlur?.(e);
    };

    return (
      <div className={cn("form-control", className)}>
        <input
          ref={ref}
          type={type}
          inputMode={type === "number" ? "numeric" : props.inputMode}
          pattern={type === "number" ? "\\d*" : props.pattern}
          {...props}
          className={cn(
            "w-full p-0 m-0 border-0 outline-none bg-transparent",
            inputClassName
          )}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
