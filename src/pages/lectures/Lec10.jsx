import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import HeapsortTracer from '../../components/visualization/bespoke/HeapsortTracer';
import HornersTracer from '../../components/visualization/bespoke/HornersTracer';
import AvlTreeTracer from '../../components/visualization/bespoke/AvlTreeTracer';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec10 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 10"
        title="Transform & Conquer"
        subtitle="Solving problems by transforming them into a more amenable form before the conquering stage."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            The <b>transform-and-conquer</b> paradigm is a two-stage procedure for solving problems. In the first stage, the problem's instance is <b>transformed</b> into a form that is easier to solve. In the second stage, the problem is <b>conquered</b> (solved) in its new representation.
          </p>
          
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Three Main Variations</h4>
              <ul className={styles.editorialList}>
                <li>
                  <b>Instance Simplification:</b> Transformation to a simpler instance of the same problem (e.g., Presorting).
                </li>
                <li>
                  <b>Representation Change:</b> Transformation to a different representation of the same instance (e.g., Heaps, AVL Trees, Horner's Rule).
                </li>
                <li>
                  <b>Problem Reduction:</b> Transformation to an instance of a different problem for which an algorithm is already known.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="presorting" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Instance Simplification: Presorting</h2>
          <p className={styles.editorialText}>
            Many questions about a list are easier to answer if the list is sorted. Presorting involves sorting the list first, then performing the desired operation.
          </p>

          <div className={styles.methodBox}>
            <h3>Example: Element Uniqueness</h3>
            <p className={styles.editorialText}>
              To check if all elements in an array are unique:
            </p>
            <ul className={styles.editorialList}>
              <li><b>Brute Force:</b> Compare all pairs. <MathBlock math="\Theta(n^2)" /></li>
              <li><b>Presorting:</b> Sort the array, then check adjacent elements. <MathBlock math="\Theta(n \log n) + \Theta(n) = \Theta(n \log n)" /></li>
            </ul>
          </div>
        </section>

        <section id="avl-trees" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Representation Change: Balanced Search Trees</h2>
          <p className={styles.editorialText}>
            A standard Binary Search Tree (BST) can become skewed, leading to <MathBlock math="\Theta(n)" /> performance. Balanced trees like <b>AVL Trees</b> ensure the height remains <MathBlock math="\Theta(\log n)" />.
          </p>

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Search/Insert/Delete</span>
              <MathBlock math="\Theta(\log n)" />
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Balance Factor (BF)</span>
              <MathBlock math="h_L - h_R \in \{-1, 0, 1\}" />
            </div>
          </div>

          <p className={styles.editorialText}>
            When a balance factor becomes <MathBlock math="\pm 2" />, a rotation is required. There are four types of rotations: Single (LL, RR) and Double (LR, RL).
          </p>

          <AvlTreeTracer />
        </section>

        <section id="heapsort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Representation Change: Heapsort</h2>
          <p className={styles.editorialText}>
            A <b>Heap</b> is a complete binary tree where each node satisfies the <em>parental dominance</em> property: the key in each node is greater than or equal to the keys in its children.
          </p>

          <div className={styles.infoCard} style={{ marginBottom: '2rem' }}>
            <h4>Algorithm Stages</h4>
            <ol className={styles.editorialList}>
              <li><b>Stage 1 (Heap Construction):</b> Transform the unordered array into a Max-Heap using a bottom-up approach (<MathBlock math="\Theta(n)" />).</li>
              <li><b>Stage 2 (Maximum Deletions):</b> Repeatedly extract the root (maximum) and re-heapify the remaining elements (<MathBlock math="\Theta(n \log n)" />).</li>
            </ol>
          </div>

          <HeapsortTracer />
        </section>

        <section id="horners-rule" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Representation Change: Horner's Rule</h2>
          <p className={styles.editorialText}>
            Evaluating a polynomial of degree <MathBlock math="n" /> at a point <MathBlock math="x" /> can be done more efficiently by changing its representation.
          </p>

          <MathBlock 
            block 
            math="P(x) = (\dots((a_n x + a_{n-1})x + a_{n-2})x + \dots + a_1)x + a_0" 
            caption="Horner's Rule: Reduces the number of multiplications from O(n^2) or O(n) to exactly n."
          />

          <HornersTracer />
        </section>
      </div>
    </div>
  );
};

export default Lec10;
