import { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [62, 31, 84, 96, 19, 47];

/**
 * ComparisonCountingSortTracer - Visualizes Comparison Counting Sort.
 */
const ComparisonCountingSortTracer = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const steps = useMemo(() => {
    const s = [];
    const arr = [...INITIAL_ARRAY];
    const n = arr.length;
    const count = Array(n).fill(0);
    
    s.push({
      array: [...arr],
      count: [...count],
      sorted: Array(n).fill(null),
      i: -1,
      j: -1,
      description: "Initialize the Count array with zeros."
    });

    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        const compare = arr[i] < arr[j];
        if (compare) {
          count[j]++;
        } else {
          count[i]++;
        }
        
        s.push({
          array: [...arr],
          count: [...count],
          sorted: Array(n).fill(null),
          i,
          j,
          description: `Compare A[${i}]=${arr[i]} and A[${j}]=${arr[j]}. ${arr[i] < arr[j] ? `A[${j}]` : `A[${i}]`} is larger, increment its count.`
        });
      }
    }

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
        description: `Place A[${i}]=${arr[i]} at Sorted[Count[${i}]] = Sorted[${count[i]}].`
      });
    }

    return s;
  }, []);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(0)} disabled={currentStepIdx === 0}>Reset</button>
      <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))} disabled={currentStepIdx === 0}>Prev</button>
      <button className="btn btn-primary btn-sm" onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))} disabled={currentStepIdx === steps.length - 1}>Next Step</button>
    </div>
  );

  return (
    <VisualStage 
      title="Comparison Counting Sort"
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <div className="w-full space-y-8">
          {/* Input Array */}
          <div>
            <span className={styles.label}>Input Array (A)</span>
            <div className="flex gap-2 mt-2">
              {step.array.map((val, idx) => (
                <div key={idx} className={`${styles.charBox} ${idx === step.i || idx === step.j ? styles.patternChar : ''}`}>
                  {val}
                  <span className="absolute -top-6 text-[10px] text-muted-foreground">[{idx}]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Count Array */}
          <div>
            <span className={styles.label}>Count Array (C)</span>
            <div className="flex gap-2 mt-2">
              {step.count.map((val, idx) => (
                <div key={idx} className={`${styles.charBox} ${idx === step.i || idx === step.j ? styles.active : ''} ${idx === step.placedIdx ? styles.match : ''}`}>
                  {val}
                  <span className="absolute -top-6 text-[10px] text-muted-foreground">[{idx}]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sorted Array */}
          <div>
            <span className={styles.label}>Sorted Array (S)</span>
            <div className="flex gap-2 mt-2">
              {step.sorted.map((val, idx) => (
                <div key={idx} className={`${styles.charBox} ${val !== null ? styles.match : ''}`}>
                  {val ?? ''}
                  <span className="absolute -top-6 text-[10px] text-muted-foreground">[{idx}]</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default ComparisonCountingSortTracer;
