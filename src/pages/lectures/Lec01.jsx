import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import PremiumImage from '../../components/ui/Premium/PremiumImage';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';

import GcdRaceTracer from '../../components/visualization/bespoke/GcdRaceTracer';
import SortingSearchingTracer from '../../components/visualization/bespoke/SortingSearchingTracer';
import GraphConverterTracer from '../../components/visualization/bespoke/GraphConverterTracer';
import SieveTracer from '../../components/visualization/bespoke/SieveTracer';
import styles from '../../components/ui/Premium/Premium.module.css';

const Lec01 = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero 
        tag="Lecture 01"
        title="Introduction to Algorithms"
        subtitle="Exploring the fundamental concepts of algorithmic thinking and problem-solving."
        presentationSlides={[
          '/images/lectures/lec01/slide08_img0.png'
        ]}
      />

      <div className={styles.contentWrapper}>
        
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            An <b>algorithm</b> is a sequence of unambiguous instructions for solving a problem, for obtaining a required output for any legitimate input in a finite amount of time. In this course, we will dive deep into the design and analysis of these logical structures that power modern computing.
          </p>

          <PremiumImage 
            src="/images/lectures/lec01/slide08_img0.png" 
            alt="Algorithm Definition Diagram" 
            caption="The basic black-box model of an algorithm: Input → Algorithm → Output."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Course Agenda</h4>
              <ul className={styles.editorialList}>
                <li>The Course Plan & Grading</li>
                <li>What is an Algorithm?</li>
                <li>Important Problem Types</li>
                <li>Fundamental Data Structures</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>Grading Breakdown</h4>
              <ul className={styles.editorialList}>
                <li><b>Week 5/10:</b> Quizzes (5% each)</li>
                <li><b>Week 7:</b> Midterm (20%) + Assignment (5%)</li>
                <li><b>Week 12:</b> Project (15%)</li>
                <li><b>Final:</b> Exam (40%) + Prefinal (10%)</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.infoCard} style={{ marginTop: '2rem' }}>
             <p className={styles.editorialText}>
               <b>Note:</b> Each student who exceeds 20% in course attendance will receive a warning; at 25%, the course will be withdrawn. Every student should attend according to their schedule, and if you are absent, you are responsible for following up on what you missed.
             </p>
          </div>
        </section>

        <section id="what-is-algorithm" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>What Makes a Good Algorithm?</h2>
          <p className={styles.editorialText}>
            A good algorithm must be <b>correct</b> (solving the problem for any legitimate input) and <b>efficient</b> (using resources like time and space optimally). Let's compare two different ways to solve the same problem: finding the <b>Greatest Common Divisor (GCD)</b>.
          </p>
          
          <p className={styles.editorialText}>
            The GCD of 60 and 24 is 12, which is the largest number that both input numbers are divisible by.
          </p>

          <div className={styles.gridTwoCol}>
            <AlgorithmCard 
              title="Euclid's Algorithm"
              goal="Find the Greatest Common Divisor using the property gcd(m, n) = gcd(n, m mod n)."
              steps={[
                "If n = 0, return m as the GCD and stop.",
                "Calculate r = m mod n.",
                "Set m = n and n = r.",
                "Repeat the process from step 1."
              ]}
              complexity={{ time: "O(\\log n)", space: "O(1)" }}
            />
            <AlgorithmCard 
              title="Consecutive Integer Checking"
              goal="Find the GCD by checking all integers from min(m, n) down to 1."
              steps={[
                "Assign the value of min(m, n) to t.",
                "Divide m by t. If the remainder is 0, go to step 3; otherwise, go to step 4.",
                "Divide n by t. If the remainder is 0, return t as the answer; otherwise, go to step 4.",
                "Decrease t by 1 and go back to step 2."
              ]}
              complexity={{ time: "O(\\min(m, n))", space: "O(1)" }}
            />
          </div>

          <GcdRaceTracer style={{ margin: '2.5rem 0' }} />
        </section>

        <section id="problem-solving-flow" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Fundamentals of Algorithmic Problem Solving</h2>
          <p className={styles.editorialText}>
            Designing an algorithm is a structured process. It starts with understanding the problem and ends with verifying the correctness and efficiency of the solution.
          </p>
          
          <PremiumImage 
            src="/images/lectures/lec01/slide07_img0.jpg" 
            alt="Fundamentals of Algorithmic Problem Solving Flowchart" 
            caption="The standard workflow: Understand the problem → Decide on computational means → Design algorithm → Prove correctness → Analyze algorithm → Code it."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.infoCard}>
            <h4>Key Steps in the Process</h4>
            <ul className={styles.editorialList}>
              <li><b>Understanding the Problem:</b> Read the problem description carefully and ask questions if anything is unclear.</li>
              <li><b>Ascertaining Computational Capabilities:</b> Sequential vs. Parallel, Exact vs. Approximate.</li>
              <li><b>Choosing Data Structures:</b> The choice of data structure can significantly impact the algorithm's performance.</li>
              <li><b>Algorithm Design Techniques:</b> Brute force, divide-and-conquer, dynamic programming, etc.</li>
            </ul>
          </div>
        </section>

        <section id="sorting-searching" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Fundamental Problem Types</h2>
          <p className={styles.editorialText}>
             The most common computational tasks involve rearranging data or finding specific information.
          </p>

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>1. Sorting</h4>
              <p className={styles.editorialText}>Rearranging items in nondecreasing order. Essential for efficient search and data organization.</p>
            </div>
            <div className={styles.infoCard}>
              <h4>2. Searching</h4>
              <p className={styles.editorialText}>Finding a specific <b>key</b> within a set. Efficiency depends on whether the data is already sorted.</p>
            </div>
          </div>

          <SortingSearchingTracer style={{ margin: '2.5rem 0' }} />
        </section>

        <section id="data-structures" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Fundamental Data Structures</h2>
          <p className={styles.editorialText}>
            Data structures are ways of organizing and storing data so that they can be accessed and modified efficiently.
          </p>

          <PremiumImage 
            src="/images/lectures/lec01/slide46_img0.jpg" 
            alt="Fundamental Data Structures Overview" 
            caption="Overview of common data structures: Linear (Arrays, Lists, Stacks, Queues), Graphs, and Trees."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>Linear Data Structures</h4>
              <ul className={styles.editorialList}>
                <li><b>Arrays:</b> Fixed-size, contiguous memory.</li>
                <li><b>Linked Lists:</b> Dynamic size, non-contiguous memory.</li>
                <li><b>Stacks:</b> LIFO (Last-In, First-Out) - Push/Pop operations.</li>
                <li><b>Queues:</b> FIFO (First-In, First-Out) - Enqueue/Dequeue operations.</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>Non-Linear Data Structures</h4>
              <ul className={styles.editorialList}>
                <li><b>Graphs:</b> Vertices and Edges. Can be weighted or unweighted.</li>
                <li><b>Trees:</b> Rooted, hierarchical structures. Height is the length of the longest path from root to leaf.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="graph-data" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Graph Representations</h2>
          <p className={styles.editorialText}>
            Graphs are versatile data structures consisting of <b>vertices</b> and <b>edges</b>. They can be directed or undirected and are represented in code primarily via matrices or lists.
          </p>
          <GraphConverterTracer style={{ margin: '2.5rem 0' }} />
        </section>

        <section id="sieve" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Case Study: Sieve of Eratosthenes</h2>
          <p className={styles.editorialText}>
            A classic algorithm for finding all prime numbers up to a given limit <MathBlock math="n" />. It works by iteratively marking the multiples of each prime number as composite.
          </p>
          
          <AlgorithmCard 
            title="Sieve of Eratosthenes"
            goal="Identify all prime numbers up to a specified integer n."
            steps={[
              "Create a list of consecutive integers from 2 to n.",
              "Initialize p = 2 (the first prime number).",
              "Mark all multiples of p (2p, 3p, ...) that are greater than or equal to p² as composite.",
              "Find the first number greater than p in the list that is not marked. If no such number exists, stop.",
              "Set p to this new number and repeat from step 3."
            ]}
            complexity={{ time: "O(n \\log \\log n)", space: "O(n)" }}
          />

          <SieveTracer style={{ margin: '2.5rem 0' }} />
        </section>

        <section id="problem-types" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>Other Important Problem Types</h2>
          <p className={styles.editorialText}>
            Beyond sorting and searching, algorithms are used to solve a wide variety of complex problems.
          </p>

          <PremiumImage 
            src="/images/lectures/lec01/slide38_img0.jpg" 
            alt="Important Problem Types Overview" 
            caption="A categorization of common algorithmic problems."
            style={{ margin: '2.5rem 0' }}
          />

          <div className={styles.gridTwoCol}>
            <div className={styles.infoCard}>
              <h4>3. String Processing</h4>
              <p>Manipulating text data, from simple reversal to complex pattern matching (like DNA sequence analysis).</p>
            </div>
            <div className={styles.infoCard}>
              <h4>4. Combinatorial Problems</h4>
              <p>Finding objects like permutations or subsets that satisfy specific constraints. Often leads to exponential complexity.</p>
            </div>
            <div className={styles.infoCard}>
              <h4>5. Geometric Problems</h4>
              <p>Dealing with geometric objects like points, lines, and polygons. Examples include the Closest-Pair and Convex-Hull problems.</p>
            </div>
            <div className={styles.infoCard}>
              <h4>6. Numerical Problems</h4>
              <p>Solving problems that involve continuous mathematical functions, such as solving equations or evaluating integrals.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Lec01;

