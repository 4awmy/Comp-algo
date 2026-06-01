// ── Quiz questions data store ──────────────────────────────────
// Provides structured multiple-choice questions for all 11 lectures.

export const QUIZZES = {
  '01': [
    {
      id: 1,
      question: "Which of the following is NOT a fundamental property of a valid algorithm?",
      options: [
        "Finiteness (must terminate after finite steps)",
        "Definiteness (each step must be clear and unambiguous)",
        "Input (must have zero or more inputs)",
        "Must be written in a high-level programming language like C++"
      ],
      answer: 3,
      explanation: "An algorithm is language-independent. It can be expressed in natural language, pseudocode, or flowcharts, not necessarily programming languages."
    },
    {
      id: 2,
      question: "Which design method solves a problem by searching all possible candidates for the solution?",
      options: [
        "Brute Force / Exhaustive Search",
        "Divide and Conquer",
        "Decrease and Conquer",
        "Dynamic Programming"
      ],
      answer: 0,
      explanation: "Brute force search systematically enumerates all possible candidates for the solution and checks whether each candidate satisfies the problem's statement."
    }
  ],
  '02': [
    {
      id: 1,
      question: "If f(n) = 3n^2 + 5n log n, which of the following is true?",
      options: [
        "f(n) is O(n log n)",
        "f(n) is O(n^2)",
        "f(n) is Θ(n log n)",
        "f(n) is o(n^2)"
      ],
      answer: 1,
      explanation: "The dominant term as n grows is 3n^2. Therefore, f(n) is Θ(n^2), which also implies f(n) is O(n^2)."
    },
    {
      id: 2,
      question: "The notation Ω(g(n)) represents which type of asymptotic bound?",
      options: [
        "Strict upper bound",
        "Asymptotic tight bound",
        "Asymptotic lower bound",
        "Strict lower bound"
      ],
      answer: 2,
      explanation: "Big-Omega (Ω) notation defines an asymptotic lower bound (i.e. the algorithm takes at least this much time in the best/average cases)."
    }
  ],
  '03': [
    {
      id: 1,
      question: "Under what condition can the Master Theorem be applied to a recurrence relation of the form T(n) = aT(n/b) + f(n)?",
      options: [
        "a >= 1 and b > 1",
        "a > 0 and b > 0",
        "a >= 1 and b >= 1",
        "Only when f(n) is constant"
      ],
      answer: 0,
      explanation: "The recurrence must have a >= 1 (number of subproblems is at least 1) and b > 1 (size of subproblems is strictly decreasing)."
    },
    {
      id: 2,
      question: "What is the time complexity of the recurrence relation T(n) = 2T(n/2) + n?",
      options: [
        "O(n)",
        "O(n log n)",
        "O(n^2)",
        "O(log n)"
      ],
      answer: 1,
      explanation: "By Case 2 of the Master Theorem (a=2, b=2, k=1, log_b(a) = log_2(2) = 1), the time complexity is Θ(n^1 * log n) = Θ(n log n)."
    }
  ],
  '04': [
    {
      id: 1,
      question: "What is the worst-case number of comparisons performed by Selection Sort on an array of size n?",
      options: [
        "n - 1",
        "n log n",
        "n(n - 1) / 2",
        "n^2 / 4"
      ],
      answer: 2,
      explanation: "Selection sort compares every element with the remaining elements. The total comparisons is (n-1) + (n-2) + ... + 1 = n(n-1)/2, which is Θ(n^2) in all cases."
    },
    {
      id: 2,
      question: "Why is Selection Sort generally considered inefficient for large datasets?",
      options: [
        "It uses excessive extra memory space",
        "It performs Θ(n^2) comparisons regardless of the initial order of the input",
        "It is not a stable sorting algorithm",
        "It cannot handle negative numbers"
      ],
      answer: 1,
      explanation: "Selection sort always runs in Θ(n^2) time because it scans the unsorted portion of the array completely to find the minimum element in every step."
    }
  ],
  '05': [
    {
      id: 1,
      question: "In the brute-force string matching algorithm, what is the maximum number of character comparisons in the worst case, searching a pattern of length m in a text of length n?",
      options: [
        "n * m",
        "m * (n - m + 1)",
        "n + m",
        "n^2"
      ],
      answer: 1,
      explanation: "In the worst case (e.g. Text 'AAAAAA' and Pattern 'AAB'), we perform m comparisons at each of the (n - m + 1) alignments, yielding m * (n - m + 1) total comparisons."
    }
  ],
  '06': [
    {
      id: 1,
      question: "What is the key difference between Insertion Sort and Selection Sort?",
      options: [
        "Selection sort is stable, Insertion sort is not",
        "Insertion sort takes O(n) in the best case, while Selection sort always takes Θ(n^2)",
        "Selection sort is online, Insertion sort is not",
        "Insertion sort uses double the auxiliary space"
      ],
      answer: 1,
      explanation: "Insertion sort is adaptive: if the array is already sorted, it makes only n-1 comparisons, running in O(n) time. Selection sort always does Θ(n^2) comparisons."
    },
    {
      id: 2,
      question: "Which data structure is typically used to implement Breadth-First Search (BFS) in graphs?",
      options: [
        "Stack",
        "Queue",
        "Priority Queue",
        "Binary Search Tree"
      ],
      answer: 1,
      explanation: "BFS explores vertices level by level, meaning we visit vertices in first-in first-out (FIFO) order, which is implemented using a Queue."
    }
  ],
  '07': [
    {
      id: 1,
      question: "Under what condition is topological sorting possible for a graph?",
      options: [
        "The graph must be a Directed Acyclic Graph (DAG)",
        "The graph must be connected and undirected",
        "The graph must contain at least one directed cycle",
        "The graph must be bipartite"
      ],
      answer: 0,
      explanation: "Topological sorting is only defined for DAGs. If there is a cycle, no valid linear order exists because of circular dependency (e.g. A depends on B depends on A)."
    }
  ],
  '09': [
    {
      id: 1,
      question: "What is the worst-case time complexity of Quick Sort, and when does it occur?",
      options: [
        "O(n log n), when the array is randomly shuffled",
        "O(n^2), when the pivot is always the smallest or largest element (e.g. sorted array)",
        "O(n^2), when all elements are distinct",
        "O(n log n), when the pivot divides the array in half"
      ],
      answer: 1,
      explanation: "If the pivot consistently splits the array into sizes 0 and n-1 (which happens on already sorted arrays if the first/last element is picked), Quick Sort degrades to O(n^2)."
    },
    {
      id: 2,
      question: "What is the primary spatial drawback of Merge Sort compared to Quick Sort?",
      options: [
        "It requires O(n) auxiliary space to merge sub-arrays",
        "It uses O(n^2) recursive call stack frames",
        "It requires a random-access data structure",
        "It is not compatible with linked lists"
      ],
      answer: 0,
      explanation: "Unlike Quick Sort which is in-place (requiring only call stack space), standard Merge Sort requires an extra temporary array of size n to merge the sorted sub-arrays."
    }
  ],
  '10': [
    {
      id: 1,
      question: "What is the maximum height of an AVL tree containing n nodes?",
      options: [
        "Θ(log n)",
        "Θ(n)",
        "Θ(n log n)",
        "Θ(sqrt(n))"
      ],
      answer: 0,
      explanation: "An AVL tree is a strictly height-balanced binary search tree. The heights of the left and right subtrees of any node differ by at most 1, guaranteeing height is always bounded by ~1.44 log_2(n)."
    },
    {
      id: 2,
      question: "In Heapsort, how long does the heapify operation take to build a max-heap of n elements from an unsorted array?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      answer: 2,
      explanation: "Using the bottom-up heap construction algorithm (siftdown on all non-leaf nodes), the heap is built in O(n) time, which is faster than inserting elements one by one."
    }
  ],
  '11': [
    {
      id: 1,
      question: "What is the average-case time complexity of searching for a key in a hash table with n keys and a load factor alpha, assuming simple uniform hashing?",
      options: [
        "O(log n)",
        "O(1)",
        "O(1 + alpha)",
        "O(n)"
      ],
      answer: 2,
      explanation: "Under uniform hashing, searching takes O(1 + alpha) where alpha = n/m is the load factor (ratio of elements to slot size) representing average chain length."
    }
  ],
  '13': [
    {
      id: 1,
      question: "Which algorithm design technique solves optimization problems by making the locally optimal choice at each step?",
      options: [
        "Dynamic Programming",
        "Greedy Method",
        "Backtracking",
        "Divide and Conquer"
      ],
      answer: 1,
      explanation: "The Greedy Method makes locally optimal choices at each stage in the hope of finding a global optimum, whereas Dynamic Programming evaluates all choices to guarantee a global optimum."
    }
  ]
}

export const getQuizByLectureId = (lectureId) => QUIZZES[lectureId] || []
