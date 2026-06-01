/* eslint-disable */
import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './AlgorithmVisualizer.module.css'

// ── PSEUDOCODE DEFINITIONS ──────────────────────────────────────
const PSEUDOCODE = {
  bubbleSort: [
    "for i = 0 to n - 2 do",
    "  for j = 0 to n - 2 - i do",
    "    if A[j+1] < A[j] swap A[j] and A[j+1]"
  ],
  selectionSort: [
    "for i = 0 to n - 2 do",
    "  min_index = i",
    "  for j = i + 1 to n - 1 do",
    "    if A[j] < A[min_index] min_index = j",
    "  swap A[i] and A[min_index]"
  ],
  insertionSort: [
    "for i = 1 to n - 1 do",
    "  v = A[i]",
    "  j = i - 1",
    "  while j >= 0 and A[j] > v do",
    "    A[j + 1] = A[j]",
    "    j = j - 1",
    "  A[j + 1] = v"
  ],
  binarySearch: [
    "low = 0, high = n - 1",
    "while low <= high do",
    "  mid = (low + high) / 2",
    "  if A[mid] == key return mid",
    "  else if A[mid] < key low = mid + 1",
    "  else high = mid - 1",
    "return -1"
  ],
  stringMatching: [
    "for i = 0 to n - m do",
    "  j = 0",
    "  while j < m and P[j] == T[i + j] do",
    "    j = j + 1",
    "  if j == m return i",
    "return -1"
  ],
  euclidGcd: [
    "while n != 0 do",
    "  r = m % n",
    "  m = n",
    "  n = r",
    "return m"
  ],
  sieveEratosthenes: [
    "Initialize array A of size n, A[i] = true",
    "for p = 2 to sqrt(n) do",
    "  if A[p] == true do",
    "    for i = p*p to n step p do A[i] = false",
    "return all numbers where A[i] is true"
  ],
  bigOCurves: [
    "Analyze growth functions relative to input size n:",
    "  O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)"
  ],
  quickSort: [
    "if l < r do",
    "  s = Partition(A, l, r)  // pivot in final spot",
    "  QuickSort(A, l, s - 1)",
    "  QuickSort(A, s + 1, r)"
  ],
  mergeSort: [
    "if n > 1 do",
    "  copy A[0..mid] to B and A[mid..n] to C",
    "  MergeSort(B) and MergeSort(C)",
    "  Merge(B, C, A)"
  ],
  hashingProbing: [
    "Hash index = val % TableSize",
    "if slot occupied, scan index = (index + 1) % TableSize",
    "until an empty slot is found."
  ],
  knapsackDP: [
    "for i = 1 to n do",
    "  for w = 1 to W do",
    "    V[i, w] = max(V[i-1, w], v_i + V[i-1, w-w_i]) if w_i <= w",
    "    else V[i, w] = V[i-1, w]"
  ],
  dfs: [
    "DFS(v):",
    "  mark v as visited",
    "  for each neighbor w of v:",
    "    if w is not visited:",
    "      DFS(w)"
  ],
  bfs: [
    "Q.enqueue(start), mark start visited",
    "while Q is not empty:",
    "  v = Q.dequeue()",
    "  for each neighbor w of v:",
    "    if w is not visited:",
    "      mark w visited, Q.enqueue(w)"
  ],
  sourceRemoval: [
    "Compute in-degrees of all vertices",
    "Enqueue all vertices with in-degree 0",
    "while Q is not empty:",
    "  v = Q.dequeue(), add to sorted list",
    "  for each neighbor w of v:",
    "    decrement in-degree of w",
    "    if in-degree of w == 0: Q.enqueue(w)"
  ],
  prims: [
    "Initialize T with start vertex",
    "while T does not contain all vertices:",
    "  find min weight edge (u, v) where u in T, v not in T",
    "  add v and (u, v) to T"
  ],
  kruskals: [
    "Sort edges by weight",
    "Initialize disjoint sets for each vertex",
    "for each edge (u, v) in sorted order:",
    "  if find(u) != find(v):",
    "    union(u, v), add (u, v) to MST"
  ],
  comparisonCountingSort: [
    "for i = 0 to n - 1 do Count[i] = 0",
    "for i = 0 to n - 2 do",
    "  for j = i + 1 to n - 1 do",
    "    if A[i] < A[j] Count[j]++",
    "    else Count[i]++",
    "for i = 0 to n - 1 do S[Count[i]] = A[i]",
    "return S"
  ],
  horspoolSearch: [
    "Construct ShiftTable(P)",
    "i = m - 1",
    "while i <= n - 1 do",
    "  k = 0",
    "  while k <= m - 1 and P[m - 1 - k] == T[i - k] do k++",
    "  if k == m return i - m + 1",
    "  else i = i + ShiftTable[T[i]]",
    "return -1"
  ],
  hashing: [
    "Index = hash(Key)",
    "if Collision:",
    "  Chaining: append to list at Index",
    "  Linear Probing: check (Index + i) % TableSize"
  ]
}

export default function AlgorithmVisualizer({ algorithm, targetKey }) {
  const [array, setArray] = useState([])
  const [steps, setSteps] = useState([])
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(600) // ms per step
  
  const timerRef = useRef(null)
  const traceTableEndRef = useRef(null)

  const generateInitialData = useCallback(() => {
    setIsPlaying(false)
    setCurrentStepIdx(0)

    const newSteps = []

    if (algorithm === 'bubbleSort' || algorithm === 'selectionSort' || algorithm === 'insertionSort') {
      const initialArray = [45, 12, 89, 34, 67, 23, 56, 78].slice(0, 7)
      setArray(initialArray)
      
      // Clone original state
      newSteps.push({
        arr: [...initialArray],
        active: [],
        comparing: [],
        swapping: [],
        sorted: [],
        line: 0,
        desc: "Initial array generated.",
        vars: { i: '-', minIdx: '-', j: '-', comparing: '-', swapped: '-', condition: '-', action: 'Initial state', arrStr: `[${initialArray.join(', ')}]` }
      })

      if (algorithm === 'bubbleSort') {
        const arr = [...initialArray]
        const n = arr.length
        for (let i = 0; i < n - 1; i++) {
          newSteps.push({
            arr: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            line: 0,
            desc: `Pass ${i + 1} starting. Outer loop i = ${i}.`,
            vars: { i, j: '-', comparing: '-', swapped: '-', action: `Pass ${i+1} start`, arrStr: `[${arr.join(', ')}]` }
          })
          for (let j = 0; j < n - 1 - i; j++) {
            const compVal = arr[j] > arr[j + 1]
            newSteps.push({
              arr: [...arr],
              comparing: [j, j + 1],
              swapping: [],
              sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
              line: 1,
              desc: `Compare A[${j}] (${arr[j]}) and A[${j + 1}] (${arr[j + 1]})`,
              vars: { i, j, comparing: `A[${j}](${arr[j]}) > A[${j+1}](${arr[j+1]})`, swapped: compVal ? 'Yes (pending)' : 'No', action: 'Comparing', arrStr: `[${arr.join(', ')}]` }
            })
            if (arr[j] > arr[j + 1]) {
              const temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = temp
              newSteps.push({
                arr: [...arr],
                comparing: [],
                swapping: [j, j + 1],
                sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
                line: 2,
                desc: `Swap A[${j}] and A[${j + 1}]`,
                vars: { i, j, comparing: `A[${j}](${arr[j+1]}) > A[${j+1}](${arr[j]})`, swapped: 'Yes', action: `Swap A[${j}] & A[${j+1}]`, arrStr: `[${arr.join(', ')}]` }
              })
            }
          }
          newSteps.push({
            arr: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
            line: 0,
            desc: `Element A[${n - 1 - i}] (${arr[n - 1 - i]}) is now sorted.`,
            vars: { i, j: '-', comparing: '-', swapped: '-', action: `A[${n-1-i}] sorted`, arrStr: `[${arr.join(', ')}]` }
          })
        }
        newSteps.push({
          arr: [...arr],
          comparing: [],
          swapping: [],
          sorted: Array.from({ length: n }, (_, k) => k),
          line: 0,
          desc: "Array is fully sorted!",
          vars: { i: '-', j: '-', comparing: '-', swapped: '-', action: 'Sorted!', arrStr: `[${arr.join(', ')}]` }
        })
      } 
      else if (algorithm === 'selectionSort') {
        const arr = [...initialArray]
        const n = arr.length
        for (let i = 0; i < n - 1; i++) {
          let minIdx = i
          newSteps.push({
            arr: [...arr],
            active: [minIdx],
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => k),
            line: 0,
            desc: `Pass ${i + 1}: Set A[${i}] (${arr[i]}) as starting minimum.`,
            vars: { i, minIdx, j: '-', comparing: '-', action: `min = ${i}`, arrStr: `[${arr.join(', ')}]` }
          })
          for (let j = i + 1; j < n; j++) {
            const compVal = arr[j] < arr[minIdx]
            newSteps.push({
              arr: [...arr],
              active: [minIdx],
              comparing: [j],
              swapping: [],
              sorted: Array.from({ length: i }, (_, k) => k),
              line: 2,
              desc: `Compare A[${j}] (${arr[j]}) with current minimum A[min] (${arr[minIdx]}).`,
              vars: { i, minIdx, j, comparing: `A[${j}](${arr[j]}) < A[min](${arr[minIdx]})`, action: compVal ? 'Update min' : 'No change', arrStr: `[${arr.join(', ')}]` }
            })
            if (arr[j] < arr[minIdx]) {
              minIdx = j
              newSteps.push({
                arr: [...arr],
                active: [minIdx],
                comparing: [],
                swapping: [],
                sorted: Array.from({ length: i }, (_, k) => k),
                line: 3,
                desc: `New minimum found at index ${minIdx} (${arr[minIdx]}).`,
                vars: { i, minIdx, j, comparing: '-', action: `min = ${minIdx}`, arrStr: `[${arr.join(', ')}]` }
              })
            }
          }
          if (minIdx !== i) {
            const temp = arr[i]
            arr[i] = arr[minIdx]
            arr[minIdx] = temp
            newSteps.push({
              arr: [...arr],
              active: [],
              comparing: [],
              swapping: [i, minIdx],
              sorted: Array.from({ length: i }, (_, k) => k),
              line: 4,
              desc: `Swap A[${i}] (${arr[minIdx]}) and A[min] (${arr[i]}).`,
              vars: { i, minIdx, j: '-', comparing: '-', action: `Swap A[${i}], A[min]`, arrStr: `[${arr.join(', ')}]` }
            })
          }
          newSteps.push({
            arr: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: i + 1 }, (_, k) => k),
            line: 0,
            desc: `Position A[${i}] (${arr[i]}) is now sorted.`,
            vars: { i, minIdx: '-', j: '-', comparing: '-', action: `A[${i}] sorted`, arrStr: `[${arr.join(', ')}]` }
          })
        }
        newSteps.push({
          arr: [...arr],
          comparing: [],
          swapping: [],
          sorted: Array.from({ length: n }, (_, k) => k),
          line: 0,
          desc: "Array is fully sorted!",
          vars: { i: '-', minIdx: '-', j: '-', comparing: '-', action: 'Sorted!', arrStr: `[${arr.join(', ')}]` }
        })
      }
      else if (algorithm === 'insertionSort') {
        const arr = [...initialArray]
        const n = arr.length
        for (let i = 1; i < n; i++) {
          const v = arr[i]
          let j = i - 1
          newSteps.push({
            arr: [...arr],
            active: [i],
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => k),
            line: 1,
            desc: `Pick value v = A[${i}] (${v}) to insert.`,
            vars: { i, v, j, condition: '-', action: `v = A[${i}]`, arrStr: `[${arr.join(', ')}]` }
          })
          while (j >= 0 && arr[j] > v) {
            newSteps.push({
              arr: [...arr],
              active: [i],
              comparing: [j],
              swapping: [],
              sorted: Array.from({ length: i }, (_, k) => k),
              line: 3,
              desc: `Check condition: j >= 0 and A[j] (${arr[j]}) > v (${v}) — TRUE.`,
              vars: { i, v, j, condition: `j(${j})>=0 && ${arr[j]}>${v}`, action: 'Shift right', arrStr: `[${arr.join(', ')}]` }
            })
            arr[j + 1] = arr[j]
            j--
            newSteps.push({
              arr: [...arr],
              active: [],
              swapping: [j + 2],
              sorted: Array.from({ length: i }, (_, k) => k),
              line: 4,
              desc: `Shifted element from index ${j + 1} to index ${j + 2}. j becomes ${j}.`,
              vars: { i, v, j, condition: '-', action: `A[${j+2}] = A[${j+1}]`, arrStr: `[${arr.join(', ')}]` }
            })
          }
          newSteps.push({
            arr: [...arr],
            active: [],
            comparing: j >= 0 ? [j] : [],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => k),
            line: 3,
            desc: j >= 0 
              ? `Check condition: j >= 0 and A[j] (${arr[j]}) > v (${v}) — FALSE. Exit while loop.`
              : `Check condition: j >= 0 is FALSE. Exit while loop.`,
            vars: { i, v, j, condition: j >= 0 ? `j(${j})>=0 && ${arr[j]}>${v}` : `j(${j})>=0`, action: 'Exit while', arrStr: `[${arr.join(', ')}]` }
          })
          arr[j + 1] = v
          newSteps.push({
            arr: [...arr],
            active: [j + 1],
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: i + 1 }, (_, k) => k),
            line: 6,
            desc: `Place v (${v}) at index j + 1 = ${j + 1}.`,
            vars: { i, v, j, condition: '-', action: `A[${j+1}] = ${v}`, arrStr: `[${arr.join(', ')}]` }
          })
        }
        newSteps.push({
          arr: [...arr],
          comparing: [],
          swapping: [],
          sorted: Array.from({ length: n }, (_, k) => k),
          line: 0,
          desc: "Array is fully sorted!",
          vars: { i: '-', v: '-', j: '-', condition: '-', action: 'Sorted!', arrStr: `[${arr.join(', ')}]` }
        })
      }

      setSteps(newSteps)
    }
    else if (algorithm === 'binarySearch') {
      const searchArray = [12, 23, 34, 45, 56, 67, 78, 89]
      const key = parseInt(targetKey) || 56
      setArray(searchArray)

      let low = 0
      let high = searchArray.length - 1
      let found = -1

      newSteps.push({
        arr: [...searchArray],
        low, high, mid: -1,
        active: [],
        line: 0,
        desc: `Searching for key ${key} in sorted array. Initial bounds: low = 0, high = ${high}.`,
        vars: { low, high, mid: '-', valAtMid: '-', comparison: '-', action: 'Init bounds' }
      })

      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        newSteps.push({
          arr: [...searchArray],
          low, high, mid,
          line: 2,
          desc: `Calculate mid = (low + high) / 2 = (${low} + ${high}) / 2 = ${mid}. A[mid] = ${searchArray[mid]}.`,
          vars: { low, high, mid, valAtMid: searchArray[mid], comparison: '-', action: 'Calc mid' }
        })

        newSteps.push({
          arr: [...searchArray],
          low, high, mid,
          line: 3,
          desc: `Compare A[mid] (${searchArray[mid]}) with key (${key}).`,
          vars: { low, high, mid, valAtMid: searchArray[mid], comparison: `A[mid](${searchArray[mid]}) == key(${key})`, action: searchArray[mid] === key ? 'Match!' : 'No match' }
        })

        if (searchArray[mid] === key) {
          found = mid
          newSteps.push({
            arr: [...searchArray],
            low, high, mid,
            active: [mid],
            line: 3,
            desc: `Key found at index ${mid}! Return ${mid}.`,
            vars: { low, high, mid, valAtMid: searchArray[mid], comparison: 'Match', action: `Return index ${mid}` }
          })
          break
        } else if (searchArray[mid] < key) {
          const oldLow = low
          low = mid + 1
          newSteps.push({
            arr: [...searchArray],
            low, high, mid,
            line: 4,
            desc: `A[mid] (${searchArray[mid]}) < key (${key}). Key must be in right half. Shift low to mid + 1 = ${low}.`,
            vars: { low: oldLow, high, mid, valAtMid: searchArray[mid], comparison: `${searchArray[mid]} < ${key} (True)`, action: `low = ${low}` }
          })
        } else {
          const oldHigh = high
          high = mid - 1
          newSteps.push({
            arr: [...searchArray],
            low, high, mid,
            line: 5,
            desc: `A[mid] (${searchArray[mid]}) > key (${key}). Key must be in left half. Shift high to mid - 1 = ${high}.`,
            vars: { low, high: oldHigh, mid, valAtMid: searchArray[mid], comparison: `${searchArray[mid]} < ${key} (False)`, action: `high = ${high}` }
          })
        }
      }

      if (found === -1) {
        newSteps.push({
          arr: [...searchArray],
          low, high, mid: -1,
          line: 6,
          desc: `Search range empty (low > high). Key ${key} not found. Return -1.`,
          vars: { low, high, mid: '-', valAtMid: '-', comparison: 'low > high', action: 'Return -1' }
        })
      }

      setSteps(newSteps)
    }
    else if (algorithm === 'stringMatching') {
      const text = "AABRACADABRA"
      const pattern = targetKey || "CAD"
      
      const n = text.length
      const m = pattern.length

      newSteps.push({
        text, pattern,
        i: 0, j: 0,
        comparing: [],
        matched: [],
        line: 0,
        desc: `Matching Pattern "${pattern}" against Text "${text}". Text length n=${n}, Pattern length m=${m}.`,
        vars: { i: '-', j: '-', comparing: '-', result: 'Init' }
      })

      let foundIdx = -1
      for (let i = 0; i <= n - m; i++) {
        newSteps.push({
          text, pattern, i, j: 0, comparing: [], line: 0,
          desc: `Align pattern with text at index i = ${i}.`,
          vars: { i, j: 0, comparing: '-', result: `Align at i=${i}` }
        })

        let j = 0
        while (j < m && pattern[j] === text[i + j]) {
          newSteps.push({
            text, pattern, i, j,
            comparing: [i + j],
            line: 2,
            desc: `Compare T[${i + j}] ('${text[i + j]}') with P[${j}] ('${pattern[j]}') — MATCH.`,
            vars: { i, j, comparing: `T[${i+j}]('${text[i+j]}') == P[${j}]('${pattern[j]}')`, result: 'Match' }
          })
          j++
        }

        if (j < m) {
          newSteps.push({
            text, pattern, i, j,
            comparing: [i + j],
            line: 2,
            desc: `Compare T[${i + j}] ('${text[i + j]}') with P[${j}] ('${pattern[j]}') — MISMATCH.`,
            vars: { i, j, comparing: `T[${i+j}]('${text[i+j]}') == P[${j}]('${pattern[j]}')`, result: 'Mismatch' }
          })
        }

        if (j === m) {
          foundIdx = i
          newSteps.push({
            text, pattern, i, j: m,
            matched: Array.from({ length: m }, (_, k) => i + k),
            line: 4,
            desc: `Pattern fully matched at text index ${i}!`,
            vars: { i, j: m, comparing: 'All Match', result: `Found at index ${i}` }
          })
          break
        }
      }

      if (foundIdx === -1) {
        newSteps.push({
          text, pattern, i: n - m + 1, j: 0,
          line: 5,
          desc: "Search complete. Pattern not found in text.",
          vars: { i: '-', j: '-', comparing: '-', result: 'Not Found' }
        })
      }

      setSteps(newSteps)
    }
    else if (algorithm === 'euclidGcd') {
      let m = 60
      let n = 24
      newSteps.push({
        m, n, r: '-',
        line: 0,
        desc: `Calculate GCD of m = ${m} and n = ${n}.`,
        vars: { m, n, r: '-', action: 'Start' }
      })
      while (n !== 0) {
        const r = m % n
        newSteps.push({
          m, n, r,
          line: 1,
          desc: `Calculate remainder: r = m % n = ${m} % ${n} = ${r}.`,
          vars: { m, n, r, action: `r = ${r}` }
        })
        const oldN = n
        m = n
        n = r
        newSteps.push({
          m, n, r,
          line: 2,
          desc: `Shift variables: m becomes ${m} (old n), n becomes ${n} (remainder r).`,
          vars: { m, n, r, action: `m = ${oldN}, n = ${r}` }
        })
      }
      newSteps.push({
        m, n, r: '-',
        line: 4,
        desc: `n is 0. GCD is m = ${m}.`,
        vars: { m, n, r: '-', action: `Return GCD = ${m}` }
      })
      setSteps(newSteps)
    }
    else if (algorithm === 'sieveEratosthenes') {
      const limit = 30
      const A = Array(limit + 1).fill(true)
      A[0] = A[1] = false

      newSteps.push({
        grid: [...A],
        p: '-',
        line: 0,
        desc: `Initialize grid: mark numbers 2 to ${limit} as potential primes.`,
        vars: { p: '-', multiples: '-', action: 'Init' }
      })

      for (let p = 2; p * p <= limit; p++) {
        newSteps.push({
          grid: [...A],
          p,
          line: 1,
          desc: `Check outer loop: prime candidate p = ${p}.`,
          vars: { p, multiples: '-', action: `Check p = ${p}` }
        })
        if (A[p]) {
          newSteps.push({
            grid: [...A],
            p,
            line: 2,
            desc: `A[${p}] is true, so ${p} is prime. Cross out its multiples starting from ${p * p}.`,
            vars: { p, multiples: 'Scanning...', action: `${p} is prime` }
          })
          for (let i = p * p; i <= limit; i += p) {
            if (A[i]) {
              A[i] = false
              newSteps.push({
                grid: [...A],
                p,
                active: i,
                line: 3,
                desc: `Cross out multiple ${i} (mark as false).`,
                vars: { p, multiples: i, action: `Cross ${i}` }
              })
            }
          }
        }
      }
      newSteps.push({
        grid: [...A],
        p: '-',
        line: 4,
        desc: `Sieve complete! Remaining active numbers are primes.`,
        vars: { p: '-', multiples: '-', action: 'Complete' }
      })
      setSteps(newSteps)
    }
    else if (algorithm === 'bigOCurves') {
      for (let nVal = 1; nVal <= 10; nVal++) {
        const logN = Math.log2(nVal).toFixed(2)
        const nLogN = (nVal * Math.log2(nVal)).toFixed(2)
        const n2 = nVal * nVal
        const twoN = Math.pow(2, nVal)
        newSteps.push({
          nVal,
          line: 0,
          desc: `Calculate complexities for input size n = ${nVal}.`,
          vars: {
            n: nVal,
            'O(1)': 1,
            'O(log n)': logN,
            'O(n)': nVal,
            'O(n log n)': nLogN,
            'O(n^2)': n2,
            'O(2^n)': twoN
          }
        })
      }
      setSteps(newSteps)
    }
    else if (algorithm === 'quickSort') {
      const arr = [45, 12, 89, 34, 67, 23, 56]
      setArray(arr)

      newSteps.push({
        arr: [...arr],
        pivotIdx: 0,
        i: 1, j: 6,
        line: 0,
        desc: "Start partition: Choose pivot A[0] = 45. Initialize i = 1, j = 6.",
        vars: { pivot: 45, i: 1, j: 6, action: 'Init scan', arrStr: `[${arr.join(', ')}]` }
      })
      // i = 1: A[1] = 12 < 45 (continue)
      newSteps.push({
        arr: [...arr],
        pivotIdx: 0,
        i: 1, j: 6,
        line: 1,
        desc: "Scan i: A[1] (12) < pivot (45). Increment i.",
        vars: { pivot: 45, i: 1, j: 6, action: 'i++', arrStr: `[${arr.join(', ')}]` }
      })
      // i = 2: A[2] = 89 > 45 (stop i)
      newSteps.push({
        arr: [...arr],
        pivotIdx: 0,
        i: 2, j: 6,
        line: 1,
        desc: "Scan i: A[2] (89) > pivot (45). i stops at index 2.",
        vars: { pivot: 45, i: 2, j: 6, action: 'i stops', arrStr: `[${arr.join(', ')}]` }
      })
      // j = 6: A[6] = 56 > 45 (continue) -> j--
      newSteps.push({
        arr: [...arr],
        pivotIdx: 0,
        i: 2, j: 6,
        line: 1,
        desc: "Scan j: A[6] (56) > pivot (45). Decrement j.",
        vars: { pivot: 45, i: 2, j: 6, action: 'j--', arrStr: `[${arr.join(', ')}]` }
      })
      // j = 5: A[5] = 23 < 45 (stop j)
      newSteps.push({
        arr: [...arr],
        pivotIdx: 0,
        i: 2, j: 5,
        line: 1,
        desc: "Scan j: A[5] (23) < pivot (45). j stops at index 5.",
        vars: { pivot: 45, i: 2, j: 5, action: 'j stops', arrStr: `[${arr.join(', ')}]` }
      })
      // Swap A[2] & A[5] (89 & 23)
      const temp = arr[2]
      arr[2] = arr[5]
      arr[5] = temp
      newSteps.push({
        arr: [...arr],
        pivotIdx: 0,
        i: 2, j: 5,
        swapping: [2, 5],
        line: 1,
        desc: `i < j, swap A[i] (89) and A[j] (23). Array becomes: [${arr.join(', ')}].`,
        vars: { pivot: 45, i: 2, j: 5, action: 'Swap A[i], A[j]', arrStr: `[${arr.join(', ')}]` }
      })
      // i = 3: A[3] = 34 < 45 (continue) -> i++
      newSteps.push({
        arr: [...arr],
        pivotIdx: 0,
        i: 3, j: 5,
        line: 1,
        desc: "Scan i: A[3] (34) < pivot (45). Increment i.",
        vars: { pivot: 45, i: 3, j: 5, action: 'i++', arrStr: `[${arr.join(', ')}]` }
      })
      // i = 4: A[4] = 67 > 45 (stop i)
      newSteps.push({
        arr: [...arr],
        pivotIdx: 0,
        i: 4, j: 5,
        line: 1,
        desc: "Scan i: A[4] (67) > pivot (45). i stops at index 4.",
        vars: { pivot: 45, i: 4, j: 5, action: 'i stops', arrStr: `[${arr.join(', ')}]` }
      })
      // j = 4: A[4] = 67 > 45 -> j-- to 3 (stops, A[3] = 34 < 45)
      newSteps.push({
        arr: [...arr],
        pivotIdx: 0,
        i: 4, j: 3,
        line: 1,
        desc: "Scan j: j decrements, stops at index 3 where A[3] (34) < pivot (45).",
        vars: { pivot: 45, i: 4, j: 3, action: 'j-- to 3', arrStr: `[${arr.join(', ')}]` }
      })
      // Swap pivot with A[j]
      const tempP = arr[0]
      arr[0] = arr[3]
      arr[3] = tempP
      newSteps.push({
        arr: [...arr],
        pivotIdx: 3,
        swapping: [0, 3],
        line: 2,
        desc: `Pointers crossed (i >= j). Swap pivot A[0] (45) with A[j] (34). Pivot is now at index 3 in its final position.`,
        vars: { pivot: 45, i: 4, j: 3, action: 'Swap pivot with A[j]', arrStr: `[${arr.join(', ')}]` }
      })
      setSteps(newSteps)
    }
    else if (algorithm === 'mergeSort') {
      const arr = [45, 12, 89, 34]
      setArray(arr)

      newSteps.push({
        arr: [...arr],
        line: 0,
        desc: "Initial array to sort.",
        vars: { level: 0, split: 'None', action: 'Start', arrStr: `[${arr.join(', ')}]` }
      })
      newSteps.push({
        arr: [...arr],
        splits: [[45, 12], [89, 34]],
        line: 1,
        desc: "Split array into left half [45, 12] and right half [89, 34].",
        vars: { level: 1, split: '[45, 12] | [89, 34]', action: 'Split', arrStr: `[${arr.join(', ')}]` }
      })
      newSteps.push({
        arr: [...arr],
        splits: [[45], [12], [89], [34]],
        line: 1,
        desc: "Split subarrays into individual elements: [45], [12] and [89], [34].",
        vars: { level: 2, split: '[45] | [12] | [89] | [34]', action: 'Split', arrStr: `[${arr.join(', ')}]` }
      })
      newSteps.push({
        arr: [...arr],
        splits: [[12, 45], [34, 89]],
        line: 2,
        desc: "Merge and sort base elements: [45] & [12] merge to [12, 45]. [89] & [34] merge to [34, 89].",
        vars: { level: 1, split: '[12, 45] | [34, 89]', action: 'Merge', arrStr: `[${arr.join(', ')}]` }
      })
      newSteps.push({
        arr: [12, 34, 45, 89],
        splits: [],
        line: 2,
        desc: "Merge and sort subarrays: [12, 45] & [34, 89] merge to [12, 34, 45, 89].",
        vars: { level: 0, split: 'None', action: 'Merge final', arrStr: '[12, 34, 45, 89]' }
      })
      setSteps(newSteps)
    }
    else if (algorithm === 'hashingProbing') {
      const table = Array(10).fill(null)
      newSteps.push({
        table: [...table],
        activeKey: null,
        activeIdx: -1,
        line: 0,
        desc: "Initialize empty hash table of size 10. Insertion queue: [12, 22, 5, 15].",
        vars: { val: '-', hash: '-', collisions: 0, index: '-' }
      })
      // insert 12
      table[2] = 12
      newSteps.push({
        table: [...table],
        activeKey: 12,
        activeIdx: 2,
        line: 1,
        desc: "Insert 12: Hash index = 12 % 10 = 2. Slot 2 is empty. Insert 12.",
        vars: { val: 12, hash: 2, collisions: 0, index: 2 }
      })
      // insert 22 collision
      newSteps.push({
        table: [...table],
        activeKey: 22,
        activeIdx: 2,
        colliding: true,
        line: 2,
        desc: "Insert 22: Hash index = 22 % 10 = 2. Slot 2 is occupied by 12 (Collision!). Probing next slot...",
        vars: { val: 22, hash: 2, collisions: 1, index: '2 (Collision)' }
      })
      table[3] = 22
      newSteps.push({
        table: [...table],
        activeKey: 22,
        activeIdx: 3,
        line: 2,
        desc: "Probing slot 3: Slot 3 is empty. Insert 22.",
        vars: { val: 22, hash: 2, collisions: 1, index: 3 }
      })
      // insert 5
      table[5] = 5
      newSteps.push({
        table: [...table],
        activeKey: 5,
        activeIdx: 5,
        line: 1,
        desc: "Insert 5: Hash index = 5 % 10 = 5. Slot 5 is empty. Insert 5.",
        vars: { val: 5, hash: 5, collisions: 0, index: 5 }
      })
      // insert 15 collision
      newSteps.push({
        table: [...table],
        activeKey: 15,
        activeIdx: 5,
        colliding: true,
        line: 2,
        desc: "Insert 15: Hash index = 15 % 10 = 5. Slot 5 is occupied by 5 (Collision!). Probing next slot...",
        vars: { val: 15, hash: 5, collisions: 1, index: '5 (Collision)' }
      })
      table[6] = 15
      newSteps.push({
        table: [...table],
        activeKey: 15,
        activeIdx: 6,
        line: 2,
        desc: "Probing slot 6: Slot 6 is empty. Insert 15.",
        vars: { val: 15, hash: 5, collisions: 1, index: 6 }
      })
      setSteps(newSteps)
    }
    else if (algorithm === 'knapsackDP') {
      const items = [
        { name: 'Item 1', w: 2, v: 12 },
        { name: 'Item 2', w: 1, v: 10 },
        { name: 'Item 3', w: 3, v: 20 }
      ]
      const WVal = 3
      const nVal = items.length
      const dp = Array(nVal + 1).fill(null).map(() => Array(WVal + 1).fill(0))

      newSteps.push({
        dp: dp.map(row => [...row]),
        activeCell: null,
        line: 0,
        desc: "Initialize DP Table with 0s for row 0 (no items) and col 0 (capacity 0).",
        vars: { item: '-', cap: '-', val: 0, decision: 'Base case 0' }
      })

      for (let i = 1; i <= nVal; i++) {
        const item = items[i - 1]
        for (let w = 1; w <= WVal; w++) {
          let desc = ""
          let decision = ""
          if (item.w <= w) {
            const valWith = item.v + dp[i - 1][w - item.w]
            const valWithout = dp[i - 1][w]
            dp[i][w] = Math.max(valWithout, valWith)
            desc = `Cell V[${i}, ${w}] calculated. Item ${i} (w=${item.w}, v=${item.v}) fits. Compare keeping it (${valWith}) vs leaving it (${valWithout}). Max is ${dp[i][w]}.`
            decision = `max(${valWithout}, ${item.v}+${dp[i - 1][w - item.w]}) = ${dp[i][w]}`
          } else {
            dp[i][w] = dp[i - 1][w]
            desc = `Cell V[${i}, ${w}] calculated. Item ${i} (w=${item.w}) does not fit in capacity ${w}. Copy value from cell above: ${dp[i][w]}.`
            decision = `Copy V[${i-1}, ${w}] = ${dp[i][w]}`
          }
          newSteps.push({
            dp: dp.map(row => [...row]),
            activeCell: [i, w],
            line: 1,
            desc,
            vars: { item: item.name, cap: w, val: dp[i][w], decision }
          })
        }
      }
      setSteps(newSteps)
    }
    else if (algorithm === 'dfs') {
      const nodes = [
        { id: 'A', x: 150, y: 50 },
        { id: 'B', x: 50, y: 150 },
        { id: 'C', x: 250, y: 150 },
        { id: 'D', x: 100, y: 250 },
        { id: 'E', x: 200, y: 250 },
        { id: 'F', x: 150, y: 350 }
      ]
      const edges = [
        { u: 'A', v: 'B' }, { u: 'A', v: 'C' },
        { u: 'B', v: 'D' }, { u: 'B', v: 'E' },
        { u: 'C', v: 'E' }, { u: 'D', v: 'F' }, { u: 'E', v: 'F' }
      ]
      const adj = { A: ['B', 'C'], B: ['A', 'D', 'E'], C: ['A', 'E'], D: ['B', 'F'], E: ['B', 'C', 'F'], F: ['D', 'E'] }
      
      const visited = []
      const stack = []
      
      newSteps.push({
        graph: { nodes, edges, directed: false },
        visited: [],
        activeNode: null,
        activeEdge: null,
        line: 0,
        desc: "Start DFS from vertex A.",
        vars: { node: 'A', neighbor: '-', stack: '[]', visited: '[]' }
      })

      const dfsRecursive = (u, p) => {
        visited.push(u)
        stack.push(u)
        newSteps.push({
          graph: { nodes, edges, directed: false },
          visited: [...visited],
          activeNode: u,
          activeEdge: p ? { u: p, v: u } : null,
          line: 1,
          desc: `Mark ${u} as visited.`,
          vars: { node: u, neighbor: '-', stack: `[${stack.join(', ')}]`, visited: `[${visited.join(', ')}]` }
        })

        for (const v of adj[u]) {
          newSteps.push({
            graph: { nodes, edges, directed: false },
            visited: [...visited],
            activeNode: u,
            activeEdge: { u, v },
            line: 2,
            desc: `Check neighbor ${v} of ${u}.`,
            vars: { node: u, neighbor: v, stack: `[${stack.join(', ')}]`, visited: `[${visited.join(', ')}]` }
          })
          if (!visited.includes(v)) {
            newSteps.push({
              graph: { nodes, edges, directed: false },
              visited: [...visited],
              activeNode: u,
              activeEdge: { u, v },
              line: 3,
              desc: `${v} is not visited. Recurse into ${v}.`,
              vars: { node: u, neighbor: v, stack: `[${stack.join(', ')}]`, visited: `[${visited.join(', ')}]` }
            })
            dfsRecursive(v, u)
            
            // Backtrack
            newSteps.push({
              graph: { nodes, edges, directed: false },
              visited: [...visited],
              activeNode: u,
              activeEdge: { u, v },
              line: 4,
              desc: `Backtrack to ${u} from ${v}.`,
              vars: { node: u, neighbor: '-', stack: `[${stack.join(', ')}]`, visited: `[${visited.join(', ')}]` }
            })
          } else {
            newSteps.push({
              graph: { nodes, edges, directed: false },
              visited: [...visited],
              activeNode: u,
              activeEdge: { u, v },
              line: 3,
              desc: `${v} is already visited. Skip.`,
              vars: { node: u, neighbor: v, stack: `[${stack.join(', ')}]`, visited: `[${visited.join(', ')}]` }
            })
          }
        }
        stack.pop()
      }
      
      dfsRecursive('A', null)
      
      newSteps.push({
        graph: { nodes, edges, directed: false },
        visited: [...visited],
        activeNode: null,
        activeEdge: null,
        line: 0,
        desc: "DFS traversal complete.",
        vars: { node: '-', neighbor: '-', stack: '[]', visited: `[${visited.join(', ')}]` }
      })
      setSteps(newSteps)
    }
    else if (algorithm === 'bfs') {
      const nodes = [
        { id: 'A', x: 150, y: 50 },
        { id: 'B', x: 50, y: 150 },
        { id: 'C', x: 250, y: 150 },
        { id: 'D', x: 100, y: 250 },
        { id: 'E', x: 200, y: 250 },
        { id: 'F', x: 150, y: 350 }
      ]
      const edges = [
        { u: 'A', v: 'B' }, { u: 'A', v: 'C' },
        { u: 'B', v: 'D' }, { u: 'B', v: 'E' },
        { u: 'C', v: 'E' }, { u: 'D', v: 'F' }, { u: 'E', v: 'F' }
      ]
      const adj = { A: ['B', 'C'], B: ['A', 'D', 'E'], C: ['A', 'E'], D: ['B', 'F'], E: ['B', 'C', 'F'], F: ['D', 'E'] }
      
      const visited = ['A']
      const queue = ['A']
      
      newSteps.push({
        graph: { nodes, edges, directed: false },
        visited: [...visited],
        activeNode: 'A',
        activeEdge: null,
        line: 0,
        desc: "Start BFS from vertex A. Enqueue A and mark visited.",
        vars: { node: '-', neighbor: '-', queue: `[${queue.join(', ')}]`, visited: `[${visited.join(', ')}]` }
      })

      while (queue.length > 0) {
        newSteps.push({
          graph: { nodes, edges, directed: false },
          visited: [...visited],
          activeNode: queue[0],
          activeEdge: null,
          line: 1,
          desc: `Queue is not empty: [${queue.join(', ')}].`,
          vars: { node: '-', neighbor: '-', queue: `[${queue.join(', ')}]`, visited: `[${visited.join(', ')}]` }
        })
        
        const u = queue.shift()
        newSteps.push({
          graph: { nodes, edges, directed: false },
          visited: [...visited],
          activeNode: u,
          activeEdge: null,
          line: 2,
          desc: `Dequeue ${u}.`,
          vars: { node: u, neighbor: '-', queue: `[${queue.join(', ')}]`, visited: `[${visited.join(', ')}]` }
        })

        for (const v of adj[u]) {
          newSteps.push({
            graph: { nodes, edges, directed: false },
            visited: [...visited],
            activeNode: u,
            activeEdge: { u, v },
            line: 3,
            desc: `Check neighbor ${v} of ${u}.`,
            vars: { node: u, neighbor: v, queue: `[${queue.join(', ')}]`, visited: `[${visited.join(', ')}]` }
          })
          if (!visited.includes(v)) {
            visited.push(v)
            queue.push(v)
            newSteps.push({
              graph: { nodes, edges, directed: false },
              visited: [...visited],
              activeNode: u,
              activeEdge: { u, v },
              line: 5,
              desc: `${v} is not visited. Mark visited and enqueue ${v}.`,
              vars: { node: u, neighbor: v, queue: `[${queue.join(', ')}]`, visited: `[${visited.join(', ')}]` }
            })
          } else {
            newSteps.push({
              graph: { nodes, edges, directed: false },
              visited: [...visited],
              activeNode: u,
              activeEdge: { u, v },
              line: 4,
              desc: `${v} is already visited. Skip.`,
              vars: { node: u, neighbor: v, queue: `[${queue.join(', ')}]`, visited: `[${visited.join(', ')}]` }
            })
          }
        }
      }
      
      newSteps.push({
        graph: { nodes, edges, directed: false },
        visited: [...visited],
        activeNode: null,
        activeEdge: null,
        line: 1,
        desc: "Queue is empty. BFS traversal complete.",
        vars: { node: '-', neighbor: '-', queue: '[]', visited: `[${visited.join(', ')}]` }
      })
      setSteps(newSteps)
    }
    else if (algorithm === 'sourceRemoval') {
      const nodes = [
        { id: 'A', x: 150, y: 50 },
        { id: 'B', x: 50, y: 150 },
        { id: 'C', x: 250, y: 150 },
        { id: 'D', x: 100, y: 250 },
        { id: 'E', x: 200, y: 250 },
        { id: 'F', x: 150, y: 350 }
      ]
      const edges = [
        { u: 'A', v: 'B' }, { u: 'A', v: 'C' },
        { u: 'B', v: 'D' }, { u: 'C', v: 'E' },
        { u: 'D', v: 'F' }, { u: 'E', v: 'F' }
      ]
      const adj = { A: ['B', 'C'], B: ['D'], C: ['E'], D: ['F'], E: ['F'], F: [] }
      const inDegree = { A: 0, B: 1, C: 1, D: 1, E: 1, F: 2 }
      
      const queue = ['A']
      const sorted = []
      const removedEdges = []
      
      newSteps.push({
        graph: { nodes, edges, directed: true },
        removedNodes: [],
        removedEdges: [],
        activeNode: null,
        activeEdge: null,
        line: 0,
        desc: "Compute in-degrees: A:0, B:1, C:1, D:1, E:1, F:2.",
        vars: { node: '-', neighbor: '-', queue: '[]', sorted: '[]', inDegree: JSON.stringify(inDegree) }
      })

      newSteps.push({
        graph: { nodes, edges, directed: true },
        removedNodes: [],
        removedEdges: [],
        activeNode: null,
        activeEdge: null,
        line: 1,
        desc: "Enqueue vertices with in-degree 0: [A].",
        vars: { node: '-', neighbor: '-', queue: `[${queue.join(', ')}]`, sorted: '[]', inDegree: JSON.stringify(inDegree) }
      })

      while (queue.length > 0) {
        const u = queue.shift()
        sorted.push(u)
        
        newSteps.push({
          graph: { nodes, edges, directed: true },
          removedNodes: [...sorted.slice(0, -1)],
          removedEdges: [...removedEdges],
          activeNode: u,
          activeEdge: null,
          line: 3,
          desc: `Dequeue ${u}, add to sorted list.`,
          vars: { node: u, neighbor: '-', queue: `[${queue.join(', ')}]`, sorted: `[${sorted.join(', ')}]`, inDegree: JSON.stringify(inDegree) }
        })

        for (const v of adj[u]) {
          removedEdges.push({ u, v })
          inDegree[v]--
          
          newSteps.push({
            graph: { nodes, edges, directed: true },
            removedNodes: [...sorted],
            removedEdges: [...removedEdges],
            activeNode: u,
            activeEdge: { u, v },
            line: 5,
            desc: `Remove edge ${u}->${v}. Decrement in-degree of ${v} to ${inDegree[v]}.`,
            vars: { node: u, neighbor: v, queue: `[${queue.join(', ')}]`, sorted: `[${sorted.join(', ')}]`, inDegree: JSON.stringify(inDegree) }
          })
          
          if (inDegree[v] === 0) {
            queue.push(v)
            newSteps.push({
              graph: { nodes, edges, directed: true },
              removedNodes: [...sorted],
              removedEdges: [...removedEdges],
              activeNode: u,
              activeEdge: { u, v },
              line: 6,
              desc: `In-degree of ${v} is 0. Enqueue ${v}.`,
              vars: { node: u, neighbor: v, queue: `[${queue.join(', ')}]`, sorted: `[${sorted.join(', ')}]`, inDegree: JSON.stringify(inDegree) }
            })
          }
        }
      }
      
      newSteps.push({
        graph: { nodes, edges, directed: true },
        removedNodes: [...sorted],
        removedEdges: [...removedEdges],
        activeNode: null,
        activeEdge: null,
        line: 2,
        desc: "Queue is empty. Topological sort complete.",
        vars: { node: '-', neighbor: '-', queue: '[]', sorted: `[${sorted.join(', ')}]`, inDegree: JSON.stringify(inDegree) }
      })
      setSteps(newSteps)
    }
    else if (algorithm === 'prims') {
      const nodes = [
        { id: 'A', x: 150, y: 50 },
        { id: 'B', x: 50, y: 150 },
        { id: 'C', x: 250, y: 150 },
        { id: 'D', x: 100, y: 250 },
        { id: 'E', x: 200, y: 250 },
        { id: 'F', x: 150, y: 350 }
      ]
      const edges = [
        { u: 'A', v: 'B', w: 4 }, { u: 'A', v: 'C', w: 2 },
        { u: 'B', v: 'C', w: 1 }, { u: 'B', v: 'D', w: 5 },
        { u: 'C', v: 'E', w: 3 }, { u: 'D', v: 'E', w: 6 },
        { u: 'D', v: 'F', w: 2 }, { u: 'E', v: 'F', w: 4 }
      ]
      
      const inT = ['A']
      const mstEdges = []
      
      newSteps.push({
        graph: { nodes, edges, directed: false, weighted: true },
        inT: [...inT],
        mstEdges: [...mstEdges],
        activeNode: 'A',
        activeEdge: null,
        line: 0,
        desc: "Initialize tree T with start vertex A.",
        vars: { inT: `[${inT.join(', ')}]`, minEdge: '-', weight: '-' }
      })

      while (inT.length < nodes.length) {
        let minW = Infinity
        let minE = null
        
        // Find min edge
        for (const e of edges) {
          const uIn = inT.includes(e.u)
          const vIn = inT.includes(e.v)
          if ((uIn && !vIn) || (!uIn && vIn)) {
            if (e.w < minW) {
              minW = e.w
              minE = e
            }
          }
        }
        
        if (!minE) break // Disconnected
        
        newSteps.push({
          graph: { nodes, edges, directed: false, weighted: true },
          inT: [...inT],
          mstEdges: [...mstEdges],
          activeNode: null,
          activeEdge: minE,
          line: 2,
          desc: `Find min weight edge connecting T to outside: ${minE.u}-${minE.v} (weight ${minE.w}).`,
          vars: { inT: `[${inT.join(', ')}]`, minEdge: `${minE.u}-${minE.v}`, weight: minE.w }
        })
        
        const newNode = inT.includes(minE.u) ? minE.v : minE.u
        inT.push(newNode)
        mstEdges.push(minE)
        
        newSteps.push({
          graph: { nodes, edges, directed: false, weighted: true },
          inT: [...inT],
          mstEdges: [...mstEdges],
          activeNode: newNode,
          activeEdge: minE,
          line: 3,
          desc: `Add vertex ${newNode} and edge ${minE.u}-${minE.v} to T.`,
          vars: { inT: `[${inT.join(', ')}]`, minEdge: `${minE.u}-${minE.v}`, weight: minE.w }
        })
      }
      
      newSteps.push({
        graph: { nodes, edges, directed: false, weighted: true },
        inT: [...inT],
        mstEdges: [...mstEdges],
        activeNode: null,
        activeEdge: null,
        line: 1,
        desc: "T contains all vertices. Prim's algorithm complete.",
        vars: { inT: `[${inT.join(', ')}]`, minEdge: '-', weight: '-' }
      })
      setSteps(newSteps)
    }
    else if (algorithm === 'kruskals') {
      const nodes = [
        { id: 'A', x: 150, y: 50 },
        { id: 'B', x: 50, y: 150 },
        { id: 'C', x: 250, y: 150 },
        { id: 'D', x: 100, y: 250 },
        { id: 'E', x: 200, y: 250 },
        { id: 'F', x: 150, y: 350 }
      ]
      const edges = [
        { u: 'A', v: 'B', w: 4 }, { u: 'A', v: 'C', w: 2 },
        { u: 'B', v: 'C', w: 1 }, { u: 'B', v: 'D', w: 5 },
        { u: 'C', v: 'E', w: 3 }, { u: 'D', v: 'E', w: 6 },
        { u: 'D', v: 'F', w: 2 }, { u: 'E', v: 'F', w: 4 }
      ]
      
      const sortedEdges = [...edges].sort((a, b) => a.w - b.w)
      const parent = {}
      nodes.forEach(n => parent[n.id] = n.id)
      
      const find = (i) => {
        if (parent[i] === i) return i
        return find(parent[i])
      }
      const union = (i, j) => {
        const rootI = find(i)
        const rootJ = find(j)
        parent[rootI] = rootJ
      }
      
      const mstEdges = []
      
      newSteps.push({
        graph: { nodes, edges, directed: false, weighted: true },
        mstEdges: [...mstEdges],
        activeEdge: null,
        line: 0,
        desc: `Sort edges by weight: ${sortedEdges.map(e => `${e.u}-${e.v}(${e.w})`).join(', ')}.`,
        vars: { edge: '-', weight: '-', action: 'Sort edges', sets: JSON.stringify(parent) }
      })

      newSteps.push({
        graph: { nodes, edges, directed: false, weighted: true },
        mstEdges: [...mstEdges],
        activeEdge: null,
        line: 1,
        desc: "Initialize disjoint sets for each vertex.",
        vars: { edge: '-', weight: '-', action: 'Init sets', sets: JSON.stringify(parent) }
      })

      for (const e of sortedEdges) {
        newSteps.push({
          graph: { nodes, edges, directed: false, weighted: true },
          mstEdges: [...mstEdges],
          activeEdge: e,
          line: 2,
          desc: `Consider edge ${e.u}-${e.v} with weight ${e.w}.`,
          vars: { edge: `${e.u}-${e.v}`, weight: e.w, action: 'Check edge', sets: JSON.stringify(parent) }
        })
        
        const rootU = find(e.u)
        const rootV = find(e.v)
        
        if (rootU !== rootV) {
          newSteps.push({
            graph: { nodes, edges, directed: false, weighted: true },
            mstEdges: [...mstEdges],
            activeEdge: e,
            line: 3,
            desc: `find(${e.u})=${rootU} != find(${e.v})=${rootV}. No cycle formed.`,
            vars: { edge: `${e.u}-${e.v}`, weight: e.w, action: 'No cycle', sets: JSON.stringify(parent) }
          })
          
          union(e.u, e.v)
          mstEdges.push(e)
          
          newSteps.push({
            graph: { nodes, edges, directed: false, weighted: true },
            mstEdges: [...mstEdges],
            activeEdge: e,
            line: 4,
            desc: `Add ${e.u}-${e.v} to MST and union their sets.`,
            vars: { edge: `${e.u}-${e.v}`, weight: e.w, action: 'Add to MST', sets: JSON.stringify(parent) }
          })
        } else {
          newSteps.push({
            graph: { nodes, edges, directed: false, weighted: true },
            mstEdges: [...mstEdges],
            activeEdge: e,
            line: 3,
            desc: `find(${e.u}) == find(${e.v}) == ${rootU}. Edge forms a cycle. Discard.`,
            vars: { edge: `${e.u}-${e.v}`, weight: e.w, action: 'Cycle, discard', sets: JSON.stringify(parent) }
          })
        }
      }
      
      newSteps.push({
        graph: { nodes, edges, directed: false, weighted: true },
        mstEdges: [...mstEdges],
        activeEdge: null,
        line: 2,
        desc: "All edges processed. Kruskal's algorithm complete.",
        vars: { edge: '-', weight: '-', action: 'Done', sets: JSON.stringify(parent) }
      })
      setSteps(newSteps)
    }
    else if (algorithm === 'comparisonCountingSort') {
      const arr = [62, 31, 84, 96, 19, 47]
      const n = arr.length
      const count = Array(n).fill(0)
      const sorted = Array(n).fill(null)
      setArray(arr)

      newSteps.push({
        arr: [...arr],
        count: [...count],
        sorted: [...sorted],
        i: '-', j: '-',
        line: 0,
        desc: "Initialize counts to 0. Array to sort: [62, 31, 84, 96, 19, 47]",
        vars: { i: '-', j: '-', valI: '-', valJ: '-', comparison: '-', action: 'Init' }
      })

      for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
          const comp = arr[i] < arr[j]
          newSteps.push({
            arr: [...arr],
            count: [...count],
            sorted: [...sorted],
            i, j,
            comparing: [i, j],
            line: 3,
            desc: `Compare A[${i}] (${arr[i]}) and A[${j}] (${arr[j]}).`,
            vars: { i, j, valI: arr[i], valJ: arr[j], comparison: `${arr[i]} < ${arr[j]}`, action: comp ? `Count[${j}]++` : `Count[${i}]++` }
          })
          if (comp) {
            count[j]++
          } else {
            count[i]++
          }
          newSteps.push({
            arr: [...arr],
            count: [...count],
            sorted: [...sorted],
            i, j,
            line: 4,
            desc: `Updated counts: ${JSON.stringify(count)}`,
            vars: { i, j, valI: arr[i], valJ: arr[j], comparison: '-', action: 'Update Count' }
          })
        }
      }

      for (let i = 0; i < n; i++) {
        const finalPos = count[i]
        sorted[finalPos] = arr[i]
        newSteps.push({
          arr: [...arr],
          count: [...count],
          sorted: [...sorted],
          i,
          active: [i],
          activeSorted: [finalPos],
          line: 5,
          desc: `Place A[${i}] (${arr[i]}) at Sorted index Count[${i}] = ${finalPos}.`,
          vars: { i, j: '-', valI: arr[i], valJ: '-', comparison: '-', action: `S[${finalPos}] = ${arr[i]}` }
        })
      }
      setSteps(newSteps)
    }
    else if (algorithm === 'horspoolSearch') {
      const text = "STING_IN_A_STRING_MATCH"
      const pattern = targetKey || "STRING"
      const n = text.length
      const m = pattern.length

      // Shift Table
      const shiftTable = {}
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_"
      for (const char of alphabet) {
        shiftTable[char] = m
      }
      for (let j = 0; j < m - 1; j++) {
        shiftTable[pattern[j]] = m - 1 - j
      }

      newSteps.push({
        text, pattern, shiftTable: { ...shiftTable },
        i: m - 1, k: 0,
        line: 0,
        desc: `Horspool Search for "${pattern}" in "${text}". Shift Table constructed.`,
        vars: { i: m - 1, k: 0, charT: text[m - 1], charP: pattern[m - 1], action: 'Start' }
      })

      let i = m - 1
      while (i <= n - 1) {
        let k = 0
        while (k <= m - 1 && pattern[m - 1 - k] === text[i - k]) {
          newSteps.push({
            text, pattern, i, k,
            comparing: [i - k],
            line: 4,
            desc: `Compare T[${i - k}] ('${text[i - k]}') with P[${m - 1 - k}] ('${pattern[m - 1 - k]}') - Match!`,
            vars: { i, k, charT: text[i - k], charP: pattern[m - 1 - k], action: 'Compare' }
          })
          k++
        }

        if (k === m) {
          newSteps.push({
            text, pattern, i, k: m,
            matched: Array.from({ length: m }, (_, idx) => i - m + 1 + idx),
            line: 5,
            desc: `Pattern found starting at index ${i - m + 1}!`,
            vars: { i, k: m, charT: '-', charP: '-', action: 'Found!' }
          })
          break
        } else {
          const charAtLast = text[i]
          const shiftVal = shiftTable[charAtLast] || m
          newSteps.push({
            text, pattern, i, k,
            comparing: [i - k],
            line: 4,
            desc: `Mismatch at T[${i - k}]. Look at T[${i}] ('${text[i]}') in shift table: ${shiftVal}.`,
            vars: { i, k, charT: text[i - k], charP: pattern[m - 1 - k], action: 'Mismatch' }
          })
          
          const oldI = i
          i += shiftVal
          newSteps.push({
            text, pattern, i: i < n ? i : oldI, k: 0,
            line: 6,
            desc: `Shift pattern forward by ${shiftVal} positions.`,
            vars: { i: i < n ? i : oldI, k: 0, charT: '-', charP: '-', action: `Shift ${shiftVal}` }
          })
        }
      }
      setSteps(newSteps)
    }
    else if (algorithm === 'comparisonCountingSort') {
      const arr = [62, 31, 84, 96, 19, 47]
      const n = arr.length
      const counts = Array(n).fill(0)
      const sortedArr = Array(n).fill(null)
      
      newSteps.push({
        counts: [...counts],
        sortedArr: [...sortedArr],
        activeIdx: -1,
        line: 0,
        desc: `Initialize Counts array with 0s. Input: [${arr.join(', ')}]`,
        vars: { i: '-', j: '-', action: 'Init' }
      })

      for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
          let action = `Compare A[${i}](${arr[i]}) and A[${j}](${arr[j]})`
          if (arr[i] < arr[j]) {
            counts[j]++
            action += `. A[j] is bigger, increment Count[${j}] to ${counts[j]}`
          } else {
            counts[i]++
            action += `. A[i] is bigger, increment Count[${i}] to ${counts[i]}`
          }
          newSteps.push({
            counts: [...counts],
            sortedArr: [...sortedArr],
            activeIdx: i,
            activeJ: j,
            line: 4,
            desc: action,
            vars: { i, j, action: 'Comparing' }
          })
        }
      }

      for (let i = 0; i < n; i++) {
        sortedArr[counts[i]] = arr[i]
        newSteps.push({
          counts: [...counts],
          sortedArr: [...sortedArr],
          activeIdx: i,
          line: 5,
          desc: `Place A[${i}](${arr[i]}) at Sorted[Count[${i}]] (position ${counts[i]}).`,
          vars: { i, j: '-', action: `Placing ${arr[i]}` }
        })
      }
      setSteps(newSteps)
    }
    else if (algorithm === 'horspoolSearch') {
      const text = "JIM_SAW_ME_IN_A_BARBERSHOP"
      const pattern = targetKey || "BARBER"
      const n = text.length
      const m = pattern.length
      
      // Build shift table
      const shiftTable = {}
      for (let i = 0; i < 256; i++) shiftTable[String.fromCharCode(i)] = m
      for (let j = 0; j < m - 1; j++) shiftTable[pattern[j]] = m - 1 - j

      let i = m - 1
      newSteps.push({
        text, pattern, i, k: 0,
        line: 1,
        desc: `Align pattern at the start. Tail at text index ${i} ('${text[i]}').`,
        vars: { i, k: 0, charT: text[i], charP: pattern[m-1], action: 'Align' }
      })

      while (i <= n - 1) {
        let k = 0
        while (k <= m - 1 && pattern[m - 1 - k] === text[i - k]) {
          k++
          newSteps.push({
            text, pattern, i, k,
            line: 4,
            desc: `Character match: '${text[i-k+1]}'. Checking next character to the left...`,
            vars: { i, k, charT: text[i-k+1], charP: pattern[m-1-k+1], action: 'Match' }
          })
        }

        if (k === m) {
          newSteps.push({
            text, pattern, i, k,
            line: 5,
            desc: `Full match found at position ${i - m + 1}!`,
            vars: { i, k, charT: text[i-k+1], charP: pattern[0], action: 'FOUND' }
          })
          break
        } else {
          const shiftVal = shiftTable[text[i]]
          newSteps.push({
            text, pattern, i, k,
            line: 6,
            desc: `Mismatch! '${text[i-k]}' vs '${pattern[m-1-k]}'. Shift table for tail '${text[i]}' is ${shiftVal}.`,
            vars: { i, k, charT: text[i-k], charP: pattern[m-1-k], action: 'Shift' }
          })
          i += shiftVal
          if (i < n) {
            newSteps.push({
              text, pattern, i, k: 0,
              line: 1,
              desc: `Shift pattern forward to new tail at index ${i} ('${text[i]}').`,
              vars: { i, k: 0, charT: text[i], charP: pattern[m-1], action: 'Align' }
            })
          }
        }
      }
      setSteps(newSteps)
    }
    else if (algorithm === 'hashing') {
      const mode = targetKey === 'chaining' ? 'chaining' : 'probing'
      const size = 7
      const keys = [12, 19, 5, 26, 13]
      
      const table = Array(size).fill(null).map(() => mode === 'chaining' ? [] : null)
      
      newSteps.push({
        table: table.map(row => Array.isArray(row) ? [...row] : row),
        mode,
        line: 0,
        desc: `Initialize empty ${mode} hash table of size ${size}. Keys: ${keys.join(', ')}`,
        vars: { key: '-', hash: '-', index: '-', action: 'Init' }
      })

      keys.forEach(key => {
        const hash = key % size
        newSteps.push({
          table: table.map(row => Array.isArray(row) ? [...row] : row),
          mode,
          activeKey: key,
          line: 0,
          desc: `Insert key ${key}. Hash = ${key} % ${size} = ${hash}.`,
          vars: { key, hash, index: '-', action: 'Compute Hash' }
        })

        if (mode === 'chaining') {
          table[hash].push(key)
          newSteps.push({
            table: table.map(row => Array.isArray(row) ? [...row] : row),
            mode,
            activeIdx: hash,
            line: 2,
            desc: `Append ${key} to list at index ${hash}.`,
            vars: { key, hash, index: hash, action: 'Chain' }
          })
        } else {
          let idx = hash
          let collisions = 0
          while (table[idx] !== null) {
            newSteps.push({
              table: table.map(row => Array.isArray(row) ? [...row] : row),
              mode,
              activeIdx: idx,
              colliding: true,
              line: 3,
              desc: `Slot ${idx} occupied. Collision!`,
              vars: { key, hash, index: idx, action: 'Collision' }
            })
            idx = (idx + 1) % size
            collisions++
          }
          table[idx] = key
          newSteps.push({
            table: table.map(row => Array.isArray(row) ? [...row] : row),
            mode,
            activeIdx: idx,
            line: 3,
            desc: `Found empty slot at ${idx}. Insert ${key}.`,
            vars: { key, hash, index: idx, action: 'Insert' }
          })
        }
      })
      setSteps(newSteps)
    }
  }, [algorithm, targetKey])

  const currentStep = steps[currentStepIdx] || { arr: [], desc: "" }
  const codeLines = PSEUDOCODE[algorithm] || []

  // Stepper functions
  const handleStepForward = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(c => c + 1)
    }
  }

  const handleStepBackward = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(c => c - 1)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStepIdx(0)
  }

  // Trace table configuration
  const getTraceTableHeaders = () => {
    switch (algorithm) {
      case 'bubbleSort':
        return ['Step', 'i', 'j', 'Comparison (A[j] > A[j+1])', 'Swapped?', 'Array State']
      case 'selectionSort':
        return ['Step', 'i', 'min_idx', 'j', 'Comparison (A[j] < A[min])', 'Action', 'Array State']
      case 'insertionSort':
        return ['Step', 'i', 'v', 'j', 'While Condition', 'Action', 'Array State']
      case 'binarySearch':
        return ['Step', 'low', 'high', 'mid', 'A[mid]', 'Comparison', 'Action']
      case 'stringMatching':
        return ['Step', 'i (align)', 'j (match)', 'Comparison (T[i+j] == P[j])', 'Result']
      case 'euclidGcd':
        return ['Step', 'm', 'n', 'Remainder (m % n)', 'Action']
      case 'sieveEratosthenes':
        return ['Step', 'p', 'Multiples Checked', 'Action']
      case 'bigOCurves':
        return ['Step', 'n', 'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)']
      case 'quickSort':
        return ['Step', 'Pivot', 'i (left)', 'j (right)', 'Action', 'Array State']
      case 'mergeSort':
        return ['Step', 'Recursion Level', 'Partition splits', 'Action', 'Array State']
      case 'hashingProbing':
        return ['Step', 'Value', 'Initial Hash', 'Collisions', 'Target Slot']
      case 'knapsackDP':
        return ['Step', 'Item', 'Capacity w', 'DP Grid Value', 'Decision / Formula']
      case 'dfs':
        return ['Step', 'Current Node', 'Neighbor', 'Stack', 'Visited']
      case 'bfs':
        return ['Step', 'Current Node', 'Neighbor', 'Queue', 'Visited']
      case 'sourceRemoval':
        return ['Step', 'Current Node', 'Neighbor', 'Queue', 'Sorted List', 'In-Degrees']
      case 'prims':
        return ['Step', 'Vertices in T', 'Min Edge', 'Weight']
      case 'kruskals':
        return ['Step', 'Edge', 'Weight', 'Action', 'Disjoint Sets']
      case 'comparisonCountingSort':
        return ['Step', 'i', 'j', 'Comparison (A[i] < A[j])', 'Action', 'Counts']
      case 'horspoolSearch':
        return ['Step', 'i (align)', 'k (match)', 'Comparison (T[i-k] == P[m-1-k])', 'Action']
      case 'hashing':
        return ['Step', 'Key', 'Hash', 'Target Slot', 'Action']
      default:
        return []
    }
  }

  const getTraceRowData = (step, idx) => {
    const v = step.vars || {}
    switch (algorithm) {
      case 'bubbleSort':
        return [idx, v.i, v.j, v.comparing, v.swapped, v.arrStr]
      case 'selectionSort':
        return [idx, v.i, v.minIdx, v.j, v.comparing, v.action, v.arrStr]
      case 'insertionSort':
        return [idx, v.i, v.v, v.j, v.condition, v.action, v.arrStr]
      case 'binarySearch':
        return [idx, v.low, v.high, v.mid, v.valAtMid, v.comparison, v.action]
      case 'stringMatching':
        return [idx, v.i, v.j, v.comparing, v.result]
      case 'euclidGcd':
        return [idx, v.m, v.n, v.r, v.action]
      case 'sieveEratosthenes':
        return [idx, v.p, v.multiples, v.action]
      case 'bigOCurves':
        return [idx, v.n, v['O(1)'], v['O(log n)'], v['O(n)'], v['O(n log n)'], v['O(n^2)'], v['O(2^n)']]
      case 'quickSort':
        return [idx, v.pivot, v.i, v.j, v.action, v.arrStr]
      case 'mergeSort':
        return [idx, v.level, v.split, v.action, v.arrStr]
      case 'hashingProbing':
        return [idx, v.val, v.hash, v.collisions, v.index]
      case 'knapsackDP':
        return [idx, v.item, v.cap, v.val, v.decision]
      case 'dfs':
        return [idx, v.node, v.neighbor, v.stack, v.visited]
      case 'bfs':
        return [idx, v.node, v.neighbor, v.queue, v.visited]
      case 'sourceRemoval':
        return [idx, v.node, v.neighbor, v.queue, v.sorted, v.inDegree]
      case 'prims':
        return [idx, v.inT, v.minEdge, v.weight]
      case 'kruskals':
        return [idx, v.edge, v.weight, v.action, v.sets]
      case 'comparisonCountingSort':
        return [idx, v.i, v.j, v.comparison, v.action, JSON.stringify(step.counts)]
      case 'horspoolSearch':
        return [idx, v.i, v.k, v.charT + ' == ' + v.charP, v.action]
      case 'hashing':
        return [idx, v.key, v.hash, v.index, v.action]
      default:
        return []
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.visualizerArea}>
        {/* Render Comparison Counting Sort */}
        {algorithm === 'comparisonCountingSort' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', alignItems: 'center' }}>
            <div className={styles.arrayContainer}>
              {currentStep.arr?.map((val, idx) => (
                <div key={idx} className={styles.barWrap}>
                  <div 
                    className={`${styles.bar} ${currentStep.comparing?.includes(idx) ? styles.barComparing : currentStep.active?.includes(idx) ? styles.barSorted : styles.barNormal}`}
                    style={{ height: `${val}px` }}
                  >
                    <span className={styles.barVal}>{val}</span>
                  </div>
                  <span className={styles.barIdx}>{idx}</span>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)' }}>Counts:</span>
              {currentStep.count?.map((c, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '4px', fontSize: '12px', fontWeight: '750', color: 'var(--accent-purple)' }}>
                    {c}
                  </div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>i={idx}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)' }}>Sorted:</span>
              {currentStep.sorted?.map((val, idx) => (
                <div key={idx} style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: currentStep.activeSorted?.includes(idx) ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-surface)', border: '1px solid', borderColor: currentStep.activeSorted?.includes(idx) ? '#10b981' : 'var(--border-subtle)', borderRadius: '4px', fontSize: '13px', fontWeight: '750' }}>
                  {val !== null ? val : '-'}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Horspool Search Visualizer */}
        {algorithm === 'horspoolSearch' && (
          <div className={styles.stringContainer}>
            <div className={styles.textString}>
              <span className={styles.rowLabel}>Text:</span>
              {currentStep.text?.split('').map((char, idx) => {
                let matchClass = ''
                if (currentStep.comparing?.includes(idx)) matchClass = styles.charComparing
                if (currentStep.matched?.includes(idx)) matchClass = styles.charMatched
                return (
                  <span key={idx} className={`${styles.charBox} ${matchClass}`}>
                    {char}
                    <span className={styles.charIdx}>{idx}</span>
                  </span>
                )
              })}
            </div>
            
            <div 
              className={styles.patternString}
              style={{ marginLeft: `${(currentStep.i - currentStep.pattern?.length + 1) * 36 + 65}px`, transition: 'margin-left 0.3s ease' }}
            >
              <span className={styles.rowLabelPattern}>Pattern:</span>
              {currentStep.pattern?.split('').map((char, idx) => {
                let matchClass = ''
                // Check if this character of pattern is currently being compared
                const patternIdxBeingCompared = currentStep.pattern.length - 1 - currentStep.k
                if (idx === patternIdxBeingCompared && currentStep.comparing?.length > 0) matchClass = styles.charComparing
                if (idx > patternIdxBeingCompared) matchClass = styles.charMatched
                if (currentStep.k === currentStep.pattern.length) matchClass = styles.charMatched

                return (
                  <span key={idx} className={`${styles.charBoxPattern} ${matchClass}`}>
                    {char}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Render Hashing (Probing & Chaining) */}
        {algorithm === 'hashing' && (
          <div style={{ display: 'flex', gap: '40px', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h5 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Hash Table ({currentStep.mode})</h5>
              {currentStep.table?.map((val, idx) => {
                let slotStyle = { border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }
                if (idx === currentStep.activeIdx) {
                  if (currentStep.colliding) {
                    slotStyle = { border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.1)' }
                  } else {
                    slotStyle = { border: '1px solid var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)' }
                  }
                }
                
                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div 
                      style={{
                        display: 'flex',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontFamily: 'var(--font-code)',
                        width: '120px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        ...slotStyle
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>[{idx}]</span>
                      {currentStep.mode === 'probing' && (
                        <span style={{ fontWeight: '750', color: val ? 'var(--text-primary)' : 'rgba(255,255,255,0.05)' }}>{val || '-'}</span>
                      )}
                    </div>
                    {currentStep.mode === 'chaining' && (
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        {val.map((item, iIdx) => (
                          <div key={iIdx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ background: 'var(--accent-purple)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '750', fontFamily: 'var(--font-code)' }}>{item}</div>
                            {iIdx < val.length - 1 && <span style={{ color: 'var(--text-muted)' }}>→</span>}
                          </div>
                        ))}
                        {val.length === 0 && <span style={{ color: 'rgba(255,255,255,0.05)', fontSize: '11px' }}>null</span>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Render Array for Sorting, Binary Search, and Quick Sort */}
        {(algorithm.includes('Sort') || algorithm === 'binarySearch') && (
          <div className={styles.arrayContainer}>
            {currentStep.arr?.map((val, idx) => {
              // Color styles
              let statusClass = styles.barNormal
              if (algorithm === 'binarySearch') {
                if (idx === currentStep.mid) statusClass = styles.barMid
                else if (idx >= currentStep.low && idx <= currentStep.high) statusClass = styles.barRange
                if (currentStep.active?.includes(idx)) statusClass = styles.barSorted
              } else if (algorithm === 'quickSort') {
                if (idx === currentStep.pivotIdx) statusClass = styles.barMin // gold
                else if (idx === currentStep.i) statusClass = styles.barComparing // cyan
                else if (idx === currentStep.j) statusClass = styles.barSwapping // purple
                if (currentStep.swapping?.includes(idx)) statusClass = styles.barSorted // green
              } else {
                if (currentStep.comparing?.includes(idx)) statusClass = styles.barComparing
                else if (currentStep.swapping?.includes(idx)) statusClass = styles.barSwapping
                else if (currentStep.sorted?.includes(idx)) statusClass = styles.barSorted
                else if (currentStep.active?.includes(idx)) statusClass = styles.barMin
              }

              return (
                <div key={idx} className={styles.barWrap}>
                  <div 
                    className={`${styles.bar} ${statusClass}`}
                    style={{ height: `${val * 2}px` }}
                  >
                    <span className={styles.barVal}>{val}</span>
                  </div>
                  <span className={styles.barIdx}>{idx}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Render Merge Sort splits */}
        {algorithm === 'mergeSort' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {currentStep.splits?.length > 0 ? (
                currentStep.splits.map((sub, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', border: '1px solid var(--accent-purple)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', background: 'rgba(197, 160, 89, 0.05)', gap: '6px' }}>
                    {sub.map((v, vIdx) => (
                      <span key={vIdx} style={{ fontFamily: 'var(--font-code)', fontSize: '12px', fontWeight: '750', color: 'var(--text-primary)' }}>{v}</span>
                    ))}
                  </div>
                ))
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  {currentStep.arr?.map((v, vIdx) => (
                    <span key={vIdx} style={{ fontFamily: 'var(--font-code)', fontSize: '13px', fontWeight: '750', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', padding: '6px 12px', borderRadius: 'var(--radius-sm)' }}>{v}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Render String Matching Visualizer */}
        {algorithm === 'stringMatching' && (
          <div className={styles.stringContainer}>
            <div className={styles.textString}>
              <span className={styles.rowLabel}>Text:</span>
              {currentStep.text?.split('').map((char, idx) => {
                let matchClass = ''
                if (currentStep.comparing?.includes(idx)) matchClass = styles.charComparing
                if (currentStep.matched?.includes(idx)) matchClass = styles.charMatched
                return (
                  <span key={idx} className={`${styles.charBox} ${matchClass}`}>
                    {char}
                    <span className={styles.charIdx}>{idx}</span>
                  </span>
                )
              })}
            </div>
            
            <div 
              className={styles.patternString}
              style={{ marginLeft: `${(currentStep.i || 0) * 36 + 65}px`, transition: 'margin-left 0.3s ease' }}
            >
              <span className={styles.rowLabelPattern}>Pattern:</span>
              {currentStep.pattern?.split('').map((char, idx) => {
                let matchClass = ''
                if (idx < (currentStep.j || 0)) matchClass = styles.charMatched
                return (
                  <span key={idx} className={`${styles.charBoxPattern} ${matchClass}`}>
                    {char}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Render Euclid GCD */}
        {algorithm === 'euclidGcd' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '320px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>M:</span>
              <div style={{ background: 'var(--accent-blue)', height: '24px', borderRadius: '4px', width: `${(currentStep.m || 1) * 4}px`, transition: 'width 0.3s ease', display: 'flex', alignItems: 'center', paddingLeft: '8px', color: '#fff', fontSize: '10px', fontWeight: '700', fontFamily: 'var(--font-code)' }}>{currentStep.m}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>N:</span>
              <div style={{ background: 'var(--accent-purple)', height: '24px', borderRadius: '4px', width: `${(currentStep.n || 1) * 4}px`, transition: 'width 0.3s ease', display: 'flex', alignItems: 'center', paddingLeft: '8px', color: '#fff', fontSize: '10px', fontWeight: '700', fontFamily: 'var(--font-code)' }}>{currentStep.n}</div>
            </div>
            {currentStep.r !== '-' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>Remainder (R):</span>
                <div style={{ background: 'rgba(239, 68, 68, 0.4)', border: '1px solid #ef4444', height: '24px', borderRadius: '4px', width: `${(currentStep.r || 1) * 4}px`, transition: 'width 0.3s ease', display: 'flex', alignItems: 'center', paddingLeft: '8px', color: '#fff', fontSize: '10px', fontWeight: '700', fontFamily: 'var(--font-code)' }}>{currentStep.r}</div>
              </div>
            )}
          </div>
        )}

        {/* Render Sieve of Eratosthenes */}
        {algorithm === 'sieveEratosthenes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', width: '100%', maxWidth: '280px' }}>
            {currentStep.grid?.map((val, idx) => {
              if (idx < 2) return null
              let stateStyle = {}
              if (val) {
                if (idx === currentStep.p) {
                  stateStyle = { background: 'var(--accent-blue)', borderColor: 'var(--accent-blue)', color: '#fff' }
                } else {
                  stateStyle = { background: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981', color: '#10b981' }
                }
              } else {
                if (idx === currentStep.active) {
                  stateStyle = { background: 'rgba(239, 68, 68, 0.4)', borderColor: '#ef4444', color: '#fff', textDecoration: 'line-through' }
                } else {
                  stateStyle = { background: 'rgba(255, 255, 255, 0.02)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)', textDecoration: 'line-through', opacity: 0.4 }
                }
              }
              return (
                <div 
                  key={idx} 
                  style={{
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-code)',
                    fontSize: '11px',
                    fontWeight: '700',
                    border: '1px solid',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    ...stateStyle
                  }}
                >
                  {idx}
                </div>
              )
            })}
          </div>
        )}

        {/* Render Big-O Curves */}
        {algorithm === 'bigOCurves' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ background: '#08080f', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '16px', width: '100%', maxWidth: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)', marginBottom: '12px' }}>
                <span>Function Value (n = {currentStep.nVal})</span>
                <span>Complexity Rank</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'O(1) [Constant]', val: '1.00', color: '#10b981' },
                  { label: 'O(log n) [Logarithmic]', val: Math.log2(currentStep.nVal).toFixed(2), color: '#3b82f6' },
                  { label: 'O(n) [Linear]', val: currentStep.nVal.toFixed(2), color: '#06b6d4' },
                  { label: 'O(n log n) [Linearithmic]', val: (currentStep.nVal * Math.log2(currentStep.nVal)).toFixed(2), color: '#c5a059' },
                  { label: 'O(n^2) [Quadratic]', val: (currentStep.nVal * currentStep.nVal).toFixed(2), color: '#f59e0b' },
                  { label: 'O(2^n) [Exponential]', val: Math.pow(2, currentStep.nVal).toFixed(2), color: '#ef4444' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span style={{ color: item.color, fontWeight: '700' }}>{item.label}</span>
                    <span style={{ fontFamily: 'var(--font-code)', color: 'var(--text-secondary)' }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Render Hashing (Unified) */}
        {algorithm === 'hashing' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '30px', width: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
              {/* Keys Queue */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)' }}>QUEUE</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {currentStep.vars?.keys?.split(',').map((k, idx) => (
                    <div key={idx} style={{ 
                      padding: '4px 8px', 
                      background: 'var(--bg-surface)', 
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-code)',
                      color: k.trim() === String(currentStep.activeKey) ? 'var(--accent-cyan)' : 'var(--text-primary)',
                      borderColor: k.trim() === String(currentStep.activeKey) ? 'var(--accent-cyan)' : 'var(--border-subtle)'
                    }}>{k}</div>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)' }}>HASH TABLE (m={currentStep.table?.length})</span>
                {currentStep.table?.map((val, idx) => {
                  let slotStyle = { border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }
                  const isActive = idx === currentStep.activeIdx
                  if (isActive) {
                    if (currentStep.colliding) {
                      slotStyle = { border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.15)' }
                    } else {
                      slotStyle = { border: '1px solid var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.15)' }
                    }
                  }
                  return (
                    <div key={idx} style={{
                      display: 'flex',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-code)',
                      width: '200px',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...slotStyle
                    }}>
                      <span style={{ color: 'var(--text-muted)' }}>{idx}:</span>
                      {currentStep.mode === 'chaining' ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {val.map((item, iIdx) => (
                            <span key={iIdx} style={{ fontWeight: '700', background: 'rgba(59, 130, 246, 0.1)', padding: '0 4px', borderRadius: '2px' }}>{item}</span>
                          ))}
                          {val.length === 0 && <span style={{ color: 'rgba(255,255,255,0.1)' }}>null</span>}
                        </div>
                      ) : (
                        <span style={{ fontWeight: '700', color: val ? 'var(--text-primary)' : 'transparent' }}>{val || '-'}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Render Comparison Counting Sort */}
        {algorithm === 'comparisonCountingSort' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)' }}>COUNTS</span>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {currentStep.counts?.map((c, idx) => (
                  <div key={idx} style={{ 
                    width: '35px', height: '35px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: currentStep.activeIdx === idx ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-surface)',
                    border: '1px solid',
                    borderColor: currentStep.activeIdx === idx ? 'var(--accent-blue)' : 'var(--border-subtle)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-code)',
                    fontWeight: '700'
                  }}>{c}</div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)' }}>SORTED ARRAY</span>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {currentStep.sortedArr?.map((s, idx) => (
                  <div key={idx} style={{ 
                    width: '35px', height: '35px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: s ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface)',
                    border: '1px solid',
                    borderColor: s ? 'var(--color-success)' : 'var(--border-subtle)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-code)',
                    fontWeight: '700',
                    color: s ? 'var(--text-primary)' : 'transparent'
                  }}>{s || '-'}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Render Horspool Search */}
        {algorithm === 'horspoolSearch' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%', alignItems: 'center' }}>
            {/* Text Array */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)' }}>TEXT (n={currentStep.text?.length})</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                {currentStep.text?.split('').map((char, idx) => {
                  const isCurrentTail = idx === currentStep.i
                  const isInMatchWindow = idx <= currentStep.i && idx > currentStep.i - currentStep.pattern?.length
                  const isBeingCompared = isInMatchWindow && idx > currentStep.i - 1 - currentStep.k
                  
                  let cellStyle = { background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }
                  if (isCurrentTail) cellStyle = { background: 'rgba(234, 179, 8, 0.2)', border: '1px solid var(--accent-yellow)' }
                  else if (isBeingCompared) cellStyle = { background: 'rgba(59, 130, 246, 0.2)', border: '1px solid var(--accent-blue)' }

                  return (
                    <div key={idx} style={{
                      width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontFamily: 'var(--font-code)', fontWeight: '600',
                      borderRadius: '2px', ...cellStyle
                    }}>{char === ' ' ? '␣' : char}</div>
                  )
                })}
              </div>
            </div>

            {/* Pattern Visualization */}
            <div style={{ position: 'relative', height: '40px', width: '100%' }}>
              <div style={{ 
                position: 'absolute', 
                left: `${(currentStep.i - currentStep.pattern?.length + 1) * 24}px`,
                display: 'flex', gap: '2px', transition: 'all 0.3s ease'
              }}>
                {currentStep.pattern?.split('').map((char, idx) => (
                  <div key={idx} style={{
                    width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontFamily: 'var(--font-code)', fontWeight: '700',
                    background: 'var(--bg-elevated)', border: '2px solid var(--accent-purple)',
                    borderRadius: '2px', color: 'var(--accent-purple)'
                  }}>{char}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Render Knapsack DP Grid */}
        {algorithm === 'knapsackDP' && (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--font-code)', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#08080f' }}>
                  <th style={{ border: '1px solid var(--border-subtle)', padding: '6px 10px', color: 'var(--text-muted)' }}>Item \ W</th>
                  {[0, 1, 2, 3].map(w => (
                    <th key={w} style={{ border: '1px solid var(--border-subtle)', padding: '6px 10px', color: 'var(--text-muted)', textAlign: 'center' }}>w={w}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentStep.dp?.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td style={{ border: '1px solid var(--border-subtle)', padding: '6px 10px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                      {rIdx === 0 ? 'Base V[0]' : `Item ${rIdx}`}
                    </td>
                    {row.map((val, cIdx) => {
                      const isActive = currentStep.activeCell && currentStep.activeCell[0] === rIdx && currentStep.activeCell[1] === cIdx
                      return (
                        <td 
                          key={cIdx} 
                          style={{
                            border: '1px solid var(--border-subtle)',
                            padding: '8px 12px',
                            textAlign: 'center',
                            fontWeight: isActive ? '750' : '500',
                            background: isActive ? 'rgba(197, 160, 89, 0.15)' : 'var(--bg-surface)',
                            borderColor: isActive ? 'var(--accent-purple)' : 'var(--border-subtle)',
                            color: isActive ? 'var(--accent-purple)' : 'var(--text-primary)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {val}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Render Graph Visualizer */}
        {['dfs', 'bfs', 'sourceRemoval', 'prims', 'kruskals'].includes(algorithm) && currentStep.graph && (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '400px', position: 'relative' }}>
            <svg width="300" height="400" style={{ overflow: 'visible' }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-muted)" />
                </marker>
                <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-cyan)" />
                </marker>
              </defs>
              {/* Edges */}
              {currentStep.graph.edges.map((e, idx) => {
                const uNode = currentStep.graph.nodes.find(n => n.id === e.u)
                const vNode = currentStep.graph.nodes.find(n => n.id === e.v)
                
                let isMstEdge = currentStep.mstEdges?.some(mstE => (mstE.u === e.u && mstE.v === e.v) || (mstE.u === e.v && mstE.v === e.u))
                let isActiveEdge = currentStep.activeEdge && ((currentStep.activeEdge.u === e.u && currentStep.activeEdge.v === e.v) || (!currentStep.graph.directed && currentStep.activeEdge.u === e.v && currentStep.activeEdge.v === e.u))
                let isRemovedEdge = currentStep.removedEdges?.some(re => re.u === e.u && re.v === e.v)
                
                let strokeColor = 'var(--border-subtle)'
                let strokeWidth = 2
                let markerEnd = currentStep.graph.directed ? 'url(#arrowhead)' : ''
                
                if (isRemovedEdge) {
                  strokeColor = 'transparent'
                  markerEnd = ''
                } else if (isActiveEdge) {
                  strokeColor = 'var(--accent-cyan)'
                  strokeWidth = 3
                  if (currentStep.graph.directed) markerEnd = 'url(#arrowhead-active)'
                } else if (isMstEdge) {
                  strokeColor = 'var(--accent-purple)'
                  strokeWidth = 3
                }
                
                return (
                  <g key={idx}>
                    <line 
                      x1={uNode.x} y1={uNode.y} 
                      x2={vNode.x} y2={vNode.y} 
                      stroke={strokeColor} 
                      strokeWidth={strokeWidth}
                      markerEnd={markerEnd}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    {currentStep.graph.weighted && !isRemovedEdge && (
                      <text 
                        x={(uNode.x + vNode.x) / 2} 
                        y={(uNode.y + vNode.y) / 2 - 5} 
                        fill={isActiveEdge || isMstEdge ? 'var(--text-primary)' : 'var(--text-muted)'}
                        fontSize="12"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        {e.w}
                      </text>
                    )}
                  </g>
                )
              })}
              {/* Nodes */}
              {currentStep.graph.nodes.map((n, idx) => {
                let isVisited = currentStep.visited?.includes(n.id) || currentStep.inT?.includes(n.id)
                let isActive = currentStep.activeNode === n.id
                let isRemoved = currentStep.removedNodes?.includes(n.id)
                
                let fill = 'var(--bg-surface)'
                let stroke = 'var(--border-subtle)'
                let color = 'var(--text-primary)'
                
                if (isRemoved) {
                  fill = 'transparent'
                  stroke = 'transparent'
                  color = 'transparent'
                } else if (isActive) {
                  fill = 'rgba(6, 182, 212, 0.2)'
                  stroke = 'var(--accent-cyan)'
                } else if (isVisited) {
                  fill = 'rgba(16, 185, 129, 0.2)'
                  stroke = '#10b981'
                }
                
                return (
                  <g key={idx} style={{ transition: 'all 0.3s ease' }}>
                    <circle 
                      cx={n.x} cy={n.y} r="16" 
                      fill={fill} 
                      stroke={stroke} 
                      strokeWidth="2"
                    />
                    <text 
                      x={n.x} y={n.y + 4} 
                      fill={color} 
                      fontSize="12" 
                      fontWeight="700" 
                      textAnchor="middle"
                      fontFamily="var(--font-code)"
                    >
                      {n.id}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        )}
      </div>

      {/* Description and Pseudocode panel */}
      <div className={styles.controlPanel}>
        <div className={styles.descPanel}>
          <h4 className={styles.panelTitle}>💡 Step Description</h4>
          <p className={styles.stepDesc}>{currentStep.desc}</p>
          
          {/* Simulation Controls */}
          <div className={styles.playbackControls}>
            <button className="btn btn-outline" onClick={handleReset}>Reset</button>
            <button className="btn btn-outline" onClick={handleStepBackward} disabled={currentStepIdx === 0}>◀ Step</button>
            <button 
              className="btn btn-primary" 
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button className="btn btn-outline" onClick={handleStepForward} disabled={currentStepIdx === steps.length - 1}>Step ▶</button>
          </div>

          {/* Speed slider */}
          <div className={styles.speedSliderWrap}>
            <label className={styles.sliderLabel}>Animation Speed:</label>
            <input 
              type="range" 
              min="150" 
              max="1500" 
              value={1650 - speed} 
              onChange={(e) => setSpeed(1650 - parseInt(e.target.value))}
              className={styles.speedSlider}
            />
          </div>
        </div>

        <div className={styles.codePanel}>
          <h4 className={styles.panelTitle}>💻 Algorithm Code</h4>
          <div className={styles.codeLines}>
            {codeLines.map((line, idx) => (
              <div 
                key={idx} 
                className={`${styles.codeLine} ${currentStep.line === idx ? styles.activeCodeLine : ''}`}
              >
                <span className={styles.lineNumber}>{idx + 1}</span>
                <span className={styles.lineText}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Variable Trace Table */}
      {steps.length > 0 && (
        <div className={styles.tracePanel}>
          <h4 className={styles.panelTitle}>📊 Variable Trace Table (Execution History)</h4>
          <div className={styles.traceTableWrapper}>
            <table className={styles.traceTable}>
              <thead>
                <tr>
                  {getTraceTableHeaders().map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {steps.map((step, idx) => {
                  const isCurrent = idx === currentStepIdx
                  const rowData = getTraceRowData(step, idx)
                  return (
                    <tr 
                      key={idx} 
                      className={isCurrent ? styles.activeTraceRow : ''}
                      ref={isCurrent ? traceTableEndRef : null}
                    >
                      {rowData.map((val, cellIdx) => (
                        <td key={cellIdx} className={cellIdx === 0 ? styles.stepNumCell : ''}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
