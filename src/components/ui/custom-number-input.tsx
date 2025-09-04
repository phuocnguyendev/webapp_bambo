import * as React from "react";
import { Input, type InputProps } from "./input";
import "./custom-number-input.scss";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { isDecimal } from "@/utils/helpers";

export interface CustomNumberInputProps extends InputProps {
  min: number;
  max: number;
  step?: number;
  onNumberChange: (e: any) => void;
  wrapperClassName?: string;
  disabled?: boolean;
}

const CustomNumberInput = React.forwardRef<
  HTMLInputElement,
  CustomNumberInputProps
>(
  ({
    wrapperClassName,
    className,
    onNumberChange,
    min,
    max,
    disabled,
    step = 1,
    value,
    ...props
  }) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "-" || e.key === "+") {
        e.preventDefault();
      }
      // Allow: backspace, delete, tab, escape, enter, ctrl+A and .
      const allowActions = [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "Ctrl+A",
        ".",
      ];

      // Allow number only
      if (!allowActions.includes(e.key) && !/^\d+$/.test(e.key)) {
        e.preventDefault();
      }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (isDecimal(min) && value === min.toFixed().toString()) {
        onNumberChange("");
        return;
      }

      const numericValue = parseFloat(value);
      if (numericValue < min) {
        onNumberChange(min);
        return;
      } else if (numericValue > max) {
        onNumberChange(max);
        return;
      }

      onNumberChange(numericValue);
    };

    const onIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (disabled) {
        return;
      }
      // Increment value
      if (value || value === 0) {
        if (Number(value) < max) {
          onNumberChange(Number(value) + step);
        }
      } else {
        onNumberChange(min);
      }
    };

    const onDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (disabled) {
        return;
      }
      // Decrement value
      if (value) {
        if (Number(value) > min) {
          onNumberChange(Number(value) - step);
        }
      } else {
        onNumberChange(min);
      }
    };

    return (
      <div className={cn("custom-number-input relative", wrapperClassName)}>
        <Input
          {...props}
          type="number"
          className={className}
          onKeyDown={onKeyDown}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
        <div className="absolute right-0 top-1 bottom-1 flex flex-col justify-center px-2">
          <button
            className={cn("text-xs text-gray-400", {
              "cursor-not-allowed": value === max,
            })}
            disabled={value === max}
            onClick={(e) => onIncrement(e)}
          >
            <ChevronUpIcon size={20} />
          </button>
          <button
            className={cn("text-xs text-gray-400", {
              "cursor-not-allowed": value === min,
            })}
            disabled={value === min}
            onClick={(e) => onDecrement(e)}
          >
            <ChevronDownIcon size={20} />
          </button>
        </div>
        {/* indicator icon */}
        <span className="absolute right-5 top-0 bottom-0 flex items-center pr-2 border-l border-input m-auto h-[60%]">
          &nbsp;
        </span>
      </div>
    );
  }
);

CustomNumberInput.displayName = "CustomNumberInput";

export { CustomNumberInput };
