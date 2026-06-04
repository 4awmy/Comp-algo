import React, { useState, useEffect, useRef } from 'react';
import MathBlock from '../../ui/Premium/MathBlock';
import styles from './Bespoke.module.css';

// ── Topological Sort DFS ──
export const TopologicalSortDFS = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [visited, setVisited] = useState(new Set());
  const [stack, setStack] = useState([]);
  const [popOrder, setPopOrder] = useState({});
  const [step, setStep] = useState(0);

  const nodes = [
    { id: 'A', x: 50, y: 50, neighbors: ['B', 'C'] },
    { id: 'B', x: 150, y: 50, neighbors: ['D'] },
    { id: 'C', x: 50, y: 150, neighbors: ['D'] },
    { id: 'D', x: 150, y: 150, neighbors: [] },
  ];

  const runDFS = () => {
    // Basic simulation for the demo
    setVisited(new Set(['D', 'B', 'C', 'A']));
    setStack(['D', 'B', 'C', 'A']);
    setPopOrder({ 'D': 1, 'B': 2, 'C': 3, 'A': 4 });
  };

  return (
    <div className={styles.metaphorContainer}>
      <div className={styles.metaphorLabel}>DFS-Based Topological Sort</div>
      <div className={styles.gridTwoCol}>
        <div className={styles.graphPane}>
          <svg viewBox="0 0 200 200" className={styles.traversalSvg}>
            {/* Edges */}
            <line x1="50" y1="50" x2="150" y2="50" className={styles.treeLink} stroke="var(--border-subtle)" markerEnd="url(#arrow)" />
            <line x1="50" y1="50" x2="50" y2="150" className={styles.treeLink} stroke="var(--border-subtle)" markerEnd="url(#arrow)" />
            <line x1="150" y1="50" x2="150" y2="150" className={styles.treeLink} stroke="var(--border-subtle)" markerEnd="url(#arrow)" />
            <line x1="50" y1="150" x2="150" y2="150" className={styles.treeLink} stroke="var(--border-subtle)" markerEnd="url(#arrow)" />
            
            {nodes.map(n => (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r="15" className={`${styles.nodeCircle} ${visited.has(n.id) ? styles.doneNode : ''}`} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" className={styles.nodeLabel}>{n.id}</text>
                {popOrder[n.id] && <text x={n.x + 18} y={n.y - 10} className={styles.popOrderText}>{popOrder[n.id]}</text>}
              </g>
            ))}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="25" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-subtle)" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className={styles.stackPane}>
          <div className={styles.paneHeader}>DFS Stack (Popping Order)</div>
          <div className={styles.stackVisual}>
            {stack.map((id, i) => (
              <div key={id} className={styles.stackFrame}>
                {id} (Post-order: {i + 1})
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={runDFS}>Run DFS Simulation</button>
        <button className={styles.controlBtn} onClick={() => { setVisited(new Set()); setStack([]); setPopOrder({}); }}>Reset</button>
      </div>
    </div>
  );
};

// ── Combinatorial Time Complexity ──
export const CombinatorialComplexity = () => {
  const [n, setN] = useState(10);
  const speed = 1e9; // 1GHz operations per second

  const subsetOps = Math.pow(2, n);
  const factorial = (num) => (num <= 1 ? 1 : num * factorial(num - 1));
  const permOps = factorial(n);

  const formatTime = (ops) => {
    const seconds = ops / speed;
    if (seconds < 1e-3) return `${(seconds * 1e6).toFixed(2)} μs`;
    if (seconds < 1) return `${(seconds * 1e3).toFixed(2)} ms`;
    if (seconds < 60) return `${seconds.toFixed(2)} s`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(2)} min`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(2)} hours`;
    if (seconds < 31536000) return `${(seconds / 86400).toFixed(2)} days`;
    return `${(seconds / 31536000).toExponential(2)} years`;
  };

  return (
    <div className={styles.metaphorContainer}>
      <div className={styles.metaphorLabel}>Combinatorial Explosion: Subsets vs Permutations</div>
      <div className={styles.controls} style={{ marginBottom: '2rem' }}>
        <label className={styles.scoreLabel}>Set Size (n): {n}</label>
        <input type="range" min="1" max="25" value={n} onChange={(e) => setN(parseInt(e.target.value))} className={styles.rangeInput} />
      </div>
      <div className={styles.complexityGrid}>
        <div className={styles.complexityLane}>
          <div className={styles.laneLabel}>Subsets (2ⁿ)</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${(n / 25) * 100}%` }} />
          </div>
          <div className={styles.scoreValue}>{formatTime(subsetOps)}</div>
        </div>
        <div className={styles.complexityLane}>
          <div className={styles.laneLabel}>Permutations (n!)</div>
          <div className={`${styles.progressBar} ${n > 13 ? styles.shatter : ''}`}>
            <div className={styles.progressFill} style={{ width: `${Math.min(100, (n / 15) * 100)}%`, backgroundColor: n > 12 ? 'var(--color-error)' : '' }} />
          </div>
          <div className={styles.scoreValue} style={{ color: n > 12 ? 'var(--color-error)' : '' }}>{formatTime(permOps)}</div>
        </div>
      </div>
      <p className={styles.metaphorNote}>
        At n=25, permutations (25!) take longer than the age of the universe, while subsets (2²⁵) take less than 0.1s at 1GHz.
      </p>
    </div>
  );
};

// ── Permutation Generation ──
export const PermutationGeneration = () => {
  const [algo, setAlgo] = useState('JT');
  const [elements, setElements] = useState([1, 2, 3]);
  const [directions, setDirections] = useState([-1, -1, -1]); // -1: left, 1: right

  const stepJT = () => {
    // Simple JT visual swap for demo
    const newElements = [...elements];
    const newDirs = [...directions];
    [newElements[1], newElements[2]] = [newElements[2], newElements[1]];
    [newDirs[1], newDirs[2]] = [newDirs[2], newDirs[1]];
    setElements(newElements);
    setDirections(newDirs);
  };

  return (
    <div className={styles.traversalContainer}>
      <div className={styles.traversalControls}>
        <button className={`${styles.traversalBtn} ${algo === 'JT' ? styles.active : ''}`} onClick={() => setAlgo('JT')}>Johnson-Trotter</button>
        <button className={`${styles.traversalBtn} ${algo === 'LEX' ? styles.active : ''}`} onClick={() => setAlgo('LEX')}>Lexicographic</button>
      </div>
      
      <div className={styles.rotationStage}>
        {algo === 'JT' ? (
          <div className={styles.permRow}>
            {elements.map((v, i) => (
              <div key={i} className={styles.permBlock}>
                <div className={styles.directionArrow}>{directions[i] === -1 ? '←' : '→'}</div>
                <div className={styles.blockValue}>{v}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.permRow}>
             <div className={styles.lexNode} style={{borderColor: 'var(--accent-blue)'}}>1</div>
             <div className={styles.lexNode} style={{borderColor: 'var(--accent-green)'}}>2</div>
             <div className={styles.lexNode}>4</div>
             <div className={styles.lexNode}>3</div>
             <div className={styles.metaphorNote}>Pivot swap + Tail reverse</div>
          </div>
        )}
      </div>
      <button className={styles.controlBtn} onClick={stepJT}>Next Permutation</button>
    </div>
  );
};

// ── Binary Search Key Comparisons ──
export const BinarySearchTreeTracing = () => {
  const array = [3, 14, 27, 31, 39, 42, 55, 70, 74, 81, 85, 93, 98];
  const [target, setTarget] = useState(70);
  const [path, setPath] = useState([6, 9, 7]); // Indices of comparisons for 70

  return (
    <div className={styles.metaphorContainer}>
      <div className={styles.metaphorLabel}>Binary Search Tracing</div>
      <div className={styles.raceArray} style={{justifyContent: 'center', marginBottom: '2rem'}}>
        {array.map((v, i) => (
          <div key={i} className={`${styles.raceCell} ${path.includes(i) ? styles.raceActive : ''} ${v === target ? styles.highlighted : ''}`}>
            {v}
          </div>
        ))}
      </div>
      
      <div className={styles.treeContainer}>
        <svg viewBox="0 0 200 100" className={styles.traversalSvg}>
          <circle cx="100" cy="20" r="10" className={`${styles.nodeCircle} ${path[0] === 6 ? styles.activeNode : ''}`} />
          <text x="100" y="24" textAnchor="middle" className={styles.nodeLabel}>42</text>
          
          <line x1="100" y1="20" x2="60" y2="50" className={styles.treeLink} />
          <line x1="100" y1="20" x2="140" y2="50" className={styles.treeLink} />
          
          <circle cx="60" cy="50" r="10" className={styles.nodeCircle} />
          <circle cx="140" cy="50" r="10" className={`${styles.nodeCircle} ${path[1] === 9 ? styles.activeNode : ''}`} />
          <text x="140" y="54" textAnchor="middle" className={styles.nodeLabel}>81</text>
        </svg>
      </div>
      <div className={styles.scoreItem}>
        <span className={styles.scoreLabel}>Comparisons:</span>
        <span className={styles.scoreValue}>{path.length}</span>
      </div>
    </div>
  );
};

// ── Russian Peasant Multiplication ──
export const RussianPeasantMultiplication = () => {
  const [n, setN] = useState(26);
  const [m, setM] = useState(47);
  const [steps, setSteps] = useState([]);

  const generateSteps = () => {
    let currN = n;
    let currM = m;
    const newSteps = [];
    while (currN >= 1) {
      newSteps.push({ n: currN, m: currM, odd: currN % 2 !== 0 });
      currN = Math.floor(currN / 2);
      currM = currM * 2;
    }
    setSteps(newSteps);
  };

  useEffect(generateSteps, [n, m]);

  return (
    <div className={styles.peasantContainer}>
      <div className={styles.peasantInputs}>
        <input type="number" value={n} onChange={e => setN(parseInt(e.target.value))} className={styles.peasantInput} />
        <span>×</span>
        <input type="number" value={m} onChange={e => setM(parseInt(e.target.value))} className={styles.peasantInput} />
      </div>
      
      <table className={styles.peasantTable}>
        <thead>
          <tr>
            <th>Halving (n)</th>
            <th>Doubling (m)</th>
            <th>Accumulator</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((s, i) => (
            <tr key={i} className={s.odd ? styles.rowOdd : styles.rowEven}>
              <td>{s.n}</td>
              <td>{s.m}</td>
              <td>{s.odd ? s.m : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className={styles.peasantResult}>
        Final Sum: <span className={styles.finalSum}>{steps.filter(s => s.odd).reduce((acc, s) => acc + s.m, 0)}</span>
      </div>
      
      <p className={styles.metaphorNote}>
        Complexity: Θ(log n) steps. Only rows where n is odd contribute to the final product.
      </p>
    </div>
  );
};
