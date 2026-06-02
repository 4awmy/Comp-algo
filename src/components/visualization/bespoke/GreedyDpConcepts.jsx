import React, { useState, useEffect } from 'react';
import styles from './Bespoke.module.css';

export const CoinRowMetaphor = () => {
  const [active, setActive] = useState([]);
  const coins = [5, 1, 2, 10, 6, 2];

  const toggle = (i) => {
    if (active.includes(i)) {
      setActive(active.filter(x => x !== i));
    } else {
      // Rule: no adjacent
      if (!active.includes(i-1) && !active.includes(i+1)) {
        setActive([...active, i]);
      }
    }
  };

  const currentSum = active.reduce((acc, i) => acc + coins[i], 0);

  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>The Coin-Row Problem</div>
       <div className={styles.coinRowStage}>
          {coins.map((c, i) => (
            <div 
              key={i} 
              className={`${styles.coin} ${active.includes(i) ? styles.activeCoin : ''}`}
              onClick={() => toggle(i)}
            >
              {c}
            </div>
          ))}
       </div>
       <div className={styles.peasantResult}>
          Current Total: <span className={styles.finalSum}>{currentSum}</span>
          <p className={styles.metaphorText} style={{marginTop: '0.5rem'}}>
             Constraint: You cannot pick two adjacent coins. Try to find the maximum possible sum (Solution: 5 + 10 + 2 = 17).
          </p>
       </div>
    </div>
  );
};

export const GreedyVsDpMetaphor = () => {
  return (
    <div className={styles.gridTwoCol}>
       <div className={styles.caseBox}>
          <h4>Greedy Mindset</h4>
          <div className={styles.pipelineContent}>"Take the best NOW."</div>
          <div className={styles.greedyVisual}>
             <div className={styles.greedyStep}>Step 1: Big Profit! 💰</div>
             <div className={styles.greedyStep} style={{opacity: 0.5}}>Step 2: No more options... 🪹</div>
          </div>
          <p className={styles.metaphorText}>Short-sighted. May miss the global optimum.</p>
       </div>
       <div className={styles.caseBox}>
          <h4>DP Mindset</h4>
          <div className={styles.pipelineContent}>"Consider all futures."</div>
          <div className={styles.dpVisual}>
             <div className={styles.dpLayer}>Option A: 💎</div>
             <div className={styles.dpLayer}>Option B: 💎💎</div>
          </div>
          <p className={styles.metaphorText}>Exhaustive yet efficient due to reuse.</p>
       </div>
    </div>
  );
};

export const HuffmanMetaphor = () => {
  return (
    <div className={styles.metaphorContainer}>
       <div className={styles.metaphorLabel}>Huffman Encoding (Compression)</div>
       <div className={styles.huffmanGrid}>
          <div className={styles.huffmanBox}>
             <div className={styles.pillarTitle}>Fixed Length</div>
             <div className={styles.codeBlock}>A: 00, B: 01, C: 10, D: 11</div>
             <p className={styles.metaphorText}>Always 2 bits per char.</p>
          </div>
          <div className={styles.huffmanBox}>
             <div className={styles.pillarTitle}>Variable Length</div>
             <div className={styles.codeBlock}>A: 0, B: 10, C: 110, D: 111</div>
             <p className={styles.metaphorText}>Frequent chars (A) get shorter codes!</p>
          </div>
       </div>
    </div>
  );
};
