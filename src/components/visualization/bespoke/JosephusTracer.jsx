import { useState, useMemo, useEffect } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_N = 10;

/**
 * JosephusTracer - Visualizes the Josephus elimination problem
 * using a circular SVG layout.
 */
const JosephusTracer = () => {
  const [n, setN] = useState(INITIAL_N);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    let people = Array.from({ length: n }, (_, i) => ({ id: i + 1, isAlive: true }));
    
    s.push({
      people: JSON.parse(JSON.stringify(people)),
      currentIdx: -1,
      eliminatingIdx: -1,
      description: `Start with ${n} people in a circle. We will eliminate every 2nd person.`
    });

    let count = 0;
    let idx = 0;
    let aliveCount = n;

    while (aliveCount > 1) {
      // Find the next alive person
      while (!people[idx].isAlive) {
        idx = (idx + 1) % n;
      }

      count++;

      if (count === 2) {
        // Eliminate this person
        people[idx].isAlive = false;
        aliveCount--;
        count = 0;

        s.push({
          people: JSON.parse(JSON.stringify(people)),
          currentIdx: -1,
          eliminatingIdx: idx,
          description: `Person #${people[idx].id} is eliminated.`
        });
      } else {
        // Move to the next person
        s.push({
          people: JSON.parse(JSON.stringify(people)),
          currentIdx: idx,
          eliminatingIdx: -1,
          description: `Person #${people[idx].id} is skipped.`
        });
      }

      idx = (idx + 1) % n;
    }

    const winner = people.find(p => p.isAlive);
    s.push({
      people: JSON.parse(JSON.stringify(people)),
      currentIdx: people.indexOf(winner),
      eliminatingIdx: -1,
      description: `The winner is Person #${winner.id}!`
    });

    return s;
  }, [n]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 800);
    } else if (isPlaying) {
      timer = setTimeout(() => {
        setIsPlaying(false);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];
  const radius = 120;
  const centerX = 150;
  const centerY = 150;

  const actions = (
    <div className={styles.controls}>
      <div className="flex items-center gap-2 mr-4">
        <label className="text-xs opacity-70">People:</label>
        <input 
          type="range" 
          min="2" 
          max="15" 
          value={n} 
          className="range range-xs range-primary w-24"
          onChange={(e) => {
            setN(parseInt(e.target.value));
            setCurrentStepIdx(0);
            setIsPlaying(false);
          }}
        />
        <span className="text-xs font-mono w-4">{n}</span>
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
      title="Josephus Problem" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.josephusContainer}>
        <svg viewBox="0 0 300 300" className={styles.josephusSvg}>
          {step.people.map((person, idx) => {
            const angle = (idx * 2 * Math.PI) / n - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            let circleClass = styles.alive;
            if (!person.isAlive) circleClass = styles.eliminated;
            if (idx === step.currentIdx) circleClass = styles.current;
            if (idx === step.eliminatingIdx) circleClass = styles.eliminating;

            return (
              <g key={idx}>
                <circle 
                  cx={x} 
                  cy={y} 
                  r="15" 
                  className={`${styles.personCircle} ${circleClass}`} 
                />
                <text 
                  x={x} 
                  y={y} 
                  dy=".3em" 
                  className={styles.personLabel}
                >
                  {person.id}
                </text>
              </g>
            );
          })}
        </svg>

        <div className={styles.formulaBox}>
          <div className={styles.label}>One-pass Logic (Binary Trick)</div>
          <div className={styles.value}>
            J({n}) = 2L + 1
          </div>
          <div className={styles.explanation}>
            where {n} = 2<sup>{Math.floor(Math.log2(n))}</sup> + {n - Math.pow(2, Math.floor(Math.log2(n)))}
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default JosephusTracer;
