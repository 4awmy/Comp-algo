import React from 'react';
import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import VisualStage from '../../components/ui/Premium/VisualStage';
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
          
          <div className={styles.infoCard}>
            <h4>The Analysis Framework</h4>
            <ul className={styles.editorialList}>
              <li><b>Input Size (n):</b> The number of items the algorithm processes.</li>
              <li><b>Basic Operation:</b> The operation in the algorithm's innermost loop that contributes the most to the total running time.</li>
              <li><b>Growth Rate:</b> How the number of operations increases as <MathBlock math="n" /> grows.</li>
            </ul>
          </div>
        </section>

        <section id="basic-operations" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Counting Basic Operations</h2>
          <p className={styles.editorialText}>
            The first step in analysis is identifying and counting the basic operations. These are usually comparisons or arithmetic operations in the deepest part of the loop.
          </p>

          <ComplexityCounterTracer />

          <div className={styles.gridTwoCol}>
             <div className={styles.infoCard}>
                <h4>Simple Loop</h4>
                <pre style={{fontSize: '12px', background: 'var(--bg-elevated)'}}>
{`for i ← 0 to n-1 do
  x ← x + 4`}
                </pre>
                <p className="mt-2 text-xs">Total operations: <MathBlock math="n" /></p>
             </div>
             <div className={styles.infoCard}>
                <h4>Nested Loop</h4>
                <pre style={{fontSize: '12px', background: 'var(--bg-elevated)'}}>
{`for i ← 0 to n-1 do
  for j ← 0 to n-1 do
    x ← x + 1`}
                </pre>
                <p className="mt-2 text-xs">Total operations: <MathBlock math="n^2" /></p>
             </div>
          </div>
        </section>

        <section id="growth-rates" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Orders of Growth</h2>
          <p className={styles.editorialText}>
            We categorize algorithms into <b>Efficiency Classes</b> based on their growth rates. Small differences in constant factors don't matter as much as the overall class (e.g., linear vs. quadratic) when <MathBlock math="n" /> is large.
          </p>

          <GrowthChartTracer />

          <div className={styles.infoCard}>
             <h4 className="mb-4">Common Efficiency Classes</h4>
             <div className="overflow-x-auto">
               <table className="table table-xs w-full">
                 <thead>
                   <tr>
                     <th>Class</th>
                     <th>Name</th>
                     <th>Growth Velocity</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr><td><MathBlock math="1" /></td><td>Constant</td><td className="text-green-400">🟢 No change</td></tr>
                   <tr><td><MathBlock math="\log n" /></td><td>Logarithmic</td><td className="text-yellow-400">🟡 Extremely slow growth</td></tr>
                   <tr><td><MathBlock math="n" /></td><td>Linear</td><td className="text-orange-400">🟠 Steady growth</td></tr>
                   <tr><td><MathBlock math="n^2" /></td><td>Quadratic</td><td className="text-red-400">🔴 Fast growth</td></tr>
                   <tr><td><MathBlock math="2^n" /></td><td>Exponential</td><td className="text-red-600 font-bold">⚫ Explosive growth</td></tr>
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
             <div className={styles.infoCard}>
                <h4 className="text-red-400">Big-O ($O$)</h4>
                <p className="text-xs"><b>Upper Bound:</b> The algorithm is at most this slow. "Worst Case" guarantee.</p>
             </div>
             <div className={styles.infoCard}>
                <h4 className="text-green-400">Big-Omega ($\Omega$)</h4>
                <p className="text-xs"><b>Lower Bound:</b> The algorithm is at least this fast. "Best Case" guarantee.</p>
             </div>
             <div className={styles.infoCard}>
                <h4 className="text-purple-400">Big-Theta ($\Theta$)</h4>
                <p className="text-xs"><b>Tight Bound:</b> The algorithm grows exactly at this rate.</p>
             </div>
          </div>

          <AsymptoticNotationTracer />
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
