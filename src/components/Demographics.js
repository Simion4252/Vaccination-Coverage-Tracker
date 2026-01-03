import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, Users, FileText, LogOut, Loader2, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Demographics = () => {
  const navigate = useNavigate();
  const [ageData, setAgeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch both endpoints simultaneously
        const [ageRes, genderRes] = await Promise.all([
          fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/by-age-group', { headers }),
          fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/by-gender', { headers })
        ]);

        if (!ageRes.ok || !genderRes.ok) throw new Error('Failed to load demographic data');

        const ageResult = await ageRes.json();
        const genderResult = await genderRes.json();

        setAgeData(ageResult);
        setGenderData(genderResult);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDemographics();
  }, []);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6 flex items-center mb-6">
          <div className="bg-indigo-600 p-1.5 rounded-lg mr-2 text-white font-bold text-sm">VCT</div>
          <span className="text-xl font-bold text-slate-800">Tracker</span>
        </div>
        <nav className="px-4 space-y-1">
          <div onClick={() => navigate('/dashboard')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer">
            <LayoutDashboard size={20} className="mr-3" /> Dashboard
          </div>
          <div onClick={() => navigate('/map')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Map size={20} className="mr-3" /> Geographic View
          </div>
          <div className="flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium">
            <Users size={20} className="mr-3" /> Demographics
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Demographic Insights</h1>
          <p className="text-slate-500">Analysis by Age Group and Gender distribution</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center"><AlertCircle className="mr-2" /> {error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Age Group Bar Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Uptake by Age Group</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData}>
                    <XAxis dataKey="ageGroup" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                    <Bar dataKey="totalDoses" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gender Distribution Pie Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Gender Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      dataKey="totalDoses"
                      nameKey="gender"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default Demographics;