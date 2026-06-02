import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import { StackedTriangleDemo, RecursiveCallStackDemo, HalvingBarChartDemo, EmpiricalDashboardDemo } from '../../components/visualization/bespoke/MathVisualizers';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec03 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 03"
        title="Complexity Analysis"
        subtitle="Mastering the mathematical frameworks for evaluating algorithm performance."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            As we move beyond simple definitions, we must develop a rigorous <b>mathematical framework</b> to prove the efficiency of our algorithms. This lecture focuses on the twin pillars of analysis: <b>Non-recursive</b> summation and <b>Recursive</b> recurrence relations.
          </p>
        </section>

        <section id="non-recursive" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Non-Recursive Analysis</h2>
          <p className={styles.editorialText}>
            For non-recursive algorithms, our goal is to identify the <b>basic operation</b> and set up a summation that represents its execution count across all iterations of the algorithm's loops.
          </p>

          <div className={styles.infoCard}>
            <h3>General Plan</h3>
            <ol className={styles.editorialList}>
              <li>Decide on a parameter indicating input size <MathBlock math="n" />.</li>
              <li>Identify the algorithm's basic operation (usually in the innermost loop).</li>
              <li>Check whether the number of times the basic operation is executed depends only on <MathBlock math="n" />.</li>
              <li>Set up a sum for the number of basic operations.</li>
              <li>Simplify the sum using standard formulas.</li>
            </ol>
          </div>

          <div className={styles.methodBox}>
            <h3>The Arithmetic Series</h3>
            <p className={styles.editorialText}>
              A common pattern in nested loops is the arithmetic series, where the inner loop's range depends on the outer loop's index. This leads to the famous formula:
            </p>
            <MathBlock 
              block 
              math="\sum_{i=1}^{n} i = 1 + 2 + \dots + n = \frac{n(n+1)}{2} \approx \frac{n^2}{2}" 
            />
            <StackedTriangleDemo />
          </div>
        </section>

        <section id="recursive" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Recursive Analysis</h2>
          <p className={styles.editorialText}>
            Recursive algorithms are analyzed by creating a <b>recurrence relationship</b>. This is an equation that defines <MathBlock math="T(n)" /> in terms of <MathBlock math="T(k)" /> for smaller values of <MathBlock math="k" />.
          </p>

          <div className={styles.infoCard}>
            <h3>The Recursive Plan</h3>
            <ul className={styles.editorialList}>
              <li>Identify the basic operation and input size <MathBlock math="n" />.</li>
              <li>Set up a recurrence relation with a base case (e.g., <MathBlock math="T(0) = 0" />).</li>
              <li>Solve the recurrence using <b>Backward Substitution</b>.</li>
            </ul>
          </div>

          <RecursiveCallStackDemo />
        </section>

        <section id="recurrence-lab" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Recurrence Resolution Lab</h2>
          <p className={styles.editorialText}>
            Solving recurrences via backward substitution involves expanding the equation until a pattern emerges. Below are the five fundamental patterns every engineer should recognize.
          </p>

          <div className={styles.recurrenceGrid}>
            <div className={styles.columnHeader}>Equation Expansion</div>
            <div className={styles.columnHeader}>Visualization</div>
            <div className={styles.columnHeader}>Pattern Recognition</div>

            {/* Example 1 */}
            <div className={styles.gridCell}>
               <div className={styles.equationText}>
                  T(n) = T(n-1) + 1<br/>
                  T(n) = [T(n-2) + 1] + 1<br/>
                  T(n) = T(n-k) + k
               </div>
            </div>
            <div className={styles.gridCell}>
               <div className="flex flex-col gap-1 items-center">
                  <div className="w-24 h-2 bg-accent-cyan/40 rounded"></div>
                  <div className="w-20 h-2 bg-accent-cyan/30 rounded"></div>
                  <div className="w-16 h-2 bg-accent-cyan/20 rounded"></div>
                  <span className="text-[8px] opacity-40">Linear Decrease</span>
               </div>
            </div>
            <div className={styles.gridCell}>
               <span className={styles.patternHighlight}>Θ(n)</span>
               <span className="text-[10px] opacity-60">Sequential execution (e.g., Factorial)</span>
            </div>

            {/* Example 2 */}
            <div className={styles.gridCell}>
               <div className={styles.equationText}>
                  T(n) = 2T(n-1)<br/>
                  T(n) = 2(2T(n-2)) = 4T(n-2)<br/>
                  T(n) = 2<sup>k</sup>T(n-k)
               </div>
            </div>
            <div className={styles.gridCell}>
               <div className="flex flex-col gap-1 items-center">
                  <div className="flex gap-1">
                     <div className="w-4 h-4 rounded bg-accent-purple/40"></div>
                     <div className="w-4 h-4 rounded bg-accent-purple/40"></div>
                  </div>
                  <div className="flex gap-1">
                     <div className="w-4 h-4 rounded bg-accent-purple/20"></div>
                     <div className="w-4 h-4 rounded bg-accent-purple/20"></div>
                     <div className="w-4 h-4 rounded bg-accent-purple/20"></div>
                     <div className="w-4 h-4 rounded bg-accent-purple/20"></div>
                  </div>
                  <span className="text-[8px] opacity-40">Branching Growth</span>
               </div>
            </div>
            <div className={styles.gridCell}>
               <span className={styles.patternHighlight}>Θ(2ⁿ)</span>
               <span className="text-[10px] opacity-60">Exponential (e.g., Tower of Hanoi)</span>
            </div>

            {/* Example 3 */}
            <div className={styles.gridCell}>
               <div className={styles.equationText}>
                  T(n) = T(n/2) + 1<br/>
                  T(n) = [T(n/4) + 1] + 1<br/>
                  T(n) = T(n/2<sup>k</sup>) + k
               </div>
            </div>
            <div className={styles.gridCell}>
               <div className="flex flex-col gap-2 items-center">
                  <div className="w-24 h-2 bg-green-400/40 rounded"></div>
                  <div className="w-12 h-2 bg-green-400/40 rounded"></div>
                  <div className="w-6 h-2 bg-green-400/40 rounded"></div>
                  <span className="text-[8px] opacity-40">Halving</span>
               </div>
            </div>
            <div className={styles.gridCell}>
               <span className={styles.patternHighlight}>Θ(log n)</span>
               <span className="text-[10px] opacity-60">Divide & Conquer (e.g., Binary Search)</span>
            </div>

            {/* Example 4 */}
            <div className={styles.gridCell}>
               <div className={styles.equationText}>
                  T(n) = T(n-1) + n<br/>
                  T(n) = T(n-k) + Σ(n-i)
               </div>
            </div>
            <div className={styles.gridCell}>
               <div className="flex flex-col gap-1 items-center">
                  <div className="w-24 h-1 bg-blue-400/50 rounded"></div>
                  <div className="w-20 h-1 bg-blue-400/40 rounded"></div>
                  <div className="w-16 h-1 bg-blue-400/30 rounded"></div>
                  <div className="w-12 h-1 bg-blue-400/20 rounded"></div>
                  <span className="text-[8px] opacity-40">Summing Sequence</span>
               </div>
            </div>
            <div className={styles.gridCell}>
               <span className={styles.patternHighlight}>Θ(n²)</span>
               <span className="text-[10px] opacity-60">Quadratic Sum (e.g., Selection Sort recursive)</span>
            </div>

            {/* Example 5 */}
            <div className={styles.gridCell}>
               <div className={styles.equationText}>
                  T(n) = T(n/2) + n<br/>
                  T(n) = n + n/2 + n/4 + ...<br/>
                  T(n) = n(1 + 1/2 + 1/4 + ...)
               </div>
            </div>
            <div className={styles.gridCell}>
               <div className="flex items-center gap-1">
                  <div className="w-16 h-8 bg-orange-400/40 rounded"></div>
                  <div className="flex flex-col gap-1">
                     <div className="w-8 h-3.5 bg-orange-400/30 rounded"></div>
                     <div className="w-8 h-3.5 bg-orange-400/20 rounded"></div>
                  </div>
               </div>
               <span className="text-[8px] opacity-40 text-center">Geometric Sum</span>
            </div>
            <div className={styles.gridCell}>
               <span className={styles.patternHighlight}>Θ(n)</span>
               <span className="text-[10px] opacity-60">Geometric converge (e.g., Quickselect)</span>
            </div>
          </div>
        </section>

        <section id="logarithmic" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Logarithmic Complexity</h2>
          <p className={styles.editorialText}>
            The "magic" of algorithms often comes from <MathBlock math="\log n" />. This complexity arises whenever an algorithm repeatedly reduces the problem size by a constant factor.
          </p>
          <HalvingBarChartDemo />
        </section>

        <section id="empirical" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>5. Empirical Analysis</h2>
          <p className={styles.editorialText}>
            Mathematical analysis is <b>theory</b>. Empirical analysis is <b>reality</b>. It involves running the algorithm on a machine and measuring physical execution time.
          </p>
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
               <h4>The How-To</h4>
               <ul className={styles.editorialList}>
                  <li>Implement the algorithm in a real language.</li>
                  <li>Decide on a sample range for <MathBlock math="n" />.</li>
                  <li>Use high-resolution timers to measure execution.</li>
                  <li>Plot the data to observe trends.</li>
               </ul>
            </div>
            <div className={styles.infoCard}>
               <h4>The Caveats</h4>
               <p className={styles.editorialText}>
                  Hidden constants, hardware background processes, and memory cache misses can create "noise" in your empirical data that mathematical analysis ignores.
               </p>
            </div>
          </div>
          <EmpiricalDashboardDemo />
        </section>
      </div>
    </div>
  );
};

export default Lec03;
