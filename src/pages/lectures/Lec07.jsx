import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import FakeCoinTracer from '../../components/visualization/bespoke/FakeCoinTracer';
import JosephusTracer from '../../components/visualization/bespoke/JosephusTracer';
import { 
  JohnsonTrotterTracer,
  LexicographicTracer,
  BottomUpSubsetTracer,
  GrayCodeTracer,
  BinarySearchRace, 
  RussianPeasantTracer, 
  JosephusCircle 
} from '../../components/visualization/bespoke/DecreaseConquerIIConcepts';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec07 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 07"
        title="Decrease & Conquer II"
        subtitle="Exploring decrease-by-a-constant-factor and variable-size-decrease variations through complex combinatorial problems."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            In this second deep-dive into <b>decrease-and-conquer</b>, we shift our focus from simple decrease-by-one patterns to more sophisticated reductions. We explore algorithms where the instance size is reduced by a <b>constant factor</b> or even by a <b>variable amount</b> depending on the state of the problem.
          </p>
          
          <div className={styles.infoCard}>
            <h4>Core Algorithms Covered</h4>
            <ul className={styles.editorialList}>
              <li><b>Combinatorial Generation:</b> Johnson-Trotter and Binary-Reflected Gray Code.</li>
              <li><b>Decrease-by-a-Constant-Factor:</b> Fake Coin Problem ($n/3$ strategy) and Russian Peasant Multiplication.</li>
              <li><b>The Josephus Problem:</b> A classic case of circular elimination with a surprising binary solution.</li>
            </ul>
          </div>
        </section>

        <section id="permutations" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Generating Permutations</h2>
          <p className={styles.editorialText}>
            Generating permutations is a fundamental task in combinatorial computing. The <b>minimal-change</b> requirement ensures that each new permutation is created by swapping exactly two adjacent elements.
          </p>

          <JohnsonTrotterTracer />

          <div className={styles.gridTwoCol}>
            <div className={styles.methodBox}>
              <h3>Minimal-Change Algorithm</h3>
              <p>Each permutation differs from its predecessor by a single swap of adjacent elements. The Johnson-Trotter algorithm is the most famous implementation of this property.</p>
              <MathBlock math="n! \text{ permutations, } O(1) \text{ per change}" />
            </div>
            <div className={styles.methodBox}>
              <h3>Lexicographic Generation</h3>
              <p>Dictionary order generation. While logical, it often requires multiple swaps to move from one permutation to the next.</p>
              <LexicographicTracer />
            </div>
          </div>
        </section>

        <section id="subsets" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Generating Subsets</h2>
          <p className={styles.editorialText}>
            The bottom-up approach generates subsets of size $n$ by taking all subsets of size $n-1$ and duplicating them, adding the new $n$-th element to each duplicate.
          </p>

          <BottomUpSubsetTracer />

          <div className={styles.infoCard}>
            <h4>Binary Reflected Gray Code</h4>
            <p className={styles.editorialText}>
              A Gray code is a sequence of bit strings where each differs from the predecessor by exactly one bit. This corresponds to adding or removing exactly one element from a subset.
            </p>
            <GrayCodeTracer />
            <MathBlock block math="G(n) = [0G(n-1), 1G(n-1)^R]" />
          </div>
        </section>

        <section id="binary-search" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Binary Search</h2>
          <p className={styles.editorialText}>
            Binary Search is the ultimate example of <b>decrease-by-a-constant-factor</b> ($n/2$). By comparing the target with the middle element, we can discard half of the remaining array in each step.
          </p>

          <BinarySearchRace />

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Linear Search</span>
              <MathBlock math="\Theta(n)" />
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Binary Search</span>
              <MathBlock math="\Theta(\log n)" />
            </div>
          </div>
        </section>

        <section id="fake-coin" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. The Fake Coin Problem</h2>
          <p className={styles.editorialText}>
            Given $n$ coins where one is lighter, identifying it using a balance scale. Dividing into <b>three groups</b> ($n/3$) is more efficient than binary splitting.
          </p>

          <FakeCoinTracer />

          <p className={styles.editorialText}>
            Ternary splitting reduces the search space more aggressively than binary splitting, yielding $\lceil \log_3 n \rceil$ weighings.
          </p>
        </section>

        <section id="russian-peasant" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>5. Russian Peasant Multiplication</h2>
          <p className={styles.editorialText}>
            An ancient method for multiplying two integers $n$ and $m$ using only halving, doubling, and addition.
          </p>

          <RussianPeasantTracer />

          <div className={styles.infoCard}>
            <p className={styles.editorialText}>
              The method works because it essentially performs binary multiplication. We halve $n$ and double $m$, keeping the $m$ values where $n$ is odd.
            </p>
            <MathBlock math="T(n) \in \Theta(\log n)" />
          </div>
        </section>

        <section id="josephus" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>6. The Josephus Problem</h2>
          <p className={styles.editorialText}>
            Eliminating every second person in a circle until one remains. The solution has a beautiful property linked to binary representation.
          </p>

          <JosephusCircle />

          <div className={styles.gridTwoCol}>
            <div className={styles.comparisonCard}>
               <h3>Interactive Tracer</h3>
               <p className={styles.editorialText}>Explore the exact step-by-step elimination sequence for any n in the simulator below.</p>
               <JosephusTracer />
            </div>
            <div className={styles.comparisonCard}>
              <h3>Surprising Solution</h3>
              <p className={styles.editorialText}>If $n = 2^m + l$, the winning position is $2l + 1$. This corresponds to moving the most significant bit of $n$'s binary representation to the end.</p>
              <MathBlock math="J(n) = 2l + 1" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec07;

