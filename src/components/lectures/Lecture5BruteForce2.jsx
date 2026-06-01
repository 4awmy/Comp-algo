/* eslint-disable */
import React from 'react'
import AlgorithmVisualizer from '../visualization/AlgorithmVisualizer'

const Equation = ({ children }) => (
  <div style={{
    margin: '16px 0',
    background: 'var(--bg-elevated)',
    padding: '12px 16px',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-code)',
    fontSize: 'var(--text-xs)',
    color: 'var(--accent-blue)',
    border: '1px solid var(--border-subtle)',
    display: 'flex',
    justifyContent: 'center',
    overflowX: 'auto',
    whiteSpace: 'pre'
  }}>
    {children}
  </div>
)

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3 style={{
      fontSize: 'var(--text-lg)',
      fontWeight: '800',
      color: 'var(--accent-blue)',
      borderBottom: '2px solid var(--accent-purple)',
      paddingBottom: '8px',
      display: 'inline-block',
      marginBottom: '16px'
    }}>
      {title}
    </h3>
    <div style={{
      color: 'var(--text-secondary)',
      lineHeight: '1.7',
      fontSize: 'var(--text-sm)'
    }}>
      {children}
    </div>
  </div>
)

export default function Lecture5BruteForce2() {
  return (
    <div style={{ padding: '8px 4px', maxWidth: '850px', margin: '0 auto' }}>
      <header style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          fontSize: '10px',
          fontWeight: '700',
          background: 'rgba(13, 44, 84, 0.1)',
          color: 'var(--accent-blue)',
          marginBottom: '12px'
        }}>
          Week 05
        </div>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Brute Force II & String Matching
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: '1.5' }}>
          Advanced brute-force designs, exploring string matching, closest-pair, and convex hull algorithms.
        </p>
      </header>

      <Section title="1. Brute-Force String Matching">
        <p style={{ marginBottom: '12px' }}>
          Given a Text string <code>T</code> of length <code>n</code> and a Pattern string <code>P</code> of length <code>m</code> (where <code>m &le; n</code>), 
          the string matching problem is to find the first occurrence (index) of <code>P</code> in <code>T</code>.
        </p>
        <p style={{ marginBottom: '12px' }}>
          The brute-force approach aligns the pattern with the text starting at index <code>i = 0</code>. It compares characters sequentially from left to right. 
          If a mismatch occurs, it shifts the pattern by exactly one index to the right (<code>i</code> becomes <code>i + 1</code>) and restarts the character scan (<code>j = 0</code>).
        </p>

        <h4 style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>Complexity Analysis</h4>
        <ul style={{ marginLeft: '20px', marginBottom: '16px', listStyleType: 'square' }}>
          <li><strong>Worst Case:</strong> We do <code>m</code> comparisons at each of the <code>n - m + 1</code> alignments. This yields <code>O(n·m)</code> key comparisons. (Example: <code>T = "AAAAAAAAB"</code>, <code>P = "AAAB"</code>)</li>
          <li><strong>Best Case:</strong> Comparison fails on the very first character of the pattern at each shift. Requires exactly <code>n - m + 1</code> comparisons, which is <code>O(n)</code>.</li>
          <li><strong>Average Case:</strong> On typical natural language texts, the algorithm rejects mismatch alignments quickly, resulting in an empirical complexity of <code>O(n + m)</code> comparisons.</li>
        </ul>

        {/* Embedded Interactive Visualizer */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '24px'
        }}>
          <h5 style={{ fontWeight: '700', color: 'var(--accent-blue)', marginBottom: '12px', fontSize: 'var(--text-sm)' }}>
            String Matching Sandbox
          </h5>
          <AlgorithmVisualizer algorithm="stringMatching" targetKey="CAD" />
        </div>
      </Section>

      <Section title="2. Closest-Pair Problem">
        <p style={{ marginBottom: '12px' }}>
          The closest-pair problem is to find the two points in a set of <code>n</code> points in a 2D plane that are closest to each other.
        </p>
        <p style={{ marginBottom: '12px' }}>
          The brute-force solution calculates the Euclidean distance between all pairs of points and returns the minimum:
        </p>
        <Equation>
          {`d(P_i, P_j) = \sqrt{(x_i - x_j)^2 + (y_i - y_j)^2}`}
        </Equation>
        <p>Because there are <code>n(n - 1) / 2</code> combinations of pairs, the time complexity of calculating distances is <code>&Theta;(n²)</code>, which is slow for large datasets. This is optimized later via Divide & Conquer to <code>O(n log n)</code>.</p>
      </Section>

      <Section title="3. Convex Hull Problem">
        <p style={{ marginBottom: '12px' }}>
          A <strong>convex hull</strong> of a set of <code>S</code> points is the smallest convex polygon containing all points in <code>S</code>. 
          A polygon is convex if, for any two points inside the polygon, the line segment connecting them lies entirely inside the polygon.
        </p>
        <h4 style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>Brute-Force Solution (Extreme Points)</h4>
        <p style={{ marginBottom: '12px' }}>
          For every pair of points <code>P_i</code> and <code>P_j</code> in the set:
        </p>
        <ul style={{ marginLeft: '20px', marginBottom: '16px', listStyleType: 'circle' }}>
          <li>Construct a line passing through <code>P_i</code> and <code>P_j</code> (Equation: <code>ax + by = c</code>).</li>
          <li>Check if all other <code>n - 2</code> points lie on the same side of this line (i.e. check if <code>ax_k + by_k - c</code> has the same sign for all remaining points <code>k</code>).</li>
          <li>If all other points lie on one side of the line, the line segment <code>P_i P_j</code> is a boundary edge of the convex hull!</li>
        </ul>
        <p>Since we check all pairs <code>O(n²)</code> and scan all other points for each pair <code>O(n)</code>, the brute-force convex hull complexity is <code>O(n³)</code>.</p>
      </Section>
    </div>
  )
}
