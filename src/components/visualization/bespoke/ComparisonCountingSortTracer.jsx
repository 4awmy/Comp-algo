import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [62, 31, 84, 96, 19, 47];

const CODE = [
  "ALGORITHM ComparisonCountingSort(A[0..n-1])",
  "// Sorts an array by comparison counting",
  "for i <- 0 to n-1 do Count[i] <- 0",
  "for i <- 0 to n-2 do",
  "  for j <- i+1 to n-1 do",
  "    if A[i] < A[j]",
  "      Count[j] <- Count[j] + 1",
  "    else",
  "      Count[i] <- Count[i] + 1",
  "for i <- 0 to n-1 do S[Count[i]] <- A[i]",
  "return S"
];

/**
 * ComparisonCountingSortTracer - Visualizes Comparison Counting Sort.
 */
const ComparisonCountingSortTracer = ({ style }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    const arr = [...INITIAL_ARRAY];
    const n = arr.length;
    const count = Array(n).fill(0);
    
    // Step 0: Initialize Count Array
    s.push({
      array: [...arr],
      count: [...count],
      sorted: Array(n).fill(null),
      i: -1,
      j: -1,
      line: 2,
      description: "Initialize the Count array with zeros."
    });

    for (let i = 0; i < n - 1; i++) {
      // Outer loop step
      s.push({
        array: [...arr],
        count: [...count],
        sorted: Array(n).fill(null),
        i,
        j: -1,
        line: 3,
        description: `Outer loop: i = ${i}. We will compare A[${i}] (${arr[i]}) with all elements to its right.`
      });

      for (let j = i + 1; j < n; j++) {
        // Inner loop check
        s.push({
          array: [...arr],
          count: [...count],
          sorted: Array(n).fill(null),
          i,
          j,
          line: 4,
          description: `Inner loop: compare A[${i}] (${arr[i]}) with A[${j}] (${arr[j]}).`
        });

        // Comparison line
        const compare = arr[i] < arr[j];
        s.push({
          array: [...arr],
          count: [...count],
          sorted: Array(n).fill(null),
          i,
          j,
          line: 5,
          description: `Evaluate condition: is A[${i}] (${arr[i]}) < A[${j}] (${arr[j]})? Result is ${compare}.`
        });

        if (compare) {
          count[j]++;
          s.push({
            array: [...arr],
            count: [...count],
            sorted: Array(n).fill(null),
            i,
            j,
            line: 6,
            description: `Since A[${i}] < A[${j}], increment Count[${j}] to ${count[j]}.`
          });
        } else {
          count[i]++;
          s.push({
            array: [...arr],
            count: [...count],
            sorted: Array(n).fill(null),
            i,
            j,
            line: 8,
            description: `Since A[${i}] >= A[${j}], increment Count[${i}] to ${count[i]}.`
          });
        }
      }
    }

    // Placing elements in sorted array S
    const sorted = Array(n).fill(null);
    for (let i = 0; i < n; i++) {
      sorted[count[i]] = arr[i];
      s.push({
        array: [...arr],
        count: [...count],
        sorted: [...sorted],
        i: -1,
        j: -1,
        placedIdx: i,
        line: 9,
        description: `Place A[${i}] (${arr[i]}) in S at position Count[${i}] = S[${count[i]}].`
      });
    }

    // Return S
    s.push({
      array: [...arr],
      count: [...count],
      sorted: [...sorted],
      i: -1,
      j: -1,
      line: 10,
      description: "Sort complete. Return the final sorted array S."
    });

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1200);
    } else if (currentStepIdx === steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <button className="btn btn-outline btn-sm" onClick={() => { setCurrentStepIdx(0); setIsPlaying(false); }} disabled={currentStepIdx === 0}>Reset</button>
      <button className="btn btn-outline btn-sm" onClick={() => { setCurrentStepIdx(prev => Math.max(0, prev - 1)); setIsPlaying(false); }} disabled={currentStepIdx === 0}>Prev</button>
      <button className="btn btn-primary btn-sm" onClick={() => setIsPlaying(!isPlaying)} disabled={currentStepIdx === steps.length - 1 && !isPlaying}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button className="btn btn-outline btn-sm" onClick={() => { setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1)); setIsPlaying(false); }} disabled={currentStepIdx === steps.length - 1}>Next</button>
    </div>
  );

  return (
    <VisualStage style={style} 
      title="Comparison Counting Sort"
      description={step.description}
      actions={actions}
    >
      <div className={styles.dualPane}>
        {/* Code Pane */}
        <div className={styles.codePane}>
          <div className={styles.codeHeader}>Algorithm Pseudocode</div>
          {CODE.map((lineText, idx) => (
            <span key={idx} className={`${styles.codeLine} ${step.line === idx ? styles.codeLineActive : ''}`}>
              {lineText}
            </span>
          ))}
        </div>

        {/* Visual Stage Pane */}
        <div className={styles.vizPane} style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Input Array */}
            <div>
              <span className={styles.label}>Input Array (A)</span>
              <div style={{ display: 'flex', gap: '6px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                {step.array.map((val, idx) => {
                  let status = '';
                  if (idx === step.i) status = styles.active;
                  else if (idx === step.j) status = styles.patternChar;
                  return (
                    <div key={idx} className={`${styles.charBox} ${status}`} style={{ position: 'relative' }}>
                      {val}
                      <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>[{idx}]</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Count Array */}
            <div>
              <span className={styles.label}>Count Array (C)</span>
              <div style={{ display: 'flex', gap: '6px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                {step.count.map((val, idx) => {
                  let status = '';
                  if (idx === step.i) status = styles.active;
                  else if (idx === step.j) status = styles.active;
                  if (idx === step.placedIdx) status = styles.match;
                  return (
                    <div key={idx} className={`${styles.charBox} ${status}`} style={{ position: 'relative' }}>
                      {val}
                      <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>[{idx}]</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sorted Array */}
            <div>
              <span className={styles.label}>Sorted Array (S)</span>
              <div style={{ display: 'flex', gap: '6px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                {step.sorted.map((val, idx) => (
                  <div key={idx} className={`${styles.charBox} ${val !== null ? styles.match : ''}`} style={{ position: 'relative' }}>
                    {val ?? ''}
                    <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>[{idx}]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default ComparisonCountingSortTracer;
