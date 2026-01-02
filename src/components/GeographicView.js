import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, Users, FileText, LogOut, Loader2, AlertCircle } from 'lucide-react';

const GeographicView = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/by-region', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch regional data');

        const data = await response.json();
        setRegions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionData();
  }, []);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar (Same as Dashboard) */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6 flex items-center mb-6">
          <div className="bg-indigo-600 p-1.5 rounded-lg mr-2 text-white font-bold text-sm">VCT</div>
          <span className="text-xl font-bold text-slate-800">Tracker</span>
        </div>
        <nav className="px-4 space-y-1">
          <div onClick={() => navigate('/dashboard')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <LayoutDashboard size={20} className="mr-3" /> Dashboard
          </div>
          <div className="flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium">
            <Map size={20} className="mr-3" /> Geographic View
          </div>
          {/* ... other nav items ... */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Geographic Coverage</h1>
          <p className="text-slate-500">Distribution of vaccinations by administrative regions</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center"><AlertCircle className="mr-2" /> {error}</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Region</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Total Doses</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Records Count</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {regions.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{item.region}</td>
                    <td className="px-6 py-4 text-slate-600">{item.totalDoses.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600">{item.records}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.totalDoses > 500 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.totalDoses > 500 ? 'High Coverage' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default GeographicView;