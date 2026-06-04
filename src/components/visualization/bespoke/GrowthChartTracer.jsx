/* eslint-disable */
import React, { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const GrowthChartTracer = () => {
  const [n, setN] = useState(20);

  const functions = [
    { id: '1', label: '1 (Constant)', color: 'var(--color-success)', calc: () => 1 },
    { id: 'log', label: 'log n', color: 'var(--color-warning)', calc: (v) => Math.log2(v) },
    { id: 'n', label: 'n (Linear)', color: 'var(--accent-blue)', calc: (v) => v },
    { id: 'nlogn', label: 'n log n', color: 'var(--accent-purple)', calc: (v) => v * Math.log2(v) },
    { id: 'n2', label: 'n² (Quadratic)', color: 'var(--color-error)', calc: (v) => v * v },
  ];

  const chartData = useMemo(() => {
    const points = [];
    for (let i = 1; i <= 50; i += 2) {
      points.push({
        n: i,
        vals: functions.map(f => f.calc(i))
      });
    }
    return points;
  }, []);

  const maxVal = n * n; // Cap for visualization

  return (
    <VisualStage 
      title="Order of Growth Comparison"
      description="Adjust 'n' to see how basic efficiency classes grow relative to each other."
    >
      <div className="flex flex-col gap-6 w-full p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold">Input size (n):</span>
          <input type="range" min="1" max="50" value={n} onChange={e => setN(Number(e.target.value))} className="range range-xs range-primary" />
          <span className="text-sm font-mono font-bold w-8">{n}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
           {/* Chart Area */}
           <div className="relative border-l-2 border-b-2 border-white/10 p-2">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 {functions.map(f => {
                   const path = chartData.map(p => {
                      const x = (p.n / 50) * 100;
                      const y = 100 - (f.calc(p.n) / 2500) * 100;
                      return `${x},${y}`;
                   }).join(' ');
                   return <polyline key={f.id} points={path} fill="none" stroke={f.color} strokeWidth="1" strokeDasharray={f.id === 'nlogn' ? '1,1' : ''} />
                 })}
                 {/* Current N cursor */}
                 <line x1={(n / 50) * 100} y1="0" x2={(n / 50) * 100} y2="100" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
              </svg>
              <div className="absolute top-0 left-0 text-[8px] text-muted-foreground">Operations</div>
              <div className="absolute bottom-[-15px] right-0 text-[8px] text-muted-foreground">Input Size (n)</div>
           </div>

           {/* Stats Area */}
           <div className="flex flex-col gap-2 overflow-y-auto">
              {functions.map(f => {
                const val = f.calc(n);
                return (
                  <div key={f.id} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: f.color }} />
                      <span className="text-xs font-medium">{f.label}</span>
                    </div>
                    <span className="text-xs font-mono">{val.toFixed(1)}</span>
                  </div>
                );
              })}
           </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default GrowthChartTracer;
