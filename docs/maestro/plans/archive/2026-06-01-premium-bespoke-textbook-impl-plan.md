---
task_complexity: complex
topic: premium-bespoke-textbook
date: 2026-06-01
---

# Implementation Plan: Bespoke Interactive Textbook (Phase 1: Pilot)

This plan outlines the refactoring of the platform into specialized textbook pages, with Lecture 6 as the pilot.

## 1. Plan Overview
- **Total Phases**: 5
- **Agents Involved**: `coder`, `design_system_engineer`
- **Estimated Effort**: Very High

## 2. Dependency Graph
```
Phase 1: Foundation (Math & Toolkit)
    |
Phase 2: Bespoke Visualizer Library (Lec 6)
    |
Phase 3: Lecture 6 Refactor (Page)
    |
Phase 4: Cheat Sheet Indexing
    |
Phase 5: Global Routing & Integration
```

## 3. Execution Strategy Table

| Stage | Agent | Mode | Objective |
|-------|-------|------|-----------|
| 1. Foundation | `design_system_engineer` | Sequential | Install KaTeX and build shared 'Premium' UI components. |
| 2. Library | `coder` | Parallel | Build `InsertionSortTracer` and `DfsTracer` as standalone components. |
| 3. Pilot | `coder` | Sequential | Create `src/pages/lectures/Lec06.jsx` with hardcoded text and visuals. |
| 4. Indexing | `coder` | Sequential | Update Cheat Sheet with links to specific Lec 6 visual blocks. |
| 5. Integration | `coder` | Sequential | Update `App.jsx` routing to support the bespoke page model. |

## 4. Phase Details

### Phase 1: Foundation
- **Objective**: Set up the premium toolkit.
- **Agent**: `design_system_engineer`
- **Actions**:
    - `npm install katex react-katex`
    - Create `src/components/ui/Premium/`:
        - `LessonHero.jsx`: High-end typography header.
        - `MathBlock.jsx`: Wrapper for KaTeX with centering.
        - `VisualStage.jsx`: Premium container for algorithm tracers.
- **Validation**: `npm run build`

### Phase 2: Bespoke Visualizer Library (Lec 6)
- **Objective**: Create specialized tracers for Decrease & Conquer.
- **Agent**: `coder`
- **Files to Create**:
    - `src/components/visualization/bespoke/InsertionSortTracer.jsx`
    - `src/components/visualization/bespoke/DfsTracer.jsx`
- **Note**: Extract logic from `AlgorithmVisualizer.jsx` but optimize for premium UI.
- **Validation**: Manual check in a dev sandbox.

### Phase 3: Lecture 6 Refactor (Page)
- **Objective**: Build the first bespoke textbook page.
- **Agent**: `coder`
- **Files to Create**:
    - `src/pages/lectures/Lec06.jsx`: Hardcode all original text, complexity analysis (LaTeX), and embedded tracers.
- **Validation**: Ensure all SUCCESS CRITERIA from design are met for this page.

### Phase 4: Cheat Sheet Indexing
- **Objective**: Connect the Cheat Sheet to the new bespoke visuals.
- **Agent**: `coder`
- **Files to Modify**:
    - `src/pages/CheatSheetPage.jsx`: Update 'Insertion Sort' and 'DFS' entries to link to specific IDs in `Lec06.jsx`.

### Phase 5: Global Routing
- **Objective**: Seamless transition between legacy and bespoke pages.
- **Agent**: `coder`
- **Files to Modify**:
    - `src/App.jsx`: Update `Route` for `/lecture/:id` to dynamically load the bespoke page if it exists.

## 5. Cost Summary

| Phase | Agent | Model | Est. Input | Est. Output | Est. Cost |
|-------|-------|-------|-----------|------------|----------|
| 1 | `design_system_engineer` | Flash | 2,000 | 500 | $0.01 |
| 2 | `coder` | Pro | 5,000 | 2,000 | $0.15 |
| 3 | `coder` | Pro | 8,000 | 3,000 | $0.25 |
| 4 | `coder` | Flash | 3,000 | 500 | $0.01 |
| 5 | `coder` | Flash | 2,000 | 500 | $0.01 |
| **Total** | | | **20,000** | **6,500** | **~$0.43** |
