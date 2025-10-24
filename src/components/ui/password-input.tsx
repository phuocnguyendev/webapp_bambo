import i18n from "i18next";
import { CheckSquare, Eye, EyeOff, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { If, Then } from "react-if";
import { Button } from "./button";
import { FormMessage } from "./form";
import { Input } from "./input";
import { generatePassword } from "@/utils/passwordGenerator";

type ErrorType = {
  type: string;
  message: string;
  isValid: boolean;
};

const initStatus = [
  {
    type: "length",
    message: i18n.t("password.min"),
    isValid: false,
  },
  {
    type: "uppercase",
    message: i18n.t("password.uppercase"),
    isValid: false,
  },
  {
    type: "lowercase",
    message: i18n.t("password.lowercase"),
    isValid: false,
  },
  {
    type: "number",
    message: i18n.t("password.number"),
    isValid: false,
  },
  {
    type: "special",
    message: i18n.t("password.special"),
    isValid: false,
  },
];

const usePasswordValidation = (password: string): ErrorType[] => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [status, setStatus] = useState<ErrorType[]>([...initStatus]);

  useEffect(() => {
    if (!enabled && password) {
      setEnabled(true);
    }

    setStatus((prevStatus) =>
      prevStatus.map((error) => {
        let isValid = false;
        switch (error.type) {
          case "length":
            isValid = password.length >= 8;
            break;
          case "uppercase":
            isValid = /[A-Z]/.test(password);
            break;
          case "lowercase":
            isValid = /[a-z]/.test(password);
            break;
          case "number":
            isValid = /[0-9]/.test(password);
            break;
          case "special":
            isValid = /[!"#$%&'()*+,-./:;<=>?@[\]\\^_`{|}~]+/.test(password);
            break;
        }
        return { ...error, isValid };
      })
    );
  }, [password, enabled]);

  return enabled ? status : [];
};

interface PasswordInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {
  hasGenerateButton?: boolean;
  hasShowErrors?: boolean;
}

const PasswordInput = React.forwardRef<
  React.ComponentRef<typeof Input>,
  PasswordInputProps
>(
  (
    {
      value,
      onChange,
      hasGenerateButton = true,
      hasShowErrors = true,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const errors = usePasswordValidation(value as string);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleGeneratePassword = () => {
      const newPassword = generatePassword();

      if (onChange) {
        onChange({ target: { value: newPassword } } as any);
      }
    };

    return (
      <div className="w-full space-y-3">
        <div className="relative w-full">
          <Input
            ref={ref}
            {...props}
            value={value}
            onChange={onChange}
            type={showPassword ? "text" : "password"}
            className="w-full border p-2 rounded pl-12 pr-20"
            autoComplete="new-password"
          />
          <div className="absolute left-0 top-0 h-full flex items-center">
            <Button
              type="button"
              onClick={toggleShowPassword}
              className="focus:outline-none rounded-r-none"
              size="icon"
              variant="secondary"
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </Button>
          </div>
          {hasGenerateButton && (
            <Button
              type="button"
              onClick={handleGeneratePassword}
              className="absolute right-0 top-0 h-full  rounded-l-none focus:outline-none"
            >
              {i18n.t("button.generate")}
            </Button>
          )}
        </div>

        <If condition={hasShowErrors}>
          <Then>
            {!errors?.some((error) => !error.isValid) && <FormMessage />}

            <div className="space-y-2">
              {errors.map((error) => (
                <div
                  key={error.type}
                  className={`flex items-center gap-2 text-sm ${
                    error.isValid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span>
                    {error.isValid ? (
                      <CheckSquare size={16} />
                    ) : (
                      <X size={16} />
                    )}
                  </span>
                  <span>{error.message}</span>
                </div>
              ))}
            </div>
          </Then>
        </If>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
