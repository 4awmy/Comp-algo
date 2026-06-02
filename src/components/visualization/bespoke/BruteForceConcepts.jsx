import styles from './Bespoke.module.css';

export const PillarsInfographic = () => {
  const pillars = [
    { icon: '💡', title: 'Simple', text: 'Directly follows the problem definition without complex optimizations.' },
    { icon: '🔍', title: 'Exhaustive', text: 'Systematically explores the entire search space to leave no stone unturned.' },
    { icon: '✅', title: 'Guaranteed', text: 'Will always find the correct solution if one exists within the search space.' },
    { icon: '🐢', title: 'Inefficient', text: 'Usually the slowest approach, often exponential for combinatorial problems.' }
  ];

  return (
    <div className={styles.pillarsGrid}>
      {pillars.map((p, i) => (
        <div key={i} className={styles.pillar}>
          <div className={styles.pillarIcon}>{p.icon}</div>
          <div className={styles.pillarTitle}>{p.title}</div>
          <div className={styles.pillarText}>{p.text}</div>
        </div>
      ))}
    </div>
  );
};

export const MindsetVisual = () => {
  return (
    <div className={styles.mindsetComparison}>
      <div className={styles.mindsetBox}>
        <div className={styles.pillarTitle}>Combinatorial Search</div>
        <div className={styles.combinationLock}>
          {[9, 2, 7].map((d, i) => (
            <div key={i} className={styles.lockDigit}>{d}</div>
          ))}
        </div>
        <div className={styles.pillarText}>Trying all 000-999 combinations</div>
      </div>
      <div className={styles.mindsetBox}>
        <div className={styles.pillarTitle}>Exhaustive Scan</div>
        <div className={styles.gridScan}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className={`${styles.gridCell} ${i === 12 ? styles.gridCellActive : ''}`} />
          ))}
        </div>
        <div className={styles.pillarText}>Checking every pixel/coordinate</div>
      </div>
    </div>
  );
};

export const SweetSpotMatrix = () => {
  return (
    <div className={styles.sweetSpotMatrix}>
      <div />
      <div className={styles.matrixLabelX}>Small Input</div>
      <div className={styles.matrixLabelX}>Large Input</div>
      <div className={styles.matrixLabelY}>No Known Algo</div>
      <div className={`${styles.matrixQuadrant} ${styles.highlight}`}>
        <div className={styles.matrixTitle}>THE SWEET SPOT</div>
        <div className={styles.matrixDesc}>Use Brute Force here for speed and simplicity.</div>
      </div>
      <div className={styles.matrixQuadrant}>
        <div className={styles.matrixTitle}>Last Resort</div>
        <div className={styles.matrixDesc}>Only if accuracy is non-negotiable.</div>
      </div>
      <div className={styles.matrixLabelY}>Faster Algo Exists</div>
      <div className={styles.matrixQuadrant}>
        <div className={styles.matrixTitle}>Educational</div>
        <div className={styles.matrixDesc}>Good for baseline/testing.</div>
      </div>
      <div className={styles.matrixQuadrant}>
        <div className={styles.matrixTitle}>Avoid</div>
        <div className={styles.matrixDesc}>Use Divide & Conquer or Greedy.</div>
      </div>
      <div />
      <div className={styles.matrixLabelX} />
      <div className={styles.matrixLabelX} />
    </div>
  );
};
