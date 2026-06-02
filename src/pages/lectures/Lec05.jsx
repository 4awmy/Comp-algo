import React from 'react';
import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import ClosestPairTracer from '../../components/visualization/bespoke/ClosestPairTracer';
import ExhaustiveSearchConcepts from '../../components/visualization/bespoke/ExhaustiveSearchConcepts';
import TspTracer from '../../components/visualization/bespoke/TspTracer';
import KnapsackTracer from '../../components/visualization/bespoke/KnapsackTracer';
import AssignmentTracer from '../../components/visualization/bespoke/AssignmentTracer';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec05 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 05"
        title="Brute Force II: Closest-Pair & Exhaustive Search"
        subtitle="Moving beyond sorting to geometric problems and the combinatorial explosion of exhaustive search."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            In our previous exploration of brute force, we focused on linear problems like sorting and string matching. Now, we expand our horizon to <b>Geometric Problems</b> and <b>Combinatorial Optimization</b>. These problems often reveal the true cost of the brute-force approach: the "Exhaustive Search" which leads to exponential time complexities.
          </p>
        </section>

        <section id="closest-pair" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The Closest-Pair Problem</h2>
          <p className={styles.editorialText}>
            Given <i>n</i> points in a 2D plane, find the two points that are closest to each other. The brute-force approach is the most natural: compute the distance between <b>every possible pair</b> of points and keep track of the minimum.
          </p>

          <div className={styles.infoCard}>
            <h4>Euclidean Distance</h4>
            <p className={styles.editorialText}>
              The distance between two points <MathBlock math="P_i(x_i, y_i)" /> and <MathBlock math="P_j(x_j, y_j)" /> is given by the formula:
            </p>
            <MathBlock math="d(P_i, P_j) = \sqrt{(x_i - x_j)^2 + (y_i - y_j)^2}" />
          </div>

          <ClosestPairTracer />

          <p className={styles.editorialText}>
            Notice that we only need to check each pair once. If we have already calculated <MathBlock math="dist(P_i, P_j)" />, we don't need to calculate <MathBlock math="dist(P_j, P_i)" />. Furthermore, a point's distance to itself is zero, but we are looking for the distance between <i>distinct</i> points.
          </p>
        </section>

        <section id="exhaustive-search" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Exhaustive Search</h2>
          <p className={styles.editorialText}>
            Exhaustive search is a brute-force approach applied to <b>Combinatorial Problems</b>. It involves generating every element of the problem's domain (subsets, permutations, or paths), selecting those that satisfy the constraints, and finding the one that optimizes the objective function.
          </p>
          
          <ExhaustiveSearchConcepts />

          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCard}>
              <h3>Permutations</h3>
              <p>Ordering <i>n</i> items. Grows as <MathBlock math="\Theta(n!)" />.</p>
              <p>Used in: <i>TSP, Assignment Problem</i></p>
            </div>
            <div className={styles.comparisonCard}>
              <h3>Subsets</h3>
              <p>Selecting from <i>n</i> items. Grows as <MathBlock math="\Theta(2^n)" />.</p>
              <p>Used in: <i>Knapsack Problem</i></p>
            </div>
          </div>
        </section>

        <section id="tsp" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Traveling Salesman Problem (TSP)</h2>
          <p className={styles.editorialText}>
            A salesman must visit <i>n</i> cities and return to the starting city. What is the shortest possible route that visits each city exactly once?
          </p>
          <p className={styles.editorialText}>
            For <i>n</i> cities, there are <MathBlock math="(n-1)! / 2" /> unique Hamilton circuits (if we ignore direction and starting point). Even for <MathBlock math="n=10" />, we are looking at 181,440 paths. For <MathBlock math="n=20" />, the number exceeds the capacity of modern supercomputers to solve via brute force.
          </p>

          <TspTracer />
        </section>

        <section id="knapsack" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The Knapsack Problem</h2>
          <p className={styles.editorialText}>
            You have a knapsack with a weight capacity <i>W</i> and a set of <i>n</i> items, each with a weight and a value. Which items should you take to maximize the total value?
          </p>

          <KnapsackTracer />

          <p className={styles.editorialText}>
            The brute-force solution checks all <MathBlock math="2^n" /> possible subsets of items. It discards any subset whose total weight exceeds <i>W</i> and keeps the one with the highest value.
          </p>
        </section>

        <section id="assignment" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The Assignment Problem</h2>
          <p className={styles.editorialText}>
            There are <i>n</i> people and <i>n</i> jobs. Each person has a specific cost for each job. How can we assign exactly one person to each job to minimize the total cost?
          </p>

          <AssignmentTracer />

          <div className={styles.infoCard}>
            <h4>Wait, there's a better way!</h4>
            <p className={styles.editorialText}>
              While brute force takes <MathBlock math="\Theta(n!)" />, the <b>Hungarian Algorithm</b> can solve the assignment problem in <MathBlock math="\Theta(n^3)" />. This is a classic example where moving away from brute force leads to a massive efficiency gain.
            </p>
          </div>
        </section>

        <section id="summary" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Conclusion: The Curse of Dimensionality</h2>
          <p className={styles.editorialText}>
            Brute force is a reliable baseline, but exhaustive search quickly hits a "brick wall" as <i>n</i> increases. This phenomenon is why we need more advanced paradigms like <b>Divide & Conquer</b>, <b>Dynamic Programming</b>, and <b>Greedy Algorithms</b> which we will explore in the coming weeks.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Lec05;
