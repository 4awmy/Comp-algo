import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

/**
 * SieveTracer - Visualizes the Sieve of Eratosthenes algorithm.
 * Featured in Lec 01: Introduction.
 */
const SieveTracer = ({ style }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const limit = 50;

  const steps = useMemo(() => {
    const s = [];
    const numbers = Array.from({ length: limit - 1 }, (_, i) => ({
      val: i + 2,
      isPrime: true,
      isEliminated: false,
    }));

    s.push({
      numbers: JSON.parse(JSON.stringify(numbers)),
      p: null,
      description: "Initialize a list of integers from 2 to 50. Assume all are prime initially.",
      activeIdx: -1,
      highlightIdxs: []
    });

    const maxP = Math.sqrt(limit);
    for (let p = 2; p <= maxP; p++) {
      const pIdx = p - 2;
      if (numbers[pIdx].isPrime) {
        s.push({
          numbers: JSON.parse(JSON.stringify(numbers)),
          p,
          description: `The next prime is ${p}. Now eliminate all multiples of ${p} starting from ${p * p}.`,
          activeIdx: pIdx,
          highlightIdxs: []
        });

        for (let i = p * p; i <= limit; i += p) {
          const mIdx = i - 2;
          if (numbers[mIdx].isPrime) {
            numbers[mIdx].isPrime = false;
            numbers[mIdx].isEliminated = true;
            s.push({
              numbers: JSON.parse(JSON.stringify(numbers)),
              p,
              description: `Eliminate ${i} as it is a multiple of ${p}.`,
              activeIdx: pIdx,
              highlightIdxs: [mIdx]
            });
          }
        }
      }
    }

    s.push({
      numbers: JSON.parse(JSON.stringify(numbers)),
      p: null,
      description: "Algorithm finished. The remaining (highlighted) numbers are all prime.",
      activeIdx: -1,
      highlightIdxs: []
    });

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 600);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.stepControls}>
      <button 
        className={`${styles.btnOutline} ${styles.btnSm}`}
        onClick={() => {
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }}
        disabled={currentStepIdx === 0}
      >
        Reset
      </button>
      <button 
        className={`${styles.btnPrimary} ${styles.btnSm}`}
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ minWidth: '80px' }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button 
        className={`${styles.btnOutline} ${styles.btnSm}`}
        onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))}
        disabled={currentStepIdx === steps.length - 1}
      >
        Next
      </button>
    </div>
  );

  return (
    <VisualStage style={style} 
      title="Sieve of Eratosthenes" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.sieveContainer}>
        <div className={styles.sieveGrid}>
          {step.numbers.map((num, idx) => {
            let stateClass = '';
            if (idx === step.activeIdx) stateClass = styles.current;
            else if (step.highlightIdxs.includes(idx)) stateClass = styles.highlight;
            else if (num.isEliminated) stateClass = styles.composite;
            else if (currentStepIdx === steps.length - 1 && num.isPrime) stateClass = styles.prime;

            return (
              <div key={num.val} className={`${styles.sieveCell} ${stateClass}`}>
                {num.val}
              </div>
            );
          })}
        </div>
        
        <div className={styles.stepInfo}>
          <span className={styles.label}>Step {currentStepIdx + 1} of {steps.length}</span>
        </div>
      </div>
    </VisualStage>
  );
};

export default SieveTracer;
