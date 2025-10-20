import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface RenderFieldProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  options?: Option[];
  isSwitch?: boolean;
  disabled?: boolean;
  className?: string;
}

const RenderField: React.FC<RenderFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  options,
  isSwitch = false,
  disabled = false,
  className,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {isSwitch ? (
            <div className="flex items-center gap-2">
              <FormLabel className="mb-0">{label}</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
          ) : (
            <>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                {options ? (
                  <Select
                    value={
                      options.find((opt) => opt.value === field.value) || null
                    }
                    onChange={(option) =>
                      field.onChange((option as any)?.value || "")
                    }
                    options={options}
                    isClearable
                    hasError={!!fieldState?.error}
                    placeholder={placeholder}
                  />
                ) : (
                  <Input
                    type={type}
                    placeholder={placeholder}
                    {...field}
                    disabled={disabled}
                    className={
                      fieldState?.error ? "border border-destructive" : ""
                    }
                  />
                )}
              </FormControl>
            </>
          )}
          <FormMessage className="-mt-1 text-base" />
        </FormItem>
      )}
    />
  );
};

export default RenderField;
