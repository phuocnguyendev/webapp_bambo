import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import type { SidebarMenuItem as SidebarMenuItemType } from "./MenuConfig";
import { MenuConfig } from "./MenuConfig";

type Props = {
  className?: string;
  isCollapsed?: boolean;
};

function SidebarMenuItem({
  item,
  level = 0,
  parentPath = "",
  isCollapsed = false,
}: {
  item: SidebarMenuItemType;
  level?: number;
  parentPath?: string;
  isCollapsed?: boolean;
}) {
  const location = useLocation();
  const normalizePath = (base: string, p?: string) => {
    if (!p) return base;
    if (p.startsWith("/")) return p;
    if (!base || base === "/") return "/" + p;
    return base.replace(/\/$/, "") + "/" + p;
  };

  const fullPath = normalizePath(parentPath, item.path);
  const isActive = location.pathname === fullPath;
  const isAnyChildActive =
    item.children &&
    item.children.some((child: SidebarMenuItemType) => {
      const childFullPath = normalizePath(fullPath, child.path);
      return location.pathname === childFullPath;
    });

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
        title={isCollapsed ? item.label : undefined}
      >
        <div className="text-base flex-shrink-0">{item.icon}</div>
        {!isCollapsed && (
          <>
            <span className="text-sm drop-shadow-sm">{item.label}</span>
            {item.children && (
              <span className="ml-auto text-xs text-gray-500">
                {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            )}
          </>
        )}
      </NavLink>

      {item.children && open && !isCollapsed && (
        <div className="ml-4 border-l border-gray-200 pl-3">
          {item.children.map((child: SidebarMenuItemType) => (
            <SidebarMenuItem
              key={child.path}
              item={child}
              level={level + 1}
              parentPath={fullPath}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default function Sidebar({ isCollapsed = false }: Props) {
  return (
    <aside
      className={cn(
        "p-4 transition-all duration-300 h-full flex flex-col",
        isCollapsed && "px-2"
      )}
    >
      <div className="flex flex-col items-center mb-6">
        <img
          src="/contents/logo.png"
          alt="Logo"
          className={cn(
            "object-cover rounded-lg shadow transition-all duration-300",
            isCollapsed ? "w-10 h-10" : "w-20 h-20"
          )}
        />
      </div>
      <ScrollArea
        type="hover"
        className="flex-1 min-h-0"
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        {MenuConfig.map((item: SidebarMenuItemType) => (
          <SidebarMenuItem
            key={item.label}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
      </ScrollArea>
    </aside>
  );
}
