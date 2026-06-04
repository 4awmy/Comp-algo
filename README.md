# Computing Algorithms Interactive Learning Platform

An interactive course portal for the **Computing Algorithms** curriculum taught by **Dr. Moheeb** at **AAST**. The project turns lecture slides and section sheets into a structured learning experience built around premium lecture pages, scanned workbook support, interactive algorithm tracers, quizzes, and an AI tutor.

## Overview

This repository is a **frontend-first educational platform** built with React and Vite. It combines:

- authored lecture experiences for each covered topic
- extracted slide and sheet content stored as JSON
- image-backed lecture and workbook assets
- interactive visualizations for core algorithms
- course quizzes and a complexity cheat sheet
- a Gemini-powered tutor workflow for student Q&A

The application is designed to bridge the gap between static classroom material and a modern, self-guided learning experience.

## What the Project Includes

### 1. Premium lecture pages

Each lecture route under `src/pages/lectures/` is a custom-built learning page rather than a generic slide renderer. These pages mix:

- editorial lesson sections
- algorithm summaries
- math rendering with KaTeX
- embedded diagrams and visual stages
- bespoke algorithm tracers
- slide-derived images and illustrations

### 2. Practice sheet workbooks

The section pages load structured problem sets from `src/data/sheets/` and pair them with:

- scanned original worksheet images from `public/images/sheets/`
- worked answers and explanations
- interactive problem-specific visualizers

### 3. Algorithm visualizers

The project contains a large set of custom tracers in `src/components/visualization/bespoke/` for topics such as:

- sorting algorithms
- graph traversal
- divide and conquer
- AVL trees
- heaps
- hashing
- string matching
- dynamic programming
- greedy methods

These components are central to the product, not just add-ons.

### 4. Assessment and revision tools

Students can also use:

- per-lecture quizzes from `src/data/quizzes.js`
- a complexity cheat sheet page
- structured topic navigation in the sidebar

### 5. AI tutor

The UI includes an **Antigravity AI Tutor** available globally from the main layout. The tutor is wired through `src/services/geminiService.js` and attempts:

1. a local proxy endpoint at `/api/tutor`
2. a direct Gemini API fallback from the client

The tutor is used both on lecture pages and from the floating app-wide chat entry point.

## Course Coverage

The current app includes **11 lecture tracks**:

- Lecture 01: Introduction to Algorithms
- Lecture 02: Analysis Fundamentals
- Lecture 03: Complexity Analysis
- Lecture 04: Brute Force
- Lecture 05: Brute Force II
- Lecture 06: Decrease and Conquer
- Lecture 07: Decrease and Conquer II
- Lecture 09: Divide and Conquer
- Lecture 10: Transform and Conquer
- Lecture 11: Space and Time Trade-offs
- Lecture 13: Dynamic Programming and Greedy

Notes:

- Lecture `08` is intentionally skipped in the data model.
- Lecture `13` currently has no section sheet.
- Content mapping is documented further in `content_mapping.md`.

## Application Architecture

### Frontend stack

- `React 19`
- `Vite 8`
- `React Router 7`
- `react-markdown`
- `remark-gfm`
- `KaTeX` via `react-katex`
- CSS Modules plus shared global/design-system styles

### Routing model

The app uses `HashRouter`, which makes it suitable for static hosting environments such as GitHub Pages.

Main routes:

- `/` - home page
- `/lecture/:id` - lecture experience
- `/section/:id` - interactive workbook
- `/quiz/:id` - lecture quiz
- `/cheatsheet` - algorithm complexity reference

Route resolution for premium lecture pages happens in `src/App.jsx`.

### Data flow

The platform is driven by a mix of authored React pages and extracted content:

- `src/data/lectures.js` defines lecture metadata, ordering, topics, and sheet availability
- `src/data/lectures/*.json` stores extracted lecture slide content
- `src/data/sheets/*.json` stores workbook problems and explanations
- `src/data/quizzes.js` stores quiz questions and explanations
- `public/images/lectures/` and `public/images/sheets/` store exported source assets

### UI composition

Core UI layers:

- `src/components/layout/` for the shell, sidebar, top bar, and AI launcher
- `src/components/ui/Premium/` for premium lesson building blocks
- `src/components/visualization/` for shared and bespoke visualizers
- `src/components/chat/` for the tutor interface

## Repository Structure

```text
Comp-algo/
|-- public/
|   `-- images/
|       |-- lectures/          # exported lecture slide images
|       `-- sheets/            # scanned workbook images
|-- src/
|   |-- components/
|   |   |-- chat/             # AI tutor UI
|   |   |-- layout/           # shell, sidebar, top bar, FAB
|   |   |-- lectures/         # lecture helpers for synchronized content views
|   |   |-- ui/Premium/       # premium lesson components
|   |   `-- visualization/    # generic + bespoke visualizers
|   |-- data/
|   |   |-- lectures/         # extracted lecture JSON
|   |   |-- sheets/           # extracted workbook JSON
|   |   |-- lectures.js       # lecture metadata source of truth
|   |   |-- mappings.js       # code-to-visual mapping support
|   |   `-- quizzes.js        # quiz data
|   |-- hooks/
|   |-- pages/
|   |   `-- lectures/         # bespoke lecture pages
|   |-- services/             # Gemini tutor integration
|   `-- styles/               # design system + global styles
|-- scripts/                  # content extraction and enrichment utilities
|-- docs/                     # implementation plans and project notes
|-- content_mapping.md        # course material alignment
|-- GEMINI.md                 # premium lecture authoring standards
`-- package.json
```

## Content Production Pipeline

This repository is not only a frontend app; it also contains utilities for generating the learning content from source course material.

### Lecture extraction

`scripts/extract_content.py`:

- reads `.pptx` lecture decks
- extracts titles, bullets, speaker notes, and slide images
- detects text-light slides
- runs OCR for image-heavy slides
- writes lecture JSON into `src/data/lectures/`

### Section sheet extraction

Two approaches are present:

- `scripts/extract_sheets.py` for text-based `.docx` parsing
- `scripts/extract_sheets_ocr.py` for image-heavy workbook documents using OCR plus Gemini structuring

### Explanation enrichment

- `scripts/generate_explanations.py` generates step-by-step explanations for sheet problems
- `scripts/populate_static_explanations.py` backfills default explanation content where needed

## Local Development

### Prerequisites

- `Node.js 18+`
- `npm`

Optional for content-generation scripts:

- `Python 3`
- Python packages used by the scripts, including:
  - `python-pptx`
  - `python-docx`
  - `google-genai`

### Install and run

```bash
npm install
npm run dev
```

Default Vite commands:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Deployment

The repository includes GitHub Pages deployment scripts:

```bash
npm run predeploy
npm run deploy
```

Because the app uses `HashRouter`, static deployment is straightforward and does not require server-side route rewriting.

## AI Tutor Notes

The current tutor integration is implemented in `src/services/geminiService.js`.

Behavior:

- first attempts a local endpoint at `/api/tutor`
- falls back to direct Gemini API access from the frontend

Important operational note:

- for a production-grade deployment, Gemini credentials should be served from a backend or proxy rather than exposed in browser code

For the extraction scripts, Gemini access is expected through the `GEMINI_API_KEY` environment variable.

## Key Design Characteristics

- **Frontend-first**: the main product is a static-friendly React application
- **Content-rich**: lecture and workbook material is stored inside the repo as app data
- **Bespoke pedagogy**: many lecture pages are hand-authored to feel like interactive textbook chapters
- **Visualization-driven**: algorithm tracers are a primary teaching mechanism
- **Course-specific**: the experience is tightly tailored to one curriculum and instructor

## Recommended Reading Order for New Contributors

If you are onboarding into the codebase, start here:

1. `src/App.jsx`
2. `src/data/lectures.js`
3. `src/pages/HomePage.jsx`
4. `src/pages/lectures/`
5. `src/pages/SectionPage.jsx`
6. `src/components/visualization/bespoke/`
7. `scripts/`
8. `GEMINI.md`

## Current Status Summary

At the time of this README rewrite, the repository already contains:

- the full app shell and navigation
- premium lecture pages for all active lecture IDs
- lecture JSON and workbook JSON content
- scanned lecture/sheet media assets
- interactive quizzes
- AI tutor UI integration
- a substantial library of bespoke visualizers

This makes the project both a **course delivery platform** and a **content-authoring pipeline** for interactive algorithm education.
