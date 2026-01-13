
import React from 'react';
import { Target, Activity, CheckCircle, Clock } from 'lucide-react';

// Removed interface definitions and type annotations to follow JavaScript guidelines

// StatCard component converted to standard JavaScript function
const StatCard = ({ label, value, subValue, icon, colorClass, bgClass }) => (
  <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between">
    <div className="min-w-0">
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 truncate">{label}</p>
      <h3 className="text-xl md:text-2xl font-bold text-slate-900">{value}</h3>
      {subValue && <p className="text-[10px] md:text-xs font-medium text-slate-500 mt-1 truncate">{subValue}</p>}
    </div>
    <div className={`p-2.5 md:p-3 rounded-xl shrink-0 ml-2 ${bgClass} ${colorClass}`}>
      {/* Fixed: React.cloneElement error by removing TypeScript type casting and ensuring standard prop passing */}
      {React.cloneElement(icon, { className: 'h-5 w-5 md:h-6 md:w-6' })}
    </div>
  </div>
);

// KPISection component converted to standard JavaScript function
export const KPISection = ({ production, quality }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatCard
        label="Production Progress"
        value={`${production.actual} / ${production.planned}`}
        subValue={`${((production.actual / production.planned) * 100).toFixed(1)}% of Target`}
        icon={<Target />}
        colorClass="text-blue-600"
        bgClass="bg-blue-50"
      />
      <StatCard
        label="OEE (Overall)"
        value={`${production.oee.overall}%`}
        subValue={`A:${production.oee.availability}% | P:${production.oee.performance}% | Q:${production.oee.quality}%`}
        icon={<Activity />}
        colorClass="text-purple-600"
        bgClass="bg-purple-50"
      />
      <StatCard
        label="First Pass Yield"
        value={`${quality.fpy}%`}
        subValue={`${quality.okCount} OK vs ${quality.ngCount} NG`}
        icon={<CheckCircle />}
        colorClass="text-emerald-600"
        bgClass="bg-emerald-50"
      />
      <StatCard
        label="Total Downtime"
        value={`${production.downtime.planned + production.downtime.unplanned}m`}
        subValue={`${production.downtime.unplanned}m Unplanned`}
        icon={<Clock />}
        colorClass="text-rose-600"
        bgClass="bg-rose-50"
      />
    </div>
  );
};
