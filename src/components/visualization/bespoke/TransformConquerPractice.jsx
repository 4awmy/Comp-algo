import React, { useState, useEffect, useRef } from 'react';
import MathBlock from '../../ui/Premium/MathBlock';
import styles from './Bespoke.module.css';

// ── Transformation Paradigm Demo ──
export const TransformationParadigmDemo = () => {
  const [problemType, setProblemType] = useState('Search');
  const [applied, setApplied] = useState(false);

  return (
    <div className={styles.metaphorContainer}>
      <div className={styles.metaphorLabel}>Transform & Conquer Paradigm</div>
      <div className={styles.traversalControls}>
        {['Search', 'Duplicates', 'Scheduling'].map(t => (
          <button key={t} className={`${styles.traversalBtn} ${problemType === t ? styles.active : ''}`} onClick={() => setProblemType(t)}>{t}</button>
        ))}
      </div>
      
      <div className={styles.gridTwoCol} style={{ marginTop: '1.5rem' }}>
        <div className={styles.caseBox}>
          <div className={styles.laneLabel}>Original Problem</div>
          <div className={styles.pipelineBox}>
             <div className={styles.pipelineContent}>[ 亂 ] (Messy)</div>
          </div>
          <div className={styles.pipelineArrow}>↓</div>
          <div className={styles.pipelineBox}>
             <div className={styles.pipelineTitle}>Direct Solution</div>
             <div className={styles.pipelineContent}>Scan O(n)</div>
          </div>
        </div>
        
        <div className={styles.caseBox}>
          <div className={styles.laneLabel}>With Transformation</div>
          <div className={styles.pipelineBox}>
             <div className={styles.pipelineContent}>[ 亂 ] (Messy)</div>
          </div>
          <div className={styles.pipelineArrow}>↓</div>
          <div className={`${styles.pipelineBox} ${applied ? styles.active : ''}`} onClick={() => setApplied(!applied)} style={{cursor: 'pointer'}}>
             <div className={styles.pipelineTitle}>Click to Transform</div>
             <div className={styles.pipelineContent}>{applied ? 'Sorted [ 1, 2, 3... ]' : '---'}</div>
          </div>
          <div className={styles.pipelineArrow}>↓</div>
          <div className={styles.pipelineBox}>
             <div className={styles.pipelineTitle}>Conquer</div>
             <div className={styles.pipelineContent}>{applied ? 'Binary Search O(log n)' : '---'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Presorting Practice Demo ──
export const PresortingPracticeDemo = () => {
  const [task, setTask] = useState('Duplicates');
  const array = [7, 2, 9, 3, 2, 8, 1];
  const sorted = [1, 2, 2, 3, 7, 8, 9];

  return (
    <div className={styles.conceptBox}>
      <div className={styles.conceptTitle}>Presorting Power</div>
      <div className={styles.traversalControls}>
        {['Search', 'Duplicates', 'Median'].map(t => (
          <button key={t} className={`${styles.traversalBtn} ${task === t ? styles.active : ''}`} onClick={() => setTask(t)}>{t}</button>
        ))}
      </div>
      
      <div className={styles.raceLane}>
        <div className={styles.laneLabel}>Unsorted Scan</div>
        <div className={styles.raceArray}>
          {array.map((v, i) => (
            <div key={i} className={`${styles.raceCell} ${v === 2 ? styles.highlighted : ''}`}>{v}</div>
          ))}
        </div>
        <div className={styles.boxText}>Cost: O(n) or O(n²) depending on task</div>
      </div>

      <div className={styles.raceLane}>
        <div className={styles.laneLabel}>Sorted & Conquered</div>
        <div className={styles.raceArray}>
          {sorted.map((v, i) => (
            <div key={i} className={`${styles.raceCell} ${v === 2 ? styles.active : ''}`} style={{background: v === 2 ? 'var(--accent-blue)' : ''}}>{v}</div>
          ))}
        </div>
        <div className={styles.boxText}>Cost: O(n log n) total</div>
      </div>
    </div>
  );
};

// ── BST vs Array vs Linked List ──
export const DataStructureSpeedTest = () => {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState({ array: 0, list: 0, bst: 0 });

  const runTest = () => {
    setActive(true);
    let a = 0, l = 0, b = 0;
    const timer = setInterval(() => {
      a += 2; l += 1; b += 15;
      setProgress({ array: Math.min(100, a), list: Math.min(100, l), bst: Math.min(100, b) });
      if (a >= 100 && l >= 100 && b >= 100) {
        clearInterval(timer);
        setActive(false);
      }
    }, 50);
  };

  return (
    <div className={styles.conceptBox}>
      <div className={styles.conceptTitle}>Search Speed Test (n=1000)</div>
      <div className={styles.complexityGrid}>
        <div className={styles.complexityLane}>
          <div className={styles.laneLabel}>Unsorted Array: O(n)</div>
          <div className={styles.progressBar}><div className={styles.progressFill} style={{width: `${progress.array}%`}} /></div>
        </div>
        <div className={styles.complexityLane}>
          <div className={styles.laneLabel}>Linked List: O(n)</div>
          <div className={styles.progressBar}><div className={styles.progressFill} style={{width: `${progress.list}%`}} /></div>
        </div>
        <div className={styles.complexityLane}>
          <div className={styles.laneLabel}>Balanced BST: O(log n)</div>
          <div className={styles.progressBar}><div className={styles.progressFill} style={{width: `${progress.bst}%`, background: 'var(--accent-green)'}} /></div>
        </div>
      </div>
      <button className={styles.controlBtn} onClick={runTest} disabled={active} style={{marginTop: '1rem'}}>Run Concurrent Search</button>
    </div>
  );
};

// ── Unbalanced BST Sim ──
export const UnbalancedBSTSim = () => {
  const [nodes, setNodes] = useState([]);
  const [height, setHeight] = useState(0);

  const addNode = (ascending = false) => {
    const nextVal = ascending ? (nodes.length + 1) * 10 : Math.floor(Math.random() * 100);
    setNodes([...nodes, nextVal]);
    setHeight(ascending ? nodes.length + 1 : Math.min(nodes.length + 1, Math.ceil(Math.log2(nodes.length + 2)) + 1));
  };

  return (
    <div className={styles.gridTwoCol}>
       <div className={styles.caseBox}>
          <h4>Tree Degeneration</h4>
          <div className={styles.heightMeter}>
             <div className={styles.heightFill} style={{height: `${(height / 10) * 100}%`, background: height > 5 ? '#ef4444' : ''}} />
          </div>
          <p className={styles.scoreValue}>Height: {height}</p>
          <div className={styles.controls} style={{flexDirection: 'column'}}>
             <button className={styles.controlBtn} onClick={() => addNode(true)}>Insert Ascending (Worst Case)</button>
             <button className={styles.controlBtn} onClick={() => addNode(false)}>Insert Random</button>
             <button className={styles.controlBtn} onClick={() => {setNodes([]); setHeight(0);}}>Reset</button>
          </div>
       </div>
       <div className={styles.caseBox}>
          <div className={styles.raceArray} style={{flexWrap: 'wrap', gap: '4px'}}>
             {nodes.map((v, i) => (
               <div key={i} className={styles.raceCell}>{v}</div>
             ))}
          </div>
          <p className={styles.metaphorNote}>Observe how sequential input turns O(log n) into O(n).</p>
       </div>
    </div>
  );
};

// ── AVL Balance Explorer ──
export const AVLBalanceExplorer = () => {
  const [hL, setHL] = useState(3);
  const [hR, setHR] = useState(1);
  const bf = hL - hR;

  return (
    <div className={styles.metaphorContainer}>
      <div className={styles.metaphorLabel}>Balance Factor Computation</div>
      <div className={styles.flexRow} style={{justifyContent: 'center', alignItems: 'flex-end', gap: '2rem', height: '150px'}}>
        <div className={styles.caseBox} style={{width: '60px'}}>
           <div className={styles.heightMeter} style={{height: '100px'}}><div className={styles.heightFill} style={{height: `${(hL/5)*100}%`}} /></div>
           <p>H(L): {hL}</p>
           <button onClick={() => setHL(Math.min(5, hL+1))}>+</button>
           <button onClick={() => setHL(Math.max(0, hL-1))}>-</button>
        </div>
        
        <div className={styles.rotNode} style={{width: '60px', height: '60px', background: Math.abs(bf) > 1 ? '#ef4444' : 'var(--accent-green)', color: 'white', fontSize: '20px'}}>
          {bf > 0 ? `+${bf}` : bf}
        </div>

        <div className={styles.caseBox} style={{width: '60px'}}>
           <div className={styles.heightMeter} style={{height: '100px'}}><div className={styles.heightFill} style={{height: `${(hR/5)*100}%`}} /></div>
           <p>H(R): {hR}</p>
           <button onClick={() => setHR(Math.min(5, hR+1))}>+</button>
           <button onClick={() => setHR(Math.max(0, hR-1))}>-</button>
        </div>
      </div>
      <MathBlock math={`BF = Height(Left) - Height(Right) = ${hL} - ${hR} = ${bf}`} />
      <p className={styles.metaphorNote}>{Math.abs(bf) > 1 ? '🔴 REBALANCE REQUIRED' : '🟢 TREE IS BALANCED'}</p>
    </div>
  );
};

// ── Heap Property Validator ──
export const HeapPropertyValidator = () => {
  const [vals, setVals] = useState([90, 80, 70, 40, 50, 60, 100]);
  
  const isComplete = true; // Simplified for demo
  const violations = vals.map((v, i) => {
    const left = (i + 1) * 2 - 1;
    const right = (i + 1) * 2;
    let v_left = left < vals.length && vals[left] > v;
    let v_right = right < vals.length && vals[right] > v;
    return v_left || v_right;
  });

  return (
    <div className={styles.conceptBox}>
      <div className={styles.conceptTitle}>Interactive Heap Auditor</div>
      <div className={styles.heapGrid}>
        <div className={styles.heapTree}>
           <div className={styles.rotRow}>
              <div className={styles.rotNode} style={{background: violations[0] ? '#ef4444' : 'var(--accent-green)', color: 'white'}}>{vals[0]}</div>
           </div>
           <div className={styles.rotRow}>
              <div className={styles.rotNode} style={{background: violations[1] ? '#ef4444' : 'var(--accent-green)', color: 'white'}}>{vals[1]}</div>
              <div className={styles.rotNode} style={{background: violations[2] ? '#ef4444' : 'var(--accent-green)', color: 'white'}}>{vals[2]}</div>
           </div>
        </div>
      </div>
      <div className={styles.raceArray} style={{marginTop: '1rem'}}>
        {vals.map((v, i) => (
          <input key={i} type="number" value={v} onChange={(e) => {
            const nv = [...vals];
            nv[i] = parseInt(e.target.value) || 0;
            setVals(nv);
          }} className={styles.peasantInput} style={{width: '45px'}} />
        ))}
      </div>
      <p className={styles.metaphorNote}>Red nodes violate the <b>Max-Heap Property</b> (Parent must be ≥ Children).</p>
    </div>
  );
};

// ── HeapSort Full Process ──
export const HeapSortFullProcess = () => {
  const [step, setStep] = useState(0);
  const phases = ['Initial Array', 'Heap Construction (Heapify)', 'Delete Max (Swap Root)', 'Sift Down', 'Sorted!'];

  return (
    <div className={styles.metaphorContainer}>
      <div className={styles.metaphorLabel}>Heapsort Production Line</div>
      <div className={styles.pipelineFlex}>
         {phases.map((p, i) => (
           <React.Fragment key={p}>
             <div className={`${styles.pipelineCard} ${step === i ? styles.active : ''}`}>
                <div className={styles.pipelineTitle}>Phase {i+1}</div>
                <div className={styles.pipelineText} style={{fontSize: '9px'}}>{p}</div>
             </div>
             {i < phases.length - 1 && <div className={styles.pipelineArrow}>➔</div>}
           </React.Fragment>
         ))}
      </div>
      <div className={styles.controls}>
         <button className={styles.controlBtn} onClick={() => setStep(Math.max(0, step - 1))}>Back</button>
         <button className={styles.controlBtn} onClick={() => setStep(Math.min(phases.length - 1, step + 1))}>Step Forward</button>
      </div>
      <div className={styles.codeSnippet} style={{marginTop: '1.5rem'}}>
         <code style={{color: step === 1 ? 'var(--accent-blue)' : ''}}>1. BuildHeap(A)</code><br/>
         <code style={{color: step >= 2 ? 'var(--accent-blue)' : ''}}>2. for i = n down to 2:</code><br/>
         <code style={{color: step === 2 ? 'var(--accent-blue)' : ''}}>&nbsp;&nbsp;&nbsp;&nbsp;Swap(A[1], A[i])</code><br/>
         <code style={{color: step === 3 ? 'var(--accent-blue)' : ''}}>&nbsp;&nbsp;&nbsp;&nbsp;SiftDown(A, 1, i-1)</code>
      </div>
    </div>
  );
};
