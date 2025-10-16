import React from "react";
import {
  Home,
  User,
  ShieldCheck,
  Package,
  FileText,
  BadgeCheck,
  Layers,
  Repeat,
  Truck,
  Users,
  Warehouse as WarehouseIcon,
} from "lucide-react";
import { path } from "@/constants/path";

export interface SidebarMenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: SidebarMenuItem[];
}

export const MenuConfig: SidebarMenuItem[] = [
  {
    label: "Trang chủ",
    path: "/",
    icon: <Home size={20} />,
  },
  {
    label: "Quản lý tài khoản",
    path: "/QuanLyTaiKhoan",
    icon: <User size={20} />,
  },
  {
    label: "Phân quyền",
    path: "/permission",
    icon: <ShieldCheck size={20} />,
  },
  {
    label: "Sản phẩm",
    path: "/course",
    icon: <Package size={20} />,
    children: [
      {
        label: "Danh mục sản phẩm",
        path: path.courseManagement,
      },
      {
        label: "Thương hiệu",
        path: "/product/brand",
      },
    ],
  },
  {
    label: "Nhập kho",
    path: "/receipt",
    icon: <FileText size={20} />,
  },
  {
    label: "Vai trò",
    path: "/role",
    icon: <BadgeCheck size={20} />,
  },
  {
    label: "Tồn kho",
    path: "/stock",
    icon: <Layers size={20} />,
  },
  {
    label: "Dịch chuyển kho",
    path: "/stock-movement",
    icon: <Repeat size={20} />,
  },
  {
    label: "Chi tiết xuất kho",
    path: "/stockOutItem",
    icon: <Truck size={20} />,
  },
  {
    label: "Phiếu xuất kho",
    path: "/stockOutVoucher",
    icon: <FileText size={20} />,
  },
  {
    label: "Nhà cung cấp",
    path: "/supplier",
    icon: <Truck size={20} />,
  },
  {
    label: "Người dùng",
    path: "/user",
    icon: <Users size={20} />,
  },
  {
    label: "Kho hàng",
    path: "/warehouse",
    icon: <WarehouseIcon size={20} />,
  },
];
