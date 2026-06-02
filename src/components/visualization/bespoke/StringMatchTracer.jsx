import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const TEXT = "ABRA KADABRA";
const PATTERN = "KADA";

/**
 * StringMatchTracer - A premium, standalone visualizer for Brute-force String Matching.
 * Optimized for Lecture 04 (Brute Force).
 */
const StringMatchTracer = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Pre-generate steps
  const steps = useMemo(() => {
    const s = [];
    const n = TEXT.length;
    const m = PATTERN.length;

    s.push({
      i: -1,
      j: -1,
      match: null,
      description: "Brute-force string matching slides the pattern along the text one position at a time and checks for a match."
    });

    for (let i = 0; i <= n - m; i++) {
      s.push({
        i: i,
        j: -1,
        match: null,
        description: `Align pattern at index ${i} of the text.`
      });

      let j = 0;
      while (j < m) {
        const isMatch = TEXT[i + j] === PATTERN[j];
        
        s.push({
          i: i,
          j: j,
          match: isMatch,
          description: `Compare pattern[${j}] ('${PATTERN[j]}') with text[${i + j}] ('${TEXT[i + j]}').`
        });

        if (!isMatch) break;
        j++;
      }

      if (j === m) {
        s.push({
          i: i,
          j: m - 1,
          match: true,
          found: true,
          description: `Match found starting at index ${i}!`
        });
        // We could break here or continue. For brute force we usually stop at first or find all.
        // Let's stop at first for simplicity.
        break;
      }
    }

    if (!s[s.length-1].found) {
      s.push({
        i: -1,
        j: -1,
        match: null,
        description: "Search complete. Pattern not found."
      });
    }

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
        className="btn btn-outline btn-sm"
        onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
        disabled={currentStepIdx === 0}
      >
        Prev
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
    <VisualStage 
      title="Brute-force String Matching" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <div className={styles.searchStage}>
          {/* Text Row */}
          <div className={styles.textRow}>
            {TEXT.split('').map((char, idx) => {
              let charClass = styles.charBox;
              if (step.i !== -1 && idx >= step.i && idx <= step.i + step.j) {
                if (idx === step.i + step.j) {
                  charClass += ` ${step.match ? styles.match : styles.mismatch}`;
                } else {
                  charClass += ` ${styles.match}`;
                }
              }
              if (step.found && idx >= step.i && idx < step.i + PATTERN.length) {
                charClass = `${styles.charBox} ${styles.match}`;
              }

              return (
                <div key={idx} className={charClass} style={{ minWidth: '32px' }}>
                  {char === ' ' ? '\u00A0' : char}
                </div>
              );
            })}
          </div>

          {/* Pattern Row */}
          <div 
            className={styles.patternRow}
            style={{ 
              marginLeft: step.i !== -1 ? `${step.i * 34}px` : '0',
              opacity: step.i !== -1 ? 1 : 0,
              transition: 'margin-left 0.5s ease'
            }}
          >
            {PATTERN.split('').map((char, idx) => {
              let charClass = `${styles.charBox} ${styles.patternChar}`;
              if (idx === step.j) {
                charClass += ` ${styles.active}`;
              } else if (idx < step.j) {
                charClass += ` ${styles.match}`;
              }

              return (
                <div key={idx} className={charClass} style={{ minWidth: '32px' }}>
                  {char}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className={styles.stepInfo}>
          <span className={styles.label}>Step {currentStepIdx + 1} of {steps.length}</span>
        </div>
      </div>
    </VisualStage>
  );
};

export default StringMatchTracer;
