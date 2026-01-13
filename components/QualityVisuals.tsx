
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];

export const RejectionPieChart = ({ data }) => {
  const [type, setType] = useState('pie');

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[320px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Rejection Reasons</h3>
        <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
          <button onClick={() => setType('pie')} className={`p-1.5 rounded-md ${type === 'pie' ? 'bg-white shadow-sm text-pink-600' : 'text-slate-400'}`}>
            <PieChartIcon className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setType('bar')} className={`p-1.5 rounded-md ${type === 'bar' ? 'bg-white shadow-sm text-pink-600' : 'text-slate-400'}`}>
            <BarChart3 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'pie' ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="reason"
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 600 }} />
            </PieChart>
          ) : (
            <BarChart data={data} margin={{ left: -15, right: 10, top: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="reason" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 600 }} angle={-15} textAnchor="end" interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 600 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const QualityMetricsGrid = ({ quality }) => (
  <div className="grid grid-cols-3 gap-4">
    <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Rejection %</p>
      <p className="text-lg font-bold text-rose-600">{quality.rejectionRate}%</p>
    </div>
    <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Rework %</p>
      <p className="text-lg font-bold text-amber-500">{quality.reworkRate}%</p>
    </div>
    <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Scrap %</p>
      <p className="text-lg font-bold text-slate-700">{quality.scrapRate}%</p>
    </div>
  </div>
);
