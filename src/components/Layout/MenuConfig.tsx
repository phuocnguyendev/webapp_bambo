import { path } from "@/constants/path";
import {
  BadgeCheck,
  FileText,
  Home,
  Layers,
  Package,
  Repeat,
  ShieldCheck,
  Truck,
  User,
  Users,
  Warehouse as WarehouseIcon,
} from "lucide-react";
import React from "react";

export interface SidebarMenuItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: SidebarMenuItem[];
  helmet?: {
    title?: string;
    description?: string;
  };
}

export const MenuConfig: SidebarMenuItem[] = [
  {
    label: "Trang chủ",
    path: path.Home,
    icon: <Home size={20} />,
    helmet: {
      title: "Trang chủ - Bamboo Warehouse",
      description: "Trang chủ quản lý kho Bamboo",
    },
  },
  {
    label: "Quản lý tài khoản",
    path: path.ManagementAccount,
    icon: <User size={20} />,
    helmet: {
      title: "Quản lý tài khoản - Bamboo Warehouse",
      description: "Quản lý danh sách tài khoản trong hệ thống",
    },
  },
  {
    label: "Phân quyền",
    path: path.PhanQuyen,
    icon: <ShieldCheck size={20} />,
    helmet: {
      title: "Phân quyền - Bamboo Warehouse",
      description: "Quản lý Phân quyền người dùng",
    },
  },
  {
    label: "Sản phẩm",
    icon: <Package size={20} />,
    helmet: {
      title: "Quản lý sản phẩm - Bamboo Warehouse",
      description: "Quản lý danh mục sản phẩm và thương hiệu",
    },
    children: [
      {
        label: "Danh mục sản phẩm",
        path: path.CourseManagement,
        helmet: {
          title: "Danh mục sản phẩm - Bamboo Warehouse",
          description: "Quản lý danh mục sản phẩm",
        },
      },
      {
        label: "Thương hiệu",
        path: "/product/brand",
        helmet: {
          title: "Thương hiệu - Bamboo Warehouse",
          description: "Quản lý thương hiệu sản phẩm",
        },
      },
    ],
  },
  {
    label: "Nhập kho",
    path: "/receipt",
    icon: <FileText size={20} />,
    helmet: {
      title: "Nhập kho - Bamboo Warehouse",
      description: "Quản lý phiếu nhập kho",
    },
  },
  {
    label: "Vai trò",
    path: "/role",
    icon: <BadgeCheck size={20} />,
    helmet: {
      title: "Vai trò - Bamboo Warehouse",
      description: "Quản lý vai trò người dùng",
    },
  },
  {
    label: "Tồn kho",
    path: "/stock",
    icon: <Layers size={20} />,
    helmet: {
      title: "Tồn kho - Bamboo Warehouse",
      description: "Quản lý tồn kho sản phẩm",
    },
  },
  {
    label: "Dịch chuyển kho",
    path: "/stock-movement",
    icon: <Repeat size={20} />,
    helmet: {
      title: "Dịch chuyển kho - Bamboo Warehouse",
      description: "Quản lý dịch chuyển kho",
    },
  },
  {
    label: "Chi tiết xuất kho",
    path: "/stockOutItem",
    icon: <Truck size={20} />,
    helmet: {
      title: "Chi tiết xuất kho - Bamboo Warehouse",
      description: "Quản lý chi tiết xuất kho",
    },
  },
  {
    label: "Phiếu xuất kho",
    path: "/stockOutVoucher",
    icon: <FileText size={20} />,
    helmet: {
      title: "Phiếu xuất kho - Bamboo Warehouse",
      description: "Quản lý phiếu xuất kho",
    },
  },
  {
    label: "Nhà cung cấp",
    path: "/supplier",
    icon: <Truck size={20} />,
    helmet: {
      title: "Nhà cung cấp - Bamboo Warehouse",
      description: "Quản lý nhà cung cấp",
    },
  },
  {
    label: "Người dùng",
    path: "/user",
    icon: <Users size={20} />,
    helmet: {
      title: "Người dùng - Bamboo Warehouse",
      description: "Quản lý người dùng hệ thống",
    },
  },
  {
    label: "Kho hàng",
    path: "/warehouse",
    icon: <WarehouseIcon size={20} />,
    helmet: {
      title: "Kho hàng - Bamboo Warehouse",
      description: "Quản lý kho hàng",
    },
  },
];
