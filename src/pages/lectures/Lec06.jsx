import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';

import InsertionSortTracer from '../../components/visualization/bespoke/InsertionSortTracer';
import DfsTracer from '../../components/visualization/bespoke/DfsTracer';
import TopologicalSortTracer from '../../components/visualization/bespoke/TopologicalSortTracer';
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

          <PremiumImage 
            src="/images/lectures/lec06/slide11_img0.jpg" 
            alt="Decrease and Conquer Overview" 
            caption="The three major variations of the decrease-and-conquer paradigm."
            style={{ margin: '2.5rem 0' }}
          />
          
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Major Variations</h4>
              <ul className={styles.editorialList}>
                <li>
                  <b>Decrease by a Constant:</b> The size of an instance is reduced by the same constant (typically 1) on each iteration.
                  <MathBlock math="n \to n-1" />
                  <em>Example: Insertion Sort, DFS/BFS.</em>
                </li>
                <li>
                  <b>Decrease by a Constant Factor:</b> The size is reduced by the same constant factor (typically 2) on each iteration.
                  <MathBlock math="n \to n/2" />
                  <em>Example: Binary Search, Exponentiation by Squaring.</em>
                </li>
                <li>
                  <b>Variable Size Decrease:</b> The size-reduction pattern varies from one iteration to another.
                  <em>Example: Euclid's Algorithm for GCD.</em>
                  <MathBlock math="\text{gcd}(m, n) = \text{gcd}(n, m \pmod n)" />
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="insertion-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Decrease by a Constant: Insertion Sort</h2>
          <p className={styles.editorialText}>
            Insertion sort is the direct application of the decrease-by-one technique to the sorting problem. It assumes that the sub-problem of size <MathBlock math="n-1" /> is already solved, and then inserts the <MathBlock math="n" />-th element into its correct position.
          </p>

          <AlgorithmCard 
            title="Insertion Sort"
            goal="Sort an array by building a sorted sub-array one element at a time."
            steps={[
              "Assume the first element of the array is already sorted.",
              "Take the next element from the unsorted part.",
              "Compare it with elements in the sorted sub-array from right to left.",
              "Shift elements to the right until the correct insertion point is found.",
              "Insert the element and repeat for all remaining items."
            ]}
            complexity={{ time: "O(n^2)", space: "O(1)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec06/slide16_img0.jpg" 
            alt="Insertion Sort Diagram" 
            caption="The process of inserting an element into a sorted sub-array."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.infoCard} style={{ marginBottom: '2rem' }}>
            <h4>Brute Force vs. Decrease & Conquer</h4>
            <p className={styles.editorialText}>
              Compare <b>Selection Sort</b> (Brute Force) with <b>Insertion Sort</b> (Decrease & Conquer):
            </p>
            <ul className={styles.editorialList}>
              <li><b>Selection Sort:</b> Scans the entire unsorted part to find the minimum. It doesn't care if the array is already sorted.</li>
              <li><b>Insertion Sort:</b> Scans only as far as needed to find the insertion point. It exploits the "sortedness" of the sub-array.</li>
            </ul>
          </div>

          <InsertionSortTracer style={{ margin: '2.5rem 0' }} />
        </section>

        <section id="graph-traversals" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Graph Traversals: DFS & BFS</h2>
          <p className={styles.editorialText}>
            Graph traversals are fundamental operations that visit every vertex in a graph. While they are often seen as exhaustive "brute force" searches of the graph's state space, they serve as the building blocks for many sophisticated decrease-and-conquer algorithms, such as Topological Sorting.
          </p>

          <div className={styles.gridTwoCol}>
            <AlgorithmCard 
              title="Depth-First Search (DFS)"
              goal="Explore a graph by going as deep as possible along each branch."
              steps={[
                "Start at a vertex and mark it as 'visited'.",
                "For each unvisited neighbor, recursively call DFS.",
                "If a vertex has no unvisited neighbors, backtrack to the previous vertex.",
                "Continue until all reachable vertices are visited."
              ]}
              complexity={{ time: "\\Theta(V + E)", space: "O(V)" }}
            />
            <AlgorithmCard 
              title="Breadth-First Search (BFS)"
              goal="Explore a graph level-by-level starting from a given vertex."
              steps={[
                "Start at a vertex, mark it visited, and add it to a queue.",
                "While the queue is not empty, dequeue a vertex.",
                "Visit all its unvisited neighbors, mark them visited, and enqueue them.",
                "Repeat until the queue is empty."
              ]}
              complexity={{ time: "\\Theta(V + E)", space: "O(V)" }}
            />
          </div>

          <DfsTracer style={{ margin: '2.5rem 0' }} />

          <PremiumImage 
            src="/images/lectures/lec06/slide08_img0.png" 
            alt="BFS Diagram" 
            caption="The level-by-level exploration pattern of Breadth-First Search."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.comparisonGrid} style={{ margin: '2.5rem 0' }}>
            <div id="dfs" className={styles.comparisonCard}>
              <h3>DFS Characteristics</h3>
              <p>Uses a <b>Stack</b> (often via recursion). Perfect for finding cycles, connectivity, and strongly connected components.</p>
            </div>
            <div id="bfs" className={styles.comparisonCard}>
              <h3>BFS Characteristics</h3>
              <p>Uses a <b>Queue</b>. Optimal for finding the shortest path in unweighted graphs and exploring concentric layers.</p>
            </div>
          </div>
        </section>

        <section id="topological-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Topological Sorting</h2>
          <p className={styles.editorialText}>
            Topological sorting is a linear ordering of vertices in a <b>Directed Acyclic Graph (DAG)</b> such that for every directed edge <MathBlock math="u \to v" />, vertex <MathBlock math="u" /> comes before <MathBlock math="v" />.
          </p>

          <AlgorithmCard 
            title="Topological Sort (Source Removal)"
            goal="Order vertices of a DAG based on their dependencies."
            steps={[
              "Calculate the in-degree of every vertex in the graph.",
              "Identify all 'sources' (vertices with in-degree 0).",
              "Remove a source, add it to the sorted list, and 'delete' its outgoing edges.",
              "Update the in-degrees of the neighbors. If any becomes 0, it is a new source.",
              "Repeat until no vertices remain or a cycle is detected."
            ]}
            complexity={{ time: "\\Theta(V + E)", space: "O(V)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec06/slide58_img0.jpg" 
            alt="Topological Sorting Overview" 
            caption="Ordering tasks with dependencies into a valid linear sequence."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.infoCard} style={{ marginBottom: '2rem' }}>
            <h4>Directed Acyclic Graph (DAG)</h4>
            <p className={styles.editorialText}>
              A DAG is a directed graph with no directed cycles. Topological sorting is <b>only</b> possible for DAGs. If a graph has a cycle, there is no valid linear ordering.
            </p>
          </div>

          <TopologicalSortTracer style={{ margin: '2.5rem 0' }} />

          <div className={styles.methodBox}>
            <h3>Alternate Method: DFS-based</h3>
            <p className={styles.editorialText}>
              Perform a DFS and note the order in which vertices become dead-ends (popped off the stack). Reversing this order yields the topological sort.
            </p>
            <ul className={styles.editorialList}>
              <li><b>Back Edges:</b> If a DFS encounters an edge to an ancestor in the DFS tree, the graph has a cycle and no topological sort exists.</li>
              <li><b>Dead-ends:</b> Vertices are added to the list only when all their descendants have been visited.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec06;

