import React, { useState, useEffect } from 'react';
import styles from './Bespoke.module.css';

export const ParadigmMetaphor = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getLabel = () => {
    switch (step) {
      case 0: return "Original Problem (Huge Task)";
      case 1: return "Divide into Sub-tasks";
      case 2: return "Solve (Conquer) Small Pieces";
      case 3: return "Combine Partial Results";
      default: return "";
    }
  };

  return (
    <div className={styles.metaphorContainer}>
      <div className={styles.metaphorLabel}>{getLabel()}</div>
      <div className={styles.puzzleStage}>
        {step === 0 && (
          <div className={styles.paperStack}>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={styles.paperSheet} 
                style={{ transform: `translate(${i * 2}px, ${i * -2}px)` }}
              />
            ))}
            <div className={styles.paperLabel}>1000 Papers</div>
          </div>
        )}
        {step === 1 && (
          <div className={styles.paperGroups}>
            {[0, 1].map(g => (
              <div key={g} className={styles.paperStackSmall}>
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={styles.paperSheet} 
                    style={{ transform: `translate(${i * 1}px, ${i * -1}px)` }}
                  />
                ))}
                <div className={styles.paperLabelSmall}>500</div>
              </div>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className={styles.paperGroups}>
             {[0, 1, 2, 3].map(g => (
              <div key={g} className={styles.paperStackMini}>
                <div className={`${styles.paperSheet} ${styles.solvedPaper}`} />
                <div className={styles.paperLabelMini}>250</div>
                <div className={styles.checkMark}>✓</div>
              </div>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className={styles.paperStack}>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`${styles.paperSheet} ${styles.solvedPaper}`} 
                style={{ transform: `translate(${i * 2}px, ${i * -2}px)` }}
              />
            ))}
            <div className={styles.paperLabel}>Sorted Stack</div>
          </div>
        )}
      </div>
      <p className={styles.metaphorText}>
        {step === 0 && "Sorting 1000 exam papers is overwhelming. We need a strategy."}
        {step === 1 && "Split the stack into smaller piles. It's easier to handle 500 than 1000."}
        {step === 2 && "Continue splitting until piles are tiny. Sort those tiny piles instantly."}
        {step === 3 && "Merge the sorted piles back together. The original 1000 are now sorted."}
      </p>
    </div>
  );
};

export const MergeSortRecursiveTree = () => {
  return (
    <div className={styles.treeContainer}>
       <h4 className={styles.conceptTitle}>The Full Recursion Tree</h4>
       <svg viewBox="0 0 400 240" className={styles.recursiveTree}>
          {/* Level 0 */}
          <rect x="150" y="10" width="100" height="25" rx="4" className={styles.nodeBox} />
          <text x="200" y="27" textAnchor="middle" className={styles.nodeText}>[38, 27, 43, 3, 9]</text>
          
          <path d="M175 35 L100 60" className={styles.treeLink} />
          <path d="M225 35 L300 60" className={styles.treeLink} />

          {/* Level 1 */}
          <rect x="60" y="60" width="80" height="25" rx="4" className={styles.nodeBox} />
          <text x="100" y="77" textAnchor="middle" className={styles.nodeText}>[38, 27]</text>

          <rect x="260" y="60" width="80" height="25" rx="4" className={styles.nodeBox} />
          <text x="300" y="77" textAnchor="middle" className={styles.nodeText}>[43, 3, 9]</text>

          <path d="M80 85 L40 110" className={styles.treeLink} />
          <path d="M120 85 L160 110" className={styles.treeLink} />
          <path d="M280 85 L240 110" className={styles.treeLink} />
          <path d="M320 85 L360 110" className={styles.treeLink} />

          {/* Level 2 */}
          <rect x="15" y="110" width="50" height="25" rx="4" className={styles.leafBox} />
          <text x="40" y="127" textAnchor="middle" className={styles.nodeText}>[38]</text>

          <rect x="135" y="110" width="50" height="25" rx="4" className={styles.leafBox} />
          <text x="160" y="127" textAnchor="middle" className={styles.nodeText}>[27]</text>

          <rect x="215" y="110" width="50" height="25" rx="4" className={styles.leafBox} />
          <text x="240" y="127" textAnchor="middle" className={styles.nodeText}>[43]</text>

          <rect x="335" y="110" width="50" height="25" rx="4" className={styles.nodeBox} />
          <text x="360" y="127" textAnchor="middle" className={styles.nodeText}>[3, 9]</text>

          <path d="M345 135 L325 160" className={styles.treeLink} />
          <path d="M375 135 L395 160" className={styles.treeLink} />

          {/* Level 3 */}
          <rect x="300" y="160" width="50" height="25" rx="4" className={styles.leafBox} />
          <text x="325" y="177" textAnchor="middle" className={styles.nodeText}>[3]</text>

          <rect x="370" y="160" width="50" height="25" rx="4" className={styles.leafBox} />
          <text x="395" y="177" textAnchor="middle" className={styles.nodeText}>[9]</text>

          <circle cx="40" cy="122.5" r="15" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="160" cy="122.5" r="15" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="240" cy="122.5" r="15" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="325" cy="172.5" r="15" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="395" cy="172.5" r="15" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="2 2" />
       </svg>
       <div className={styles.treeLegend}>
          <div className={styles.legendItem}><span className={styles.legendColor} style={{background: 'var(--accent-blue)'}}></span> Divide Phase</div>
          <div className={styles.legendItem}><span className={styles.legendColor} style={{background: 'var(--accent-green)'}}></span> Base Case (Already Sorted)</div>
       </div>
    </div>
  );
};

export const MergeSortDivideVisual = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { 
      code: "mergeSort([38, 27, 43, 3, 9])",
      stack: ["mergeSort(0, 4)"],
      highlight: "root"
    },
    { 
      code: "mergeSort([38, 27])",
      stack: ["mergeSort(0, 4)", "mergeSort(0, 1)"],
      highlight: "left1"
    },
    { 
      code: "mergeSort([38])",
      stack: ["mergeSort(0, 4)", "mergeSort(0, 1)", "mergeSort(0, 0)"],
      highlight: "leaf1"
    },
    { 
      code: "return [38]",
      stack: ["mergeSort(0, 4)", "mergeSort(0, 1)"],
      highlight: "leaf1-done"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.divideConquerSync}>
      <div className={styles.syncGrid}>
        <div className={styles.syncPane}>
          <div className={styles.paneHeader}>Recursion Stack</div>
          <div className={styles.stackVisual}>
            {steps[step].stack.map((call, i) => (
              <div key={i} className={styles.stackFrame}>{call}</div>
            ))}
          </div>
        </div>
        <div className={styles.syncPane}>
           <div className={styles.paneHeader}>Visual Tree</div>
           <svg viewBox="0 0 200 120" className={styles.miniRecursiveTree}>
              <rect x="75" y="10" width="50" height="15" rx="2" className={`${styles.nodeBox} ${steps[step].highlight === 'root' ? styles.activeNode : ''}`} />
              <rect x="30" y="50" width="40" height="15" rx="2" className={`${styles.nodeBox} ${steps[step].highlight === 'left1' ? styles.activeNode : ''}`} />
              <rect x="10" y="90" width="30" height="15" rx="2" className={`${styles.leafBox} ${steps[step].highlight === 'leaf1' ? styles.activeNode : (steps[step].highlight === 'leaf1-done' ? styles.doneNode : '')}`} />
              
              <line x1="100" y1="25" x2="50" y2="50" stroke="var(--border-subtle)" strokeWidth="1" />
              <line x1="50" y1="65" x2="25" y2="90" stroke="var(--border-subtle)" strokeWidth="1" />
           </svg>
        </div>
        <div className={styles.syncPane}>
          <div className={styles.paneHeader}>Current Call</div>
          <div className={styles.codeSnippet}>
            <code>{steps[step].code}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MergeOperationVisual = () => {
  const [frame, setFrame] = useState(0);

  const frames = [
    { i: 0, j: 0, k: 0, res: [null, null, null, null], msg: "Initial: Compare B[i] and C[j]" },
    { i: 0, j: 0, k: 0, res: [null, null, null, null], msg: "Compare 27 vs 38. 27 is smaller." },
    { i: 0, j: 1, k: 1, res: [27, null, null, null], msg: "Copy C[0] to A[0]. Increment j and k." },
    { i: 0, j: 1, k: 1, res: [27, null, null, null], msg: "Compare B[0] (38) vs C[1] (43)." },
    { i: 1, j: 1, k: 2, res: [27, 38, null, null], msg: "38 is smaller. Copy B[0] to A[1]. Increment i and k." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(f => (f + 1) % frames.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const f = frames[frame];

  return (
    <div className={styles.mergeVisualContainer}>
      <h4 className={styles.conceptTitle}>Merge Operation (Pointer Trace)</h4>
      <div className={styles.mergePointersRow}>
        <div className={styles.mergeArrayWrapper}>
          <div className={styles.mergeLabel}>B (Left)</div>
          <div className={styles.mergeArray}>
            {[38, 50].map((val, idx) => (
              <div key={idx} className={`${styles.mergeCell} ${f.i === idx ? styles.activePointer : ''}`}>
                {val}
                {f.i === idx && <div className={styles.pointerTag}>i</div>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.mergeArrayWrapper}>
          <div className={styles.mergeLabel}>C (Right)</div>
          <div className={styles.mergeArray}>
            {[27, 43].map((val, idx) => (
              <div key={idx} className={`${styles.mergeCell} ${f.j === idx ? styles.activePointer : ''}`}>
                {val}
                {f.j === idx && <div className={styles.pointerTag}>j</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.mergeResultWrapper}>
        <div className={styles.mergeLabel}>A (Result)</div>
        <div className={styles.mergeArray}>
          {f.res.map((val, idx) => (
            <div key={idx} className={`${styles.mergeCell} ${val !== null ? styles.filled : ''} ${f.k === idx ? styles.activePointer : ''}`}>
              {val}
              {f.k === idx && <div className={styles.pointerTag}>k</div>}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.stepInfo}>{f.msg}</div>
    </div>
  );
};

export const PivotMetaphor = () => {
  return (
    <div className={styles.pivotMetaphor}>
      <div className={styles.pivotKing}>
        <div className={styles.crown}>👑</div>
        <div className={styles.pivotValue}>Pivot</div>
      </div>
      <div className={styles.pivotLand}>
        <div className={styles.landSide}>
           <div className={styles.landTitle}>Smaller</div>
           <div className={styles.landElements}>
              <div className={styles.landElem}>3</div>
              <div className={styles.landElem}>9</div>
              <div className={styles.landElem}>27</div>
           </div>
           <div className={styles.landArrow}>← Sorted Left</div>
        </div>
        <div className={styles.landSide}>
           <div className={styles.landTitle}>Larger</div>
           <div className={styles.landElements}>
              <div className={styles.landElem}>43</div>
              <div className={styles.landElem}>82</div>
           </div>
           <div className={styles.landArrow}>Sorted Right →</div>
        </div>
      </div>
      <p className={styles.metaphorText}>
        Quick Sort acts like a King (Pivot) organizing their subjects. Everyone smaller goes to the left, everyone larger goes to the right. The Pivot is now in its <b>final sorted position</b>.
      </p>
    </div>
  );
};

export const QuickSortWorstCase = () => {
  return (
    <div className={styles.gridTwoCol}>
       <div className={styles.caseBox}>
          <h4 className={styles.conceptTitle}>Average Case (Balanced)</h4>
          <p className={styles.conceptText}>Pivot near median. Problem size halves each time.</p>
          <svg viewBox="0 0 100 80" className={styles.miniTree}>
             <circle cx="50" cy="10" r="4" fill="var(--accent-blue)" />
             <line x1="50" y1="10" x2="30" y2="30" stroke="var(--border-subtle)" strokeWidth="1" />
             <line x1="50" y1="10" x2="70" y2="30" stroke="var(--border-subtle)" strokeWidth="1" />
             <circle cx="30" cy="30" r="4" fill="var(--accent-blue)" />
             <circle cx="70" cy="30" r="4" fill="var(--accent-blue)" />
             <line x1="30" y1="30" x2="20" y2="50" stroke="var(--border-subtle)" strokeWidth="1" />
             <line x1="30" y1="30" x2="40" y2="50" stroke="var(--border-subtle)" strokeWidth="1" />
             <circle cx="20" cy="50" r="4" fill="var(--accent-blue)" />
             <circle cx="40" cy="50" r="4" fill="var(--accent-blue)" />
          </svg>
          <div className={styles.complexityBadge}>Θ(n log n)</div>
          <p className={styles.caseDesc}>Like a balanced pyramid.</p>
       </div>
       <div className={styles.caseBox}>
          <h4 className={styles.conceptTitle}>Worst Case (Skewed)</h4>
          <p className={styles.conceptText}>Pivot is smallest/largest. Reduces size by only 1.</p>
          <svg viewBox="0 0 100 80" className={styles.miniTree}>
             <circle cx="80" cy="10" r="4" fill="var(--accent-red)" />
             <line x1="80" y1="10" x2="60" y2="30" stroke="var(--accent-red)" strokeWidth="1" strokeOpacity="0.3" />
             <circle cx="60" cy="30" r="4" fill="var(--accent-red)" />
             <line x1="60" y1="30" x2="40" y2="50" stroke="var(--accent-red)" strokeWidth="1" strokeOpacity="0.3" />
             <circle cx="40" cy="50" r="4" fill="var(--accent-red)" />
             <line x1="40" y1="50" x2="20" y2="70" stroke="var(--accent-red)" strokeWidth="1" strokeOpacity="0.3" />
             <circle cx="20" cy="70" r="4" fill="var(--accent-red)" />
          </svg>
          <div className={styles.complexityBadge} style={{background: 'var(--accent-red)'}}>Θ(n²)</div>
          <p className={styles.caseDesc}>Degenerates into a Linked List.</p>
       </div>
    </div>
  );
};

export const TraversalMetaphor = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [order, setOrder] = useState('preorder');
  const [dotPos, setDotPos] = useState({ x: 100, y: 20 });

  const nodes = [
    { id: 'A', x: 100, y: 20, left: 'B', right: 'C' },
    { id: 'B', x: 60, y: 60, left: 'D', right: 'E' },
    { id: 'C', x: 140, y: 60, left: 'F', right: 'G' },
    { id: 'D', x: 40, y: 100 },
    { id: 'E', x: 80, y: 100 },
    { id: 'F', x: 120, y: 100 },
    { id: 'G', x: 160, y: 100 },
  ];

  const sequences = {
    preorder: ['A', 'B', 'D', 'E', 'C', 'F', 'G'],
    inorder: ['D', 'B', 'E', 'A', 'F', 'C', 'G'],
    postorder: ['D', 'E', 'B', 'F', 'G', 'C', 'A'],
  };

  useEffect(() => {
    let i = 0;
    const seq = sequences[order];
    const timer = setInterval(() => {
      const nodeId = seq[i];
      setActiveNode(nodeId);
      const node = nodes.find(n => n.id === nodeId);
      setDotPos({ x: node.x, y: node.y });
      i = (i + 1) % seq.length;
    }, 1200);
    return () => clearInterval(timer);
  }, [order]);

  return (
    <div className={styles.traversalContainer}>
      <div className={styles.traversalControls}>
        {['preorder', 'inorder', 'postorder'].map(o => (
          <button 
            key={o} 
            className={`${styles.traversalBtn} ${order === o ? styles.active : ''}`}
            onClick={() => { setOrder(o); setActiveNode(null); }}
          >
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.traversalStage}>
        <svg viewBox="0 0 200 130" className={styles.traversalSvg}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {nodes.map(node => (
            <React.Fragment key={node.id}>
              {node.left && <line x1={node.x} y1={node.y} x2={nodes.find(n => n.id === node.left).x} y2={nodes.find(n => n.id === node.left).y} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="2 2" />}
              {node.right && <line x1={node.x} y1={node.y} x2={nodes.find(n => n.id === node.right).x} y2={nodes.find(n => n.id === node.right).y} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="2 2" />}
            </React.Fragment>
          ))}
          {nodes.map(node => (
            <g key={node.id}>
              <circle 
                cx={node.x} cy={node.y} r="10" 
                className={`${styles.nodeCircle} ${activeNode === node.id ? styles.activeNode : ''}`} 
              />
              <text x={node.x} y={node.y + 3} textAnchor="middle" className={styles.nodeLabel}>{node.id}</text>
            </g>
          ))}
          <circle 
            cx={dotPos.x} cy={dotPos.y} r="4" 
            fill="var(--accent-blue)" 
            filter="url(#glow)"
            style={{ transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>
        <div className={styles.visitedSequence}>
          <span className={styles.seqLabel}>Visit Sequence:</span>
          {sequences[order].map((id, idx) => (
            <span key={idx} className={`${styles.seqItem} ${activeNode === id ? styles.activeSeq : ''}`}>
              {id}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
