// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   LayoutDashboard, Map, Users, FileText, 
//   LogOut, Download, Printer, Filter, ChevronRight, ChevronLeft 
// } from 'lucide-react';

// const reportData = [
//   { id: 'RPT-001', date: '2025-12-01', region: 'North Province', target: 5000, actual: 4200, compliance: '84%' },
//   { id: 'RPT-002', date: '2025-12-02', region: 'South District', target: 3000, actual: 1500, compliance: '50%' },
//   { id: 'RPT-003', date: '2025-12-03', region: 'East Region', target: 4500, actual: 3800, compliance: '84.4%' },
//   { id: 'RPT-004', date: '2025-12-04', region: 'West Valley', target: 6000, actual: 5900, compliance: '98.3%' },
//   { id: 'RPT-005', date: '2025-12-05', region: 'Central City', target: 12000, actual: 4800, compliance: '40%' },
//   { id: 'RPT-006', date: '2025-12-06', region: 'Highlands', target: 2500, actual: 2100, compliance: '84%' },
// ];

// const Reports = () => {
//   const navigate = useNavigate();
//   const [isDownloading, setIsDownloading] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem('userToken');
//     navigate('/login');
//   };

//   const handleDownload = () => {
//     setIsDownloading(true);
//     // Simulate a download delay
//     setTimeout(() => {
//       setIsDownloading(false);
//       alert("Report 'VCT_Aggregate_Dec_2025.csv' has been downloaded successfully.");
//     }, 1500);
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
//           <div onClick={() => navigate('/dashboard')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer">
//             <LayoutDashboard size={20} className="mr-3" /> Dashboard
//           </div>
//           <div onClick={() => navigate('/map')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer">
//             <Map size={20} className="mr-3" /> Geographic View
//           </div>
//           <div onClick={() => navigate('/demographics')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer">
//             <Users size={20} className="mr-3" /> Demographics
//           </div>
//           <div className="flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium cursor-default">
//             <FileText size={20} className="mr-3" /> Reports
//           </div>
//         </nav>
//         <div className="p-4 border-t border-gray-100 text-red-500">
//           <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 hover:bg-red-50 rounded-lg transition-colors">
//             <LogOut size={20} className="mr-3" /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 ml-64">
//         <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
//           <h2 className="text-lg font-semibold text-slate-700">Data Export Center</h2>
//           <div className="flex space-x-3">
//             <button 
//                 onClick={handleDownload}
//                 disabled={isDownloading}
//                 className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all"
//             >
//               <Download size={16} className="mr-2" /> 
//               {isDownloading ? 'Exporting...' : 'Download CSV'}
//             </button>
//             <button className="flex items-center bg-white border border-gray-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
//               <Printer size={16} className="mr-2" /> Print PDF
//             </button>
//           </div>
//         </header>

//         <main className="p-8">
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
//               <h3 className="font-bold text-slate-800 text-lg">Detailed Coverage Log</h3>
//               <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-1">
//                 <Filter size={14} className="text-slate-400 mr-2" />
//                 <span className="text-xs font-medium text-slate-600 uppercase">Sort by Date</span>
//               </div>
//             </div>

//             <table className="w-full text-left">
//               <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
//                 <tr>
//                   <th className="px-6 py-4">Report ID</th>
//                   <th className="px-6 py-4">Date</th>
//                   <th className="px-6 py-4">Geographic Region</th>
//                   <th className="px-6 py-4">Target Pop.</th>
//                   <th className="px-6 py-4">Administered</th>
//                   <th className="px-6 py-4">Compliance</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm divide-y divide-slate-100">
//                 {reportData.map((row) => (
//                   <tr key={row.id} className="hover:bg-slate-50/80 transition-all">
//                     <td className="px-6 py-4 font-mono text-indigo-600 font-medium">{row.id}</td>
//                     <td className="px-6 py-4 text-slate-600">{row.date}</td>
//                     <td className="px-6 py-4 font-semibold text-slate-700">{row.region}</td>
//                     <td className="px-6 py-4 text-slate-600">{row.target}</td>
//                     <td className="px-6 py-4 text-slate-600 font-medium">{row.actual}</td>
//                     <td className="px-6 py-4">
//                       <span className={`font-bold ${parseFloat(row.compliance) < 50 ? 'text-red-500' : 'text-green-600'}`}>
//                         {row.compliance}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination Footer */}
//             <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
//               <span className="text-xs text-slate-500">Showing 1 to 6 of 48 entries</span>
//               <div className="flex space-x-2">
//                 <button className="p-2 border border-slate-200 rounded hover:bg-white text-slate-400"><ChevronLeft size={16}/></button>
//                 <button className="p-2 border border-slate-200 rounded hover:bg-white text-slate-400"><ChevronRight size={16}/></button>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Reports;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Loader2, LayoutDashboard, Map, Users } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ overview: {}, regions: [], ageGroups: [] });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        
        const [ov, reg, age] = await Promise.all([
          fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/overview', { headers }),
          fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/by-region', { headers }),
          fetch('https://vaccination-coverage-tracker-3.onrender.com/metrics/by-age-group', { headers })
        ]);

        setData({
          overview: await ov.json(),
          regions: await reg.json(),
          ageGroups: await age.json()
        });
      } catch (err) {
        console.error("Report data fetch failed", err);
      }
    };
    fetchAllData();
  }, []);

  const downloadPDF = () => {
    setLoading(true);
    const doc = new jsPDF();

    // 1. Header & Title
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // Indigo color
    doc.text('VCT Tracker - Vaccination Report', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    // 2. Summary Section
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Executive Summary', 14, 45);
    doc.autoTable({
      startY: 50,
      body: [
        ['Total Doses Administered', data.overview.totalDoses?.toLocaleString()],
        ['Total Records', data.overview.totalRecords],
        ['Regions Covered', data.overview.regionsCovered]
      ],
    });

    // 3. Regional Data Table
    doc.text('Regional Breakdown', 14, doc.lastAutoTable.finalY + 15);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Region', 'Total Doses', 'Records']],
      body: data.regions.map(r => [r.region, r.totalDoses, r.records]),
      headStyles: { fillColor: [79, 70, 229] }
    });

    // 4. Age Group Data Table
    doc.text('Age Group Distribution', 14, doc.lastAutoTable.finalY + 15);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Age Group', 'Total Doses']],
      body: data.ageGroups.map(a => [a.ageGroup, a.totalDoses]),
      headStyles: { fillColor: [16, 185, 129] } // Emerald color
    });

    // Save PDF
    doc.save('vct-vaccination-report.pdf');
    setLoading(false);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar (Shortened for brevity) */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <nav className="p-4 mt-20 space-y-2">
          <div onClick={() => navigate('/dashboard')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer"><LayoutDashboard size={20} className="mr-3" /> Dashboard</div>
          <div onClick={() => navigate('/map')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer"><Map size={20} className="mr-3" /> Geographic View</div>
          <div onClick={() => navigate('/demographics')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer"><Users size={20} className="mr-3" /> Demographics</div>
          <div className="flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium"><FileText size={20} className="mr-3" /> Reports</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 max-w-4xl mx-auto text-center">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="text-indigo-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Export Data Report</h1>
          <p className="text-slate-500 mb-8">Generate a comprehensive PDF document containing all vaccination metrics, regional breakdowns, and demographic insights.</p>
          
          <button 
            onClick={downloadPDF}
            disabled={loading}
            className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              <Download className="mr-2" />
            )}
            {loading ? 'Generating Report...' : 'Download Full PDF Report'}
          </button>

          <div className="mt-12 grid grid-cols-3 gap-4 text-left border-t border-slate-100 pt-8">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
              <p className="text-sm font-semibold text-slate-700">Ready for export</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase">Format</p>
              <p className="text-sm font-semibold text-slate-700">PDF (A4)</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase">Includes</p>
              <p className="text-sm font-semibold text-slate-700">All Metrics</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;