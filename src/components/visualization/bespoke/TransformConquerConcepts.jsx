import React, { useState, useEffect, useMemo } from 'react';
import MathBlock from '../../ui/Premium/MathBlock';
import styles from './Bespoke.module.css';

export const TransformationPipeline = ({ style }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((s) => (s + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.metaphorContainer} style={style}>
      <div className={styles.metaphorLabel}>The Transformation Pipeline</div>
      <div className={styles.pipelineFlex}>
        <div className={`${styles.pipelineCard} ${stage === 0 ? styles.active : ''}`}>
          <div className={styles.puzzleIcon}>{stage === 0 ? '🧩' : '✅'}</div>
          <div className={styles.pipelineTitle}>Raw Problem</div>
          <div className={styles.pipelineText}>Difficult Instance</div>
          {stage === 0 && <div className={styles.pulsePoint} style={{ position: 'absolute', top: '10px', right: '10px' }} />}
        </div>
        <div className={styles.pipelineArrow}>➔</div>
        <div className={`${styles.pipelineCard} ${stage === 1 ? styles.active : ''}`}>
          <div className={styles.puzzleIcon}>{stage === 1 ? '⚙️' : (stage > 1 ? '✅' : '⏳')}</div>
          <div className={styles.pipelineTitle}>Transformation</div>
          <div className={styles.pipelineText}>Sorting / Mapping</div>
          {stage === 1 && <div className={styles.animateLine} style={{ position: 'absolute', inset: 0, border: '2px solid var(--accent-blue)', borderRadius: 'var(--radius-md)' }} />}
        </div>
        <div className={styles.pipelineArrow}>➔</div>
        <div className={`${styles.pipelineCard} ${stage === 2 ? styles.active : ''}`}>
          <div className={styles.puzzleIcon}>{stage === 2 ? '💡' : '⏳'}</div>
          <div className={styles.pipelineTitle}>Solved Instance</div>
          <div className={styles.pipelineText}>Simple Solution</div>
        </div>
      </div>
      <p className={styles.metaphorNote}>
        {stage === 0 && "Step 1: Identify a problem instance that is hard to solve in its current state (e.g., Finding duplicates)."}
        {stage === 1 && "Step 2: Transform it into a form that has better properties (e.g., Presorting the list)."}
        {stage === 2 && "Step 3: Solve the transformed instance efficiently (the 'Conquering' stage)."}
      </p>
    </div>
  );
};

export const PresortingVisual = ({ style }) => {
  const [isSorted, setIsSorted] = useState(false);
  const unsorted = [7, 2, 9, 3, 1, 8];
  const sorted = [...unsorted].sort((a, b) => a - b);
  const current = isSorted ? sorted : unsorted;

  return (
    <div className={styles.conceptBox} style={style}>
      <div className={styles.conceptTitle}>Presorting Metaphor</div>
      <div className={styles.gridTwoCol}>
        <div className={styles.caseBox}>
          <h4 className={styles.boxHeader}>Shelf State</h4>
          <div className={styles.shelfVisual}>
            {current.map((v, i) => (
              <div 
                key={v} 
                className={styles.book} 
                style={{ 
                  height: `${30 + v * 6}px`, 
                  backgroundColor: isSorted ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  order: isSorted ? sorted.indexOf(v) : unsorted.indexOf(v)
                }}
              >
                {v}
              </div>
            ))}
          </div>
          <button 
            className={styles.controlBtn} 
            onClick={() => setIsSorted(!isSorted)}
          >
            {isSorted ? 'Reset' : 'Apply Presorting'}
          </button>
        </div>
        <div className={styles.infoCard} style={{ background: 'transparent', border: 'none' }}>
           <h4 className={styles.boxHeader}>{isSorted ? 'Optimized' : 'Raw'} Complexity</h4>
           <p className={styles.boxText}>
             {isSorted 
               ? 'With a sorted shelf, searching for a book becomes a Logarithmic Binary Search.' 
               : 'On a messy shelf, searching for a specific book requires a Linear O(n) scan.'}
           </p>
           <MathBlock math={isSorted ? "O(\\log n)" : "O(n)"} />
        </div>
      </div>
    </div>
  );
};

export const UniquenessMatrix = ({ style }) => {
  return (
    <div className={styles.conceptBox} style={style}>
      <div className={styles.conceptTitle}>Brute Force: Pairwise Matrix</div>
      <div className={styles.matrixVisual}>
        {Array.from({ length: 5 }).map((_, r) => (
          <div key={r} className={styles.matrixRow}>
            {Array.from({ length: 5 }).map((_, c) => (
              <div
                key={c}
                className={`${styles.matrixCell} ${c > r ? styles.checked : styles.empty}`}
                style={{ 
                  backgroundColor: c > r ? 'rgba(239, 68, 68, 0.2)' : (r === c ? 'rgba(148, 163, 184, 0.1)' : 'transparent'),
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {c > r ? '✕' : (r === c ? '—' : '')}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.formulaOverlay}>
        <MathBlock math="\frac{n(n-1)}{2} \approx \Theta(n^2)" />
        <p className={styles.metaphorNote}>Every element compared with every other element (Upper Triangle).</p>
      </div>
    </div>
  );
};

export const SortScanVisual = ({ style }) => {
  const [index, setIndex] = useState(0);
  const elements = [1, 2, 4, 7, 7, 9, 10];
  const isMatch = elements[index] === elements[index + 1];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % (elements.length - 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.conceptBox} style={style}>
      <div className={styles.conceptTitle}>Presorting: Neighbor Scan</div>
      <div className={styles.scanVisual}>
        <div className={styles.raceArray}>
          {elements.map((v, i) => (
            <div
              key={i}
              className={`${styles.raceCell} ${i === index || i === index + 1 ? styles.active : ''} ${isMatch && (i === index || i === index + 1) ? styles.shatter : ''}`}
              style={{ backgroundColor: isMatch && (i === index || i === index + 1) ? 'rgba(239, 68, 68, 0.2)' : '' }}
            >
              {v}
            </div>
          ))}
        </div>
        <div className={styles.scanPointers}>
          <div className={styles.pointer} style={{ left: `${index * 36 + 10}px` }}>↑</div>
          <div className={styles.pointer} style={{ left: `${(index + 1) * 36 + 10}px` }}>↑</div>
        </div>
      </div>
      <div className={styles.formulaOverlay}>
        <MathBlock math="\Theta(n \log n) + \Theta(n) = \Theta(n \log n)" />
        <p className={styles.metaphorNote}>
          {isMatch ? "DUPLICATE FOUND! Adjacent elements are equal." : "Scanning neighbors..."}
        </p>
      </div>
    </div>
  );
};

export const BstGrowthTracer = ({ style }) => {
  const [step, setStep] = useState(0);
  const nodes = [
    { id: '30', x: 100, y: 30, visible: true, rule: "Root: 30" },
    { id: '20', x: 60, y: 70, visible: false, rule: "20 < 30: Go Left" },
    { id: '40', x: 140, y: 70, visible: false, rule: "40 > 30: Go Right" },
    { id: '10', x: 30, y: 110, visible: false, rule: "10 < 30, 10 < 20: Go Left" },
    { id: '25', x: 90, y: 110, visible: false, rule: "25 < 30, 25 > 20: Go Right" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (nodes.length + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.traversalContainer} style={style}>
      <div className={styles.metaphorLabel}>BST Insertion Trace</div>
      <div className={styles.gridTwoCol}>
        <svg className={styles.traversalSvg} viewBox="0 0 200 150">
          {step > 1 && <line x1="100" y1="30" x2="60" y2="70" className={styles.treeLink} />}
          {step > 2 && <line x1="100" y1="30" x2="140" y2="70" className={styles.treeLink} />}
          {step > 3 && <line x1="60" y1="70" x2="30" y2="110" className={styles.treeLink} />}
          {step > 4 && <line x1="60" y1="70" x2="90" y2="110" className={styles.treeLink} />}
          
          {nodes.map((n, i) => (
            <g key={n.id} className={i < step ? styles.activeNode : styles.hidden}>
              <circle cx={n.x} cy={n.y} r="12" className={`${styles.nodeCircle} ${i === step - 1 ? styles.activeNode : ''}`} />
              <text x={n.x} y={n.y + 4} textAnchor="middle" className={styles.nodeLabel} fill={i === step - 1 ? 'white' : 'var(--text-primary)'}>
                {n.id}
              </text>
            </g>
          ))}
        </svg>
        <div className={styles.infoCard}>
           <h4 className={styles.boxHeader}>Insertion Rules</h4>
           <div className={styles.stepInfo} style={{ textAlign: 'left', minHeight: '100px' }}>
              {nodes.slice(0, step).map((n, i) => (
                <div key={i} className={styles.greedyStep} style={{ marginBottom: '4px', opacity: i === step - 1 ? 1 : 0.6 }}>
                  {n.rule}
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export const AvlSelfCorrection = ({ style }) => {
  const [state, setState] = useState(0); // 0: Balanced, 1: Imbalanced, 2: Fixed

  useEffect(() => {
    const timer = setInterval(() => {
      setState((s) => (s + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.conceptBox} style={style}>
      <div className={styles.conceptTitle}>AVL Self-Correction</div>
      <div className={styles.rotationStage}>
         <div className={styles.rotationFlex} style={{ 
           transform: state === 1 ? 'rotate(15deg)' : 'rotate(0deg)',
           transition: 'transform 0.5s ease-in-out'
         }}>
            <div className={styles.rotHalf}>
               <div className={`${styles.rotNode} ${state === 1 ? styles.shatter : ''}`} style={{ 
                 marginLeft: state === 2 ? '20px' : '40px',
                 borderColor: state === 1 ? 'var(--color-error)' : 'var(--accent-blue)'
               }}>
                 {state === 2 ? '20' : '30'}
                 {state === 1 && <div className={styles.popOrderText} style={{ position: 'absolute', top: '-20px' }}>⚠️ BF=+2</div>}
               </div>
               <div className={styles.rotRow}>
                  <div className={styles.rotNode} style={{ 
                    marginLeft: state === 2 ? '0' : '-20px',
                    borderColor: state === 1 ? 'var(--color-error)' : 'var(--accent-blue)'
                  }}>
                    {state === 2 ? '10' : '20'}
                  </div>
                  {state === 2 && <div className={styles.rotNode}>30</div>}
               </div>
               {state < 2 && <div className={styles.rotNode} style={{ marginLeft: '-40px' }}>10</div>}
            </div>
         </div>
      </div>
      <p className={styles.metaphorNote}>
        {state === 0 && "Perfectly balanced BST."}
        {state === 1 && "Insert 10: The tree 'tilts' as Left side height grows too much."}
        {state === 2 && "LL Rotation: Tree snaps back to balance!"}
      </p>
    </div>
  );
};

export const AvlBalanceMeter = ({ style }) => {
  return (
    <div className={styles.metaphorContainer} style={style}>
      <div className={styles.metaphorLabel}>AVL Balance Meter</div>
      <div className={styles.flexRow} style={{ gap: '2rem', justifyContent: 'center' }}>
        <div className={styles.trafficLight}>
          <div className={`${styles.light} ${styles.green}`}>0</div>
          <div className={`${styles.light} ${styles.green}`}>±1</div>
          <p className={styles.metaphorNote}>SAFE</p>
        </div>
        <div className={styles.trafficLight}>
          <div className={`${styles.light} ${styles.red}`}>±2</div>
          <p className={styles.metaphorNote}>REBALANCE!</p>
        </div>
        <div className={styles.infoCard} style={{ textAlign: 'left' }}>
          <MathBlock math="BF = h_L - h_R" />
          <p className={styles.boxText}>The "Height Invariant" that ensures O(log n) search.</p>
        </div>
      </div>
    </div>
  );
};

export const BespokeAvlRotations = ({ style }) => {
  const [type, setType] = useState('LL');

  return (
    <div className={styles.traversalContainer} style={style}>
      <div className={styles.traversalControls}>
        {['LL', 'RR', 'LR', 'RL'].map((t) => (
          <button key={t} className={`${styles.traversalBtn} ${type === t ? styles.active : ''}`} onClick={() => setType(t)}>
            {t} Rotation
          </button>
        ))}
      </div>
      <div className={styles.rotationStage}>
        {type === 'LL' && (
          <div className={styles.rotationFlex}>
            <div className={styles.rotHalf}>
              <div className={styles.rotNode} style={{ marginLeft: '40px' }}>30 <small>(+2)</small></div>
              <div className={styles.rotNode} style={{ marginLeft: '20px' }}>20 <small>(+1)</small></div>
              <div className={styles.rotNode}>10</div>
              <div className={styles.rotLabel}>Left-Left Heavy</div>
            </div>
            <div className={styles.rotArrow}>➔</div>
            <div className={styles.rotHalf}>
              <div className={styles.rotNode} style={{ marginLeft: '20px' }}>20</div>
              <div className={styles.rotRow}>
                <div className={styles.rotNode}>10</div>
                <div className={styles.rotNode}>30</div>
              </div>
              <div className={styles.rotLabel}>After LL Rotation</div>
            </div>
          </div>
        )}
        {type === 'RR' && (
          <div className={styles.rotationFlex}>
            <div className={styles.rotHalf}>
              <div className={styles.rotNode}>10 <small>(-2)</small></div>
              <div className={styles.rotNode} style={{ marginLeft: '20px' }}>20 <small>(-1)</small></div>
              <div className={styles.rotNode} style={{ marginLeft: '40px' }}>30</div>
              <div className={styles.rotLabel}>Right-Right Heavy</div>
            </div>
            <div className={styles.rotArrow}>➔</div>
            <div className={styles.rotHalf}>
              <div className={styles.rotNode} style={{ marginLeft: '20px' }}>20</div>
              <div className={styles.rotRow}>
                <div className={styles.rotNode}>10</div>
                <div className={styles.rotNode}>30</div>
              </div>
              <div className={styles.rotLabel}>After RR Rotation</div>
            </div>
          </div>
        )}
        {type === 'LR' && (
          <div className={styles.rotationFlex}>
            <div className={styles.rotHalf}>
              <div className={styles.rotNode} style={{ marginLeft: '40px' }}>30</div>
              <div className={styles.rotNode}>10</div>
              <div className={styles.rotNode} style={{ marginLeft: '20px' }}>20</div>
              <div className={styles.rotLabel}>Zig-Zag (LR)</div>
            </div>
            <div className={styles.rotArrow}>➔</div>
            <div className={styles.rotHalf}>
              <div className={styles.rotNode} style={{ marginLeft: '20px' }}>20</div>
              <div className={styles.rotRow}>
                <div className={styles.rotNode}>10</div>
                <div className={styles.rotNode}>30</div>
              </div>
              <div className={styles.rotLabel}>After LR Double Rotation</div>
            </div>
          </div>
        )}
        {type === 'RL' && (
          <div className={styles.rotationFlex}>
            <div className={styles.rotHalf}>
              <div className={styles.rotNode}>10</div>
              <div className={styles.rotNode} style={{ marginLeft: '40px' }}>30</div>
              <div className={styles.rotNode} style={{ marginLeft: '20px' }}>20</div>
              <div className={styles.rotLabel}>Zag-Zig (RL)</div>
            </div>
            <div className={styles.rotArrow}>➔</div>
            <div className={styles.rotHalf}>
              <div className={styles.rotNode} style={{ marginLeft: '20px' }}>20</div>
              <div className={styles.rotRow}>
                <div className={styles.rotNode}>10</div>
                <div className={styles.rotNode}>30</div>
              </div>
              <div className={styles.rotLabel}>After RL Double Rotation</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const TwoThreeTreeNode = ({ style }) => {
  return (
    <div className={styles.gridTwoCol} style={style}>
      <div className={styles.caseBox} style={{ background: 'rgba(59, 130, 246, 0.05)' }}>
        <h4 className={styles.boxHeader}>2-Node</h4>
        <div className={styles.rotNode}>K</div>
        <div className={styles.rotRow} style={{ marginTop: '0.5rem' }}>
          <div className={styles.rotNode} style={{ fontSize: '8px', opacity: 0.5, background: 'rgba(59, 130, 246, 0.2)' }}>{'< K'}</div>
          <div className={styles.rotNode} style={{ fontSize: '8px', opacity: 0.5, background: 'rgba(59, 130, 246, 0.2)' }}>{'> K'}</div>
        </div>
        <p className={styles.metaphorNote}>1 Data Key, 2 Child Regions</p>
      </div>
      <div className={styles.caseBox} style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
        <h4 className={styles.boxHeader}>3-Node</h4>
        <div className={styles.nodePill} style={{ background: 'var(--color-success)', color: 'white', borderColor: 'var(--color-success)' }}>K1 | K2</div>
        <div className={styles.rotRow} style={{ marginTop: '0.5rem' }}>
          <div className={styles.rotNode} style={{ fontSize: '8px', opacity: 0.5, background: 'rgba(16, 185, 129, 0.2)' }}>{'< K1'}</div>
          <div className={styles.rotNode} style={{ fontSize: '8px', opacity: 0.5, background: 'rgba(16, 185, 129, 0.2)' }}>{'Between'}</div>
          <div className={styles.rotNode} style={{ fontSize: '8px', opacity: 0.5, background: 'rgba(16, 185, 129, 0.2)' }}>{'> K2'}</div>
        </div>
        <p className={styles.metaphorNote}>2 Data Keys, 3 Child Regions</p>
      </div>
    </div>
  );
};

export const HeapIntroduction = ({ style }) => {
  return (
    <div className={styles.gridTwoCol} style={style}>
      <div className={styles.caseBox}>
        <h4 className={styles.boxHeader}>Valid Max-Heap</h4>
        <svg viewBox="0 0 100 60" style={{ width: '100px' }}>
          <circle cx="50" cy="10" r="6" fill="var(--color-success)" />
          <text x="50" y="14" textAnchor="middle" fontSize="10" fill="white">99</text>
          <line x1="50" y1="10" x2="30" y2="30" stroke="var(--border-subtle)" />
          <line x1="50" y1="10" x2="70" y2="30" stroke="var(--border-subtle)" />
          <circle cx="30" cy="30" r="6" fill="var(--color-success)" />
          <text x="30" y="34" textAnchor="middle" fontSize="10" fill="white">70</text>
          <circle cx="70" cy="30" r="6" fill="var(--color-success)" />
          <text x="70" y="34" textAnchor="middle" fontSize="10" fill="white">80</text>
        </svg>
        <div className={styles.quizBadge} style={{ background: 'var(--color-success)' }}>Parent {'>'} Child</div>
      </div>
      <div className={styles.caseBox}>
        <h4 className={styles.boxHeader}>Heap Violation</h4>
        <svg viewBox="0 0 100 60" style={{ width: '100px' }}>
          <circle cx="50" cy="10" r="6" fill="var(--color-error)" />
          <text x="50" y="14" textAnchor="middle" fontSize="10" fill="white">50</text>
          <line x1="50" y1="10" x2="30" y2="30" stroke="var(--border-subtle)" />
          <line x1="50" y1="10" x2="70" y2="30" stroke="var(--border-subtle)" />
          <circle cx="30" cy="30" r="6" fill="var(--color-error)" />
          <text x="30" y="34" textAnchor="middle" fontSize="10" fill="white">80</text>
          <circle cx="70" cy="30" r="6" fill="var(--color-success)" />
          <text x="70" y="34" textAnchor="middle" fontSize="10" fill="white">40</text>
        </svg>
        <div className={styles.quizBadge} style={{ background: 'var(--color-error)' }}>80 {'>'} 50 (Violation!)</div>
      </div>
    </div>
  );
};

export const BottomUpHeapifyTracer = ({ style }) => {
  const [step, setStep] = useState(0);
  const data = [20, 50, 80, 10, 30, 70, 40];
  const lastParent = Math.floor(data.length / 2) - 1; // Index 2 (value 80)

  return (
    <div className={styles.conceptBox} style={style}>
      <div className={styles.conceptTitle}>Bottom-Up Heapify (O(n))</div>
      <div className={styles.heapGrid}>
        <div className={styles.heapArrayWrapper}>
           <div className={styles.raceArray}>
              {data.map((v, i) => (
                <div 
                  key={i} 
                  className={`${styles.raceCell} ${i === lastParent - step ? styles.active : ''} ${i > lastParent - step ? styles.mergeCell : ''}`}
                  style={{ backgroundColor: i >= lastParent - step ? 'rgba(16, 185, 129, 0.1)' : '' }}
                >
                  {v}
                </div>
              ))}
           </div>
           <p className={styles.metaphorNote}>Starting from index {lastParent - step} and moving upwards.</p>
        </div>
      </div>
      <button className={styles.controlBtn} onClick={() => setStep((s) => (s + 1) % (lastParent + 1))}>Next Parent Node</button>
    </div>
  );
};

export const TopDownHeapTracer = ({ style }) => {
  const [elements, setElements] = useState([100]);
  const pool = [80, 120, 60, 150];

  const addElement = () => {
    if (elements.length < 5) {
      setElements([...elements, pool[elements.length - 1]]);
    } else {
      setElements([100]);
    }
  };

  return (
    <div className={styles.conceptBox} style={style}>
      <div className={styles.conceptTitle}>Top-Down (O(n log n))</div>
      <div className={styles.raceLane}>
        <div className={styles.raceArray}>
          {elements.map((v, i) => (
            <div key={i} className={`${styles.raceCell} ${i === elements.length - 1 ? styles.active : ''}`}>
              {v}
              {i === elements.length - 1 && elements.length > 1 && <div className={styles.popOrderText} style={{ position: 'absolute', bottom: '-15px' }}>Bubble Up!</div>}
            </div>
          ))}
        </div>
      </div>
      <button className={styles.controlBtn} onClick={addElement}>Insert Next Element</button>
      <p className={styles.metaphorNote}>Each insertion takes O(log n) as it bubbles up.</p>
    </div>
  );
};

export const HeapSortFactory = ({ style }) => {
  return (
    <div className={styles.metaphorContainer} style={style}>
      <div className={styles.metaphorLabel}>Heapsort Production Line</div>
      <div className={styles.pipelineFlex}>
        <div className={styles.pipelineCard}>
          <div className={styles.puzzleIcon}>📦</div>
          <div className={styles.pipelineTitle}>Raw Array</div>
          <div className={styles.pipelineText}>Unsorted Input</div>
        </div>
        <div className={styles.pipelineArrow}>➔</div>
        <div className={styles.pipelineCard} style={{ borderColor: 'var(--accent-blue)' }}>
          <div className={styles.puzzleIcon}>📐</div>
          <div className={styles.pipelineTitle}>Heapify</div>
          <div className={styles.pipelineText}>Transform to Heap</div>
        </div>
        <div className={styles.pipelineArrow}>➔</div>
        <div className={styles.pipelineCard} style={{ borderColor: 'var(--accent-purple)' }}>
          <div className={styles.puzzleIcon}>🏗️</div>
          <div className={styles.pipelineTitle}>Extraction</div>
          <div className={styles.pipelineText}>Pop Root & Fix</div>
        </div>
        <div className={styles.pipelineArrow}>➔</div>
        <div className={styles.pipelineCard} style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--color-success)' }}>
          <div className={styles.puzzleIcon}>✨</div>
          <div className={styles.pipelineTitle}>Sorted List</div>
          <div className={styles.pipelineText}>Final Result</div>
        </div>
      </div>
    </div>
  );
};

// Aliases for compatibility with Lec10.jsx while maintaining the "massive list" names
export const PresortingShelf = PresortingVisual;
export const ElementUniquenessMatrix = UniquenessMatrix;
export const ElementUniquenessScan = SortScanVisual;
export const BstGrowth = BstGrowthTracer;
export const AvlTrafficLight = AvlBalanceMeter;
export const AvlRotations = BespokeAvlRotations;
export const HeapQuiz = HeapIntroduction;
export const HeapConstructionBottomUp = BottomUpHeapifyTracer;
export const HeapConstructionTopDown = TopDownHeapTracer;

// Existing components from original file that weren't specifically requested to be updated but are used in Lec10
export const BstComparisonTable = ({ style }) => {
  return (
    <div className={styles.peasantContainer} style={style}>
      <table className={styles.peasantTable}>
        <thead>
          <tr>
            <th>Structure</th>
            <th>Search (Avg)</th>
            <th>Search (Worst)</th>
            <th>Insert</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unsorted Array</td>
            <td>O(n)</td>
            <td>O(n)</td>
            <td>O(1)</td>
          </tr>
          <tr className={styles.rowOdd}>
            <td>Sorted Array</td>
            <td>O(log n)</td>
            <td>O(log n)</td>
            <td>O(n)</td>
          </tr>
          <tr>
            <td>Linked List</td>
            <td>O(n)</td>
            <td>O(n)</td>
            <td>O(1)</td>
          </tr>
          <tr className={styles.rowOdd} style={{ borderLeft: '4px solid var(--accent-blue)' }}>
            <td><b>BST / AVL</b></td>
            <td><b>O(log n)</b></td>
            <td><b>O(log n)*</b></td>
            <td><b>O(log n)</b></td>
          </tr>
        </tbody>
      </table>
      <p className={styles.metaphorNote}>*Standard BST can degrade to O(n) if skewed; AVL prevents this.</p>
    </div>
  );
};

export const BstBalanceScale = ({ style }) => {
  return (
    <div className={styles.gridTwoCol} style={style}>
      <div className={styles.caseBox}>
        <div className={styles.conceptTitle}>Balanced Tree</div>
        <svg viewBox="0 0 100 60" style={{ width: '120px' }}>
          <circle cx="50" cy="10" r="5" fill="var(--accent-blue)" />
          <line x1="50" y1="10" x2="30" y2="30" stroke="var(--border-subtle)" />
          <line x1="50" y1="10" x2="70" y2="30" stroke="var(--border-subtle)" />
          <circle cx="30" cy="30" r="5" fill="var(--accent-blue)" />
          <circle cx="70" cy="30" r="5" fill="var(--accent-blue)" />
        </svg>
        <p className={styles.metaphorNote}>Height ≈ log₂(n)</p>
      </div>
      <div className={styles.caseBox}>
        <div className={styles.conceptTitle}>Skewed Tree</div>
        <svg viewBox="0 0 100 60" style={{ width: '120px' }}>
          <circle cx="20" cy="10" r="5" fill="var(--color-error)" />
          <line x1="20" y1="10" x2="40" y2="25" stroke="var(--border-subtle)" />
          <circle cx="40" cy="25" r="5" fill="var(--color-error)" />
          <line x1="40" y1="25" x2="60" y2="40" stroke="var(--border-subtle)" />
          <circle cx="60" cy="40" r="5" fill="var(--color-error)" />
        </svg>
        <p className={styles.metaphorNote}>Height ≈ n (Linear!)</p>
      </div>
    </div>
  );
};

export const TwoThreeInsertion = ({ style }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.metaphorContainer} style={style}>
      <div className={styles.metaphorLabel}>2-3 Tree Split Animation</div>
      <div className={styles.rotationFlex} style={{ minHeight: '120px' }}>
        {step === 0 && (
          <div className={styles.rotHalf}>
            <div className={styles.nodePill}>20 | 50</div>
            <div className={styles.rotLabel}>Full 3-node, adding 30</div>
          </div>
        )}
        {step === 1 && (
          <div className={styles.rotHalf}>
            <div className={styles.nodePill} style={{ backgroundColor: 'var(--color-error)', color: 'white' }}>20 | 30 | 50</div>
            <div className={styles.rotLabel}>Temporary 4-node (Overflow!)</div>
          </div>
        )}
        {step === 2 && (
          <div className={styles.rotHalf}>
             <div className={styles.rotNode}>30</div>
             <div className={styles.rotRow}>
                <div className={styles.rotNode}>20</div>
                <div className={styles.rotNode}>50</div>
             </div>
             <div className={styles.rotLabel}>Splits & 30 Promotes</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const HeapProperties = ({ style }) => {
  return (
    <div className={styles.gridTwoCol} style={style}>
      <div className={styles.caseBox}>
        <h4>1. Shape Property</h4>
        <div className={styles.shelfVisual} style={{ height: '60px' }}>
          {[1, 1, 1, 1, 0.5, 0].map((v, i) => (
            <div key={i} className={styles.book} style={{ height: '20px', opacity: v, background: 'var(--accent-blue)' }} />
          ))}
        </div>
        <p className={styles.metaphorNote}>Complete Binary Tree: Filled level-by-level, left-to-right.</p>
      </div>
      <div className={styles.caseBox}>
        <h4>2. Value Property</h4>
        <div className={styles.rotNode} style={{ background: 'var(--accent-blue)', color: 'white', width: '40px', height: '40px' }}>99</div>
        <div className={styles.rotArrow}>↓</div>
        <div className={styles.rotRow}>
          <div className={styles.rotNode} style={{ width: '30px', height: '30px' }}>≤ 99</div>
          <div className={styles.rotNode} style={{ width: '30px', height: '30px' }}>≤ 99</div>
        </div>
        <p className={styles.metaphorNote}>Max-Heap: Root is always the largest element.</p>
      </div>
    </div>
  );
};

export const HeapArrayMap = ({ style }) => {
  const [hoverIdx, setHoverIdx] = useState(null);
  const data = [100, 80, 90, 60, 50, 70, 40];

  return (
    <div className={styles.metaphorContainer} style={style}>
      <div className={styles.metaphorLabel}>Interactive Array Map</div>
      <div className={styles.heapGrid}>
        <div className={styles.heapTree}>
           <div className={styles.rotNode} onMouseEnter={() => setHoverIdx(0)} style={{ background: hoverIdx === 0 ? 'var(--accent-blue)' : '' }}>{data[0]}</div>
           <div className={styles.rotRow}>
              <div className={styles.rotNode} onMouseEnter={() => setHoverIdx(1)} style={{ background: hoverIdx === 1 ? 'var(--accent-blue)' : '' }}>{data[1]}</div>
              <div className={styles.rotNode} onMouseEnter={() => setHoverIdx(2)} style={{ background: hoverIdx === 2 ? 'var(--accent-blue)' : '' }}>{data[2]}</div>
           </div>
           <div className={styles.rotRow}>
              <div className={styles.rotNode} onMouseEnter={() => setHoverIdx(3)} style={{ background: hoverIdx === 3 ? 'var(--accent-blue)' : '' }}>{data[3]}</div>
              <div className={styles.rotNode} onMouseEnter={() => setHoverIdx(4)} style={{ background: hoverIdx === 4 ? 'var(--accent-blue)' : '' }}>{data[4]}</div>
              <div className={styles.rotNode} onMouseEnter={() => setHoverIdx(5)} style={{ background: hoverIdx === 5 ? 'var(--accent-blue)' : '' }}>{data[5]}</div>
              <div className={styles.rotNode} onMouseEnter={() => setHoverIdx(6)} style={{ background: hoverIdx === 6 ? 'var(--accent-blue)' : '' }}>{data[6]}</div>
           </div>
        </div>
        <div className={styles.heapArrayWrapper}>
           <div className={styles.raceArray}>
              {data.map((v, i) => (
                <div key={i} className={`${styles.raceCell} ${hoverIdx === i ? styles.active : ''}`} onMouseEnter={() => setHoverIdx(i)}>{v}</div>
              ))}
           </div>
           <div className={styles.arrayIndices}>
              {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className={styles.indexItem}>{i}</div>)}
           </div>
        </div>
      </div>
      <div className={styles.formulaOverlay}>
         <MathBlock math="Parent(i) = \lfloor i/2 \rfloor" />
         <MathBlock math="Children(i) = 2i, 2i+1" />
      </div>
    </div>
  );
};

export const HeapMaxDeletion = ({ style }) => {
  return (
    <div className={styles.conceptBox} style={style}>
      <div className={styles.conceptTitle}>Max Deletion Cycle</div>
      <div className={styles.flexRow} style={{ gap: '1rem', alignItems: 'center' }}>
        <div className={styles.rotNode} style={{ background: 'var(--accent-blue)', color: 'white' }}>1. Pop Root</div>
        <div className={styles.rotArrow}>➔</div>
        <div className={styles.rotNode}>2. Last → Root</div>
        <div className={styles.rotArrow}>➔</div>
        <div className={styles.rotNode} style={{ borderStyle: 'dashed' }}>3. Sift Down</div>
      </div>
    </div>
  );
};

export const HeapSortTimeline = ({ style }) => {
  return (
    <div className={styles.caseBox} style={{ width: '100%', ...style }}>
      <div className={styles.conceptTitle}>Time Complexity Breakdown</div>
      <div className={styles.progressBar} style={{ height: '30px', width: '100%' }}>
        <div className={styles.progressFill} style={{ width: '30%', backgroundColor: 'var(--text-muted)' }}>Build: O(n)</div>
        <div className={styles.progressFill} style={{ width: '70%', backgroundColor: 'var(--accent-blue)' }}>Extract: O(n log n)</div>
      </div>
      <MathBlock math="Total: O(n \log n)" />
    </div>
  );
};
