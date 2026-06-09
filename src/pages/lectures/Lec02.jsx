import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';

import ComplexityCounterTracer from '../../components/visualization/bespoke/ComplexityCounterTracer';
import GrowthChartTracer from '../../components/visualization/bespoke/GrowthChartTracer';
import AsymptoticNotationTracer from '../../components/visualization/bespoke/AsymptoticNotationTracer';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec02 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 02"
        title="Analysis Fundamentals"
        subtitle="Mastering the tools to measure algorithm efficiency and performance."
      />

      <div className={styles.contentWrapper}>
        
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            To design better algorithms, we must first learn how to <b>measure</b> them. Analysis of algorithms focuses on two primary resources: <b>Time</b> and <b>Space</b>. We don't measure time in seconds, but in the number of <b>Basic Operations</b> executed relative to the input size <MathBlock math="n" />.
          </p>

          <PremiumImage 
            src="/images/lectures/lec02/slide03_img0.jpg" 
            alt="The Analysis Framework" 
            caption="The theoretical framework for analyzing algorithm efficiency."
            style={{ margin: '2.5rem 0' }}
          />
          
          <div className={styles.infoCard}>
            <h4>Complexity Analysis</h4>
            <ul className={styles.editorialList}>
              <li><b>Input Size (n):</b> The number of items the algorithm processes.</li>
              <li><b>Basic Operation:</b> The operation in the algorithm's innermost loop that contributes the most to the total running time.</li>
              <li><b>Growth Rate:</b> How the number of operations increases as <MathBlock math="n" /> grows.</li>
            </ul>
          </div>

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              <b>Measuring Input Size:</b> The way we measure <MathBlock math="n" /> depends on the problem:
            </p>
            <ul className={styles.editorialList}>
              <li><b>Sorting/Searching:</b> Number of elements in the list.</li>
              <li><b>Matrix Multiplication:</b> Dimensions of the matrices (e.g., <MathBlock math="n \times n" />).</li>
              <li><b>Graphs:</b> Number of vertices (<MathBlock math="|V|" />) and edges (<MathBlock math="|E|" />).</li>
              <li><b>Numerical Problems:</b> Number of bits in the binary representation of the input.</li>
            </ul>
          </div>
        </section>

        <section id="basic-operations" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Counting Basic Operations</h2>
          <p className={styles.editorialText}>
            The first step in analysis is identifying and counting the basic operations. These are usually comparisons or arithmetic operations in the deepest part of the loop.
          </p>

          <AlgorithmCard 
            title="Max Element Search"
            goal="Find the largest value in an array of n elements."
            steps={[
              "Initialize 'max' with the first element of the array.",
              "Iterate through the remaining n-1 elements.",
              "For each element, compare it with the current 'max'.",
              "If the element is larger, update 'max'.",
              "Return 'max' after the loop finishes."
            ]}
            complexity={{
              time: "n-1 \\approx \\Theta(n)",
              space: "\\Theta(1)"
            }}
          />

          <ComplexityCounterTracer style={{ margin: '2.5rem 0' }} />

          <div className={styles.gridTwoCol}>
             <div className={styles.infoCard}>
                <h4>Complexity Analysis</h4>
                <p className={styles.editorialText}><b>Simple Loop:</b></p>
                <pre style={{fontSize: '12px', background: 'var(--bg-elevated)'}}>
{`for i ← 0 to n-1 do
  x ← x + 4`}
                </pre>
                <p className={styles.editorialText} style={{ marginTop: '0.5rem', fontSize: 'var(--text-xs)' }}>Total operations: <MathBlock math="n" /></p>
             </div>
             <div className={styles.infoCard}>
                <h4>Complexity Analysis</h4>
                <p className={styles.editorialText}><b>Nested Loop:</b></p>
                <pre style={{fontSize: '12px', background: 'var(--bg-elevated)'}}>
{`for i ← 0 to n-1 do
  for j ← 0 to n-1 do
    x ← x + 1`}
                </pre>
                <p className={styles.editorialText} style={{ marginTop: '0.5rem', fontSize: 'var(--text-xs)' }}>Total operations: <MathBlock math="n^2" /></p>
             </div>
          </div>

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              <b>Operation Hierarchy:</b> Not all operations are created equal. In terms of computational cost:
            </p>
            <p className={styles.editorialText} style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Division / Modulo {'>'} Multiplication {'>'} Addition / Subtraction {'>'} Comparison
            </p>
            <p className={styles.editorialText}>
              When analyzing, we focus on the <b>most expensive</b> operation that is executed most frequently.
            </p>
          </div>
        </section>

        <section id="growth-rates" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Orders of Growth</h2>
          <p className={styles.editorialText}>
            We categorize algorithms into <b>Efficiency Classes</b> based on their growth rates. Small differences in constant factors don't matter as much as the overall class (e.g., linear vs. quadratic) when <MathBlock math="n" /> is large.
          </p>

          <GrowthChartTracer style={{ margin: '2.5rem 0' }} />

          <PremiumImage 
            src="/images/lectures/lec02/slide16_img0.png" 
            alt="Order of Growth Comparison Table" 
            caption="Numerical comparison of common growth functions for increasing values of n."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.infoCard}>
             <h4>Complexity Analysis</h4>
             <p className={styles.editorialText}><b>Common Efficiency Classes:</b></p>
             <div style={{ overflowX: 'auto' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                 <thead>
                   <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                     <th style={{ padding: '0.5rem' }}>Class</th>
                     <th style={{ padding: '0.5rem' }}>Name</th>
                     <th style={{ padding: '0.5rem' }}>Growth Velocity</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                     <td style={{ padding: '0.5rem' }}><MathBlock math="1" /></td>
                     <td style={{ padding: '0.5rem' }}>Constant</td>
                     <td style={{ padding: '0.5rem', color: 'var(--color-success)' }}>🟢 No change</td>
                   </tr>
                   <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                     <td style={{ padding: '0.5rem' }}><MathBlock math="\log n" /></td>
                     <td style={{ padding: '0.5rem' }}>Logarithmic</td>
                     <td style={{ padding: '0.5rem', color: 'var(--color-warning)' }}>🟡 Extremely slow growth</td>
                   </tr>
                   <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                     <td style={{ padding: '0.5rem' }}><MathBlock math="n" /></td>
                     <td style={{ padding: '0.5rem' }}>Linear</td>
                     <td style={{ padding: '0.5rem', color: 'var(--color-warning)' }}>🟠 Steady growth</td>
                   </tr>
                   <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                     <td style={{ padding: '0.5rem' }}><MathBlock math="n^2" /></td>
                     <td style={{ padding: '0.5rem' }}>Quadratic</td>
                     <td style={{ padding: '0.5rem', color: 'var(--color-error)' }}>🔴 Fast growth</td>
                   </tr>
                   <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                     <td style={{ padding: '0.5rem' }}><MathBlock math="2^n" /></td>
                     <td style={{ padding: '0.5rem' }}>Exponential</td>
                     <td style={{ padding: '0.5rem', color: 'var(--color-error)', fontWeight: 'bold' }}>⚫ Explosive growth</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        </section>

        <section id="asymptotic" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Asymptotic Notation</h2>
          <p className={styles.editorialText}>
            To formalize growth rates, we use <b>Asymptotic Notation</b>. This provides a way to bound the algorithm's performance from above, below, and tightly.
          </p>

          <div className={styles.gridThreeCol}>
             <div id="big-o-complexity" className={styles.infoCard}>
                <h4>Complexity Analysis</h4>
                <p className={styles.editorialText}><b>Big-O ($O$):</b> Upper Bound. The algorithm is at most this slow. "Worst Case" guarantee.</p>
             </div>
             <div id="omega-complexity" className={styles.infoCard}>
                <h4>Complexity Analysis</h4>
                <p className={styles.editorialText}><b><MathBlock math="\Omega" /> Notation:</b> Lower Bound. The algorithm is at least this fast. "Best Case" guarantee.</p>
             </div>
             <div id="theta-complexity" className={styles.infoCard}>
                <h4>Complexity Analysis</h4>
                <p className={styles.editorialText}><b><MathBlock math="\Theta" /> Notation:</b> Tight Bound. The algorithm grows exactly at this rate.</p>
             </div>
          </div>

          <AsymptoticNotationTracer style={{ margin: '2.5rem 0' }} />

          <PremiumImage 
            src="/images/lectures/lec02/slide27_img0.png" 
            alt="\Omega Formal Definition Graph" 
            caption={<>Visual representation of the lower bound (<MathBlock math="\Omega" />) definition.</>}
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              <b>Asymptotic Comparison Quiz:</b> Test your understanding of asymptotic relations. Are the following statements True or False?
            </p>
            <ul className={styles.editorialList}>
              <li><MathBlock math="n^2 \in O(n^3)" /> — <b>True</b> (Quadratic is bounded above by cubic)</li>
              <li><MathBlock math="n^3 \in O(n^2)" /> — <b>False</b> (Cubic grows faster than quadratic)</li>
              <li><MathBlock math="2^n \in \Omega(n^{100})" /> — <b>True</b> (Exponential eventually overtakes any polynomial)</li>
              <li><MathBlock math="\sqrt{n} \in \Theta(\log n)" /> — <b>False</b> (Square root grows faster than logarithmic)</li>
            </ul>
          </div>
        </section>

        <section id="cases" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Best, Worst, and Average Cases</h2>
          <p className={styles.editorialText}>
            For some algorithms, the number of operations depends not just on <MathBlock math="n" />, but on the specific <b>type</b> of input.
          </p>
          <div className={styles.editorialList}>
             <ul>
                <li><b>Worst Case:</b> Maximum operations for any input of size n.</li>
                <li><b>Best Case:</b> Minimum operations for any input of size n.</li>
                <li><b>Average Case:</b> Expected performance over random inputs.</li>
             </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec02;

