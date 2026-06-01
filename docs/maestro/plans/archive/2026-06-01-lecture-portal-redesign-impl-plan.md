---
task_complexity: complex
topic: lecture-portal-redesign
date: 2026-06-01
---

# Implementation Plan: Lecture Portal Redesign

This plan outlines the refactoring of the lecture viewing experience into a split-pane 'Advanced Learning Workspace' with code-driven synchronization.

## 1. Plan Overview
- **Total Phases**: 6
- **Agents Involved**: `design_system_engineer`, `coder`, `tester`
- **Estimated Effort**: High

## 2. Dependency Graph
```
Phase 1: Foundation (Data & Hooks)
    |
Phase 2: UI Primitives (SplitPane & Resizer)
    |
Phase 3: Viewers (Pseudocode & Examples)
    |
Phase 4: Orchestration (LecturePage Refactor)
    |
Phase 5: AI Integration (Floating Bubble)
    |
Phase 6: Validation & Pilot (Lec 04)
```

## 3. Execution Strategy Table

| Stage | Agent | Mode | Objective |
|-------|-------|------|-----------|
| 1. Foundation | `coder` | Sequential | Set up sync hooks and mapping data structures. |
| 2. UI Primitives | `design_system_engineer` | Sequential | Implement the custom resizable split-pane. |
| 3. Viewers | `coder` | Parallel | Build the Pseudocode and Example components. |
| 4. Orchestration | `coder` | Sequential | Refactor LecturePage to use the new layout. |
| 5. AI Integration | `design_system_engineer` | Sequential | Implement and style the floating AI bubble. |
| 6. Validation | `tester` | Sequential | Verify responsiveness and sync correctness. |

## 4. Phase Details

### Phase 1: Foundation
- **Objective**: Establish the state management and data mapping structures.
- **Agent**: `coder`
- **Files to Create**:
    - `src/hooks/useLectureSync.js`: Manages `activeCodeLine`, `activeSlide`, and `splitPosition`.
    - `src/data/mappings.js`: Central store for code-to-slide/visualizer mappings.
- **Validation**: Linting, verifying hook export.

### Phase 2: UI Primitives
- **Objective**: Build the resizable layout engine.
- **Agent**: `design_system_engineer`
- **Files to Create**:
    - `src/components/ui/SplitPane.jsx`: Functional component using Flexbox.
    - `src/components/ui/SplitPane.module.css`: Styles for resizer handle and panels.
    - `src/components/ui/ResizeHandle.jsx`: The dragger component.
- **Validation**: Manual verification of resize behavior in a temp sandbox.

### Phase 3: Viewers
- **Objective**: Implement the content display components.
- **Agent**: `coder`
- **Files to Create**:
    - `src/components/lectures/PseudocodePane.jsx`: Line-by-line code viewer.
    - `src/components/lectures/ExampleDrawer.jsx`: Slide-out panel for examples.
- **Validation**: Prop-type checks and rendering verification.

### Phase 4: Orchestration
- **Objective**: The major refactor of the main lecture page.
- **Agent**: `coder`
- **Files to Modify**:
    - `src/pages/LecturePage.jsx`: Replace tabbed logic with `SplitPane` and new viewers.
    - `src/pages/LecturePage.module.css`: Clean up legacy split styles.
- **Validation**: Build check (`npm run build`).

### Phase 5: AI Integration
- **Objective**: Move the AI Tutor into a non-intrusive floating UI.
- **Agent**: `design_system_engineer`
- **Files to Create**:
    - `src/components/chat/AITutorBubble.jsx`: Floating button + chat overlay.
- **Files to Modify**:
    - `src/services/geminiService.js`: Ensure context is passed correctly from the new hook.
- **Validation**: Manual chat verification.

### Phase 6: Validation & Pilot
- **Objective**: Complete data for Lecture 04 and verify the end-to-end experience.
- **Agent**: `tester`
- **Files to Modify**:
    - `src/data/lectures/lec04.json`: Populate 'pseudocode' and 'mapping' fields.
- **Validation**: Full manual audit on multiple viewport sizes.

## 5. File Inventory

| Action | Path | Purpose |
|--------|------|---------|
| Create | `src/hooks/useLectureSync.js` | Shared state for sync |
| Create | `src/data/mappings.js` | Data linking code to visuals |
| Create | `src/components/ui/SplitPane.jsx` | Layout primitive |
| Create | `src/components/lectures/PseudocodePane.jsx` | Content viewer |
| Create | `src/components/chat/AITutorBubble.jsx` | Floating AI UI |
| Modify | `src/pages/LecturePage.jsx` | Main Page orchestration |

## 6. Execution Profile
Execution Profile:
- Total phases: 6
- Parallelizable phases: 1 (Phase 3)
- Sequential-only phases: 5
- Estimated parallel wall time: ~4 hours
- Estimated sequential wall time: ~5 hours

Note: Native parallel execution currently runs agents in autonomous mode.
All tool calls are auto-approved without user confirmation.

## 7. Cost Summary

| Phase | Agent | Model | Est. Input | Est. Output | Est. Cost |
|-------|-------|-------|-----------|------------|----------|
| 1 | `coder` | Flash | 2,000 | 500 | $0.01 |
| 2 | `design_system_engineer` | Pro | 3,000 | 800 | $0.10 |
| 3 | `coder` | Flash | 4,000 | 1,000 | $0.02 |
| 4 | `coder` | Pro | 5,000 | 1,500 | $0.20 |
| 5 | `design_system_engineer` | Flash | 3,000 | 500 | $0.01 |
| 6 | `tester` | Flash | 2,000 | 200 | $0.01 |
| **Total** | | | **21,000** | **4,500** | **~$0.35** |
