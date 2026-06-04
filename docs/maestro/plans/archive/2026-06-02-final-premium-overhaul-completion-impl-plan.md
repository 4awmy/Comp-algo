---
task_complexity: complex
topic: final-premium-overhaul-completion
date: 2026-06-02
---

# Implementation Plan: Interactive Workbook & Premium Completion

This plan outlines the final major migration to bring the entire platform to 'Premium' standards.

## 1. Plan Overview
- **Total Phases**: 6
- **Agents Involved**: `coder`, `design_system_engineer`, `technical_writer`
- **Estimated Effort**: Extremely High

## 2. Dependency Graph
```
Phase 1: Workbook Refactor (SectionPage)
    |
Phase 2: Lec 01 & 02 (Intro & Fundamentals)
    |
Phase 3: Lec 03 (Analysis Tracers)
    |
Phase 4: Lec 04 (Brute Force I)
    |
Phase 5: Lec 05 (Brute Force II)
    |
Phase 6: Global Audit & Deployment
```

## 3. Execution Strategy Table

| Stage | Agent | Mode | Objective |
|-------|-------|------|-----------|
| 1. Workbook | `coder` | Sequential | Refactor SectionPage into the 'Interactive Workbook' vertical flow. |
| 2. Intro | `technical_writer` | Sequential | Build Lec 01 & 02 bespoke pages. |
| 3. Analysis | `coder` | Sequential | Build Lec 03 with the 'Live Calculation Workspace' for Sigma notation. |
| 4. Brute Force | `coder` | Sequential | Build Lec 04 with Selection/Bubble/StringMatch tracers. |
| 5. Exhaustive | `coder` | Sequential | Build Lec 05 with TSP and Knapsack exhaustive search tracers. |
| 6. Final | `tester` | Sequential | Full project audit and final deployment. |

## 4. Phase Details

### Phase 1: Workbook Refactor
- **Objective**: Implement the vertical 'Scan + Solver' flow.
- **Files to Modify**:
    - `src/pages/SectionPage.jsx`: Remove tabs, implement `pageNumber` filtering logic.
    - `src/data/sheets/sheet04.json` (example): Add `pageNumber` to problems.

### Phase 2: Lec 01 & 02
- **Objective**: Bespoke conversion for first two weeks.
- **Files to Create**:
    - `src/pages/lectures/Lec01.jsx`
    - `src/pages/lectures/Lec02.jsx`
    - `src/components/visualization/bespoke/EuclidTracer.jsx`
    - `src/components/visualization/bespoke/SieveTracer.jsx`

### Phase 3: Lec 03
- **Objective**: Premium math analysis features with extensive visual demos.
- **Files to Create**:
    - `src/pages/lectures/Lec03.jsx`
    - `src/components/visualization/bespoke/AnalysisWorkspace.jsx` (already created, needs enhancement)
    - `src/components/visualization/bespoke/MathVisualizers.jsx`: A suite of smaller interactive components for Stacked Triangles, Growth Rate Race, Recursive Call Stacks, Equation Expansion, Halving Bar Charts, and Empirical Dashboards.

### Phase 4: Lec 04
- **Objective**: Core sorting and searching visuals.
- **Files to Create**:
    - `src/pages/lectures/Lec04.jsx`
    - `src/components/visualization/bespoke/SelectionSortTracer.jsx`
    - `src/components/visualization/bespoke/StringMatchTracer.jsx`

### Phase 5: Lec 05
- **Objective**: Exhaustive search visualizations.
- **Files to Create**:
    - `src/pages/lectures/Lec05.jsx`
    - `src/components/visualization/bespoke/ExhaustiveSearchTracer.jsx`

### Phase 6: Final Integration
- **Objective**: Routing, Sidebar ToC update, and final build.
- **Files to Modify**:
    - `src/App.jsx`: Update routing resolver for 01-05.
    - `src/data/lectures.js`: Ensure all topics are present for Sidebar ToC.

## 5. Token usage estimate: ~25,000
