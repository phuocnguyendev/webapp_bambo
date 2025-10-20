import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { path } from "@/constants/path";
import { useAuthContext } from "@/features/Auth/hooks/useAuthContext";
import { clearTokens } from "@/features/Auth/utils/utils";
import { ArrowDown } from "lucide-react";

const UserMenu = () => {
  const handleLogout = () => {
    clearTokens();
    window.location.replace(path.Login);
  };
  const { user } = useAuthContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group/user inline-flex h-10 w-max text-sm items-center justify-center text-base">
        {user?.Name}
        <ArrowDown className="ml-5 h-3 w-3 transition duration-200 group/user-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function TopNavbar() {
  const { user } = useAuthContext();
  return (
    <>
      <div className="flex items-center gap-2 mr-4">
        <img
          src={
            user?.Avatar_url ||
            `https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/05/anh-cho-hai-104.jpg`
          }
          alt="App logo"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
      <ul className="flex items-center space-x-5">
        <li>
          <UserMenu />
        </li>
      </ul>
    </>
  );
}
