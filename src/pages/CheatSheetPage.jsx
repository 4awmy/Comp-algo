import { Link } from 'react-router-dom'
import styles from './CheatSheetPage.module.css'

const ALGORITHMS = [
  {
    name: 'Selection Sort',
    category: 'Sorting (Brute Force)',
    best: 'O(n²)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: 'No',
    lecture: 'Lec 04',
    steps: ['1. Find min element in remaining unsorted array', '2. Swap it with first unsorted element', '3. Advance boundary of sorted array'],
    link: '/lecture/04?tab=visualizer',
  },
  {
    name: 'Bubble Sort',
    category: 'Sorting (Brute Force)',
    best: 'O(n)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: 'Yes',
    lecture: 'Lec 04',
    steps: ['1. Iterate through array', '2. Compare adjacent elements', '3. Swap if they are in wrong order', '4. Repeat until no swaps needed'],
    link: '/lecture/04?tab=visualizer',
  },
  {
    name: 'Insertion Sort',
    category: 'Sorting (Decrease & Conquer)',
    best: 'O(n)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: 'Yes',
    lecture: 'Lec 06',
    steps: ['1. Start with second element', '2. Compare with elements before it', '3. Shift greater elements right', '4. Insert element in correct position'],
    link: '/lecture/06?tab=visualizer',
  },
  {
    name: 'Merge Sort',
    category: 'Sorting (Divide & Conquer)',
    best: 'O(n log n)',
    avg: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    lecture: 'Lec 09',
    steps: ['1. Divide array into two halves', '2. Recursively sort both halves', '3. Merge sorted halves back together'],
    link: '/lecture/09?tab=visualizer',
  },
  {
    name: 'Quick Sort',
    category: 'Sorting (Divide & Conquer)',
    best: 'O(n log n)',
    avg: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    stable: 'No',
    lecture: 'Lec 09',
    steps: ['1. Pick a pivot element', '2. Partition array around pivot', '3. Recursively sort sub-arrays'],
    link: '/lecture/09?tab=visualizer',
  },
  {
    name: 'Heapsort',
    category: 'Sorting (Transform & Conquer)',
    best: 'O(n log n)',
    avg: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
    stable: 'No',
    lecture: 'Lec 10',
    steps: ['1. Build a max-heap from array', '2. Swap root with last element', '3. Restore heap property', '4. Repeat'],
    link: '/lecture/10?tab=visualizer',
  },
  {
    name: 'Sequential Search',
    category: 'Search (Brute Force)',
    best: 'O(1)',
    avg: 'O(n)',
    worst: 'O(n)',
    space: 'O(1)',
    stable: 'N/A',
    lecture: 'Lec 04',
    steps: ['1. Start from first element', '2. Compare with target', '3. Return index if found', '4. Move to next element'],
    link: '/lecture/04?tab=visualizer',
  },
  {
    name: 'Binary Search',
    category: 'Search (Decrease & Conquer)',
    best: 'O(1)',
    avg: 'O(log n)',
    worst: 'O(log n)',
    space: 'O(1)',
    stable: 'N/A',
    lecture: 'Lec 06',
    steps: ['1. Find middle element', '2. If target == mid, return', '3. If target < mid, search left half', '4. Else search right half'],
    link: '/lecture/06?tab=visualizer',
  },
  {
    name: 'Brute Force String Match',
    category: 'String Matching',
    best: 'O(m)',
    avg: 'O(n + m)',
    worst: 'O(n · m)',
    space: 'O(1)',
    stable: 'N/A',
    lecture: 'Lec 05',
    steps: ['1. Align pattern with start of text', '2. Compare characters left to right', '3. If mismatch, shift pattern by 1', '4. Repeat until match or end'],
    link: '/lecture/05?tab=visualizer',
  },
  {
    name: 'DFS / BFS Graph Traversal',
    category: 'Graph Algorithms',
    best: 'O(V + E)',
    avg: 'O(V + E)',
    worst: 'O(V + E)',
    space: 'O(V)',
    stable: 'N/A',
    lecture: 'Lec 06',
    steps: ['1. Start at source node', '2. Visit unvisited neighbors (DFS: deep, BFS: wide)', '3. Mark visited', '4. Repeat until all connected nodes visited'],
    link: '/lecture/06?tab=visualizer',
  }
]

export default function CheatSheetPage() {
  
  // Helper to color complexity cells
  const getComplexityClass = (compStr) => {
    const clean = compStr.toLowerCase().replace(/\s/g, '').replace('²', '2')
    if (clean.includes('o(1)')) return styles.complexityO1
    if (clean.includes('logn')) return styles.complexityOlogn
    if (clean.includes('o(n)') || clean.includes('v+e')) return styles.complexityOn
    if (clean.includes('nlogn') || clean.includes('n+m')) return styles.complexityOnlogn
    if (clean.includes('n2') || clean.includes('nm')) return styles.complexityOn2
    return ''
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Complexity Board</span>
        <h1 className={styles.title}>Algorithm Cheat Sheet</h1>
        <p className={styles.desc}>Quick reference for asymptotic running times and auxiliary space requirements.</p>
      </div>

      <div className={styles.grid}>
        {ALGORITHMS.map((algo, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.algoName}>{algo.name}</h3>
              <span className={styles.categoryBadge}>{algo.category}</span>
            </div>

            <div className={styles.complexityRows}>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Best Case:</span>
                <span className={`${styles.rowValue} ${getComplexityClass(algo.best)}`}>
                  {algo.best}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Average Case:</span>
                <span className={`${styles.rowValue} ${getComplexityClass(algo.avg)}`}>
                  {algo.avg}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Worst Case:</span>
                <span className={`${styles.rowValue} ${getComplexityClass(algo.worst)}`}>
                  {algo.worst}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Auxiliary Space:</span>
                <span className={`${styles.rowValue} ${getComplexityClass(algo.space)}`}>
                  {algo.space}
                </span>
              </div>
            </div>

            <div className={styles.cardSteps}>
              <h4 className={styles.stepsTitle}>Algorithm Steps:</h4>
              <ol className={styles.stepsList}>
                {algo.steps?.map((step, i) => (
                  <li key={i} className={styles.stepItem}>{step}</li>
                ))}
              </ol>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.footerInfo}>
                <span>Stable: <strong style={{ color: algo.stable === 'Yes' ? 'var(--color-success)' : algo.stable === 'No' ? 'var(--color-error)' : 'var(--text-secondary)' }}>{algo.stable}</strong></span>
                <span>Course Ref: {algo.lecture}</span>
              </div>
              {algo.link && (
                <Link to={algo.link} className={styles.visualizerLink}>
                  View in Visualizer ➔
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
