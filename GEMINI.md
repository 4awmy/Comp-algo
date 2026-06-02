# Project Instructions: Premium Interactive Textbook Standard

This document outlines the standards and procedures for creating "Premium" lecture pages in the Computing Algorithms portal. These pages are designed as standalone interactive textbooks rather than data-driven templates.

## 1. Directory Structure
- **Pages**: `src/pages/lectures/LecXX.jsx` (where XX is the 2-digit lecture number).
- **Tracers**: `src/components/visualization/bespoke/AlgoNameTracer.jsx`.
- **Styles**: `src/components/ui/Premium/Premium.module.css` (shared layout) and `Bespoke.module.css` (tracer-specific).

## 2. Page Architecture
Every premium page must follow this structure:
1.  **Hero**: Use `<LessonHero tag="Lecture XX" title="..." subtitle="..." />`.
2.  **Sections**: Wrap content in `<section id="..." className={styles.lessonSection}>`.
3.  **Typography**: Use `styles.editorialText` for paragraphs and `styles.dropCap` for the first paragraph of the lesson.
4.  **Math**: NEVER use plain text for math. Use the `<MathBlock />` component for all formulas, Big-O, and Theta notation (e.g., `<MathBlock math="\Theta(n^2)" />`).
5.  **Visuals**: Embed bespoke tracers using the `<VisualStage />` container.

## 3. Bespoke Tracers
Avoid the unified `AlgorithmVisualizer`. Instead, build self-contained tracers in `src/components/visualization/bespoke/`.
- **Logic**: Pre-calculate algorithm steps in a `useMemo` hook to allow smooth scrubbing.
- **Rendering**: Use SVG for graph-based algorithms or stylized HTML/CSS for arrays and grids.
- **Controls**: Include "Prev", "Next", and "Play" buttons inside the tracer UI.

## 4. Content Accuracy
- **Source**: Port text exactly from the PPTX/Claude chat exports.
- **Formatting**: Maintain the narrative flow. Explain *why* an algorithm is a space-time trade-off or a specific conquer variation before showing the visual.

## 5. Integration Checklist
1.  **Routing**: Add the new page to the `LecturePageRoute` resolver in `src/App.jsx`.
2.  **Sidebar**: Ensure the lecture ID in `src/data/lectures.js` has a corresponding `topics` array for the Table of Contents.
3.  **Cheat Sheet**: Update `src/pages/CheatSheetPage.jsx` to link directly to the new visualizer anchors (e.g., `/lecture/06#insertion-sort`).
