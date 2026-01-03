import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Users, FileText, Settings, LogOut } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link to={path}>
    <div className={`flex items-center px-6 py-3 my-1 cursor-pointer transition-colors ${
      active ? 'bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
    }`}>
      <Icon size={20} className="mr-3" />
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center mb-6">
        <div className="bg-indigo-600 p-1.5 rounded-lg mr-2">
          <div className="text-white font-bold text-sm">VCT</div>
        </div>
        <span className="text-xl font-bold text-slate-800">Tracker</span>
      </div>

      <nav className="flex-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" active={location.pathname === '/dashboard'} />
        <SidebarItem icon={Map} label="Geographic View" path="/map" active={location.pathname === '/map'} />
        <SidebarItem icon={Users} label="Demographics" path="/demographics" active={location.pathname === '/demographics'} />
        <SidebarItem icon={FileText} label="Reports" path="/reports" active={location.pathname === '/reports'} />
      </nav>

      <div className="border-t border-gray-100 p-4">
        <SidebarItem icon={Settings} label="Settings" path="/settings" />
        <button 
          onClick={() => { localStorage.removeItem('userToken'); window.location.reload(); }}
          className="w-full flex items-center px-6 py-3 text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;