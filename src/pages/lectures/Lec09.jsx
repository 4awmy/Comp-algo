import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import MergeSortTracer from '../../components/visualization/bespoke/MergeSortTracer';
import QuickSortTracer from '../../components/visualization/bespoke/QuickSortTracer';
import TreeTraversalTracer from '../../components/visualization/bespoke/TreeTraversalTracer';
import { 
  ParadigmMetaphor, 
  MergeSortRecursiveTree, 
  MergeSortDivideVisual,
  MergeOperationVisual, 
  PivotMetaphor, 
  QuickSortWorstCase, 
  TraversalMetaphor 
} from '../../components/visualization/bespoke/DivideConquerConcepts';
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
          <h2 className={styles.sectionTitle}>Divide and Conquer Paradigm</h2>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            <b>Divide and Conquer</b> is an algorithm design paradigm based on multi-branched recursion. It works by recursively breaking down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly.
          </p>
          
          <ParadigmMetaphor />

          <div className={styles.infoCard}>
            <h4>The Three Steps</h4>
            <ul className={styles.editorialList}>
              <li><b>Divide:</b> Break the problem into smaller sub-problems.</li>
              <li><b>Conquer:</b> Solve sub-problems recursively (or directly if they are base cases).</li>
              <li><b>Combine:</b> Merge sub-problem solutions into the final result.</li>
            </ul>
          </div>
        </section>

        <section id="merge-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Merge Sort</h2>
          <p className={styles.editorialText}>
            Merge Sort repeatedly divides an array into halves until each subarray contains one element, then merges them back in sorted order.
          </p>

          <div className={styles.gridTwoCol}>
             <div className={styles.infoCard}>
                <h4>Divide Phase (Base Case)</h4>
                <p className={styles.editorialText}>Recursion stops when array size equals 1. These leaf nodes are considered "already sorted".</p>
             </div>
             <div className={styles.infoCard}>
                <h4>Conquer (Merge)</h4>
                <p className={styles.editorialText}>Two sorted arrays are merged into one sorted array by comparing their smallest elements.</p>
             </div>
          </div>

          <MergeSortRecursiveTree />

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
             <h4>Divide Sync: Code + Tree + Stack</h4>
             <p className={styles.editorialText}>
                Observe how the recursive calls are added to the stack as we descend the tree.
             </p>
             <MergeSortDivideVisual />
          </div>

          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Time Complexity</span>
              <MathBlock math="\Theta(n \log n)" />
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Recurrence</span>
              <MathBlock math="T(n) = 2T(n/2) + \Theta(n)" />
            </div>
          </div>

          <MergeOperationVisual />

          <div className={styles.infoCard}>
             <h4>Complete Trace</h4>
             <p className={styles.editorialText}>Watch how the array is physically divided and then merged back together in the interactive tracer below.</p>
          </div>

          <MergeSortTracer />
        </section>

        <section id="quick-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Quick Sort</h2>
          <p className={styles.editorialText}>
            Quick Sort also uses Divide and Conquer but focuses on the <b>Divide</b> step. It picks an element as a <b>pivot</b> and partitions the array around it.
          </p>

          <PivotMetaphor />

          <div className={styles.methodBox}>
            <h3>Partitioning Logic</h3>
            <p className={styles.editorialText}>
              Smaller elements walk to the left of the pivot, and larger elements walk to the right. The pivot then finds its permanent final sorted position.
            </p>
            <MathBlock block math="T(n) = T(s) + T(n-s-1) + \Theta(n)" />
          </div>

          <QuickSortTracer />

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
             <h4>Average vs. Worst Case</h4>
             <p className={styles.editorialText}>
                Balanced partitions produce <MathBlock math="\Theta(n \log n)" />, while highly unbalanced partitions (e.g., already sorted array) lead to <MathBlock math="\Theta(n^2)" />.
             </p>
             <QuickSortWorstCase />
          </div>
        </section>

        <section id="tree-traversal" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Binary Tree Traversal</h2>
          <p className={styles.editorialText}>
            Traversing a binary tree is naturally recursive: solve for the left subtree, solve for the right subtree, and visit the root.
          </p>

          <TraversalMetaphor />

          <div className={styles.gridThreeCol}>
            <div className={styles.comparisonCard}>
              <h3>Preorder</h3>
              <MathBlock math="\text{Root} \to \text{L} \to \text{R}" />
            </div>
            <div className={styles.comparisonCard}>
              <h3>Inorder</h3>
              <MathBlock math="\text{L} \to \text{Root} \to \text{R}" />
            </div>
            <div className={styles.comparisonCard}>
              <h3>Postorder</h3>
              <MathBlock math="\text{L} \to \text{R} \to \text{Root}" />
            </div>
          </div>

          <TreeTraversalTracer />

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              Since every node is visited exactly once, the time complexity for all traversals is linear:
            </p>
            <MathBlock block math="\Theta(n)" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec09;
