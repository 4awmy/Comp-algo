import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';

import SelectionSortTracer from '../../components/visualization/bespoke/SelectionSortTracer';
import BubbleSortTracer from '../../components/visualization/bespoke/BubbleSortTracer';
import StringMatchTracer from '../../components/visualization/bespoke/StringMatchTracer';
import AssignmentTracer from '../../components/visualization/bespoke/AssignmentTracer';
import { PillarsInfographic, MindsetVisual, SweetSpotMatrix } from '../../components/visualization/bespoke/BruteForceConcepts';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec04 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 04"
        title="Brute Force Algorithms"
        subtitle="Exploring the straightforward approach: direct, exhaustive, and often surprisingly effective."
      />

      <div className={styles.contentWrapper}>
        
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            <b>Brute force</b> is a straightforward approach to solving a problem, usually directly based on the problem statement and definitions of the concepts involved. It is the "just do it" philosophy of algorithm design—ignoring cleverness in favor of a guaranteed, albeit often slow, result.
          </p>

          <PremiumImage 
            src="/images/lectures/lec04/slide03_img0.jpg" 
            alt="Brute Force Introduction Diagram" 
            caption="The direct mapping from problem definition to algorithmic solution."
            style={{ margin: '2.5rem 0' }}
          />

          <PillarsInfographic style={{ margin: '2.5rem 0' }} />

          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>Classic Examples</h4>
            <ul className={styles.editorialList}>
              <li><b>Password Cracking:</b> Trying every possible combination of characters.</li>
              <li><b>Linear Search:</b> Checking every element in a list until the target is found.</li>
              <li><b>Traveling Salesman Problem (TSP):</b> Calculating the total distance for every possible route.</li>
            </ul>
          </div>

          <div id="max-element-complexity" className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>Complexity Analysis: Max Element</h4>
            <p className={styles.editorialText}>
              To find the maximum element in an array of size <MathBlock math="n" />, we must examine every element exactly once.
            </p>
            <MathBlock math="C(n) = n - 1 = \Theta(n)" block />
          </div>

          <p className={styles.editorialText}>
            The brute-force mindset is applicable to a wide variety of problems. Whether it's cracking a combination lock by trying every possible number or scanning a 2D grid pixel-by-pixel, the principle remains: <i>exhaustive coverage ensures success.</i>
          </p>
          
          <MindsetVisual style={{ margin: '2.5rem 0' }} />
        </section>

        <section className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>When to use Brute Force?</h2>
          <p className={styles.editorialText}>
            While often criticized for its <MathBlock math="\Theta(2^n)" /> or <MathBlock math="\Theta(n!)" /> behavior in combinatorial problems, brute force is not always a bad choice. In fact, there is a specific "Sweet Spot" where it is the superior engineering decision.
          </p>
          
          <SweetSpotMatrix style={{ margin: '2.5rem 0' }} />

          <p className={styles.editorialText}>
            If the input size is small (e.g., <MathBlock math="n < 20" />), even an exponential algorithm will run in milliseconds. In such cases, the simplicity of brute force leads to fewer bugs and faster development time.
          </p>
        </section>

        <section id="selection-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Selection Sort</h2>
          <p className={styles.editorialText}>
            Selection Sort is the quintessential brute-force sorting algorithm. It scans the entire unsorted list to find the minimum element, then "selects" it to be moved to its final sorted position.
          </p>

          <AlgorithmCard 
            title="Selection Sort"
            goal="Sort an array by repeatedly finding the minimum element from the unsorted part."
            steps={[
              "Search the entire array to find the smallest element.",
              "Swap this smallest element with the element at the first position.",
              "Repeat the search for the remaining unsorted part of the array (starting from the second position).",
              "Continue until the entire array is sorted."
            ]}
            complexity={{ time: "\\Theta(n^2)", space: "O(1)" }}
          />

          <SelectionSortTracer style={{ margin: '2.5rem 0' }} />

          <div id="selection-sort-complexity" className={styles.infoCard}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              The number of comparisons <MathBlock math="C(n)" /> is the sum of the work done in each pass:
            </p>
            <MathBlock math="C(n) = \sum_{i=0}^{n-2} \sum_{j=i+1}^{n-1} 1 = \sum_{i=0}^{n-2} (n-1-i) = \frac{n(n-1)}{2} = \Theta(n^2)" block />
            <p className={styles.editorialText}>
              Note that the number of swaps is always <MathBlock math="n-1" />, which is <MathBlock math="\Theta(n)" />.
            </p>
          </div>
        </section>

        <section id="bubble-sort" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Bubble Sort</h2>
          <p className={styles.editorialText}>
            Bubble Sort takes a slightly different brute-force path. Instead of finding the minimum globally, it performs local comparisons between adjacent elements. In each pass, the largest element "bubbles up" to its correct spot at the end.
          </p>

          <AlgorithmCard 
            title="Bubble Sort"
            goal="Sort an array by repeatedly swapping adjacent elements that are out of order."
            steps={[
              "Compare the first two elements. If the first is greater than the second, swap them.",
              "Move to the next pair of adjacent elements and repeat the comparison/swap.",
              "Continue until the end of the array; the largest element is now at its final position.",
              "Repeat the entire process for the unsorted prefix of the array until no more swaps are needed."
            ]}
            complexity={{ time: "\\Theta(n^2)", space: "O(1)" }}
          />

          <BubbleSortTracer style={{ margin: '2.5rem 0' }} />

          <div id="bubble-sort-complexity" className={styles.infoCard}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              The number of comparisons <MathBlock math="C(n)" /> is the same as selection sort in the worst case:
            </p>
            <MathBlock math="C(n) = \sum_{i=0}^{n-2} \sum_{j=0}^{n-2-i} 1 = \frac{n(n-1)}{2} = \Theta(n^2)" block />
          </div>
        </section>

        <section id="sentinel-search" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Sequential Search with Sentinel</h2>
          <p className={styles.editorialText}>
            A clever brute-force optimization for sequential search is the <b>Sentinel</b> technique. By appending the search key to the end of the list, we can eliminate the "end of list" check in each iteration of the loop.
          </p>

          <AlgorithmCard 
            title="Sequential Search (with Sentinel)"
            goal="Find a key in a list by simplifying the loop termination condition."
            steps={[
              "Add the search key to the end of the array as a 'sentinel'.",
              "Start from the first element and compare each element with the key.",
              "Stop as soon as the key is found (the sentinel guarantees this).",
              "Check if the found position is within the original array boundaries.",
              "If it is, the key exists; otherwise, it was not found."
            ]}
            complexity={{ time: "O(n)", space: "O(1)" }}
          />

          <div id="sequential-search-complexity" className={styles.infoCard} style={{ marginTop: '2rem' }}>
            <h4>Complexity Analysis</h4>
            <p className={styles.editorialText}>
              In the worst case (key not in the list), we check every element plus the sentinel:
            </p>
            <MathBlock math="C_{worst}(n) = n + 1 = \Theta(n)" block />
            <p className={styles.editorialText}>
              In the average case, we expect to find the key halfway through:
            </p>
            <MathBlock math="C_{avg}(n) \approx \frac{n}{2} = \Theta(n)" block />
          </div>
        </section>

        <section id="string-matching" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Brute-force String Matching</h2>
          <p className={styles.editorialText}>
            The simplest way to find a pattern in a text is to slide the pattern along the text like a <b>ruler</b>. At each position, we check if the characters match. If a mismatch occurs, we shift the ruler by exactly one position and start over.
          </p>

          <AlgorithmCard 
            title="Brute-force String Matching"
            goal="Find the first occurrence of a pattern in a text string."
            steps={[
              "Align the pattern string against the start of the text string.",
              "Compare the characters of the pattern with the text from left to right.",
              "If all characters match, the search is successful.",
              "If a mismatch occurs, shift the pattern one position to the right and repeat.",
              "Continue until a match is found or the pattern cannot be shifted further."
            ]}
            complexity={{ time: "O(n \\cdot m)", space: "O(1)" }}
          />

          <PremiumImage 
            src="/images/lectures/lec04/slide77_img0.jpg" 
            alt="Sequential Search and String Matching Overview" 
            caption="A visual guide to searching for keys and patterns in linear data."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.infoCard}>
            <h4>Trace Example</h4>
            <p className={styles.editorialText}>
              Consider searching for the pattern <b>P = "er"</b> in the text <b>T = "better"</b>:
            </p>
            <ul className={styles.editorialList}>
              <li><b>Shift 0:</b> "be" vs "er" (Mismatch at 'b')</li>
              <li><b>Shift 1:</b> "et" vs "er" (Mismatch at 't')</li>
              <li><b>Shift 2:</b> "tt" vs "er" (Mismatch at 't')</li>
              <li><b>Shift 3:</b> "te" vs "er" (Mismatch at 't')</li>
              <li><b>Shift 4:</b> "er" vs "er" (<b>Match found!</b>)</li>
            </ul>
          </div>

          <StringMatchTracer style={{ margin: '2.5rem 0' }} />
        </section>

        <section id="assignment" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The Assignment Problem</h2>
          <p className={styles.editorialText}>
            The <b>Assignment Problem</b> is a classic combinatorial problem. Suppose there are <i>n</i> people and <i>n</i> jobs. Each person has a specific cost for each job. The goal is to assign exactly one person to each job such that the <b>total cost</b> is minimized.
          </p>

          <div id="assignment-complexity">
            <AlgorithmCard 
              title="Assignment Problem (Brute Force)"
              goal="Minimize total cost by checking all possible one-to-one assignments."
              steps={[
                "Generate all <i>n!</i> permutations of assigning people to jobs.",
                "Calculate the total cost for each permutation.",
                "Compare costs to find the global minimum.",
                "Return the optimal assignment and the minimum cost."
              ]}
              complexity={{ time: "\\Theta(n!)", space: "O(n)" }}
            />
          </div>

          <div className={styles.infoCard}>
            <h4>Numerical Example: Cost Matrix</h4>
            <p className={styles.editorialText}>
              Consider 4 jobs and 4 people with the following cost matrix. Each cell represents the cost of assigning person <i>i</i> (row) to job <i>j</i> (column).
            </p>
            <div className={styles.tableContainer} style={{ margin: '1.5rem 0' }}>
              <table className={styles.dijkstraTable}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Job 1</th>
                    <th>Job 2</th>
                    <th>Job 3</th>
                    <th>Job 4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.currentVertex}>Person 1</td>
                    <td>9</td>
                    <td className={styles.matrixActive} style={{ background: 'rgba(59, 130, 246, 0.2)' }}>2</td>
                    <td>7</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td className={styles.currentVertex}>Person 2</td>
                    <td>6</td>
                    <td>4</td>
                    <td className={styles.matrixActive} style={{ background: 'rgba(59, 130, 246, 0.2)' }}>3</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <td className={styles.currentVertex}>Person 3</td>
                    <td className={styles.matrixActive} style={{ background: 'rgba(59, 130, 246, 0.2)' }}>5</td>
                    <td>8</td>
                    <td>1</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td className={styles.currentVertex}>Person 4</td>
                    <td>7</td>
                    <td>6</td>
                    <td>9</td>
                    <td className={styles.matrixActive} style={{ background: 'rgba(59, 130, 246, 0.2)' }}>4</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={styles.editorialText} style={{ fontSize: '0.75rem', fontStyle: 'italic', opacity: 0.7 }}>
              Highlighted cells (2, 3, 5, 4) represent one possible valid assignment with total cost 14.
            </p>
          </div>

          <AssignmentTracer style={{ margin: '2.5rem 0' }} />
        </section>

        <section id="summary" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>The Brute Force Legacy</h2>
          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Why it stays relevant</h4>
              <ul className={styles.editorialList}>
                <li><b>Generality:</b> It works for almost any problem.</li>
                <li><b>Correctness:</b> Hard to implement wrong due to simplicity.</li>
                <li><b>Benchmarks:</b> Provides a baseline to measure "clever" algorithms.</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>The Hidden Cost</h4>
              <p className={styles.editorialText}>
                The cost isn't just time; it's the missed opportunity for insight. Brute force ignores the internal structure of a problem that might allow for a much faster logarithmic or linear solution.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec04;

