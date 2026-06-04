import { useState, useMemo } from 'react'
import MathBlock from '../../ui/Premium/MathBlock'
import VisualStage from '../../ui/Premium/VisualStage'
import styles from './Bespoke.module.css'

const DynamicProgTracer = ({ style }) => {
  const [mode, setMode] = useState('Knapsack'); // 'CoinRow' | 'Knapsack' | 'Warshall'
  const [step, setStep] = useState(0);

  const steps = useMemo(() => {
    const s = [];
    if (mode === 'CoinRow') {
      const coins = [5, 1, 2, 10, 6, 2];
      const dp = new Array(coins.length + 1).fill(0);
      s.push({ dp: [...dp], active: -1, desc: "Initial state: F(0) = 0." });
      dp[1] = coins[0];
      s.push({ dp: [...dp], active: 0, desc: `F(1) = c1 = ${coins[0]}.` });
      
      for (let i = 2; i <= coins.length; i++) {
        const pick = coins[i-1] + dp[i-2];
        const skip = dp[i-1];
        dp[i] = Math.max(pick, skip);
        s.push({ 
          dp: [...dp], 
          active: i-1, 
          comparing: [i-1, i-2],
          desc: `F(${i}) = max(c${i} + F(${i-2}), F(${i-1})) = max(${coins[i-1]} + ${dp[i-2]}, ${dp[i-1]}) = ${dp[i]}.` 
        });
      }
    } else if (mode === 'Knapsack') {
      const weights = [2, 1, 3, 2];
      const values = [12, 10, 20, 15];
      const capacity = 5;
      const n = weights.length;
      const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
      
      s.push({ dp: dp.map(r => [...r]), active: [-1, -1], desc: "Initial DP table (0 for capacity 0 or item 0)." });

      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= capacity; j++) {
          if (j - weights[i-1] >= 0) {
            const pick = values[i-1] + dp[i-1][j - weights[i-1]];
            const skip = dp[i-1][j];
            dp[i][j] = Math.max(pick, skip);
            s.push({ 
              dp: dp.map(r => [...r]), 
              active: [i, j], 
              comparing: [[i-1, j], [i-1, j - weights[i-1]]],
              desc: `Item ${i} (w:${weights[i-1]}, v:${values[i-1]}) at capacity ${j}. Max(${values[i-1]} + dp[${i-1}][${j-weights[i-1]}], dp[${i-1}][${j}]) = ${dp[i][j]}.`
            });
          } else {
            dp[i][j] = dp[i-1][j];
            s.push({ 
              dp: dp.map(r => [...r]), 
              active: [i, j], 
              comparing: [[i-1, j]],
              desc: `Item ${i} too heavy for capacity ${j}. Carry over dp[${i-1}][${j}] = ${dp[i][j]}.`
            });
          }
        }
      }
    } else if (mode === 'Warshall') {
      const nodes = 4;
      let adj = [
        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [1, 0, 1, 0]
      ];
      
      s.push({ matrix: adj.map(r => [...r]), k: -1, desc: "Initial adjacency matrix R(0)." });

      for (let k = 0; k < nodes; k++) {
        const next = adj.map(r => [...r]);
        for (let i = 0; i < nodes; i++) {
          for (let j = 0; j < nodes; j++) {
            next[i][j] = adj[i][j] || (adj[i][k] && adj[k][j]);
          }
        }
        adj = next;
        s.push({ matrix: adj.map(r => [...r]), k, desc: `Update R(${k+1}) using node ${k+1} as intermediate.` });
      }
    }
    return s;
  }, [mode]);

  const current = steps[step] || steps[0];

  return (
    <VisualStage style={style}
      title={`Dynamic Programming: ${mode === 'CoinRow' ? 'Coin Row' : mode === 'Knapsack' ? '0/1 Knapsack' : 'Warshall\'s'}`}
      description={current.desc}
      actions={
        <div className={styles.tracerActions}>
          <select 
            className="select select-bordered select-sm" 
            value={mode} 
            onChange={(e) => { setMode(e.target.value); setStep(0); }}
          >
            <option value="CoinRow">Coin Row</option>
            <option value="Knapsack">Knapsack</option>
            <option value="Warshall">Warshall's</option>
          </select>
          <div className={styles.stepControls}>
            <button className="btn btn-outline btn-sm" onClick={() => setStep(Math.max(0, step - 1))}>Prev</button>
            <button className="btn btn-primary btn-sm" onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>Next</button>
          </div>
        </div>
      }
    >
      <div className={styles.tracerContainer}>
        {mode === 'CoinRow' && (
          <div className={styles.arrayContainer} style={{ minHeight: '180px' }}>
            {[5, 1, 2, 10, 6, 2].map((val, i) => (
              <div key={i} className={`${styles.element} ${current.active === i ? styles.active : ''}`}>
                <div className={styles.bar} style={{ height: `${val * 10}px` }}>{val}</div>
                <div className={styles.label}>c{i+1}</div>
                <div className={styles.badgeValue} style={{ marginTop: 'auto', fontWeight: 800 }}>F:{current.dp[i+1]}</div>
              </div>
            ))}
          </div>
        )}

        {mode === 'Knapsack' && (
          <div className={styles.gridContainer} style={{ width: '100%', overflowX: 'auto' }}>
            <table className={styles.dpTable} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ padding: '8px', border: '1px solid var(--border-subtle)' }}>i \ j</th>
                  {[0, 1, 2, 3, 4, 5].map(j => (
                    <th key={j} style={{ padding: '8px', border: '1px solid var(--border-subtle)' }}>{j}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.dp.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '8px', border: '1px solid var(--border-subtle)', fontWeight: 'bold' }}>{i}</td>
                    {row.map((val, j) => {
                      const isActive = current.active[0] === i && current.active[1] === j;
                      const isComparing = current.comparing?.some(c => c[0] === i && c[1] === j);
                      return (
                        <td 
                          key={j} 
                          style={{ 
                            padding: '8px', 
                            border: '1px solid var(--border-subtle)',
                            backgroundColor: isActive ? 'rgba(6, 182, 212, 0.2)' : isComparing ? 'rgba(197, 160, 89, 0.1)' : 'transparent',
                            color: isActive ? 'var(--accent-cyan)' : 'inherit',
                            transition: 'all 0.3s'
                          }}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {mode === 'Warshall' && (
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
            <div className={styles.matrixWrapper} style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
               <h4 style={{ marginBottom: '1rem', textAlign: 'center' }}>R({current.k + 1})</h4>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 40px)', gap: '4px' }}>
                 {current.matrix.flat().map((val, idx) => {
                   const r = Math.floor(idx / 4);
                   const c = idx % 4;
                   const isPivotRow = r === current.k;
                   const isPivotCol = c === current.k;
                   return (
                     <div 
                        key={idx} 
                        style={{ 
                          width: '40px', height: '40px', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '4px',
                          background: isPivotRow || isPivotCol ? 'rgba(13, 44, 84, 0.1)' : 'var(--bg-surface)',
                          color: val ? 'var(--accent-cyan)' : 'var(--text-muted)',
                          fontWeight: val ? 800 : 400
                        }}
                      >
                       {val}
                     </div>
                   );
                 })}
               </div>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', maxWidth: '200px' }}>
              Highlighting row {current.k + 1} and column {current.k + 1}. Any cell <MathBlock math="(i, j)" /> becomes 1 if it's already 1 OR if <MathBlock math="(i, k)" /> and <MathBlock math="(k, j)" /> are both 1.
            </div>
          </div>
        )}
      </div>
    </VisualStage>
  );
};

export default DynamicProgTracer;
