import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  GitCompare, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {FaUserFriends ,FaUserTie, FaSignInAlt } from 'react-icons/fa';

function Navbar({ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Companies', href: '/companies', icon: Building2 },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Distribution', href: '/distribution', icon: GitCompare },
    { name: 'Users', href: '/users', icon: FaUserFriends },
    { name: 'Profile', href: '/profile', icon: FaUserTie  },
    { name: 'Log out', href: '/', icon: FaSignInAlt  },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {/* Backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-white">Algérie Télécom</h1>
            <button
              className="rounded-md p-2 text-white hover:bg-green-800"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-4 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-green-700 text-white'
                      : 'text-white hover:bg-green-700'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between h-16  bg-blue-900 text-white shadow-sm px-4 lg:hidden">
        <button
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-green-700"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-xl font-semibold text-white">Algérie Télécom </h1>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:z-10  lg:flex lg:flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
        <div className="flex flex-col flex-grow  shadow-lg bg-blue-900 text-white">
          <div className="h-16 flex items-center text-white justify-between border-b border-blue-500 px-4 bg-white">
            {!sidebarCollapsed && (
              
              <div className='w-28 h-12 flex ml-14'>
      <img 
        src="https://www.algerietelecom.dz/assets/front/img/logo.svg"
      ></img>
      </div>

            )}
            <button
              className="p-1.5 rounded-lg hover:bg-blue-700 bg-blue-800"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex-1 flex flex-col mt-5 overflow-y-auto text-white">
            <nav className="flex-1 px-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-800 text-white font-semibold'
                        : 'text-white hover:bg-green-600 hover:text-gray-900'
                    } ${sidebarCollapsed ? 'justify-center' : ''}`}
                    title={sidebarCollapsed ? item.name : ''}
                  >
                    <Icon className={`h-5 w-5 ${!sidebarCollapsed && 'mr-3'}`} />
                    {!sidebarCollapsed && item.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;