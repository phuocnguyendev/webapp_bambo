import React from "react";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

/**
 * DefaultLayout: Dùng cho các trang không cần sidebar/topbar (login, error, landing...)
 */
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
