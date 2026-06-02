import { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const INITIAL_KEYS = [30, 20, 56, 75, 31, 19];
const TABLE_SIZE = 10;

/**
 * HashingTracer - Visualizes Collision Resolution Strategies.
 * Supports Separate Chaining and Linear Probing.
 */
const HashingTracer = () => {
  const [strategy, setStrategy] = useState('chaining'); // 'chaining' or 'probing'
  const [keys, setKeys] = useState(INITIAL_KEYS);
  const [inputKey, setInputKey] = useState("");

  const hashTable = useMemo(() => {
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

  const handleInsert = (e) => {
    e.preventDefault();
    const val = parseInt(inputKey);
    if (!isNaN(val)) {
      setKeys([...keys, val]);
      setInputKey("");
    }
  };

  const handleReset = () => {
    setKeys(INITIAL_KEYS);
  };

  const actions = (
    <div className={styles.controls}>
      <button 
        className={`btn btn-sm ${strategy === 'chaining' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => setStrategy('chaining')}
      >
        Separate Chaining
      </button>
      <button 
        className={`btn btn-sm ${strategy === 'probing' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => setStrategy('probing')}
      >
        Linear Probing
      </button>
      <div className="divider divider-horizontal mx-2"></div>
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
      <button className="btn btn-outline btn-sm" onClick={handleReset}>Reset</button>
    </div>
  );

  return (
    <VisualStage 
      title={`Hash Table: ${strategy === 'chaining' ? 'Separate Chaining' : 'Linear Probing'}`}
      description={strategy === 'chaining' 
        ? "Open Hashing: Each slot is a linked list of keys that hashed to the same index." 
        : "Closed Hashing: If a collision occurs, find the next available slot linearly."}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <div className={styles.hashingContainer}>
          <div className={styles.hashingGrid}>
            <div className={styles.hashTable}>
              {hashTable.map((content, idx) => (
                <div key={idx} className={styles.hashSlot}>
                  <span className={styles.slotIndex}>{idx}</span>
                  <div className={styles.slotContent}>
                    {strategy === 'chaining' ? (
                      content?.map((key, kIdx) => (
                        <div key={kIdx} className={styles.chainNode}>
                          <div className={styles.hashItem}>{key}</div>
                          {kIdx < content.length - 1 && <span className={styles.chainArrow}>→</span>}
                        </div>
                      ))
                    ) : (
                      content !== null && <div className={styles.hashItem}>{content}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.stepInfo}>
              <h4 className="font-bold mb-4 text-left">Insertion Order:</h4>
              <div className="flex flex-wrap gap-2 justify-start">
                {keys.map((k, i) => (
                  <div key={i} className="badge badge-outline badge-lg">{k}</div>
                ))}
              </div>
              <p className={styles.description} style={{ marginTop: '2rem', textAlign: 'left' }}>
                Hash Function: $h(k) = k \pmod{{TABLE_SIZE}}$
                <br /><br />
                {strategy === 'probing' && "Linear Probing avoids pointers but can lead to 'clustering' where multiple adjacent slots become occupied, slowing down search."}
                {strategy === 'chaining' && "Chaining handles collisions gracefully but requires extra memory for pointers and linked list nodes."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default HashingTracer;
