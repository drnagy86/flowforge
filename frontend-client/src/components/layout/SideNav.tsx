// src/components/layout/SideNav.tsx
import { NavLink } from 'react-router-dom';

const SideNav = () => {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 text-sm rounded transition 
    ${
      isActive
        ? 'bg-forge-ember text-white font-semibold'
        : 'text-slate-300 hover:bg-forge-ember/20 hover:text-white'
    }`;

  return (
    <aside className="w-60 bg-forge-dark backdrop-blur-md border-r border-forge-dark min-h-screen p-4">
      {/* <h2 className="text-lg font-semibold text-forge-heat mb-6 tracking-wide">
        FlowForge
      </h2> */}
      <nav className="space-y-2">
        <NavLink to="/home" className={navItemClass}>
          Home
        </NavLink>
        {/* Add more nav items here as needed */}
      </nav>
    </aside>
  );
};

export default SideNav;
