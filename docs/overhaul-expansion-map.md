# Content Expansion Map: Premium Lecture Overhaul

This document serves as a detailed implementer's guide to achieve **100% technical parity** between the source PPTX/JSON materials and the interactive textbook pages.

## General Standards
- **Narrative Flow**: Every algorithm must be introduced with a "Why" before the "How".
- **Math**: Use `<MathBlock />` for all formulas. No plain text math.
- **Visuals**: Integrate static images from `public/images/lectures/` where they provide unique diagrams not covered by tracers.
- **Tracers**: Prefer bespoke tracers over static images for algorithm steps.

---

## Lecture 01: Introduction
- **Missing Narrative Topics**:
  - Slide 37: "Fundamentals of Algorithmic Problem Solving" (The design/analysis flowchart).
  - Slide 44: "Geometric problems" (Closest pair, Convex-hull definitions).
  - Slide 45: "Numerical problems" (Solving equations, continuous math).
  - Slide 48: "Linear Data Structures" (Arrays, Linked list, Stack, Queue - LIFO/FIFO details).
  - Slide 51: "Weighted Graphs" (Weights/costs definition).
  - Slide 52: "Tree" (Rooted tree, height, ordered tree definitions).
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec01/slide08_img0.png`: Algorithm definition diagram.
  - `public/images/lectures/lec01/slide07_img0.jpg`: Fundamentals of algorithms flowchart.
  - `public/images/lectures/lec01/slide38_img0.jpg`: Important problem types overview.
  - `public/images/lectures/lec01/slide46_img0.jpg`: Fundamental Data Structures overview.
- **Bespoke Tracer Suggestions**:
  - **Combinatorial Generator**: A small interactive permutation generator for "A, B, C" (Slide 43).
  - **Data Structure Playground**: Animated Stack (Push/Pop) and Queue (Enqueue/Dequeue) (Slide 48).
  - **Tree Height Visualizer**: A simple tree where users can see "Height" calculation (Slide 52).
- **Structural Update**:
  - Add "Fundamentals of Algorithmic Problem Solving" section after "What Makes a Good Algorithm?".
  - Expand "Other Important Problem Types" to include Geometric and Numerical problems.
  - Add a new section "Fundamental Data Structures" before "Graph Representations" to cover Linear structures, Trees, and Weighted Graphs.

---

## Lecture 02: Analysis Fundamentals
- **Missing Narrative Topics**:
  - Slide 6: "Measuring an input’s size" (Specific examples: Matrix multiplication, Binary addition, Graph vertices/edges).
  - Slide 9: "Basic operation" hierarchy (Division/Mod > Mult > Add/Sub > Comparison).
  - Slide 17: "Best, Average, Worst Case" (Searching algorithm specific example).
  - Slide 31: "Asymptotic Comparison" (True/False logic for $n^2 \in O(n^3)$ etc.).
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec02/slide16_img0.png`: Order of growth comparison table.
  - `public/images/lectures/lec02/slide27_img0.png`: Big Omega formal definition graph.
  - `public/images/lectures/lec02/slide03_img0.jpg`: The Analysis Framework diagram.
- **Bespoke Tracer Suggestions**:
  - **Code to Complexity Converter**: Interactive tool showing how adding lines inside loops changes the operation count (Slide 10-13).
  - **Asymptotic Quiz**: Interactive "True/False" game for asymptotic relations (Slide 31).
- **Structural Update**:
  - Add "Measuring Input Size" subsection under "The Analysis Framework".
  - Add "Operation Hierarchy" subsection under "Counting Basic Operations".
  - Add "Asymptotic Comparison Quiz" at the end of the Asymptotic Notation section.

---

## Lecture 03: Complexity Analysis
- **Missing Narrative Topics**:
  - Slide 4: Non-recursive Analysis (Specific First/Last/Size calculations for loop ranges).
  - Slide 6: Recursive stopping condition details (e.g., $F(0)=0$).
  - Slide 25: "Why use Empirical Analysis" (Hidden constants, proving math, difficult math cases).
  - Slide 26: "Perform empirical analysis" (The 6-step workflow).
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec03/slide28_img0.png`: Empirical Analysis Example (Table/Graph).
  - `public/images/lectures/lec03/slide03_img0.jpg`: Non-recursive analysis diagram.
  - `public/images/lectures/lec03/slide05_img0.jpg`: Recursive analysis diagram.
- **Bespoke Tracer Suggestions**:
  - **Recurrence Pattern Builder**: Interactive tool where users "expand" a recurrence step-by-step to see the pattern emerge (Slide 8-10).
  - **Empirical Experiment Simulator**: Dashboard where users "run" an algorithm with different $n$ and see a live-plotted graph (Slide 26).
- **Structural Update**:
  - Add "The Empirical Workflow" section with the 6 steps from Slide 26.
  - Expand "Recursive Analysis" to include the specific base case and multiplication count logic from Slide 6.

---

## Lecture 04: Brute Force
- **Missing Narrative Topics**:
  - Slide 6: Specific examples (Password cracking, Linear search, TSP).
  - Slide 78-85: Sequential Search with Sentinel (The "append key to end" optimization).
  - Slide 87-111: Brute Force String Match (Specific trace example: T='better', P='er').
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec04/slide03_img0.jpg`: Introduction diagram.
  - `public/images/lectures/lec04/slide08_img0.jpg`: Selection and Bubble sort overview.
  - `public/images/lectures/lec04/slide77_img0.jpg`: Sequential search and String matching overview.
- **Bespoke Tracer Suggestions**:
  - **Sentinel Search Tracer**: Interactive tracer showing the "Sentinel" trick where the key is added to the end (Slide 78).
  - **String Match Trace**: Step-by-step trace of "better" vs "er" as shown in the slides (Slide 87).
- **Structural Update**:
  - Add "Sequential Search with Sentinel" section after Bubble Sort.
  - Expand "Brute-force String Matching" to include the "better/er" trace example.

---

## Lecture 05: Brute Force II
- **Missing Narrative Topics**:
  - Slide 31: "NP-problems" definition (NP-hard, polynomial-time algorithm definition).
  - Slide 32: Specific scale examples (20 agents/tasks = 2 quintillion possibilities).
  - Slide 30: Assignment Problem specific cost calculation example.
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec05/slide03_img0.jpg`: Closest-pair problem diagram.
  - `public/images/lectures/lec05/slide26_img0.jpg`: Exhaustive search diagram.
- **Bespoke Tracer Suggestions**:
  - **Assignment Cost Calculator**: Interactive table where users assign agents to tasks and see the total cost update (Slide 30).
  - **The "Quintillion" Visualizer**: Animation showing how fast $n!$ grows compared to $n^2$ or $n^3$ (Slide 32).
- **Structural Update**:
  - Add "The NP-Hard Wall" section after the Assignment Problem.
  - Expand "The Assignment Problem" with the specific numerical example from Slide 30.

---

## Lecture 06: Decrease & Conquer
- **Missing Narrative Topics**:
  - Slide 15: Euclid’s algorithm as a specific example of Variable-size-decrease.
  - Slide 55: "Brute force vs Decrease and Conquer" comparison (Selection Sort vs Insertion Sort).
  - Slide 60: Directed Acyclic Graph (DAG) formal definition/properties.
  - Slide 62: DFS-based Topological Sort details (Back edges, dead-ends).
  - Slide 65: Source removal algorithm specific steps (Indegrees, Sources, Process/Remove, Update/Repeat).
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec06/slide03_img0.jpg`: DFS and BFS overview.
  - `public/images/lectures/lec06/slide08_img0.png`: BFS diagram.
  - `public/images/lectures/lec06/slide11_img0.jpg`: Decrease and Conquer overview.
  - `public/images/lectures/lec06/slide16_img0.jpg`: Insertion sort diagram.
  - `public/images/lectures/lec06/slide58_img0.jpg`: Topological Sorting overview.
- **Bespoke Tracer Suggestions**:
  - **Euclid's GCD Visualizer**: Interactive visualization of the variable-size decrease in GCD (Slide 15).
  - **Source Removal Step-by-Step**: Interactive tracer where users manually "remove" sources and see indegrees update (Slide 65).
- **Structural Update**:
  - Add "The Brute Force vs. Decrease & Conquer Mindset" section comparing Selection and Insertion sort.
  - Expand "Topological Sorting" to include the detailed steps for Source Removal.

---

## Lecture 07: Decrease & Conquer II
- **Missing Narrative Topics**:
  - Slide 4: Minimal-change Requirement (Specific swap logic: left to right or right to left).
  - Slide 10: Binary Representation for Subsets (Replacing 1s with elements).
  - Slide 17: Russian Peasant Multiplication specific formulas ($n \cdot m = n/2 \cdot 2m$ for even, $n \cdot m = (n-1)/2 \cdot 2m + m$ for odd).
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec07/slide05_img0.png`: Johnson Trotter trace.
  - `public/images/lectures/lec07/slide10_img0.png`: Binary Representation table.
  - `public/images/lectures/lec07/slide16_img0.jpg`: Russian peasant Multiplication overview.
- **Bespoke Tracer Suggestions**:
  - **Binary Subset Generator**: Interactive table showing binary numbers and their corresponding subsets (Slide 10).
  - **Russian Peasant Step-by-Step**: Tracer that shows the halving/doubling table and highlights which rows are added (Slide 17).
- **Structural Update**:
  - Add "The Binary Connection" section to link Subset generation, Russian Peasant, and Josephus problem through binary logic.
  - Expand "Russian Peasant Multiplication" with the specific even/odd formulas.

---

## Lecture 09: Divide & Conquer
- **Missing Narrative Topics**:
  - Slide 7-20: Merge Sort detailed trace (Specific example: [38, 27, 43, 3, 9]).
  - Slide 73: Merge Sort time analysis details ($T(n) = n + n \log n$).
  - Slide 75: Quick Sort trace prompt (Trace [38, 27, 43, 3, 9]).
  - Slide 79: Binary Tree Traversal applications (Compilers/parse trees, filing systems).
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec09/slide05_img0.jpg`: Merge sort diagram.
  - `public/images/lectures/lec09/slide74_img0.jpg`: Quick Sort diagram.
  - `public/images/lectures/lec09/slide78_img0.jpg`: Binary Tree Traversal diagram.
- **Bespoke Tracer Suggestions**:
  - **Merge Sort Step-by-Step**: Tracer that follows the exact recursive calls (B1, C1, B2, C2, etc.) as described in the slides (Slide 7-20).
  - **Quick Sort Pivot Selector**: Interactive tool where users pick different pivots and see how it affects partitioning (Slide 75).
- **Structural Update**:
  - Add "The Recursive Stack Trace" section for Merge Sort to show the B1/C1/B2/C2 logic.
  - Expand "Binary Tree Traversal" with the specific real-world applications from Slide 79.

---

## Lecture 10: Transform & Conquer
- **Missing Narrative Topics**:
  - Slide 10: "Why use tree not just arrays or linked lists?" (Detailed comparison).
  - Slide 18-19: AVL Example trace (5, 6, 8, 3, 2, 4, 7).
  - Slide 24: 2-3 tree Example trace (9, 5, 8, 3, 2, 4, 7).
  - Slide 30: Heap array mapping formulas (Parental node keys in first [n/2], children at 2i and 2i+1).
  - Slide 35: Top-down heap construction trace (2, 9, 7, 6, 5, 8).
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec10/slide05_img0.jpg`: Presorting diagram.
  - `public/images/lectures/lec10/slide09_img0.jpg`: Balanced BST diagram.
  - `public/images/lectures/lec10/slide15_img0.png` to `slide17_img0.png`: AVL rotation diagrams.
  - `public/images/lectures/lec10/slide24_img0.png`: 2-3 tree example.
- **Bespoke Tracer Suggestions**:
  - **AVL Construction Tracer**: Tracer that follows the exact insertion sequence (5, 6, 8, 3, 2, 4, 7) and shows rotations (Slide 18).
  - **2-3 Tree Construction Tracer**: Tracer for the sequence (9, 5, 8, 3, 2, 4, 7) (Slide 24).
- **Structural Update**:
  - Add "Why Trees?" section comparing Arrays, Linked Lists, and BSTs.
  - Expand "AVL Trees" and "2-3 Trees" with the specific trace examples from the slides.

---

## Lecture 11: Space & Time Trade-offs
- **Missing Narrative Topics**:
  - Slide 10: Specific Shift Table examples (B A R B E R).
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec11/slide10_img0.png`: Horspool shift table diagram.
  - `public/images/lectures/lec11/slide11_img0.png`: Horspool search trace.
- **Bespoke Tracer Suggestions**:
  - **Shift Table Generator**: Interactive tool where users enter a pattern and see the Horspool shift table generated (Slide 10).
- **Structural Update**:
  - Expand "Horspool's Algorithm" with the specific "BARBER" example.

---

## Lecture 13: Dynamic Programming & Greedy
- **Missing Narrative Topics**:
  - Slide 6-8: Coin-Row problem (Specific trace: 5, 1, 2, 10, 6, 2).
  - Slide 13-16: Warshall’s Algorithm (Transitive closure steps).
  - Slide 17-18: Floyd’s Algorithm (All-pairs shortest paths steps).
  - Slide 20-21: Greedy Heuristic components (Candidate Set, Selection Function, Feasibility Function).
  - Slide 23: Minimum Spanning Tree definition.
  - Slide 36: Huffman’s Algorithm compression ratio calculation (25% for the toy example).
- **Visual Assets to Integrate**:
  - `public/images/lectures/lec13/slide06_img0.png`: Coin-row problem diagram.
  - `public/images/lectures/lec13/slide08_img0.png`: Coin-row trace table.
  - `public/images/lectures/lec13/slide13_img0.png` to `slide16_img0.png`: Warshall's matrix steps.
  - `public/images/lectures/lec13/slide17_img0.png` to `slide18_img0.png`: Floyd's matrix steps.
- **Bespoke Tracer Suggestions**:
  - **Coin-Row DP Tracer**: Interactive table showing how DP values are built for (5, 1, 2, 10, 6, 2) (Slide 8).
  - **Warshall/Floyd Matrix Tracer**: Step-by-step matrix transformation for transitive closure and shortest paths (Slide 13-18).
  - **Huffman Machine**: Tool where users encode/decode strings like "DAD" using the generated tree (Slide 36).
- **Structural Update**:
  - Add "The Coin-Row Problem" section under Dynamic Programming.
  - Add "Graph Algorithms: Warshall & Floyd" section.
  - Add "Greedy Heuristics" section explaining the three functions (Candidate, Selection, Feasibility).
  - Expand "Huffman Coding" with the compression ratio example.
