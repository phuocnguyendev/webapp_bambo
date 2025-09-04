import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout: Dùng cho các trang chính (có sidebar, topbar, ...)
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        {/* Bạn có thể import Sidebar component ở đây */}
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 border-b bg-white flex items-center px-4 shadow-sm sticky top-0 z-10">
          {/* Bạn có thể import Topbar component ở đây */}
        </header>
        <main className="flex-1 p-4 bg-background">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
