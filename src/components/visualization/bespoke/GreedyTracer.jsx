import React, { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const GRAPH_DATA = {
  nodes: [
    { id: 'a', x: 50, y: 100 },
    { id: 'b', x: 150, y: 50 },
    { id: 'c', x: 150, y: 150 },
    { id: 'd', x: 250, y: 100 },
    { id: 'e', x: 150, y: 250 },
  ],
  edges: [
    { from: 'a', to: 'b', weight: 3 },
    { from: 'a', to: 'c', weight: 1 },
    { from: 'b', to: 'c', weight: 7 },
    { from: 'b', to: 'd', weight: 5 },
    { from: 'c', to: 'd', weight: 2 },
    { from: 'c', to: 'e', weight: 4 },
    { from: 'd', to: 'e', weight: 6 },
  ]
};

const GreedyTracer = () => {
  const [algo, setAlgo] = useState('Prim'); // 'Prim' | 'Kruskal' | 'Dijkstra'
  const [step, setStep] = useState(0);

  const steps = useMemo(() => {
    const s = [];
    if (algo === 'Prim') {
      const visited = new Set(['a']);
      const mstEdges = [];
      s.push({ visited: new Set(visited), mstEdges: [], activeEdge: null, desc: "Start with node 'a'." });

      while (visited.size < GRAPH_DATA.nodes.length) {
        let minEdge = null;
        GRAPH_DATA.edges.forEach(edge => {
          const u = edge.from;
          const v = edge.to;
          const uVisited = visited.has(u);
          const vVisited = visited.has(v);
          if ((uVisited && !vVisited) || (!uVisited && vVisited)) {
            if (!minEdge || edge.weight < minEdge.weight) {
              minEdge = edge;
            }
          }
        });

        if (minEdge) {
          const nextNode = visited.has(minEdge.from) ? minEdge.to : minEdge.from;
          s.push({ 
            visited: new Set(visited), 
            mstEdges: [...mstEdges], 
            activeEdge: minEdge, 
            desc: `Considering edge (${minEdge.from}, ${minEdge.to}) with weight ${minEdge.weight}. It's the smallest edge connecting the visited set to an unvisited node.` 
          });
          visited.add(nextNode);
          mstEdges.push(minEdge);
          s.push({ 
            visited: new Set(visited), 
            mstEdges: [...mstEdges], 
            activeEdge: null, 
            desc: `Add ${nextNode} to visited set and edge to MST.` 
          });
        } else break;
      }
      s.push({ visited: new Set(visited), mstEdges: [...mstEdges], activeEdge: null, desc: "MST complete!" });
    } else if (algo === 'Kruskal') {
      const edges = [...GRAPH_DATA.edges].sort((a, b) => a.weight - b.weight);
      const parent = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };
      const find = (i) => (parent[i] === i ? i : find(parent[i]));
      const union = (i, j) => { parent[find(i)] = find(j); };
      
      const mstEdges = [];
      s.push({ mstEdges: [], activeEdge: null, desc: "Sort all edges by weight." });

      edges.forEach(edge => {
        const rootU = find(edge.from);
        const rootV = find(edge.to);
        const createsCycle = rootU === rootV;
        
        s.push({ 
          mstEdges: [...mstEdges], 
          activeEdge: edge, 
          desc: `Examine edge (${edge.from}, ${edge.to}) weight ${edge.weight}. ${createsCycle ? 'Creates a cycle, skip.' : 'Does not create a cycle, add to MST.'}` 
        });

        if (!createsCycle) {
          union(edge.from, edge.to);
          mstEdges.push(edge);
          s.push({ mstEdges: [...mstEdges], activeEdge: null, desc: `Edge added.` });
        }
      });
      s.push({ mstEdges: [...mstEdges], activeEdge: null, desc: "Kruskal's algorithm complete." });
    } else if (algo === 'Dijkstra') {
      const distances = { a: 0, b: Infinity, c: Infinity, d: Infinity, e: Infinity };
      const visited = new Set();
      const prev = {};
      
      s.push({ distances: { ...distances }, visited: new Set(visited), activeNode: null, desc: "Initialize distances: source 'a' = 0, others = ∞." });

      for (let i = 0; i < GRAPH_DATA.nodes.length; i++) {
        let u = null;
        Object.keys(distances).forEach(node => {
          if (!visited.has(node)) {
            if (!u || distances[node] < distances[u]) u = node;
          }
        });

        if (!u || distances[u] === Infinity) break;
        visited.add(u);
        s.push({ distances: { ...distances }, visited: new Set(visited), activeNode: u, desc: `Select node '${u}' with smallest tentative distance ${distances[u]}.` });

        const neighbors = GRAPH_DATA.edges.filter(e => e.from === u || e.to === u);
        neighbors.forEach(edge => {
          const v = edge.from === u ? edge.to : edge.from;
          if (!visited.has(v)) {
            const alt = distances[u] + edge.weight;
            const updated = alt < distances[v];
            if (updated) {
              distances[v] = alt;
              prev[v] = u;
            }
            s.push({ 
              distances: { ...distances }, 
              visited: new Set(visited), 
              activeNode: u, 
              highlightEdge: edge,
              desc: `Relax edge to '${v}': ${alt} ${updated ? '<' : '≥'} ${distances[v] === Infinity ? '∞' : distances[v]}. ${updated ? 'Update distance.' : 'Keep current.'}` 
            });
          }
        });
      }
      s.push({ distances: { ...distances }, visited: new Set(visited), activeNode: null, desc: "Shortest paths from 'a' found." });
    }
    return s;
  }, [algo]);

  const current = steps[step] || steps[0];

  return (
    <VisualStage
      title={`Greedy: ${algo === 'Prim' ? 'Prim\'s MST' : algo === 'Kruskal' ? 'Kruskal\'s MST' : 'Dijkstra\'s'}`}
      description={current.desc}
      actions={
        <div className={styles.tracerActions}>
          <select 
            className="select select-bordered select-sm" 
            value={algo} 
            onChange={(e) => { setAlgo(e.target.value); setStep(0); }}
          >
            <option value="Prim">Prim's MST</option>
            <option value="Kruskal">Kruskal's MST</option>
            <option value="Dijkstra">Dijkstra's</option>
          </select>
          <div className={styles.stepControls}>
            <button className="btn btn-outline btn-sm" onClick={() => setStep(Math.max(0, step - 1))}>Prev</button>
            <button className="btn btn-primary btn-sm" onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>Next</button>
          </div>
        </div>
      }
    >
      <div className={styles.graphLayout}>
        <div className={styles.svgContainer}>
          <svg width="300" height="300" viewBox="0 0 300 300">
            {GRAPH_DATA.edges.map((edge, i) => {
              const from = GRAPH_DATA.nodes.find(n => n.id === edge.from);
              const to = GRAPH_DATA.nodes.find(n => n.id === edge.to);
              const isMST = current.mstEdges?.some(e => (e.from === edge.from && e.to === edge.to)) || false;
              const isActive = current.activeEdge === edge || (current.highlightEdge === edge);
              
              return (
                <g key={i}>
                  <line 
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
                    stroke={isActive ? "var(--accent-yellow)" : isMST ? "var(--accent-cyan)" : "var(--border-subtle)"}
                    strokeWidth={isActive ? "4" : isMST ? "3" : "2"}
                    style={{ transition: 'all 0.3s' }}
                  />
                  <text 
                    x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 5} 
                    fontSize="10" fill="var(--text-muted)" textAnchor="middle" fontWeight="700"
                  >
                    {edge.weight}
                  </text>
                </g>
              );
            })}
            {GRAPH_DATA.nodes.map(node => {
              const isVisited = current.visited?.has(node.id);
              const isActive = current.activeNode === node.id;
              
              let color = "var(--bg-surface)";
              let border = "var(--border-subtle)";
              if (isActive) { border = "var(--accent-cyan)"; color = "rgba(6, 182, 212, 0.1)"; }
              else if (isVisited) { border = "var(--accent-cyan)"; color = "rgba(6, 182, 212, 0.05)"; }

              return (
                <g key={node.id} style={{ transition: 'all 0.3s' }}>
                  <circle cx={node.x} cy={node.y} r="18" fill={color} stroke={border} strokeWidth="2" />
                  <text x={node.x} y={node.y} dy="4" textAnchor="middle" fontSize="12" fill="var(--text-primary)" fontWeight="700">{node.id}</text>
                  {algo === 'Dijkstra' && (
                    <text x={node.x} y={node.y - 25} fontSize="10" fill="var(--accent-yellow)" textAnchor="middle" fontWeight="bold">
                      {current.distances[node.id] === Infinity ? '∞' : current.distances[node.id]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className={styles.sideInfo}>
          {algo === 'Dijkstra' && (
            <div className={styles.infoCard}>
              <h4>Distances Table</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {Object.entries(current.distances).map(([node, dist]) => (
                  <div key={node} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span>{node}:</span>
                    <span style={{ color: 'var(--accent-yellow)', fontWeight: 'bold' }}>{dist === Infinity ? '∞' : dist}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(algo === 'Prim' || algo === 'Kruskal') && (
            <div className={styles.infoCard}>
              <h4>MST Weight</h4>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)', textAlign: 'center' }}>
                {current.mstEdges.reduce((acc, e) => acc + e.weight, 0)}
              </div>
            </div>
          )}
        </div>
      </div>
    </VisualStage>
  );
};

export default GreedyTracer;
