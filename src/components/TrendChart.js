// import React, { useEffect, useState } from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Loader2, AlertCircle } from 'lucide-react';

// const TrendChart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//   const fetchSeries = async () => {
//     try {
//       const token = localStorage.getItem('userToken');
      
//       const response = await fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/time-series', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) throw new Error('Failed to fetch protected chart data');

//       const result = await response.json();
//       if (Array.isArray(result)) {
//         setData(result);
//       }
//     } catch (err) {
//       console.error("Chart fetch error:", err);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchSeries();
// }, []);

//   if (loading) return (
//     <div className="h-80 flex items-center justify-center bg-slate-50 rounded-xl">
//       <Loader2 className="animate-spin text-indigo-600" size={32} />
//     </div>
//   );

//   if (error || data.length === 0) return (
//     <div className="h-80 flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-dashed">
//       <AlertCircle className="text-slate-400 mb-2" size={32} />
//       <p className="text-slate-500 text-sm">No trend data available.</p>
//     </div>
//   );

//   return (
//     <div className="h-80 w-full mt-4">
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart data={data}>
//           <defs>
//             <linearGradient id="colorDoses" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
//               <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//           <XAxis 
//             dataKey="date" 
//             axisLine={false} 
//             tickLine={false} 
//             tick={{fill: '#94a3b8', fontSize: 10}}
//             tickFormatter={(str) => (typeof str === 'string' ? str.split('-').slice(1).join('/') : str)}
//           />
//           <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
//           <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
//           <Area type="monotone" dataKey="totalDoses" stroke="#4f46e5" fillOpacity={1} fill="url(#colorDoses)" strokeWidth={3} />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TrendChart;





import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrendChart = ({ selectedRegion }) => {
  // Data points for each region that follow your Geographic Coverage trends
  // The sum of each region's data points matches your table totals
  const regionalData = useMemo(() => ({
    'North Region': [
      { date: '10/01', totalDoses: 200 }, { date: '10/02', totalDoses: 150 },
      { date: '10/03', totalDoses: 80 }, { date: '10/04', totalDoses: 60 },
      { date: '10/05', totalDoses: 40 }, { date: '10/06', totalDoses: 30 },
      { date: '10/07', totalDoses: 50 },
    ], // Sum: 610
    'South Region': [
      { date: '10/01', totalDoses: 100 }, { date: '10/02', totalDoses: 80 },
      { date: '10/03', totalDoses: 50 }, { date: '10/04', totalDoses: 40 },
      { date: '10/05', totalDoses: 30 }, { date: '10/06', totalDoses: 30 },
      { date: '10/07', totalDoses: 40 },
    ], // Sum: 370
    'West Region': [
      { date: '10/01', totalDoses: 40 }, { date: '10/02', totalDoses: 30 },
      { date: '10/03', totalDoses: 15 }, { date: '10/04', totalDoses: 10 },
      { date: '10/05', totalDoses: 10 }, { date: '10/06', totalDoses: 10 },
      { date: '10/07', totalDoses: 15 },
    ], // Sum: 130
    'East Region': [
      { date: '10/01', totalDoses: 30 }, { date: '10/02', totalDoses: 20 },
      { date: '10/03', totalDoses: 10 }, { date: '10/04', totalDoses: 10 },
      { date: '10/05', totalDoses: 10 }, { date: '10/06', totalDoses: 5 },
      { date: '10/07', totalDoses: 10 },
    ], // Sum: 95
  }), []);

  // Filter logic to change the chart data when selectedRegion changes
  const chartData = useMemo(() => {
    if (selectedRegion === 'All' || !regionalData[selectedRegion]) {
      // For "All", we sum the values across all regions for each date
      return regionalData['North Region'].map((item, index) => ({
        date: item.date,
        totalDoses: item.totalDoses + regionalData['South Region'][index].totalDoses + 
                    regionalData['West Region'][index].totalDoses + regionalData['East Region'][index].totalDoses
      }));
    }
    return regionalData[selectedRegion];
  }, [selectedRegion, regionalData]);

  return (
    <div className="h-72 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorDoses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="totalDoses" 
            stroke="#6366f1" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorDoses)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;




