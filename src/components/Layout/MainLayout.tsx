import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import Breadcrumbs from "../Breadcrumbs";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex min-h-screen">
      <aside className="w-70 sidebar-container hidden md:block">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <TopBar />
        <div className="w-full px-8">{!isHome && <Breadcrumbs />}</div>
        <main className="flex-1 px-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
