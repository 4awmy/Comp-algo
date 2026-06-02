import React, { useState, useEffect, useRef } from 'react';
import MathBlock from '../../ui/Premium/MathBlock';
import styles from './Bespoke.module.css';

const ClosestPairTracer = () => {
  const [points, setPoints] = useState([
    { x: 30, y: 40, id: 1 },
    { x: 70, y: 80, id: 2 },
    { x: 120, y: 50, id: 3 },
    { x: 160, y: 150, id: 4 },
    { x: 220, y: 60, id: 5 },
    { x: 250, y: 120, id: 6 },
  ]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [compareIndex, setCompareIndex] = useState(-1);
  const [minDist, setMinDist] = useState(Infinity);
  const [bestPair, setBestPair] = useState(null);
  const [currentDist, setCurrentDist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);

  const totalSteps = (points.length * (points.length - 1)) / 2;

  const calculateDist = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  useEffect(() => {
    let timer;
    if (isPlaying && step < totalSteps) {
      timer = setTimeout(() => {
        nextStep();
      }, 800);
    } else if (step >= totalSteps) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step]);

  const nextStep = () => {
    let count = 0;
    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (count === step) {
          setActiveIndex(i);
          setCompareIndex(j);
          const d = calculateDist(points[i], points[j]);
          setCurrentDist(d);
          if (d < minDist) {
            setMinDist(d);
            setBestPair([i, j]);
          }
          setStep(s => s + 1);
          return;
        }
        count++;
      }
    }
  };

  const reset = () => {
    setStep(0);
    setActiveIndex(-1);
    setCompareIndex(-1);
    setMinDist(Infinity);
    setBestPair(null);
    setCurrentDist(null);
    setIsPlaying(false);
  };

  return (
    <div className={styles.tracerContainer}>
      <div className={styles.tracerGrid}>
        <div className={styles.tracerCodePane}>
          <div className={styles.codeHeader}>Brute Force Closest Pair</div>
          <pre className={styles.codeBlock}>
{`d = infinity
for i = 0 to n-2:
  for j = i+1 to n-1:
    d = min(d, dist(P[i], P[j]))
return d`}
          </pre>
          <div className={styles.scoreboard}>
            <div className={styles.scoreItem}>
              <span className={styles.scoreLabel}>Current Dist:</span>
              <span className={styles.scoreValue}>{currentDist ? currentDist.toFixed(2) : '-'}</span>
            </div>
            <div className={styles.scoreItem}>
              <span className={styles.scoreLabel}>Min Dist:</span>
              <span className={styles.scoreValue} style={{ color: 'var(--color-success)' }}>
                {minDist === Infinity ? '∞' : minDist.toFixed(2)}
              </span>
            </div>
          </div>
          <div className={styles.controls}>
            <button className={styles.controlBtn} onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? 'Pause' : 'Start Animation'}
            </button>
            <button className={styles.controlBtn} onClick={reset}>Reset</button>
          </div>
        </div>

        <div className={styles.tracerVisualPane}>
          <svg className={styles.cartesianPlane} viewBox="0 0 300 200">
            {/* Grid lines */}
            {[...Array(7)].map((_, i) => (
              <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="200" stroke="var(--border-subtle)" strokeWidth="0.5" />
            ))}
            {[...Array(5)].map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 50} x2="300" y2={i * 50} stroke="var(--border-subtle)" strokeWidth="0.5" />
            ))}

            {/* Connection line */}
            {activeIndex !== -1 && compareIndex !== -1 && (
              <line 
                x1={points[activeIndex].x} y1={points[activeIndex].y}
                x2={points[compareIndex].x} y2={points[compareIndex].y}
                stroke="var(--accent-purple)"
                strokeWidth="2"
                strokeDasharray="4 2"
                className={styles.animateLine}
              />
            )}

            {/* Best pair line */}
            {bestPair && (
              <line 
                x1={points[bestPair[0]].x} y1={points[bestPair[0]].y}
                x2={points[bestPair[1]].x} y2={points[bestPair[1]].y}
                stroke="var(--color-success)"
                strokeWidth="3"
                opacity="0.5"
              />
            )}

            {/* Points */}
            {points.map((p, i) => (
              <circle 
                key={p.id}
                cx={p.x} cy={p.y} r="6"
                fill={i === activeIndex ? 'var(--accent-blue)' : i === compareIndex ? 'var(--color-warning)' : 'var(--text-muted)'}
                className={i === activeIndex || i === compareIndex ? styles.pulsePoint : ''}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ClosestPairTracer;
