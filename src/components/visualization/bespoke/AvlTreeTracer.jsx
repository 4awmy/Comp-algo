import { useState } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

/**
 * AvlTreeTracer - Demonstrates the four types of AVL rotations.
 * 1. Single Left (RR)
 * 2. Single Right (LL)
 * 3. Double Left-Right (LR)
 * 4. Double Right-Left (RL)
 */
const AvlTreeTracer = ({ style }) => {
  const [activeRotation, setActiveRotation] = useState('LL');
  const [showRotated, setShowRotated] = useState(false);

  const scenarios = {
    LL: {
      title: "Single Right Rotation (LL Case)",
      description: "Triggered by an insertion into the left subtree of the left child.",
      before: [
        { id: '3', val: 30, x: 50, y: 20, bf: 2, highlight: true },
        { id: '2', val: 20, x: 30, y: 45, bf: 1, parent: '3' },
        { id: '1', val: 10, x: 15, y: 70, bf: 0, parent: '2' }
      ],
      after: [
        { id: '2', val: 20, x: 50, y: 20, bf: 0 },
        { id: '1', val: 10, x: 30, y: 45, bf: 0, parent: '2' },
        { id: '3', val: 30, x: 70, y: 45, bf: 0, parent: '2' }
      ]
    },
    RR: {
      title: "Single Left Rotation (RR Case)",
      description: "Triggered by an insertion into the right subtree of the right child.",
      before: [
        { id: '1', val: 10, x: 50, y: 20, bf: -2, highlight: true },
        { id: '2', val: 20, x: 70, y: 45, bf: -1, parent: '1' },
        { id: '3', val: 30, x: 85, y: 70, bf: 0, parent: '2' }
      ],
      after: [
        { id: '2', val: 20, x: 50, y: 20, bf: 0 },
        { id: '1', val: 10, x: 30, y: 45, bf: 0, parent: '2' },
        { id: '3', val: 30, x: 70, y: 45, bf: 0, parent: '2' }
      ]
    },
    LR: {
      title: "Double Left-Right Rotation (LR Case)",
      description: "A left rotation on the child, followed by a right rotation on the parent.",
      before: [
        { id: '3', val: 30, x: 50, y: 20, bf: 2, highlight: true },
        { id: '1', val: 10, x: 30, y: 45, bf: -1, parent: '3' },
        { id: '2', val: 20, x: 45, y: 70, bf: 0, parent: '1' }
      ],
      after: [
        { id: '2', val: 20, x: 50, y: 20, bf: 0 },
        { id: '1', val: 10, x: 30, y: 45, bf: 0, parent: '2' },
        { id: '3', val: 30, x: 70, y: 45, bf: 0, parent: '2' }
      ]
    },
    RL: {
      title: "Double Right-Left Rotation (RL Case)",
      description: "A right rotation on the child, followed by a left rotation on the parent.",
      before: [
        { id: '1', val: 10, x: 50, y: 20, bf: -2, highlight: true },
        { id: '3', val: 30, x: 70, y: 45, bf: 1, parent: '1' },
        { id: '2', val: 20, x: 55, y: 70, bf: 0, parent: '3' }
      ],
      after: [
        { id: '2', val: 20, x: 50, y: 20, bf: 0 },
        { id: '1', val: 10, x: 30, y: 45, bf: 0, parent: '2' },
        { id: '3', val: 30, x: 70, y: 45, bf: 0, parent: '2' }
      ]
    }
  };

  const current = scenarios[activeRotation];
  const nodes = showRotated ? current.after : current.before;

  const actions = (
    <div className={styles.controls}>
      {Object.keys(scenarios).map(type => (
        <button 
          key={type}
          className={`btn btn-sm ${activeRotation === type ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => { setActiveRotation(type); setShowRotated(false); }}
        >
          {type}
        </button>
      ))}
      <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)', margin: '0 8px' }} />
      <button 
        className="btn btn-accent btn-sm"
        onClick={() => setShowRotated(!showRotated)}
      >
        {showRotated ? 'Reset' : 'Rotate'}
      </button>
    </div>
  );

  return (
    <VisualStage style={style} title={current.title} description={current.description} actions={actions}>
      <div className={styles.treeContainer}>
        <svg className={styles.treeSvg}>
          {/* Edges */}
          {nodes.map(node => {
            if (!node.parent) return null;
            const parent = nodes.find(n => n.id === node.parent);
            return (
              <line 
                key={`${node.id}-${node.parent}`}
                x1={`${parent.x}%`} y1={`${parent.y}%`}
                x2={`${node.x}%`} y2={`${node.y}%`}
                className={showRotated ? styles.rotationEdge : styles.edge}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map(node => (
            <g key={node.id} className={`${styles.node} ${node.highlight && !showRotated ? styles.nodeActive : ''}`}>
              <circle cx={`${node.x}%`} cy={`${node.y}%`} r="18" className={styles.nodeCircle} />
              <text x={`${node.x}%`} y={`${node.y}%`} className={styles.nodeText}>{node.val}</text>
              <text 
                x={`${node.x + 4}%`} y={`${node.y - 4}%`} 
                className={`${styles.balanceFactor} ${Math.abs(node.bf) > 1 ? styles.bfHighlight : ''}`}
              >
                BF: {node.bf}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </VisualStage>
  );
};

export default AvlTreeTracer;
