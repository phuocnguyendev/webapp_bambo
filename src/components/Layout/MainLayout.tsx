import { useRouteHelmet } from "@/hooks/useRouteHelmet";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import { Button } from "../ui/button";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useRouteHelmet();

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          "sidebar-container hidden md:block transition-all duration-300 relative",
          isSidebarCollapsed ? "w-20" : "w-70"
        )}
      >
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute top-20 -right-3 bg-white border border-gray-200 shadow-md hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center z-50 p-0"
          title={isSidebarCollapsed ? "Mở sidebar" : "Thu nhỏ sidebar"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </aside>
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        <TopBar />
        <div className="w-full px-8">{!isHome && <Breadcrumbs />}</div>
        <main className="flex-1 pt-6 px-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
