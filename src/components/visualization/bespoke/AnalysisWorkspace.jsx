import React, { useState, useEffect } from 'react';
import MathBlock from '../../ui/Premium/MathBlock';
import styles from './AnalysisWorkspace.module.css';

const AnalysisWorkspace = () => {
  const [n, setN] = useState(5);
  const [sigmaSum, setSigmaSum] = useState(0);
  const [sigmaSteps, setSigmaSteps] = useState([]);
  const [fibRecursiveCalls, setFibRecursiveCalls] = useState(0);
  const [fibIterativeSteps, setFibIterativeSteps] = useState(0);

  useEffect(() => {
    // Sigma Calculation
    let currentSum = 0;
    const steps = [];
    for (let i = 1; i < n; i++) {
      currentSum += i;
      steps.push(currentSum);
    }
    setSigmaSum(currentSum);
    setSigmaSteps(steps);

    // Fibonacci Calculation Counts
    // Recursive calls: T(n) = T(n-1) + T(n-2) + 1
    const countRecursive = (num) => {
      if (num <= 1) return 1;
      return countRecursive(num - 1) + countRecursive(num - 2) + 1;
    };
    
    // For n, iterative is n-1 additions
    setFibIterativeSteps(n <= 1 ? 0 : n - 1);
    
    // Limit n for recursive count to avoid hang
    if (n <= 25) {
      setFibRecursiveCalls(countRecursive(n));
    } else {
      setFibRecursiveCalls('Too many (> 200,000)');
    }
  }, [n]);

  return (
    <div className={styles.workspaceContainer}>
      <div className={styles.workspaceHeader}>
        <h3>Live Calculation Workspace</h3>
        <div className={styles.inputGroup}>
          <label htmlFor="n-input">Input Size (n): </label>
          <input 
            id="n-input"
            type="number" 
            value={n} 
            onChange={(e) => setN(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="40"
          />
        </div>
      </div>

      <div className={styles.workspaceGrid}>
        {/* Summation Section */}
        <div className={styles.analysisCard}>
          <h4>Summation Analysis</h4>
          <div className={styles.formulaDesc}>
            Evaluating <MathBlock math="\sum_{i=1}^{n-1} i" />
          </div>
          
          <div className={styles.summationVisual}>
            <div className={styles.stepsList}>
              {sigmaSteps.map((step, idx) => (
                <div key={idx} className={styles.stepItem}>
                  <span className={styles.stepIndex}>i={idx + 1}</span>
                  <div className={styles.stepBar} style={{ width: `${(step / sigmaSum) * 100}%` }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.resultBox}>
            <p>Total Operations: <strong>{sigmaSum}</strong></p>
            <MathBlock math={`\\frac{(${n}-1)${n}}{2} = ${sigmaSum}`} />
          </div>
        </div>

        {/* Fibonacci Comparison Section */}
        <div className={styles.analysisCard}>
          <h4>Recursion vs. Iteration</h4>
          <p className={styles.formulaDesc}>Fibonacci Work Units for $n={n}$</p>
          
          <div className={styles.comparisonVisual}>
            <div className={styles.comparisonRow}>
              <span className={styles.rowLabel}>Iterative</span>
              <div className={styles.barWrapper}>
                <div 
                  className={`${styles.compBar} ${styles.iterativeBar}`} 
                  style={{ width: '10%' }}
                >
                  {fibIterativeSteps}
                </div>
                <span className={styles.barUnit}>Additions</span>
              </div>
            </div>

            <div className={styles.comparisonRow}>
              <span className={styles.rowLabel}>Recursive</span>
              <div className={styles.barWrapper}>
                <div 
                  className={`${styles.compBar} ${styles.recursiveBar}`} 
                  style={{ 
                    width: typeof fibRecursiveCalls === 'number' 
                      ? `${Math.min(100, (fibRecursiveCalls / (fibIterativeSteps || 1)) * 5)}%` 
                      : '100%' 
                  }}
                >
                  {fibRecursiveCalls}
                </div>
                <span className={styles.barUnit}>Function Calls</span>
              </div>
            </div>
          </div>

          <div className={styles.infoNote}>
            {n > 15 && <p>Notice how the recursive calls grow exponentially compared to the linear growth of iterative additions.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisWorkspace;
