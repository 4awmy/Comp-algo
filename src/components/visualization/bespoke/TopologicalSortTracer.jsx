/* eslint-disable */
import React, { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const GRAPH_DATA = {
  nodes: [
    { id: 'C1', x: 50, y: 50 },
    { id: 'C2', x: 150, y: 50 },
    { id: 'C3', x: 100, y: 150 },
    { id: 'C4', x: 50, y: 250 },
    { id: 'C5', x: 150, y: 250 },
  ],
  edges: [
    { from: 'C1', to: 'C3' },
    { from: 'C2', to: 'C3' },
    { from: 'C3', to: 'C4' },
    { from: 'C3', to: 'C5' },
  ]
};

const TopologicalSortTracer = ({ style }) => {
  const [method, setMode] = useState('SourceRemoval'); // 'DFS' | 'SourceRemoval'
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const steps = useMemo(() => {
    const s = [];
    if (method === 'SourceRemoval') {
      const inDegree = { C1: 0, C2: 0, C3: 2, C4: 1, C5: 1 };
      const removed = [];
      const queue = ['C1', 'C2'];
      
      s.push({ 
        inDegree: { ...inDegree }, 
        removed: [], 
        queue: [...queue], 
        active: null,
        desc: "Initial in-degrees computed. Sources (in-degree 0): C1, C2." 
      });

      while (queue.length > 0) {
        const u = queue.shift();
        removed.push(u);
        s.push({ 
          inDegree: { ...inDegree }, 
          removed: [...removed], 
          queue: [...queue], 
          active: u,
          desc: `Remove source ${u} and add to sorted list.` 
        });

        const neighbors = GRAPH_DATA.edges.filter(e => e.from === u).map(e => e.to);
        neighbors.forEach(v => {
          inDegree[v]--;
          const isNewSource = inDegree[v] === 0;
          if (isNewSource) queue.push(v);
          s.push({ 
            inDegree: { ...inDegree }, 
            removed: [...removed], 
            queue: [...queue], 
            active: u,
            highlightEdge: { from: u, to: v },
            desc: `Decrement in-degree of ${v}. ${isNewSource ? `${v} is now a source!` : ""}` 
          });
        });
      }
      s.push({ inDegree: { ...inDegree }, removed: [...removed], queue: [], active: null, desc: "All nodes removed. Topological sort complete!" });
    } else {
      // DFS-based
      const visited = new Set();
      const finished = [];
      const stack = [];
      
      const dfs = (u) => {
        visited.add(u);
        stack.push(u);
        s.push({ visited: new Set(visited), finished: [...finished], stack: [...stack], active: u, desc: `Visit ${u}.` });
        
        const neighbors = GRAPH_DATA.edges.filter(e => e.from === u).map(e => e.to);
        neighbors.forEach(v => {
          if (!visited.has(v)) {
            dfs(v);
            s.push({ visited: new Set(visited), finished: [...finished], stack: [...stack], active: u, desc: `Backtrack to ${u}.` });
          }
        });
        
        finished.push(u);
        stack.pop();
        s.push({ visited: new Set(visited), finished: [...finished], stack: [...stack], active: u, desc: `${u} is a dead-end. Add to finish order.` });
      };

      ['C1', 'C2', 'C3', 'C4', 'C5'].forEach(node => {
        if (!visited.has(node)) dfs(node);
      });
      s.push({ visited: new Set(visited), finished: [...finished], stack: [], active: null, desc: "DFS complete. Reverse finish order for result." });
    }
    return s;
  }, [method]);

  const currentStep = steps[currentStepIdx] || steps[0];

  return (
    <VisualStage style={style} 
      title={`Topological Sort: ${method === 'SourceRemoval' ? 'Source Removal' : 'DFS-based'}`}
      description={currentStep.desc}
      actions={
        <div className={styles.tracerActions}>
          <button className={`${styles.btnOutline} ${styles.btnSm}`} onClick={() => { setMode(method === 'DFS' ? 'SourceRemoval' : 'DFS'); setCurrentStepIdx(0); }}>
            Switch to {method === 'DFS' ? 'Source Removal' : 'DFS-based'}
          </button>
          <div className={styles.stepControls}>
            <button className={`${styles.btnOutline} ${styles.btnSm}`} onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}>Prev</button>
            <button className={`${styles.btnPrimary} ${styles.btnSm}`} onClick={() => setCurrentStepIdx(Math.min(steps.length - 1, currentStepIdx + 1))}>Next</button>
          </div>
        </div>
      }
    >
      <div className={styles.graphLayout}>
        <div className={styles.svgContainer}>
          <svg width="200" height="300" viewBox="0 0 200 300">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="18" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="var(--text-muted)" />
              </marker>
              <marker id="arrow-active" markerWidth="10" markerHeight="10" refX="18" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="var(--accent-cyan)" />
              </marker>
            </defs>
            {GRAPH_DATA.edges.map((edge, i) => {
              const from = GRAPH_DATA.nodes.find(n => n.id === edge.from);
              const to = GRAPH_DATA.nodes.find(n => n.id === edge.to);
              const isActive = currentStep.highlightEdge?.from === edge.from && currentStep.highlightEdge?.to === edge.to;
              const isRemoved = method === 'SourceRemoval' && (currentStep.removed.includes(edge.from) || currentStep.removed.includes(edge.to));
              
              return (
                <line 
                  key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
                  stroke={isActive ? "var(--accent-cyan)" : "var(--border-subtle)"}
                  strokeWidth="2" markerEnd={isActive ? "url(#arrow-active)" : "url(#arrow)"}
                  opacity={isRemoved ? 0.1 : 1}
                  style={{ transition: 'all 0.3s' }}
                />
              );
            })}
            {GRAPH_DATA.nodes.map(node => {
              const isVisited = method === 'DFS' ? currentStep.visited.has(node.id) : currentStep.removed.includes(node.id);
              const isFinished = method === 'DFS' && currentStep.finished.includes(node.id);
              const isActive = currentStep.active === node.id;
              
              let color = "var(--bg-surface)";
              let border = "var(--border-subtle)";
              if (isActive) { border = "var(--accent-cyan)"; color = "color-mix(in srgb, var(--accent-cyan), transparent 90%)"; }
              else if (isFinished || (method === 'SourceRemoval' && isVisited)) { border = "var(--color-success)"; color = "color-mix(in srgb, var(--color-success), transparent 90%)"; }
              else if (isVisited) { border = "var(--accent-blue)"; }

              return (
                <g key={node.id} opacity={method === 'SourceRemoval' && isVisited ? 0.3 : 1} style={{ transition: 'all 0.3s' }}>
                  <circle cx={node.x} cy={node.y} r="15" fill={color} stroke={border} strokeWidth="2" />
                  <text x={node.x} y={node.y} dy="4" textAnchor="middle" fontSize="10" fill="var(--text-primary)" fontWeight="700">{node.id}</text>
                  {method === 'SourceRemoval' && !isVisited && currentStep.inDegree && (
                    <text x={node.x + 18} y={node.y - 10} fontSize="9" fill="var(--accent-yellow)" fontWeight="bold">
                      in:{currentStep.inDegree[node.id]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className={styles.sideInfo}>
          <div className={styles.dataBadge}>
            <span className={styles.badgeLabel}>{method === 'SourceRemoval' ? 'Sorted List' : 'Finish Order'}</span>
            <span className={styles.badgeValue}>
              {method === 'SourceRemoval' 
                ? `[${currentStep.removed.join(', ')}]` 
                : `[${currentStep.finished.join(', ')}]`}
            </span>
          </div>
          {method === 'DFS' && (
            <div className={styles.dataBadge}>
              <span className={styles.badgeLabel}>Current Stack</span>
              <span className={styles.badgeValue}>{`[${currentStep.stack.join(' → ')}]`}</span>
            </div>
          )}
          {method === 'SourceRemoval' && (
            <div className={styles.dataBadge}>
              <span className={styles.badgeLabel}>Source Queue</span>
              <span className={styles.badgeValue}>{`[${currentStep.queue.join(', ')}]`}</span>
            </div>
          )}
        </div>
      </div>
    </VisualStage>
  );
};

export default TopologicalSortTracer;
