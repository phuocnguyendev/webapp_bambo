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

export default function TopNavbar() {
  return (
    <ul className="flex items-center space-x-5">
      <li>
        <UserMenu />
      </li>
    </ul>
  );
}
