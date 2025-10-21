import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import {
  MenuConfig,
  type SidebarMenuItem,
} from "@/components/Layout/MenuConfig";
import { path as PATHS } from "@/constants/path";

interface Crumb {
  label: string;
  path: string;
}

// Nhãn cho các segment ngoài menu
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

const isUuidV4 = (s: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    s
  );
const isObjectId = (s: string) => /^[0-9a-fA-F]{24}$/.test(s);
const isNumericId = (s: string) => /^\d+$/.test(s);

const joinPath = (base: string, p?: string) => {
  if (!p) return base || "/";
  if (p.startsWith("/")) return p;
  if (!base || base === "/") return "/" + p;
  return base.replace(/\/$/, "") + "/" + p;
};

const isSameOrChild = (pathname: string, base: string) =>
  !!base &&
  (pathname === base ||
    pathname.startsWith(base.endsWith("/") ? base : base + "/"));

/**
 * Tìm trail theo MenuConfig:
 * - Ưu tiên path-prefix (nếu item có path)
 * - Vẫn giữ label cha khi cha không có path
 */
function trailFromMenu(
  pathname: string,
  menu: SidebarMenuItem[],
  base = ""
): Crumb[] | null {
  for (const item of menu) {
    const hasPath = !!item.path;
    const full = hasPath ? joinPath(base, item.path!) : base;

    // match chính xác
    if (hasPath && pathname === full) {
      return [{ label: item.label, path: full }];
    }

    // thử children
    const childBase = hasPath ? full : base;
    if (item.children?.length) {
      const childTrail = trailFromMenu(pathname, item.children, childBase);
      if (childTrail) {
        // cha không có path: dùng path của crumb con đầu tiên
        const parentPath = hasPath ? full : childTrail[0]?.path || "/";
        return [{ label: item.label, path: parentPath }, ...childTrail];
      }
    }

    // cha có path & là prefix của pathname → best match
    if (hasPath && isSameOrChild(pathname, full)) {
      return [{ label: item.label, path: full }];
    }
  }
  return null;
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  const crumbs = useMemo<Crumb[]>(() => {
    const HOME = PATHS?.Home ?? "/";
    let trail = trailFromMenu(pathname, MenuConfig as SidebarMenuItem[]) ?? [];

    // bỏ “Trang chủ” trong trail (vì đã render icon/link riêng)
    trail = trail.filter((c) => c.path !== HOME && c.path !== "/");

    // bù các phần dư sau crumb cuối (ThemMoi/CapNhat/:id…)
    const last = trail.at(-1)?.path ?? HOME;
    const remainder = pathname.slice(last.length).replace(/^\/+/, "");
    if (remainder) {
      let acc = last || "/";
      for (const raw of remainder.split("/").filter(Boolean)) {
        acc = joinPath(acc, raw);
        const key = raw
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        const label =
          EXTRA_VN[key] ||
          (isUuidV4(raw) || isObjectId(raw) || isNumericId(raw)
            ? "Chi tiết"
            : raw);
        trail.push({ label, path: acc });
      }
    }

    // xoá trùng liên tiếp nếu có
    const dedup: Crumb[] = [];
    for (const c of trail) {
      if (!dedup.length || dedup[dedup.length - 1].label !== c.label)
        dedup.push(c);
    }
    return dedup;
  }, [pathname]);

  return (
    <nav className="flex items-center space-x-1 text-base font-medium my-2">
      <Link
        to={PATHS?.Home ?? "/"}
        className="flex items-center text-green-700 hover:underline"
      >
        <Home className="mr-1 w-4 h-4" /> Trang chủ
      </Link>
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <React.Fragment key={`${c.path}-${i}`}>
            <span className="mx-1 text-green-700">&#187;</span>
            {last ? (
              <span className="text-gray-900">{c.label}</span>
            ) : (
              <Link to={c.path} className="text-green-700 hover:underline">
                {c.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
