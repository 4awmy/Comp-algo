import React from 'react';
import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import DynamicProgTracer from '../../components/visualization/bespoke/DynamicProgTracer';
import GreedyTracer from '../../components/visualization/bespoke/GreedyTracer';
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
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            Many algorithmic problems require finding an <b>optimal solution</b>—the best possible outcome among many candidates. <b>Dynamic Programming (DP)</b> and <b>Greedy Algorithms</b> are two powerful paradigms for solving such problems, differing primarily in how they handle subproblems.
          </p>
          
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Dynamic Programming</h4>
              <p className={styles.editorialText}>
                Solves complex problems by breaking them into <em>overlapping</em> subproblems. It solves each subproblem once and stores the result (<b>Memoization</b>), trading space for time.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h4>Greedy Algorithms</h4>
              <p className={styles.editorialText}>
                Builds a solution piece-by-piece, making the <b>locally optimal choice</b> at each step with the hope that it leads to a global optimum.
              </p>
            </div>
          </div>
        </section>

        <section id="dp-intro" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Dynamic Programming: The Coin-Row Problem</h2>
          <p className={styles.editorialText}>
            The <b>Coin-Row Problem</b> asks: given a row of $n$ coins with values $c_1, c_2, \dots, c_n$, pick up the maximum amount of money such that no two picked coins are adjacent.
          </p>

          <div className={styles.methodBox}>
            <h3>Recurrence Relation</h3>
            <MathBlock 
              block 
              math="F(n) = \max(c_n + F(n-2), F(n-1))" 
              caption="Where F(n) is the maximum value for the first n coins. We either pick the nth coin (and must skip the (n-1)th) or skip the nth coin (and keep the max from n-1)."
            />
          </div>

          <p className={styles.editorialText}>
            This demonstrates the <b>Optimal Substructure</b>: the global best is built from the best solutions of smaller sub-rows.
          </p>
        </section>

        <section id="knapsack" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. The 0/1 Knapsack Problem</h2>
          <p className={styles.editorialText}>
            Given $n$ items with weights $w_i$ and values $v_i$, and a knapsack of capacity $W$, find the most valuable subset of items that fit.
          </p>

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Subproblem</span>
              <MathBlock math="V[i, j]" />
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Complexity</span>
              <MathBlock math="O(n \cdot W)" />
            </div>
          </div>

          <MathBlock 
            block 
            math="V[i, j] = \begin{cases} \max(V[i-1, j], v_i + V[i-1, j - w_i]) & \text{if } j \ge w_i \\ V[i-1, j] & \text{if } j < w_i \end{cases}" 
            caption="The choice: Include item i (if it fits) or exclude it."
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
              <p className={styles.editorialText}>
                Determines if there is a path between every pair of vertices.
                <MathBlock math="R^{(k)}[i, j] = R^{(k-1)}[i, j] \lor (R^{(k-1)}[i, k] \land R^{(k-1)}[k, j])" />
              </p>
            </div>
            <div className={styles.infoCard}>
              <h4>Floyd's (All-Pairs Shortest Paths)</h4>
              <p className={styles.editorialText}>
                Finds the shortest distance between all pairs.
                <MathBlock math="D^{(k)}[i, j] = \min(D^{(k-1)}[i, j], D^{(k-1)}[i, k] + D^{(k-1)}[k, j])" />
              </p>
            </div>
          </div>
        </section>

        <section id="greedy-intro" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Greedy Algorithms: MST & Shortest Path</h2>
          <p className={styles.editorialText}>
            Greedy algorithms work when a <b>local optimum</b> leads to a <b>global optimum</b>. This is true for Minimum Spanning Trees (MST) and Single-Source Shortest Paths in graphs with non-negative weights.
          </p>

          <div className={styles.methodBox}>
            <h3>Key Properties</h3>
            <ul className={styles.editorialList}>
              <li><b>Greedy Choice Property:</b> A global optimum can be reached by selecting local optimums.</li>
              <li><b>Optimal Substructure:</b> An optimal solution to the problem contains optimal solutions to subproblems.</li>
            </ul>
          </div>

          <GreedyTracer />
        </section>

        <section id="prim-kruskal" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>5. Prim's vs. Kruskal's</h2>
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Prim's Algorithm</h4>
              <ul className={styles.editorialList}>
                <li>Starts from a root node.</li>
                <li>Grows the MST by adding the nearest unvisited neighbor.</li>
                <li>Best for dense graphs.</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>Kruskal's Algorithm</h4>
              <ul className={styles.editorialList}>
                <li>Starts with individual nodes as components.</li>
                <li>Adds the smallest edge that doesn't form a cycle.</li>
                <li>Best for sparse graphs.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="huffman" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>6. Huffman Trees & Codes</h2>
          <p className={styles.editorialText}>
            A greedy approach to data compression. It assigns shorter variable-length codes to more frequent symbols.
          </p>
          <div className={styles.infoCard}>
            <h4>The Greedy Step</h4>
            <p className={styles.editorialText}>
              Repeatedly merge the two nodes with the lowest frequencies into a new parent node whose frequency is the sum of the two. This ensures infrequent symbols are deeper in the tree (longer codes).
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec13;
