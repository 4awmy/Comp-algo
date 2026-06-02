---
design_depth: deep
task_complexity: complex
topic: premium-bespoke-textbook
date: 2026-06-01
---

# Design Document: Bespoke Interactive Textbook

## 1. Problem Statement
The current 'Interactive Portal' uses a unified, data-driven approach that creates a 'generic' feel and limits the visual complexity required for advanced algorithm chapters. Starting from Lecture 6, topics require bespoke layouts, dedicated tracers, and high-fidelity mathematical notation. The goal is to refactor the platform into a decentralized 'Bespoke Textbook' model where each lecture is its own high-end interactive page.

## 2. Requirements
- **REQ-B1 (Architecture)**: Dedicated `.jsx` pages for all lectures from Lec 06 onwards.
- **REQ-B2 (Math)**: High-quality **KaTeX** integration for all mathematical notation ($\Theta(n^2)$, etc.).
- **REQ-B3 (Content)**: Port the **Original Text** from lecture sources to ensure accuracy and flow.
- **REQ-B4 (Visuals)**: Every algorithm/topic MUST have a dedicated, self-contained interactive visualizer.
- **REQ-B5 (Cheat Sheet)**: High-density summary with direct links back to bespoke visuals.

## 3. Approach
We have selected the **Bespoke Textbook Experience**. Every chapter will be treated as a unique interactive experience, hardcoding accuracy and custom spacing.

### Alternatives Considered:
- **Unified Plugin Engine**: Rejected as it limits creative layout control.
- **Generic Markdown Renderer**: Rejected as it lacks the 'premium' interactivity required for complex algorithm tracing.

## 4. Architecture
### Component Hierarchy:
- `AppRouter`: Maps `/lecture/:id` to specific bespoke components.
- `LecXX.jsx` (Bespoke Page):
    - `HeroHeader`: Large typographic title.
    - `LessonSection` (Bespoke per topic):
        - `ExplanationBlock`: KaTeX math + rich text.
        - `AlgorithmBlock`: Pseudocode + **Bespoke Visual Tracer**.
- `AITutorBubble`: Persistent global assistant.

### Tech Integrations:
- **Math**: `react-katex`
- **Animation**: CSS View Transitions + React State Tracing.

## 5. Agent Team
- **Agent 1: `coder`**: Bespoke logic and tracer implementations.
- **Agent 2: `design_system_engineer`**: KaTeX, editorial spacing, and typography.
- **Agent 3: `technical_writer`**: Accurate content porting.

## 6. Risk Assessment
- **Risk 1: Maintenance Overhead (High)**: Decentralizing code increases boilerplate. [Mitigation: Use standardized 'LessonFragment' base components].
- **Risk 2: Nav Sync (Medium)**: Keeping Sidebar ToC in sync with hardcoded JSX. [Mitigation: Export `const TOPICS` from each bespoke page].

## 7. Success Criteria
- [ ] Lecture 6 and 11 fully migrated to the bespoke model.
- [ ] Mathematical formulas render with textbook quality.
- [ ] All algorithms are interactively visualizable in-context.
- [ ] Cheat Sheet links trigger direct navigation to visualizer blocks.
