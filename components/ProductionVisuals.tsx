
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, Cell
} from 'recharts';
import { LayoutPanelTop, BarChart3, LineChart as LineChartIcon, Share2 } from 'lucide-react';

export const StationCycleTime = ({ stations }) => {
  if (!stations || stations.length === 0) return null;
  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-[11px] md:text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Station-wise Cycle Time (Sec)</h3>
      <div className="space-y-4 md:space-y-5">
        {stations.map((s) => (
          <div key={s.stationName}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-bold text-slate-600 uppercase truncate pr-2">{s.stationName}</span>
              <span className={`text-[10px] font-bold whitespace-nowrap ${
                s.status === 'OPTIMAL' ? 'text-emerald-600' : 
                s.status === 'WARNING' ? 'text-amber-600' : 'text-rose-600'
              }`}>
                {s.avgCycleTime}s / {s.targetCycleTime}s
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 md:h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  s.status === 'OPTIMAL' ? 'bg-emerald-500' : 
                  s.status === 'WARNING' ? 'bg-amber-400' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min((s.avgCycleTime / s.targetCycleTime) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ThroughputChart = ({ data }) => {
  const [type, setType] = useState('bar');

  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 h-[280px] md:h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[11px] md:text-sm font-bold text-slate-800 uppercase tracking-wider">Throughput Per Shift</h3>
        <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100 shrink-0">
          <button onClick={() => setType('bar')} className={`p-1 md:p-1.5 rounded-md ${type === 'bar' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
            <BarChart3 className="h-3 w-3 md:h-3.5 md:w-3.5" />
          </button>
          <button onClick={() => setType('line')} className={`p-1 md:p-1.5 rounded-md ${type === 'line' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
            <LineChartIcon className="h-3 w-3 md:h-3.5 md:w-3.5" />
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="shift" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 600, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 600, fill: '#94a3b8' }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="shift" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 600, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 600, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const HourlyOutputChart = ({ data }) => {
  const [type, setType] = useState('area');

  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 h-[300px] md:h-[320px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="min-w-0">
          <h3 className="text-[11px] md:text-sm font-bold text-slate-800 uppercase tracking-wider truncate">Hourly Output</h3>
          <p className="text-[9px] md:text-[10px] text-slate-400 font-medium mt-0.5 truncate">Real-time unit distribution</p>
        </div>
        <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100 shrink-0">
          <button onClick={() => setType('area')} className={`p-1 md:p-1.5 rounded-md ${type === 'area' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
            <LayoutPanelTop className="h-3 w-3 md:h-3.5 md:w-3.5" />
          </button>
          <button onClick={() => setType('bar')} className={`p-1 md:p-1.5 rounded-md ${type === 'bar' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
            <BarChart3 className="h-3 w-3 md:h-3.5 md:w-3.5" />
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 8, fontWeight: 600, fill: '#94a3b8' }} interval={2} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8, fontWeight: 600, fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px' }}
                labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
              />
              <Area type="monotone" dataKey="units" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorOutput)" animationDuration={1000} />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 8, fontWeight: 600, fill: '#94a3b8' }} interval={2} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8, fontWeight: 600, fill: '#94a3b8' }} />
              <Bar dataKey="units" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const OEEBreakdownChart = ({ oee }) => {
  const [type, setType] = useState('radar');
  const radarData = [
    { subject: 'Avail', A: oee.availability, fullMark: 100 },
    { subject: 'Perf', A: oee.performance, fullMark: 100 },
    { subject: 'Qual', A: oee.quality, fullMark: 100 },
  ];

  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
      <div className="flex justify-between w-full mb-6">
        <div className="min-w-0">
          <h3 className="text-[11px] md:text-sm font-bold text-slate-800 uppercase tracking-wider">OEE Analysis</h3>
          <p className="text-[9px] md:text-[10px] text-slate-400 font-medium mt-0.5">Efficiency components</p>
        </div>
        <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100 h-fit shrink-0">
          <button onClick={() => setType('radar')} className={`p-1 md:p-1.5 rounded-md ${type === 'radar' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-400'}`}>
            <Share2 className="h-3 w-3 md:h-3.5 md:w-3.5" />
          </button>
          <button onClick={() => setType('bar')} className={`p-1 md:p-1.5 rounded-md ${type === 'bar' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-400'}`}>
            <BarChart3 className="h-3 w-3 md:h-3.5 md:w-3.5" />
          </button>
        </div>
      </div>
      
      <div className="w-full h-[250px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'radar' ? (
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fontSize: 9, fontWeight: 700, fill: '#475569' }} 
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar 
                dataKey="A" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                fill="#8b5cf6" 
                fillOpacity={0.4} 
              />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            </RadarChart>
          ) : (
            <BarChart data={radarData} layout="vertical" margin={{ left: 5, right: 30, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#475569' }} width={50} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="A" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={25} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-8 w-full mt-6 border-t border-slate-50 pt-6">
        {radarData.map(d => (
          <div key={d.subject} className="text-center group min-w-0">
            <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{d.subject}</p>
            <p className="text-sm md:text-xl font-bold text-slate-900 mt-1">{d.A}%</p>
            <div className="w-6 md:w-8 h-1 bg-slate-100 mx-auto mt-2 rounded-full overflow-hidden">
               <div className="h-full bg-purple-500" style={{ width: `${d.A}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
