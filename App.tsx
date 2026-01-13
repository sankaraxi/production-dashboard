
import React, { useState, useMemo } from 'react';
import { PremiumHeader } from './components/PremiumHeader';
import { KPISection } from './components/KPISection';
import { StationCycleTime, ThroughputChart, HourlyOutputChart, OEEBreakdownChart } from './components/ProductionVisuals';
import { RejectionPieChart, QualityMetricsGrid } from './components/QualityVisuals';
import { RatioAnalysis } from './components/RatioAnalysis';
import { AssemblyLinesView } from './components/AssemblyLinesView';
import { DataLogsView } from './components/DataLogsView';
import { mockDashboardData } from './mockData';
import { LayoutDashboard, Factory, Settings, Database, AlertCircle, ChevronDown, Circle } from 'lucide-react';

const App = () => {
  const [selectedLine, setSelectedLine] = useState('Line-1');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const currentData = useMemo(() => mockDashboardData[selectedLine], [selectedLine]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <KPISection production={currentData.production} quality={currentData.quality} />
            
            <RatioAnalysis production={currentData.production} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ThroughputChart data={currentData.production.throughputPerShift} />
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
                     <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Unplanned Downtime Reasons</h3>
                     <div className="space-y-4">
                       {currentData.production.downtime.reasons.map((r, i) => (
                         <div key={i} className="flex items-center justify-between p-3 bg-rose-50 rounded-xl border border-rose-100">
                           <div className="flex items-center gap-3">
                             <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                             <span className="text-xs font-bold text-rose-900">{r.reason}</span>
                           </div>
                           <span className="text-xs font-bold text-rose-600">{r.minutes} min</span>
                         </div>
                       ))}
                     </div>
                     <button className="mt-6 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider flex items-center justify-center gap-1">
                       Full Log View <ChevronDown className="h-3 w-3" />
                     </button>
                  </div>
                </div>
                
                <HourlyOutputChart data={currentData.production.hourlyData} />
                
                {/* OEE Breakdown now positioned here for better visibility and more space */}
                <OEEBreakdownChart oee={currentData.production.oee} />
              </div>

              <div className="space-y-6">
                <StationCycleTime stations={currentData.production.cycleTime} />
                <RejectionPieChart data={currentData.quality.topRejectionReasons} />
                <QualityMetricsGrid quality={currentData.quality} />
              </div>
            </div>
          </div>
        );
      case 'Lines':
        return <AssemblyLinesView />;
      case 'Logs':
        return <DataLogsView logs={currentData.logs} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PremiumHeader onSearch={setSearchQuery} />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 space-y-8">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Operations</p>
            <nav className="space-y-1">
              {[
                { id: 'Dashboard', label: 'Live Dashboard', icon: LayoutDashboard },
                { id: 'Lines', label: 'Assembly Lines', icon: Factory },
                { id: 'Logs', label: 'Data Logs', icon: Database },
                { id: 'Issues', label: 'Alert Center', icon: AlertCircle },
                { id: 'Settings', label: 'Settings', icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === item.id 
                      ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-50/50' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-slate-100 mt-auto">
            <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-8 -mt-8" />
              <div className="flex items-center gap-2 mb-1">
                <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400 animate-pulse" />
                <p className="text-[10px] font-bold text-blue-400 uppercase">Cloud Sync Active</p>
              </div>
              <h4 className="text-sm font-bold mb-3">Line Status: Stable</h4>
              <p className="text-[10px] text-slate-400">All OT metrics syncing in real-time to factory hub.</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded uppercase">Bharat Hub</span>
                <span className="text-slate-300">/</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{activeTab}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {activeTab === 'Dashboard' ? 'Production Intelligence' : activeTab === 'Lines' ? 'Line Oversights' : 'Unit Genealogy'}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {activeTab !== 'Lines' && (
                <div className="relative">
                  <select
                    value={selectedLine}
                    onChange={(e) => setSelectedLine(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-5 py-2.5 pr-10 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                  >
                    {Object.keys(mockDashboardData).map(id => (
                      <option key={id} value={id}>{id} Battery Assy</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              )}
              
              <div className="flex bg-white border border-slate-200 rounded-xl p-1">
                {['Shift', 'Day', 'Week'].map((t) => (
                  <button
                    key={t}
                    className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${
                      t === 'Shift' ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
