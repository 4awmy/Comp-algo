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

            <div className={styles.cardFooter}>
              <span>Stable: <strong style={{ color: algo.stable === 'Yes' ? 'var(--color-success)' : algo.stable === 'No' ? 'var(--color-error)' : 'var(--text-secondary)' }}>{algo.stable}</strong></span>
              <span>Course Ref: {algo.lecture}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
