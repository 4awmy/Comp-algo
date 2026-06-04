import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [45, 12, 89, 33, 22];

const SelectionSortTracer = ({ style }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    const arr = [...INITIAL_ARRAY];
    const n = arr.length;

    s.push({
      arr: [...arr],
      i: -1,
      j: -1,
      minIdx: -1,
      line: 0,
      description: "Ready to start Selection Sort. We will scan for the minimum and swap it to the front."
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      s.push({
        arr: [...arr],
        i: i,
        j: -1,
        minIdx: minIdx,
        line: 2,
        description: `Iteration ${i+1}: Assume the first unsorted element A[${i}] is the minimum.`
      });

      for (let j = i + 1; j < n; j++) {
        s.push({
          arr: [...arr],
          i: i,
          j: j,
          minIdx: minIdx,
          line: 4,
          description: `Comparing A[${minIdx}] (${arr[minIdx]}) with A[${j}] (${arr[j]}).`
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          s.push({
            arr: [...arr],
            i: i,
            j: j,
            minIdx: minIdx,
            line: 5,
            description: `Found a new minimum: ${arr[minIdx]} at index ${minIdx}.`
          });
        }
      }

      if (minIdx !== i) {
        s.push({
          arr: [...arr],
          i: i,
          j: -1,
          minIdx: minIdx,
          line: 6,
          description: `Swap the minimum element A[${minIdx}] with A[${i}].`
        });
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
      }

      s.push({
        arr: [...arr],
        i: i,
        j: -1,
        minIdx: -1,
        line: 1,
        description: `A[${i}] is now sorted.`
      });
    }

    s.push({
      arr: [...arr],
      i: n - 1,
      j: -1,
      minIdx: -1,
      line: 0,
      description: "Array is fully sorted."
    });

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];
  const code = [
    "for i = 0 to n-2 do",
    "  min = i",
    "  for j = i+1 to n-1 do",
    "    if A[j] < A[min]",
    "      min = j",
    "  swap A[i] and A[min]"
  ];

  const actions = (
    <div className={styles.controls}>
      <button className="btn btn-outline btn-sm" onClick={() => { setCurrentStepIdx(0); setIsPlaying(false); }}>Reset</button>
      <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}>Prev</button>
      <button className="btn btn-primary btn-sm" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))}>Next</button>
    </div>
  );

  return (
    <VisualStage style={style} title="Selection Sort Tracer" description={step.description} actions={actions}>
      <div className={styles.dualPane}>
        <div className={styles.codePane}>
          {code.map((line, idx) => (
            <span key={idx} className={`${styles.codeLine} ${step.line === idx ? styles.codeLineActive : ''}`}>
              {line}
            </span>
          ))}
        </div>
        <div className={styles.vizPane}>
          <div className={styles.boxArray}>
            {step.arr.map((val, idx) => {
              let state = '';
              if (idx <= step.i && step.minIdx === -1) state = styles.sorted;
              else if (idx === step.i) state = styles.active;
              else if (idx === step.j) state = styles.comparing;
              else if (idx === step.minIdx) state = styles.minimum;

              return (
                <div key={idx} className={`${styles.box} ${state}`}>
                  {val}
                  {idx === step.minIdx && <div className={styles.boxFlag}>min</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default SelectionSortTracer;
