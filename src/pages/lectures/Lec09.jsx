import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import MergeSortTracer from '../../components/visualization/bespoke/MergeSortTracer';
import QuickSortTracer from '../../components/visualization/bespoke/QuickSortTracer';
import TreeTraversalTracer from '../../components/visualization/bespoke/TreeTraversalTracer';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec09 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 09"
        title="Divide & Conquer"
        subtitle="Breaking complex problems into simpler sub-problems, solving them recursively, and combining their results."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            <b>Divide and Conquer</b> is an algorithm design paradigm based on multi-branched recursion. A divide-and-conquer algorithm works by recursively breaking down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly. The solutions to the sub-problems are then combined to give a solution to the original problem.
          </p>
          
          <div className={styles.infoCard}>
            <h4>The Three Steps</h4>
            <ul className={styles.editorialList}>
              <li>
                <b>Divide:</b> Break the given problem into smaller sub-problems of the same type.
              </li>
              <li>
                <b>Conquer:</b> Recursively solve these sub-problems. If the sub-problem is small enough (base case), solve it directly.
              </li>
              <li>
                <b>Combine:</b> Appropriately combine the answers of the sub-problems to get the exact solution to the original problem.
              </li>
            </ul>
          </div>
        </section>

        <section id="merge-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Merge Sort</h2>
          <p className={styles.editorialText}>
            Merge Sort is a perfect example of Divide and Conquer. It continuously cuts the array in half until it cannot be divided further (arrays of 1 element), then repeatedly merges the sub-lists to produce new sorted sub-lists.
          </p>

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Best/Avg/Worst Case</span>
              <MathBlock math="\Theta(n \log n)" />
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Recurrence</span>
              <MathBlock math="T(n) = 2T(n/2) + \Theta(n)" />
            </div>
          </div>

          <MergeSortTracer />

          <p className={styles.editorialText}>
            The time complexity <MathBlock math="\Theta(n \log n)" /> comes from the fact that the tree has <MathBlock math="\log n" /> levels, and at each level, we perform <MathBlock math="n" /> work to merge the sub-arrays.
          </p>
        </section>

        <section id="quick-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Quick Sort</h2>
          <p className={styles.editorialText}>
            Quick Sort also uses Divide and Conquer but focuses on the <b>Divide</b> step. It picks an element as a <b>pivot</b> and partitions the array around it, such that elements smaller than the pivot are on the left and larger elements are on the right.
          </p>

          <div className={styles.methodBox}>
            <h3>Partitioning Logic</h3>
            <p className={styles.editorialText}>
              Unlike Merge Sort which always divides the array in half, Quick Sort's efficiency depends on the choice of the pivot. In the average case, it achieves <MathBlock math="\Theta(n \log n)" />, but the worst case (already sorted array with first element as pivot) can be <MathBlock math="\Theta(n^2)" />.
            </p>
            <MathBlock block math="T(n) = T(s) + T(n-s-1) + \Theta(n)" />
          </div>

          <QuickSortTracer />
        </section>

        <section id="tree-traversal" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Binary Tree Traversal</h2>
          <p className={styles.editorialText}>
            Traversing a binary tree is naturally recursive and follows the Divide and Conquer pattern: solve for the left subtree, solve for the right subtree, and visit the root.
          </p>

          <div className={styles.gridTwoCol}>
            <div className={styles.comparisonCard}>
              <h3>Preorder</h3>
              <p>Visit Root, then Left, then Right.</p>
              <MathBlock math="\text{Root} \to \text{Left} \to \text{Right}" />
            </div>
            <div className={styles.comparisonCard}>
              <h3>Inorder</h3>
              <p>Visit Left, then Root, then Right. (Yields sorted order for BSTs).</p>
              <MathBlock math="\text{Left} \to \text{Root} \to \text{Right}" />
            </div>
            <div className={styles.comparisonCard}>
              <h3>Postorder</h3>
              <p>Visit Left, then Right, then Root.</p>
              <MathBlock math="\text{Left} \to \text{Right} \to \text{Root}" />
            </div>
          </div>

          <TreeTraversalTracer />

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              Since every node must be visited exactly once, the time complexity for all three traversals is:
            </p>
            <MathBlock block math="\Theta(n)" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec09;
