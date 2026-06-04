import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';
import HorspoolTracer from '../../components/visualization/bespoke/HorspoolTracer';
import HashingTracer from '../../components/visualization/bespoke/HashingTracer';
import ComparisonCountingSortTracer from '../../components/visualization/bespoke/ComparisonCountingSortTracer';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec11 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 11"
        title="Space & Time Trade-offs"
        subtitle="Optimizing algorithm performance by utilizing extra memory to store precomputed information."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            In algorithm design, we often face a fundamental choice: should we prioritize speed (time) or memory efficiency (space)? Most optimizations in one direction come at the cost of the other. This is known as the <b>Space-Time Trade-off</b>.
          </p>
          
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Two Main Strategies</h4>
              <ul className={styles.editorialList}>
                <li>
                  <b>Input Enhancement:</b> Pre-processing the input to store useful information in a table that can be used during the execution of the algorithm.
                </li>
                <li>
                  <b>Pre-structuring:</b> Organizing the data in a way that allows for faster access or more efficient operations later.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="counting-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Input Enhancement: Comparison Counting Sort</h2>
          <p className={styles.editorialText}>
            <b>Comparison Counting Sort</b> is a simple sorting algorithm that works by counting, for each element, the number of elements smaller than it. If we know there are 3 elements smaller than <MathBlock math="x" />, then <MathBlock math="x" /> must belong in the 4th position of the sorted array.
          </p>

          <AlgorithmCard 
            title="Comparison Counting Sort"
            goal="Sort an array by counting smaller elements for each item."
            steps={[
              "Initialize a 'Count' array of size n with zeros.",
              "Compare every pair of elements (i, j) in the input array.",
              "If element[i] < element[j], increment Count[j].",
              "Else, increment Count[i].",
              "Place each element[i] at position Count[i] in the result array."
            ]}
            complexity={{
              time: "\\Theta(n^2)",
              space: "\\Theta(n)"
            }}
          />

          <p className={styles.editorialText} style={{ marginTop: '2rem' }}>
            While its time complexity is no better than simple sorts like Selection Sort, it demonstrates the principle of using an extra <em>Count</em> array to simplify the logic and avoid in-place swaps.
          </p>

          <ComparisonCountingSortTracer />
        </section>

        <section id="horspool" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Input Enhancement: Horspool's Algorithm</h2>
          <p className={styles.editorialText}>
            Horspool's algorithm improves upon brute-force string matching by using <b>Input Enhancement</b>. It pre-calculates a <em>Shift Table</em> based on the pattern being searched.
          </p>

          <AlgorithmCard 
            title="Horspool's Algorithm"
            goal="Efficient string matching using a precomputed shift table."
            steps={[
              "Precompute the Shift Table for the given pattern.",
              "Align the pattern with the beginning of the text.",
              "Compare characters from right to left.",
              "If a mismatch occurs, look up the shift distance in the table.",
              "Shift the pattern and repeat until a match is found or the text ends."
            ]}
            complexity={{
              time: "O(mn) \\text{ worst}, \\Theta(n) \\text{ avg}",
              space: "\\Theta(m) \\text{ for table}"
            }}
          />

          <div className={styles.infoCard} style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <h4>Key Innovations</h4>
            <ul className={styles.editorialList}>
              <li><b>Right-to-Left Scan:</b> Compares the pattern against the text starting from the last character of the pattern.</li>
              <li><b>Intelligent Shifts:</b> When a mismatch occurs, it uses the precomputed shift table to jump multiple positions ahead.</li>
            </ul>
          </div>

          <MathBlock 
            block 
            math="t(c) = \begin{cases} m & \text{if } c \text{ is not in first } m-1 \text{ chars} \\ m - 1 - i & \text{rightmost index } i \text{ in first } m-1 \text{ chars} \end{cases}" 
            caption="The Shift Table Rule: Determines how many characters to skip based on the character in the text aligned with the last character of the pattern."
          />

          <div className={styles.infoCard}>
            <h4>Shift Table Example: "BARBER"</h4>
            <p className={styles.editorialText}>
              For the pattern <b>BARBER</b> (length $m=6$), the shift table is calculated by looking at the first $m-1$ characters:
            </p>
            <ul className={styles.editorialList}>
              <li><b>B:</b> Rightmost index is 3, shift = $6 - 1 - 3 = 2$</li>
              <li><b>A:</b> Rightmost index is 1, shift = $6 - 1 - 1 = 4$</li>
              <li><b>R:</b> Rightmost index is 2, shift = $6 - 1 - 2 = 3$</li>
              <li><b>E:</b> Rightmost index is 4, shift = $6 - 1 - 4 = 1$</li>
              <li><b>Others:</b> Shift = $m = 6$</li>
            </ul>
            <PremiumImage 
              src="/images/lectures/lec11/slide10_img0.png" 
              alt="Horspool Shift Table" 
              caption="The shift table for 'BARBER' determines the jump distance for each character."
            />
          </div>

          <PremiumImage 
            src="/images/lectures/lec11/slide11_img0.png" 
            alt="Horspool Search Trace" 
            caption="A trace of Horspool's algorithm searching for 'BARBER' in a text."
          />

          <HorspoolTracer />
        </section>

        <section id="hashing" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Pre-structuring: Hashing</h2>
          <p className={styles.editorialText}>
            <b>Hashing</b> is perhaps the ultimate space-time trade-off. It allows for near-constant time <MathBlock math="O(1)" /> search, insertion, and deletion by mapping keys to a smaller table using a <em>Hash Function</em>.
          </p>

          <div className={styles.methodBox}>
            <h3>Collision Resolution</h3>
            <p className={styles.editorialText}>
              Since multiple keys might map to the same index (a <b>collision</b>), we need strategies to resolve them:
            </p>
            <ul className={styles.editorialList}>
              <li><b>Separate Chaining (Open Hashing):</b> Each slot in the hash table points to a linked list of elements that hashed to that index.</li>
              <li><b>Linear Probing (Closed Hashing):</b> All elements are stored in the table itself; if a slot is occupied, we probe the next available slot linearly.</li>
            </ul>
          </div>

          <HashingTracer />

          <p className={styles.editorialText} style={{ marginTop: '2rem' }}>
            The efficiency of hashing depends heavily on the <b>Load Factor</b> <MathBlock math="\alpha = n/m" /> and the quality of the hash function in distributing keys uniformly.
          </p>
        </section>

        <section id="btrees" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Pre-structuring: B-Trees</h2>
          <p className={styles.editorialText}>
            <b>B-Trees</b> are balanced search trees designed specifically for secondary storage (disks). Unlike binary trees, B-Trees have multiple keys per node and many children, which minimizes the number of disk reads.
          </p>

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Why B-Trees?</h4>
              <p className={styles.editorialText}>
                Accessing data on disk is thousands of times slower than RAM. B-Trees reduce the <em>height</em> of the tree significantly, ensuring that even with millions of records, we only need a few disk accesses to find any item.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h4>Properties of B-Trees of order $m$</h4>
              <ul className={styles.editorialList}>
                <li>Every node (except root) has between $\lceil m/2 \rceil$ and $m$ children.</li>
                <li>All leaves are at the same depth.</li>
                <li>The tree is perfectly balanced.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec11;
