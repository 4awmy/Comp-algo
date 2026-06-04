import React, { useState, useEffect } from 'react';
import styles from './Bespoke.module.css';

export const JohnsonTrotterTracer = ({ style }) => {
  const [n, setN] = useState(3);
  const [step, setStep] = useState(0);

  const permutations = {
    1: [['1']],
    2: [['1', '2'], ['2', '1']],
    3: [
      ['1', '2', '3'], ['1', '3', '2'], ['3', '1', '2'],
      ['3', '2', '1'], ['2', '3', '1'], ['2', '1', '3']
    ]
  };

  const directions = {
    3: [
      ['←', '←', '←'], ['←', '←', '←'], ['←', '←', '←'],
      ['→', '→', '→'], ['→', '→', '→'], ['→', '→', '→']
    ]
  };

  return (
    <div className={styles.tracerContainer} style={style}>
      <div className={styles.tracerGrid}>
        <div className={styles.tracerCodePane}>
          <div className={styles.codeHeader}>Johnson-Trotter Algorithm</div>
          <div className={styles.codeBlock}>
{`while (has_mobile_element) {
  find largest mobile element k
  swap k and its neighbor
  reverse direction of all elements > k
}`}
          </div>
          <div className={styles.controls}>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} className={styles.controlBtn}>Back</button>
            <button onClick={() => setStep(s => (s + 1) % permutations[n].length)} className={styles.controlBtn}>Next Step</button>
          </div>
        </div>
        <div className={styles.tracerVisualPane} style={{ flexDirection: 'column' }}>
          <div className={styles.metaphorLabel}>Step {step + 1}: Minimal Change</div>
          <div className={styles.permRow} style={{ display: 'flex', gap: '1rem' }}>
            {permutations[n][step].map((val, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', color: 'var(--accent-blue)', fontWeight: 800 }}>
                  {directions[n]?.[step][i] || '←'}
                </div>
                <div className={styles.permItem} style={{ 
                  background: val === '3' ? 'rgba(59, 130, 246, 0.1)' : 'white',
                  borderColor: val === '3' ? 'var(--accent-blue)' : 'var(--border-subtle)'
                }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
          <p className={styles.metaphorText} style={{ marginTop: '2rem' }}>
            The element '3' is "weaving" through the permutation. 
            A number is <b>mobile</b> if its arrow points to a smaller adjacent number.
          </p>
        </div>
      </div>
    </div>
  );
};

export const LexicographicTracer = ({ style }) => {
  const [step, setStep] = useState(0);
  const sequence = ['1', '2', '3'];
  const steps = [
    { label: "Find largest i such that a[i] < a[i+1]", highlight: [0], val: "a[0]=1 < a[1]=2" },
    { label: "Find largest j such that a[i] < a[j]", highlight: [2], val: "a[0]=1 < a[2]=3" },
    { label: "Swap a[i] and a[j]", swap: [0, 2] },
    { label: "Reverse from i+1 to end", reverse: true }
  ];

  return (
    <div className={styles.tracerContainer} style={style}>
      <div className={styles.tracerGrid}>
        <div className={styles.tracerCodePane}>
          <div className={styles.codeHeader}>Lexicographic Order</div>
          <div className={styles.codeBlock}>
{`1. Find max i: a[i] < a[i+1]
2. Find max j: a[i] < a[j]
3. Swap a[i], a[j]
4. Reverse a[i+1...n]`}
          </div>
          <button onClick={() => setStep((step + 1) % steps.length)} className={styles.controlBtn}>Next Phase</button>
        </div>
        <div className={styles.tracerVisualPane} style={{ flexDirection: 'column' }}>
          <div className={styles.raceArray}>
            {['1', '2', '3'].map((v, i) => {
              let displayVal = v;
              if (step === 2 && steps[2].swap.includes(i)) displayVal = i === 0 ? '3' : '1';
              if (step === 3) displayVal = ['3', '2', '1'][i];
              
              return (
                <div key={i} className={`${styles.raceCell} ${steps[step].highlight?.includes(i) ? styles.raceActive : ''}`}
                     style={{ transition: 'all 0.5s' }}>
                  {displayVal}
                </div>
              );
            })}
          </div>
          <div className={styles.stepInfo}>{steps[step].label}</div>
          <div className={styles.metaphorText}>{steps[step].val}</div>
        </div>
      </div>
    </div>
  );
};

export const BottomUpSubsetTracer = ({ style }) => {
  const [level, setLevel] = useState(0);
  
  return (
    <div className={styles.treeContainer} style={style}>
      <div className={styles.metaphorLabel}>Recursive Subset Generation</div>
      <svg viewBox="0 0 400 240" className={styles.recursiveTree}>
        {/* Level 0 */}
        <rect x="180" y="20" width="40" height="20" rx="4" className={styles.nodeBox} />
        <text x="200" y="33" textAnchor="middle" className={styles.nodeText}>∅</text>

        {/* Level 1 */}
        {level >= 1 && (
          <>
            <line x1="200" y1="40" x2="140" y2="70" className={styles.treeLink} />
            <line x1="200" y1="40" x2="260" y2="70" className={styles.treeLink} />
            <rect x="120" y="70" width="40" height="20" rx="4" className={styles.nodeBox} />
            <text x="140" y="83" textAnchor="middle" className={styles.nodeText}>∅</text>
            <rect x="240" y="70" width="40" height="20" rx="4" className={styles.nodeBox} style={{ fill: 'rgba(59, 130, 246, 0.2)' }} />
            <text x="260" y="83" textAnchor="middle" className={styles.nodeText}>{1}</text>
          </>
        )}

        {/* Level 2 */}
        {level >= 2 && (
          <>
            <line x1="140" y1="90" x2="100" y2="120" className={styles.treeLink} />
            <line x1="140" y1="90" x2="180" y2="120" className={styles.treeLink} />
            <line x1="260" y1="90" x2="220" y2="120" className={styles.treeLink} />
            <line x1="260" y1="90" x2="300" y2="120" className={styles.treeLink} />
            
            <rect x="80" y="120" width="40" height="20" rx="4" className={styles.nodeBox} />
            <text x="100" y="133" textAnchor="middle" className={styles.nodeText}>∅</text>
            <rect x="160" y="120" width="40" height="20" rx="4" className={styles.nodeBox} style={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
            <text x="180" y="133" textAnchor="middle" className={styles.nodeText}>{2}</text>
            
            <rect x="200" y="120" width="40" height="20" rx="4" className={styles.nodeBox} />
            <text x="220" y="133" textAnchor="middle" className={styles.nodeText}>{1}</text>
            <rect x="280" y="120" width="40" height="20" rx="4" className={styles.nodeBox} style={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
            <text x="300" y="133" textAnchor="middle" className={styles.nodeText}>1,2</text>
          </>
        )}
      </svg>
      <div className={styles.controls}>
        <button onClick={() => setLevel(Math.max(0, level - 1))} className={styles.controlBtn}>Previous Set</button>
        <button onClick={() => setLevel(Math.min(2, level + 1))} className={styles.controlBtn}>Next Set (Add {level + 1})</button>
      </div>
    </div>
  );
};

export const GrayCodeTracer = ({ style }) => {
  const [n, setN] = useState(2);
  const l1 = n === 2 ? ['0', '1'] : ['00', '01', '11', '10'];
  const l2 = [...l1].reverse();
  
  return (
    <div className={styles.tracerContainer} style={style}>
      <div className={styles.tracerGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className={styles.tracerCodePane}>
          <div className={styles.codeHeader}>Binary Reflected Gray Code</div>
          <div className={styles.codeBlock}>
{`L1 = BRGC(n-1)
L2 = L1 reversed
Add '0' to L1, '1' to L2
Result = L1 ∪ L2`}
          </div>
          <div className={styles.speedometerContainer} style={{ marginTop: '2rem' }}>
            <div className={styles.gauge}>
              <div className={styles.gaugeNeedle} style={{ transform: `rotate(${n === 2 ? -45 : 45}deg)` }}></div>
            </div>
            <div className={styles.dataLabel}>Efficiency Speedometer</div>
            <div className={styles.dataValue}>{n === 3 ? 'Ultra Fast O(1)' : 'O(1) Step'}</div>
          </div>
        </div>
        <div className={styles.tracerVisualPane} style={{ flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div className={styles.permCol}>
              <div className={styles.laneLabel}>0 + L1</div>
              {l1.map((v, i) => <div key={i} className={styles.subsetCard}>0{v}</div>)}
            </div>
            <div className={styles.permCol}>
              <div className={styles.laneLabel}>1 + L2 (Reversed)</div>
              {l2.map((v, i) => <div key={i} className={styles.subsetCard} style={{ borderColor: 'var(--accent-blue)' }}>1{v}</div>)}
            </div>
          </div>
          <p className={styles.metaphorText}>
            Notice: Adjacent codes differ by exactly <b>one bit</b>. 
            This "reflection" ensures minimal change between any two steps.
          </p>
          <button onClick={() => setN(n === 2 ? 3 : 2)} className={styles.controlBtn}>Toggle n={n === 2 ? 3 : 2}</button>
        </div>
      </div>
    </div>
  );
};

export const BinarySearchRace = ({ style }) => {
  const [linearIdx, setLinearIdx] = useState(-1);
  const [binaryBounds, setBinaryBounds] = useState({ l: 0, r: 14 });
  const [isRunning, setIsRunning] = useState(false);
  const target = 13;
  const array = Array.from({ length: 15 }, (_, i) => i + 1);

  const startRace = () => {
    setIsRunning(true);
    setLinearIdx(-1);
    setBinaryBounds({ l: 0, r: 14 });
  };

  useEffect(() => {
    if (!isRunning) return;

    let lCount = -1;
    const lTimer = setInterval(() => {
      lCount++;
      setLinearIdx(lCount);
      if (array[lCount] === target) clearInterval(lTimer);
    }, 400);

    let low = 0;
    let high = 14;
    const bTimer = setInterval(() => {
      const mid = Math.floor((low + high) / 2);
      if (array[mid] === target) {
        setBinaryBounds({ l: mid, r: mid });
        clearInterval(bTimer);
      } else if (array[mid] < target) {
        low = mid + 1;
        setBinaryBounds({ l: low, r: high });
      } else {
        high = mid - 1;
        setBinaryBounds({ l: low, r: high });
      }
    }, 800);

    return () => {
      clearInterval(lTimer);
      clearInterval(bTimer);
    };
  }, [isRunning]);

  return (
    <div className={styles.raceContainer} style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button onClick={startRace} className={styles.controlBtn}>Start Search Race (Target: 13)</button>
        <div className={styles.complexityBadge}>T(n) = T(n/2) + 1 → O(log n)</div>
      </div>
      
      <div className={styles.raceLane}>
        <div className={styles.laneLabel}>Linear Search (Brute Force)</div>
        <div className={styles.raceArray}>
          {array.map((v, i) => (
            <div key={i} className={`${styles.raceCell} ${linearIdx === i ? styles.raceActive : ''} ${linearIdx > i && array[i] !== target ? styles.raceInactive : ''}`}>
              {v}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.raceLane}>
        <div className={styles.laneLabel}>Binary Search (Decrease & Conquer)</div>
        <div className={styles.raceArray}>
          {array.map((v, i) => {
            const isInBounds = i >= binaryBounds.l && i <= binaryBounds.r;
            const isMid = i === Math.floor((binaryBounds.l + binaryBounds.r) / 2);
            return (
              <div key={i} className={`${styles.raceCell} ${isMid && isRunning ? styles.raceActive : ''} ${!isInBounds && isRunning ? styles.raceInactive : ''}`}
                   style={{ transform: !isInBounds && isRunning ? 'translateY(10px) rotate(5deg)' : 'none', filter: !isInBounds && isRunning ? 'grayscale(1) blur(1px)' : 'none' }}>
                {v}
              </div>
            );
          })}
        </div>
      </div>
      <p className={styles.metaphorText} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        Binary search "shatters" the search space by discarding half at every step.
      </p>
    </div>
  );
};

export const RussianPeasantTracer = ({ style }) => {
  const [rows, setRows] = useState([]);
  const [n, setN] = useState(50);
  const [m, setM] = useState(65);
  const [step, setStep] = useState(0);

  const calculate = () => {
    let currN = n;
    let currM = m;
    const newRows = [];
    while (currN >= 1) {
      newRows.push({ n: currN, m: currM, odd: currN % 2 !== 0 });
      currN = Math.floor(currN / 2);
      currM = currM * 2;
    }
    setRows(newRows);
  };

  useEffect(calculate, [n, m]);

  return (
    <div className={styles.peasantContainer} style={style}>
      <div className={styles.peasantInputs}>
        <input type="number" value={n} onChange={e => setN(parseInt(e.target.value) || 0)} className={styles.peasantInput} />
        <span>×</span>
        <input type="number" value={m} onChange={e => setM(parseInt(e.target.value) || 0)} className={styles.peasantInput} />
      </div>
      <table className={styles.peasantTable}>
        <thead>
          <tr>
            <th>n (Halve)</th>
            <th>m (Double)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={!row.odd ? styles.rowEven : styles.rowOdd}
                style={{ transition: 'all 0.5s', transform: row.odd && step > 0 ? 'translateX(20px)' : 'none' }}>
              <td style={{ textDecoration: !row.odd ? 'line-through' : 'none' }}>{row.n}</td>
              <td style={{ textDecoration: !row.odd ? 'line-through' : 'none' }}>{row.m}</td>
              <td>{row.odd ? <span style={{ color: 'var(--accent-green)', fontWeight: 800 }}>KEEP</span> : 'DISCARD'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.controls} style={{ marginTop: '1rem' }}>
        <button onClick={() => setStep(step === 0 ? 1 : 0)} className={styles.controlBtn}>
          {step === 0 ? 'Slide Out Odd Rows' : 'Reset Table'}
        </button>
      </div>
      <div className={styles.peasantResult}>
        {step === 1 ? (
          <div style={{ animation: 'popIn 0.5s' }}>
            Result: {rows.filter(r => r.odd).map(r => r.m).join(' + ')} = <span className={styles.finalSum}>{n * m}</span>
          </div>
        ) : "Strikethrough even rows, sum the remaining m's."}
      </div>
    </div>
  );
};

export const JosephusCircle = ({ style }) => {
  const [count, setCount] = useState(10);
  const [step, setStep] = useState(0);
  const [eliminated, setEliminated] = useState([]);
  const [active, setActive] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startElimination = () => {
    setEliminated([]);
    setIsRunning(true);
    setStep(0);
  };

  useEffect(() => {
    if (!isRunning) return;
    let people = Array.from({ length: count }, (_, i) => i + 1);
    let index = 0;
    let elim = [];

    const timer = setInterval(() => {
      if (elim.length < count - 1) {
        // Skip 1
        index = (index + 1) % count;
        while (elim.includes(people[index])) {
          index = (index + 1) % count;
        }
        setActive(index);
        
        // Eliminate next
        setTimeout(() => {
          let nextIdx = (index + 1) % count;
          while (elim.includes(people[nextIdx])) {
            nextIdx = (nextIdx + 1) % count;
          }
          elim.push(people[nextIdx]);
          setEliminated([...elim]);
          index = (nextIdx + 1) % count;
          while (elim.includes(people[index]) && elim.length < count - 1) {
            index = (index + 1) % count;
          }
        }, 400);
      } else {
        setIsRunning(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, count]);

  return (
    <div className={styles.josephusContainer} style={style}>
      <div className={styles.josephusControls}>
         <input type="range" min="3" max="15" value={count} onChange={e => { setCount(parseInt(e.target.value)); setEliminated([]); }} />
         <button onClick={startElimination} className={styles.controlBtn}>Start Elimination Pattern</button>
         <div className={styles.complexityBadge}>J(n) = 2(n - 2^k) + 1</div>
      </div>
      <div className={styles.josephusCircle}>
        {Array.from({ length: count }).map((_, i) => {
          const angle = (i * 360) / count;
          const isEliminated = eliminated.includes(i + 1);
          const isActive = active === i && isRunning;
          return (
            <div 
              key={i} 
              className={`${styles.josephusPerson} ${isEliminated ? styles.eliminated : ''} ${isActive ? styles.raceActive : ''}`}
              style={{ transform: `rotate(${angle}deg) translate(80px) rotate(-${angle}deg)` }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <p className={styles.metaphorText} style={{ marginTop: '2rem' }}>
        The pattern for n=2^k is always 1. For other n, it shifts. 
        <b>Watch the skipping pattern (k=2).</b>
      </p>
    </div>
  );
};

