
import React, { useState } from 'react';
import { ArrowLeft, Users, ChevronRight } from 'lucide-react';

export const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a brief secure verification delay
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  const handleBackToModules = () => {
    window.location.href = 'https://electraev.vercel.app';
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col items-center justify-center p-4 md:p-6 font-sans">
      {/* Back Link */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <button 
          onClick={handleBackToModules}
          className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Modules
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[380px] bg-white rounded-[24px] md:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 md:p-8 flex flex-col items-center animate-in fade-in zoom-in-95 duration-700">
        
        {/* Icon Header */}
        <div className="mb-6 md:mb-8 text-center">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-[#4F46E5] rounded-2xl flex items-center justify-center mb-5 md:mb-6 mx-auto shadow-lg shadow-indigo-100">
            <Users className="h-7 w-7 md:h-8 md:w-8 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-1">System Login</h1>
          <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Entering Supplier</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5 md:space-y-6">
          <div className="space-y-1.5">
            <label className="text-[8px] md:text-[9px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
              User Identification
            </label>
            <input 
              required
              type="text" 
              placeholder="Employee ID / Email"
              className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-[#F8FAFC] border-none rounded-xl text-slate-900 placeholder-slate-300 focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-xs md:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[8px] md:text-[9px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
              Secure Passkey
            </label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-[#F8FAFC] border-none rounded-xl text-slate-900 placeholder-slate-300 focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-xs md:text-sm"
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-3.5 h-3.5 rounded border-none bg-slate-100 text-indigo-600 focus:ring-0 transition-all cursor-pointer" />
              <span className="text-[8px] md:text-[9px] font-extrabold text-slate-400 uppercase tracking-widest group-hover:text-slate-600">Trust Node</span>
            </label>
            <button type="button" className="text-[8px] md:text-[9px] font-extrabold text-indigo-600 uppercase tracking-widest hover:text-indigo-800">
              Forgot?
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 md:py-4 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <div className="h-3.5 w-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Secure Sign In
                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer Branding */}
        // <div className="mt-10 md:mt-12 text-center">
        //   <p className="text-[7px] md:text-[8px] font-bold text-slate-300 uppercase tracking-[0.15em] leading-relaxed">
        //     Secured by Electra EV <br className="md:hidden" /> Global IT Infrastructure
        //   </p>
        // </div>
      </div>
    </div>
  );
};
