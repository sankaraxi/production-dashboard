
import React from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';

// Removed PremiumHeaderProps interface for JavaScript compatibility

// Converted PremiumHeader to a standard JavaScript function component
export const PremiumHeader = ({ onSearch, onToggleMenu, isMenuOpen }) => {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="flex items-center gap-4 md:gap-8">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onToggleMenu}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="shrink-0">
          <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">Electra EV</h1>
        </div>

        <div className="relative group hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search POs..."
            className="block w-[200px] md:w-[400px] pl-11 pr-4 py-2 bg-slate-50 border-transparent rounded-full text-sm placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-3.5 w-3.5 bg-red-500 text-[8px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white">2</span>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 md:pl-6">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-900">Electra EV</p>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Active</p>
          </div>
          <div className="h-8 w-8 md:h-10 md:w-10 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-xs md:text-sm shadow-lg shadow-blue-100">
            EV
          </div>
        </div>
      </div>
    </header>
  );
};
