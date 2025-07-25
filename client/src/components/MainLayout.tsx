// src/components/MainLayout.tsx
import React from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      className="
        min-h-screen
        bg-white
        dark:bg-gradient-to-b
        dark:from-[#0F0F12]
        dark:to-[#1F1F23]
        transition-colors
        duration-500
      "
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-16">
              <TopNav />
            </header>
            <main
              className="flex-1 p-4 overflow-y-auto bg-inherit"
              style={{ minHeight: "calc(100vh - 4rem)" }}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
