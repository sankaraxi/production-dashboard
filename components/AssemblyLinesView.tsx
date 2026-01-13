
import React from 'react';
import { Activity, Circle, AlertTriangle, Hammer } from 'lucide-react';
import { mockDashboardData } from '../mockData';

// Fix: Removed React.FC type and converted to a standard JavaScript function component
export const AssemblyLinesView = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fix: Directly accessing properties on the objects returned by Object.values in a JavaScript context */}
        {Object.values(mockDashboardData).map((line) => (
          <div key={line.lineId} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{line.lineId}</h3>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Battery Module Assy</p>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                line.status === 'RUNNING' ? 'bg-emerald-50 text-emerald-600' :
                line.status === 'MAINTENANCE' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'
              }`}>
                <Circle className={`h-2 w-2 fill-current ${line.status === 'RUNNING' ? 'animate-pulse' : ''}`} />
                {line.status}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-400 uppercase">Efficiency (OEE)</span>
                <span className="font-bold text-slate-900">{line.production.oee.overall}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    line.status === 'RUNNING' ? 'bg-blue-500' : 'bg-slate-200'
                  }`}
                  style={{ width: `${line.production.oee.overall}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Yield</p>
                  <p className="text-sm font-bold text-slate-900">{line.quality.fpy}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Downtime</p>
                  <p className="text-sm font-bold text-rose-500">{line.production.downtime.unplanned}m</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Maintenance Schedule</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white rounded-lg"><Hammer className="h-4 w-4 text-slate-400" /></div>
              <div>
                <p className="text-sm font-bold text-slate-900">Line-3 Annual Calibration</p>
                <p className="text-xs text-slate-500">Scheduled: 24 Oct - 26 Oct 2023</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">IN PROGRESS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
