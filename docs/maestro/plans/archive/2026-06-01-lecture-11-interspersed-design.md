---
design_depth: deep
task_complexity: medium
topic: lecture-11-interspersed-portal
date: 2026-06-01
---

# Design Document: Interspersed Lesson Flow (Lecture 11)

## 1. Problem Statement
The previous 'Portal' iterations used split-pane and tabbed layouts that felt fragmented and disrupted the narrative flow of the course material. Students needed to manually switch between explanations, code, and visuals. The goal is to refactor this into an 'Interspersed Lesson Flow'—a single-column, vertical reading experience where narrative, pseudocode, and interactive visualizers are integrated into a cohesive document with high-end spacing.

## 2. Requirements
- **REQ-I1 (UI)**: Single-column vertical layout (removing side-panes and tabs).
- **REQ-I2 (Content)**: Interspersed blocks: Narrative Text -> Pseudocode -> Interactive Visualizers.
- **REQ-I3 (UX)**: Clean, editorial-style spacing and typography to ensure readability.
- **REQ-I4 (Lec 11)**: Full integration of content from the provided Claude chat (Hashing, B-Trees).
- **REQ-I5 (Sync)**: Ensure 'Code-Driven Sync' logic is adapted for inline visuals (clicking code highlights and updates the visualizer immediately below or nearby).

## 3. Architecture
Refactor `LecturePage.jsx` and `src/components/lectures/` to support a block-based rendering model.

### Component Hierarchy:
- `LecturePage` (Orchestrator): Fetches JSON and maps it to a list of `LessonBlock` components.
- `LessonBlock`: A generic wrapper that renders one of the following:
    - `NarrativeBlock`: Markdown-driven text.
    - `PseudocodeBlock`: Enhanced `PseudocodePane` for inline display.
    - `VisualizerBlock`: Embedded `AlgorithmVisualizer` or `SlideImage`.
- `AITutorBubble`: Persistent floating bubble (already implemented).

### Data Strategy:
Update `lec11.json` to include a `sections` array, where each section defines its content blocks and their respective algorithm mappings.

## 4. Agent Team
- **Agent 1: `design_system_engineer`**: Responsible for the single-column editorial styles and spacing (REQ-I3).
- **Agent 2: `coder`**: Responsible for the block-based renderer and Lec 11 content integration (REQ-I2, REQ-I4).
- **Agent 3: `tester`**: Responsible for verifying the flow and sync correctness on mobile and desktop.

## 5. Risk Assessment
- **Risk 1: Vertical Height (Medium)**: Long lectures may require significant scrolling. [Mitigation: Implement a 'Quick Jump' Table of Contents in the Sidebar].
- **Risk 2: Performance (Low)**: Multiple interactive visualizers on one page. [Mitigation: Lazy-load visualizers as they enter the viewport].

## 6. Success Criteria
- [ ] Users can scroll through the entire Lecture 11 as a single cohesive story.
- [ ] Every major algorithm step has an integrated visualizer directly in the flow.
- [ ] The UI matches the 'Claude-style' integrated aesthetic.
