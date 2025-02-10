import { NavLink, useLocation } from 'react-router-dom';
import { mainNavigationConfig } from '../../../config/navigationConfig';
import { AuthContext } from '../../../context/AuthContext';
import { useContext, useState, useEffect } from 'react';

export const Header = () => {
  const { auth, handleLogout } = useContext(AuthContext);
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  // Update active page when location changes
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 max-w-6xl mx-auto h-16 flex justify-between items-center px-6 py-4 shadow-md bg-white z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <span className="text-lg font-bold">logo</span>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6">
        {mainNavigationConfig?.map(({ roles, title, to }, index) => {
          const hasAccess = auth?.user?.roles?.some((item) =>
            roles.includes(item.role.name)
          );

          return (
            hasAccess && (
              <NavLink
                key={`${title}_${to}_${index}`}
                to={to}
                onClick={() => setActivePage(to)}
                className={`relative py-2 px-3 font-semibold text-sm ${
                  activePage === to
                    ? 'text-black border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {title}
              </NavLink>
            )
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={() => handleLogout()}
        className="text-red-500 font-semibold hover:text-red-700 cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
};
