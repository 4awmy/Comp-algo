import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import ExhaustiveSearchTracer from '../../components/visualization/bespoke/ExhaustiveSearchTracer';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec05 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 05"
        title="Brute Force II: Exhaustive Search"
        subtitle="Mastering the search space: From closest pairs to combinatorial explosions."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            In our previous exploration of brute force, we focused on simple arrays and sorting. Now, we expand our horizon to <b>combinatorial problems</b>—challenges where the number of possible solutions grows factorially or exponentially. This is the domain of <b>Exhaustive Search</b>.
          </p>
        </section>

        <section id="closest-pair" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The Closest-Pair Problem</h2>
          <p className={styles.editorialText}>
            Given <MathBlock math="n" /> points in a 2D plane, find the two points that are closest to each other. The brute-force approach is simple: compute the distance between <i>every</i> pair of points and find the minimum.
          </p>

          <div className={styles.infoCard}>
            <h4>Algorithm Steps</h4>
            <ol className={styles.editorialList}>
              <li>Initialize minimum distance <MathBlock math="d = \infty" />.</li>
              <li>For each pair of points <MathBlock math="(P_i, P_j)" /> where <MathBlock math="1 \le i < j \le n" />:</li>
              <li className={styles.nested}>Calculate Euclidean distance <MathBlock math="dist = \sqrt{(x_i-x_j)^2 + (y_i-y_j)^2}" />.</li>
              <li className={styles.nested}>If <MathBlock math="dist < d" />, update <MathBlock math="d = dist" />.</li>
              <li>Return <MathBlock math="d" />.</li>
            </ol>
          </div>

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Complexity</span>
              <p><MathBlock math="O(n^2)" /></p>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Comparisons</span>
              <p><MathBlock math="\frac{n(n-1)}{2}" /></p>
            </div>
          </div>
        </section>

        <section id="exhaustive-search" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>What is Exhaustive Search?</h2>
          <p className={styles.editorialText}>
            Exhaustive search is a brute-force approach specifically for combinatorial problems. It involves generating every element of the problem's search space (permutations, subsets, or combinations) and selecting the one that satisfies the problem's constraints.
          </p>

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>The Methodology</h4>
              <ul className={styles.editorialList}>
                <li><b>Generate:</b> Systematically create every possible solution.</li>
                <li><b>Evaluate:</b> Calculate the objective function for each.</li>
                <li><b>Optimize:</b> Keep track of the best solution found so far.</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>The Reality Check</h4>
              <p className={styles.editorialText}>
                While simple to implement, exhaustive search is often <b>catastrophically slow</b>. As the input size <MathBlock math="n" /> increases, the search space explodes, making it unusable for large <MathBlock math="n" />.
              </p>
            </div>
          </div>
        </section>

        <section id="tsp" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Traveling Salesman Problem (TSP)</h2>
          <p className={styles.editorialText}>
            Find the shortest tour that visits <MathBlock math="n" /> cities exactly once and returns to the starting city.
          </p>
          <div className={styles.infoCard}>
            <h4>Complexity: <MathBlock math="O(n!)" /></h4>
            <p>For <MathBlock math="n" /> cities, there are <MathBlock math="(n-1)! / 2" /> unique Hamiltonian circuits to check. If <MathBlock math="n=20" />, the number of routes exceeds 60 quadrillion.</p>
          </div>
        </section>

        <section id="knapsack" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The Knapsack Problem</h2>
          <p className={styles.editorialText}>
            Given <MathBlock math="n" /> items with weights <MathBlock math="w_i" /> and values <MathBlock math="v_i" />, and a knapsack of capacity <MathBlock math="W" />, find the most valuable subset of items that fits.
          </p>
          <div className={styles.infoCard}>
            <h4>Complexity: <MathBlock math="O(2^n)" /></h4>
            <p>There are <MathBlock math="2^n" /> possible subsets. For <MathBlock math="n=100" />, the search space is larger than the number of atoms in the observable universe.</p>
          </div>
        </section>

        <section id="visualization" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Visualizing the Search Space</h2>
          <p className={styles.editorialText}>
            Explore how exhaustive search traverses through permutations (TSP) and subsets (Knapsack). Watch as it updates the 'Best Found' solution in real-time.
          </p>
          <ExhaustiveSearchTracer />
        </section>

        <section id="assignment" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The Assignment Problem</h2>
          <p className={styles.editorialText}>
            Assign <MathBlock math="n" /> people to <MathBlock math="n" /> jobs such that the total cost is minimized. Each person must be assigned to exactly one job, and each job must be assigned to exactly one person.
          </p>
          <div className={styles.infoCard}>
            <h4>Complexity: <MathBlock math="O(n!)" /></h4>
            <p>We are essentially searching for the optimal permutation of job assignments. Even for <MathBlock math="n=20" />, the search space is impossibly large for exhaustive search.</p>
          </div>
        </section>

        <section id="np-hard" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The "Hard" Truth: NP-Hardness</h2>
          <p className={styles.editorialText}>
            TSP, Knapsack, and the Assignment Problem are classic examples of <b>NP-hard</b> problems. No polynomial-time algorithm (like <MathBlock math="O(n^k)" />) is known to solve them optimally.
          </p>
          
          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCard}>
              <h3>Polynomial Time</h3>
              <p>Algorithms whose runtime grows reasonably, like <MathBlock math="O(n^2)" /> or <MathBlock math="O(n^3)" />. These are considered "tractable."</p>
            </div>
            <div className={styles.comparisonCard}>
              <h3>Exponential Time</h3>
              <p>Algorithms like <MathBlock math="O(2^n)" /> or <MathBlock math="O(n!)" />. These quickly become "intractable" for even modest inputs.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec05;
