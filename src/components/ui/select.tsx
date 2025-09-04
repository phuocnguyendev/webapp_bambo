import RcSelect from "react-select";
import RcAsyncSelect from "react-select/async";
import { useTheme } from "styled-components";
import type { Theme } from "@/utils/theme";

import { cn } from "@/lib/utils";
import React from "react";

interface SelectProps extends React.ComponentPropsWithoutRef<typeof RcSelect> {
  disabled?: boolean;
}
interface AsyncSelectProps
  extends React.ComponentPropsWithoutRef<typeof RcAsyncSelect> {
  disabled?: boolean;
}

const getCustomStyles = (theme: Theme) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "2.5rem",
    background: state.isDisabled ? "bg-muted" : "transparent",
    border: `${state.isDisabled ? 0 : 1}px solid ${theme.colors.input}`,
    borderRadius: theme?.borderRadius?.DEFAULT,
    boxShadow: state.isFocused ? theme.boxShadow.ring : "none",
    "&:hover": {
      borderColor: theme.colors.input,
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? theme.colors.accent.DEFAULT
      : "transparent",
    color: state.isSelected ? "var(--active)" : theme.colors.foreground,
    opacity: state.isDisabled && !state.isSelected ? 0.5 : 1,
    "&:hover": {
      backgroundColor: !state.isSelected ? theme.colors.accent.DEFAULT : "",
      color: theme.colors.accent.foreground,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
    },
    "&.focus": {
      backgroundColor: theme.colors.accent.DEFAULT,
      color: theme.colors.accent.foreground,
    },
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    cursor: state.isDisabled ? "not-allowed" : "default",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: theme.colors.foreground,
  }),
});

const classNames = {
  container: () => "relative",
  control: () => "flex w-full items-center justify-between rounded-md text-sm",
  menu: () =>
    "z-50 max-h-96 min-w-[8rem] rounded-md border bg-popover text-popover-foreground shadow-md",
  menuList: () => "space-y-1",
  option: (state: any) =>
    cn(
      "w-full rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      state.isSelected && "font-semibold"
    ),
};

const Select = React.forwardRef<React.ElementRef<typeof RcSelect>, SelectProps>(
  (
    {
      className,
      styles,
      disabled,
      isDisabled,
      menuPortalTarget = document.body,
      ...props
    },
    ref
  ) => {
    const theme = useTheme() as import("@/utils/theme").Theme;
    const customStyles = getCustomStyles(theme);

    return (
      <RcSelect
        {...props}
        ref={ref}
        isDisabled={disabled || isDisabled}
        className={cn("react-select-container w-full", className)}
        classNamePrefix="react-select"
        styles={{ ...styles, ...customStyles }}
        classNames={classNames}
        menuPortalTarget={menuPortalTarget}
      />
    );
  }
);

Select.displayName = "Select component";

const AsyncSelect = React.forwardRef<
  React.ElementRef<typeof RcAsyncSelect>,
  AsyncSelectProps
>(({ className, styles, disabled, isDisabled, ...props }, ref) => {
  const theme = useTheme() as import("@/utils/theme").Theme;
  const customStyles = getCustomStyles(theme);

  return (
    <RcAsyncSelect
      isDisabled={disabled || isDisabled}
      cacheOptions={true}
      className={cn("react-select-container w-full", className)}
      classNamePrefix="react-select"
      styles={{ ...styles, ...customStyles }}
      classNames={classNames}
      menuPortalTarget={document.body}
      menuPlacement="auto"
      ref={ref}
      {...props}
    />
  );
});

AsyncSelect.displayName = "AsyncSelect";

export { AsyncSelect, Select };
export type { AsyncSelectProps, SelectProps };
