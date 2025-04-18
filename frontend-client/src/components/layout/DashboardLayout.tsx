// src/components/layout/DashboardLayout.tsx
import TopNavBar from './TopNavBar';
import SideNav from './SideNav';
import { ReactNode } from 'react';

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-forge-surface text-white overflow-hidden">
      <SideNav />
      <div className="flex flex-col flex-1">
        <TopNavBar />
        <main className="flex-1 overflow-y-auto p-6 bg-forge-surface text-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
