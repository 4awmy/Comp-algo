import React, { useState, useEffect } from 'react';
import styles from './Bespoke.module.css';

export const CoinRowMetaphor = () => {
  const [active, setActive] = useState([]);
  const coins = [5, 1, 2, 10, 6, 2];

  const toggle = (i) => {
    if (active.includes(i)) {
      setActive(active.filter(x => x !== i));
    } else {
      // Rule: no adjacent
      if (!active.includes(i-1) && !active.includes(i+1)) {
        setActive([...active, i]);
      }
    }
  };

  const currentSum = active.reduce((acc, i) => acc + coins[i], 0);

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>The Coin-Row Problem</div>
       <div className={styles.coinRowStage}>
          {coins.map((c, i) => (
            <div 
              key={i} 
              className={`${styles.coin} ${active.includes(i) ? styles.activeCoin : ''}`}
              onClick={() => toggle(i)}
            >
              {c}
            </div>
          ))}
       </div>
       <div className={styles.peasantResult}>
          Current Total: <span className={styles.finalSum}>{currentSum}</span>
          <p className={styles.metaphorText} style={{marginTop: '0.5rem'}}>
             Constraint: You cannot pick two adjacent coins. Try to find the maximum possible sum (Solution: 5 + 10 + 2 = 17).
          </p>
       </div>
    </div>
  );
};

export const GreedyVsDpMetaphor = () => {
  return (
    <div className={styles.gridTwoCol}>
       <div className={styles.caseBox}>
          <h4>Greedy Mindset</h4>
          <div className={styles.pipelineContent}>"Take the best NOW."</div>
          <div className={styles.greedyVisual}>
             <div className={styles.greedyStep}>Step 1: Big Profit! 💰</div>
             <div className={styles.greedyStep} style={{opacity: 0.5}}>Step 2: No more options... 🪹</div>
          </div>
          <p className={styles.metaphorText}>Short-sighted. May miss the global optimum.</p>
       </div>
       <div className={styles.caseBox}>
          <h4>DP Mindset</h4>
          <div className={styles.pipelineContent}>"Consider all futures."</div>
          <div className={styles.dpVisual}>
             <div className={styles.dpLayer}>Option A: 💎</div>
             <div className={styles.dpLayer}>Option B: 💎💎</div>
          </div>
          <p className={styles.metaphorText}>Exhaustive yet efficient due to reuse.</p>
       </div>
    </div>
  );
};

export const DpPuzzleMetaphor = () => {
  const [solvedCount, setSolvedCount] = useState(0);
  const total = 4;

  useEffect(() => {
    const timer = setInterval(() => {
      setSolvedCount(prev => (prev + 1) % (total + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>DP Metaphor: Memoization Jigsaw</div>
       <div className={styles.puzzleStage}>
          <div className={styles.puzzleWhole}>
             {[...Array(total)].map((_, i) => (
               <div 
                 key={i} 
                 className={`${styles.puzzlePiece} ${i < solvedCount ? styles.solved : ''}`}
                 style={{ 
                   transform: i < solvedCount ? 'none' : `translate(${i % 2 === 0 ? -40 : 40}px, -20px)`,
                   opacity: i < solvedCount ? 1 : 0.4
                 }}
               />
             ))}
          </div>
          <div style={{ marginLeft: '2rem', textAlign: 'left' }}>
             <div className={styles.scoreboard}>
                <div className={styles.scoreItem}>
                   <span className={styles.scoreLabel}>Subproblem Storage</span>
                   <span className={styles.scoreValue}>{solvedCount} / {total}</span>
                </div>
                <div className={styles.progressBar}>
                   <div className={styles.progressFill} style={{ width: `${(solvedCount / total) * 100}%` }} />
                </div>
             </div>
          </div>
       </div>
       <p className={styles.metaphorText}>
          In DP, we assemble the "big picture" from stored sub-solutions. Once a piece is found, we keep it in the <b>Memo Table</b> (our storage box) so we never search for it again.
       </p>
    </div>
  );
};

export const CoinRowWeighingScale = () => {
  const [step, setStep] = useState(2);
  const coins = [5, 1, 2, 10, 6, 2];
  const F = [0, 5, 5, 7, 15, 15, 17]; // Pre-calculated F values for 5, 1, 2, 10, 6, 2
  
  const currentCoin = coins[step - 1];
  const choiceA = F[step - 1]; // Skip
  const choiceB = currentCoin + F[step - 2]; // Pick

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Step-by-Step Selection: F({step})</div>
       <div className={styles.pipelineFlex}>
          <div className={`${styles.caseBox} ${choiceA >= choiceB ? styles.active : ''}`}>
             <div className={styles.pillarTitle}>Option: Skip Coin {step}</div>
             <div className={styles.pipelineContent}>F({step-1}) = {choiceA}</div>
          </div>
          <div className={styles.pipelineArrow}>VS</div>
          <div className={`${styles.caseBox} ${choiceB > choiceA ? styles.active : ''}`}>
             <div className={styles.pillarTitle}>Option: Pick Coin {step}</div>
             <div className={styles.pipelineContent}>{currentCoin} + F({step-2}) = {choiceB}</div>
          </div>
       </div>
       <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={() => setStep(Math.max(2, step - 1))}>Prev</button>
          <button className={styles.controlBtn} onClick={() => setStep(Math.min(6, step + 1))}>Next</button>
       </div>
       <p className={styles.metaphorNote}>
          At each step $i$, we weigh two choices: skip coin $i$ and take the previous best, or pick coin $i$ and add it to the best solution from two steps back.
       </p>
    </div>
  );
};

export const KnapsackSimulator = () => {
  const [capacity, setCapacity] = useState(5);
  const items = [
    { name: 'Gems', w: 2, v: 12, icon: '💎' },
    { name: 'Gold', w: 1, v: 10, icon: '💰' },
    { name: 'Statue', w: 3, v: 20, icon: '🗿' },
    { name: 'Book', w: 1, v: 5, icon: '📜' }
  ];

  const currentWeight = items.filter((_, i) => i < 3).reduce((acc, it) => acc + it.w, 0); // Mock selection
  const isFull = currentWeight > capacity;

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>The Adventurer's Backpack</div>
       <div className={styles.knapsackContainer}>
          <div className={styles.shelf}>
             {items.map((it, i) => (
               <div key={i} className={styles.conceptBox} style={{ padding: '0.5rem', minWidth: '80px' }}>
                  <div style={{ fontSize: '1.5rem' }}>{it.icon}</div>
                  <div className={styles.scoreValue}>{it.v} coins</div>
                  <div className={styles.scoreLabel}>{it.w}kg</div>
               </div>
             ))}
          </div>
          <div className={`${styles.knapsackBag} ${isFull ? styles.knapsackFull : ''}`}>
             <div style={{ fontSize: '3rem' }}>🎒</div>
             <div className={styles.capacityGauge}>
                <div 
                   className={styles.progressFill} 
                   style={{ 
                     width: `${Math.min(100, (currentWeight / capacity) * 100)}%`,
                     background: isFull ? 'var(--color-error)' : 'var(--accent-green)'
                   }} 
                />
             </div>
             <div className={styles.scoreValue} style={{ marginTop: '0.5rem' }}>
                {currentWeight} / {capacity} kg
             </div>
          </div>
       </div>
       <div className={styles.controls} style={{ justifyContent: 'center' }}>
          <span>Capacity: </span>
          <input 
            type="range" min="1" max="10" value={capacity} 
            onChange={(e) => setCapacity(parseInt(e.target.value))}
            className={styles.rangeInput}
          />
          <b>{capacity} kg</b>
       </div>
    </div>
  );
};

export const WarshallScanner = () => {
  const [activeK, setActiveK] = useState(0);
  const matrix = [
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
    [1, 0, 1, 0]
  ];

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Warshall's Scanning: k = {activeK}</div>
       <div style={{ position: 'relative', display: 'inline-block' }}>
          <div className={styles.scanLine} style={{ animationDuration: '3s' }} />
          <div className={styles.matrixGrid} style={{ gridTemplateColumns: 'repeat(4, 40px)' }}>
             {matrix.map((row, i) => row.map((val, j) => (
               <div 
                 key={`${i}-${j}`} 
                 className={`${styles.matrixCell} ${i === activeK || j === activeK ? styles.matrixActive : ''}`}
                 style={{ 
                   background: i === activeK && j === activeK ? 'var(--color-error)' : (i === activeK || j === activeK ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-elevated)'),
                   color: i === activeK || j === activeK ? 'var(--accent-blue)' : 'var(--text-muted)'
                 }}
               >
                 {val}
               </div>
             )))}
          </div>
       </div>
       <div className={styles.controls} style={{ justifyContent: 'center' }}>
          {[0, 1, 2, 3].map(k => (
            <button 
              key={k} 
              className={`${styles.controlBtn} ${activeK === k ? styles.active : ''}`}
              onClick={() => setActiveK(k)}
            >
              k={k}
            </button>
          ))}
       </div>
       <p className={styles.metaphorText}>
          Warshall's algorithm uses vertex $k$ as an intermediate step. We scan the $k$-th row and $k$-th column to find new paths.
       </p>
    </div>
  );
};

export const FloydOdometer = () => {
  const [val, setVal] = useState(15);
  const [target, setTarget] = useState(12);

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Floyd's Shortest Path Odometer</div>
       <div className={styles.pipelineFlex}>
          <div className={styles.odometer}>
             <div className={styles.odoDigit}>{Math.floor(val / 10)}</div>
             <div className={styles.odoDigit}>{val % 10}</div>
          </div>
          <div className={styles.pipelineArrow}>➔</div>
          <div className={styles.odometer}>
             <div className={styles.odoDigit}>{Math.floor(target / 10)}</div>
             <div className={styles.odoDigit}>{target % 10}</div>
          </div>
       </div>
       <p className={styles.metaphorText} style={{ marginTop: '1.5rem' }}>
          Comparing $D[i,j]$ (current: {val}) with $D[i,k] + D[k,j]$ (potential: {target}). If the new path is shorter, the odometer "rolls back" to the smaller value.
       </p>
       <button className={styles.controlBtn} onClick={() => { setVal(target); setTarget(Math.floor(Math.random() * 10) + 5); }}>
          Perform Relaxation
       </button>
    </div>
  );
};

export const GreedyBuffetMetaphor = () => {
  const [plate, setPlate] = useState([]);
  const foods = [
    { icon: '🍗', val: 10, fill: 30 },
    { icon: '🍕', val: 8, fill: 20 },
    { icon: '🥗', val: 5, fill: 10 },
    { icon: '🍰', val: 12, fill: 25 },
    { icon: '🍎', val: 3, fill: 5 }
  ];

  const totalFill = plate.reduce((acc, f) => acc + f.fill, 0);

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Greedy Buffet: Maximize Happiness!</div>
       <div className={styles.buffetTable}>
          {foods.map((f, i) => (
            <div 
              key={i} 
              className={styles.foodItem} 
              onClick={() => totalFill + f.fill <= 100 && setPlate([...plate, f])}
            >
              {f.icon}
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>+{f.val} 😊</div>
           </div>
          ))}
       </div>
       <div className={styles.peasantResult}>
          Plate Status: <span className={styles.finalSum}>{totalFill}% Full</span>
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '1rem' }}>
             {plate.map((f, i) => <span key={i} style={{ fontSize: '1.5rem' }}>{f.icon}</span>)}
             {plate.length === 0 && <span style={{ color: 'var(--text-muted)' }}>Empty plate...</span>}
          </div>
       </div>
       <p className={styles.metaphorNote}>
          Greedy selection: always pick the food that gives the highest "happiness" (value) that still fits on your plate.
       </p>
    </div>
  );
};

export const MstNetwork = () => {
  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Minimum Spanning Tree: Outpost Network</div>
       <svg width="300" height="200" viewBox="0 0 300 200" style={{ background: '#f8fafc', borderRadius: '8px' }}>
          {/* Edges */}
          <line x1="50" y1="50" x2="150" y2="50" className={styles.mstEdgeActive} />
          <line x1="150" y1="50" x2="250" y2="100" className={styles.mstEdge} strokeDasharray="4" />
          <line x1="50" y1="50" x2="100" y2="150" className={styles.mstEdgeActive} />
          <line x1="150" y1="50" x2="100" y2="150" className={styles.mstEdge} />
          <line x1="100" y1="150" x2="250" y2="100" className={styles.mstEdgeActive} />
          
          {/* Nodes */}
          <circle cx="50" cy="50" r="15" fill="var(--accent-blue)" />
          <circle cx="150" cy="50" r="15" fill="var(--accent-blue)" />
          <circle cx="250" cy="100" r="15" fill="var(--accent-blue)" />
          <circle cx="100" cy="150" r="15" fill="var(--accent-blue)" />
          
          <text x="50" y="55" textAnchor="middle" fill="white" fontSize="10">A</text>
          <text x="150" y="55" textAnchor="middle" fill="white" fontSize="10">B</text>
          <text x="250" y="105" textAnchor="middle" fill="white" fontSize="10">C</text>
          <text x="100" y="155" textAnchor="middle" fill="white" fontSize="10">D</text>
       </svg>
       <div className={styles.peasantResult}>
          Network Connected! Total Cost: <span className={styles.finalSum}>14 units</span>
       </div>
    </div>
  );
};

export const PrimsSolver = () => {
  const [visited, setVisited] = useState(['A']);
  const vertices = ['A', 'B', 'C', 'D'];
  const candidates = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 8 },
    { from: 'B', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 6 },
    { from: 'C', to: 'D', weight: 5 }
  ];

  const currentCandidates = candidates.filter(c => 
    (visited.includes(c.from) && !visited.includes(c.to)) || 
    (visited.includes(c.to) && !visited.includes(c.from))
  ).sort((a, b) => a.weight - b.weight);

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Prim's: Nearest Neighbor Search</div>
       <div className={styles.tableContainer}>
          <table className={styles.dijkstraTable}>
             <thead>
                <tr>
                   <th>Unvisited</th>
                   <th>Shortest Edge from Tree</th>
                   <th>Action</th>
                </tr>
             </thead>
             <tbody>
                {vertices.filter(v => !visited.includes(v)).map(v => {
                  const bestEdge = candidates.find(c => 
                    (visited.includes(c.from) && c.to === v) || 
                    (visited.includes(c.to) && c.from === v)
                  );
                  return (
                    <tr key={v}>
                       <td>{v}</td>
                       <td>{bestEdge ? `${bestEdge.weight} (via ${bestEdge.from === v ? bestEdge.to : bestEdge.from})` : '∞'}</td>
                       <td>
                          {bestEdge && bestEdge === currentCandidates[0] && (
                            <button className={styles.controlBtn} onClick={() => setVisited([...visited, v])}>
                               Add to Tree
                            </button>
                          )}
                       </td>
                    </tr>
                  );
                })}
             </tbody>
          </table>
       </div>
       <p className={styles.metaphorText} style={{ marginTop: '1rem' }}>
          Prim's builds the tree by always picking the <b>smallest edge</b> that connects an "outside" vertex to the current tree.
       </p>
       <button className={styles.controlBtn} onClick={() => setVisited(['A'])}>Reset</button>
    </div>
  );
};

export const KruskalsSolver = () => {
  const [edges, setEdges] = useState([]);
  const [error, setError] = useState(false);
  const allEdges = [
    { id: 1, u: 'A', v: 'B', w: 1 },
    { id: 2, u: 'B', v: 'C', w: 2 },
    { id: 3, u: 'A', v: 'C', w: 3 },
    { id: 4, u: 'C', v: 'D', w: 4 }
  ].sort((a, b) => a.w - b.w);

  const addEdge = (e) => {
    // Basic cycle detection mock: A-B-C forms a cycle
    if (edges.length === 2 && e.id === 3) {
      setError(true);
      setTimeout(() => setError(false), 1000);
      return;
    }
    setEdges([...edges, e]);
  };

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Kruskal's: Global Edge Sort</div>
       <div className={styles.pipelineFlex}>
          {allEdges.map(e => (
            <div 
              key={e.id} 
              className={`${styles.conceptBox} ${edges.includes(e) ? styles.active : ''} ${error && e.id === 3 ? styles.shatter : ''}`}
              style={{ minWidth: '60px', cursor: 'pointer', opacity: edges.includes(e) ? 0.5 : 1 }}
              onClick={() => !edges.includes(e) && addEdge(e)}
            >
               <div className={styles.scoreValue}>{e.u}-{e.v}</div>
               <div className={styles.scoreLabel}>w={e.w}</div>
            </div>
          ))}
       </div>
       <div className={styles.peasantResult}>
          {error ? <span style={{ color: 'var(--color-error)' }}>CYCLE DETECTED! REJECTED.</span> : 'Pick the next smallest edge.'}
       </div>
       <p className={styles.metaphorNote}>
          Kruskal's treats the graph as a <b>forest</b>. We merge islands by adding edges in increasing order of weight, as long as they don't form a cycle.
       </p>
    </div>
  );
};

export const DijkstraRoadmap = () => {
  const [current, setCurrent] = useState('A');
  const [dist, setDist] = useState({ A: 0, B: Infinity, C: Infinity, D: Infinity });
  
  const neighbors = {
    A: [{ n: 'B', w: 5 }, { n: 'C', w: 10 }],
    B: [{ n: 'C', w: 2 }, { n: 'D', w: 10 }],
    C: [{ n: 'D', w: 3 }],
    D: []
  };

  const update = (neighbor, weight) => {
    const newDist = dist[current] + weight;
    if (newDist < dist[neighbor]) {
      setDist({ ...dist, [neighbor]: newDist });
    }
  };

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Dijkstra Roadmap Scanner</div>
       <div className={styles.tableContainer}>
          <table className={styles.dijkstraTable}>
             <thead>
                <tr>
                   <th>Vertex</th>
                   <th>Shortest Distance</th>
                   <th>Current?</th>
                </tr>
             </thead>
             <tbody>
                {Object.keys(dist).map(v => (
                  <tr key={v} className={current === v ? styles.currentVertex : ''}>
                     <td>{v}</td>
                     <td>{dist[v] === Infinity ? '∞' : dist[v]}</td>
                     <td>{current === v ? '🔍' : ''}</td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
       <div className={styles.controls} style={{ marginTop: '1rem' }}>
          {neighbors[current].map(nb => (
            <button key={nb.n} className={styles.controlBtn} onClick={() => update(nb.n, nb.w)}>
               Scan path to {nb.n} (+{nb.w})
            </button>
          ))}
          <button className={styles.controlBtn} style={{ background: 'var(--accent-blue)', color: 'white' }} 
                  onClick={() => setCurrent(Object.keys(dist).find(v => v !== current && dist[v] !== Infinity) || 'A')}>
             Move to next closest
          </button>
       </div>
    </div>
  );
};

export const HuffmanMachine = () => {
  const [step, setStep] = useState(0);

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Huffman Tree Machine</div>
       <div className={styles.pipelineFlex}>
          <div className={styles.conceptBox}>
             <div className={styles.pillarTitle}>Nodes</div>
             <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <div className={styles.rotNode} style={{ background: step > 0 ? 'var(--border-subtle)' : '' }}>A:5</div>
                <div className={styles.rotNode} style={{ background: step > 0 ? 'var(--border-subtle)' : '' }}>B:2</div>
                {step > 0 && <div className={styles.rotNode} style={{ border: '2px solid var(--accent-green)' }}>AB:7</div>}
             </div>
          </div>
          <div className={styles.pipelineArrow}>➔</div>
          <div className={styles.conceptBox}>
             <div className={styles.pillarTitle}>Encoding</div>
             <div className={styles.codeBlock}>
                A: {step > 0 ? '0' : '?'}<br/>
                B: {step > 0 ? '1' : '?'}
             </div>
          </div>
       </div>
       <button className={styles.controlBtn} onClick={() => setStep(prev => (prev + 1) % 2)} style={{ marginTop: '1rem' }}>
          {step === 0 ? 'Merge Lowest Frequencies' : 'Reset'}
       </button>
    </div>
  );
};

export const HuffmanMetaphor = () => {
  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Huffman Encoding (Compression)</div>
       <div className={styles.huffmanGrid}>
          <div className={styles.huffmanBox}>
             <div className={styles.pillarTitle}>Fixed Length</div>
             <div className={styles.codeBlock}>A: 00, B: 01, C: 10, D: 11</div>
             <p className={styles.metaphorText}>Always 2 bits per char.</p>
          </div>
          <div className={styles.huffmanBox}>
             <div className={styles.pillarTitle}>Variable Length</div>
             <div className={styles.codeBlock}>A: 0, B: 10, C: 110, D: 111</div>
             <p className={styles.metaphorText}>Frequent chars (A) get shorter codes!</p>
          </div>
       </div>
    </div>
  );
};
