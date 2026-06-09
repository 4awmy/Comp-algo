# AGENTS.md — Agent Instructions for Computing Algorithms Portal

> **READ THIS ENTIRE FILE BEFORE WRITING ANY CODE.**
> This document is for AI agents (GitHub Copilot, Codex, etc.) working on the `Comp-algo` project.

---

## 1. Project Overview

This is a **React + Vite** web application — a premium interactive textbook for a Computing Algorithms university course. It uses **vanilla CSS (CSS Modules)** — **NOT Tailwind CSS**. Do not use Tailwind utility classes anywhere.

**Live site:** https://4awmy.github.io/Comp-algo/

---

## 2. The Golden Rules (NEVER VIOLATE)

1. **DO NOT remove or replace any existing bespoke tracer components.** They are the core value of this project.
2. **DO NOT use Tailwind CSS classes** (e.g., `flex`, `gap-2`, `absolute`, `-top-6`, `text-[10px]`). Use inline styles or CSS Module classes only.
3. **DO NOT import from `SharedTracers.module.css`** in new tracer files — import from `Bespoke.module.css` instead.
4. **DO NOT use `react-katex`'s `<InlineMath>`** directly. Always use the `<MathBlock />` wrapper component.
5. **DO NOT use plain text for math** — all Big-O, Theta, Omega, sums, and formulas must use `<MathBlock math="..." />`.
6. **NEVER change `src/App.jsx` routing** without first checking the existing `LecturePageRoute` resolver pattern.
7. **DO NOT build or deploy** — the maintainer handles that. Only edit source files.

---

## 3. Directory Structure

```
src/
├── App.jsx                              ← Routing — add new lecture routes here
├── data/
│   └── lectures.js                     ← Lecture metadata (titles, topics, etc.)
├── pages/
│   └── lectures/
│       ├── Lec01.jsx  …  Lec13.jsx     ← Premium lecture pages (YOUR WORK GOES HERE)
│       └── CheatSheetPage.jsx          ← Add complexity anchors here
├── components/
│   ├── ui/Premium/
│   │   ├── Premium.module.css          ← Shared layout styles (lessonSection, infoCard, etc.)
│   │   ├── LessonHero.jsx              ← Page hero component
│   │   ├── MathBlock.jsx               ← KaTeX math renderer — ALWAYS use this
│   │   ├── AlgorithmCard.jsx           ← Complexity card component
│   │   └── VisualStage.jsx             ← Container for tracer components
│   └── visualization/bespoke/
│       ├── Bespoke.module.css          ← Tracer-specific styles (dualPane, codePane, etc.)
│       └── [TracerName]Tracer.jsx      ← Self-contained algorithm visualizers
```

---

## 4. Lecture Page Architecture (Follow Lec11.jsx as the Gold Standard)

Every lecture page must follow this exact structure:

```jsx
import React from 'react';
import LessonHero from '../../components/ui/Premium/LessonHero';
import MathBlock from '../../components/ui/Premium/MathBlock';
import AlgorithmCard from '../../components/ui/Premium/AlgorithmCard';
import SomeTracer from '../../components/visualization/bespoke/SomeTracer';
import styles from '../../components/ui/Premium/Premium.module.css';

const LecXX = () => {
  return (
    <div className={styles.premiumPage}>
      <LessonHero
        tag="Lecture XX"
        title="Lecture Title"
        subtitle="One sentence describing the lecture's core idea."
      />
      <div className={styles.contentWrapper}>

        {/* 1. Intro section */}
        <section className={styles.lessonSection}>
          <p className={`${styles.editorialText} ${styles.dropCap}`}>
            Opening paragraph...
          </p>
        </section>

        {/* 2. Algorithm sections */}
        <section id="algorithm-name" className={styles.lessonSection}>
          <h2 className={styles.sectionTitle}>N. Algorithm Name</h2>
          <p className={styles.editorialText}>Explanation...</p>

          {/* Complexity Card */}
          <AlgorithmCard
            title="Algorithm Name"
            goal="What the algorithm does."
            steps={[
              "Step 1...",
              "Step 2...",
            ]}
            complexity={{
              time: "\\Theta(n^2)",   // LaTeX — double-escaped backslashes required
              space: "\\Theta(n)"
            }}
          />

          {/* Tracer */}
          <SomeTracer style={{ margin: '2.5rem 0' }} />

          {/* Complexity Analysis Card */}
          <div id="algorithm-name-complexity" className={styles.infoCard} style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-success)' }}>
            <h4 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Algorithm Name Time Complexity Analysis</h4>
            <p className={styles.editorialText}>...</p>
            <MathBlock block math="T(n) = \\sum_{i=0}^{n-1} ..." />
          </div>
        </section>

      </div>
    </div>
  );
};

export default LecXX;
```

---

## 5. Critical: LaTeX / Math Notation Rules

**Always use double-escaped backslashes** in JSX string props (the string gets parsed twice — once by JS, once by KaTeX):

| You want to render | Write in JSX |
|---|---|
| `\Theta(n^2)` | `"\\Theta(n^2)"` |
| `\sum_{i=0}^{n}` | `"\\sum_{i=0}^{n}"` |
| `\lfloor n/2 \rfloor` | `"\\lfloor n/2 \\rfloor"` |
| `\le`, `\ge`, `\neq` | `"\\le"`, `"\\ge"`, `"\\neq"` |
| `\log_2 n` | `"\\log_2 n"` |
| `O(n \log n)` | `"O(n \\log n)"` |

**Inline vs Block math:**
```jsx
<MathBlock math="n^2" />              // inline — use for symbols within sentences
<MathBlock block math="T(n) = ..." />  // display block — use for full equations
```

---

## 6. AlgorithmCard Component

Used to display pseudocode steps + complexity badges for each algorithm:

```jsx
<AlgorithmCard
  title="Algorithm Name"
  goal="Short description of what the algorithm does."
  steps={[
    "Line 1 of pseudocode",
    "Line 2 — do not use numbers, they are auto-generated",
    "  Indented lines use leading spaces",
  ]}
  complexity={{
    time: "\\Theta(n^2)",     // Big-Theta preferred; use O if only worst-case known
    space: "\\Theta(n)"
  }}
/>
```

The `AlgorithmCard` is NOT the tracer — it's the static description card shown above the interactive tracer.

---

## 7. Bespoke Tracer Architecture

Each tracer is a self-contained React component in `src/components/visualization/bespoke/`.

### Structure of a tracer:

```jsx
import { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';   // ← ALWAYS import Bespoke, not SharedTracers

const MyAlgorithmTracer = ({ style }) => {
  // 1. Pre-calculate all steps using useMemo for smooth scrubbing
  const steps = useMemo(() => {
    const result = [];
    // ... simulate algorithm, push step snapshots
    return result;
  }, []);

  const [stepIdx, setStepIdx] = useState(0);
  const step = steps[stepIdx];

  // 2. Controls
  const actions = (
    <div className={styles.controls}>
      <button onClick={() => setStepIdx(i => Math.max(0, i - 1))}>Prev</button>
      <button onClick={() => setStepIdx(i => Math.min(steps.length - 1, i + 1))}>Next</button>
    </div>
  );

  return (
    <VisualStage style={style} title="Algorithm Name" description={step.description} actions={actions}>
      <div className={styles.dualPane}>
        {/* Code pane with highlighted active line */}
        <div className={styles.codePane}>
          <div className={styles.codeHeader}>Pseudocode</div>
          {CODE_LINES.map((line, idx) => (
            <span key={idx} className={`${styles.codeLine} ${step.line === idx ? styles.codeLineActive : ''}`}>
              {line}
            </span>
          ))}
        </div>

        {/* Visual pane */}
        <div className={styles.vizPane}>
          {/* SVG or HTML visualization */}
        </div>
      </div>
    </VisualStage>
  );
};

export default MyAlgorithmTracer;
```

### Available CSS classes in `Bespoke.module.css`:
- **Layout:** `dualPane`, `codePane`, `vizPane`, `codeHeader`, `controls`
- **Code highlighting:** `codeLine`, `codeLineActive`
- **Array elements:** `charBox`, `element`, `sorted`, `current`, `minimum`, `match`, `mismatch`, `active`
- **Hash table:** `hashSlot`, `slotIndex`, `slotContent`, `hashItem`, `chainNode`
- **String matching:** `searchStage`, `textRow`, `patternRow`, `textChar`, `patternChar`
- **Styling states:** `active`, `match`, `mismatch`, `sorted`

### Index labels above character boxes (NO TAILWIND):
```jsx
// ✅ CORRECT
<div className={styles.charBox} style={{ position: 'relative' }}>
  {value}
  <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: 'var(--text-muted)' }}>[{idx}]</span>
</div>

// ❌ WRONG (Tailwind not loaded)
<div className={`${styles.charBox} relative`}>
  <span className="absolute -top-6 text-[9px]">[{idx}]</span>
</div>
```

---

## 8. Current Lecture Status

| Lecture | File | Algorithms | Tracers | AlgorithmCards | Notes |
|---|---|---|---|---|---|
| **Lec01** | `Lec01.jsx` | Sieve, Sequential Search, Graph Reps | SieveTracer, GraphConverterTracer | ❓ | Check if AlgorithmCards present |
| **Lec02** | `Lec02.jsx` | Counting Ops, Asymptotic Notation | AsymptoticNotationTracer | ❓ | |
| **Lec03** | `Lec03.jsx` | Non-recursive analysis, Recursive analysis | ComplexityCounterTracer | ❓ | |
| **Lec04** | `Lec04.jsx` | Selection Sort, Bubble Sort, Brute Force String Match | SelectionSortTracer, BubbleSortTracer, StringMatchTracer | ❓ | |
| **Lec05** | `Lec05.jsx` | Brute Force String Match, Closest Pair, Convex Hull | ClosestPairTracer | ❓ | |
| **Lec06** | `Lec06.jsx` | Insertion Sort, DFS/BFS, Topological Sort | InsertionSortTracer, DfsTracer, TopologicalSortTracer | ❓ | |
| **Lec07** | `Lec07.jsx` | Binary Search, Fake Coin, Josephus, Russian Peasant | FakeCoinTracer, JosephusTracer, EuclidTracer | ❓ | |
| **Lec09** | `Lec09.jsx` | Merge Sort, Quick Sort, Binary Tree Traversal | MergeSortTracer, QuickSortTracer, TreeTraversalTracer | ❓ | |
| **Lec10** | `Lec10.jsx` | AVL Trees, Heapsort, Horner's Rule | AvlTreeTracer, HeapsortTracer, HornersTracer | ❓ | |
| **Lec11** ✅ | `Lec11.jsx` | Comparison Counting Sort, Horspool, Hashing, B-Trees | ComparisonCountingSortTracer, HorspoolTracer, HashingTracer | ✅ All present | **Reference implementation** |
| **Lec13** | `Lec13.jsx` | DP Coin-Row, Knapsack, Warshall/Floyd, Prim's, Kruskal's, Dijkstra's, Huffman | DynamicProgTracer, GreedyTracer, KnapsackTracer | ❓ | |

---

## 9. Your Task for Each Lecture

For each lecture page that needs work, do ALL of the following steps **in order**:

### Step 1: Audit existing content
Open the lecture `.jsx` file and check what's already there:
- Which algorithms have an `<AlgorithmCard />` with complexity? ✅ keep as-is
- Which algorithms are missing their `<AlgorithmCard />`? ➕ add them
- Which tracers are imported but broken (crashing, Tailwind classes, missing CSS)? 🔧 fix them
- What content from the lecture topics (in `lectures.js`) is completely missing? ➕ add it

### Step 2: Add missing AlgorithmCards
Every algorithm in the lecture **must** have an `<AlgorithmCard />` before its tracer. Follow the format in §6.

### Step 3: Add missing content sections
Every topic listed in `lectures.js` → `topics[]` for that lecture must have a corresponding `<section>` in the lecture page. If missing, add it with:
- Editorial narrative text (`<p className={styles.editorialText}>`)
- Relevant math (`<MathBlock />`)
- Link to its tracer if one exists

### Step 4: Fix broken tracers
If a tracer renders incorrectly (elements overlap, wrong layout, crashes), fix it:
- Check for Tailwind classes being used without Tailwind → replace with inline styles
- Check for missing CSS classes in `Bespoke.module.css` → add them
- Check `useMemo` dependencies are correct

### Step 5: Add complexity analysis cards
Every algorithm section needs a `<div id="algorithm-name-complexity">` card with:
- The summation derivation or recurrence
- Final result with MathBlock
- This ID is used by CheatSheetPage.jsx for deep links

### Step 6: Update CheatSheetPage.jsx
In `src/pages/CheatSheetPage.jsx`, find the row for this lecture and add direct links to the complexity anchor IDs, e.g.:
```jsx
<a href="/lecture/11#counting-sort-complexity">Comparison Counting Sort</a>
```

---

## 10. Complexity Reference Table

Use these standard complexities (double-escaped in JSX):

| Algorithm | Time | Space |
|---|---|---|
| Selection Sort | `\\Theta(n^2)` | `\\Theta(1)` |
| Bubble Sort | `\\Theta(n^2)` | `\\Theta(1)` |
| Insertion Sort | `O(n^2)`, `\\Omega(n)` | `\\Theta(1)` |
| Merge Sort | `\\Theta(n \\log n)` | `\\Theta(n)` |
| Quick Sort | `O(n^2)` avg `\\Theta(n \\log n)` | `\\Theta(\\log n)` |
| Heapsort | `\\Theta(n \\log n)` | `\\Theta(1)` |
| Binary Search | `\\Theta(\\log n)` | `\\Theta(1)` |
| Sequential Search | `\\Theta(n)` | `\\Theta(1)` |
| DFS / BFS | `\\Theta(V + E)` | `\\Theta(V)` |
| Topological Sort | `\\Theta(V + E)` | `\\Theta(V)` |
| Comparison Counting Sort | `\\Theta(n^2)` | `\\Theta(n)` |
| Horspool's Pattern Match | preprocessing `\\Theta(m + \\|\\Sigma\\|)`, search `O(nm)` | `\\Theta(\\|\\Sigma\\|)` |
| Hashing (Chaining) | avg `\\Theta(1)` | `\\Theta(n)` |
| B-Tree Search | `O(\\log n)` | — |
| Warshall's | `\\Theta(n^3)` | `\\Theta(n^2)` |
| Floyd's Shortest Path | `\\Theta(n^3)` | `\\Theta(n^2)` |
| Dijkstra's | `O((V+E) \\log V)` | `\\Theta(V)` |
| Prim's | `O(E \\log V)` | `\\Theta(V)` |
| Kruskal's | `O(E \\log E)` | `\\Theta(E)` |
| Knapsack (DP) | `\\Theta(nW)` | `\\Theta(nW)` |
| Coin-Row (DP) | `\\Theta(n)` | `\\Theta(n)` |
| Horner's Rule | `\\Theta(n)` | `\\Theta(1)` |
| AVL Tree ops | `\\Theta(\\log n)` | `\\Theta(n)` |
| Sieve of Eratosthenes | `\\Theta(n \\log \\log n)` | `\\Theta(n)` |

---

## 11. CSS Variables Available

Use these design tokens — never hardcode colors:

```css
var(--accent-blue)       /* Primary blue */
var(--accent-purple)     /* Purple accent */
var(--accent-green)      /* Green accent */
var(--color-success)     /* Success green */
var(--color-error)       /* Error red */
var(--text-primary)      /* Main text */
var(--text-secondary)    /* Secondary text */
var(--text-muted)        /* Muted/hint text */
var(--bg-surface)        /* Card surface */
var(--bg-elevated)       /* Elevated surface */
var(--border-subtle)     /* Subtle border */
var(--font-code)         /* Monospace font */
var(--font-display)      /* Display/heading font */
```

---

## 12. Integration Checklist (per lecture)

After editing any lecture file, verify:

- [ ] `<LessonHero tag="Lecture XX" />` is present with correct title
- [ ] All topics from `lectures.js → topics[]` have a `<section>` in the page
- [ ] Every algorithm has an `<AlgorithmCard />` with `time` and `space` complexity
- [ ] Every algorithm has a `<div id="algorithm-name-complexity">` with derivation
- [ ] Every tracer renders without overlap (no Tailwind classes used)
- [ ] Math renders correctly (double-escaped backslashes in all LaTeX)
- [ ] `CheatSheetPage.jsx` has deep links to all new complexity anchors
- [ ] No `console.error` or missing CSS class warnings

---

## 13. Do NOT Touch

- `src/App.jsx` — routing is already correct for all lectures
- `src/data/lectures.js` — do not edit unless adding a brand new lecture
- `src/components/ui/Premium/Premium.module.css` — shared styles, do not modify without discussion
- `public/` and `dist/` — do not edit build artifacts
- `.github/workflows/` — CI/CD is configured, do not touch
- Any file in `src/components/visualization/bespoke/` that already works correctly — **only fix if broken**

---

## 14. Reference: Lec11.jsx

`Lec11.jsx` is the gold-standard reference implementation. Before working on any other lecture, study it:

- **File:** `src/pages/lectures/Lec11.jsx`
- **Algorithms covered:** Comparison Counting Sort, Horspool's Pattern Matching, Hashing (Chaining + Linear Probing), B-Trees
- **What it has:**
  - `LessonHero` with tag, title, subtitle
  - Intro section with two-column info card grid
  - Per-algorithm sections with `<section id="...">` anchors
  - `<AlgorithmCard />` for each algorithm with correct double-escaped LaTeX complexity
  - Complexity analysis `<div id="...-complexity">` cards with MathBlock derivations
  - Bespoke tracers: `ComparisonCountingSortTracer`, `HorspoolTracer`, `HashingTracer`
  - Clean inline styles (zero Tailwind)

---

## 15. Deployment Instructions

> ⚠️ **Only the project maintainer should deploy.** Agents should only edit source files.

### Prerequisites
- Node.js installed
- `gh-pages` npm package (already in `package.json`)
- GitHub CLI authenticated with `workflow` scope:
  ```powershell
  gh auth refresh -h github.com -s workflow
  ```

### Local Development Server
```powershell
cd c:\Users\omarh\projects\Comp-algo
npm run dev
```
Then open http://localhost:5173 in the browser.

### Deploy to GitHub Pages (Live Site)
This single command builds the project and pushes to the `gh-pages` branch:
```powershell
cd c:\Users\omarh\projects\Comp-algo
npm run deploy
```
After ~2 minutes the live site at https://4awmy.github.io/Comp-algo/ will reflect the changes.

### Push Source Code to GitHub (master branch)
After deploying, push the source code separately:
```powershell
cd c:\Users\omarh\projects\Comp-algo
git add -A
git commit -m "feat: describe your changes here"
git push origin master
```

> **Note:** If `git push origin master` fails with a `workflow` scope error, run:
> ```powershell
> gh auth refresh -h github.com -s workflow
> # A one-time code will be printed — open https://github.com/login/device and enter it
> # Then update the remote URL with the new token:
> git remote set-url origin https://4awmy:$(gh auth token)@github.com/4awmy/Comp-algo.git
> git push origin master
> git remote set-url origin https://github.com/4awmy/Comp-algo.git
> ```

### Full Workflow (Edit → Test → Deploy)
```powershell
# 1. Make your edits to src/ files

# 2. Test locally
npm run dev

# 3. Build to verify no errors
npm run build

# 4. Deploy to live site
npm run deploy

# 5. Commit source to GitHub
git add -A
git commit -m "feat: ..."
git push origin master
```

### What Each Command Does
| Command | What it does |
|---|---|
| `npm run dev` | Starts local dev server at localhost:5173 with hot reload |
| `npm run build` | Compiles and bundles everything into `dist/` |
| `npm run deploy` | Runs `build` then pushes `dist/` to the `gh-pages` branch |
| `git push origin master` | Pushes source code changes to the `master` branch on GitHub |

### Branch Structure
| Branch | Purpose |
|---|---|
| `master` | Source code — what you edit |
| `gh-pages` | Built output — what the live site serves |
