import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const TREE_DATA = {
  id: 'A',
  x: 200,
  y: 50,
  left: {
    id: 'B',
    x: 100,
    y: 130,
    left: { id: 'D', x: 50, y: 210 },
    right: { id: 'E', x: 150, y: 210 }
  },
  right: {
    id: 'C',
    x: 300,
    y: 130,
    left: { id: 'F', x: 250, y: 210 },
    right: { id: 'G', x: 350, y: 210 }
  }
};

const CODE_LINES = {
  preorder: [
    'Preorder(T)',
    'if T = null return',
    'visit T.root',
    'Preorder(T.left)',
    'Preorder(T.right)'
  ],
  inorder: [
    'Inorder(T)',
    'if T = null return',
    'Inorder(T.left)',
    'visit T.root',
    'Inorder(T.right)'
  ],
  postorder: [
    'Postorder(T)',
    'if T = null return',
    'Postorder(T.left)',
    'Postorder(T.right)',
    'visit T.root'
  ]
};

const VISIT_LINE = {
  preorder: 2,
  inorder: 3,
  postorder: 4
};

const TreeTraversalTracer = ({ style }) => {
  const [traversalType, setTraversalType] = useState('preorder');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const traversals = useMemo(() => {
    const preorder = [];
    const inorder = [];
    const postorder = [];

    const traverse = (node) => {
      if (!node) return;
      preorder.push(node.id);
      traverse(node.left);
      inorder.push(node.id);
      traverse(node.right);
      postorder.push(node.id);
    };

    traverse(TREE_DATA);

    return { preorder, inorder, postorder };
  }, []);

  const steps = useMemo(() => {
    const currentTraversal = traversals[traversalType];
    const s = [{
      visited: [],
      current: null,
      description: `Ready to begin ${traversalType} traversal.`,
      line: 0
    }];

    for (let i = 0; i < currentTraversal.length; i += 1) {
      s.push({
        visited: currentTraversal.slice(0, i),
        current: currentTraversal[i],
        description: `Visiting node ${currentTraversal[i]}.`,
        line: VISIT_LINE[traversalType]
      });
    }

    s.push({
      visited: currentTraversal,
      current: null,
      description: `${traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} traversal complete: [${currentTraversal.join(', ')}]`,
      line: 1
    });

    return s;
  }, [traversalType, traversals]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => {
          if (prev >= steps.length - 2) {
            setIsPlaying(false);
          }
          return Math.min(steps.length - 1, prev + 1);
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];
  const codeLines = CODE_LINES[traversalType];

  const renderNodes = (node) => {
    if (!node) return null;

    const isVisited = step.visited.includes(node.id);
    const isCurrent = step.current === node.id;
    const fill = isCurrent ? 'var(--accent-blue)' : isVisited ? 'var(--color-success)' : 'var(--bg-surface)';
    const stroke = isCurrent ? 'var(--accent-blue)' : isVisited ? 'var(--color-success)' : 'var(--border-subtle)';

    return (
      <g key={node.id}>
        {node.left && (
          <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} className={styles.edge} />
        )}
        {node.right && (
          <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} className={styles.edge} />
        )}
        <circle
          cx={node.x}
          cy={node.y}
          r={20}
          className={styles.nodeCircle}
          style={{ fill, stroke, filter: isCurrent ? 'drop-shadow(0 0 5px var(--accent-blue))' : 'none' }}
        />
        <text
          x={node.x}
          y={node.y}
          className={styles.nodeText}
          style={{ fill: isCurrent || isVisited ? 'white' : 'var(--text-primary)' }}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {node.id}
        </text>
        {renderNodes(node.left)}
        {renderNodes(node.right)}
      </g>
    );
  };

  const actions = (
    <div className={styles.controls}>
      <select
        value={traversalType}
        onChange={(e) => {
          setTraversalType(e.target.value);
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }}
        style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-surface)',
          color: 'var(--text-primary)',
          padding: '0.55rem 0.7rem',
          fontSize: 'var(--text-xs)',
          fontWeight: 600
        }}
      >
        <option value="preorder">Preorder</option>
        <option value="inorder">Inorder</option>
        <option value="postorder">Postorder</option>
      </select>
      <button
        className={styles.controlBtn}
        onClick={() => {
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }}
      >
        Reset
      </button>
      <button
        className={styles.controlBtn}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button
        className={styles.controlBtn}
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
    <VisualStage
      style={style}
      title="Binary Tree Traversal"
      description={step.description}
      actions={actions}
    >
      <div className={styles.dualPane}>
        <div className={styles.codePane}>
          <div className={styles.codeHeader}>Pseudocode</div>
          {codeLines.map((line, idx) => (
            <span key={line} className={`${styles.codeLine} ${step.line === idx ? styles.codeLineActive : ''}`}>
              {line}
            </span>
          ))}
        </div>

        <div className={styles.vizPane} style={{ minHeight: '340px', flexDirection: 'column', gap: '1rem' }}>
          <svg viewBox="0 0 400 280" className={styles.graphContainer} style={{ background: 'transparent', height: '280px', border: 'none' }}>
            {renderNodes(TREE_DATA)}
          </svg>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {traversals[traversalType].map((id, idx) => {
              const isDone = step.visited.includes(id) || step.current === id;
              return (
                <div
                  key={`${id}-${idx}`}
                  style={{
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    background: step.current === id ? 'var(--accent-blue)' : step.visited.includes(id) ? 'var(--color-success)' : 'var(--bg-elevated)',
                    color: isDone ? 'white' : 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {id}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default TreeTraversalTracer;
