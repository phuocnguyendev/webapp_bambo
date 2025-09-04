import { NLFlag, UKFlag } from "@/components/icons/flags";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group/user inline-flex h-10 w-max text-sm items-center justify-center ">
        {"PhuocNguyen"}
        <ChevronDown className="ml-5 h-3 w-3 transition duration-200 group/user-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link to="/">
          <DropdownMenuItem className="cursor-pointer">
            {t("entities.profile")}
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="cursor-pointer">
          {t("auth.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LanguageMenu = () => {
  const { i18n } = useTranslation();

  const handleChange = (lang: "en" | "nl") => {
    i18n.changeLanguage(lang).then(() => {
      window.location.reload();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-10 rounded-full bg-background">
        {i18n.language === "en" ? (
          <UKFlag className="h-8 w-8 rounded-full object-cover m-auto" />
        ) : (
          <NLFlag className="h-8 w-8 rounded-full object-cover m-auto" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleChange("en")}
        >
          <div className="inline-flex space-x-2">
            <UKFlag />
            <span className="my-auto">English</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleChange("nl")}
        >
          <div className="inline-flex space-x-2">
            <NLFlag />
            <span className="my-auto">Dutch</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function TopNavbar() {
  return (
    <ul className="flex items-center space-x-5">
      <li>
        <UserMenu />
      </li>
      <li>
        <LanguageMenu />
      </li>
    </ul>
  );
}
