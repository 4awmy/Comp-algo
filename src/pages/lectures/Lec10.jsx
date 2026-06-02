import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
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
          
          <TransformationPipeline />

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

          <PresortingVisual />

          <div className={styles.methodBox}>
            <h3>Case Study: Element Uniqueness</h3>
            <p className={styles.editorialText}>
              To check if all elements in an array are unique, compare the brute force quadratic approach with the optimized sorted scan.
            </p>
            <div className={styles.gridTwoCol}>
              <UniquenessMatrix />
              <SortScanVisual />
            </div>
            <ul className={styles.editorialList}>
              <li><b>Brute Force:</b> Compare all pairs. <MathBlock math="\Theta(n^2)" /></li>
              <li><b>Presorting:</b> Sort, then scan neighbors. <MathBlock math="\Theta(n \log n) + \Theta(n) = \Theta(n \log n)" /></li>
            </ul>
          </div>
        </section>

        <section id="avl-trees" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Representation Change: Balanced Search Trees</h2>
          <p className={styles.editorialText}>
            A standard Binary Search Tree (BST) can become skewed, leading to linear <MathBlock math="\Theta(n)" /> performance. Balanced trees like <b>AVL Trees</b> and <b>2-3 Trees</b> ensure the height remains logarithmic.
          </p>

          <BstBalanceScale />

          <div className={styles.gridTwoCol}>
             <div className={styles.infoCard}>
                <h4>The Balance Factor (BF)</h4>
                <MathBlock math="BF = h_L - h_R \in \{-1, 0, 1\}" />
                <p className={styles.editorialText}>If $|BF| {'>'} 1$, the tree is imbalanced. We monitor this like a traffic light.</p>
                <AvlBalanceMeter />
             </div>
             <div className={styles.infoCard}>
                <h4>Search/Insert/Delete</h4>
                <MathBlock math="\Theta(\log n)" />
                <p className={styles.editorialText}>Guaranteed logarithmic time even in the worst case.</p>
                <BstComparisonTable />
             </div>
          </div>

          <h3 className={styles.blockTitle}>AVL Insertion & Growth</h3>
          <BstGrowthTracer />

          <h3 className={styles.blockTitle}>AVL Self-Correction (Rotations)</h3>
          <p className={styles.editorialText}>
            When an imbalance is detected, the tree applies a rotation to restore its structural integrity.
          </p>
          <AvlSelfCorrection />
          <p className={styles.editorialText} style={{ marginTop: '2rem' }}>
            There are four primary rotation cases depending on where the imbalance occurs: LL, RR, LR, or RL.
          </p>
          <BespokeAvlRotations />

          <h3 className={styles.blockTitle}>2-3 Trees: Multi-way Search</h3>
          <p className={styles.editorialText}>
            Unlike binary trees, 2-3 trees allow nodes to hold one or two keys, maintaining perfect balance by growing upwards.
          </p>
          <TwoThreeTreeNode />
          <TwoThreeInsertion />

          <AvlTreeTracer />
        </section>

        <section id="heapsort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Representation Change: Heapsort</h2>
          <p className={styles.editorialText}>
            A <b>Heap</b> is a complete binary tree where each node satisfies the heap property (Max-Heap: parent ≥ children). We represent this tree using a simple array mapping.
          </p>

          <HeapProperties />
          <HeapIntroduction />
          <HeapArrayMap />

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Algorithm Stages</h4>
              <HeapSortFactory />
              <ol className={styles.editorialList}>
                <li><b>Stage 1:</b> Transform the array into a Max-Heap.</li>
                <li><b>Stage 2:</b> Repeatedly extract the root and re-heapify.</li>
              </ol>
            </div>
            <div className={styles.infoCard}>
               <h4>Heap Construction</h4>
               <BottomUpHeapifyTracer />
               <TopDownHeapTracer />
            </div>
          </div>

          <h3 className={styles.blockTitle}>The Deletion Cycle</h3>
          <HeapMaxDeletion />
          
          <h3 className={styles.blockTitle}>Performance Timeline</h3>
          <HeapSortTimeline />

          <HeapsortTracer />
        </section>

        <section id="horners-rule" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Representation Change: Horner's Rule</h2>
          <p className={styles.editorialText}>
            Evaluating a polynomial of degree <MathBlock math="n" /> can be done more efficiently by changing its representation to a nested form.
          </p>

          <MathBlock 
            block 
            math="P(x) = (\dots((a_n x + a_{n-1})x + a_{n-2})x + \dots + a_1)x + a_0" 
            caption="Horner's Rule: Reduces multiplications from O(n^2) to exactly n."
          />

          <HornersTracer />
        </section>
      </div>
    </div>
  );
};

export default Lec10;
