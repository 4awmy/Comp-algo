---
session_id: fidelity-flow-2026-06-03-03
task: Perform a global visual audit and overhaul: standardize spacing, fix coloring (CSS vars), replace notation (LaTeX symbols), and fix missing content (RL rotation, Assignment Problem).
task_complexity: complex
design_depth: deep
date: 2026-06-03
---

# Design Document: Fidelity & Flow Upgrade

## 1. Problem Statement
The portal requires a Technical Fidelity and Visual Flow Upgrade to ensure it meets the highest professional textbook standards.

**Current Issues**:
1. **Rendering Regressions**: Lectures 09 and 11 are showing blank; Slide Viewer logic is clunky.
2. **Visual Friction**: Visuals (especially in Lec 10) suffer from poor spacing and inconsistent coloring.
3. **Notation Inconsistency**: Use of plain-text "Theta" and "Omega" instead of mathematical symbols.
4. **Pedagogical Drift**: Assignment Problem is incorrectly placed and lacks depth.

**Goal**: Restore blank pages, redesign the Slide Viewer as a skimmable gallery, standardize technical notation with LaTeX, and perform a global hand-tuned visual audit.

## 2. Requirements

### Functional Requirements
- **Blank Page Recovery (REQ-1)**: Fix rendering logic in Lec 09 and Lec 11.
- **Vertical Slide Gallery (REQ-2)**: Replace horizontal slider with a vertical, skimmable gallery view.
- **Missing AVL Logic (REQ-3)**: Implement the missing RL rotation diagram in Lec 10.
- **Assignment Problem Move (REQ-4)**: Relocate and expand the Assignment Problem in Lec 04.
- **LaTeX Standardization (REQ-5)**: Replace all "Theta" and "Omega" text with $\Theta$ and $\Omega$.

### Non-Functional Requirements
- **Semantic Coloring (REQ-6)**: Enforce a strict palette across all tracers.
- **Contextual Spacing (REQ-7)**: Hand-tune padding and margins for every visual element.
- **Aesthetic Fidelity (REQ-8)**: Visuals must look like high-end professional textbook diagrams.

## 3. Approach

We will adopt a **Bespoke Fidelity & Technical Rigor** strategy.

### Strategy
1. **Semantic System Cleanup**: Define palette in `design-system.css`.
2. **Hand-Tuned Overhaul**: Manual adjustment of CSS and JSX for each visual across all 11 lectures.
3. **Notation Conversion**: Global "Find and Replace" for technical symbols.
4. **Gallery Redesign**: Rebuild `LectureSlideViewer` for vertical skimming.

### Decision Matrix: Visual Strategy
- Approach B (Contextual/Hand-Tuned) selected: Score 4.4 vs Approach A (Unified) score 4.1.

## 4. Architecture

### Visual Primitives
- **`Bespoke.module.css`**: Enhanced with context-specific spacing classes.
- **`DiagramNode` / `DiagramLink`**: Reusable SVG components consuming the semantic palette.

### Component Redesigns
- **`LectureSlideViewer`**: Vertical slide list with lazy-loading/IntersectionObserver.

### Global Notation
- Global replacement of technical words with LaTeX components.

## 5. Agent Team
- **`design_system_engineer`**: Semantic palette and SVG primitives.
- **`ux_designer`**: Slide Gallery and technical diagrams.
- **`coder`**: Global hand-tuned overhaul and notation conversion.
- **`code_reviewer`**: Final pass for technical and visual excellence.

## 6. Risk Assessment
- **Syntax Regression**: Mitigated via standardized wrapping.
- **Layout Bloat**: Mitigated via relative spacing units.
- **Style Fragmentation**: Mitigated via shared spacing utilities.

## 7. Success Criteria
- Lec 09 and 11 render correctly.
- Slide Viewer operates as a smooth vertical gallery.
- All visuals have optimal, non-cramped spacing and semantic colors.
- $\Theta$ and $\Omega$ symbols used correctly everywhere.
- Assignment Problem features a high-fidelity visual in Lec 04.
