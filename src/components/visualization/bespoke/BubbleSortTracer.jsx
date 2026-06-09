import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [50, 22, 11, 45, 33];

const BubbleSortTracer = ({ style }) => {
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
      swapping: false,
      sortedWall: n,
      line: 0,
      description: "Ready to start Bubble Sort. Large elements will bubble up to the end."
    });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        s.push({
          arr: [...arr],
          i: i,
          j: j,
          swapping: false,
          sortedWall: n - i,
          line: 2,
          description: `Comparing A[${j}] and A[${j+1}].`
        });

        if (arr[j] > arr[j + 1]) {
          s.push({
            arr: [...arr],
            i: i,
            j: j,
            swapping: true,
            sortedWall: n - i,
            line: 4,
            description: `${arr[j]} > ${arr[j+1]}, so we swap them.`
          });
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
      s.push({
        arr: [...arr],
        i: i,
        j: -1,
        swapping: false,
        sortedWall: n - 1 - i,
        line: 0,
        description: `Pass ${i+1} complete. ${arr[n - 1 - i]} has bubbled to its position.`
      });
    }

    s.push({
      arr: [...arr],
      i: n - 1,
      j: -1,
      swapping: false,
      sortedWall: 0,
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
      }, 800);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];
  const code = [
    "for i = 0 to n-2 do",
    "  for j = 0 to n-2-i do",
    "    if A[j+1] < A[j]",
    "      swap A[j] and A[j+1]"
  ];

  const actions = (
    <div className={styles.tracerActions}>
      <button className={styles.btnOutline} onClick={() => { setCurrentStepIdx(0); setIsPlaying(false); }}>Reset</button>
      <button className={styles.btnOutline} onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}>Prev</button>
      <button className={styles.btnPrimary} onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button className={styles.btnOutline} onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))}>Next</button>
    </div>
  );

  return (
    <VisualStage style={style} title="Bubble Sort Tracer" description={step.description} actions={actions}>
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
              if (idx >= step.sortedWall) state = styles.sorted;
              else if (idx === step.j || idx === step.j + 1) {
                state = step.swapping ? styles.minimum : styles.comparing;
              }

              return (
                <div key={idx} className="flex items-center">
                  <div className={`${styles.box} ${state}`}>
                    {val}
                  </div>
                  {idx === step.sortedWall - 1 && <div className={styles.sortedWall} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default BubbleSortTracer;
