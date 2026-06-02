---
design_depth: deep
task_complexity: complex
topic: final-premium-overhaul-completion
date: 2026-06-02
---

# Design Document: Interactive Workbook & Premium Completion

## 1. Problem Statement
The Computing Algorithms platform is currently in a 'half-premium' state. The first half (Lec 01-05) remains in a legacy data-driven format, and the Practice Sheets (SectionPage) use a fragmented tabbed interface that often deviates from the original scanned course material. This creates an inconsistent and sometimes inaccurate learning experience. The goal is to fully migrate the remaining lectures and refactor the practice sheets into a unified, high-fidelity 'Interactive Workbook'.

## 2. Requirements
- **REQ-B6 (Architecture)**: Dedicated `.jsx` pages for Lec 01, 02, 03, 04, and 05.
- **REQ-B7 (Tracers)**: Build bespoke tracers for Euclid's GCD, Sieve of Eratosthenes, Analysis Workspaces (Sigma calculation), and Brute Force exhaustive search (TSP/Knapsack).
- **REQ-W1 (Workbook UI)**: Refactor `SectionPage` to remove the 'Interactive' tab. 
- **REQ-W2 (Workbook UI)**: Implement an interspersed flow: Scanned Image -> Associated Problem Solvers -> Scanned Image.
- **REQ-W3 (Data)**: Clean up all `sheetXX.json` files to strictly match scanned sheet content and link to specific visualizers.
- **REQ-B8 (Math)**: Use KaTeX for all analysis and derivation sections across Lec 01-05.

## 3. Approach
We have selected the **Interactive Workbook Flow**. This path creates a high-consistency experience where both lessons and practice follow a continuous, vertical editorial style. Every chapter will be treated as a unique interactive experience, hardcoding accuracy and custom spacing.

## 4. Architecture
### Workbook Architecture (`SectionPage.jsx`):
- `ScannedPageBlock`: Renders a single image of the course sheet.
- `ProblemSolverGroup`: A container that iterates over problems mapped to that page.
    - `ProblemSolver`: Displays problem text (e.g. 'Solve #1') and embeds the relevant bespoke tracer.

### Textbook Architecture (Lec 01-05):
- One standalone JSX file per lecture.
- Imports shared 'Premium' UI toolkit and specialized tracers.

### Data Flow:
- `sheetXX.json` schema will be updated to include `pageNumber` for each problem to support the interspersed rendering.

## 5. Agent Team
- **Agent 1: `coder`**: Bespoke logic, `SectionPage` refactor, and tracer implementations.
- **Agent 2: `design_system_engineer`**: Editorial spacing, mobile responsiveness, and KaTeX polish.
- **Agent 3: `technical_writer`**: Accurate content porting and `sheetXX.json` cleaning.

## 6. Risk Assessment
- **Risk 1: Massive Content Port (High)**: Porting 5 lectures at once is prone to error. [Mitigation: Execute in 5 distinct phases, one per lecture].
- **Risk 2: Page Performance (Medium)**: Very long workbooks with many visualizers. [Mitigation: Use lazy-loading/virtualization if necessary].

## 7. Success Criteria
- [ ] Lectures 01-05 are live in the premium bespoke format.
- [ ] SectionPage defaults to the vertical workbook flow with no 'Interactive' tab.
- [ ] All practice problems are linked to actual problems on the scanned sheets.
- [ ] Complex math derivations in Lec 03 render with textbook-grade KaTeX.
