
import React from 'react';
import { Target, Activity, CheckCircle, Clock } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon, colorClass, bgClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between">
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      {subValue && <p className="text-xs font-medium text-slate-500 mt-1">{subValue}</p>}
    </div>
    <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
      {icon}
    </div>
  </div>
);

export const KPISection: React.FC<{ production: any; quality: any }> = ({ production, quality }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Production Progress"
        value={`${production.actual} / ${production.planned}`}
        subValue={`${((production.actual / production.planned) * 100).toFixed(1)}% of Target`}
        icon={<Target className="h-6 w-6" />}
        colorClass="text-blue-600"
        bgClass="bg-blue-50"
      />
      <StatCard
        label="OEE (Overall)"
        value={`${production.oee.overall}%`}
        subValue={`A:${production.oee.availability}% | P:${production.oee.performance}% | Q:${production.oee.quality}%`}
        icon={<Activity className="h-6 w-6" />}
        colorClass="text-purple-600"
        bgClass="bg-purple-50"
      />
      <StatCard
        label="First Pass Yield (FPY)"
        value={`${quality.fpy}%`}
        subValue={`${quality.okCount} OK vs ${quality.ngCount} NG`}
        icon={<CheckCircle className="h-6 w-6" />}
        colorClass="text-emerald-600"
        bgClass="bg-emerald-50"
      />
      <StatCard
        label="Total Downtime"
        value={`${production.downtime.planned + production.downtime.unplanned}m`}
        subValue={`${production.downtime.unplanned}m Unplanned`}
        icon={<Clock className="h-6 w-6" />}
        colorClass="text-rose-600"
        bgClass="bg-rose-50"
      />
    </div>
  );
};
