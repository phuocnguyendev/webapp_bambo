import {
  MenuConfig,
  type SidebarMenuItem,
} from "@/components/Layout/MenuConfig";
import { Home } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path: string;
}
interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

function findMenuTrail(
  pathname: string,
  menu: SidebarMenuItem[]
): BreadcrumbItem[] | null {
  for (const item of menu) {
    const itemPath = item.path || "/";
    // Chuyển path động thành regex: /abc/:id -> /abc/[^/]+
    const regexPath = itemPath.replace(/:[^/]+/g, "[^/]+");
    const regex = new RegExp(`^${regexPath}$`);
    if (regex.test(pathname)) {
      return [{ label: item.label, path: itemPath }];
    }

    // If pathname starts with itemPath, try children
    if (
      itemPath !== "/" &&
      (pathname.startsWith(
        itemPath.endsWith("/") ? itemPath : itemPath + "/"
      ) ||
        new RegExp(`^${regexPath}(/|$)`).test(pathname))
    ) {
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
      return [{ label: item.label, path: itemPath }];
    }

    // If item has children, search recursively
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
    crumbs = findMenuTrail(pathname, MenuConfig as SidebarMenuItem[]) ?? [];

    const last = crumbs.length ? crumbs[crumbs.length - 1].path : "";
    let remainder = pathname.slice(last.length).replace(/^\/+/, "");
    if (remainder) {
      let acc = last || "/";
      for (const raw of remainder.split("/").filter(Boolean)) {
        acc = acc.replace(/\/$/, "") + "/" + raw;
        const key = raw
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        const EXTRA_VN: Record<string, string> = {
          themmoi: "Thêm mới",
          capnhat: "Cập nhật",
          chinhsua: "Chỉnh sửa",
          create: "Thêm mới",
          update: "Cập nhật",
          edit: "Chỉnh sửa",
          chitiet: "Chi tiết",
          detail: "Chi tiết",
          details: "Chi tiết",
        };
        let label =
          EXTRA_VN[key] ||
          (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            raw
          )
            ? "Chi tiết"
            : raw.charAt(0).toUpperCase() + raw.slice(1));
        crumbs.push({ label, path: acc });
      }
    }
  }

  return (
    <nav className="flex items-center space-x-1 text-base font-medium my-2">
      <Link to="/" className="flex items-center text-green-700 hover:underline">
        <Home className="mr-1 w-4 h-4" /> Trang chủ
      </Link>
      {crumbs.map((item, idx) => (
        <React.Fragment key={item.path}>
          <span className="mx-1 text-green-700">&#187;</span>
          {idx === 0 || idx === crumbs!.length - 1 ? (
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
