import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';

import { RotationLL, RotationRR, RotationLR, RotationRL, TwoThreeTreeDiagram } from '../../components/visualization/diagrams/AVLRotationDiagram';
import HeapsortTracer from '../../components/visualization/bespoke/HeapsortTracer';
import HornersTracer from '../../components/visualization/bespoke/HornersTracer';
import AvlTreeTracer from '../../components/visualization/bespoke/AvlTreeTracer';
import { 
  TransformationPipeline, 
  PresortingVisual, 
  UniquenessMatrix,
  SortScanVisual,
  BstGrowthTracer,
  BstComparisonTable,
  BstBalanceScale,
  AvlBalanceMeter,
  AvlSelfCorrection,
  BespokeAvlRotations,
  TwoThreeTreeNode,
  TwoThreeInsertion,
  HeapIntroduction,
  HeapProperties,
  HeapArrayMap,
  BottomUpHeapifyTracer,
  TopDownHeapTracer,
  HeapMaxDeletion,
  HeapSortFactory,
  HeapSortTimeline
} from '../../components/visualization/bespoke/TransformConquerConcepts';
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
          <h2 className={styles.sectionTitle}>Transform and Conquer Paradigm</h2>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            The <b>transform-and-conquer</b> paradigm is a two-stage procedure. In the first stage, the problem's instance is <b>transformed</b> into a form that is easier to solve. In the second stage, the problem is <b>conquered</b> (solved) in its new representation.
          </p>
          
          <TransformationPipeline style={{ margin: '2.5rem 0' }} />

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Three Main Variations</h4>
              <ul className={styles.editorialList}>
                <li>
                  <b>Instance Simplification:</b> Transformation to a simpler instance of the same problem (e.g., Presorting).
                </li>
                <li>
                  <b>Representation Change:</b> Transformation to a different representation (e.g., Heaps, AVL Trees).
                </li>
                <li>
                  <b>Problem Reduction:</b> Transformation to an instance of a different problem.
                </li>
              </ul>
            </div>
            <div className={styles.infoCard}>
               <h4>Real-world Metaphor</h4>
               <p className={styles.editorialText}>
                 Think of organizing a library: finding a book is a nightmare on messy shelves, but trivial once the books are sorted alphabetically.
               </p>
            </div>
          </div>
        </section>

        <section id="presorting" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Instance Simplification: Presorting</h2>
          <p className={styles.editorialText}>
            Many questions about a list are easier to answer if the list is sorted. Presorting involves sorting the list first, then performing the desired operation.
          </p>

          <AlgorithmCard 
            title="Element Uniqueness (Presorting)"
            goal="Check if all elements in an array are unique by sorting first."
            steps={[
              "Sort the input array using an efficient algorithm (e.g., Merge Sort).",
              "Scan the sorted array from left to right.",
              "Compare each element with its immediate neighbor.",
              "If any adjacent elements are equal, return 'false' (not unique).",
              "If the scan completes with no matches, return 'true' (all unique)."
            ]}
            complexity={{ time: "O(n \\log n)", space: "O(1) \\text{ or } O(n)" }}
          />

          <PresortingVisual style={{ margin: '2.5rem 0' }} />

          <div className={styles.methodBox}>
            <h3>Case Study Efficiency</h3>
            <p className={styles.editorialText}>
              Compare the brute force quadratic approach with the optimized sorted scan.
            </p>
            <div className={styles.gridTwoCol}>
              <UniquenessMatrix style={{ margin: '1rem 0' }} />
              <SortScanVisual style={{ margin: '1rem 0' }} />
            </div>
          </div>

          <div id="presorting-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Element Uniqueness (Presorting) Complexity Analysis</h4>
            <p className={styles.editorialText}>Sorting the array takes <MathBlock math="\\Theta(n \\log n)" /> time using Merge Sort or Heapsort. The subsequent linear scan compares adjacent elements, taking <MathBlock math="\\Theta(n)" /> time.</p>
            <MathBlock block math="T(n) = T_{\\text{sort}}(n) + T_{\\text{scan}}(n) = \\Theta(n \\log n) + \\Theta(n) = \\Theta(n \\log n)" />
          </div>
        </section>

        <section id="avl-trees" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Representation Change: Balanced Search Trees</h2>
          <p className={styles.editorialText}>
            A standard Binary Search Tree (BST) can become skewed, leading to linear <MathBlock math="\\Theta(n)" /> performance. Balanced trees like <b>AVL Trees</b> and <b>2-3 Trees</b> ensure the height remains logarithmic.
          </p>

          <AlgorithmCard 
            title="AVL Tree Insertion"
            goal="Insert a key into a BST while maintaining height balance."
            steps={[
              "Perform a standard Binary Search Tree insertion.",
              "Update the balance factor (BF = height_left - height_right) for all ancestors.",
              "If any node has |BF| > 1, the tree is imbalanced.",
              "Apply the appropriate rotation: Single (LL, RR) or Double (LR, RL).",
              "The resulting tree remains balanced with height O(log n)."
            ]}
            complexity={{ time: "\\Theta(\\log n)", space: "\\Theta(n)" }}
          />

          <BstBalanceScale style={{ margin: '2.5rem 0' }} />

          <div className={styles.gridTwoCol}>
             <div className={styles.infoCard}>
                <h4>The Balance Factor (BF)</h4>
                <MathBlock math="BF = h_L - h_R \\in \\{-1, 0, 1\\}" />
                <p className={styles.editorialText}>If <MathBlock math="|BF| > 1" />, the tree is imbalanced. We monitor this like a traffic light.</p>
                <AvlBalanceMeter style={{ margin: '1rem 0' }} />
             </div>
             <div className={styles.infoCard}>
                <h4>Search/Insert/Delete</h4>
                <MathBlock math="\\Theta(\\log n)" />
                <p className={styles.editorialText}>Guaranteed logarithmic time even in the worst case.</p>
                <BstComparisonTable style={{ margin: '1rem 0' }} />
             </div>
          </div>

          <h3 className={styles.blockTitle}>AVL Insertion & Growth</h3>
          <div className={styles.infoCard}>
            <h4>Trace Example</h4>
            <p className={styles.editorialText}>
              Insert the following sequence into an empty AVL tree: <b>5, 6, 8, 3, 2, 4, 7</b>. Notice how rotations are triggered to maintain balance.
            </p>
          </div>
          <BstGrowthTracer style={{ margin: '2.5rem 0' }} />

          <h3 className={styles.blockTitle}>AVL Self-Correction (Rotations)</h3>
          <p className={styles.editorialText}>
            When an imbalance is detected, the tree applies a rotation to restore its structural integrity.
          </p>
          <div className={styles.gridTwoCol} style={{ margin: '2.5rem 0' }}>
            <RotationLL />
            <RotationRR />
            <RotationLR />
            <RotationRL />
          </div>
          <AvlSelfCorrection style={{ margin: '2.5rem 0' }} />
          <p className={styles.editorialText} style={{ marginTop: '2rem' }}>
            There are four primary rotation cases depending on where the imbalance occurs: LL, RR, LR, or RL.
          </p>
          <BespokeAvlRotations style={{ margin: '2.5rem 0' }} />

          <h3 className={styles.blockTitle}>2-3 Trees: Multi-way Search</h3>
          <p className={styles.editorialText}>
            Unlike binary trees, 2-3 trees allow nodes to hold one or two keys, maintaining perfect balance by growing upwards.
          </p>
          <div className={styles.infoCard}>
            <h4>Trace Example</h4>
            <p className={styles.editorialText}>
              Insert the following sequence into an empty 2-3 tree: <b>9, 5, 8, 3, 2, 4, 7</b>.
            </p>
            <TwoThreeTreeDiagram style={{ margin: '1.5rem 0' }} />
          </div>
          <TwoThreeTreeNode style={{ margin: '1.5rem 0' }} />
          <TwoThreeInsertion style={{ margin: '1.5rem 0' }} />

          <AvlTreeTracer style={{ margin: '2.5rem 0' }} />

          <div id="avl-trees-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>AVL Trees Complexity Analysis</h4>
            <p className={styles.editorialText}>The height of an AVL tree with <MathBlock math="n" /> nodes is strictly bounded by <MathBlock math="\\Theta(\\log n)" />. All primary operations (search, insert, delete) traverse from root to leaf, and rotations take <MathBlock math="\\Theta(1)" /> time.</p>
            <MathBlock block math="h \\le 1.44 \\log_2(n + 2) - 1.328 \\implies T(n) \\in \\Theta(\\log n)" />
          </div>
        </section>

        <section id="heapsort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Representation Change: Heapsort</h2>
          <p className={styles.editorialText}>
            A <b>Heap</b> is a complete binary tree where each node satisfies the heap property (Max-Heap: parent ≥ children). We represent this tree using a simple array mapping.
          </p>

          <AlgorithmCard 
            title="Heapsort"
            goal="Sort an array by transforming it into a max-heap and extracting elements."
            steps={[
              "Heap Construction: Build a Max-Heap from the input array using bottom-up sift-down.",
              "Root Extraction: Swap the root (max element) with the last element of the heap.",
              "Size Reduction: Decrease the effective heap size by 1.",
              "Re-heapify: Sift down the new root to restore the Max-Heap property.",
              "Repeat extraction until the heap is empty."
            ]}
            complexity={{ time: "\\Theta(n \\log n)", space: "\\Theta(1)" }}
          />

          <HeapProperties style={{ margin: '2.5rem 0' }} />
          <HeapIntroduction style={{ margin: '2.5rem 0' }} />
          
          <div className={styles.methodBox}>
            <h3>Array Mapping Formulas</h3>
            <p className={styles.editorialText}>
              For a heap stored in an array (1-indexed):
            </p>
            <ul className={styles.editorialList}>
              <li><b>Parent of node <MathBlock math="i" />:</b> <MathBlock math="\\lfloor i/2 \\rfloor" /></li>
              <li><b>Left child of node <MathBlock math="i" />:</b> <MathBlock math="2i" /></li>
              <li><b>Right child of node <MathBlock math="i" />:</b> <MathBlock math="2i + 1" /></li>
            </ul>
          </div>
          
          <HeapArrayMap style={{ margin: '2.5rem 0' }} />

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Algorithm Stages</h4>
              <HeapSortFactory style={{ margin: '1rem 0' }} />
              <ol className={styles.editorialList}>
                <li><b>Stage 1:</b> Transform the array into a Max-Heap.</li>
                <li><b>Stage 2:</b> Repeatedly extract the root and re-heapify.</li>
              </ol>
            </div>
            <div className={styles.infoCard}>
               <h4>Heap Construction</h4>
               <div className={styles.infoCard}>
                 <h5>Top-down Trace</h5>
                 <p className={styles.editorialText}>
                   Construct a heap by inserting: <b>2, 9, 7, 6, 5, 8</b> one by one.
                 </p>
               </div>
               <BottomUpHeapifyTracer style={{ margin: '1rem 0' }} />
               <TopDownHeapTracer style={{ margin: '1rem 0' }} />
            </div>
          </div>

          <h3 className={styles.blockTitle}>The Deletion Cycle</h3>
          <HeapMaxDeletion style={{ margin: '2.5rem 0' }} />
          
          <h3 className={styles.blockTitle}>Performance Timeline</h3>
          <HeapSortTimeline style={{ margin: '2.5rem 0' }} />

          <HeapsortTracer style={{ margin: '2.5rem 0' }} />

          <div id="heapsort-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Heapsort Time Complexity Analysis</h4>
            <p className={styles.editorialText}>Building the heap (bottom-up) takes <MathBlock math="\\Theta(n)" /> time. The extraction phase removes the root <MathBlock math="n-1" /> times, each followed by a sift-down taking at most <MathBlock math="\\Theta(\\log n)" /> time.</p>
            <MathBlock block math="T(n) = T_{\\text{build}}(n) + T_{\\text{extract}}(n) = \\Theta(n) + \\sum_{i=1}^{n-1} \\Theta(\\log i) = \\Theta(n \\log n)" />
          </div>
        </section>

        <section id="horners-rule" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Representation Change: Horner's Rule</h2>
          <p className={styles.editorialText}>
            Evaluating a polynomial of degree <MathBlock math="n" /> can be done more efficiently by changing its representation to a nested form.
          </p>

          <AlgorithmCard 
            title="Horner's Rule"
            goal="Evaluate a polynomial at a given x with minimum multiplications."
            steps={[
              "Start with the coefficient of the highest power, p = a[n].",
              "For i = n-1 down to 0:",
              "Update p = p * x + a[i].",
              "Return the final value of p."
            ]}
            complexity={{ time: "\\Theta(n)", space: "\\Theta(1)" }}
          />

          <MathBlock 
            block 
            math="P(x) = (\\dots((a_n x + a_{n-1})x + a_{n-2})x + \\dots + a_1)x + a_0" 
            caption="Horner's Rule: Reduces multiplications from O(n^2) to exactly n."
            style={{ margin: '2.5rem 0' }}
          />

          <HornersTracer style={{ margin: '2.5rem 0' }} />

          <div id="horners-rule-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Horner's Rule Complexity Analysis</h4>
            <p className={styles.editorialText}>The algorithm iterates from <MathBlock math="n-1" /> down to 0, performing exactly one multiplication and one addition per step.</p>
            <MathBlock block math="T(n) = \\sum_{i=0}^{n-1} 1 = n \\implies \\Theta(n)" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec10;

