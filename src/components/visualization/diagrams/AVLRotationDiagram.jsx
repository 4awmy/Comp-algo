import React from 'react';

const colors = {
  node: '#0d2c54', // --accent-blue
  nodeText: '#ffffff',
  link: '#cbd5e1', // --border-default
  arrow: '#c5a059', // --accent-purple
  highlight: '#ef4444', // --color-error
  success: '#10b981', // --color-success
  label: '#475569', // --text-secondary
};

const Node = ({ x, y, label, color = colors.node, sublabel }) => (
  <g>
    <circle cx={x} cy={y} r="18" fill={color} stroke={color} strokeWidth="1" />
    <text x={x} y={y + 5} textAnchor="middle" fill={colors.nodeText} fontSize="14" fontWeight="bold" fontFamily="Inter, sans-serif">
      {label}
    </text>
    {sublabel && (
      <text x={x + 22} y={y - 10} fontSize="10" fill={color === colors.highlight ? colors.highlight : colors.label} fontWeight="bold">
        {sublabel}
      </text>
    )}
  </g>
);

const Link = ({ x1, y1, x2, y2 }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.link} strokeWidth="2" strokeLinecap="round" />
);

const ArrowMarker = () => (
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orientation="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill={colors.arrow} />
    </marker>
  </defs>
);

const TransitionArrow = ({ x, y, label }) => (
  <g transform={`translate(${x}, ${y})`}>
    <line x1="0" y1="0" x2="50" y2="0" stroke={colors.arrow} strokeWidth="3" markerEnd="url(#arrowhead)" />
    <text x="25" y="-12" textAnchor="middle" fontSize="11" fontWeight="bold" fill={colors.arrow} fontFamily="Inter, sans-serif">
      {label}
    </text>
  </g>
);

export const RotationLL = () => (
  <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
    <svg viewBox="0 0 420 180" width="100%" height="auto">
      <ArrowMarker />
      <Link x1="80" y1="40" x2="50" y2="85" />
      <Link x1="50" y1="85" x2="20" y2="130" />
      <Node x="80" y="40" label="3" sublabel="BF:+2" color={colors.highlight} />
      <Node x="50" y="85" label="2" sublabel="BF:+1" />
      <Node x="20" y="130" label="1" sublabel="BF:0" />
      <text x="50" y="170" textAnchor="middle" fontSize="12" fill={colors.label} fontWeight="500">Left-Left Heavy</text>
      <TransitionArrow x="185" y="85" label="RIGHT ROTATE" />
      <Link x1="330" y1="65" x2="290" y2="110" />
      <Link x1="330" y1="65" x2="370" y2="110" />
      <Node x="330" y="65" label="2" sublabel="BF:0" color={colors.success} />
      <Node x="290" y="110" label="1" sublabel="BF:0" />
      <Node x="370" y="110" label="3" sublabel="BF:0" />
      <text x="330" y="170" textAnchor="middle" fontSize="12" fill={colors.label} fontWeight="500">Balanced</text>
    </svg>
  </div>
);

export const RotationRR = () => (
  <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
    <svg viewBox="0 0 420 180" width="100%" height="auto">
      <ArrowMarker />
      <Link x1="20" y1="40" x2="50" y2="85" />
      <Link x1="50" y1="85" x2="80" y2="130" />
      <Node x="20" y="40" label="1" sublabel="BF:-2" color={colors.highlight} />
      <Node x="50" y="85" label="2" sublabel="BF:-1" />
      <Node x="80" y="130" label="3" sublabel="BF:0" />
      <text x="50" y="170" textAnchor="middle" fontSize="12" fill={colors.label} fontWeight="500">Right-Right Heavy</text>
      <TransitionArrow x="185" y="85" label="LEFT ROTATE" />
      <Link x1="330" y1="65" x2="290" y2="110" />
      <Link x1="330" y1="65" x2="370" y2="110" />
      <Node x="330" y="65" label="2" sublabel="BF:0" color={colors.success} />
      <Node x="290" y="110" label="1" sublabel="BF:0" />
      <Node x="370" y="110" label="3" sublabel="BF:0" />
      <text x="330" y="170" textAnchor="middle" fontSize="12" fill={colors.label} fontWeight="500">Balanced</text>
    </svg>
  </div>
);

export const RotationLR = () => (
  <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
    <svg viewBox="0 0 460 220" width="100%" height="auto">
      <ArrowMarker />
      <Link x1="90" y1="40" x2="40" y2="85" />
      <Link x1="40" y1="85" x2="65" y2="130" />
      <Node x="90" y="40" label="3" sublabel="BF:+2" color={colors.highlight} />
      <Node x="40" y="85" label="1" sublabel="BF:-1" />
      <Node x="65" y="130" label="2" sublabel="BF:0" />
      <text x="65" y="170" textAnchor="middle" fontSize="12" fill={colors.label} fontWeight="500">Left-Right Heavy (Zig-Zag)</text>
      <TransitionArrow x="205" y="85" label="DOUBLE ROTATE" />
      <Link x1="360" y1="65" x2="320" y2="110" />
      <Link x1="360" y1="65" x2="400" y2="110" />
      <Node x="360" y="65" label="2" sublabel="BF:0" color={colors.success} />
      <Node x="320" y="110" label="1" sublabel="BF:0" />
      <Node x="400" y="110" label="3" sublabel="BF:0" />
      <text x="360" y="170" textAnchor="middle" fontSize="12" fill={colors.label} fontWeight="500">Balanced</text>
    </svg>
  </div>
);

export const RotationRL = () => (
  <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
    <svg viewBox="0 0 460 220" width="100%" height="auto">
      <ArrowMarker />
      <Link x1="40" y1="40" x2="90" y2="85" />
      <Link x1="90" y1="85" x2="65" y2="130" />
      <Node x="40" y="40" label="1" sublabel="BF:-2" color={colors.highlight} />
      <Node x="90" y="85" label="3" sublabel="BF:+1" />
      <Node x="65" y="130" label="2" sublabel="BF:0" />
      <text x="65" y="170" textAnchor="middle" fontSize="12" fill={colors.label} fontWeight="500">Right-Left Heavy (Zag-Zig)</text>
      <TransitionArrow x="205" y="85" label="DOUBLE ROTATE" />
      <Link x1="360" y1="65" x2="320" y2="110" />
      <Link x1="360" y1="65" x2="400" y2="110" />
      <Node x="360" y="65" label="2" sublabel="BF:0" color={colors.success} />
      <Node x="320" y="110" label="1" sublabel="BF:0" />
      <Node x="400" y="110" label="3" sublabel="BF:0" />
      <text x="360" y="170" textAnchor="middle" fontSize="12" fill={colors.label} fontWeight="500">Balanced</text>
    </svg>
  </div>
);

export const TwoThreeTreeDiagram = () => (
  <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', margin: '1rem 0' }}>
    <svg viewBox="0 0 400 160" width="100%" height="auto">
      <line x1="200" y1="30" x2="100" y2="80" stroke={colors.link} strokeWidth="2" />
      <line x1="200" y1="30" x2="200" y2="80" stroke={colors.link} strokeWidth="2" />
      <line x1="200" y1="30" x2="300" y2="80" stroke={colors.link} strokeWidth="2" />
      <line x1="100" y1="80" x2="70" y2="130" stroke={colors.link} strokeWidth="2" />
      <line x1="100" y1="80" x2="130" y2="130" stroke={colors.link} strokeWidth="2" />
      <line x1="300" y1="80" x2="270" y2="130" stroke={colors.link} strokeWidth="2" />
      <line x1="300" y1="80" x2="330" y2="130" stroke={colors.link} strokeWidth="2" />
      <rect x="175" y="15" width="50" height="30" rx="15" fill={colors.node} />
      <text x="200" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">30 | 70</text>
      <circle cx="100" cy="80" r="18" fill={colors.node} />
      <text x="100" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">10</text>
      <circle cx="200" cy="80" r="18" fill={colors.node} />
      <text x="200" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">50</text>
      <circle cx="300" cy="80" r="18" fill={colors.node} />
      <text x="300" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">90</text>
      <circle cx="70" cy="130" r="12" fill={colors.link} />
      <circle cx="130" cy="130" r="12" fill={colors.link} />
      <circle cx="270" cy="130" r="12" fill={colors.link} />
      <circle cx="330" cy="130" r="12" fill={colors.link} />
      <text x="200" y="155" textAnchor="middle" fontSize="10" fill={colors.label}>A perfectly balanced 2-3 Tree</text>
    </svg>
  </div>
);
