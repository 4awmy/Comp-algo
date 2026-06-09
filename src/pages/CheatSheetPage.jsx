import { Link } from 'react-router-dom'
import MathBlock from '../components/ui/Premium/MathBlock'
import styles from './CheatSheetPage.module.css'

const ALGORITHMS = [
  // ── Lec 01 ──────────────────────────────────────────────────
  {
    name: 'Sieve of Eratosthenes',
    category: 'Number Theory (Brute Force)',
    best: '\\Theta(n \\log \\log n)',
    avg: '\\Theta(n \\log \\log n)',
    worst: '\\Theta(n \\log \\log n)',
    space: '\\Theta(n)',
    stable: 'N/A',
    lecture: 'Lec 01',
    steps: ['1. Initialize boolean array of size n+1', '2. Start at p = 2', '3. Mark all multiples of p as composite', '4. Advance p to next unmarked number', '5. Repeat until p² > n'],
    link: '/lecture/01#sieve-complexity',
  },
  // ── Lec 04 ──────────────────────────────────────────────────
  {
    name: 'Selection Sort',
    category: 'Sorting (Brute Force)',
    best: '\\Theta(n^2)',
    avg: '\\Theta(n^2)',
    worst: '\\Theta(n^2)',
    space: '\\Theta(1)',
    stable: 'No',
    lecture: 'Lec 04',
    steps: ['1. Find min element in remaining unsorted array', '2. Swap it with first unsorted element', '3. Advance boundary of sorted array'],
    link: '/lecture/04#selection-sort-complexity',
  },
  {
    name: 'Bubble Sort',
    category: 'Sorting (Brute Force)',
    best: '\\Theta(n)',
    avg: '\\Theta(n^2)',
    worst: '\\Theta(n^2)',
    space: '\\Theta(1)',
    stable: 'Yes',
    lecture: 'Lec 04',
    steps: ['1. Iterate through array', '2. Compare adjacent elements', '3. Swap if they are in wrong order', '4. Repeat until no swaps needed'],
    link: '/lecture/04#bubble-sort-complexity',
  },
  {
    name: 'Sequential Search',
    category: 'Search (Brute Force)',
    best: '\\Theta(1)',
    avg: '\\Theta(n)',
    worst: '\\Theta(n)',
    space: '\\Theta(1)',
    stable: 'N/A',
    lecture: 'Lec 04',
    steps: ['1. Start from first element', '2. Compare with target', '3. Return index if found', '4. Move to next element'],
    link: '/lecture/04#sequential-search-complexity',
  },
  // ── Lec 05 ──────────────────────────────────────────────────
  {
    name: 'Brute Force String Match',
    category: 'String Matching (Brute Force)',
    best: '\\Theta(n)',
    avg: 'O(nm)',
    worst: 'O(n \\cdot m)',
    space: '\\Theta(1)',
    stable: 'N/A',
    lecture: 'Lec 05',
    steps: ['1. Align pattern with start of text', '2. Compare characters left to right', '3. If mismatch, shift pattern by 1', '4. Repeat until match or end'],
    link: '/lecture/05#string-match-complexity',
  },
  {
    name: 'Closest Pair',
    category: 'Computational Geometry (Brute Force)',
    best: '\\Theta(n^2)',
    avg: '\\Theta(n^2)',
    worst: '\\Theta(n^2)',
    space: '\\Theta(1)',
    stable: 'N/A',
    lecture: 'Lec 05',
    steps: ['1. Compute distance for every pair (i, j) with i < j', '2. Track minimum distance found', '3. Return the pair with minimum distance'],
    link: '/lecture/05#closest-pair-complexity',
  },
  {
    name: 'Traveling Salesman (Brute Force)',
    category: 'Combinatorial (Brute Force)',
    best: '\\Theta(n!)',
    avg: '\\Theta(n!)',
    worst: '\\Theta(n!)',
    space: '\\Theta(n)',
    stable: 'N/A',
    lecture: 'Lec 05',
    steps: ['1. Generate all possible Hamiltonian circuits', '2. Calculate total distance for each circuit', '3. Return the circuit with minimum distance'],
    link: '/lecture/05#tsp-complexity',
  },
  {
    name: 'Knapsack Problem (Brute Force)',
    category: 'Combinatorial (Brute Force)',
    best: '\\Theta(2^n)',
    avg: '\\Theta(2^n)',
    worst: '\\Theta(2^n)',
    space: '\\Theta(n)',
    stable: 'N/A',
    lecture: 'Lec 05',
    steps: ['1. Generate all possible subsets of items', '2. Check if subset weight ≤ capacity', '3. Track subset with maximum total value'],
    link: '/lecture/05#knapsack-complexity',
  },
  {
    name: 'Convex Hull (Brute Force)',
    category: 'Computational Geometry (Brute Force)',
    best: '\\Theta(n^3)',
    avg: '\\Theta(n^3)',
    worst: '\\Theta(n^3)',
    space: '\\Theta(n)',
    stable: 'N/A',
    lecture: 'Lec 05',
    steps: ['1. For every pair of points (p, q)', '2. Check if all other points lie on one side of line pq', '3. If yes, pq is an edge of the convex hull'],
    link: '/lecture/05#convex-hull-complexity',
  },
  // ── Lec 06 ──────────────────────────────────────────────────
  {
    name: 'Insertion Sort',
    category: 'Sorting (Decrease & Conquer)',
    best: '\\Theta(n)',
    avg: '\\Theta(n^2)',
    worst: '\\Theta(n^2)',
    space: '\\Theta(1)',
    stable: 'Yes',
    lecture: 'Lec 06',
    steps: ['1. Solve sub-problem of size n-1', '2. Find correct position for n-th element', '3. Shift greater elements right', '4. Insert element in sorted part'],
    link: '/lecture/06#insertion-sort-complexity',
  },
  {
    name: 'Depth-First Search (DFS)',
    category: 'Graph Algorithms',
    best: '\\Theta(V + E)',
    avg: '\\Theta(V + E)',
    worst: '\\Theta(V + E)',
    space: '\\Theta(V)',
    stable: 'N/A',
    lecture: 'Lec 06',
    steps: ['1. Start at source node', '2. Use a Stack (often recursion)', '3. Visit unvisited neighbor and move deeper', '4. Backtrack if no unvisited neighbors'],
    link: '/lecture/06#dfs-complexity',
  },
  {
    name: 'Breadth-First Search (BFS)',
    category: 'Graph Algorithms',
    best: '\\Theta(V + E)',
    avg: '\\Theta(V + E)',
    worst: '\\Theta(V + E)',
    space: '\\Theta(V)',
    stable: 'N/A',
    lecture: 'Lec 06',
    steps: ['1. Start at source node', '2. Use a Queue', '3. Dequeue and visit all unvisited neighbors', '4. Repeat until queue empty'],
    link: '/lecture/06#bfs-complexity',
  },
  {
    name: 'Topological Sort',
    category: 'Graph Algorithms (Decrease & Conquer)',
    best: '\\Theta(V + E)',
    avg: '\\Theta(V + E)',
    worst: '\\Theta(V + E)',
    space: '\\Theta(V)',
    stable: 'N/A',
    lecture: 'Lec 06',
    steps: ['1. Find in-degrees of all vertices', '2. Put vertices with in-degree 0 in queue', '3. Dequeue, add to result, reduce neighbors in-degree', '4. Enqueue if neighbor in-degree hits 0'],
    link: '/lecture/06#topological-sort-complexity',
  },
  // ── Lec 07 ──────────────────────────────────────────────────
  {
    name: 'Binary Search',
    category: 'Search (Decrease & Conquer)',
    best: '\\Theta(1)',
    avg: '\\Theta(\\log n)',
    worst: '\\Theta(\\log n)',
    space: '\\Theta(1)',
    stable: 'N/A',
    lecture: 'Lec 07',
    steps: ['1. Find middle element', '2. If target == mid, return', '3. If target < mid, search left half', '4. Else search right half'],
    link: '/lecture/07#binary-search-complexity',
  },
  {
    name: 'Johnson-Trotter',
    category: 'Permutations (Decrease & Conquer)',
    best: '\\Theta(n!)',
    avg: '\\Theta(n!)',
    worst: '\\Theta(n!)',
    space: '\\Theta(n)',
    stable: 'No',
    lecture: 'Lec 07',
    steps: ['1. Initialize first permutation with directions', '2. Find largest mobile element k', '3. Swap k with element it points to', '4. Reverse directions of all elements > k'],
    link: '/lecture/07#permutations-complexity',
  },
  {
    name: 'Binary Reflected Gray Code',
    category: 'Subsets (Decrease & Conquer)',
    best: '\\Theta(2^n)',
    avg: '\\Theta(2^n)',
    worst: '\\Theta(2^n)',
    space: '\\Theta(2^n)',
    stable: 'N/A',
    lecture: 'Lec 07',
    steps: ['1. Base case: L1 = [0, 1]', '2. Reflect L(n-1) to get L\'', '3. Prepend 0 to L(n-1) and 1 to L\'', '4. Concatenate to get Ln'],
    link: '/lecture/07#subsets-complexity',
  },
  {
    name: 'Fake Coin (n/3)',
    category: 'Search (Decrease & Conquer)',
    best: '\\Theta(\\log_3 n)',
    avg: '\\Theta(\\log_3 n)',
    worst: '\\Theta(\\log_3 n)',
    space: '\\Theta(1)',
    stable: 'N/A',
    lecture: 'Lec 07',
    steps: ['1. Split coins into 3 equal groups', '2. Weigh group 1 vs group 2', '3. Unequal → fake is in lighter group; equal → fake is in group 3', '4. Recurse on the group containing the fake'],
    link: '/lecture/07#fake-coin-complexity',
  },
  {
    name: 'Russian Peasant Multiplication',
    category: 'Arithmetic (Decrease & Conquer)',
    best: '\\Theta(\\log n)',
    avg: '\\Theta(\\log n)',
    worst: '\\Theta(\\log n)',
    space: '\\Theta(1)',
    stable: 'N/A',
    lecture: 'Lec 07',
    steps: ['1. Write n and m side by side', '2. Halve n (integer division) and double m', '3. Repeat until n = 1', '4. Sum m values where corresponding n was odd'],
    link: '/lecture/07#russian-peasant-complexity',
  },
  {
    name: 'Josephus Problem',
    category: 'Combinatorial (Decrease & Conquer)',
    best: '\\Theta(\\log n)',
    avg: '\\Theta(\\log n)',
    worst: '\\Theta(\\log n)',
    space: '\\Theta(1)',
    stable: 'N/A',
    lecture: 'Lec 07',
    steps: ['1. Represent n in binary', '2. Perform 1-bit left cyclic shift', '3. Resulting value is the survivor position J(n)'],
    link: '/lecture/07#josephus-complexity',
  },
  // ── Lec 09 ──────────────────────────────────────────────────
  {
    name: 'Merge Sort',
    category: 'Sorting (Divide & Conquer)',
    best: '\\Theta(n \\log n)',
    avg: '\\Theta(n \\log n)',
    worst: '\\Theta(n \\log n)',
    space: '\\Theta(n)',
    stable: 'Yes',
    lecture: 'Lec 09',
    steps: ['1. Divide array into two halves', '2. Recursively sort both halves', '3. Merge sorted halves back together'],
    link: '/lecture/09#merge-sort-complexity',
  },
  {
    name: 'Quick Sort',
    category: 'Sorting (Divide & Conquer)',
    best: '\\Theta(n \\log n)',
    avg: '\\Theta(n \\log n)',
    worst: '\\Theta(n^2)',
    space: '\\Theta(\\log n)',
    stable: 'No',
    lecture: 'Lec 09',
    steps: ['1. Pick a pivot element', '2. Partition array around pivot', '3. Recursively sort sub-arrays'],
    link: '/lecture/09#quick-sort-complexity',
  },
  {
    name: 'Binary Tree Traversal',
    category: 'Trees (Divide & Conquer)',
    best: '\\Theta(n)',
    avg: '\\Theta(n)',
    worst: '\\Theta(n)',
    space: '\\Theta(h)',
    stable: 'N/A',
    lecture: 'Lec 09',
    steps: ['1. Choose preorder, inorder, or postorder', '2. Recursively traverse the left subtree', '3. Recursively traverse the right subtree', '4. Visit each node exactly once'],
    link: '/lecture/09#tree-traversal-complexity',
  },
  // ── Lec 10 ──────────────────────────────────────────────────
  {
    name: 'AVL Trees (ops)',
    category: 'Search Trees (Transform & Conquer)',
    best: '\\Theta(1)',
    avg: '\\Theta(\\log n)',
    worst: '\\Theta(\\log n)',
    space: '\\Theta(n)',
    stable: 'N/A',
    lecture: 'Lec 10',
    steps: ['1. Standard BST Insert/Delete', '2. Update Balance Factor for ancestors', '3. If |BF| > 1, perform rotations (LL, RR, LR, RL)'],
    link: '/lecture/10#avl-trees-complexity',
  },
  {
    name: 'Heapsort',
    category: 'Sorting (Transform & Conquer)',
    best: '\\Theta(n \\log n)',
    avg: '\\Theta(n \\log n)',
    worst: '\\Theta(n \\log n)',
    space: '\\Theta(1)',
    stable: 'No',
    lecture: 'Lec 10',
    steps: ['1. Build a max-heap from array', '2. Swap root with last element', '3. Restore heap property', '4. Repeat'],
    link: '/lecture/10#heapsort-complexity',
  },
  {
    name: "Horner's Rule",
    category: 'Polynomial Evaluation (Transform & Conquer)',
    best: '\\Theta(n)',
    avg: '\\Theta(n)',
    worst: '\\Theta(n)',
    space: '\\Theta(1)',
    stable: 'N/A',
    lecture: 'Lec 10',
    steps: ['1. Start with p = a[n]', '2. Loop from i = n-1 down to 0', '3. Update p = p * x + a[i]'],
    link: '/lecture/10#horners-rule-complexity',
  },
  // ── Lec 11 ──────────────────────────────────────────────────
  {
    name: 'Comparison Counting Sort',
    category: 'Sorting (Input Enhancement)',
    best: '\\Theta(n^2)',
    avg: '\\Theta(n^2)',
    worst: '\\Theta(n^2)',
    space: '\\Theta(n)',
    stable: 'No',
    lecture: 'Lec 11',
    steps: ['1. Initialize Count array with zeros', '2. Compare all element pairs (i, j) where i < j', '3. Increment Count of the larger element', '4. Place each element at index Count[i] in S'],
    link: '/lecture/11#counting-sort-complexity',
  },
  {
    name: "Horspool's String Match",
    category: 'String Matching (Input Enhancement)',
    best: '\\Theta(n)',
    avg: '\\Theta(n)',
    worst: 'O(n \\cdot m)',
    space: '\\Theta(|\\Sigma|)',
    stable: 'N/A',
    lecture: 'Lec 11',
    steps: ['1. Compute Shift Table for pattern of size m', '2. Align pattern with text beginning', '3. Compare characters right-to-left', '4. On mismatch, shift pattern using table value'],
    link: '/lecture/11#horspool-complexity',
  },
  {
    name: 'Open Hashing (Chaining)',
    category: 'Dictionary (Pre-structuring)',
    best: '\\Theta(1)',
    avg: '\\Theta(1 + \\alpha)',
    worst: '\\Theta(n)',
    space: '\\Theta(n)',
    stable: 'N/A',
    lecture: 'Lec 11',
    steps: ['1. Compute hash h(K) for key index', '2. Access linked list at Table[h(K)]', '3. Traverse list to search, insert, or delete'],
    link: '/lecture/11#hashing-complexity',
  },
  {
    name: 'Closed Hashing (Linear Probing)',
    category: 'Dictionary (Pre-structuring)',
    best: '\\Theta(1)',
    avg: '\\Theta(1 / (1 - \\alpha))',
    worst: '\\Theta(n)',
    space: '\\Theta(m)',
    stable: 'N/A',
    lecture: 'Lec 11',
    steps: ['1. Compute hash h(K) for key index', '2. If occupied, probe index+1, index+2, ... mod m', '3. Insert at first empty slot found'],
    link: '/lecture/11#hashing-complexity',
  },
  {
    name: 'B-Trees',
    category: 'Search Trees (Pre-structuring)',
    best: '\\Theta(1)',
    avg: 'O(\\log n)',
    worst: 'O(\\log n)',
    space: '\\Theta(n)',
    stable: 'N/A',
    lecture: 'Lec 11',
    steps: ['1. Start search at tree root node', '2. Binary search keys inside current node', '3. Follow child pointer corresponding to range', '4. Repeat until key found or leaf reached'],
    link: '/lecture/11#btrees-complexity',
  },
  // ── Lec 13 ──────────────────────────────────────────────────
  {
    name: 'Coin-Row Problem (DP)',
    category: 'Dynamic Programming',
    best: '\\Theta(n)',
    avg: '\\Theta(n)',
    worst: '\\Theta(n)',
    space: '\\Theta(n)',
    stable: 'N/A',
    lecture: 'Lec 13',
    steps: ['1. F(1) = c₁, F(2) = max(c₁, c₂)', '2. F(i) = max(cᵢ + F(i−2), F(i−1))', '3. Fill table left to right', '4. Trace back for selection'],
    link: '/lecture/13#coin-row-complexity',
  },
  {
    name: '0/1 Knapsack (DP)',
    category: 'Dynamic Programming',
    best: '\\Theta(nW)',
    avg: '\\Theta(nW)',
    worst: '\\Theta(nW)',
    space: '\\Theta(nW)',
    stable: 'N/A',
    lecture: 'Lec 13',
    steps: ['1. Build n×W table', '2. V[i][j] = max(V[i−1][j], vᵢ + V[i−1][j−wᵢ]) if wᵢ ≤ j', '3. V[i][j] = V[i−1][j] otherwise', '4. Traceback for selected items'],
    link: '/lecture/13#knapsack-complexity',
  },
  {
    name: "Warshall's Algorithm",
    category: 'Graph Algorithms (Dynamic Programming)',
    best: '\\Theta(n^3)',
    avg: '\\Theta(n^3)',
    worst: '\\Theta(n^3)',
    space: '\\Theta(n^2)',
    stable: 'N/A',
    lecture: 'Lec 13',
    steps: ['1. Initialize transitive closure from adjacency matrix', '2. For each intermediate vertex k (1 to n)', '3. R[i][j] = R[i][j] ∨ (R[i][k] ∧ R[k][j])'],
    link: '/lecture/13#warshall-complexity',
  },
  {
    name: "Floyd's Shortest Path",
    category: 'Graph Algorithms (Dynamic Programming)',
    best: '\\Theta(n^3)',
    avg: '\\Theta(n^3)',
    worst: '\\Theta(n^3)',
    space: '\\Theta(n^2)',
    stable: 'N/A',
    lecture: 'Lec 13',
    steps: ['1. Initialize distance matrix D with edge weights', '2. For each intermediate vertex k', '3. D[i][j] = min(D[i][j], D[i][k] + D[k][j])'],
    link: '/lecture/13#floyd-complexity',
  },
  {
    name: "Prim's MST",
    category: 'Greedy Algorithms (Graph)',
    best: 'O(E \\log V)',
    avg: 'O(E \\log V)',
    worst: 'O(E \\log V)',
    space: '\\Theta(V)',
    stable: 'N/A',
    lecture: 'Lec 13',
    steps: ['1. Start with arbitrary vertex in MST', '2. At each step, add cheapest edge connecting MST to non-MST vertex', '3. Repeat until all vertices included'],
    link: '/lecture/13#prims-complexity',
  },
  {
    name: "Kruskal's MST",
    category: 'Greedy Algorithms (Graph)',
    best: 'O(E \\log E)',
    avg: 'O(E \\log E)',
    worst: 'O(E \\log E)',
    space: '\\Theta(E)',
    stable: 'N/A',
    lecture: 'Lec 13',
    steps: ['1. Sort all edges by weight', '2. Pick smallest edge not forming a cycle', '3. Use Union-Find to detect cycles', '4. Repeat until V−1 edges selected'],
    link: '/lecture/13#kruskals-complexity',
  },
  {
    name: "Dijkstra's Shortest Path",
    category: 'Greedy Algorithms (Graph)',
    best: 'O((V + E) \\log V)',
    avg: 'O((V + E) \\log V)',
    worst: 'O((V + E) \\log V)',
    space: '\\Theta(V)',
    stable: 'N/A',
    lecture: 'Lec 13',
    steps: ['1. Initialize dist[source] = 0, all others = ∞', '2. Extract min-dist vertex from priority queue', '3. Relax all outgoing edges', '4. Repeat until all vertices processed'],
    link: '/lecture/13#dijkstras-complexity',
  },
  {
    name: 'Huffman Coding',
    category: 'Greedy Algorithms (Compression)',
    best: 'O(n \\log n)',
    avg: 'O(n \\log n)',
    worst: 'O(n \\log n)',
    space: '\\Theta(n)',
    stable: 'N/A',
    lecture: 'Lec 13',
    steps: ['1. Build min-heap from character frequencies', '2. Extract two smallest nodes, merge into new node', '3. Insert merged node back into heap', '4. Repeat until one node remains (the tree root)'],
    link: '/lecture/13#huffman-complexity',
  },
]

export default function CheatSheetPage() {
  
  // Helper to color complexity cells
  const getComplexityClass = (compStr) => {
    const clean = compStr.toLowerCase().replace(/[\s\\{}]/g, '').replace('theta', '').replace('^', '').replace('cdot', '')
    if (clean.includes('(1)')) return styles.complexityO1
    if (clean.includes('logn')) return styles.complexityOlogn
    if (clean.includes('(n)') || clean.includes('v+e')) return styles.complexityOn
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
                  <MathBlock math={algo.best} />
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Average Case:</span>
                <span className={`${styles.rowValue} ${getComplexityClass(algo.avg)}`}>
                  <MathBlock math={algo.avg} />
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Worst Case:</span>
                <span className={`${styles.rowValue} ${getComplexityClass(algo.worst)}`}>
                  <MathBlock math={algo.worst} />
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Auxiliary Space:</span>
                <span className={`${styles.rowValue} ${getComplexityClass(algo.space)}`}>
                  <MathBlock math={algo.space} />
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
