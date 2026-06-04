---
session_id: lecture-overhaul-2026-06-03-01
task: Overhaul 11 lecture pages to match PPTX content depth, integrate preserved images, and upgrade visualizers.
task_complexity: complex
design_depth: deep
date: 2026-06-03
---

# Design Document: Premium Lecture Overhaul

## 1. Problem Statement
The current lecture pages in the portal are implemented as "Premium" textbooks but suffer from significant narrative and visual gaps when compared to the source PPTX files. 

**Core Issues**:
1. **Narrative Compression**: Many technical details, problem types (e.g., String Processing, Geometric Problems), and detailed examples were omitted during the initial conversion to the editorial format.
2. **Visual Decoupling**: Useful diagrams, execution traces, and tables from the original slides are missing, leaving the text-heavy pages without sufficient visual support.
3. **Untapped Assets**: A set of "useful" images preserved in the filesystem is currently unused in the UI.

**Goal**: This overhaul will systematically expand each of the 11 lecture pages to ensure 100% technical parity with the source material, integrate the preserved visual assets via a premium zoomable interface, and upgrade tracers where they provide the most value.

## 2. Requirements

### Functional Requirements
- **Narrative Expansion (REQ-1)**: Every lecture page must cover all technical topics found in the corresponding PPTX (JSON).
- **Image Integration (REQ-2)**: All "preserved" images in `public/images/lectures` must be re-integrated into their respective pages.
- **Zoomable Figures (REQ-3)**: Implementation of a bespoke custom Lightbox for all figures to allow high-detail analysis of PPTX content.
- **Tracer Parity (REQ-4)**: Algorithms described in slides should have either a static figure or an interactive tracer.

### Non-Functional Requirements
- **Premium Editorial Standard (REQ-5)**: Maintain the textbook feel (drop caps, editorial typography, MathBlock).
- **Accessibility (REQ-6)**: Use Narrative Mirroring—surrounding text must explain the core message of every image.
- **Performance (REQ-7)**: All images must use native lazy-loading to maintain fast page transitions.
- **Zero Dependencies (REQ-8)**: The Lightbox and new components must be implemented using custom React/CSS code.

## 3. Approach

We will adopt a **Hybrid-Pragmatic Content Integration** approach.

### Strategy
1. **Narrative Synthesis**: Agents will read the JSON `content` and `ocrContent` to expand the JSX sections, ensuring all "Problem Types" and "Analysis Framework" details are included.
2. **Visual Integration**: A new `<PremiumImage />` component will be created to host the preserved PNG/JPG files. This component will feature a bespoke Lightbox for high-resolution inspection.
3. **Hot-Swap Capability**: Images that represent algorithmic steps will be tagged as "Tracer Candidates," allowing us to swap the static `<PremiumImage />` for a live `<VisualStage />` in future iterations without breaking the narrative flow.

### Decision Matrix: Visual Integration Strategy

| Criterion | Weight | Approach A (Tracer-First) | Approach B (Hybrid-Pragmatic) |
|-----------|--------|---------------------------|-------------------------------|
| **Completeness** | 40% | 3: Slow rollout of visuals. | 5: Immediate parity with slides. |
| **Interactivity** | 30% | 5: Maximum engagement. | 3: Static images in flow. |
| **Effort** | 30% | 1: Extremely high per page. | 4: Efficient & scalable. |
| **Weighted Total** | **100%** | **3.0** | **4.1** |

**Selection**: **Approach B (Hybrid-Pragmatic)** is selected because it prioritizes the user's immediate need for "substantially complete" content while providing a clean architectural path to full interactivity (Traces To: REQ-1, REQ-2).

## 4. Architecture

### New Components
- **`<PremiumImage />`**:
  - **Props**: `src`, `alt`, `caption`, `slideNumber`.
  - **Behavior**: Renders an editorial figure. On click, it triggers a global `Lightbox` context.
  - **Accessibility**: Implements narrative mirroring (REQ-6) via the `caption` and `alt` props.
- **`<Lightbox />`**:
  - **Architecture**: A React Portal component that renders at the document root.
  - **Design**: Uses `backdrop-filter: blur(8px)` and `background: rgba(var(--bg-rgb), 0.9)`.
  - **Features**: Close button, `ESC` key listener, and pinch-to-zoom (via CSS transforms).

### Data Flow
- **Source**: JSON files (`src/data/lectures/lecXX.json`) serve as the "ground truth" for content and image mapping.
- **Synthesis**: The `coder` agent reads the JSON, compares it with the current JSX, and inserts new `<section>` and `<PremiumImage />` blocks where content is missing (Traces To: REQ-1).
- **Asset Loading**: Native browser lazy-loading (REQ-7) is enforced on all `<img>` tags within the Premium components.

## 5. Agent Team
- **`ux_designer`**: Narrative structure and expansion mapping.
- **`design_system_engineer`**: Lightbox and PremiumImage component implementation.
- **`coder`**: Parallel implementation across 11 lectures (Split 01-07 and 09-13).
- **`code_reviewer`**: Quality, accuracy, and accessibility audit.

## 6. Risk Assessment
- **Content Overload**: Mitigated via typography hierarchy and ToC updates.
- **Image Quality**: Mitigated via card grounding and high-contrast Lightbox.
- **Tracer Regressions**: Mitigated via resilient layouts and focused code review.
- **Performance**: Mitigated via lazy-loading.

## 7. Success Criteria
- 100% Technical Parity with PPTX source material.
- All preserved images integrated with a bespoke Lightbox zoom.
- Adherence to Premium editorial and accessibility standards.
- Zero functional or visual regressions.
- **Metric**: Student can learn the full material using *only* the web portal.
