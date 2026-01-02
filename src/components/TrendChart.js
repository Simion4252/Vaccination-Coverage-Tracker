// import React from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { date: 'Jan', doses: 4000 },
//   { date: 'Feb', doses: 3000 },
//   { date: 'Mar', doses: 5000 },
//   { date: 'Apr', doses: 8500 },
//   { date: 'May', doses: 7000 },
//   { date: 'Jun', doses: 11000 },
// ];

// const TrendChart = () => (
//   <div className="h-80 w-full mt-4">
//     <ResponsiveContainer width="100%" height="100%">
//       <AreaChart data={data}>
//         <defs>
//           <linearGradient id="colorDoses" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
//             <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
//           </linearGradient>
//         </defs>
//         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//         <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
//         <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
//         <Tooltip />
//         <Area type="monotone" dataKey="doses" stroke="#4f46e5" fillOpacity={1} fill="url(#colorDoses)" strokeWidth={3} />
//       </AreaChart>
//     </ResponsiveContainer>
//   </div>
// );

// export default TrendChart;




// import React, { useEffect, useState } from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Loader2, AlertCircle } from 'lucide-react';

// const TrendChart = () => {
//   // 1. Initialize as an empty array [] to prevent .slice errors
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchSeries = async () => {
//       try {
//         const response = await fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/time-series');
//         const result = await response.json();

//         // 2. Validation: Ensure the result is actually an array
//         if (Array.isArray(result)) {
//           setData(result);
//         } else {
//           console.error("API did not return an array:", result);
//           setData([]); // Fallback to empty array
//         }
//       } catch (err) {
//         console.error("Error fetching time series:", err);
//         setError(true);
//         setData([]); // Fallback to empty array
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSeries();
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-80 flex items-center justify-center bg-slate-50 rounded-xl">
//         <Loader2 className="animate-spin text-indigo-600" size={32} />
//       </div>
//     );
//   }

//   if (error || data.length === 0) {
//     return (
//       <div className="h-80 flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
//         <AlertCircle className="text-slate-400 mb-2" size={32} />
//         <p className="text-slate-500 text-sm font-medium">No trend data available at this time.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-80 w-full mt-4">
//       <ResponsiveContainer width="100%" height="100%">
//         {/* The Chart now only renders if 'data' is a valid array */}
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
//             tickFormatter={(str) => str.includes('-') ? str.split('-').slice(1).join('/') : str}
//           />
//           <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
//           <Tooltip 
//             contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
//           />
//           <Area 
//             type="monotone" 
//             dataKey="totalDoses" 
//             stroke="#4f46e5" 
//             fillOpacity={1} 
//             fill="url(#colorDoses)" 
//             strokeWidth={3} 
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TrendChart;



// import React, { useEffect, useState } from 'react'; // <--- THIS WAS MISSING
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Loader2, AlertCircle } from 'lucide-react';

// const TrendChart = () => {
//   // All hooks MUST be inside this function
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchSeries = async () => {
//       try {
//         console.log("Attempting to fetch time-series data...");
//         const response = await fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/time-series');
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("Data received:", result);

//         if (Array.isArray(result)) {
//           setData(result);
//         } else {
//           setData([]);
//         }
//       } catch (err) {
//         console.error("Fetch failed:", err.message);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeries();
//   }, []); // Empty dependency array means this runs once on mount

//   if (loading) {
//     return (
//       <div className="h-80 flex items-center justify-center bg-slate-50 rounded-xl">
//         <Loader2 className="animate-spin text-indigo-600" size={32} />
//         <span className="ml-2 text-slate-500">Loading chart...</span>
//       </div>
//     );
//   }

//   if (error || data.length === 0) {
//     return (
//       <div className="h-80 flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
//         <AlertCircle className="text-slate-400 mb-2" size={32} />
//         <p className="text-slate-500 text-sm font-medium">No trend data available.</p>
//       </div>
//     );
//   }

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
//             tickFormatter={(str) => {
//               if (typeof str === 'string' && str.includes('-')) {
//                 return str.split('-').slice(1).join('/');
//               }
//               return str;
//             }}
//           />
//           <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
//           <Tooltip 
//             contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
//           />
//           <Area 
//             type="monotone" 
//             dataKey="totalDoses" 
//             stroke="#4f46e5" 
//             fillOpacity={1} 
//             fill="url(#colorDoses)" 
//             strokeWidth={3} 
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TrendChart;



// useEffect(() => {
//   const fetchSeries = async () => {
//     try {
//       console.log("Fetching data from Render..."); // Log start
//       const response = await fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/time-series');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("Data received from backend:", result); // Log the result

//       if (Array.isArray(result) && result.length > 0) {
//         setData(result);
//       } else {
//         console.warn("Received empty array or invalid format");
//         setData([]);
//       }
//     } catch (err) {
//       console.error("Fetch failed:", err.message);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchSeries();
// }, []);


import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, AlertCircle } from 'lucide-react';

const TrendChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
  const fetchSeries = async () => {
    try {
      const token = localStorage.getItem('userToken');
      
      const response = await fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/time-series', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch protected chart data');

      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result);
      }
    } catch (err) {
      console.error("Chart fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  fetchSeries();
}, []);

  if (loading) return (
    <div className="h-80 flex items-center justify-center bg-slate-50 rounded-xl">
      <Loader2 className="animate-spin text-indigo-600" size={32} />
    </div>
  );

  if (error || data.length === 0) return (
    <div className="h-80 flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-dashed">
      <AlertCircle className="text-slate-400 mb-2" size={32} />
      <p className="text-slate-500 text-sm">No trend data available.</p>
    </div>
  );

  return (
    <div className="h-80 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorDoses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 10}}
            tickFormatter={(str) => (typeof str === 'string' ? str.split('-').slice(1).join('/') : str)}
          />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
          <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
          <Area type="monotone" dataKey="totalDoses" stroke="#4f46e5" fillOpacity={1} fill="url(#colorDoses)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;