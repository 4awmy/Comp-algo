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

export default function Lecture4BruteForce() {
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
          Week 04
        </div>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Brute Force Algorithms
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: '1.5' }}>
          Textbook lesson on direct algorithm designs, analyzing Selection Sort, Bubble Sort, and Sequential Search.
        </p>
      </header>

      <Section title="1. What is a Brute-Force Strategy?">
        <p style={{ marginBottom: '12px' }}>
          <strong>Brute force</strong> is a straightforward approach to solving a problem, usually directly based on the problem statement and definitions of the concepts involved. It is often the simplest design paradigm, generating candidate solutions and checking them exhaustively.
        </p>
        <div style={{
          background: 'rgba(13, 44, 84, 0.03)',
          borderLeft: '4px solid var(--accent-blue)',
          padding: '12px 16px',
          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
          marginBottom: '16px',
          fontSize: '13px'
        }}>
          <strong>Key Characteristics:</strong>
          <ul style={{ marginLeft: '20px', marginTop: '6px', listStyleType: 'circle' }}>
            <li>Direct mapping to the problem definitions.</li>
            <li>No advanced heuristics, optimization techniques, or shortcuts.</li>
            <li>Guaranteed correctness (finds a solution if one exists).</li>
            <li>Usually inefficient (worst-case runtimes grow exponentially or quadratically).</li>
          </ul>
        </div>
      </Section>

      <Section title="2. Selection Sort">
        <p style={{ marginBottom: '12px' }}>
          Selection Sort is a brute-force sorting algorithm. We scan the entire list to find its smallest element and swap it with the first element, putting the smallest element in its final position. 
          Then we scan the list starting from the second element, find the smallest among the remaining elements, and swap it with the second element. We repeat this scan for all positions.
        </p>
        
        <h4 style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>Algorithm Analysis</h4>
        <p>The basic operation is the comparison <code>A[j] &lt; A[min_index]</code>. The number of key comparisons is independent of the input array state (same for best, worst, and average cases):</p>
        <Equation>
          {`C(n) = \sum_{i=0}^{n-2} \sum_{j=i+1}^{n-1} 1 = \sum_{i=0}^{n-2} (n - 1 - i)\n\nC(n) = \frac{n(n - 1)}{2} \approx \frac{n^2}{2} = \Theta(n^2)`}
        </Equation>
        <p style={{ marginBottom: '16px' }}>While comparisons are <code>&Theta;(n²)</code>, the number of swaps is at most <code>n - 1</code>, which is <code>O(n)</code>. This makes Selection Sort efficient when swaps are expensive.</p>

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
            Selection Sort Sandbox
          </h5>
          <AlgorithmVisualizer algorithm="selectionSort" />
        </div>
      </Section>

      <Section title="3. Bubble Sort">
        <p style={{ marginBottom: '12px' }}>
          Bubble Sort is another brute-force sorting algorithm. It compares adjacent elements of the list and swaps them if they are out of order. 
          By doing this repeatedly, the largest elements "bubble up" to the end of the array. The first pass guarantees that the largest element is placed at index <code>n - 1</code>.
        </p>

        <h4 style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>Algorithm Analysis</h4>
        <p>Like Selection Sort, the number of key comparisons is determined by the double loop structure. Even if the array is sorted, standard Bubble Sort runs all iterations:</p>
        <Equation>
          {`C(n) = \sum_{i=0}^{n-2} \sum_{j=0}^{n-2-i} 1 = \frac{n(n - 1)}{2} = \Theta(n^2)`}
        </Equation>
        <p style={{ marginBottom: '16px' }}>However, the number of swaps depends on the input. In the worst case (reverse sorted array), the number of swaps equals the comparisons: <code>&Theta;(n²)</code>.</p>

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
            Bubble Sort Sandbox
          </h5>
          <AlgorithmVisualizer algorithm="bubbleSort" />
        </div>
      </Section>

      <Section title="4. Sequential Search">
        <p style={{ marginBottom: '12px' }}>
          The simplest search algorithm. It compares the key <code>K</code> sequentially with each element of the array until a match is found (return index) or the list is exhausted (return <code>-1</code>).
        </p>
        <h4 style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>Complexity Analysis</h4>
        <ul style={{ marginLeft: '20px', marginBottom: '16px', listStyleType: 'square' }}>
          <li><strong>Best Case:</strong> Key matches at index 0 &rarr; <code>1</code> comparison, <code>O(1)</code></li>
          <li><strong>Worst Case:</strong> Key is at index <code>n-1</code> or not in list &rarr; <code>n</code> comparisons, <code>O(n)</code></li>
          <li><strong>Average Case:</strong> Assuming key is in array with probability <code>p</code> and equally likely at any position: <code>C_{avg}(n) \approx \frac{p(n+1)}{2} + n(1-p)</code>, which is <code>O(n)</code></li>
        </ul>
      </Section>
    </div>
  )
}
