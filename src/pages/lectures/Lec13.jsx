import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';
import DynamicProgTracer from '../../components/visualization/bespoke/DynamicProgTracer';
import GreedyTracer from '../../components/visualization/bespoke/GreedyTracer';
import { 
  CoinRowMetaphor, 
  GreedyVsDpMetaphor, 
  HuffmanMetaphor,
  DpPuzzleMetaphor,
  CoinRowWeighingScale,
  KnapsackSimulator,
  WarshallScanner,
  FloydOdometer,
  GreedyBuffetMetaphor,
  MstNetwork,
  PrimsSolver,
  KruskalsSolver,
  DijkstraRoadmap,
  HuffmanMachine
} from '../../components/visualization/bespoke/GreedyDpConcepts';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec13 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 13"
        title="Dynamic Programming & Greedy Algorithms"
        subtitle="Mastering optimal decision-making through subproblem reuse and local heuristics."
      />

      <div className={styles.contentWrapper}>
        <section className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Introduction to Optimization</h2>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            Many algorithmic problems require finding an <b>optimal solution</b>—the best possible outcome among many candidates. <b>Dynamic Programming (DP)</b> and <b>Greedy Algorithms</b> are two powerful paradigms for solving such problems.
          </p>
          
          <GreedyVsDpMetaphor />
          <DpPuzzleMetaphor />

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Dynamic Programming</h4>
              <p className={styles.editorialText}>
                Solves complex problems by breaking them into <em>overlapping</em> subproblems. It solves each subproblem once and stores the result (<b>Memoization</b>).
              </p>
            </div>
            <div className={styles.infoCard}>
              <h4>Greedy Algorithms</h4>
              <p className={styles.editorialText}>
                Builds a solution piece-by-piece, making the <b>locally optimal choice</b> at each step.
              </p>
            </div>
          </div>
        </section>

        <section id="dp-intro" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>1. Dynamic Programming: The Coin-Row Problem</h2>
          <p className={styles.editorialText}>
            The <b>Coin-Row Problem</b> asks: given a row of $n$ coins with values $c_i$, pick up the maximum amount of money such that no two picked coins are adjacent.
          </p>

          <AlgorithmCard 
            title="Coin-Row Problem (DP)"
            goal="Pick non-adjacent coins to maximize total value."
            steps={[
              "Identify the recurrence: F(n) = max(c_n + F(n-2), F(n-1)).",
              "Initialize base cases: F(0) = 0, F(1) = c1.",
              "Solve subproblems from i = 2 to n.",
              "Store each result in a DP table (Memoization).",
              "The final answer is stored in F(n)."
            ]}
            complexity={{
              time: "\\Theta(n)",
              space: "\\Theta(n)"
            }}
          />

          <CoinRowMetaphor />
          <PremiumImage 
            src="/images/lectures/lec13/slide06_img0.png" 
            alt="Coin-Row Problem" 
            caption="The goal is to pick non-adjacent coins to maximize total value."
          />
          <CoinRowWeighingScale />

          <div className={styles.methodBox}>
            <h3>Recurrence Relation</h3>
            <MathBlock 
              block 
              math="F(n) = \max(c_n + F(n-2), F(n-1))" 
              caption="Where F(n) is the maximum value for the first n coins. We either pick the nth coin (and skip n-1) or skip the nth coin."
            />
          </div>

          <div className={styles.infoCard}>
            <h4>Trace Example: [5, 1, 2, 10, 6, 2]</h4>
            <p className={styles.editorialText}>
              Following the recurrence, we build the DP table:
            </p>
            <ul className={styles.editorialList}>
              <li>$F(0) = 0$</li>
              <li>$F(1) = 5$</li>
              <li>$F(2) = \max(1+0, 5) = 5$</li>
              <li>$F(3) = \max(2+5, 5) = 7$</li>
              <li>$F(4) = \max(10+5, 7) = 15$</li>
              <li>$F(5) = \max(6+7, 15) = 15$</li>
              <li>$F(6) = \max(2+15, 15) = 17$</li>
            </ul>
            <PremiumImage 
              src="/images/lectures/lec13/slide08_img0.png" 
              alt="Coin-Row DP Table" 
              caption="The step-by-step construction of the DP table for the coin-row problem."
            />
          </div>
        </section>

        <section id="knapsack" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>2. The 0/1 Knapsack Problem</h2>
          <p className={styles.editorialText}>
            Given $n$ items with weights $w_i$ and values $v_i$, and a knapsack of capacity $W$, find the most valuable subset of items that fit.
          </p>

          <AlgorithmCard 
            title="0/1 Knapsack Problem"
            goal="Fill a knapsack of capacity W with items to maximize value."
            steps={[
              "Create a DP table V[0..n, 0..W].",
              "For each item i and capacity j:",
              "If item fits (j >= w_i): V[i, j] = max(exclude, include).",
              "Exclude: V[i-1, j].",
              "Include: v_i + V[i-1, j - w_i].",
              "Else: V[i, j] = V[i-1, j]."
            ]}
            complexity={{
              time: "\\Theta(n W)",
              space: "\\Theta(n W)"
            }}
          />

          <MathBlock 
            block 
            math="V[i, j] = \begin{cases} \max(V[i-1, j], v_i + V[i-1, j - w_i]) & \text{if } j \ge w_i \\ V[i-1, j] & \text{if } j < w_i \end{cases}" 
            caption="The DP choice: Include item i (if it fits) or exclude it."
          />

          <KnapsackSimulator />
          <DynamicProgTracer />
        </section>

        <section id="warshall-floyd" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>3. Warshall's and Floyd's Algorithms</h2>
          <p className={styles.editorialText}>
            These algorithms use DP to solve graph problems using matrix representations.
          </p>

          <AlgorithmCard 
            title="Warshall's Algorithm"
            goal="Compute the transitive closure of a directed graph."
            steps={[
              "Initialize R(0) as the adjacency matrix of the graph.",
              "For k = 1 to n (intermediate vertices):",
              "For i = 1 to n (source vertices):",
              "For j = 1 to n (target vertices):",
              "R(k)[i, j] = R(k-1)[i, j] OR (R(k-1)[i, k] AND R(k-1)[k, j])."
            ]}
            complexity={{
              time: "\\Theta(n^3)",
              space: "\\Theta(n^2)"
            }}
          />

          <AlgorithmCard 
            title="Floyd's Algorithm"
            goal="Find all-pairs shortest paths in a weighted graph."
            steps={[
              "Initialize D(0) with direct edge weights (inf if no edge).",
              "For k = 1 to n (intermediate vertices):",
              "For i = 1 to n (source vertices):",
              "For j = 1 to n (target vertices):",
              "D(k)[i, j] = min(D(k-1)[i, j], D(k-1)[i, k] + D(k-1)[k, j])."
            ]}
            complexity={{
              time: "\\Theta(n^3)",
              space: "\\Theta(n^2)"
            }}
          />

          <div className={styles.gridTwoCol} style={{ marginTop: '2rem' }}>
            <div className={styles.infoCard}>
              <h4>Warshall's (Transitive Closure)</h4>
              <MathBlock math="R^{(k)}[i, j] = R^{(k-1)}[i, j] \lor (R^{(k-1)}[i, k] \land R^{(k-1)}[k, j])" />
              <p className={styles.editorialText}>Determines if there is a path between every pair of vertices.</p>
              <div className={styles.gridTwoCol}>
                <PremiumImage src="/images/lectures/lec13/slide13_img0.png" alt="Warshall Step 1" />
                <PremiumImage src="/images/lectures/lec13/slide14_img0.png" alt="Warshall Step 2" />
              </div>
              <WarshallScanner />
            </div>
            <div className={styles.infoCard}>
              <h4>Floyd's (All-Pairs Shortest Paths)</h4>
              <MathBlock math="D^{(k)}[i, j] = \min(D^{(k-1)}[i, j], D^{(k-1)}[i, k] + D^{(k-1)}[k, j])" />
              <p className={styles.editorialText}>Finds the shortest distance between all pairs.</p>
              <div className={styles.gridTwoCol}>
                <PremiumImage src="/images/lectures/lec13/slide17_img0.png" alt="Floyd Step 1" />
                <PremiumImage src="/images/lectures/lec13/slide18_img0.png" alt="Floyd Step 2" />
              </div>
              <FloydOdometer />
            </div>
          </div>
        </section>

        <section id="greedy-intro" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>4. Greedy Algorithms: MST & Shortest Path</h2>
          <p className={styles.editorialText}>
            Greedy algorithms work when a <b>local optimum</b> leads to a <b>global optimum</b>. This is true for Minimum Spanning Trees (MST) and Single-Source Shortest Paths (Dijkstra).
          </p>

          <div className={styles.methodBox}>
            <h3>Key Properties</h3>
            <ul className={styles.editorialList}>
              <li><b>Greedy Choice Property:</b> A global optimum can be reached by selecting local optimums.</li>
              <li><b>Optimal Substructure:</b> An optimal solution contains optimal solutions to subproblems.</li>
            </ul>
          </div>

          <div className={styles.methodBox}>
            <h3>Greedy Heuristic Components</h3>
            <p className={styles.editorialText}>
              A greedy algorithm is typically composed of:
            </p>
            <ul className={styles.editorialList}>
              <li><b>Candidate Set:</b> A set of elements from which a solution is created.</li>
              <li><b>Selection Function:</b> Chooses the best candidate to be added to the solution.</li>
              <li><b>Feasibility Function:</b> Checks if a candidate can be used to contribute to a solution.</li>
            </ul>
          </div>

          <GreedyBuffetMetaphor />
          <MstNetwork />
          <GreedyTracer />
        </section>

        <section id="prim-kruskal" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>5. Prim's, Kruskal's, and Dijkstra's</h2>
          <div className={styles.infoCard}>
            <h4>Minimum Spanning Tree (MST)</h4>
            <p className={styles.editorialText}>
              A <b>Spanning Tree</b> of a connected graph is a tree that contains all the vertices of the graph. A <b>Minimum Spanning Tree</b> is a spanning tree with the smallest possible sum of edge weights.
            </p>
          </div>
          <div className={styles.gridThreeCol}>
            <div className={styles.comparisonCard}>
              <h3>Prim's</h3>
              <p className={styles.editorialText}>Builds MST by adding the nearest unvisited neighbor to a single growing tree.</p>
              <PrimsSolver />
            </div>
            <div className={styles.comparisonCard}>
              <h3>Kruskal's</h3>
              <p className={styles.editorialText}>Builds MST by adding the smallest edge that doesn't form a cycle, merging forest components.</p>
              <KruskalsSolver />
            </div>
            <div className={styles.comparisonCard}>
              <h3>Dijkstra's</h3>
              <p className={styles.editorialText}>Finds single-source shortest paths by always expanding the node with the shortest known distance.</p>
              <DijkstraRoadmap />
            </div>
          </div>
        </section>

        <section id="huffman" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>6. Huffman Trees & Codes</h2>
          <p className={styles.editorialText}>
            A greedy approach to data compression. It assigns shorter variable-length codes to more frequent symbols by repeatedly merging the lowest-frequency nodes.
          </p>

          <AlgorithmCard 
            title="Huffman's Algorithm"
            goal="Optimal prefix-free variable-length encoding."
            steps={[
              "Calculate frequencies of all symbols in the data.",
              "Create a forest of single-node trees for each symbol.",
              "Repeat until only one tree remains:",
              "Select two trees with the smallest frequencies.",
              "Create a new node with these two as children, frequency = sum.",
              "Label edges (0 for left, 1 for right) to get codes."
            ]}
            complexity={{
              time: "O(n \\log n)",
              space: "\\Theta(n)"
            }}
          />
          
          <div style={{ marginTop: '2rem' }}>
            <HuffmanMetaphor />
            <HuffmanMachine />
          </div>

          <div className={styles.infoCard}>
            <h4>The Result</h4>
            <p className={styles.editorialText}>
              By ensuring frequent symbols are closer to the root, we minimize the average number of bits per character, achieving significant compression ratios.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h4>Compression Ratio Example</h4>
            <p className={styles.editorialText}>
              Consider a toy example where fixed-length encoding uses 3 bits per character. If Huffman coding achieves an average of 2.25 bits per character, the compression ratio is:
            </p>
            <MathBlock block math="\frac{3 - 2.25}{3} = 25\%" />
            <PremiumImage 
              src="/images/lectures/lec13/slide36_img0.png" 
              alt="Huffman Tree Example" 
              caption="A Huffman tree for a specific character frequency distribution."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec13;
