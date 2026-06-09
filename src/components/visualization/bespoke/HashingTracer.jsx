import { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_KEYS = [30, 20, 56, 75, 31, 19];
const TABLE_SIZE = 10;

const CHAINING_CODE = [
  "function ChainInsert(key)",
  "  index <- key mod m",
  "  insert key at head of Chain[index]",
  "  return success"
];

const PROBING_CODE = [
  "function ProbingInsert(key)",
  "  index <- key mod m",
  "  i <- 0",
  "  while Table[(index + i) % m] is occupied do",
  "    i <- i + 1",
  "  Table[(index + i) % m] <- key",
  "  return success"
];

/**
 * HashingTracer - Visualizes Collision Resolution Strategies.
 * Supports Separate Chaining and Linear Probing with step-by-step insertion tracing.
 */
const HashingTracer = ({ style }) => {
  const [strategy, setStrategy] = useState('chaining'); // 'chaining' or 'probing'
  const [keys, setKeys] = useState(INITIAL_KEYS);
  const [inputKey, setInputKey] = useState("");

  // Stepping state for new insertion
  const [steppingKey, setSteppingKey] = useState(null);
  const [stepIndex, setStepIndex] = useState(-1);
  const [animationSteps, setAnimationSteps] = useState([]);

  // Base table representing the state before the new key is finalized
  const baseTable = useMemo(() => {
    const table = Array(TABLE_SIZE).fill(null);

    if (strategy === 'chaining') {
      keys.forEach(key => {
        const idx = key % TABLE_SIZE;
        if (!table[idx]) table[idx] = [];
        table[idx].push(key);
      });
    } else {
      keys.forEach(key => {
        let idx = key % TABLE_SIZE;
        let originalIdx = idx;
        let i = 0;
        
        while (table[idx] !== null && i < TABLE_SIZE) {
          idx = (originalIdx + ++i) % TABLE_SIZE;
        }
        
        if (i < TABLE_SIZE) {
          table[idx] = key;
        }
      });
    }

    return table;
  }, [strategy, keys]);

  // Handle key insert submission
  const handleInsert = (e) => {
    e.preventDefault();
    const val = parseInt(inputKey);
    if (isNaN(val)) return;

    setInputKey("");

    // Create copy of the base table to manipulate during steps
    const tempTable = JSON.parse(JSON.stringify(baseTable));
    const steps = [];

    if (strategy === 'chaining') {
      const index = val % TABLE_SIZE;
      
      // Step 1: Compute hash index
      steps.push({
        table: JSON.parse(JSON.stringify(tempTable)),
        activeLine: 1, // index <- key mod m
        description: `Compute hash index: h(${val}) = ${val} mod ${TABLE_SIZE} = ${index}.`,
        probeSlot: index,
        isCollision: false
      });

      // Step 2: Insert key at head of chain
      if (!tempTable[index]) tempTable[index] = [];
      tempTable[index].unshift(val); // insert at head

      steps.push({
        table: JSON.parse(JSON.stringify(tempTable)),
        activeLine: 2, // insert key at head ...
        description: `Slot ${index} accessed. Place key ${val} at the head of the chain.`,
        probeSlot: index,
        isCollision: false,
        done: true
      });
    } else {
      // Linear Probing
      const index = val % TABLE_SIZE;
      let idx = index;
      let i = 0;

      // Step 1: Compute initial hash index
      steps.push({
        table: JSON.parse(JSON.stringify(tempTable)),
        activeLine: 1, // index <- key mod m
        description: `Compute initial hash index: h(${val}) = ${val} mod ${TABLE_SIZE} = ${index}.`,
        probeSlot: index,
        probeCount: 0,
        isCollision: false
      });

      // Step 2: Initialize probe count
      steps.push({
        table: JSON.parse(JSON.stringify(tempTable)),
        activeLine: 2, // i <- 0
        description: `Initialize probe offset i = 0. We start probing from slot ${index}.`,
        probeSlot: index,
        probeCount: 0,
        isCollision: false
      });

      while (tempTable[idx] !== null && i < TABLE_SIZE) {
        // Step 3: Check occupied slot (collision check)
        steps.push({
          table: JSON.parse(JSON.stringify(tempTable)),
          activeLine: 3, // while Table[...] is occupied do
          description: `Check Table[${idx}]: occupied by key ${tempTable[idx]}. Collision!`,
          probeSlot: idx,
          probeCount: i,
          isCollision: true
        });

        // Step 4: Increment probe offset
        i++;
        idx = (index + i) % TABLE_SIZE;

        steps.push({
          table: JSON.parse(JSON.stringify(tempTable)),
          activeLine: 4, // i <- i + 1
          description: `Increment probe offset: i = ${i}. Next slot is (${index} + ${i}) mod ${TABLE_SIZE} = ${idx}.`,
          probeSlot: idx,
          probeCount: i,
          isCollision: false
        });
      }

      if (i < TABLE_SIZE) {
        // Step 5: Check empty slot
        steps.push({
          table: JSON.parse(JSON.stringify(tempTable)),
          activeLine: 3, // while Table[...] is occupied do
          description: `Check Table[${idx}]: Empty slot found. No collision!`,
          probeSlot: idx,
          probeCount: i,
          isCollision: false
        });

        // Step 6: Insert key
        tempTable[idx] = val;

        steps.push({
          table: JSON.parse(JSON.stringify(tempTable)),
          activeLine: 5, // Table[...] <- key
          description: `Insert key ${val} into Table[${idx}].`,
          probeSlot: idx,
          probeCount: i,
          isCollision: false,
          done: true
        });
      } else {
        // Table Full
        steps.push({
          table: JSON.parse(JSON.stringify(tempTable)),
          activeLine: 3,
          description: `Probed all ${TABLE_SIZE} slots. Table is completely full! Cannot insert key ${val}.`,
          probeSlot: -1,
          probeCount: i,
          isCollision: true,
          done: true
        });
      }
    }

    setSteppingKey(val);
    setAnimationSteps(steps);
    setStepIndex(0);
  };

  const handleNextStep = () => {
    if (stepIndex < animationSteps.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      // Completed last step, finalize the insertion
      const finalStep = animationSteps[animationSteps.length - 1];
      if (finalStep.done && finalStep.probeSlot !== -1) {
        setKeys(prev => [...prev, steppingKey]);
      }
      setSteppingKey(null);
      setStepIndex(-1);
      setAnimationSteps([]);
    }
  };

  const handlePrevStep = () => {
    setStepIndex(prev => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setKeys(INITIAL_KEYS);
    setSteppingKey(null);
    setStepIndex(-1);
    setAnimationSteps([]);
  };

  const currentTable = steppingKey !== null ? animationSteps[stepIndex].table : baseTable;
  const currentStep = steppingKey !== null ? animationSteps[stepIndex] : null;

  const actions = (
    <div className={styles.controls}>
      <button 
        className={`btn btn-sm ${strategy === 'chaining' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => setStrategy('chaining')}
        disabled={steppingKey !== null}
      >
        Separate Chaining
      </button>
      <button 
        className={`btn btn-sm ${strategy === 'probing' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => setStrategy('probing')}
        disabled={steppingKey !== null}
      >
        Linear Probing
      </button>
      <div className="divider divider-horizontal mx-2"></div>
      
      {steppingKey !== null ? (
        <div className="flex gap-2 items-center">
          <span className="text-xs font-bold text-accent-blue animate-pulse">Tracing: {steppingKey}</span>
          <button className="btn btn-outline btn-sm" onClick={handlePrevStep} disabled={stepIndex === 0}>Prev</button>
          <button className="btn btn-primary btn-sm" onClick={handleNextStep}>
            {stepIndex === animationSteps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleInsert} className="flex gap-2">
          <input 
            type="number" 
            className="input input-sm input-bordered w-20" 
            placeholder="Key"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
          <button type="submit" className="btn btn-sm btn-primary">Insert</button>
        </form>
      )}

      <button className="btn btn-outline btn-sm" onClick={handleReset}>Reset</button>
    </div>
  );

  return (
    <VisualStage style={style} 
      title={`Hash Table: ${strategy === 'chaining' ? 'Separate Chaining' : 'Linear Probing'}`}
      description={currentStep ? currentStep.description : (strategy === 'chaining' 
        ? "Separate Chaining: Collisions are stored in linked lists at each index." 
        : "Linear Probing: Collisions are resolved by searching linearly for the next empty slot.")}
      actions={actions}
    >
      <div className={styles.dualPane}>
        {/* Code Pane */}
        <div className={styles.codePane}>
          <div className={styles.codeHeader}>
            {strategy === 'chaining' ? "Chain Insertion Code" : "Linear Probe Insertion Code"}
          </div>
          {(strategy === 'chaining' ? CHAINING_CODE : PROBING_CODE).map((lineText, idx) => {
            const isActive = currentStep && currentStep.activeLine === idx;
            return (
              <span key={idx} className={`${styles.codeLine} ${isActive ? styles.codeLineActive : ''}`}>
                {lineText}
              </span>
            );
          })}
        </div>

        {/* Visual Stage Pane */}
        <div className={styles.vizPane} style={{ padding: '1.5rem', minHeight: '350px' }}>
          <div className={styles.hashingContainer} style={{ width: '100%' }}>
            <div className={styles.hashingGrid} style={{ gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <div className={styles.hashTable}>
                {currentTable.map((content, idx) => {
                  let isSlotProbed = currentStep && currentStep.probeSlot === idx;
                  let slotStatus = '';
                  if (isSlotProbed) {
                    slotStatus = currentStep.isCollision ? styles.mismatch : styles.active;
                  }

                  return (
                    <div key={idx} className={`${styles.hashSlot} ${isSlotProbed ? 'border border-primary' : ''}`}>
                      <span className={`${styles.slotIndex} ${isSlotProbed ? 'bg-primary text-white' : ''}`}>{idx}</span>
                      <div className={`${styles.slotContent} ${slotStatus}`}>
                        {strategy === 'chaining' ? (
                          content?.map((key, kIdx) => {
                            const isNewKey = steppingKey !== null && key === steppingKey && stepIndex === animationSteps.length - 1;
                            return (
                              <div key={kIdx} className={styles.chainNode}>
                                <div className={`${styles.hashItem} ${isNewKey ? 'bg-success text-white' : ''}`}>{key}</div>
                                {kIdx < content.length - 1 && <span className={styles.chainArrow}>→</span>}
                              </div>
                            );
                          })
                        ) : (
                          content !== null && (
                            <div className={`${styles.hashItem} ${steppingKey !== null && content === steppingKey && stepIndex === animationSteps.length - 1 ? 'bg-success text-white' : ''}`}>
                              {content}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-4 border-t border-subtle text-xs text-left leading-relaxed">
                <strong>Keys In Database:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {keys.map((k, i) => (
                    <div key={i} className="badge badge-outline badge-lg">{k}</div>
                  ))}
                  {steppingKey !== null && (
                    <div className="badge badge-primary badge-lg animate-pulse">{steppingKey} (Inserting...)</div>
                  )}
                </div>
                <div className="mt-4 p-2 bg-muted/20 border border-subtle rounded text-[11px] text-muted-foreground">
                  {"Hash Function: $h(k) = k \\pmod{{10}}$"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default HashingTracer;
