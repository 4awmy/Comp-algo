import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec02 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 02"
        title="Analysis Fundamentals"
        subtitle="Establishing the theoretical framework for measuring algorithm efficiency."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            To compare algorithms objectively, we need a framework that is independent of specific hardware or software implementations. We measure efficiency in two dimensions: <b>Time Efficiency</b> (how fast the algorithm runs) and <b>Space Efficiency</b> (how much extra memory it uses).
          </p>

          <div className={styles.infoCard}>
            <h4>The Analysis Framework</h4>
            <p className={styles.editorialText}>
              In the early days of computing, space was as much a concern as time. Today, while space remains important for massive datasets, time efficiency is typically the primary focus of algorithmic analysis.
            </p>
          </div>
        </section>

        <section id="input-size" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Measuring Input Size</h2>
          <p className={styles.editorialText}>
            Efficiency is almost always a function of the input size, denoted as <MathBlock math="n" />. The way we measure <MathBlock math="n" /> depends on the problem:
          </p>

          <ul className={styles.editorialList}>
            <li><b>Arrays/Lists:</b> The number of elements in the array.</li>
            <li><b>Polynomials:</b> The degree of the polynomial.</li>
            <li><b>Matrices:</b> The number of rows and columns (or total elements).</li>
            <li><b>Graphs:</b> The number of vertices <MathBlock math="|V|" /> and edges <MathBlock math="|E|" />.</li>
            <li><b>Numbers:</b> The number of bits in their binary representation.</li>
          </ul>
        </section>

        <section id="basic-operation" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. The Basic Operation</h2>
          <p className={styles.editorialText}>
            Instead of measuring time in seconds (which depends on the computer's speed), we count the number of times the algorithm's <b>basic operation</b> is executed. This is typically the most time-consuming operation in the algorithm's innermost loop.
          </p>

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Search/Sort</span>
              <p>Key Comparison</p>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Math</span>
              <p>Multiplication / Division</p>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Graph</span>
              <p>Edge Traversal</p>
            </div>
          </div>

          <MathBlock 
            block 
            math="T(n) \approx c \cdot C(n)" 
            caption="Total running time is roughly the cost of one basic operation (c) times the number of times it is executed (C(n))."
          />
        </section>

        <section id="case-analysis" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Best, Worst, and Average Case</h2>
          <p className={styles.editorialText}>
            For many algorithms, the running time depends not just on the <em>size</em> of the input, but on the <em>specific values</em> in the input.
          </p>

          <div className={styles.gridThreeCol}>
            <div className={styles.infoCard}>
              <h3>Worst Case</h3>
              <p>The maximum number of steps over all inputs of size <MathBlock math="n" />. This provides a guaranteed upper bound.</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Best Case</h3>
              <p>The minimum number of steps. Rarely useful on its own but helps define boundaries.</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Average Case</h3>
              <p>The expected number of steps over all possible inputs, often requiring probabilistic analysis.</p>
            </div>
          </div>
        </section>

        <section id="asymptotic-notation" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Asymptotic Notations</h2>
          <p className={styles.editorialText}>
            We use asymptotic notation to describe the <b>order of growth</b> of an algorithm's complexity, ignoring constant factors and lower-order terms.
          </p>

          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCard}>
              <h3>Big O (<MathBlock math="O" />)</h3>
              <p><b>Upper Bound:</b> <MathBlock math="t(n) \in O(g(n))" /> if <MathBlock math="t(n) \leq c \cdot g(n)" /> for all <MathBlock math="n \geq n_0" />.</p>
            </div>
            <div className={styles.comparisonCard}>
              <h3>Big Omega (<MathBlock math="\Omega" />)</h3>
              <p><b>Lower Bound:</b> <MathBlock math="t(n) \in \Omega(g(n))" /> if <MathBlock math="t(n) \geq c \cdot g(n)" /> for all <MathBlock math="n \geq n_0" />.</p>
            </div>
            <div className={styles.comparisonCard}>
              <h3>Big Theta (<MathBlock math="\Theta" />)</h3>
              <p><b>Tight Bound:</b> <MathBlock math="t(n) \in \Theta(g(n))" /> if it is both <MathBlock math="O(g(n))" /> and <MathBlock math="\Omega(g(n))" />.</p>
            </div>
          </div>

          <div className={styles.methodBox}>
            <h3>Basic Efficiency Classes</h3>
            <ul className={styles.editorialList}>
              <li><MathBlock math="1" />: Constant</li>
              <li><MathBlock math="\log n" />: Logarithmic</li>
              <li><MathBlock math="n" />: Linear</li>
              <li><MathBlock math="n \log n" />: Linearithmic</li>
              <li><MathBlock math="n^2" />: Quadratic</li>
              <li><MathBlock math="n^3" />: Cubic</li>
              <li><MathBlock math="2^n" />: Exponential</li>
              <li><MathBlock math="n!" />: Factorial</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec02;
