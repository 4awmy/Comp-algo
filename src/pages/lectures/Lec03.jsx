import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';

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

          <PremiumImage 
            src="/images/lectures/lec03/slide03_img0.jpg" 
            alt="Non-recursive Analysis Diagram" 
            caption="The process of setting up summations for loop-based algorithms."
            style={{ margin: '2.5rem 0' }}
          />

          <AlgorithmCard 
            title="Non-Recursive Analysis Plan"
            goal="Establish a mathematical sum for loop-based algorithm performance."
            steps={[
              "Decide on a parameter indicating input size n.",
              "Identify the basic operation (innermost loop).",
              "Determine if execution count depends only on n.",
              "Set up a sum Σ for the number of operations.",
              "Simplify using standard summation formulas."
            ]}
            complexity={{
              time: "Depends on loops",
              space: "\\Theta(1) \\text{ usually}"
            }}
          />

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>Loop Range Calculations</h4>
            <p className={styles.editorialText}>
              When setting up a sum, pay close attention to the loop boundaries:
            </p>
            <ul className={styles.editorialList}>
              <li><b>First:</b> The initial value of the loop index.</li>
              <li><b>Last:</b> The final value of the loop index.</li>
              <li><b>Size:</b> The number of iterations, calculated as <MathBlock math="\text{Last} - \text{First} + 1" />.</li>
            </ul>
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
            <StackedTriangleDemo style={{ margin: '2.5rem 0' }} />
          </div>
        </section>

        <section id="recursive" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Recursive Analysis</h2>
          <p className={styles.editorialText}>
            Recursive algorithms are analyzed by creating a <b>recurrence relationship</b>. This is an equation that defines <MathBlock math="T(n)" /> in terms of <MathBlock math="T(k)" /> for smaller values of <MathBlock math="k" />.
          </p>

          <PremiumImage 
            src="/images/lectures/lec03/slide05_img0.jpg" 
            alt="Recursive Analysis Diagram" 
            caption="The process of setting up recurrence relations for recursive algorithms."
            style={{ margin: '2.5rem 0' }}
          />

          <AlgorithmCard 
            title="Recursive Analysis Plan"
            goal="Solve recursive performance using recurrence relations."
            steps={[
              "Identify basic operation and input size n.",
              "Set up recurrence T(n) with base case T(0).",
              "Solve using Backward Substitution.",
              "Identify the pattern and efficiency class."
            ]}
            complexity={{
              time: "Depends on recursion",
              space: "O(\\text{depth}) \\text{ stack}"
            }}
          />

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>The Stopping Condition</h4>
            <p className={styles.editorialText}>
              Every recursive algorithm must have a base case to prevent infinite recursion. For example, in the factorial algorithm:
            </p>
            <MathBlock block math="F(n) = \begin{cases} 1 & \text{if } n = 0 \\ n \cdot F(n-1) & \text{if } n > 0 \end{cases}" />
            <p className={styles.editorialText}>
              The recurrence for the number of multiplications <MathBlock math="M(n)" /> would be:
            </p>
            <MathBlock block math="M(n) = M(n-1) + 1, \quad M(0) = 0" />
          </div>

          <RecursiveCallStackDemo style={{ margin: '2.5rem 0' }} />
        </section>

        <section id="recurrence-lab" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Recurrence Resolution Lab</h2>
          <p className={styles.editorialText}>
            Solving recurrences via backward substitution involves expanding the equation until a pattern emerges. Below are the five fundamental patterns every engineer should recognize.
          </p>

          <div className={styles.recurrenceGrid} style={{ margin: '2.5rem 0' }}>
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
               <span className={styles.patternHighlight}><MathBlock math="\Theta(n)" /></span>
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
               <span className={styles.patternHighlight}><MathBlock math="\Theta(2^n)" /></span>
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
               <span className={styles.patternHighlight}><MathBlock math="\Theta(\log n)" /></span>
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
               <span className={styles.patternHighlight}><MathBlock math="\Theta(n^2)" /></span>
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
               <span className={styles.patternHighlight}><MathBlock math="\Theta(n)" /></span>
               <span className="text-[10px] opacity-60">Geometric converge (e.g., Quickselect)</span>
            </div>
          </div>
        </section>

        <section id="logarithmic" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Logarithmic Complexity</h2>
          <p className={styles.editorialText}>
            The "magic" of algorithms often comes from <MathBlock math="\log n" />. This complexity arises whenever an algorithm repeatedly reduces the problem size by a constant factor.
          </p>
          <HalvingBarChartDemo style={{ margin: '2.5rem 0' }} />
        </section>

        <section id="empirical" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>5. Empirical Analysis</h2>
          <p className={styles.editorialText}>
            Mathematical analysis is <b>theory</b>. Empirical analysis is <b>reality</b>. It involves running the algorithm on a machine and measuring physical execution time.
          </p>

          <PremiumImage 
            src="/images/lectures/lec03/slide28_img0.png" 
            alt="Empirical Analysis Example" 
            caption="A table and graph showing actual execution times for different input sizes."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
               <h4>Why use Empirical Analysis?</h4>
               <ul className={styles.editorialList}>
                  <li>To determine the values of <b>hidden constants</b> in the efficiency class.</li>
                  <li>To compare algorithms with the same asymptotic complexity.</li>
                  <li>To analyze algorithms whose mathematical analysis is too difficult.</li>
                  <li>To verify the correctness of a theoretical analysis.</li>
               </ul>
            </div>
            <div className={styles.infoCard}>
               <h4>The Caveats</h4>
               <p className={styles.editorialText}>
                  Hidden constants, hardware background processes, and memory cache misses can create "noise" in your empirical data that mathematical analysis ignores.
               </p>
            </div>
          </div>

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>The Empirical Workflow</h4>
            <ol className={styles.editorialList}>
              <li><b>Understand the goal:</b> What are you trying to measure?</li>
              <li><b>Choose the sample:</b> Select a representative set of inputs.</li>
              <li><b>Implement the algorithm:</b> Write clean, efficient code.</li>
              <li><b>Measure execution time:</b> Use high-resolution timers.</li>
              <li><b>Analyze the data:</b> Look for patterns and trends.</li>
              <li><b>Draw conclusions:</b> Relate the empirical results back to the theory.</li>
            </ol>
          </div>

          <EmpiricalDashboardDemo style={{ margin: '2.5rem 0' }} />

          <div id="empirical-complexity" className={styles.infoCard}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              Empirical analysis doesn't have a single "complexity class" but rather measures the <b>actual performance</b>. However, we can use it to estimate the growth rate:
            </p>
            <MathBlock math="T(n) \approx c \cdot f(n)" block />
            <p className={styles.editorialText}>
              By measuring <MathBlock math="T(n)" /> for various <MathBlock math="n" />, we can solve for the constant <MathBlock math="c" /> and verify if the algorithm follows its theoretical class <MathBlock math="f(n)" />.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec03;

