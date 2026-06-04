import React, { useState, useEffect } from 'react';
import MathBlock from '../../ui/Premium/MathBlock';
import styles from './Bespoke.module.css';

export const TNMatrixVisual = ({ style }) => {
  const n = 6;
  return (
    <div className={styles.conceptBox} style={style}>
      <h4 className={styles.conceptTitle}>Deriving T(n) for Exhaustive Search</h4>
      <p className={styles.conceptText}>
        The number of comparisons in the closest-pair problem corresponds to the number of pairs in a set of size <i>n</i>. This is equivalent to filling the upper-right triangle of an <i>n x n</i> matrix.
      </p>
      <div className={styles.matrixContainer}>
        <div className={styles.matrixGrid} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {[...Array(n * n)].map((_, i) => {
            const row = Math.floor(i / n);
            const col = i % n;
            const isActive = col > row;
            return (
              <div 
                key={i} 
                className={`${styles.matrixCell} ${isActive ? styles.matrixActive : styles.matrixEmpty}`}
              >
                {isActive ? '•' : ''}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.formulaOverlay}>
        <MathBlock math="T(n) = \sum_{i=0}^{n-2} \sum_{j=i+1}^{n-1} 1 = \frac{n(n-1)}{2} \in \Theta(n^2)" />
      </div>
    </div>
  );
};

export const KeyringMetaphor = ({ style }) => {
  const [activeKey, setActiveKey] = useState(-1);
  const [successKey, setSuccessKey] = useState(7);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let timer;
    if (isSearching && activeKey < successKey) {
      timer = setTimeout(() => {
        setActiveKey(prev => prev + 1);
      }, 300);
    } else {
      setIsSearching(false);
    }
    return () => clearTimeout(timer);
  }, [isSearching, activeKey]);

  return (
    <div className={styles.conceptBox} style={style}>
      <h4 className={styles.conceptTitle}>The Keyring Metaphor</h4>
      <p className={styles.conceptText}>
        Brute force is like trying every key on a keyring until one opens the lock. It's guaranteed to work, but the time taken depends on the number of keys.
      </p>
      <div className={styles.keyringVisual}>
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`${styles.keyIcon} ${activeKey === i ? styles.keyActive : ''} ${activeKey > i ? styles.keyChecked : ''} ${activeKey === successKey && i === successKey ? styles.keySuccess : ''}`}
          >
            🔑
          </div>
        ))}
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${(Math.max(0, activeKey) / 11) * 100}%` }}></div>
      </div>
      <button className={styles.controlBtn} onClick={() => { setActiveKey(-1); setIsSearching(true); }}>
        Try Keys
      </button>
    </div>
  );
};

export const NPHardSpeedometer = ({ style }) => {
  const [n, setN] = useState(5);
  const complexity = Math.pow(2, n);
  const maxComplexity = Math.pow(2, 25);
  const angle = (n / 25) * 180 - 90;

  return (
    <div className={styles.conceptBox} style={style}>
      <h4 className={styles.conceptTitle}>The NP-Hard Speedometer</h4>
      <p className={styles.conceptText}>
        Exponential growth <MathBlock math="2^n" /> starts slow but quickly becomes astronomical. At <MathBlock math="n=20" />, most brute-force solvers begin to stall.
      </p>
      <div className={styles.speedometerContainer}>
        <div className={styles.gauge}>
          <div className={styles.gaugeNeedle} style={{ transform: `rotate(${angle}deg)` }}></div>
          <div className={styles.gaugeLabels}>
            <span>n=1</span>
            <span>n=10</span>
            <span>n=20</span>
            <span style={{ color: 'var(--color-error)' }}>n=30+</span>
          </div>
        </div>
        <div className={styles.gaugeData}>
          <div className={styles.dataPoint}>
            <span className={styles.dataLabel}>Input Size (n):</span>
            <input 
              type="range" min="1" max="30" value={n} 
              onChange={(e) => setN(parseInt(e.target.value))}
              className={styles.rangeInput}
            />
            <span className={styles.dataValue}>{n}</span>
          </div>
          <div className={styles.dataPoint}>
            <span className={styles.dataLabel}>Operations:</span>
            <span className={styles.dataValue} style={{ color: n > 20 ? 'var(--color-error)' : 'var(--accent-blue)' }}>
              {complexity.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExhaustiveSearchConcepts = () => {
  return (
    <div className={styles.conceptsGrid} style={style}>
      <TNMatrixVisual />
      <KeyringMetaphor />
      <NPHardSpeedometer />
    </div>
  );
};

export default ExhaustiveSearchConcepts;
