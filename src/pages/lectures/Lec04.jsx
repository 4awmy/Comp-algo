import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import SelectionSortTracer from '../../components/visualization/bespoke/SelectionSortTracer';
import BubbleSortTracer from '../../components/visualization/bespoke/BubbleSortTracer';
import StringMatchTracer from '../../components/visualization/bespoke/StringMatchTracer';
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
            <b>Brute force</b> is a straightforward approach to solving a problem, usually directly based on the problem statement and definitions of the concepts involved. While often criticized for its inefficiency, it remains an essential tool in a programmer's arsenal due to its simplicity and guaranteed correctness.
          </p>

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Key Characteristics</h4>
              <ul className={styles.editorialList}>
                <li><b>Direct:</b> Directly follows the problem statement.</li>
                <li><b>Exhaustive:</b> Often checks every candidate solution.</li>
                <li><b>Reliable:</b> Guaranteed to find a solution if it exists.</li>
                <li><b>Baseline:</b> Serves as a performance benchmark for optimized algorithms.</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>When to use Brute Force</h4>
              <p className={styles.editorialText}>
                Brute force is surprisingly useful when the input size is small, when no faster algorithm is known, or when the cost of designing a more complex algorithm outweighs the performance gain.
              </p>
            </div>
          </div>
        </section>

        <section id="selection-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Selection Sort</h2>
          <p className={styles.editorialText}>
            Selection Sort is the quintessential brute-force sorting algorithm. It works by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.
          </p>

          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCard}>
              <h3>Algorithm Logic</h3>
              <p>1. Start from the first element.</p>
              <p>2. Scan the rest of the array to find the smallest element.</p>
              <p>3. Swap the smallest element with the first element.</p>
              <p>4. Repeat for the remaining unsorted part.</p>
            </div>
            <div className={styles.comparisonCard}>
              <h3>Complexity Analysis</h3>
              <p>Comparisons: <MathBlock math="C(n) = \sum_{i=0}^{n-2} \sum_{j=i+1}^{n-1} 1 = \frac{n(n-1)}{2} \approx \frac{n^2}{2} \in \Theta(n^2)" /></p>
              <p>Key Swaps: <MathBlock math="\Theta(n)" /> (exactly <MathBlock math="n-1" /> swaps).</p>
            </div>
          </div>

          <SelectionSortTracer />
        </section>

        <section id="bubble-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Bubble Sort</h2>
          <p className={styles.editorialText}>
            Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest elements "bubble up" to the end of the array in each pass.
          </p>

          <div className={styles.infoCard}>
            <h4>Efficiency Note</h4>
            <p className={styles.editorialText}>
              Like Selection Sort, Bubble Sort has a <MathBlock math="\Theta(n^2)" /> time complexity. However, it is generally slower in practice due to the large number of swaps required. A common optimization is to stop early if a pass through the array results in no swaps.
            </p>
          </div>

          <BubbleSortTracer />
        </section>

        <section id="sequential-search" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Sequential Search</h2>
          <p className={styles.editorialText}>
            The simplest way to search for a key in a list is to compare it with every element until a match is found or the end of the list is reached.
          </p>

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Best Case</span>
              <p><MathBlock math="C_{best}(n) = 1" /></p>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Average Case</span>
              <p><MathBlock math="C_{avg}(n) \approx \frac{n}{2}" /></p>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Worst Case</span>
              <p><MathBlock math="C_{worst}(n) = n" /></p>
            </div>
          </div>

          <p className={styles.editorialText}>
            An interesting optimization is to use a <b>sentinel</b>: append the search key to the end of the list. This eliminates the need to check for the end of the list in every iteration of the loop.
          </p>
        </section>

        <section id="string-matching" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Brute-force String Matching</h2>
          <p className={styles.editorialText}>
            Given a text of <MathBlock math="n" /> characters and a pattern of <MathBlock math="m" /> characters, we want to find the first occurrence of the pattern in the text. The brute-force approach aligns the pattern with the start of the text and moves it one position at a time.
          </p>

          <div className={styles.infoCard}>
            <h4>Complexity</h4>
            <p className={styles.editorialText}>
              In the worst case, the algorithm performs <MathBlock math="m(n-m+1)" /> comparisons, which is <MathBlock math="O(nm)" />. However, for natural language texts, the average performance is much closer to <MathBlock math="\Theta(n+m)" />.
            </p>
          </div>

          <StringMatchTracer />
        </section>

        <section id="summary" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Strengths and Weaknesses</h2>
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Strengths</h4>
              <ul className={styles.editorialList}>
                <li>Applicable to a very wide range of problems.</li>
                <li>Yields reasonable algorithms for many important problems (e.g., matrix multiplication).</li>
                <li>Simplicity makes it less prone to implementation errors.</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>Weaknesses</h4>
              <ul className={styles.editorialList}>
                <li>Rarely yields efficient algorithms.</li>
                <li>Some brute-force algorithms are unacceptably slow (e.g., traveling salesman).</li>
                <li>Not as "intellectually satisfying" as more sophisticated techniques.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec04;
