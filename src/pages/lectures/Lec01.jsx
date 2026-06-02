import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import GcdRaceTracer from '../../components/visualization/bespoke/GcdRaceTracer';
import SortingSearchingTracer from '../../components/visualization/bespoke/SortingSearchingTracer';
import GraphConverterTracer from '../../components/visualization/bespoke/GraphConverterTracer';
import SieveTracer from '../../components/visualization/bespoke/SieveTracer';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec01 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 01"
        title="Introduction to Algorithms"
        subtitle="Exploring the fundamental concepts of algorithmic thinking and problem-solving."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            An <b>algorithm</b> is a sequence of unambiguous instructions for solving a problem, for obtaining a required output for any legitimate input in a finite amount of time. In this course, we will dive deep into the design and analysis of these logical structures that power modern computing.
          </p>

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Course Agenda</h4>
              <ul className={styles.editorialList}>
                <li>The Course Plan & Grading</li>
                <li>What is an Algorithm?</li>
                <li>Important Problem Types</li>
                <li>Fundamental Data Structures</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>Grading Breakdown</h4>
              <ul className={styles.editorialList}>
                <li><b>Week 5/10:</b> Quizzes (5% each)</li>
                <li><b>Week 7:</b> Midterm (20%) + Assignment (5%)</li>
                <li><b>Week 12:</b> Project (15%)</li>
                <li><b>Final:</b> Exam (40%) + Prefinal (10%)</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
             <p className={styles.editorialText}>
               <b>Note:</b> Each student who exceeds 20% in course attendance will receive a warning; at 25%, the course will be withdrawn. Every student should attend according to their schedule, and if you are absent, you are responsible for following up on what you missed.
             </p>
          </div>
        </section>

        <section id="what-is-algorithm" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>What Makes a Good Algorithm?</h2>
          <p className={styles.editorialText}>
            A good algorithm must be <b>correct</b> (solving the problem for any legitimate input) and <b>efficient</b> (using resources like time and space optimally). Let's compare two different ways to solve the same problem: finding the <b>Greatest Common Divisor (GCD)</b>.
          </p>
          
          <p className={styles.editorialText}>
            The GCD of 60 and 24 is 12, which is the largest number that both input numbers are divisible by.
          </p>

          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCard}>
              <h3>Euclid's Algorithm</h3>
              <p>Based on the property: <MathBlock math="\text{gcd}(m, n) = \text{gcd}(n, m \pmod n)" /></p>
              <p>It uses <b>Decrease and Conquer</b> and is remarkably fast.</p>
            </div>
            <div className={styles.comparisonCard}>
              <h3>Consecutive Integer Checking</h3>
              <p>Starts from <MathBlock math="t = \min(m, n)" /> and checks each integer descending to 1.</p>
              <p>It uses <b>Brute Force</b> and can be very slow for large inputs.</p>
            </div>
          </div>

          <GcdRaceTracer />
        </section>

        <section id="sorting-searching" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Fundamental Problem Types</h2>
          <p className={styles.editorialText}>
             The most common computational tasks involve rearranging data or finding specific information.
          </p>

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>1. Sorting</h4>
              <p className={styles.editorialText}>Rearranging items in nondecreasing order. Essential for efficient search and data organization.</p>
            </div>
            <div className={styles.infoCard}>
              <h4>2. Searching</h4>
              <p className={styles.editorialText}>Finding a specific <b>key</b> within a set. Efficiency depends on whether the data is already sorted.</p>
            </div>
          </div>

          <SortingSearchingTracer />
        </section>

        <section id="graph-data" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Graph Representations</h2>
          <p className={styles.editorialText}>
            Graphs are versatile data structures consisting of <b>vertices</b> and <b>edges</b>. They can be directed or undirected and are represented in code primarily via matrices or lists.
          </p>
          <GraphConverterTracer />
        </section>

        <section id="sieve" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Case Study: Sieve of Eratosthenes</h2>
          <p className={styles.editorialText}>
            A classic algorithm for finding all prime numbers up to a given limit <MathBlock math="n" />. It works by iteratively marking the multiples of each prime number as composite.
          </p>
          <SieveTracer />
        </section>

        <section id="problem-types" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Other Important Problem Types</h2>
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>3. String Processing</h4>
              <p>Manipulating text data, from simple reversal to complex pattern matching (like DNA sequence analysis).</p>
            </div>
            <div className={styles.infoCard}>
              <h4>4. Combinatorial Problems</h4>
              <p>Finding objects like permutations or subsets that satisfy specific constraints. Often leads to exponential complexity.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec01;
