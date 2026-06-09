import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';

import ClosestPairTracer from '../../components/visualization/bespoke/ClosestPairTracer';
import ExhaustiveSearchConcepts from '../../components/visualization/bespoke/ExhaustiveSearchConcepts';
import TspTracer from '../../components/visualization/bespoke/TspTracer';
import KnapsackTracer from '../../components/visualization/bespoke/KnapsackTracer';
import StringMatchTracer from '../../components/visualization/bespoke/StringMatchTracer';
// import ConvexHullTracer from '../../components/visualization/bespoke/ConvexHullTracer';
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

          <AlgorithmCard 
            title="Brute-force Closest-Pair"
            goal="Find the minimum distance between any two distinct points in a 2D plane."
            steps={[
              "Initialize the minimum distance 'd' to infinity.",
              "For each pair of distinct points (Pi, Pj) in the set:",
              "Calculate their Euclidean distance using the distance formula.",
              "If the distance is less than 'd', update 'd' with this new value.",
              "After checking all possible pairs, return the minimum distance 'd'."
            ]}
            complexity={{ time: "O(n^2)", space: "O(1)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec05/slide03_img0.jpg" 
            alt="Closest-Pair Problem Diagram" 
            caption="Finding the minimum distance between any two points in a set."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.infoCard}>
            <h4>Euclidean Distance</h4>
            <p className={styles.editorialText}>
              The distance between two points <MathBlock math="P_i(x_i, y_i)" /> and <MathBlock math="P_j(x_j, y_j)" /> is given by the formula:
            </p>
            <MathBlock math="d(P_i, P_j) = \\sqrt{(x_i - x_j)^2 + (y_i - y_j)^2}" />
          </div>

          <ClosestPairTracer style={{ margin: '2.5rem 0' }} />
          <div id="closest-pair-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Closest-Pair Time Complexity Analysis</h4>
            <p className={styles.editorialText}>The brute‑force algorithm checks every pair of points.</p>
            <MathBlock block math="T(n) = \\sum_{i=1}^{n-1} \\sum_{j=i+1}^{n} 1 = \\frac{n(n-1)}{2} = \\Theta(n^2)" />
            <p className={styles.editorialText}>Space usage is constant: <MathBlock math="\\Theta(1)" />.</p>
          </div>
        </section>

        <section id="exhaustive-search" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Exhaustive Search</h2>
          <p className={styles.editorialText}>
            Exhaustive search is a brute-force approach applied to <b>Combinatorial Problems</b>. It involves generating every element of the problem's domain (subsets, permutations, or paths), selecting those that satisfy the constraints, and finding the one that optimizes the objective function.
          </p>

          <AlgorithmCard 
            title="General Exhaustive Search"
            goal="Solve optimization problems by evaluating every possible candidate solution."
            steps={[
              "Generate all possible candidates in the problem's domain.",
              "Evaluate each candidate based on the problem's constraints.",
              "Calculate the objective function value for each valid candidate.",
              "Keep track of the best (minimum or maximum) solution found so far.",
              "Return the candidate with the optimal objective value."
            ]}
            complexity={{ time: "O(n! \\text{ or } 2^n)", space: "O(n)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec05/slide26_img0.jpg" 
            alt="Exhaustive Search Diagram" 
            caption="The process of generating and evaluating all possible solutions."
            style={{ margin: '2.5rem 0' }}
          />
          
          <ExhaustiveSearchConcepts style={{ margin: '2.5rem 0' }} />
          <div id="exhaustive-search-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Exhaustive Search Time Complexity Analysis</h4>
            <p className={styles.editorialText}>Generating all possible candidates leads to factorial or exponential growth.</p>
            <MathBlock block math="T(n) = O(n!) \\text{ or } O(2^n)" />
            <p className={styles.editorialText}>Space required to hold a candidate is linear: <MathBlock math="\\Theta(n)" />.</p>
          </div>
        </section>

        <section id="tsp" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Traveling Salesman Problem (TSP)</h2>
          <p className={styles.editorialText}>
            A salesman must visit <i>n</i> cities and return to the starting city. What is the shortest possible route that visits each city exactly once?
          </p>

          <AlgorithmCard 
            title="TSP (Brute Force)"
            goal="Find the shortest Hamilton circuit in a weighted graph."
            steps={[
              "Generate all possible permutations of the cities.",
              "Each permutation represents a Hamilton circuit (a route).",
              "Calculate the total weight (distance) of each circuit.",
              "Find and return the circuit with the minimum total distance."
            ]}
            complexity={{ time: "O(n!)", space: "O(n)" }}
          />

          <TspTracer style={{ margin: '2.5rem 0' }} />
          <div id="tsp-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>TSP Brute‑Force Time Complexity Analysis</h4>
            <p className={styles.editorialText}>All permutations of <MathBlock math="n" /> cities are examined.</p>
            <MathBlock block math="T(n) = O(n!)" />
            <p className={styles.editorialText}>Space usage is linear in the number of cities: <MathBlock math="\\Theta(n)" />.</p>
          </div>
        </section>

        <section id="knapsack" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The Knapsack Problem</h2>
          <p className={styles.editorialText}>
            You have a knapsack with a weight capacity <i>W</i> and a set of <i>n</i> items, each with a weight and a value. Which items should you take to maximize the total value?
          </p>

          <AlgorithmCard 
            title="Knapsack (Brute Force)"
            goal="Find the most valuable subset of items that fit within weight capacity W."
            steps={[
              "Generate all possible subsets of the given n items (the power set).",
              "Calculate the total weight and total value of each subset.",
              "Discard any subset whose total weight exceeds capacity W.",
              "From the valid subsets, identify the one with the highest total value."
            ]}
            complexity={{ time: "O(2^n)", space: "O(n)" }}
          />

          <KnapsackTracer style={{ margin: '2.5rem 0' }} />
          <div id="knapsack-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Knapsack Brute‑Force Time Complexity Analysis</h4>
            <p className={styles.editorialText}>All subsets of <MathBlock math="n" /> items are examined.</p>
            <MathBlock block math="T(n) = O(2^n)" />
            <p className={styles.editorialText}>Space required to store a subset is linear: <MathBlock math="\\Theta(n)" />.</p>
          </div>
        </section>

          {/* Brute Force String Matching */}
          <section id="string-match" className={styles.lessonSection}>
            <h2 className={styles.sectionTitle}>Brute Force String Matching</h2>
            <p className={styles.editorialText}>The simplest approach slides the pattern over the text and checks each alignment character by character.</p>
            <AlgorithmCard
              title="Brute Force String Match"
              goal="Find the first occurrence of a pattern in a text."
              steps={[
                "Align pattern with the start of the text.",
                "Compare characters left‑to‑right.",
                "If a mismatch occurs, shift pattern by one and repeat.",
                "If all characters match, report the starting index."
              ]}
              complexity={{ time: "O(n \\cdot m)", space: "\\Theta(1)" }}
            />
            <StringMatchTracer style={{ margin: '2.5rem 0' }} />
            <div id="string-match-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
              <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>String Matching Time Complexity Analysis</h4>
              <p className={styles.editorialText}>For each of the n‑m+1 alignments we compare up to m characters.</p>
              <MathBlock block math="T(n) = \\Theta((n-m+1) \\cdot m) = \\Theta(n \\cdot m)" />
              <p className={styles.editorialText}>Space usage is constant: <MathBlock math="\\Theta(1)" />.</p>
            </div>
          </section>

          {/* Convex Hull Problem */}
          <section id="convex-hull" className={styles.lessonSection}>
            <h2 className={styles.sectionTitle}>Convex Hull (Brute‑Force)</h2>
            <p className={styles.editorialText}>A convex hull is the smallest convex polygon enclosing a set of points.</p>
            <AlgorithmCard
              title="Convex Hull (Brute Force)"
              goal="Compute the convex hull of a set of points using the naïve O(n³) approach."
              steps={[
                "For every pair of points (Pi, Pj), consider the line segment.",
                "Check that all other points lie on the same side of this line.",
                "If true, the segment is an edge of the hull.",
                "Collect all hull edges to form the polygon."
              ]}
              complexity={{ time: "O(n^3)", space: "\\Theta(n)" }}
            />
            {/* <ConvexHullTracer style={{ margin: '2.5rem 0' }} /> */}
            <div id="convex-hull-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
              <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Convex Hull Brute‑Force Time Complexity Analysis</h4>
              <p className={styles.editorialText}>Checking each of the <MathBlock math="\\binom{n}{2}" /> pairs against all <MathBlock math="n" /> points yields <MathBlock math="\\Theta(n^3)" /> work.</p>
              <MathBlock block math="T(n) = \\Theta(n^3)" />
              <p className={styles.editorialText}>Space is linear to store the hull vertices: <MathBlock math="\\Theta(n)" />.</p>
            </div>
          </section>

        <section id="np-hard" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The NP-Hard Wall</h2>
          <p className={styles.editorialText}>
            Many combinatorial problems, like TSP and Knapsack, belong to a class called <b>NP-hard</b>. For these problems, no polynomial-time algorithm is known to exist.
          </p>

          <div className={styles.infoCard}>
            <h4>The "Quintillion" Scale</h4>
            <p className={styles.editorialText}>
              To understand why <MathBlock math="n!" /> is so dangerous, consider the Assignment Problem with just 20 people and 20 jobs:
            </p>
            <ul className={styles.editorialList}>
              <li><MathBlock math="20! \\approx 2.4 \\times 10^{18}" /> (2.4 quintillion possibilities)</li>
              <li>If a computer evaluates 1 billion assignments per second, it would take <b>77 years</b> to find the optimal solution.</li>
              <li>For <MathBlock math="n=25" />, it would take longer than the age of the universe.</li>
            </ul>
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

