---
task_complexity: medium
topic: lecture-11-interspersed-portal
date: 2026-06-01
---

# Implementation Plan: Interspersed Lesson Flow (Lecture 11)

This plan outlines the refactoring of the lecture view into a single-column integrated flow and the full population of Lecture 11 content.

## 1. Plan Overview
- **Total Phases**: 4
- **Agents Involved**: `coder`, `design_system_engineer`
- **Estimated Effort**: Moderate

## 2. Dependency Graph
```
Phase 1: Block-Based Renderer (Logic)
    |
Phase 2: Editorial Layout (Styles)
    |
Phase 3: Lecture 11 Content Integration (Data)
    |
Phase 4: Global Refactor & Polish
```

## 3. Execution Strategy Table

| Stage | Agent | Mode | Objective |
|-------|-------|------|-----------|
| 1. Logic | `coder` | Sequential | Implement the `LessonBlock` renderer in `LecturePage.jsx`. |
| 2. Styles | `design_system_engineer` | Sequential | Apply editorial spacing and vertical flow CSS. |
| 3. Visuals & Data | `coder` | Sequential | Implement Hashing/Horspool visualizers and populate JSONs. |
| 4. Polish | `coder` | Sequential | Update other lectures and add Table of Contents. |

## 4. Phase Details

### Phase 1: Logic
- **Objective**: Create the new block-based rendering engine.
- **Agent**: `coder`
- **Files to Modify**:
    - `src/pages/LecturePage.jsx`: Replace `renderPortalView` with a new `renderInterspersedView` that iterates over a section/block array.
- **Files to Create**:
    - `src/components/lectures/LessonBlock.jsx`: Functional component for block dispatching.

### Phase 2: Styles
- **Objective**: Implement REQ-I3 (Editorial spacing).
- **Agent**: `design_system_engineer`
- **Files to Modify**:
    - `src/pages/LecturePage.module.css`: Remove split-pane layout, implement max-width container (e.g., 900px), and add vertical spacing between blocks.

### Phase 3: Data
- **Objective**: Integrate Lecture 11 content.
- **Agent**: `coder`
- **Files to Modify**:
    - `src/data/lectures/lec11.json`: Fully populate with Hashing and B-Tree sections using the new block format.
    - `src/data/sheets/sheet11.json`: Implement the interactive Hashing trace problems.

### Phase 4: Polish
- **Objective**: Final cross-project consistency.
- **Agent**: `coder`
- **Files to Modify**:
    - `src/components/layout/Sidebar.jsx`: Add a "Lesson Navigation" section (ToC) that jumps to blocks.
    - `src/pages/CheatSheetPage.jsx`: (Optional) Minor tweaks to ensure links still work with the new flow.

## 5. Cost Summary

| Phase | Agent | Model | Est. Input | Est. Output | Est. Cost |
|-------|-------|-------|-----------|------------|----------|
| 1 | `coder` | Pro | 3,000 | 1,000 | $0.05 |
| 2 | `design_system_engineer` | Flash | 2,000 | 500 | $0.01 |
| 3 | `coder` | Pro | 5,000 | 2,000 | $0.15 |
| 4 | `coder` | Flash | 3,000 | 500 | $0.01 |
| **Total** | | | **13,000** | **4,000** | **~$0.22** |
