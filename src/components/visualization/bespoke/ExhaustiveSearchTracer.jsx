import { useState, useMemo, useEffect } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const TSP_CITIES = ['A', 'B', 'C', 'D'];
const TSP_DISTANCES = {
  'A-B': 2, 'A-C': 5, 'A-D': 7,
  'B-C': 8, 'B-D': 3,
  'C-D': 1
};

const getDist = (c1, c2) => {
  const key = [c1, c2].sort().join('-');
  return TSP_DISTANCES[key] || 0;
};

const KNAPSACK_ITEMS = [
  { id: 1, w: 2, v: 12 },
  { id: 2, w: 1, v: 10 },
  { id: 3, w: 3, v: 20 },
  { id: 4, w: 2, v: 15 }
];
const KNAPSACK_CAPACITY = 5;

const ExhaustiveSearchTracer = () => {
  const [mode, setMode] = useState('TSP'); // 'TSP' or 'Knapsack'
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const tspSteps = useMemo(() => {
    const s = [];
    const cities = ['B', 'C', 'D'];
    
    function permute(arr, memo = []) {
      if (arr.length === 0) {
        const route = ['A', ...memo, 'A'];
        let cost = 0;
        for (let i = 0; i < route.length - 1; i++) {
          cost += getDist(route[i], route[i+1]);
        }
        return [{ route, cost }];
      }
      let results = [];
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        results = results.concat(permute(curr.slice(), memo.concat(next)));
      }
      return results;
    }

    const allPerms = permute(cities);
    let bestCost = Infinity;
    let bestRoute = null;

    s.push({
      type: 'TSP',
      description: "Traveling Salesman Problem: Find the shortest route that visits every city and returns to the start.",
      currentRoute: null,
      currentCost: null,
      bestRoute: null,
      bestCost: null,
      allRoutes: []
    });

    allPerms.forEach((p, idx) => {
      const isNewBest = p.cost < bestCost;
      if (isNewBest) {
        bestCost = p.cost;
        bestRoute = p.route;
      }
      
      s.push({
        type: 'TSP',
        description: `Checking route: ${p.route.join(' → ')}. Cost: ${p.cost}.`,
        currentRoute: p.route,
        currentCost: p.cost,
        bestRoute: [...bestRoute],
        bestCost,
        isNewBest,
        allRoutes: allPerms.slice(0, idx + 1)
      });
    });

    s.push({
      type: 'TSP',
      description: `Search complete. Optimal route is ${bestRoute.join(' → ')} with cost ${bestCost}.`,
      currentRoute: null,
      currentCost: null,
      bestRoute,
      bestCost,
      allRoutes: allPerms
    });

    return s;
  }, []);

  const knapsackSteps = useMemo(() => {
    const s = [];
    const items = [
      { id: 1, w: 2, v: 12 },
      { id: 2, w: 1, v: 10 },
      { id: 3, w: 3, v: 20 },
      { id: 4, w: 2, v: 15 }
    ];
    const n = items.length;
    let bestVal = 0;
    let bestSubset = [];

    s.push({
      type: 'Knapsack',
      description: "Knapsack Problem: Find the subset of items with maximum total value that fits in the capacity (W=5).",
      currentSubset: [],
      currentWeight: 0,
      currentValue: 0,
      bestSubset: [],
      bestValue: 0,
      isValid: true
    });

    // Generate all subsets
    for (let i = 0; i < (1 << n); i++) {
      let subset = [];
      let weight = 0;
      let value = 0;
      for (let j = 0; j < n; j++) {
        if ((i >> j) & 1) {
          subset.push(items[j]);
          weight += items[j].w;
          value += items[j].v;
        }
      }

      const isValid = weight <= KNAPSACK_CAPACITY;
      const isNewBest = isValid && value > bestVal;
      
      if (isNewBest) {
        bestVal = value;
        bestSubset = [...subset];
      }

      s.push({
        type: 'Knapsack',
        description: `Checking subset: {${subset.map(it => it.id).join(',')}}. Weight: ${weight}, Value: $${value}. ${!isValid ? '(Exceeds capacity)' : ''}`,
        currentSubset: subset,
        currentWeight: weight,
        currentValue: value,
        bestSubset: [...bestSubset],
        bestValue: bestVal,
        isValid,
        isNewBest
      });
    }

    s.push({
      type: 'Knapsack',
      description: `Search complete. Optimal subset has value $${bestVal} and weight ${bestSubset.reduce((sum, it) => sum + it.w, 0)}.`,
      currentSubset: null,
      bestSubset,
      bestValue: bestVal
    });

    return s;
  }, []);

  const steps = mode === 'TSP' ? tspSteps : knapsackSteps;

  useEffect(() => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [mode]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 800);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <select 
        className="select select-bordered select-sm"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="TSP">TSP (Permutations)</option>
        <option value="Knapsack">Knapsack (Subsets)</option>
      </select>
      <div className={styles.divider} />
      <button 
        className="btn btn-outline btn-sm"
        onClick={() => {
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }}
        disabled={currentStepIdx === 0}
      >
        Reset
      </button>
      <button 
        className="btn btn-primary btn-sm"
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ minWidth: '80px' }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button 
        className="btn btn-outline btn-sm"
        onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))}
        disabled={currentStepIdx === steps.length - 1}
      >
        Next
      </button>
    </div>
  );

  return (
    <VisualStage 
      title={mode === 'TSP' ? "TSP Exhaustive Search" : "Knapsack Exhaustive Search"}
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        {mode === 'TSP' ? (
          <div className={styles.tspGrid}>
            <div className={styles.tspVisual}>
              <svg viewBox="0 0 200 200" className={styles.tspSvg}>
                {/* Cities */}
                <circle cx="100" cy="30" r="5" className={styles.nodeCircle} />
                <text x="100" y="20" className={styles.nodeText}>A</text>
                
                <circle cx="30" cy="120" r="5" className={styles.nodeCircle} />
                <text x="20" y="130" className={styles.nodeText}>B</text>
                
                <circle cx="170" cy="120" r="5" className={styles.nodeCircle} />
                <text x="180" y="130" className={styles.nodeText}>C</text>
                
                <circle cx="100" cy="180" r="5" className={styles.nodeCircle} />
                <text x="100" y="195" className={styles.nodeText}>D</text>

                {/* Edges with costs */}
                <line x1="100" y1="30" x2="30" y2="120" className={styles.edge} />
                <text x="60" y="70" className={styles.edgeText}>2</text>
                
                <line x1="100" y1="30" x2="170" y2="120" className={styles.edge} />
                <text x="140" y="70" className={styles.edgeText}>5</text>
                
                <line x1="100" y1="30" x2="100" y2="180" className={styles.edge} />
                <text x="90" y="110" className={styles.edgeText}>7</text>
                
                <line x1="30" y1="120" x2="170" y2="120" className={styles.edge} />
                <text x="100" y="115" className={styles.edgeText}>8</text>
                
                <line x1="30" y1="120" x2="100" y2="180" className={styles.edge} />
                <text x="60" y="155" className={styles.edgeText}>3</text>
                
                <line x1="170" y1="120" x2="100" y2="180" className={styles.edge} />
                <text x="140" y="155" className={styles.edgeText}>1</text>

                {/* Current Route */}
                {step.currentRoute && (
                  <path 
                    d={`M ${step.currentRoute.map(c => {
                      if (c === 'A') return "100 30";
                      if (c === 'B') return "30 120";
                      if (c === 'C') return "170 120";
                      if (c === 'D') return "100 180";
                      return "";
                    }).join(' L ')}`}
                    fill="none"
                    stroke="var(--accent-blue)"
                    strokeWidth="3"
                    className={styles.pathAnimation}
                  />
                )}
              </svg>
            </div>
            
            <div className={styles.tspStats}>
              <div className={styles.infoCardMini}>
                <span className={styles.label}>Best Cost</span>
                <span className={styles.value}>{step.bestCost || '--'}</span>
              </div>
              <div className={styles.infoCardMini}>
                <span className={styles.label}>Best Route</span>
                <span className={styles.value}>{step.bestRoute ? step.bestRoute.join('→') : '--'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.knapsackContainer}>
            <div className={styles.knapsackItems}>
              {[1, 2, 3, 4].map(id => {
                const item = KNAPSACK_ITEMS.find(it => it.id === id);
                const isInCurrent = step.currentSubset?.some(it => it.id === id);
                const isInBest = step.bestSubset?.some(it => it.id === id);
                
                return (
                  <div 
                    key={id} 
                    className={`${styles.ksItem} ${isInCurrent ? styles.active : ''} ${isInBest ? styles.isBest : ''}`}
                  >
                    <span className={styles.ksId}>Item {id}</span>
                    <span className={styles.ksWeight}>w: {item.w}</span>
                    <span className={styles.ksValue}>v: {item.v}</span>
                  </div>
                );
              })}
            </div>
            
            <div className={styles.knapsackStatus}>
              <div className={`${styles.statusPill} ${!step.isValid ? styles.invalid : ''}`}>
                Weight: {step.currentWeight || 0} / {KNAPSACK_CAPACITY}
              </div>
              <div className={styles.statusPill}>
                Value: ${step.currentValue || 0}
              </div>
              <div className={styles.statusPill}>
                Best: ${step.bestValue || 0}
              </div>
            </div>
          </div>
        )}
        
        <div className={styles.stepInfo}>
          <span className={styles.label}>Step {currentStepIdx + 1} of {steps.length}</span>
        </div>
      </div>
    </VisualStage>
  );
};

export default ExhaustiveSearchTracer;
