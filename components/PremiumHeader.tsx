
import React from 'react';
import { Search, Bell, Grid, User } from 'lucide-react';

interface PremiumHeaderProps {
  onSearch: (term: string) => void;
}

export const PremiumHeader: React.FC<PremiumHeaderProps> = ({ onSearch }) => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Genealogy</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bharat Battery Hub</p>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search POs, Shipments, Serial Numbers..."
            className="block w-[400px] pl-11 pr-4 py-2 bg-slate-50 border-transparent rounded-full text-sm placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white">2</span>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">Bharat Battery Solutions</p>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Active Supplier</p>
          </div>
          <div className="h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-sm shadow-lg shadow-blue-100">
            BB
          </div>
        </div>
      </div>
    </header>
  );
};
