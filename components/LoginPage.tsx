
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

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col items-center justify-center p-6 font-sans">
      {/* Back Link */}
      <div className="absolute top-8 left-8">
        <button className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Back to Modules
        </button>
      </div>

      {/* Login Card - Reduced max-width and internal padding */}
      <div className="w-full max-w-[400px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center animate-in fade-in zoom-in-95 duration-700">
        
        {/* Icon Header - Reduced dimensions */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-[#4F46E5] rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-indigo-100">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1.5">System Login</h1>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Entering Supplier</p>
        </div>

        {/* Login Form - Reduced vertical spacing */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="space-y-1.5">
            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
              User Identification
            </label>
            <input 
              required
              type="text" 
              placeholder="Employee ID / Email"
              className="w-full px-5 py-3.5 bg-[#F8FAFC] border-none rounded-xl text-slate-900 placeholder-slate-300 focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
              Secure Passkey
            </label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              className="w-full px-5 py-3.5 bg-[#F8FAFC] border-none rounded-xl text-slate-900 placeholder-slate-300 focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-sm"
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-none bg-slate-100 text-indigo-600 focus:ring-0 transition-all cursor-pointer" />
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest group-hover:text-slate-600">Trust this node</span>
            </label>
            <button type="button" className="text-[9px] font-extrabold text-indigo-600 uppercase tracking-widest hover:text-indigo-800">
              Forgot Access?
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
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

        {/* Footer Branding - Reduced margin */}

      </div>
    </div>
  );
};
