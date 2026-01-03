// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { LayoutDashboard, Map, Users, FileText, Settings, LogOut } from 'lucide-react';
// import TrendChart from './TrendChart';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('userToken');
//     navigate('/login');
//   };

//   return (
//     <div className="flex bg-slate-50 min-h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
//         <div className="p-6 flex items-center mb-6">
//           <div className="bg-indigo-600 p-1.5 rounded-lg mr-2 text-white font-bold text-sm">VCT</div>
//           <span className="text-xl font-bold text-slate-800">Tracker</span>
//         </div>
//         <nav className="flex-1 px-4 space-y-1">
//           <div className="flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium">
//             <LayoutDashboard size={20} className="mr-3" /> Dashboard
//           </div>
//           <div 
//             onClick={() => navigate('/map')} 
//             className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
//         >
//             <Map size={20} className="mr-3" /> Geographic View
//         </div>
//         <div 
//             onClick={() => navigate('/demographics')} 
//             className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
//         >
//             <Users size={20} className="mr-3" /> Demographics
//         </div>

//         <div 
//             onClick={() => navigate('/reports')} 
//             className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
//         >
//             <FileText size={20} className="mr-3" /> Reports
//         </div>
        
//         </nav>
//         <div className="p-4 border-t border-gray-100">
//           <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
//             <LogOut size={20} className="mr-3" /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 ml-64">
//         <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
//           <h2 className="text-lg font-semibold text-slate-700">Analytics Dashboard</h2>
//           <div className="flex items-center space-x-3">
//              <div className="text-right"><p className="text-sm font-bold text-slate-900">Admin User</p></div>
//              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">AD</div>
//           </div>
//         </header>

//         <main className="p-8 space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//               <span className="text-slate-500 text-sm">Total Doses Administered</span>
//               <h2 className="text-3xl font-bold text-slate-800 mt-1">45,200</h2>
//             </div>
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//               <span className="text-slate-500 text-sm">Overall Coverage</span>
//               <h2 className="text-3xl font-bold text-indigo-600 mt-1">72.4%</h2>
//             </div>
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//               <span className="text-slate-500 text-sm">Target Reached</span>
//               <h2 className="text-3xl font-bold text-green-600 mt-1">94%</h2>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//             <h3 className="text-lg font-bold text-slate-800">Vaccination Uptake Trend</h3>
//             <TrendChart />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;






import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, Users, FileText, LogOut, Loader2 } from 'lucide-react';
import TrendChart from './TrendChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Safely get user data
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  useEffect(() => {
    const fetchMetrics = async () => {
  try {
    const token = localStorage.getItem('userToken');
    console.log("Using token:", token ? "Token found" : "MISSING TOKEN");

    const response = await fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/overview', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401 || response.status === 403) {
      console.error("Auth Failed: Your token is invalid or expired.");
      return;
    }

    const data = await response.json();
    console.log("Overview Data received:", data);

    if (data) {
      setMetrics(data);
    }
  } catch (error) {
    console.error("Network Error:", error);
  } finally {
    setLoading(false);
  }
};
    fetchMetrics();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        <div className="p-6 flex items-center mb-6">
          <div className="bg-indigo-600 p-1.5 rounded-lg mr-2 text-white font-bold text-sm">VCT</div>
          <span className="text-xl font-bold text-slate-800">Tracker</span>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <button className="w-full flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium">
            <LayoutDashboard size={20} className="mr-3" /> Dashboard
          </button>
          <button onClick={() => navigate('/map')} className="w-full flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
            <Map size={20} className="mr-3" /> Geographic View
          </button>
          <button onClick={() => navigate('/demographics')} className="w-full flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
            <Users size={20} className="mr-3" /> Demographics
          </button>
          <button onClick={() => navigate('/reports')} className="w-full flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
            <FileText size={20} className="mr-3" /> Reports
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} className="mr-3" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-slate-700">Analytics Dashboard</h2>
          <div className="flex items-center space-x-3">
             <div className="text-right">
               <p className="text-sm font-bold text-slate-900">{userData.name || 'Admin User'}</p>
             </div>
             <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold uppercase">
               {userData.name ? userData.name.substring(0, 2) : 'AD'}
             </div>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-indigo-600" size={40} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <span className="text-slate-500 text-sm">Total Doses Administered</span>
                  {/* FIX: Check if totalDoses exists before calling toLocaleString */}
                  <h2 className="text-3xl font-bold text-slate-800 mt-1">
                    {metrics?.totalDoses?.toLocaleString() ?? '0'}
                  </h2>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <span className="text-slate-500 text-sm">Regions Covered</span>
                  <h2 className="text-3xl font-bold text-indigo-600 mt-1">
                    {metrics?.regionsCovered ?? '0'}
                  </h2>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <span className="text-slate-500 text-sm">Total Records Found</span>
                  <h2 className="text-3xl font-bold text-green-600 mt-1">
                    {metrics?.totalRecords ?? '0'}
                  </h2>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800">Vaccination Uptake Trend</h3>
                <TrendChart />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;