import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';
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

          <AlgorithmCard 
            title="Merge Sort"
            goal="Sort an array by recursively dividing it into halves and merging sorted results."
            steps={[
              "Divide the unsorted array into two nearly equal halves.",
              "Recursively sort the left half and the right half.",
              "Merge the two sorted halves into a single sorted array.",
              "Use two pointers to compare elements from each half and pick the smaller one.",
              "Repeat until all elements are merged back into the original array."
            ]}
            complexity={{ time: "\\Theta(n \\log n)", space: "O(n)" }}
          />

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

          <div className={styles.methodBox}>
            <h3>The Recursive Stack Trace</h3>
            <p className={styles.editorialText}>
              To truly master Merge Sort, we must follow the order of recursive calls. For an array like <MathBlock math="[38, 27, 43, 3, 9]" />, the algorithm follows a depth-first path:
            </p>
            <ol className={styles.editorialList}>
              <li><b>B1:</b> Split [38, 27, 43, 3, 9] into [38, 27] and [43, 3, 9].</li>
              <li><b>C1:</b> Solve the left half [38, 27] first.</li>
              <li><b>B2:</b> Split [38, 27] into [38] and [27].</li>
              <li><b>C2/C3:</b> Reach base cases [38] and [27].</li>
              <li><b>Merge:</b> Combine [38] and [27] into [27, 38].</li>
              <li><b>Repeat:</b> Continue for the right half [43, 3, 9].</li>
            </ol>
          </div>

          <div className={styles.infoCard}>
            <h4>Efficiency Analysis</h4>
            <p className={styles.editorialText}>
              The number of comparisons in the worst case is <MathBlock math="C_{worst}(n) = n \log_2 n - n + 1" />. In practice, we often simplify this to <MathBlock math="n \log n" />.
            </p>
          </div>

          <MergeOperationVisual />

          <MergeSortTracer />
        </section>

        <section id="quick-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Quick Sort</h2>
          <p className={styles.editorialText}>
            Quick Sort also uses Divide and Conquer but focuses on the <b>Divide</b> (Partitioning) step. It picks an element as a <b>pivot</b> and partitions the array around it.
          </p>

          <AlgorithmCard 
            title="Quick Sort"
            goal="Sort an array by partitioning it around a pivot element."
            steps={[
              "Choose a 'pivot' element from the array.",
              "Partition the array: move smaller elements to the left of the pivot and larger to the right.",
              "The pivot is now in its final sorted position.",
              "Recursively apply the process to the left and right sub-arrays.",
              "Combine the results (implicitly handled by partitioning in place)."
            ]}
            complexity={{ time: "\\Theta(n \\log n) \\text{ average}", space: "O(\\log n)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec09/slide74_img0.jpg" 
            alt="Quick Sort Partitioning" 
            caption="Partitioning is the heart of Quick Sort, determining the final position of the pivot."
          />

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

          <AlgorithmCard 
            title="Binary Tree Traversal"
            goal="Visit every node in a binary tree in a specific recursive order."
            steps={[
              "Preorder: Visit Root, then Left Subtree, then Right Subtree.",
              "Inorder: Visit Left Subtree, then Root, then Right Subtree.",
              "Postorder: Visit Left Subtree, then Right Subtree, then Root.",
              "Apply these rules recursively to all child nodes."
            ]}
            complexity={{ time: "\\Theta(n)", space: "O(h)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec09/slide78_img0.jpg" 
            alt="Binary Tree Traversal" 
            caption="The three standard ways to visit every node in a binary tree."
          />

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
