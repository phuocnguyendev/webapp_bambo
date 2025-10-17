import RcSelect from "react-select";
import RcAsyncSelect from "react-select/async";
import { useTheme } from "styled-components";

import { cn } from "@/lib/utils";
import React from "react";
import type { Theme } from "@/utils/theme";

interface SelectProps extends React.ComponentPropsWithoutRef<typeof RcSelect> {
  disabled?: boolean;
  hasError?: boolean;
}
interface AsyncSelectProps
  extends React.ComponentPropsWithoutRef<typeof RcAsyncSelect> {
  disabled?: boolean;
}

const getCustomStyles = (theme: Theme, hasError?: boolean) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "2.5rem",
    background: state.isDisabled ? theme.colors.muted : "transparent",
    border: `${state.isDisabled ? 0 : 1}px solid ${
      hasError ? "#d2232a" : theme.colors.input
    }`,
    borderRadius: theme?.borderRadius?.DEFAULT,
    boxShadow: state.isFocused
      ? hasError
        ? `0 0 0 2px ${theme.colors.destructive}`
        : theme.boxShadow.ring
      : "none",
    "&:hover": {
      borderColor: hasError ? theme.colors.destructive : theme.colors.input,
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? theme.colors.accent.DEFAULT
      : "transparent",
    color: state.isSelected
      ? theme.colors.accent.foreground
      : theme.colors.foreground,
    opacity: state.isDisabled && !state.isSelected ? 0.5 : 1,
    "&:hover": {
      backgroundColor: !state.isSelected ? theme.colors.accent.DEFAULT : "",
      color: theme.colors.accent.foreground,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
    },
  }),
  singleValue: (p: any) => ({ ...p, color: theme.colors.foreground }),
  menuPortal: (base: any) => ({ ...base, zIndex: 99999 }),
  menu: (base: any) => ({ ...base, zIndex: 99999 }),
});

const classNames = {
  container: () => "relative",
  control: () => "flex w-full items-center justify-between rounded-md text-sm",
  menu: () =>
    "max-h-96 min-w-[8rem] rounded-md border bg-popover text-popover-foreground shadow-md",
  menuList: () => "space-y-1",
  option: (state: any) =>
    cn(
      "w-full rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      state.isSelected && "font-semibold"
    ),
};

const Select = React.forwardRef<
  React.ComponentRef<typeof RcSelect>,
  SelectProps
>(({ className, styles, disabled, isDisabled, hasError, ...props }, ref) => {
  const theme = useTheme() as Theme;

  const customStyles = getCustomStyles(theme, hasError);

  const mergedStyles = {
    ...customStyles,
    ...(styles || {}),
    control: (provided: any, state: any) => {
      if (styles?.control) {
        return styles.control(provided, state);
      }
      return customStyles.control(provided, state);
    },
  };

  return (
    <RcSelect
      {...props}
      ref={ref}
      isDisabled={disabled || isDisabled}
      className={cn("react-select-container w-full rounded-lg", className)}
      classNamePrefix="react-select"
      styles={mergedStyles}
      classNames={classNames}
      placeholder="Chọn..."
    />
  );
});

Select.displayName = "Select component";

export { Select };
export type { AsyncSelectProps, SelectProps };
