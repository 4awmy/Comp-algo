import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const TEXT = "JIM_SAW_A_BARBER_IN_ALASKA";
const PATTERN = "BARBER";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_".split("");

const SEARCH_CODE = [
  "ALGORITHM HorspoolPatternMatching(T[0..n-1], P[0..m-1])",
  "// Precomputes the Shift Table",
  "t <- ShiftTable(P)",
  "i <- m - 1 // Align pattern tail",
  "while i <= n - 1 do",
  "  k <- 0 // Number of matched chars",
  "  while k <= m - 1 and P[m - 1 - k] == T[i - k] do",
  "    k <- k + 1",
  "  if k == m return i - m + 1 // Found match",
  "  else i <- i + t[T[i]] // Shift pattern",
  "return -1"
];

const TABLE_CODE = [
  "ALGORITHM ShiftTable(P[0..m-1])",
  "// Precomputes pattern shift distances",
  "Initialize table t with pattern length m",
  "for i <- 0 to m - 2 do",
  "  t[P[i]] <- m - 1 - i",
  "return t"
];

/**
 * HorspoolTracer - Visualizes Horspool's String Matching Algorithm.
 */
const HorspoolTracer = ({ style }) => {
  const [view, setView] = useState('search'); // 'table' or 'search'
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

    // Step 0: Initial alignment
    const initialText = TEXT.split("");
    const initialPattern = Array(n).fill(null);
    for (let j = 0; j < m; j++) {
      initialPattern[i - m + 1 + j] = PATTERN[j];
    }
    steps.push({
      i,
      k: 0,
      text: initialText,
      pattern: initialPattern,
      matched: false,
      comparisonIndex: -1,
      mismatchChar: null,
      shift: 0,
      line: 3, // i <- m - 1
      description: `Initialize alignment pointer i to the end of the pattern: i = ${i} (character '${TEXT[i]}').`
    });

    while (i <= n - 1) {
      // Loop condition check
      const currentPattern = Array(n).fill(null);
      for (let j = 0; j < m; j++) {
        currentPattern[i - m + 1 + j] = PATTERN[j];
      }

      steps.push({
        i,
        k: 0,
        text: TEXT.split(""),
        pattern: [...currentPattern],
        matched: false,
        comparisonIndex: -1,
        mismatchChar: null,
        shift: 0,
        line: 4, // while i <= n - 1 do
        description: `Check if pattern alignment index i = ${i} is within text boundary (i <= ${n - 1}).`
      });

      let k = 0;
      let mismatch = false;

      // Compare characters from right to left
      while (k <= m - 1) {
        const textIdx = i - k;
        const patternChar = PATTERN[m - 1 - k];
        const textChar = TEXT[textIdx];
        const isMatch = patternChar === textChar;

        steps.push({
          i,
          k,
          text: TEXT.split(""),
          pattern: [...currentPattern],
          matched: false,
          comparisonIndex: textIdx,
          mismatchChar: isMatch ? null : textChar,
          shift: 0,
          line: 6, // while k <= m - 1 and ...
          description: `Compare pattern P[${m - 1 - k}] = '${patternChar}' with text T[${textIdx}] = '${textChar}'.`
        });

        if (isMatch) {
          k++;
        } else {
          mismatch = true;
          break;
        }
      }

      const lastCharInText = TEXT[i];
      const shift = shiftTable[lastCharInText] || m;

      if (!mismatch && k === m) {
        steps.push({
          i,
          k,
          text: TEXT.split(""),
          pattern: [...currentPattern],
          matched: true,
          comparisonIndex: -1,
          mismatchChar: null,
          shift: 0,
          line: 8, // if k == m return ...
          description: `All ${m} characters matched! Pattern found at index ${i - m + 1}.`
        });
        break;
      } else {
        steps.push({
          i,
          k,
          text: TEXT.split(""),
          pattern: [...currentPattern],
          matched: false,
          comparisonIndex: i - k,
          mismatchChar: TEXT[i - k],
          shift,
          line: 9, // else i <- i + t[T[i]]
          description: `Mismatch! The text character aligned with pattern end is T[${i}] = '${lastCharInText}'. Shift pattern forward by shiftTable['${lastCharInText}'] = ${shift} slots.`
        });
        i += shift;
      }
    }

    if (i > n - 1) {
      steps.push({
        i,
        k: 0,
        text: TEXT.split(""),
        pattern: Array(n).fill(null),
        matched: false,
        comparisonIndex: -1,
        mismatchChar: null,
        shift: 0,
        line: 10, // return -1
        description: "Pattern alignment pointer exceeded text length. Search completed with no match found."
      });
    }

    return steps;
  }, [shiftTable]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < searchSteps.length - 1 && view === 'search') {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1500);
    } else if (currentStepIdx === searchSteps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, searchSteps.length, view]);

  const step = searchSteps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <button 
        className={`btn btn-sm ${view === 'table' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => { setView('table'); setIsPlaying(false); }}
      >
        Shift Table
      </button>
      <button 
        className={`btn btn-sm ${view === 'search' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => { setView('search'); setCurrentStepIdx(0); setIsPlaying(false); }}
      >
        Search Process
      </button>
      {view === 'search' && (
        <>
          <div className="divider divider-horizontal mx-2"></div>
          <button className="btn btn-outline btn-sm" onClick={() => { setCurrentStepIdx(0); setIsPlaying(false); }} disabled={currentStepIdx === 0}>Reset</button>
          <button className="btn btn-outline btn-sm" onClick={() => { setCurrentStepIdx(prev => Math.max(0, prev - 1)); setIsPlaying(false); }} disabled={currentStepIdx === 0}>Prev</button>
          <button className="btn btn-primary btn-sm" onClick={() => setIsPlaying(!isPlaying)} disabled={currentStepIdx === searchSteps.length - 1 && !isPlaying}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => { setCurrentStepIdx(prev => Math.min(searchSteps.length - 1, prev + 1)); setIsPlaying(false); }} disabled={currentStepIdx === searchSteps.length - 1}>Next</button>
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
      <div className={styles.dualPane}>
        {/* Code Pane */}
        <div className={styles.codePane}>
          <div className={styles.codeHeader}>
            {view === 'table' ? "Shift Table Construction" : "Search Algorithm"}
          </div>
          {view === 'table' ? (
            TABLE_CODE.map((lineText, idx) => (
              <span key={idx} className={`${styles.codeLine} ${idx === 4 ? styles.codeLineActive : ''}`}>
                {lineText}
              </span>
            ))
          ) : (
            SEARCH_CODE.map((lineText, idx) => (
              <span key={idx} className={`${styles.codeLine} ${step.line === idx ? styles.codeLineActive : ''}`}>
                {lineText}
              </span>
            ))
          )}
        </div>

        {/* Visual Pane */}
        <div className={styles.vizPane} style={{ padding: '1.5rem', minHeight: '300px' }}>
          {view === 'table' ? (
            <div className={styles.horspoolContainer} style={{ width: '100%' }}>
              <div className={styles.shiftTable} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ALPHABET.filter(c => PATTERN.includes(c) || c === 'O').map(char => (
                  <div key={char} className={styles.shiftItem}>
                    <span className={styles.shiftChar}>{char === 'O' ? 'Other' : char}</span>
                    <span className={styles.shiftVal}>{char === 'O' ? PATTERN.length : shiftTable[char]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted/20 border border-subtle rounded-md text-xs text-left leading-relaxed">
                <strong>Shift Table Computation Details:</strong>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li><strong>Formula:</strong> $t(c) = m - 1 - i$ for the rightmost occurrence of character $c$ in the first $m-1$ characters of the pattern.</li>
                  <li>For letters not in the first $m-1$ characters, shift distance is pattern length $m = 6$.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className={styles.horspoolContainer} style={{ width: '100%' }}>
              <div className={styles.searchStage}>
                <div className={styles.textRow} style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', paddingTop: '22px' }}>
                  {TEXT.split("").map((char, idx) => {
                    let status = '';
                    const isUnderPattern = idx > step.i - PATTERN.length && idx <= step.i;
                    if (isUnderPattern) {
                      if (idx > step.comparisonIndex) status = styles.match;
                      if (idx === step.comparisonIndex) {
                        status = step.mismatchChar ? styles.mismatch : styles.match;
                      }
                    }
                    
                    return (
                      <div key={idx} className={`${styles.charBox} ${styles.textChar} ${status}`} style={{ position: 'relative' }}>
                        {char === '_' ? '␣' : char}
                        <span style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>[{idx}]</span>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.patternRow} style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2rem' }}>
                  {step.pattern.map((char, idx) => {
                    let status = '';
                    if (char) {
                      status = styles.patternChar;
                      if (idx === step.i) status = `${styles.patternChar} ${styles.active}`;
                    }
                    return (
                      <div key={idx} className={`${styles.charBox} ${status}`} style={{ opacity: char ? 1 : 0 }}>
                        {char === '_' ? '␣' : char}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-subtle text-xs flex justify-between text-muted-foreground">
                <span>Alignment Range: <strong>{step.i - PATTERN.length + 1} to {step.i}</strong></span>
                {step.shift > 0 && <span>Next skip distance: <strong className="text-primary">{step.shift} slots</strong></span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </VisualStage>
  );
};

export default HorspoolTracer;
