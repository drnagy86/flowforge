import TopNavBar from './TopNavBar';
import { ReactNode } from 'react';

const LayoutShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pt-16"> {/* room for fixed top nav */}
      <TopNavBar />
      {children}
    </div>
  );
};

export default LayoutShell;
