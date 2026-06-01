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

export default function Lecture6DecreaseConquer() {
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
          Week 06
        </div>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Decrease & Conquer Algorithms
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: '1.5' }}>
          Understanding the Decrease & Conquer paradigm through Insertion Sort and Binary Search.
        </p>
      </header>

      <Section title="1. The Decrease-and-Conquer Paradigm">
        <p style={{ marginBottom: '12px' }}>
          <strong>Decrease-and-conquer</strong> is an algorithmic design technique based on reducing a problem instance to a smaller instance of the same problem, solving the smaller instance, and extending the solution to solve the original instance.
        </p>
        <p style={{ marginBottom: '12px' }}>
          Unlike divide-and-conquer, which divides the problem into multiple subproblems (which can lead to multiple recursive branches), decrease-and-conquer usually results in a single subproblem.
        </p>
        <div style={{
          background: 'rgba(13, 44, 84, 0.03)',
          borderLeft: '4px solid var(--accent-blue)',
          padding: '12px 16px',
          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
          marginBottom: '16px',
          fontSize: '13px'
        }}>
          <strong>Three Major Variations:</strong>
          <ul style={{ marginLeft: '20px', marginTop: '6px', listStyleType: 'circle' }}>
            <li><strong>Decrease by a Constant</strong>: Reduce instance size by a constant amount (usually 1). Example: Insertion Sort, DFS, BFS.</li>
            <li><strong>Decrease by a Constant Factor</strong>: Reduce instance size by a constant ratio (usually 2). Example: Binary Search.</li>
            <li><strong>Variable-Size Decrease</strong>: Reduction size varies at each step. Example: Euclidean algorithm for GCD.</li>
          </ul>
        </div>
      </Section>

      <Section title="2. Insertion Sort">
        <p style={{ marginBottom: '12px' }}>
          Insertion Sort is a classic application of the "decrease-by-1" strategy. To sort an array <code>A[0..n-1]</code>, we assume <code>A[0..n-2]</code> is already sorted, and then insert the final element <code>A[n-1]</code> into its correct position among the sorted elements.
        </p>

        <h4 style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>Complexity Analysis</h4>
        <ul style={{ marginLeft: '20px', marginBottom: '16px', listStyleType: 'square' }}>
          <li><strong>Worst Case:</strong> The input array is reverse sorted. We compare and shift every element at each pass. Key comparisons and swaps are <code>C_{worst}(n) = \frac{n(n - 1)}{2} = \Theta(n^2)</code>.</li>
          <li><strong>Best Case:</strong> The input array is already sorted. We only do 1 comparison at each pass and 0 swaps. Time complexity is linear: <code>C_{best}(n) = n - 1 = \Theta(n)</code>.</li>
          <li><strong>Average Case:</strong> On average, we scan and shift half of the sorted subarray. Runtimes remain quadratic: <code>C_{avg}(n) \approx \frac{n^2}{4} = \Theta(n^2)</code>.</li>
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
            Insertion Sort Sandbox
          </h5>
          <AlgorithmVisualizer algorithm="insertionSort" />
        </div>
      </Section>

      <Section title="3. Binary Search">
        <p style={{ marginBottom: '12px' }}>
          Binary Search is a "decrease-by-constant-factor" (specifically by a factor of 2) algorithm for searching in a <strong>sorted array</strong>. 
          It compares the search key <code>K</code> with the middle element <code>A[mid]</code>. 
          If they match, it returns the index. If <code>K &lt; A[mid]</code>, it repeats the search in the left half. If <code>K &gt; A[mid]</code>, it repeats the search in the right half.
        </p>

        <h4 style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>Recurrence and Complexity</h4>
        <p>The worst-case number of key comparisons <code>C(n)</code> satisfies the recurrence:</p>
        <Equation>
          {`C(n) = C(\lfloor n/2 \rfloor) + 1 \quad \text{for } n > 1, \quad C(1) = 1`}
        </Equation>
        <p style={{ marginBottom: '16px' }}>Solving this using the Master Theorem or backward substitution gives a logarithmic complexity: <code>C(n) = \lfloor \log_2 n \rfloor + 1 = \Theta(\log n)</code>.</p>

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
            Binary Search Sandbox
          </h5>
          <AlgorithmVisualizer algorithm="binarySearch" targetKey="56" />
        </div>
      </Section>
    </div>
  )
}
