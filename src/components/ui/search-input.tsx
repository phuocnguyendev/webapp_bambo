import { cn } from "@/lib/utils";
import debounce from "lodash/debounce";
import { SearchIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsMounted, useUnmount } from "usehooks-ts";
import { Input, type InputProps } from "./input";

interface SearchProps extends InputProps {
  wrapperClassName?: string;
  hasSearchIcon?: boolean;
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchProps> = ({
  hasSearchIcon,
  value,
  onSearch,
  className,
  wrapperClassName,
  ...props
}) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState<string>("");
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted()) {
      setQuery(value?.toString() ?? "");
    }
  }, [isMounted, value]);

  useUnmount(() => {
    setQuery("");
  });

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className={cn("relative w-full", wrapperClassName)}>
      <Input
        {...props}
        value={query}
        onChange={handleChange}
        placeholder={props.placeholder || t("label.typeToSearch")}
        className={cn(className, hasSearchIcon && "w-full pr-10 rounded-full")}
      />
      {hasSearchIcon && (
        <div className="absolute right-3 top-0 h-full flex items-center">
          <SearchIcon size={16} />
        </div>
      )}
    </div>
  );
};

export { SearchInput };
