import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

/**
 * EuclidTracer - Visualizes Euclid's GCD algorithm using the modulo approach.
 * Featured in Lec 01: Introduction.
 */
const EuclidTracer = ({ style }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    let m = 60;
    let n = 24;

    s.push({
      m, n, r: null,
      formula: `gcd(${m}, ${n})`,
      description: `Starting Euclid's algorithm with m = ${m} and n = ${n}.`
    });

    while (n !== 0) {
      const r = m % n;
      s.push({
        m, n, r,
        formula: `${m} \\pmod{${n}} = ${r}`,
        description: `Compute the remainder of ${m} divided by ${n}.`
      });

      const oldN = n;
      m = n;
      n = r;

      s.push({
        m, n, r: null,
        formula: `gcd(${oldN}, ${r})`,
        description: `Replace m with n (${oldN}) and n with the remainder (${r}).`
      });
    }

    s.push({
      m, n, r: null,
      formula: `gcd = ${m}`,
      description: `Since n is 0, the GCD is m = ${m}.`
    });

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <button 
        className="btn btn-outline btn-sm"
        onClick={() => {
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }}
        disabled={currentStepIdx === 0}
      >
        Reset
      </button>
      <button 
        className="btn btn-primary btn-sm"
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ minWidth: '80px' }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button 
        className="btn btn-outline btn-sm"
        onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))}
        disabled={currentStepIdx === steps.length - 1}
      >
        Next
      </button>
    </div>
  );

  return (
    <VisualStage style={style} 
      title="Euclid's GCD Algorithm" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.euclidContainer}>
        <div className={styles.gcdDisplay}>
          <div className={styles.numberCol}>
            <div 
              className={`${styles.numberBar} ${styles.mBar}`}
              style={{ height: `${step.m * 2 + 40}px` }}
            >
              {step.m}
            </div>
            <span className={styles.label}>m</span>
          </div>

          <div className={styles.numberCol}>
            <div 
              className={`${styles.numberBar} ${styles.nBar}`}
              style={{ height: `${step.n * 2 + 40}px` }}
            >
              {step.n}
            </div>
            <span className={styles.label}>n</span>
          </div>

          {step.r !== null && (
            <div className={styles.numberCol}>
              <div 
                className={`${styles.numberBar} ${styles.rBar}`}
                style={{ height: `${step.r * 2 + 40}px` }}
              >
                {step.r}
              </div>
              <span className={styles.label}>r</span>
            </div>
          )}
        </div>

        <div className={styles.euclidFormula}>
          {step.formula}
        </div>

        <div className={styles.stepInfo}>
          <span className={styles.label}>Step {currentStepIdx + 1} of {steps.length}</span>
        </div>
      </div>
    </VisualStage>
  );
};

export default EuclidTracer;
