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

const TreeTraversalTracer = () => {
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
    const s = [];

    s.push({
      visited: [],
      current: null,
      description: `Ready to begin ${traversalType} traversal.`
    });

    for (let i = 0; i < currentTraversal.length; i++) {
      s.push({
        visited: currentTraversal.slice(0, i),
        current: currentTraversal[i],
        description: `Visiting node ${currentTraversal[i]}.`
      });
    }

    s.push({
      visited: currentTraversal,
      current: null,
      description: `${traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} traversal complete: [${currentTraversal.join(', ')}]`
    });

    return s;
  }, [traversalType, traversals]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx];

  const renderNodes = (node) => {
    if (!node) return null;

    const isVisited = step.visited.includes(node.id);
    const isCurrent = step.current === node.id;

    return (
      <g key={node.id}>
        {node.left && (
          <line 
            x1={node.x} y1={node.y} 
            x2={node.left.x} y2={node.left.y} 
            className={styles.edge} 
          />
        )}
        {node.right && (
          <line 
            x1={node.x} y1={node.y} 
            x2={node.right.x} y2={node.right.y} 
            className={styles.edge} 
          />
        )}
        <g className={`${styles.node} ${isCurrent ? styles.nodeActive : ''} ${isVisited ? styles.nodeVisited : ''}`}>
          <circle cx={node.x} cy={node.y} r={20} className={styles.nodeCircle} />
          <text x={node.x} y={node.y} className={styles.nodeText}>{node.id}</text>
        </g>
        {renderNodes(node.left)}
        {renderNodes(node.right)}
      </g>
    );
  };

  const actions = (
    <div className={styles.controls}>
      <select 
        className="select select-bordered select-sm"
        value={traversalType}
        onChange={(e) => {
          setTraversalType(e.target.value);
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }}
      >
        <option value="preorder">Preorder (Root, L, R)</option>
        <option value="inorder">Inorder (L, Root, R)</option>
        <option value="postorder">Postorder (L, R, Root)</option>
      </select>
      <button 
        className="btn btn-outline btn-sm"
        onClick={() => {
          setCurrentStepIdx(0);
          setIsPlaying(false);
        }}
      >
        Reset
      </button>
      <button 
        className="btn btn-primary btn-sm"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );

  return (
    <VisualStage 
      title="Binary Tree Traversal" 
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <svg viewBox="0 0 400 300" className={styles.graphContainer} style={{ background: 'transparent', height: '300px' }}>
          {renderNodes(TREE_DATA)}
        </svg>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          {traversals[traversalType].map((id, idx) => {
            const isDone = step.visited.includes(id) || step.current === id;
            return (
              <div 
                key={idx}
                style={{
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                  background: step.current === id ? 'var(--accent-blue)' : (step.visited.includes(id) ? 'var(--color-success)' : 'var(--bg-elevated)'),
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
    </VisualStage>
  );
};

export default TreeTraversalTracer;
