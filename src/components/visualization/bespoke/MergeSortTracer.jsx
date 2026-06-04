import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_ARRAY = [38, 27, 43, 3, 9, 82, 10];

/**
 * MergeSortTracer - A multi-row "Divide & Merge" visualizer.
 */
const MergeSortTracer = ({ style }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = useMemo(() => {
    const s = [];
    
    // Step state: levels of arrays
    // levels: [ [ [38, 27, 43, 3, 9, 82, 10] ], [ [38, 27, 43], [3, 9, 82, 10] ], ... ]
    
    const record = (levels, description, highlight = { level: -1, block: -1, idx: -1 }) => {
      s.push({
        levels: JSON.parse(JSON.stringify(levels)),
        description,
        highlight
      });
    };

    let currentLevels = [[INITIAL_ARRAY]];

    record(currentLevels, "Initial array. We begin by dividing it into two halves.");

    // Simple manual trace for the specific array to keep it highly controlled for the UI
    // Level 1: [38, 27, 43, 3, 9, 82, 10]
    // Level 2: [38, 27, 43], [3, 9, 82, 10]
    currentLevels.push([[38, 27, 43], [3, 9, 82, 10]]);
    record(currentLevels, "Divide: The array is split into two sub-arrays.");

    // Level 3: [38, 27], [43], [3, 9], [82, 10]
    currentLevels.push([[38, 27], [43], [3, 9], [82, 10]]);
    record(currentLevels, "Divide: Each sub-array is further split.");

    // Level 4: [38], [27], [43], [3], [9], [82], [10]
    currentLevels.push([[38], [27], [43], [3], [9], [82], [10]]);
    record(currentLevels, "Divide: We reach base cases where each sub-array has size 1.");

    // Start Merging
    // Merge [38] and [27] -> [27, 38]
    let nextLevels = JSON.parse(JSON.stringify(currentLevels));
    nextLevels[2] = [[27, 38], [43], [3, 9], [82, 10]];
    record(nextLevels, "Merge: [38] and [27] are combined into a sorted sub-array [27, 38].", { level: 2, block: 0 });

    // Merge [3, 9] is already sorted, but let's show it
    // Merge [82, 10] -> [10, 82]
    nextLevels[2] = [[27, 38], [43], [3, 9], [10, 82]];
    record(nextLevels, "Merge: [82] and [10] are combined into [10, 82].", { level: 2, block: 3 });

    // Merge [27, 38] and [43] -> [27, 38, 43]
    nextLevels[1] = [[27, 38, 43], [3, 9, 82, 10]];
    record(nextLevels, "Merge: [27, 38] and [43] are combined into [27, 38, 43].", { level: 1, block: 0 });

    // Merge [3, 9] and [10, 82] -> [3, 9, 10, 82]
    nextLevels[1] = [[27, 38, 43], [3, 9, 10, 82]];
    record(nextLevels, "Merge: [3, 9] and [10, 82] are combined into [3, 9, 10, 82].", { level: 1, block: 1 });

    // Final Merge
    nextLevels[0] = [[3, 9, 10, 27, 38, 43, 82]];
    record(nextLevels, "Final Merge: The two halves are merged into the final sorted array.", { level: 0, block: 0 });

    return s;
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
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
        className="btn btn-outline btn-sm"
        onClick={() => {
          setCurrentStepIdx(prev => Math.max(0, prev - 1));
          setIsPlaying(false);
        }}
        disabled={currentStepIdx === 0}
      >
        Prev
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
        onClick={() => {
          setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1));
          setIsPlaying(false);
        }}
        disabled={currentStepIdx === steps.length - 1}
      >
        Next
      </button>
    </div>
  );

  return (
    <VisualStage style={style} 
      title="Merge Sort Tree" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer} style={{ minHeight: '400px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center' }}>
          {step.levels.map((level, lIdx) => (
            <div key={lIdx} style={{ display: 'flex', gap: '2rem', justifyContent: 'center', width: '100%' }}>
              {level.map((block, bIdx) => {
                const isHighlighted = step.highlight.level === lIdx && step.highlight.block === bIdx;
                return (
                  <div 
                    key={bIdx} 
                    style={{ 
                      display: 'flex', 
                      gap: '4px', 
                      padding: '8px', 
                      background: isHighlighted ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-elevated)',
                      border: `2px solid ${isHighlighted ? 'var(--color-success)' : 'var(--border-subtle)'}`,
                      borderRadius: '8px',
                      boxShadow: isHighlighted ? '0 0 15px rgba(16, 185, 129, 0.2)' : 'none',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    {block.map((val, vIdx) => (
                      <div 
                        key={vIdx} 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          fontFamily: 'var(--font-code)'
                        }}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className={styles.stepInfo}>
          <span className={styles.label}>Step {currentStepIdx + 1} of {steps.length}</span>
        </div>
      </div>
    </VisualStage>
  );
};

export default MergeSortTracer;
