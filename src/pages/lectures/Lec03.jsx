import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import AnalysisWorkspace from '../../components/visualization/bespoke/AnalysisWorkspace';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec03 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 03"
        title="Complexity Analysis"
        subtitle="Mathematical frameworks for non-recursive and recursive algorithm evaluation."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            Analysis of algorithm efficiency is divided into two main categories: mathematical analysis of <b>non-recursive</b> algorithms and mathematical analysis of <b>recursive</b> algorithms. Each requires a different approach to counting the basic operation.
          </p>
        </section>

        <section id="non-recursive" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Analysis of Non-Recursive Algorithms</h2>
          <p className={styles.editorialText}>
            For non-recursive algorithms, the analysis typically involves setting up a summation that counts the number of times the basic operation is executed.
          </p>

          <div className={styles.infoCard}>
            <h3>General Plan</h3>
            <ol className={styles.editorialList}>
              <li>Decide on a parameter indicating input size <MathBlock math="n" />.</li>
              <li>Identify the algorithm's basic operation.</li>
              <li>Check if the count depends only on <MathBlock math="n" />. If not, analyze worst/best/average cases.</li>
              <li>Set up a sum for the number of basic operations.</li>
              <li>Simplify the sum using standard formulas and rules.</li>
            </ol>
          </div>

          <div className={styles.methodBox}>
            <h3>Example: Selection Sort</h3>
            <p className={styles.editorialText}>
              In Selection Sort, we scan the list to find the smallest element and swap it into the correct position. The basic operation is the <b>comparison</b> of elements.
            </p>
            <MathBlock 
              block 
              math="C(n) = \sum_{i=0}^{n-2} \sum_{j=i+1}^{n-1} 1" 
              caption="The outer loop runs n-1 times, and the inner loop decreases in size."
            />
            <MathBlock 
              block 
              math="C(n) = \sum_{i=0}^{n-2} (n-1 - i) = (n-1) + (n-2) + \dots + 1" 
            />
            <MathBlock 
              block 
              math="C(n) = \frac{(n-1)n}{2} \in \Theta(n^2)" 
              caption="Selection Sort always performs a quadratic number of comparisons."
            />
          </div>
        </section>

        <section id="recursive" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Analysis of Recursive Algorithms</h2>
          <p className={styles.editorialText}>
            Recursive algorithms are analyzed by creating a <b>recurrence relationship</b> that describes the algorithm's performance in terms of its performance on smaller inputs.
          </p>

          <div className={styles.infoCard}>
            <h3>General Plan</h3>
            <ol className={styles.editorialList}>
              <li>Identify the basic operation and input size <MathBlock math="n" />.</li>
              <li>Set up a recurrence relation with a base case.</li>
              <li>Solve the recurrence using method of backward substitution or Master Theorem.</li>
            </ol>
          </div>

          <div className={styles.methodBox}>
            <h3>Example: Recursive Factorial</h3>
            <p className={styles.editorialText}>
              To compute <MathBlock math="n!" />, we use <MathBlock math="F(n) = n \cdot F(n-1)" />. The basic operation is <b>multiplication</b>.
            </p>
            <MathBlock 
              block 
              math="M(n) = M(n-1) + 1 \quad \text{for } n > 0" 
              caption="Base case: M(0) = 0"
            />
            <p className={styles.editorialText}>Solving by backward substitution:</p>
            <MathBlock 
              block 
              math="M(n) = M(n-1) + 1 = [M(n-2) + 1] + 1 = M(n-2) + 2" 
            />
            <MathBlock 
              block 
              math="M(n) = M(n-k) + k" 
            />
            <p className={styles.editorialText}>Setting <MathBlock math="k=n" />:</p>
            <MathBlock 
              block 
              math="M(n) = M(0) + n = 0 + n = n \in \Theta(n)" 
            />
          </div>
        </section>

        <section id="workspace" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Interactive Exploration</h2>
          <p className={styles.editorialText}>
            Use the workspace below to visualize how summations grow and compare the dramatic difference between linear iterative logic and exponential recursive growth.
          </p>
          <AnalysisWorkspace />
        </section>

        <section id="empirical" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Empirical Analysis</h2>
          <p className={styles.editorialText}>
            While mathematical analysis provides theoretical bounds, <b>empirical analysis</b> involves executing the algorithm on a computer and measuring its actual performance.
          </p>
          <div className={styles.infoCard}>
            <p className={styles.editorialText}>
              Empirical analysis is crucial when:
            </p>
            <ul className={styles.editorialList}>
              <li>Mathematical analysis is too difficult.</li>
              <li>We need to account for "hidden constants" like memory access speed.</li>
              <li>We want to verify our theoretical results.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec03;
