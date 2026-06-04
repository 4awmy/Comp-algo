---
session_id: portal-enhancements-2026-06-03-02
task: Fix Quick Sort & Lec 11, implement global AI button & Home Page slider, and enrich algorithm details across all lectures.
task_complexity: complex
design_depth: deep
date: 2026-06-03
---

# Design Document: UX & Content Stability Upgrade

## 1. Problem Statement
The portal requires a UX, Content, and Visual Stability Upgrade.

**Current Issues**:
1. **Visual regressions & Corruption**: Bespoke tracers are visually broken due to missing CSS synchronization. Many static visuals (like AVL Rotations) are displayed as low-fidelity screenshots.
2. **Navigation friction**: The Home Page lacks an engaging browse experience, and the AI Tutor entry point is not global.
3. **Technical Sparsity**: Algorithm descriptions lack a consistent structure for steps and complexity.

**Goal**: Stabilize visualizers, replace low-fidelity visuals with high-fidelity diagrams, introduce a global AI button, and implement a Home Page lecture slider.

## 2. Requirements

### Functional Requirements
- **Tracer Stabilization (REQ-1)**: Fix CSS/logic in Quick Sort and Lecture 11 visualizers.
- **Visual Audit & Cleanup (REQ-2)**: Identify and replace corrupted/non-fitting images (AVL Rotations, etc.) with high-fidelity React or SVG components.
- **Global AI FAB (REQ-3)**: Implementation of a persistent floating action button for the AI Tutor in `MainLayout`.
- **Home Page Slider (REQ-4)**: A CSS Snap-based carousel for course lectures.
- **Standardized Algorithm Cards (REQ-5)**: Consistent Goal/Steps/Complexity structure for every algorithm.

### Non-Functional Requirements
- **Visual Fidelity (REQ-6)**: Eliminate all low-quality PPTX screenshots in favor of native UI components.
- **Zero Dependencies (REQ-7)**: All new UI (slider, cards, FAB) must be custom-built.
- **Technical Accuracy (REQ-8)**: Steps and complexity must precisely match Dr. Moheeb's curriculum.

## 3. Approach

We will adopt a **Visual Recovery & Enhancement** strategy.

### Strategy
1. **CSS Stabilization**: Centralize tracer styles into a shared module.
2. **Asset replacement**: Replace problematic images with clean hand-crafted diagrams using SVG/React.
3. **Component Standard**: Implement the `<AlgorithmCard />` as a reusable building block.
4. **Global UI Injection**: Update `MainLayout` and `HomePage` for new features.

### Decision Matrix: Visual Quality Strategy
- Approach B (Replacement/Clean-up) selected: Score 4.4 vs Approach A (Patch) score 3.2.

## 4. Architecture

### New Components
- **`SharedTracers.module.css`**: Central visual primitives.
- **`<AlgorithmCard />`**: Wrapper for steps and complexity.
- **`<CircularAIFab />`**: Global entry point in `MainLayout`.
- **`src/components/visualization/diagrams/`**: SVG-based replacement library.

### Navigation
- **Home Page Carousel**: Native horizontal scroll with `scroll-snap-type: x mandatory`.

## 5. Agent Team
- **`debugger`**: Root-cause logic and CSS fixes.
- **`ux_designer`**: SVG diagrams and Home Page layout.
- **`design_system_engineer`**: Foundational components and shared styles.
- **`coder`**: Course-wide content expansion.
- **`code_reviewer`**: Final fidelity and accuracy audit.

## 6. Risk Assessment
- **Content Overload**: Mitigated via scannable card design.
- **SVG Complexity**: Mitigated via node templates and prioritization.
- **State Persistence**: Mitigated via React Context.

## 7. Success Criteria
- All 11 lectures feature standardized algorithm cards.
- Quick Sort and Lecture 11 visuals are fully functional.
- Corrupted AVL rotation visuals replaced with high-fidelity diagrams.
- Floating AI Button and Home Page slider are live and responsive.
