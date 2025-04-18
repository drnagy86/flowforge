// src/components/layout/TopNavBar.tsx

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { externalLinks } from '@/config';

const TopNavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(sessionStorage.getItem('accessToken'));
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    sessionStorage.clear();
    setMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full h-16 bg-[rgba(15,17,23,0.7)] backdrop-blur-md text-white border-b border-forge-ash px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50">

      {/* Left: Logo */}
      <div
  className="h-10 w-auto flex items-center cursor-pointer"
  onClick={() => navigate('/')}
>
  <img
    src="/images/flowforge-logo.png"
    alt="FlowForge Logo"
    className="h-full w-auto object-contain"
  /> <div className="text-lg font-bold text-w ml-2">FlowForge</div>
</div>



      {/* Right Side: External Links + Auth */}
      <div className="flex items-center space-x-4">
        <nav className="flex items-center space-x-3 text-sm">
          <a
            href={externalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-forge-heat"
            title="GitHub"
          >
            <span className="sr-only">GitHub</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.205 11.386c.6.11.82-.258.82-.577v-2.04c-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.089-.745.083-.73.083-.73 1.204.084 1.837 1.236 1.837 1.236 1.07 1.833 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.604-2.665-.306-5.466-1.334-5.466-5.933 0-1.311.468-2.382 1.235-3.222-.124-.303-.535-1.527.117-3.176 0 0 1.007-.322 3.3 1.23a11.5 11.5 0 013.004-.403c1.02.005 2.045.137 3.003.403 2.292-1.552 3.296-1.23 3.296-1.23.655 1.649.244 2.873.12 3.176.77.84 1.233 1.911 1.233 3.222 0 4.61-2.805 5.624-5.476 5.921.431.372.816 1.102.816 2.222v3.293c0 .322.216.694.824.576A12.004 12.004 0 0024 12c0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>
          <a
            href={externalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-forge-heat"
            title="LinkedIn"
          >
            <span className="sr-only">LinkedIn</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1s2.48 1 2.48 2.5zM0 8h5v14H0zM7.5 8h4.8v2.2h.07c.67-1.3 2.3-2.67 4.7-2.67 5 0 5.9 3.3 5.9 7.5V22h-5v-6.4c0-1.6-.03-3.7-2.25-3.7-2.27 0-2.6 1.75-2.6 3.6V22h-5z" />
            </svg>
          </a>
          {/* <a
            href="/contact"
            className="hover:text-forge-heat"
            title="Contact"
          >
            <span className="sr-only">Contact</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 3h20v18H2V3zm2 2v2h16V5H4zm0 4v10h16V9H4z" />
            </svg>
          </a> */}
        </nav>

        {!isLoggedIn ? (
          <button
            onClick={() => navigate('/login')}
            className="bg-forge-ember px-3 py-1.5 rounded text-sm hover:bg-orange-600 transition"
          >
            Sign In
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="px-3 py-1.5 rounded bg-forge-ember text-sm hover:bg-orange-600 transition"
            >
              Account
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10 w-32 text-gray-800">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavBar;
