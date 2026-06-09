import React from 'react';
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
          
          <ParadigmMetaphor style={{ margin: '2.5rem 0' }} />

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
            complexity={{ time: "\\Theta(n \\log n)", space: "\\Theta(n)" }}
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

          <MergeSortRecursiveTree style={{ margin: '2.5rem 0' }} />

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
             <h4>Divide Sync: Code + Tree + Stack</h4>
             <p className={styles.editorialText}>
                Observe how the recursive calls are added to the stack as we descend the tree.
             </p>
             <MergeSortDivideVisual style={{ margin: '2.5rem 0' }} />
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
              The number of comparisons in the worst case is <MathBlock math="C_{worst}(n) = n \\log_2 n - n + 1" />. In practice, we often simplify this to <MathBlock math="n \\log n" />.
            </p>
          </div>

          <MergeOperationVisual style={{ margin: '2.5rem 0' }} />

          <MergeSortTracer style={{ margin: '2.5rem 0' }} />

          <div id="merge-sort-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Merge Sort Time Complexity Analysis</h4>
            <p className={styles.editorialText}>
              Each level of the recursion tree merges all <MathBlock math="n" /> elements once. Since the array halves at every divide step, the tree has <MathBlock math="\\log_2 n" /> merge levels.
            </p>
            <MathBlock block math="T(n) = 2T(n/2) + \\Theta(n)" />
            <MathBlock block math="T(n) = \\sum_{i=0}^{\\log_2 n - 1} n + \\Theta(n) = \\Theta(n \\log n)" />
            <p className={styles.editorialText}>
              The auxiliary array used during merging stores up to <MathBlock math="n" /> elements, so the extra space is <MathBlock math="\\Theta(n)" />.
            </p>
          </div>
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
            complexity={{ time: "\\Theta(n \\log n) \\text{ average}, O(n^2) \\text{ worst}", space: "\\Theta(\\log n)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec09/slide74_img0.jpg" 
            alt="Quick Sort Partitioning" 
            caption="Partitioning is the heart of Quick Sort, determining the final position of the pivot."
            style={{ margin: '2.5rem 0' }}
          />

          <PivotMetaphor style={{ margin: '2.5rem 0' }} />

          <div className={styles.methodBox}>
            <h3>Partitioning Logic</h3>
            <p className={styles.editorialText}>
              Smaller elements walk to the left of the pivot, and larger elements walk to the right. The pivot then finds its permanent final sorted position.
            </p>
            <MathBlock block math="T(n) = T(s) + T(n-s-1) + \\Theta(n)" />
          </div>

          <QuickSortTracer style={{ margin: '2.5rem 0' }} />

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
             <h4>Average vs. Worst Case</h4>
             <p className={styles.editorialText}>
                Balanced partitions produce <MathBlock math="\\Theta(n \\log n)" />, while highly unbalanced partitions (e.g., already sorted array) lead to <MathBlock math="\\Theta(n^2)" />.
             </p>
             <QuickSortWorstCase style={{ margin: '2.5rem 0' }} />
          </div>

          <div id="quick-sort-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Quick Sort Time Complexity Analysis</h4>
            <p className={styles.editorialText}>
              Partitioning scans the current subarray once. The total cost depends on how evenly the pivot splits the input.
            </p>
            <MathBlock block math="T(n) = T(s) + T(n-s-1) + \\Theta(n)" />
            <MathBlock block math="T_{avg}(n) = 2T(n/2) + \\Theta(n) = \\Theta(n \\log n)" />
            <MathBlock block math="T_{worst}(n) = T(n-1) + \\Theta(n) = \\sum_{k=1}^{n} k = \\Theta(n^2)" />
            <p className={styles.editorialText}>
              With balanced partitions, the recursion stack has height <MathBlock math="\\Theta(\\log n)" />; the worst case can grow to <MathBlock math="\\Theta(n)" /> stack frames.
            </p>
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
            complexity={{ time: "\\Theta(n)", space: "\\Theta(h)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec09/slide78_img0.jpg" 
            alt="Binary Tree Traversal" 
            caption="The three standard ways to visit every node in a binary tree."
            style={{ margin: '2.5rem 0' }}
          />

          <TraversalMetaphor style={{ margin: '2.5rem 0' }} />

          <div className={styles.gridThreeCol}>
            <div className={styles.comparisonCard}>
              <h3>Preorder</h3>
              <MathBlock math="\\text{Root} \\to \\text{L} \\to \\text{R}" />
            </div>
            <div className={styles.comparisonCard}>
              <h3>Inorder</h3>
              <MathBlock math="\\text{L} \\to \\text{Root} \\to \\text{R}" />
            </div>
            <div className={styles.comparisonCard}>
              <h3>Postorder</h3>
              <MathBlock math="\\text{L} \\to \\text{R} \\to \\text{Root}" />
            </div>
          </div>

          <TreeTraversalTracer style={{ margin: '2.5rem 0' }} />

          <div id="tree-traversal-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Binary Tree Traversal Time Complexity Analysis</h4>
            <p className={styles.editorialText}>
              Preorder, inorder, and postorder differ only in when the root is visited. All three recursively process the left subtree, the right subtree, and the root exactly once.
            </p>
            <MathBlock block math="T(n) = T(n_L) + T(n_R) + 1" />
            <MathBlock block math="\\sum_{v \\in V} 1 = n \\in \\Theta(n)" />
            <p className={styles.editorialText}>
              The recursion stack stores one root-to-leaf path at a time, so the auxiliary space is <MathBlock math="\\Theta(h)" />, where <MathBlock math="h" /> is tree height.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec09;

