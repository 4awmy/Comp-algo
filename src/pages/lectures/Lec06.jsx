import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import InsertionSortTracer from '../../components/visualization/bespoke/InsertionSortTracer';
import DfsTracer from '../../components/visualization/bespoke/DfsTracer';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec06 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 06"
        title="Decrease & Conquer"
        subtitle="Exploiting the relationship between a problem and its smaller instances to achieve elegant and efficient solutions."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            The <b>decrease-and-conquer</b> technique is a powerful algorithmic paradigm based on exploiting the relationship between a solution to a given instance of a problem and a solution to its smaller instance. Unlike divide-and-conquer, which splits problems into multiple sub-problems, decrease-and-conquer reduces the problem to a <b>single</b> smaller instance.
          </p>
          
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Major Variations</h4>
              <ul>
                <li><b>Decrease by a Constant:</b> Typically reduced by 1 (e.g., Insertion Sort).</li>
                <li><b>Decrease by a Constant Factor:</b> Reduced by a factor, usually 2 (e.g., Binary Search).</li>
                <li><b>Variable Size Decrease:</b> Reduction size varies between iterations (e.g., Euclid's Algorithm).</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="insertion-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Decrease by a Constant: Insertion Sort</h2>
          <p className={styles.editorialText}>
            Insertion sort is the direct application of the decrease-by-one technique to the sorting problem. It assumes that the sub-problem of size <MathBlock math="n-1" /> is already solved, and then inserts the <MathBlock math="n" />-th element into its correct position.
          </p>

          <MathBlock 
            block 
            math="C_{avg}(n) \approx \frac{n^2}{4} \in \Theta(n^2)" 
            caption="Average-case time complexity of Insertion Sort."
          />

          <InsertionSortTracer />

          <p className={styles.editorialText}>
            While its worst-case performance is <MathBlock math="\Theta(n^2)" />, Insertion Sort is incredibly efficient for <b>nearly sorted</b> arrays and small datasets, often outperforming more complex <MathBlock math="\Theta(n \log n)" /> algorithms in those specific cases.
          </p>
        </section>

        <section id="graph-traversals" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Graph Traversals: DFS & BFS</h2>
          <p className={styles.editorialText}>
            Graph traversals are fundamental operations that visit every vertex in a graph. While they are often seen as exhaustive "brute force" searches of the graph's state space, they serve as the building blocks for many sophisticated decrease-and-conquer algorithms, such as Topological Sorting.
          </p>

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>DFS Complexity</span>
              <MathBlock math="\Theta(|V| + |E|)" />
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>BFS Complexity</span>
              <MathBlock math="\Theta(|V| + |E|)" />
            </div>
          </div>

          <DfsTracer />

          <div className={styles.comparisonGrid}>
            <div id="dfs" className={styles.comparisonCard}>
              <h3>Depth-First Search (DFS)</h3>
              <p>Uses a <b>Stack</b> (often via recursion). It explores as deep as possible along each branch before backtracking. Perfect for finding cycles and connectivity.</p>
            </div>
            <div id="bfs" className={styles.comparisonCard}>
              <h3>Breadth-First Search (BFS)</h3>
              <p>Uses a <b>Queue</b>. It explores all neighbor nodes at the present depth before moving to nodes at the next depth level. Optimal for finding the shortest path in unweighted graphs.</p>
            </div>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Topological Sorting</h2>
          <p className={styles.editorialText}>
            Topological sorting is a linear ordering of vertices in a <b>Directed Acyclic Graph (DAG)</b> such that for every directed edge <MathBlock math="u \to v" />, vertex <MathBlock math="u" /> comes before <MathBlock math="v" />.
          </p>

          <div className={styles.methodBox}>
            <h3>Method 1: DFS-based</h3>
            <p>Perform a DFS and note the order in which vertices become dead-ends (popped off the stack). Reversing this order yields the topological sort.</p>
            <MathBlock math="T(n) \in \Theta(V + E)" />
          </div>

          <div className={styles.methodBox}>
            <h3>Method 2: Source Removal</h3>
            <p>Repeatedly identify and remove a "source" (a vertex with in-degree 0) from the graph and add it to the sorted list.</p>
            <MathBlock math="T(n) \in \Theta(V + E)" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec06;
