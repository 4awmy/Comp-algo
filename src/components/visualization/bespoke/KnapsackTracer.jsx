import React, { useState } from 'react';
import MathBlock from '../../ui/Premium/MathBlock';
import styles from './Bespoke.module.css';

const KnapsackTracer = () => {
  const items = [
    { id: 1, name: 'Item 1', weight: 2, value: 3, icon: '📦' },
    { id: 2, name: 'Item 2', weight: 3, value: 4, icon: '💎' },
    { id: 3, name: 'Item 3', weight: 4, value: 5, icon: '📚' },
    { id: 4, name: 'Item 4', weight: 5, value: 8, icon: '🎨' },
  ];

  const maxCapacity = 10;
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOverLimit, setIsOverLimit] = useState(false);

  const toggleItem = (item) => {
    const isSelected = selectedItems.find(i => i.id === item.id);
    let newSelection;
    if (isSelected) {
      newSelection = selectedItems.filter(i => i.id !== item.id);
    } else {
      newSelection = [...selectedItems, item];
    }
    
    const totalWeight = newSelection.reduce((acc, curr) => acc + curr.weight, 0);
    setSelectedItems(newSelection);
    setIsOverLimit(totalWeight > maxCapacity);
  };

  const currentWeight = selectedItems.reduce((acc, curr) => acc + curr.weight, 0);
  const currentValue = selectedItems.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className={styles.tracerContainer}>
      <div className={styles.knapsackContainer}>
        <div className={styles.shelf}>
          <div className={styles.codeHeader} style={{ gridColumn: '1 / -1' }}>Available Items</div>
          {items.map(item => (
            <div 
              key={item.id} 
              className={`${styles.conceptBox} ${selectedItems.find(i => i.id === item.id) ? styles.matrixActive : ''}`}
              onClick={() => toggleItem(item)}
              style={{ cursor: 'pointer', padding: '10px', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ fontSize: '2rem' }}>{item.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: '700' }}>W: {item.weight}</div>
              <div style={{ fontSize: '12px', color: 'var(--accent-purple)' }}>V: ${item.value}</div>
            </div>
          ))}
        </div>

        <div className={`${styles.knapsackBag} ${isOverLimit ? styles.knapsackFull : ''}`}>
          <div className={styles.codeHeader}>Knapsack (Cap: {maxCapacity})</div>
          <div style={{ fontSize: '4rem', margin: '1rem 0' }}>🎒</div>
          
          <div className={styles.scoreboard} style={{ width: '100%' }}>
            <div className={styles.scoreItem}>
              <span className={styles.scoreLabel}>Total Weight:</span>
              <span className={styles.scoreValue} style={{ color: isOverLimit ? 'var(--color-error)' : 'var(--accent-blue)' }}>
                {currentWeight} / {maxCapacity}
              </span>
            </div>
            <div className={styles.scoreItem}>
              <span className={styles.scoreLabel}>Total Value:</span>
              <span className={styles.scoreValue} style={{ color: 'var(--color-success)' }}>
                ${currentValue}
              </span>
            </div>
          </div>

          <div className={styles.capacityGauge}>
            <div 
              className={styles.progressFill} 
              style={{ 
                width: `${Math.min(100, (currentWeight / maxCapacity) * 100)}%`,
                backgroundColor: isOverLimit ? 'var(--color-error)' : 'var(--color-success)'
              }}
            ></div>
          </div>
          
          {isOverLimit && (
            <div style={{ color: 'var(--color-error)', fontSize: '10px', marginTop: '10px', fontWeight: 'bold' }}>
              CAPACITY EXCEEDED!
            </div>
          )}
        </div>
      </div>
      <div className={styles.tracerCodePane} style={{ borderTop: '1px solid var(--border-subtle)', borderRight: 'none' }}>
        <p className={styles.conceptText} style={{ margin: 0, padding: '1rem' }}>
          <b>Exhaustive Search Hint:</b> There are <MathBlock math="2^n" /> possible subsets. For 4 items, we check 16 combinations. The optimal is Item 1, 2, and 4 (Total: $15, Weight: 10).
        </p>
      </div>
    </div>
  );
};

export default KnapsackTracer;
