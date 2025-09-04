import { useTheme } from "styled-components";
import { Bars } from "../icons/loader-bars";
import type { Theme } from "@/utils/theme";
export function Loader() {
  const theme = useTheme() as Theme;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-[60]">
      <div className="flex justify-center items-center">
        <Bars
          height={32}
          width={32}
          color={theme?.colors?.brand?.primary}
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    </div>
  );
}
