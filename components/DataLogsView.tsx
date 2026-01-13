
import React from 'react';
import { Search, Filter, Download, ArrowRight } from 'lucide-react';

// Fix: Removed type annotation for the 'logs' prop and converted to standard JavaScript component
export const DataLogsView = ({ logs }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by Serial No or Operator..." 
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <Filter className="h-3 w-3" /> Filters
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            <Download className="h-3 w-3" /> Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                {['Serial Number', 'Timestamp', 'Last Station', 'Operator', 'Status', 'Parameters', 'Action'].map((head) => (
                  <th key={head} className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{log.serialNo}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                    {log.station}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 font-medium">
                    {log.operator}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      log.status === 'PASS' ? 'bg-emerald-50 text-emerald-600' :
                      log.status === 'FAIL' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">
                    {log.parameters}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {logs.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-sm font-medium text-slate-400 italic">No production logs found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
