import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const TEXT = "ABRA CADABRA";
const PATTERN = "CAD";

const StringMatchTracer = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    const n = TEXT.length;
    const m = PATTERN.length;

    s.push({
      i: 0,
      j: -1,
      match: false,
      line: 0,
      description: "String Matching aligns the pattern with the text and compares character by character."
    });

    for (let i = 0; i <= n - m; i++) {
      for (let j = 0; j < m; j++) {
        const isMatch = TEXT[i + j] === PATTERN[j];
        s.push({
          i: i,
          j: j,
          match: isMatch,
          line: 2,
          description: `Comparing Text[${i+j}] ('${TEXT[i+j]}') with Pattern[${j}] ('${PATTERN[j]}').`
        });

        if (!isMatch) {
          s.push({
            i: i,
            j: j,
            match: false,
            line: 4,
            description: "Mismatch found. Shifting pattern by one."
          });
          break;
        }

        if (j === m - 1) {
          s.push({
            i: i,
            j: j,
            match: true,
            line: 3,
            description: "Full match found!"
          });
          return s; // Stop at first match
        }
      }
    }

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
    "for i = 0 to n-m do",
    "  j = 0",
    "  while j < m and P[j] == T[i+j] do",
    "    j = j + 1",
    "  if j == m return i",
    "return -1"
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
    <VisualStage title="String Match Ruler" description={step.description} actions={actions}>
      <div className={styles.dualPane}>
        <div className={styles.codePane}>
          {code.map((line, idx) => (
            <span key={idx} className={`${styles.codeLine} ${step.line === idx ? styles.codeLineActive : ''}`}>
              {line}
            </span>
          ))}
        </div>
        <div className={styles.vizPane}>
          <div className={styles.rulerContainer}>
            <div className={styles.textTrack}>
              {TEXT.split('').map((char, idx) => {
                let state = '';
                if (idx >= step.i && idx <= step.i + step.j) {
                  state = step.match ? styles.match : styles.mismatch;
                }
                return (
                  <div key={idx} className={`${styles.charBox} ${state}`}>
                    {char === ' ' ? '\u00A0' : char}
                  </div>
                );
              })}
            </div>
            <div 
              className={styles.patternSlider} 
              style={{ left: `${step.i * 34 + 4}px` }}
            >
              <div className={styles.rulerArrow}>▾</div>
              {PATTERN.split('').map((char, idx) => (
                <div key={idx} className={`${styles.charBox} ${styles.patternChar} ${idx === step.j ? styles.active : ''}`}>
                  {char}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default StringMatchTracer;
