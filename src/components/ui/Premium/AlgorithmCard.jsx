import React from 'react';
import styles from './Premium.module.css';
import MathBlock from './MathBlock';

const AlgorithmCard = ({ title, goal, steps, complexity }) => {
  return (
    <div className={styles.methodBox}>
      <h3 className={styles.sectionTitle} style={{ borderLeftColor: 'var(--accent-blue)', marginBottom: 'var(--space-4)' }}>
        {title}
      </h3>
      
      <p className={styles.editorialText} style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-6)' }}>
        <strong>Objective:</strong> {goal}
      </p>

      <div className={styles.infoCard} style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ color: 'var(--accent-blue)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-4)' }}>
          Algorithm Steps
        </h4>
        <ol style={{ paddingLeft: 'var(--space-6)', color: 'var(--text-primary)', lineHeight: '1.6' }}>
          {steps.map((step, index) => (
            <li key={index} style={{ marginBottom: 'var(--space-2)' }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Time Complexity</span>
          <span className={styles.equationText} style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
            <MathBlock math={complexity.time} inline />
          </span>
        </div>
        <div className={styles.statItem} style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 'var(--space-8)' }}>
          <span className={styles.statLabel}>Space Complexity</span>
          <span className={styles.equationText} style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>
            <MathBlock math={complexity.space} inline />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmCard;
