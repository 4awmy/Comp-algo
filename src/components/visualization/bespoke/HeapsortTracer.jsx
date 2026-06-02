import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [2, 9, 7, 6, 5, 8];

/**
 * HeapsortTracer - Visualizes Stage 1 (Build Heap) and Stage 2 (Sort).
 * Shows both the binary tree representation and the array storage.
 */
const HeapsortTracer = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    let arr = [...INITIAL_ARRAY];
    const n = arr.length;

    const addStep = (description, activeIdxs = [], comparingIdxs = [], sortedCount = 0) => {
      s.push({
        arr: [...arr],
        activeIdxs,
        comparingIdxs,
        sortedIdx: n - sortedCount,
        description
      });
    };

    addStep("Start with an unordered array. We will first transform it into a Max-Heap.");

    // Stage 1: Build Heap (Bottom-Up)
    const heapify = (size, i, isSorting = false) => {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < size && arr[l] > arr[largest]) largest = l;
      if (r < size && arr[r] > arr[largest]) largest = r;

      if (largest !== i) {
        addStep(
          `Violation found at index ${i}. Child at index ${largest} (${arr[largest]}) is larger than parent (${arr[i]}).`,
          [i, largest],
          [l, r].filter(idx => idx < size)
        );
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        addStep(
          `Swap ${arr[largest]} and ${arr[i]} to restore parental dominance.`,
          [i, largest]
        );
        heapify(size, largest, isSorting);
      }
    };

    // Bottom-up construction
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      addStep(`Checking sub-tree rooted at index ${i} (${arr[i]}).`, [i]);
      heapify(n, i);
    }

    addStep("Heap construction complete. The root now contains the maximum element.", [0]);

    // Stage 2: Sorting (Maximum Deletions)
    for (let i = n - 1; i > 0; i--) {
      addStep(`Extract root ${arr[0]} (max) and move to the end of the heap.`, [0, i]);
      [arr[0], arr[i]] = [arr[i], arr[0]];
      addStep(`Root extracted. New heap size is ${i}. Now re-heapify the root.`, [0], [], n - i);
      heapify(i, 0, true);
    }

    addStep("Heapsort complete. The array is now fully sorted.", [], [], n);

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  // Tree layout helper
  const getCoordinates = (idx) => {
    const level = Math.floor(Math.log2(idx + 1));
    const posInLevel = idx - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);
    const x = (posInLevel + 0.5) * (100 / nodesInLevel);
    const y = 20 + level * 25;
    return { x: `${x}%`, y: `${y}%` };
  };

  const actions = (
    <div className={styles.controls}>
      <button className="btn btn-outline btn-sm" onClick={() => { setCurrentStepIdx(0); setIsPlaying(false); }} disabled={currentStepIdx === 0}>Reset</button>
      <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))} disabled={currentStepIdx === 0}>Prev</button>
      <button className="btn btn-primary btn-sm" onClick={() => setIsPlaying(!isPlaying)} style={{ minWidth: '80px' }}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))} disabled={currentStepIdx === steps.length - 1}>Next</button>
    </div>
  );

  return (
    <VisualStage title="Heapsort: Transform & Conquer" description={step.description} actions={actions}>
      <div className={styles.heapTracer}>
        {/* Tree View */}
        <div className={styles.treeContainer}>
          <svg className={styles.treeSvg}>
            {/* Edges */}
            {step.arr.map((_, i) => {
              const left = 2 * i + 1;
              const right = 2 * i + 2;
              const coords = getCoordinates(i);
              
              return (
                <g key={`edges-${i}`}>
                  {left < step.arr.length && (
                    <line 
                      x1={coords.x} y1={coords.y} 
                      x2={getCoordinates(left).x} 
                      y2={getCoordinates(left).y} 
                      className={styles.edge} 
                      style={{ strokeOpacity: left >= step.sortedIdx ? 0.2 : 1 }}
                    />
                  )}
                  {right < step.arr.length && (
                    <line 
                      x1={coords.x} y1={coords.y} 
                      x2={getCoordinates(right).x} 
                      y2={getCoordinates(right).y} 
                      className={styles.edge}
                      style={{ strokeOpacity: right >= step.sortedIdx ? 0.2 : 1 }}
                    />
                  )}
                </g>
              );
            })}
            
            {/* Nodes */}
            {step.arr.map((val, i) => {
              const coords = getCoordinates(i);
              let state = styles.node;
              if (step.activeIdxs.includes(i)) state = `${styles.node} ${styles.nodeActive}`;
              else if (step.comparingIdxs.includes(i)) state = `${styles.node} ${styles.nodeQueued}`;
              else if (i >= step.sortedIdx) state = `${styles.node} ${styles.nodeVisited}`;

              return (
                <g key={`node-${i}`} className={state}>
                  <circle cx={coords.x} cy={coords.y} r="18" className={styles.nodeCircle} />
                  <text x={coords.x} y={coords.y} className={styles.nodeText}>{val}</text>
                  <text x={coords.x} y={parseFloat(coords.y) - 5 + "%"} style={{ fontSize: '8px', fill: 'var(--text-muted)' }}>{i}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Array View */}
        <div className={styles.arrayContainer} style={{ minHeight: '80px' }}>
          {step.arr.map((val, idx) => {
            let stateClass = styles.unsorted;
            if (step.activeIdxs.includes(idx)) stateClass = styles.active;
            else if (step.comparingIdxs.includes(idx)) stateClass = styles.comparing;
            else if (idx >= step.sortedIdx) stateClass = styles.sorted;

            return (
              <div key={idx} className={`${styles.element} ${stateClass}`} style={{ width: '40px' }}>
                <div className={styles.bar} style={{ height: '40px' }}>{val}</div>
                <span className={styles.label}>[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </VisualStage>
  );
};

export default HeapsortTracer;
