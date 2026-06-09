/* eslint-disable */
import React, { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const GrowthChartTracer = ({ style }) => {
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
    <VisualStage style={style} 
      title="Order of Growth Comparison"
      description="Adjust 'n' to see how basic efficiency classes grow relative to each other."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Input size (n):</span>
          <input type="range" min="1" max="50" value={n} onChange={e => setN(Number(e.target.value))} className={styles.rangeInput} />
          <span style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', fontWeight: 'bold', width: '2rem' }}>{n}</span>
        </div>

        <div className={styles.gridTwoCol} style={{ height: '300px', margin: 0 }}>
           {/* Chart Area */}
           <div style={{ position: 'relative', borderLeft: '2px solid var(--border-subtle)', borderBottom: '2px solid var(--border-subtle)', padding: '0.5rem' }}>
              <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                 {functions.map(f => {
                   const path = chartData.map(p => {
                      const x = (p.n / 50) * 100;
                      const y = 100 - (f.calc(p.n) / 2500) * 100;
                      return `${x},${y}`;
                   }).join(' ');
                   return <polyline key={f.id} points={path} fill="none" stroke={f.color} strokeWidth="1" strokeDasharray={f.id === 'nlogn' ? '1,1' : ''} />
                 })}
                 {/* Current N cursor */}
                 <line x1={(n / 50) * 100} y1="0" x2={(n / 50) * 100} y2="100" stroke="var(--text-muted)" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, fontSize: '8px', color: 'var(--text-muted)' }}>Operations</div>
              <div style={{ position: 'absolute', bottom: '-15px', right: 0, fontSize: '8px', color: 'var(--text-muted)' }}>Input Size (n)</div>
           </div>

           {/* Stats Area */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
              {functions.map(f => {
                const val = f.calc(n);
                return (
                  <div key={f.id} className={styles.infoCardMini} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: f.color }} />
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: '500' }}>{f.label}</span>
                    </div>
                    <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-code)' }}>{val.toFixed(1)}</span>
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
