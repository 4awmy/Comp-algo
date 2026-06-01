---
design_depth: deep
task_complexity: complex
topic: lecture-portal-redesign
date: 2026-06-01
---

# Design Document: Lecture Portal Redesign

## 1. Problem Statement
The current lecture viewing experience in the Computing Algorithms platform uses a tabbed layout that separates lecture slides, algorithm visualizations, and the AI Tutor. This creates a fragmented learning experience where students must switch back and forth between context (slides) and interaction (visualizers/tutor). The goal is to redesign this into a cohesive 'Portal' view that integrates all data—pseudocode, examples, and visualizations—into a single, interactive split-pane workspace.

## 2. Requirements
- **REQ-1 (Functional)**: Implement a Portal-style split-pane layout for lectures.
- **REQ-2 (UI)**: Left pane for Pseudocode, Right pane for Slides/Visuals.
- **REQ-3 (UX)**: Code-Driven Sync — clicking code highlights it and updates visuals.
- **REQ-4 (UX)**: Auto-Visualizer — dynamically swap slide images for live visualizers when tracing data exists.
- **REQ-5 (Data)**: Use a new 'pseudocode' field in lecture JSONs.
- **REQ-6 (Tech)**: Custom CSS resizable panels with minimal JS handle.
- **REQ-7 (UX)**: Expandable 'Example' drawer on the code side.
- **REQ-8 (AI)**: Floating AI Tutor bubble.

## 3. Approach
We have selected the **Advanced Learning Workspace** approach. This design prioritizes a flexible, resizable 2-pane layout that maximizes screen real estate while keeping secondary content accessible via drawers.

### Alternatives Considered:
- **Fixed 3-Column Layout**: Rejected because it fails on smaller screens.
- **Library-based Resizer**: Rejected to maintain 'Vanilla CSS' dependency-free mandates.

### Decision Matrix

| Criterion | Weight | Approach 1 (Advanced) | Approach 2 (Classic) |
|-----------|--------|-----------------------|----------------------|
| **Interactive Feel** | 40% | 5: Resizable + Sync | 3: Static Sync only |
| **Space Efficiency** | 30% | 5: Drawers save space | 2: Cramped columns |
| **Maintainability** | 20% | 3: Complex layout code | 5: Simple static CSS |
| **Feature Richness** | 10% | 5: Dynamic swapping | 3: Static rendering |
| **Weighted Total** | 100% | **4.6** | **3.1** |

## 4. Architecture
The redesign refactors `LecturePage.jsx` into a container-component pattern.

### Component Hierarchy:
- `LecturePage` (Container): Orchestrates state (`activeCodeLine`, `activeSlide`, `splitPosition`).
- `SplitPane` (Layout): Manages the resizable boundary and panels.
- `PseudocodePane` (Left):
    - `CodeEditor`: Read-only, syntax-highlighted, with line-click listeners.
    - `ExampleDrawer`: Slide-out panel for worked numerical examples.
- `VisualsPane` (Right):
    - `VisualsHeader`: Lecture info and navigation controls.
    - `VisualsContainer`: Dynamic switcher between `SlideViewer` and `AlgorithmVisualizer`.
- `AITutorBubble`: Global floating component for contextual chat.

### Data Flow:
1. User clicks Line 4 in `PseudocodePane`.
2. `LecturePage` updates `activeCodeLine` state.
3. `VisualsContainer` looks up `mapping[4]` in the lecture JSON.
4. If `mapping[4]` is a slide ID, `SlideViewer` updates. If it's a visualizer step, `AlgorithmVisualizer` loads.

## 5. Agent Team
- **Agent 1: `design_system_engineer`**: Responsible for the custom `SplitPane` CSS, `ResizeHandle` logic, and theme integration.
- **Agent 2: `coder`**: Responsible for refactoring `LecturePage.jsx` state management, JSON mapping logic, and drawer implementations.
- **Agent 3: `tester`**: Responsible for verifying cross-lecture data mapping and mobile/desktop responsive behavior.

## 6. Risk Assessment
- **State Complexity (Medium)**: Syncing code lines to slides across 11 lectures could lead to 'spaghetti state'. [Mitigation: Use a dedicated `useLectureSync` custom hook].
- **Mobile UX (High)**: A split-pane layout is difficult on mobile. [Mitigation: Automatically collapse to a single-pane vertical stack on screens < 768px].
- **Data Migration (Low)**: Updating 11 JSON files is time-consuming. [Mitigation: Start with Lec 04 as a pilot, then use a script for others].

## 7. Success Criteria
- [ ] Users can resize the code/visual split without lag.
- [ ] Clicking any pseudocode line immediately updates the right-pane visual.
- [ ] The AI Tutor bubble remains accessible and interactive across all view states.
- [ ] All 11 lectures load the new 'Portal' layout by default.
