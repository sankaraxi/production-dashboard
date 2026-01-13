
import React from 'react';
import { Package, Truck, ArrowUpRight } from 'lucide-react';

// Converted RatioAnalysis to a standard JavaScript function component and removed type annotations
export const RatioAnalysis = ({ production }) => {
  const invRatio = ((production.inventory / production.actual) * 100).toFixed(1);
  const supRatio = ((production.supplied / production.actual) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Inventory vs Produced */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <Package className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Inventory vs Produced</h3>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{invRatio}% Stocked</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase">
            <span>Production Flow</span>
            <span className="text-slate-900">{production.inventory} / {production.actual} units</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-blue-500 transition-all duration-700" 
              style={{ width: `${invRatio}%` }} 
            />
            <div className="h-full bg-blue-200 flex-1" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium italic">
            *Current stock represents {invRatio}% of today's total production volume.
          </p>
        </div>
      </div>

      {/* Supplied vs Produced */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <Truck className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Supplied vs Produced</h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{supRatio}% Fulfilled</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase">
            <span>Shipment Efficiency</span>
            <span className="text-slate-900">{production.supplied} / {production.actual} units</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-emerald-500 transition-all duration-700" 
              style={{ width: `${supRatio}%` }} 
            />
            <div className="h-full bg-emerald-200 flex-1" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium italic">
            *Shipping team has fulfilled {supRatio}% of produced inventory today.
          </p>
        </div>
      </div>
    </div>
  );
};
