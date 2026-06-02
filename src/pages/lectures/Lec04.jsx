import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import SelectionSortTracer from '../../components/visualization/bespoke/SelectionSortTracer';
import BubbleSortTracer from '../../components/visualization/bespoke/BubbleSortTracer';
import StringMatchTracer from '../../components/visualization/bespoke/StringMatchTracer';
import { PillarsInfographic, MindsetVisual, SweetSpotMatrix } from '../../components/visualization/bespoke/BruteForceConcepts';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec04 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 04"
        title="Brute Force Algorithms"
        subtitle="Exploring the straightforward approach: direct, exhaustive, and often surprisingly effective."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            <b>Brute force</b> is a straightforward approach to solving a problem, usually directly based on the problem statement and definitions of the concepts involved. It is the "just do it" philosophy of algorithm design—ignoring cleverness in favor of a guaranteed, albeit often slow, result.
          </p>

          <PillarsInfographic />

          <p className={styles.editorialText}>
            The brute-force mindset is applicable to a wide variety of problems. Whether it's cracking a combination lock by trying every possible number or scanning a 2D grid pixel-by-pixel, the principle remains: <i>exhaustive coverage ensures success.</i>
          </p>
          
          <MindsetVisual />
        </section>

        <section className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>When to use Brute Force?</h2>
          <p className={styles.editorialText}>
            While often criticized for its <MathBlock math="\Theta(2^n)" /> or <MathBlock math="\Theta(n!)" /> behavior in combinatorial problems, brute force is not always a bad choice. In fact, there is a specific "Sweet Spot" where it is the superior engineering decision.
          </p>
          
          <SweetSpotMatrix />

          <p className={styles.editorialText}>
            If the input size is small (e.g., <MathBlock math="n < 20" />), even an exponential algorithm will run in milliseconds. In such cases, the simplicity of brute force leads to fewer bugs and faster development time.
          </p>
        </section>

        <section id="selection-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Selection Sort</h2>
          <p className={styles.editorialText}>
            Selection Sort is the quintessential brute-force sorting algorithm. It scans the entire unsorted list to find the minimum element, then "selects" it to be moved to its final sorted position.
          </p>

          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCard}>
              <h3>Exhaustive Search</h3>
              <p>For each position, we must look at <b>every</b> remaining element to be absolutely sure we found the minimum.</p>
            </div>
            <div className={styles.comparisonCard}>
              <h3>Complexity</h3>
              <p>Comparisons: <MathBlock math="\Theta(n^2)" /></p>
              <p>Swaps: <MathBlock math="\Theta(n)" /></p>
            </div>
          </div>

          <SelectionSortTracer />
        </section>

        <section id="bubble-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Bubble Sort</h2>
          <p className={styles.editorialText}>
            Bubble Sort takes a slightly different brute-force path. Instead of finding the minimum globally, it performs local comparisons between adjacent elements. In each pass, the largest element "bubbles up" to its correct spot at the end.
          </p>

          <div className={styles.infoCard}>
            <h4>The "Sorted Wall"</h4>
            <p className={styles.editorialText}>
              In each pass, we can reduce our search space because the end of the array becomes sorted. We visually represent this as a "Sorted Wall" that grows from right to left.
            </p>
          </div>

          <BubbleSortTracer />
        </section>

        <section id="string-matching" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Brute-force String Matching</h2>
          <p className={styles.editorialText}>
            The simplest way to find a pattern in a text is to slide the pattern along the text like a <b>ruler</b>. At each position, we check if the characters match. If a mismatch occurs, we shift the ruler by exactly one position and start over.
          </p>

          <StringMatchTracer />

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Best Case</span>
              <p><MathBlock math="\Theta(m)" /></p>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Worst Case</span>
              <p><MathBlock math="O(n \cdot m)" /></p>
            </div>
          </div>
        </section>

        <section id="summary" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The Brute Force Legacy</h2>
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Why it stays relevant</h4>
              <ul className={styles.editorialList}>
                <li><b>Generality:</b> It works for almost any problem.</li>
                <li><b>Correctness:</b> Hard to implement wrong due to simplicity.</li>
                <li><b>Benchmarks:</b> Provides a baseline to measure "clever" algorithms.</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>The Hidden Cost</h4>
              <p className={styles.editorialText}>
                The cost isn't just time; it's the missed opportunity for insight. Brute force ignores the internal structure of a problem that might allow for a much faster logarithmic or linear solution.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec04;
