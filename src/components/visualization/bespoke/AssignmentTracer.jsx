import React, { useState } from 'react';
import MathBlock from '../../ui/Premium/MathBlock';
import styles from './Bespoke.module.css';

const AssignmentTracer = () => {
  const persons = ['P1', 'P2', 'P3'];
  const jobs = ['J1', 'J2', 'J3'];
  const costMatrix = [
    [9, 2, 7],
    [6, 4, 3],
    [5, 8, 1],
  ];

  const [assignments, setAssignments] = useState([-1, -1, -1]); // Index of job for each person
  const [hovered, setHovered] = useState(null);

  const toggleAssignment = (personIdx, jobIdx) => {
    const newAssignments = [...assignments];
    if (newAssignments[personIdx] === jobIdx) {
      newAssignments[personIdx] = -1;
    } else {
      // Unassign job from anyone else first
      newAssignments.forEach((job, i) => {
        if (job === jobIdx) newAssignments[i] = -1;
      });
      newAssignments[personIdx] = jobIdx;
    }
    setAssignments(newAssignments);
  };

  const calculateTotal = () => {
    return assignments.reduce((acc, jobIdx, personIdx) => {
      if (jobIdx === -1) return acc;
      return acc + costMatrix[personIdx][jobIdx];
    }, 0);
  };

  const totalCost = calculateTotal();
  const allAssigned = assignments.every(a => a !== -1);

  return (
    <div className={styles.tracerContainer}>
      <div className={styles.tracerGrid}>
        <div className={styles.tracerCodePane}>
          <div className={styles.codeHeader}>Assignment Problem</div>
          <p className={styles.conceptText} style={{ fontSize: '12px' }}>
            Find a one-to-one mapping between persons and jobs that minimizes total cost. Exhaustive search checks all <i>n!</i> permutations.
          </p>
          <div className={styles.matrixContainer}>
            <div className={styles.matrixGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className={styles.matrixCell}></div>
              {jobs.map(j => <div key={j} className={styles.scoreLabel} style={{ textAlign: 'center' }}>{j}</div>)}
              {costMatrix.map((row, i) => (
                <React.Fragment key={i}>
                  <div className={styles.scoreLabel}>{persons[i]}</div>
                  {row.map((cost, j) => (
                    <div 
                      key={j} 
                      className={`${styles.matrixCell} ${assignments[i] === j ? styles.matrixActive : ''}`}
                      onClick={() => toggleAssignment(i, j)}
                      onMouseEnter={() => setHovered({ i, j })}
                      onMouseLeave={() => setHovered(null)}
                      style={{ cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}
                    >
                      {cost}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className={styles.scoreboard}>
            <div className={styles.scoreItem}>
              <span className={styles.scoreLabel}>Total Cost:</span>
              <span className={styles.scoreValue} style={{ color: allAssigned ? 'var(--color-success)' : 'var(--accent-blue)' }}>
                {totalCost}
              </span>
            </div>
            {allAssigned && totalCost === 10 && (
              <div style={{ color: 'var(--color-success)', fontSize: '10px', marginTop: '5px', fontWeight: 'bold' }}>
                OPTIMAL SOLUTION FOUND! (P1→J2, P2→J1, P3→J3)
              </div>
            )}
          </div>
        </div>

        <div className={styles.tracerVisualPane}>
          <div className={styles.bipartiteContainer} style={{ width: '100%', position: 'relative' }}>
            <div className={styles.nodeColumn}>
              {persons.map((p, i) => (
                <div key={p} className={`${styles.node} ${assignments[i] !== -1 ? styles.nodeActive : ''}`}>{p}</div>
              ))}
            </div>

            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {assignments.map((jobIdx, personIdx) => {
                if (jobIdx === -1) return null;
                const y1 = personIdx * 60 + 40;
                const y2 = jobIdx * 60 + 40;
                return (
                  <line 
                    key={personIdx}
                    x1="40" y1={y1} x2="calc(100% - 40)" y2={y2}
                    stroke="var(--accent-blue)" strokeWidth="2"
                  />
                );
              })}
            </svg>

            <div className={styles.nodeColumn}>
              {jobs.map((j, i) => (
                <div key={j} className={`${styles.node} ${assignments.includes(i) ? styles.nodeActive : ''}`}>{j}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentTracer;
