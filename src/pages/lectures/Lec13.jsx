import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import DynamicProgTracer from '../../components/visualization/bespoke/DynamicProgTracer';
import GreedyTracer from '../../components/visualization/bespoke/GreedyTracer';
import { 
  CoinRowMetaphor, 
  GreedyVsDpMetaphor, 
  HuffmanMetaphor 
} from '../../components/visualization/bespoke/GreedyDpConcepts';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec13 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 13"
        title="Dynamic Programming & Greedy Algorithms"
        subtitle="Mastering optimal decision-making through subproblem reuse and local heuristics."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Introduction to Optimization</h2>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            Many algorithmic problems require finding an <b>optimal solution</b>—the best possible outcome among many candidates. <b>Dynamic Programming (DP)</b> and <b>Greedy Algorithms</b> are two powerful paradigms for solving such problems.
          </p>
          
          <GreedyVsDpMetaphor />

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Dynamic Programming</h4>
              <p className={styles.editorialText}>
                Solves complex problems by breaking them into <em>overlapping</em> subproblems. It solves each subproblem once and stores the result (<b>Memoization</b>).
              </p>
            </div>
            <div className={styles.infoCard}>
              <h4>Greedy Algorithms</h4>
              <p className={styles.editorialText}>
                Builds a solution piece-by-piece, making the <b>locally optimal choice</b> at each step.
              </p>
            </div>
          </div>
        </section>

        <section id="dp-intro" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Dynamic Programming: The Coin-Row Problem</h2>
          <p className={styles.editorialText}>
            The <b>Coin-Row Problem</b> asks: given a row of $n$ coins with values $c_i$, pick up the maximum amount of money such that no two picked coins are adjacent.
          </p>

          <CoinRowMetaphor />

          <div className={styles.methodBox}>
            <h3>Recurrence Relation</h3>
            <MathBlock 
              block 
              math="F(n) = \max(c_n + F(n-2), F(n-1))" 
              caption="Where F(n) is the maximum value for the first n coins. We either pick the nth coin (and skip n-1) or skip the nth coin."
            />
          </div>
        </section>

        <section id="knapsack" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. The 0/1 Knapsack Problem</h2>
          <p className={styles.editorialText}>
            Given $n$ items with weights $w_i$ and values $v_i$, and a knapsack of capacity $W$, find the most valuable subset of items that fit.
          </p>

          <MathBlock 
            block 
            math="V[i, j] = \begin{cases} \max(V[i-1, j], v_i + V[i-1, j - w_i]) & \text{if } j \ge w_i \\ V[i-1, j] & \text{if } j < w_i \end{cases}" 
            caption="The DP choice: Include item i (if it fits) or exclude it."
          />

          <DynamicProgTracer />
        </section>

        <section id="warshall-floyd" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Warshall's and Floyd's Algorithms</h2>
          <p className={styles.editorialText}>
            These algorithms use DP to solve graph problems using matrix representations.
          </p>

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Warshall's (Transitive Closure)</h4>
              <MathBlock math="R^{(k)}[i, j] = R^{(k-1)}[i, j] \lor (R^{(k-1)}[i, k] \land R^{(k-1)}[k, j])" />
              <p className={styles.editorialText}>Determines if there is a path between every pair of vertices.</p>
            </div>
            <div className={styles.infoCard}>
              <h4>Floyd's (All-Pairs Shortest Paths)</h4>
              <MathBlock math="D^{(k)}[i, j] = \min(D^{(k-1)}[i, j], D^{(k-1)}[i, k] + D^{(k-1)}[k, j])" />
              <p className={styles.editorialText}>Finds the shortest distance between all pairs.</p>
            </div>
          </div>
        </section>

        <section id="greedy-intro" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Greedy Algorithms: MST & Shortest Path</h2>
          <p className={styles.editorialText}>
            Greedy algorithms work when a <b>local optimum</b> leads to a <b>global optimum</b>. This is true for Minimum Spanning Trees (MST) and Single-Source Shortest Paths (Dijkstra).
          </p>

          <div className={styles.methodBox}>
            <h3>Key Properties</h3>
            <ul className={styles.editorialList}>
              <li><b>Greedy Choice Property:</b> A global optimum can be reached by selecting local optimums.</li>
              <li><b>Optimal Substructure:</b> An optimal solution contains optimal solutions to subproblems.</li>
            </ul>
          </div>

          <GreedyTracer />
        </section>

        <section id="prim-kruskal" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>5. Prim's, Kruskal's, and Dijkstra's</h2>
          <div className={styles.gridThreeCol}>
            <div className={styles.comparisonCard}>
              <h3>Prim's</h3>
              <p className={styles.editorialText}>Builds MST by adding the nearest unvisited neighbor to a single growing tree.</p>
            </div>
            <div className={styles.comparisonCard}>
              <h3>Kruskal's</h3>
              <p className={styles.editorialText}>Builds MST by adding the smallest edge that doesn't form a cycle, merging forest components.</p>
            </div>
            <div className={styles.comparisonCard}>
              <h3>Dijkstra's</h3>
              <p className={styles.editorialText}>Finds single-source shortest paths by always expanding the node with the shortest known distance.</p>
            </div>
          </div>
        </section>

        <section id="huffman" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>6. Huffman Trees & Codes</h2>
          <p className={styles.editorialText}>
            A greedy approach to data compression. It assigns shorter variable-length codes to more frequent symbols by repeatedly merging the lowest-frequency nodes.
          </p>
          
          <HuffmanMetaphor />

          <div className={styles.infoCard}>
            <h4>The Result</h4>
            <p className={styles.editorialText}>
              By ensuring frequent symbols are closer to the root, we minimize the average number of bits per character, achieving significant compression ratios.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec13;
