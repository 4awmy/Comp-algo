import { useState, useEffect, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const GRAPH_DATA = {
  nodes: [
    { id: 'A', x: 300, y: 60 },
    { id: 'B', x: 150, y: 140 },
    { id: 'C', x: 450, y: 140 },
    { id: 'D', x: 80, y: 240 },
    { id: 'E', x: 220, y: 240 },
    { id: 'F', x: 380, y: 240 },
    { id: 'G', x: 520, y: 240 },
  ],
  edges: [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'F' },
    { from: 'C', to: 'G' },
    { from: 'E', to: 'F' },
  ]
};

/**
 * DfsTracer - A premium SVG-based graph tracer for DFS and BFS.
 * Supports node/edge highlighting and discovery/back-edge distinction.
 */
const DfsTracer = ({ style }) => {
  const [mode, setMode] = useState('DFS');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const adj = useMemo(() => {
    const map = {};
    GRAPH_DATA.nodes.forEach(n => map[n.id] = []);
    GRAPH_DATA.edges.forEach(e => {
      map[e.from].push(e.to);
      map[e.to].push(e.from);
    });
    return map;
  }, []);

  const steps = useMemo(() => {
    const s = [];
    const visited = new Set();
    const discoveryEdges = new Set();

    if (mode === 'DFS') {
      const dfs = (node) => {
        visited.add(node);
        s.push({
          activeNode: node,
          visited: new Set(visited),
          queued: new Set(),
          discoveryEdges: new Set(discoveryEdges),
          description: `DFS: Visiting node ${node}. Push to stack.`
        });

        for (const neighbor of adj[node]) {
          if (!visited.has(neighbor)) {
            discoveryEdges.add(`${node}-${neighbor}`);
            discoveryEdges.add(`${neighbor}-${node}`);
            dfs(neighbor);
            s.push({
              activeNode: node,
              visited: new Set(visited),
              queued: new Set(),
              discoveryEdges: new Set(discoveryEdges),
              description: `DFS: Backtrack to ${node}.`
            });
          }
        }
      };
      dfs('A');
    } else {
      // BFS
      const q = ['A'];
      visited.add('A');
      
      while (q.length > 0) {
        const node = q.shift();
        s.push({
          activeNode: node,
          visited: new Set(visited),
          queued: new Set(q),
          discoveryEdges: new Set(discoveryEdges),
          description: `BFS: Dequeue and visit node ${node}.`
        });

        for (const neighbor of adj[node]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            q.push(neighbor);
            discoveryEdges.add(`${node}-${neighbor}`);
            discoveryEdges.add(`${neighbor}-${node}`);
            s.push({
              activeNode: node,
              visited: new Set(visited),
              queued: new Set(q),
              discoveryEdges: new Set(discoveryEdges),
              description: `BFS: Found neighbor ${neighbor}. Add to queue.`
            });
          }
        }
      }
    }

    return s;
  }, [mode, adj]);

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    let timer;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const step = steps[currentStepIdx] || steps[0];

  const actions = (
    <div className={styles.controls}>
      <select 
        className="btn btn-outline btn-sm" 
        value={mode} 
        onChange={handleModeChange}
        style={{ marginRight: 'var(--space-2)' }}
      >
        <option value="DFS">DFS Mode</option>
        <option value="BFS">BFS Mode</option>
      </select>
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
    <VisualStage style={style} 
      title={`${mode} Traversal`} 
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <div className={styles.graphContainer}>
          <svg width="600" height="400" viewBox="0 0 600 400">
            {/* Draw Edges */}
            {GRAPH_DATA.edges.map((edge, idx) => {
              const fromNode = GRAPH_DATA.nodes.find(n => n.id === edge.from);
              const toNode = GRAPH_DATA.nodes.find(n => n.id === edge.to);
              const isDiscovery = step.discoveryEdges.has(`${edge.from}-${edge.to}`) || 
                                 step.discoveryEdges.has(`${edge.to}-${edge.from}`);
              
              return (
                <line
                  key={idx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  className={`${styles.edge} ${isDiscovery ? styles.edgeDiscovery : ''}`}
                />
              );
            })}

            {/* Draw Nodes */}
            {GRAPH_DATA.nodes.map((node) => {
              let nodeState = '';
              if (node.id === step.activeNode) nodeState = styles.nodeActive;
              else if (step.visited.has(node.id)) nodeState = styles.nodeVisited;
              else if (step.queued.has(node.id)) nodeState = styles.nodeQueued;

              return (
                <g key={node.id} className={`${styles.node} ${nodeState}`}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="22"
                    className={styles.nodeCircle}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    className={styles.nodeText}
                  >
                    {node.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        
        <div className={styles.stepInfo}>
          <span className={styles.label}>Step {currentStepIdx + 1} of {steps.length}</span>
        </div>
      </div>
    </VisualStage>
  );
};

export default DfsTracer;
