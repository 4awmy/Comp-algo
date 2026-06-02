/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const GraphConverterTracer = () => {
  const [nodes, setNodes] = useState([
    { id: 0, x: 50, y: 50 },
    { id: 1, x: 150, y: 50 },
    { id: 2, x: 50, y: 150 },
    { id: 3, x: 150, y: 150 },
  ]);
  const [edges, setEdges] = useState([
    { u: 0, v: 1 },
    { u: 1, v: 3 },
  ]);

  const toggleEdge = (u, v) => {
    const exists = edges.find(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
    if (exists) {
      setEdges(edges.filter(e => e !== exists));
    } else {
      setEdges([...edges, { u, v }]);
    }
  };

  const matrix = Array.from({ length: 4 }, (_, i) => 
    Array.from({ length: 4 }, (_, j) => 
      edges.some(e => (e.u === i && e.v === j) || (e.u === j && e.v === i)) ? 1 : 0
    )
  );

  return (
    <VisualStage 
      title="Graph Representation Converter"
      description="Click on nodes to toggle edges and see the Adjacency Matrix and List update live."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full p-4">
        {/* Graph Sandbox */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Interactive Sandbox</h4>
          <div className="relative h-[200px] w-full bg-black/20 rounded-xl border border-dashed border-white/10 overflow-hidden">
             <svg className="w-full h-full">
               {edges.map((e, i) => (
                 <line 
                   key={i} 
                   x1={nodes[e.u].x} y1={nodes[e.u].y} 
                   x2={nodes[e.v].x} y2={nodes[e.v].y} 
                   stroke="var(--accent-purple)" strokeWidth="2"
                 />
               ))}
               {nodes.map(n => (
                 <g key={n.id} onClick={() => {}} className="cursor-pointer">
                   <circle cx={n.x} cy={n.y} r="15" fill="var(--bg-surface)" stroke="var(--accent-cyan)" strokeWidth="2" />
                   <text x={n.x} y={n.y} dy="4" textAnchor="middle" fontSize="10" fill="var(--text-primary)" fontWeight="bold">{n.id}</text>
                 </g>
               ))}
             </svg>
             {/* Simple click-to-add-edge matrix buttons */}
             <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
                {nodes.map(u => nodes.map(v => (
                  <button 
                    key={`${u.id}-${v.id}`} 
                    className="pointer-events-auto opacity-0 hover:opacity-20 bg-white"
                    onClick={() => u.id !== v.id && toggleEdge(u.id, v.id)}
                  />
                )))}
             </div>
          </div>
          <p className="text-[10px] text-center italic text-muted-foreground">Tip: Click between nodes to draw connections</p>
        </div>

        {/* Representations */}
        <div className="flex flex-col gap-6">
          {/* Adjacency Matrix */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-accent-cyan uppercase">Adjacency Matrix</h4>
            <div className="bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-[10px]">
              <div className="grid grid-cols-5 gap-1 text-center border-b border-white/10 pb-1 mb-1">
                <span></span>{[0,1,2,3].map(i => <span key={i} className="text-accent-purple">{i}</span>)}
              </div>
              {matrix.map((row, i) => (
                <div key={i} className="grid grid-cols-5 gap-1 text-center">
                  <span className="text-accent-purple">{i}</span>
                  {row.map((val, j) => <span key={j} className={val ? 'text-white font-bold' : 'opacity-20'}>{val}</span>)}
                </div>
              ))}
            </div>
          </div>

          {/* Adjacency List */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-accent-yellow uppercase">Adjacency List</h4>
            <div className="bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-[10px] flex flex-col gap-1">
              {nodes.map(n => (
                <div key={n.id} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-accent-purple/20 flex items-center justify-center text-accent-purple">{n.id}</span>
                  <span className="opacity-40">→</span>
                  <div className="flex gap-1">
                    {edges.filter(e => e.u === n.id || e.v === n.id).map(e => (
                      <span key={e.u === n.id ? e.v : e.u} className="px-1.5 py-0.5 rounded bg-white/5 text-white/80">
                        {e.u === n.id ? e.v : e.u}
                      </span>
                    ))}
                    {edges.filter(e => e.u === n.id || e.v === n.id).length === 0 && <span className="opacity-20">null</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </VisualStage>
  );
};

export default GraphConverterTracer;
