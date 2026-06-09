import { useState, useEffect, useMemo } from 'react';
import styles from './Bespoke.module.css';

const TspTracer = () => {
  const cities = [
    { id: 'A', x: 50, y: 50 },
    { id: 'B', x: 250, y: 50 },
    { id: 'C', x: 250, y: 150 },
    { id: 'D', x: 50, y: 150 },
  ];

  const permutations = useMemo(() => [
    ['A', 'B', 'C', 'D', 'A'],
    ['A', 'B', 'D', 'C', 'A'],
    ['A', 'C', 'B', 'D', 'A'],
  ], []);

  const costs = useMemo(() => ({
    'AB': 10, 'BC': 15, 'CD': 10, 'DA': 15,
    'AC': 25, 'BD': 20, 'AD': 15, 'CB': 15,
    'DB': 20, 'DC': 10, 'BA': 10, 'CA': 25
  }), []);

  const [currentPerm, setCurrentPerm] = useState(0);
  const [cityIndex, setCityIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ledger, setLedger] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (cityIndex < 4) {
          const from = permutations[currentPerm][cityIndex];
          const to = permutations[currentPerm][cityIndex + 1];
          const cost = costs[from + to];
          setLedger(prev => [...prev, { from, to, cost }]);
          setTotalCost(prev => prev + cost);
          setCityIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, cityIndex, currentPerm, permutations, costs]);

  const startAnimation = (idx) => {
    setCurrentPerm(idx);
    setCityIndex(0);
    setLedger([]);
    setTotalCost(0);
    setIsPlaying(true);
  };

  const travelerPos = cities.find(c => c.id === permutations[currentPerm][cityIndex]);

  return (
    <div className={styles.tracerContainer}>
      <div className={styles.tracerGrid}>
        <div className={styles.tracerCodePane}>
          <div className={styles.codeHeader}>TSP Exhaustive Search</div>
          <p className={styles.conceptText} style={{ fontSize: '12px' }}>
            We generate all (n-1)! Hamilton circuits and find the one with the minimum total weight.
          </p>
          <div className={styles.controls} style={{ flexDirection: 'column' }}>
            {permutations.map((p, i) => (
              <button 
                key={i} 
                className={styles.controlBtn}
                onClick={() => startAnimation(i)}
                disabled={isPlaying}
              >
                Try: {p.join(' → ')}
              </button>
            ))}
          </div>
          <div className={styles.scoreboard} style={{ marginTop: '1rem' }}>
            <div className={styles.ledgerTitle}>Running Ledger</div>
            {ledger.map((entry, i) => (
              <div key={i} className={styles.scoreItem}>
                <span className={styles.scoreLabel}>{entry.from} → {entry.to}</span>
                <span className={styles.scoreValue}>+{entry.cost}</span>
              </div>
            ))}
            <div className={styles.scoreItem} style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '4px', marginTop: '4px' }}>
              <span className={styles.scoreLabel}>Total Weight:</span>
              <span className={styles.scoreValue} style={{ color: 'var(--accent-purple)' }}>{totalCost}</span>
            </div>
          </div>
        </div>

        <div className={styles.tracerVisualPane}>
          <div className={styles.mapContainer}>
            <svg viewBox="0 0 300 200" width="100%" height="100%">
              {/* Draw Edges */}
              {Object.keys(costs).map(edge => {
                const p1 = cities.find(c => c.id === edge[0]);
                const p2 = cities.find(c => c.id === edge[1]);
                return (
                  <line 
                    key={edge} 
                    x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} 
                    stroke="var(--border-subtle)" strokeWidth="1" 
                  />
                );
              })}

              {/* Draw Active Path */}
              {ledger.map((entry, i) => {
                const p1 = cities.find(c => c.id === entry.from);
                const p2 = cities.find(c => c.id === entry.to);
                return (
                  <line 
                    key={`active-${i}`} 
                    x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} 
                    stroke="var(--accent-purple)" strokeWidth="3" 
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Draw Cities */}
              {cities.map(city => (
                <g key={city.id}>
                  <circle cx={city.x} cy={city.y} r="12" fill="var(--bg-surface)" stroke="var(--accent-blue)" strokeWidth="2" />
                  <text x={city.x} y={city.y + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent-blue)">{city.id}</text>
                </g>
              ))}

              {/* Traveler */}
              {travelerPos && (
                <text 
                  x={travelerPos.x} y={travelerPos.y - 15} 
                  fontSize="20" className={styles.traveler}
                  textAnchor="middle"
                >
                  📍
                </text>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TspTracer;
