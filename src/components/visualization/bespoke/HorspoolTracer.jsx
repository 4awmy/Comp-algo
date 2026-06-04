import { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const TEXT = "JIM_SAW_A_BARBER_IN_ALASKA";
const PATTERN = "BARBER";

/**
 * HorspoolTracer - Visualizes Horspool's String Matching Algorithm.
 * Shows Shift Table construction and Search process.
 */
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_".split("");

const HorspoolTracer = ({ style }) => {
  const [view, setView] = useState('search'); // 'table' or 'search'
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const shiftTable = useMemo(() => {
    const table = {};
    const m = PATTERN.length;
    
    // Default shift is m
    ALPHABET.forEach(char => {
      table[char] = m;
    });

    // For first m-1 characters
    for (let i = 0; i < m - 1; i++) {
      table[PATTERN[i]] = m - 1 - i;
    }

    return table;
  }, []);

  const searchSteps = useMemo(() => {
    const steps = [];
    const n = TEXT.length;
    const m = PATTERN.length;
    let i = m - 1; // alignment index

    while (i <= n - 1) {
      let k = 0;
      const currentText = TEXT.split("");
      const currentPattern = Array(n).fill(null);
      
      // Compare pattern from right to left
      while (k <= m - 1 && PATTERN[m - 1 - k] === TEXT[i - k]) {
        k++;
      }

      // Record this alignment
      for (let j = 0; j < m; j++) {
        currentPattern[i - m + 1 + j] = PATTERN[j];
      }

      const lastCharInText = TEXT[i];
      const shift = shiftTable[lastCharInText] || m;
      
      steps.push({
        i,
        k,
        text: currentText,
        pattern: currentPattern,
        matched: k === m,
        comparisonIndex: i - k,
        mismatchChar: k === m ? null : TEXT[i],
        shift,
        description: k === m 
          ? `Found a match at index ${i - m + 1}!` 
          : `Mismatch! Character at end of alignment is '${TEXT[i]}'. Shift by table value: ${shift}.`
      });

      if (k === m) break;
      i += shift;
    }

    return steps;
  }, [shiftTable]);

  const step = searchSteps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <button 
        className={`btn btn-sm ${view === 'table' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => setView('table')}
      >
        Shift Table
      </button>
      <button 
        className={`btn btn-sm ${view === 'search' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => { setView('search'); setCurrentStepIdx(0); }}
      >
        Search Process
      </button>
      {view === 'search' && (
        <>
          <div className="divider divider-horizontal mx-2"></div>
          <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(0)} disabled={currentStepIdx === 0}>Reset</button>
          <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))} disabled={currentStepIdx === 0}>Prev</button>
          <button className="btn btn-primary btn-sm" onClick={() => setCurrentStepIdx(prev => Math.min(searchSteps.length - 1, prev + 1))} disabled={currentStepIdx === searchSteps.length - 1}>Next Shift</button>
        </>
      )}
    </div>
  );

  return (
    <VisualStage style={style}
      title={view === 'table' ? `Shift Table for "${PATTERN}"` : `Horspool Search: "${PATTERN}" in Text`}
      description={view === 'table' ? "The shift table determines how far to skip when a character at the end of the alignment is encountered." : step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        {view === 'table' ? (
          <div className={styles.horspoolContainer}>
            <div className={styles.shiftTable}>
              {ALPHABET.filter(c => PATTERN.includes(c) || c === 'O').map(char => (
                <div key={char} className={styles.shiftItem}>
                  <span className={styles.shiftChar}>{char === 'O' ? 'Other' : char}</span>
                  <span className={styles.shiftVal}>{char === 'O' ? PATTERN.length : shiftTable[char]}</span>
                </div>
              ))}
            </div>
            <div className={styles.stepInfo}>
              <p className={styles.description}>
                Rule: $t(c) = m - 1 - i$ for rightmost $c$ in first $m-1$ chars, else $m$.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.horspoolContainer}>
            <div className={styles.searchStage}>
              <div className={styles.textRow}>
                {TEXT.split("").map((char, idx) => {
                  let status = '';
                  const isUnderPattern = idx > step.i - PATTERN.length && idx <= step.i;
                  if (isUnderPattern) {
                    if (idx > step.i - step.k) status = styles.match;
                    if (idx === step.i - step.k && !step.matched) status = styles.mismatch;
                  }
                  
                  return (
                    <div key={idx} className={`${styles.charBox} ${styles.textChar} ${status}`}>
                      {char === '_' ? '␣' : char}
                    </div>
                  );
                })}
              </div>
              <div className={styles.patternRow}>
                {step.pattern.map((char, idx) => (
                  <div key={idx} className={`${styles.charBox} ${char ? styles.patternChar : ''} ${idx === step.i ? styles.active : ''}`} style={{ opacity: char ? 1 : 0 }}>
                    {char === '_' ? '␣' : char}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.stepInfo}>
              <p className={styles.description}>
                Current Alignment: Index {step.i - PATTERN.length + 1} to {step.i}
              </p>
            </div>
          </div>
        )}
      </div>
    </VisualStage>
  );
};

export default HorspoolTracer;
