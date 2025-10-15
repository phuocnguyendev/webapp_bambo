import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { NavLink, useLocation } from "react-router-dom";
import { MenuConfig } from "./MenuConfig";
import type { SidebarMenuItem as SidebarMenuItemType } from "./MenuConfig";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  className?: string;
};

function SidebarMenuItem({
  item,
  level = 0,
  parentPath = "",
}: {
  item: SidebarMenuItemType;
  level?: number;
  parentPath?: string;
}) {
  const location = useLocation();
  const fullPath = item.path.startsWith("/")
    ? item.path
    : parentPath + (item.path ? "/" + item.path : "");
  const isActive = location.pathname === fullPath;
  const isAnyChildActive =
    item.children &&
    item.children.some(
      (child: SidebarMenuItemType) =>
        location.pathname ===
        (child.path.startsWith("/") ? child.path : fullPath + "/" + child.path)
    );

  const [open, setOpen] = useState<boolean>(!!isAnyChildActive);

  const handleParentClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (item.children) {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };
  return (
    <div className={cn("mb-2", level > 0 && "ml-2")}>
      <NavLink
        to={item.path || (item.children && item.children[0]?.path) || "#"}
        className={({ isActive: navActive }) =>
          cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer select-none no-underline",
            (isActive || navActive || isAnyChildActive) && !item.children
              ? "bg-green-100 text-green-800 font-semibold"
              : item.children && (open || isAnyChildActive)
              ? "bg-green-50 text-green-800 font-semibold"
              : "hover:bg-gray-100 text-gray-800"
          )
        }
        end
        onClick={handleParentClick}
        aria-expanded={item.children ? open : undefined}
      >
        <div className="text-base flex-shrink-0">{item.icon}</div>{" "}
        <span className="text-sm drop-shadow-sm">{item.label}</span>
        {item.children && (
          <span className="ml-auto text-xs text-gray-500">
            {open ? <ChevronUp /> : <ChevronDown />}
          </span>
        )}
      </NavLink>

      {item.children && open && (
        <div className="ml-4 border-l border-gray-200 pl-3">
          {item.children.map((child: SidebarMenuItemType) => (
            <SidebarMenuItem
              key={child.path}
              item={child}
              level={level + 1}
              parentPath={fullPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default function Sidebar({ className }: Props) {
  return (
    <ScrollArea
      type="hover"
      className={cn("h-full lg:h-[calc(100vh-60px)]", className)}
    >
      <aside className="p-4">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/contents/logo.png"
            alt="Logo"
            className="w-20 h-20 object-contain rounded-lg shadow"
          />
        </div>
        {MenuConfig.map((item: SidebarMenuItemType) => (
          <SidebarMenuItem key={item.label} item={item} />
        ))}
      </aside>
    </ScrollArea>
  );
}
