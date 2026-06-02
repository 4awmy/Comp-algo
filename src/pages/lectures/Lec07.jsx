import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import FakeCoinTracer from '../../components/visualization/bespoke/FakeCoinTracer';
import JosephusTracer from '../../components/visualization/bespoke/JosephusTracer';
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

        <section id="combinatorial-generation" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Combinatorial Generation</h2>
          <p className={styles.editorialText}>
            Generating permutations and subsets are fundamental tasks in combinatorial computing. While often expensive ($O(n!)$ or $O(2^n)$), decrease-and-conquer allows us to generate each new instance from the previous one with <b>minimal changes</b>.
          </p>

          <div className={styles.gridTwoCol}>
            <div className={styles.methodBox}>
              <h3>Johnson-Trotter Algorithm</h3>
              <p>Generates permutations such that each differs from its predecessor by a single swap of adjacent elements. It assigns a <em>direction</em> to each element.</p>
              <MathBlock math="n! \text{ steps, but each is } O(1)" />
            </div>
            <div className={styles.methodBox}>
              <h3>Binary-Reflected Gray Code</h3>
              <p>Generates all $2^n$ subsets of an $n$-element set such that each subset differs from the previous one by exactly one element (bit flip).</p>
              <MathBlock math="G(n) = [0G(n-1), 1G(n-1)^R]" />
            </div>
          </div>
        </section>

        <section id="fake-coin" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Decrease-by-a-Factor: The Fake Coin Problem</h2>
          <p className={styles.editorialText}>
            Given $n$ identical-looking coins where one is lighter (fake), identify the fake coin using a balance scale. While a binary split ($n/2$) works, dividing into <b>three groups</b> ($n/3$) is actually more efficient.
          </p>

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Binary Split</span>
              <MathBlock math="\lceil \log_2 n \rceil" />
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Ternary Split</span>
              <MathBlock math="\lceil \log_3 n \rceil" />
            </div>
          </div>

          <FakeCoinTracer />

          <p className={styles.editorialText}>
            By weighing two groups of size $\lfloor n/3 \rfloor$, we either find the fake in one of the pans or know it must be in the third (unweighed) group. This reduces the problem size by a factor of 3 in each step.
          </p>
        </section>

        <section id="russian-peasant" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Russian Peasant Multiplication</h2>
          <p className={styles.editorialText}>
            An ancient method for multiplying two integers $n$ and $m$ that only requires halving, doubling, and addition. It is a classic decrease-by-a-factor algorithm.
          </p>

          <div className={styles.infoCard}>
            <MathBlock block math="n \cdot m = \begin{cases} (n/2) \cdot (2m) & \text{if } n \text{ is even} \\ ((n-1)/2) \cdot (2m) + m & \text{if } n \text{ is odd} \end{cases}" />
          </div>

          <p className={styles.editorialText}>
            Even if we don't know the multiplication table, we can compute any product by repeatedly halving $n$ and doubling $m$, then summing the $m$ values where the corresponding $n$ was odd.
          </p>
        </section>

        <section id="josephus" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. The Josephus Problem</h2>
          <p className={styles.editorialText}>
            $n$ people stand in a circle and are eliminated every $k$-th person (here $k=2$). We want to find the position of the last survivor.
          </p>

          <JosephusTracer />

          <div className={styles.gridTwoCol}>
            <div className={styles.comparisonCard}>
              <h3>Recurrence Relation</h3>
              <MathBlock block math="J(2n) = 2J(n) - 1" />
              <MathBlock block math="J(2n+1) = 2J(n) + 1" />
            </div>
            <div className={styles.comparisonCard}>
              <h3>Binary Solution</h3>
              <p>Represent $n$ in binary. A single <b>left cyclic shift</b> of $n$'s binary representation gives the winning position $J(n)$.</p>
              <MathBlock math="n = 1010_2 (10) \to 0101_2 (5) \text{? No, shift MSB to end.}" />
              <MathBlock math="1010_2 \to 0101_2 \text{ (shift)} \to 0101_2 + 1 \dots" />
              <p>Actually: $n = 2^m + l \implies J(n) = 2l + 1$.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec07;
