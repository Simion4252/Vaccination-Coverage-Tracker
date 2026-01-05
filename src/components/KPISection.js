
import React, { useMemo } from 'react';
import { Activity, ShieldCheck, Database, TrendingUp } from 'lucide-react';

const KPISection = ({ selectedRegion }) => {
  /**
   * Data Trend Analysis from Geographic Coverage:
   * North: 610 Doses (High Coverage)
   * South: 370 Doses (Active)
   * West: 130 Doses (Active)
   * East: 95 Doses (Active)
   */
  const stats = useMemo(() => [
    { region: 'East Region', doses: '95', coverage: '42%', records: '1' },
    { region: 'North Region', doses: '610', coverage: '92%', records: '4' },
    { region: 'South Region', doses: '370', coverage: '75%', records: '3' },
    { region: 'West Region', doses: '130', coverage: '58%', records: '1' },
  ], []);

  const currentMetrics = useMemo(() => {
    if (selectedRegion === 'All' || !selectedRegion) {
      return { 
        doses: '1,205', 
        coverage: '66.7%', 
        records: '9' 
      };
    }
    const found = stats.find(s => s.region === selectedRegion);
    return found || { doses: '0', coverage: '0%', records: '0' };
  }, [selectedRegion, stats]);

  const cards = [
    { 
      title: 'Total Doses', 
      value: currentMetrics.doses, 
      icon: <Activity className="text-indigo-600" />, 
      color: 'text-slate-800' 
    },
    { 
      title: 'Coverage Rate', 
      value: currentMetrics.coverage, 
      icon: <ShieldCheck className="text-emerald-600" />, 
      color: 'text-emerald-600' 
    },
    { 
      title: 'Records Count', 
      value: currentMetrics.records, 
      icon: <Database className="text-indigo-600" />, 
      color: 'text-indigo-600' 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
              {card.icon}
            </div>
            <TrendingUp size={16} className="text-slate-300" />
          </div>
          <span className="text-slate-500 text-sm font-medium">{card.title}</span>
          <h2 className={`text-3xl font-bold mt-1 ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default KPISection;