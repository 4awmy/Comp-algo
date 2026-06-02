import { useState, useMemo, useEffect } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_N = 9;

/**
 * FakeCoinTracer - Visualizes the Decrease-by-a-factor (n/3) strategy
 * for the Fake Coin problem.
 */
const FakeCoinTracer = () => {
  const [n, setN] = useState(INITIAL_N);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const fakeIdx = useMemo(() => Math.floor(Math.random() * n), [n]);
  
  const steps = useMemo(() => {
    const s = [];
    let coins = Array.from({ length: n }, (_, i) => ({ id: i, isFake: false }));
    // Randomly pick a fake coin for the simulation
    coins[fakeIdx].isFake = true;

    let currentGroup = [...coins];
    
    s.push({
      groups: [[...currentGroup], [], []],
      scaleState: 'balanced',
      description: `Start with ${n} coins. One is lighter (fake).`,
      highlightedCoins: []
    });

    while (currentGroup.length > 1) {
      const len = currentGroup.length;
      const groupSize = Math.floor(len / 3) || 1;
      
      const g1 = currentGroup.slice(0, groupSize);
      const g2 = currentGroup.slice(groupSize, 2 * groupSize);
      const g3 = currentGroup.slice(2 * groupSize);

      s.push({
        groups: [g1, g2, g3],
        scaleState: 'weighing',
        description: `Divide into three groups: ${g1.length}, ${g2.length}, and ${g3.length}. Weigh the first two.`,
        highlightedCoins: []
      });

      const weight1 = g1.filter(c => !c.isFake).length + g1.filter(c => c.isFake).length * 0.5;
      const weight2 = g2.filter(c => !c.isFake).length + g2.filter(c => c.isFake).length * 0.5;

      let nextGroup;
      let scaleState;
      let resultDesc;

      if (weight1 < weight2) {
        nextGroup = g1;
        scaleState = 'left-up';
        resultDesc = "Left scale is lighter. The fake coin is in Group 1.";
      } else if (weight1 > weight2) {
        nextGroup = g2;
        scaleState = 'right-up';
        resultDesc = "Right scale is lighter. The fake coin is in Group 2.";
      } else {
        nextGroup = g3;
        scaleState = 'balanced';
        resultDesc = "Scales are balanced. The fake coin must be in Group 3.";
      }

      s.push({
        groups: [g1, g2, g3],
        scaleState,
        description: resultDesc,
        highlightedCoins: nextGroup.map(c => c.id)
      });

      currentGroup = nextGroup;
    }

    s.push({
      groups: [[currentGroup[0]], [], []],
      scaleState: 'balanced',
      description: `The fake coin is identified: Coin #${currentGroup[0].id}!`,
      highlightedCoins: [currentGroup[0].id]
    });

    return s;
  }, [n]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1500);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <div className="flex items-center gap-2 mr-4">
        <label className="text-xs opacity-70">Coins:</label>
        <select 
          className="select select-xs select-bordered"
          value={n}
          onChange={(e) => {
            setN(parseInt(e.target.value));
            setCurrentStepIdx(0);
            setIsPlaying(false);
          }}
        >
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
          <option value={15}>15</option>
          <option value={27}>27</option>
        </select>
      </div>
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
      title="Fake Coin Problem (n/3 Strategy)" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.fakeCoinContainer}>
        <div className={styles.scaleVisualization}>
          <div className={`${styles.scaleBeam} ${styles[step.scaleState]}`}>
            <div className={styles.scalePanLeft}>
              <div className={styles.panCoins}>
                {step.groups[0].map(coin => (
                  <div 
                    key={coin.id} 
                    className={`${styles.coin} ${step.highlightedCoins.includes(coin.id) ? styles.highlighted : ''}`}
                    title={`Coin #${coin.id}`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.scalePanRight}>
              <div className={styles.panCoins}>
                {step.groups[1].map(coin => (
                  <div 
                    key={coin.id} 
                    className={`${styles.coin} ${step.highlightedCoins.includes(coin.id) ? styles.highlighted : ''}`}
                    title={`Coin #${coin.id}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.scaleBase} />
        </div>

        <div className={styles.groupInfo}>
          <div className={styles.groupBucket}>
            <span className={styles.label}>Group 1</span>
            <span className={styles.value}>{step.groups[0].length} coins</span>
          </div>
          <div className={styles.groupBucket}>
            <span className={styles.label}>Group 2</span>
            <span className={styles.value}>{step.groups[1].length} coins</span>
          </div>
          <div className={styles.groupBucket}>
            <span className={styles.label}>Group 3 (Off-scale)</span>
            <div className={styles.panCoinsSmall}>
              {step.groups[2].map(coin => (
                <div 
                  key={coin.id} 
                  className={`${styles.coinSmall} ${step.highlightedCoins.includes(coin.id) ? styles.highlighted : ''}`}
                />
              ))}
            </div>
            <span className={styles.value}>{step.groups[2].length} coins</span>
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default FakeCoinTracer;
