import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';

import FakeCoinTracer from '../../components/visualization/bespoke/FakeCoinTracer';
import JosephusTracer from '../../components/visualization/bespoke/JosephusTracer';
import { 
  JohnsonTrotterTracer,
  LexicographicTracer,
  BottomUpSubsetTracer,
  GrayCodeTracer,
  BinarySearchRace, 
  RussianPeasantTracer, 
  JosephusCircle 
} from '../../components/visualization/bespoke/DecreaseConquerIIConcepts';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec07 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 07"
        title="Decrease & Conquer II"
        subtitle="Exploring decrease-by-a-constant-factor and variable-size-decrease variations through complex combinatorial problems."
      />

      <div className={styles.contentWrapper}>
        
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            In this second deep-dive into <b>decrease-and-conquer</b>, we shift our focus from simple decrease-by-one patterns to more sophisticated reductions. We explore algorithms where the instance size is reduced by a <b>constant factor</b> or even by a <b>variable amount</b> depending on the state of the problem.
          </p>
          
          <div className={styles.infoCard}>
            <h4>Core Algorithms Covered</h4>
            <ul className={styles.editorialList}>
              <li><b>Combinatorial Generation:</b> Johnson-Trotter and Binary-Reflected Gray Code.</li>
              <li><b>Decrease-by-a-Constant-Factor:</b> Fake Coin Problem ($n/3$ strategy) and Russian Peasant Multiplication.</li>
              <li><b>The Josephus Problem:</b> A classic case of circular elimination with a surprising binary solution.</li>
            </ul>
          </div>
        </section>

        <section id="permutations" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Generating Permutations</h2>
          <p className={styles.editorialText}>
            Generating permutations is a fundamental task in combinatorial computing. The <b>minimal-change</b> requirement ensures that each new permutation is created by swapping exactly two adjacent elements.
          </p>

          <AlgorithmCard 
            title="Johnson-Trotter Algorithm"
            goal="Generate all n! permutations such that each differs from the previous by one adjacent swap."
            steps={[
              "Initialize the first permutation (1, 2, ..., n) with all elements pointing left.",
              "Find the largest 'mobile' element (points to a smaller adjacent element).",
              "Swap the mobile element with the element it points to.",
              "Reverse the direction of all elements larger than the swapped mobile element.",
              "Repeat until no mobile elements remain."
            ]}
            complexity={{ time: "O(n!)", space: "O(n)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec07/slide05_img0.png" 
            alt="Johnson Trotter Trace" 
            caption="A step-by-step trace of the Johnson-Trotter algorithm for n=3."
            style={{ margin: '2.5rem 0' }}
          />

          <JohnsonTrotterTracer style={{ margin: '2.5rem 0' }} />

          <div id="permutations-complexity" className={styles.infoCard}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              The Johnson-Trotter algorithm generates each permutation by a single swap of adjacent elements.
            </p>
            <MathBlock math="T(n) = n! \\text{ swaps}" block />
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Time Complexity</span>
                <MathBlock math="\\Theta(n!)" />
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Space Complexity</span>
                <MathBlock math="\\Theta(n)" />
              </div>
            </div>
          </div>

          <div className={styles.gridTwoCol}>
            <div className={styles.methodBox}>
              <h3>Minimal-Change Property</h3>
              <p>Each permutation differs from its predecessor by a single swap of adjacent elements. The Johnson-Trotter algorithm is the most famous implementation of this property.</p>
            </div>
            <div className={styles.methodBox}>
              <h3>Lexicographic Generation</h3>
              <p>Dictionary order generation. While logical, it often requires multiple swaps to move from one permutation to the next.</p>
              <LexicographicTracer style={{ margin: '2.5rem 0' }} />
            </div>
          </div>
        </section>

        <section id="subsets" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. Generating Subsets</h2>
          <p className={styles.editorialText}>
            The bottom-up approach generates subsets of size $n$ by taking all subsets of size $n-1$ and duplicating them, adding the new $n$-th element to each duplicate.
          </p>

          <AlgorithmCard 
            title="Binary Reflected Gray Code"
            goal="Generate all 2^n subsets such that each differs from the previous by exactly one element."
            steps={[
              "Generate Gray code G(n-1) for n-1 bits.",
              "Prefix each string in G(n-1) with 0.",
              "Prefix each string in the reverse of G(n-1) with 1.",
              "Concatenate the two lists to get G(n).",
              "Each bit string corresponds to a subset of the n-element set."
            ]}
            complexity={{ time: "O(2^n)", space: "O(2^n)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec07/slide10_img0.png" 
            alt="Binary Representation for Subsets" 
            caption="Mapping binary strings to subsets: a 1 at position i means the i-th element is included."
            style={{ margin: '2.5rem 0' }}
          />

          <BottomUpSubsetTracer style={{ margin: '2.5rem 0' }} />

          <div id="subsets-complexity" className={styles.infoCard}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              The Binary Reflected Gray Code generates all possible subsets of an n-element set.
            </p>
            <MathBlock math="T(n) = 2^n \\text{ strings}" block />
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Time Complexity</span>
                <MathBlock math="\\Theta(2^n)" />
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Space Complexity</span>
                <MathBlock math="\\Theta(2^n)" />
              </div>
            </div>
          </div>
        </section>

        <section id="binary-search" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Binary Search</h2>
          <p className={styles.editorialText}>
            Binary Search is the ultimate example of <b>decrease-by-a-constant-factor</b> ($n/2$). By comparing the target with the middle element, we can discard half of the remaining array in each step.
          </p>

          <AlgorithmCard 
            title="Binary Search"
            goal="Efficiently find a target value in a sorted array."
            steps={[
              "Compare the target value with the middle element of the array.",
              "If target equals middle, the search is successful.",
              "If target is smaller, repeat the search on the left half of the array.",
              "If target is larger, repeat the search on the right half of the array.",
              "Continue until the value is found or the range is empty."
            ]}
            complexity={{ time: "O(\\log n)", space: "O(1)" }}
          />

          <BinarySearchRace style={{ margin: '2.5rem 0' }} />

          <div id="binary-search-complexity" className={styles.infoCard}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              Binary search reduces the problem size by half in each step, leading to a logarithmic recurrence.
            </p>
            <MathBlock math="T(n) = T(n/2) + 1" block />
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Time Complexity</span>
                <MathBlock math="\\Theta(\\log_2 n)" />
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Space Complexity</span>
                <MathBlock math="\\Theta(1)" />
              </div>
            </div>
          </div>
        </section>

        <section id="fake-coin" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. The Fake Coin Problem</h2>
          <p className={styles.editorialText}>
            Given $n$ coins where one is lighter, identifying it using a balance scale. Dividing into <b>three groups</b> ($n/3$) is more efficient than binary splitting.
          </p>

          <AlgorithmCard 
            title="Fake Coin Problem (n/3)"
            goal="Identify a lighter fake coin in the minimum number of weighings."
            steps={[
              "Divide the coins into three nearly equal groups: A, B, and C.",
              "Weigh group A against group B on a balance scale.",
              "If A is lighter, the fake coin is in A. If B is lighter, it's in B. If they balance, it's in C.",
              "Repeat the process for the identified group until only one coin remains."
            ]}
            complexity={{ time: "O(\\log_3 n)", space: "O(1)" }}
          />

          <FakeCoinTracer style={{ margin: '2.5rem 0' }} />

          <div id="fake-coin-complexity" className={styles.infoCard}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              By dividing into three groups, we reduce the problem size by a factor of 3 in each weighing.
            </p>
            <MathBlock math="T(n) = T(n/3) + 1" block />
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Time Complexity</span>
                <MathBlock math="\\Theta(\\log_3 n)" />
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Space Complexity</span>
                <MathBlock math="\\Theta(1)" />
              </div>
            </div>
          </div>
        </section>

        <section id="russian-peasant" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>5. Russian Peasant Multiplication</h2>
          <p className={styles.editorialText}>
            An ancient method for multiplying two integers $n$ and $m$ using only halving, doubling, and addition.
          </p>

          <AlgorithmCard 
            title="Russian Peasant Multiplication"
            goal="Multiply two integers using halving, doubling, and addition."
            steps={[
              "Place the two numbers n and m in two columns.",
              "Repeatedly halve n (dropping remainders) and double m until n becomes 1.",
              "Identify all rows where n is an odd number.",
              "Sum the corresponding values of m from those rows to get the product."
            ]}
            complexity={{ time: "O(\\log n)", space: "O(1)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec07/slide16_img0.jpg" 
            alt="Russian Peasant Multiplication Overview" 
            caption="The halving and doubling process used to multiply integers."
            style={{ margin: '2.5rem 0' }}
          />

          <RussianPeasantTracer style={{ margin: '2.5rem 0' }} />

          <div id="russian-peasant-complexity" className={styles.infoCard}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              The number of halving steps determines the complexity, which is proportional to the number of bits in n.
            </p>
            <MathBlock math="T(n) = T(n/2) + 1 \\text{ additions}" block />
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Time Complexity</span>
                <MathBlock math="\\Theta(\\log_2 n)" />
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Space Complexity</span>
                <MathBlock math="\\Theta(1)" />
              </div>
            </div>
          </div>
        </section>

        <section id="josephus" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>6. The Josephus Problem</h2>
          <p className={styles.editorialText}>
            Eliminating every second person in a circle until one remains. The solution has a beautiful property linked to binary representation.
          </p>

          <AlgorithmCard 
            title="Josephus Problem"
            goal="Find the last remaining position in a circular elimination process."
            steps={[
              "Represent the number of people n in binary.",
              "Perform a cyclic left shift by one bit (move the leading 1 to the end).",
              "The resulting binary string is the winning position.",
              "Formulaicly, if n = 2^m + l, the winner is 2l + 1."
            ]}
            complexity={{ time: "O(\\log n)", space: "O(1)" }}
          />

          <JosephusCircle style={{ margin: '2.5rem 0' }} />

          <div id="josephus-complexity" className={styles.infoCard}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              The winning position can be found using the binary representation of n.
            </p>
            <MathBlock math="J(n) = 2l + 1" block />
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Time Complexity</span>
                <MathBlock math="\\Theta(\\log n)" />
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Space Complexity</span>
                <MathBlock math="\\Theta(1)" />
              </div>
            </div>
          </div>

          <div className={styles.gridTwoCol}>
            <div className={styles.comparisonCard}>
               <h3>Interactive Tracer</h3>
               <p className={styles.editorialText}>Explore the exact step-by-step elimination sequence for any n in the simulator below.</p>
               <JosephusTracer style={{ margin: '2.5rem 0' }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec07;

