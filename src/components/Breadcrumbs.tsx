import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import {
  MenuConfig,
  type SidebarMenuItem,
} from "@/components/Layout/MenuConfig";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

// Try to find a trail of menu items that match the current pathname.
function findMenuTrail(
  pathname: string,
  menu: SidebarMenuItem[]
): BreadcrumbItem[] | null {
  for (const item of menu) {
    // Normalize paths
    const itemPath = item.path || "/";
    if (itemPath === pathname) {
      return [{ label: item.label, path: itemPath }];
    }

    // If pathname starts with itemPath, try children
    if (
      itemPath !== "/" &&
      pathname.startsWith(itemPath.endsWith("/") ? itemPath : itemPath + "/")
    ) {
      if (item.children?.length) {
        // Build full child path for matching (children may be absolute or relative)
        const childTrail = findMenuTrail(
          pathname,
          item.children.map((c) => ({
            ...c,
            path:
              c.path && c.path.startsWith("/")
                ? c.path
                : `${itemPath.replace(/\/$/, "")}/${c.path}`,
          }))
        );

        if (childTrail) {
          return [{ label: item.label, path: itemPath }, ...childTrail];
        }
      }

      // no matching child but item is a prefix; return the item as the best match
      return [{ label: item.label, path: itemPath }];
    }

    // If item has children, search recursively (covers cases where child path may not start with parent due to absolute paths)
    if (item.children?.length) {
      const childTrail = findMenuTrail(
        pathname,
        item.children.map((c) => ({
          ...c,
          path:
            c.path && c.path.startsWith("/")
              ? c.path
              : `${itemPath.replace(/\/$/, "")}/${c.path}`,
        }))
      );
      if (childTrail) {
        return [{ label: item.label, path: itemPath }, ...childTrail];
      }
    }
  }

  return null;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const location = useLocation();
  const pathname = location.pathname || "/";

  let crumbs: BreadcrumbItem[] | null = items ?? null;

  if (!crumbs) {
    crumbs = findMenuTrail(pathname, MenuConfig as SidebarMenuItem[]);
  }

  if (!crumbs) {
    crumbs = pathname
      .split("/")
      .filter(Boolean)
      .map((segment, idx, arr) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: "/" + arr.slice(0, idx + 1).join("/"),
      }));
  }

  return (
    <nav className="flex items-center space-x-1 text-base font-medium my-2">
      <Link to="/" className="flex items-center text-green-700 hover:underline">
        <Home className="mr-1 w-4 h-4" /> Trang chủ
      </Link>
      {crumbs.map((item, idx) => (
        <React.Fragment key={item.path}>
          <span className="mx-1 text-green-700">&#187;</span>
          {idx === crumbs!.length - 1 ? (
            <span className="text-gray-900">{item.label}</span>
          ) : (
            <Link to={item.path} className="text-green-700 hover:underline">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
