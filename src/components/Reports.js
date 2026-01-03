import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Loader2, LayoutDashboard, Map, Users } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Reports = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: '2023-10-01',
    to: new Date().toISOString().split('T')[0]
  });

  const [data, setData] = useState({ 
    overview: {}, 
    regions: [], 
    ageGroups: [] 
  });

  const fetchFilteredData = async () => {
    setFetching(true);
    try {
      const token = localStorage.getItem('userToken');
      const headers = { 'Authorization': `Bearer ${token}` };
      const query = `?from=${dateRange.from}&to=${dateRange.to}`;
      
      const [ov, reg, age] = await Promise.all([
        fetch(`https://vaccination-coverage-tracker-3.onrender.com/metrics/overview${query}`, { headers }),
        fetch(`https://vaccination-coverage-tracker-3.onrender.com/metrics/by-region${query}`, { headers }),
        fetch(`https://vaccination-coverage-tracker-3.onrender.com/metrics/by-age-group${query}`, { headers })
      ]);

      const overviewData = await ov.json();
      const regionsData = await reg.json();
      const ageData = await age.json();

      setData({
        overview: overviewData,
        regions: Array.isArray(regionsData) ? regionsData : [],
        ageGroups: Array.isArray(ageData) ? ageData : []
      });
    } catch (err) {
      console.error("Filtering failed", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [dateRange]);

  const downloadPDF = () => {
    setLoading(true);
    try {
      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.setTextColor(79, 70, 229);
      doc.text('VCT Tracker - Vaccination Report', 14, 22);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Reporting Period: ${dateRange.from} to ${dateRange.to}`, 14, 30);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 36);

      // 1. Summary Table
      autoTable(doc, {
        startY: 45,
        head: [['Metric', 'Value']],
        body: [
          ['Total Doses Administered', data.overview.totalDoses?.toLocaleString() ?? '0'],
          ['Total Records', data.overview.totalRecords ?? '0'],
          ['Regions Covered', data.overview.regionsCovered ?? '0']
        ],
        headStyles: { fillColor: [79, 70, 229] }
      });

      // 2. Regional Table
      const regionalY = doc.lastAutoTable.finalY + 15;
      doc.setTextColor(0);
      doc.setFontSize(14);
      doc.text('Regional Breakdown', 14, regionalY);
      
      autoTable(doc, {
        startY: regionalY + 5,
        head: [['Region', 'Total Doses', 'Records']],
        body: data.regions.map(r => [r.region, r.totalDoses, r.records]),
        headStyles: { fillColor: [79, 70, 229] }
      });

      // 3. Age Group Table
      const ageY = doc.lastAutoTable.finalY + 15;
      doc.setFontSize(14);
      doc.text('Age Group Distribution', 14, ageY);
      
      autoTable(doc, {
        startY: ageY + 5,
        head: [['Age Group', 'Total Doses']],
        body: data.ageGroups.map(a => [a.ageGroup, a.totalDoses]),
        headStyles: { fillColor: [16, 185, 129] }
      });

      doc.save(`vct-report-${dateRange.from}-to-${dateRange.to}.pdf`);
    } catch (err) {
      console.error("PDF Error:", err);
      alert("Error generating PDF. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6 flex items-center mb-6">
          <div className="bg-indigo-600 p-1.5 rounded-lg mr-2 text-white font-bold text-sm">VCT</div>
          <span className="text-xl font-bold text-slate-800">Tracker</span>
        </div>
        <nav className="px-4 space-y-1">
          <div onClick={() => navigate('/dashboard')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <LayoutDashboard size={20} className="mr-3" /> Dashboard
          </div>
          <div onClick={() => navigate('/map')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <Map size={20} className="mr-3" /> Geographic View
          </div>
          <div onClick={() => navigate('/demographics')} className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <Users size={20} className="mr-3" /> Demographics
          </div>
          <div className="flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium">
            <FileText size={20} className="mr-3" /> Reports
          </div>
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Reports Center</h1>
              <p className="text-slate-500">Filter and export vaccination data</p>
            </div>
            
            <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">From</label>
                <input 
                  type="date" 
                  value={dateRange.from}
                  onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                  className="bg-transparent text-sm font-medium focus:outline-none px-1"
                />
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">To</label>
                <input 
                  type="date" 
                  value={dateRange.to}
                  onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                  className="bg-transparent text-sm font-medium focus:outline-none px-1"
                />
              </div>
            </div>
          </header>

          <div className="bg-white p-12 rounded-2xl shadow-xl border border-slate-100 text-center">
            {fetching ? (
              <div className="py-10 flex flex-col items-center">
                <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                <p className="text-slate-500 font-medium">Updating report data...</p>
              </div>
            ) : (
              <>
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="text-indigo-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Export Full Summary</h2>
                <button 
                  onClick={downloadPDF}
                  disabled={loading}
                  className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg"
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2" />}
                  Download PDF Report
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;