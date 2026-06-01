# Computing Algorithms — Interactive Learning Platform

An advanced, interactive educational platform designed for the **Computing Algorithms** course by **Dr. Mohamed Moheeb** at the **Arab Academy for Science and Technology (AAST)**.

This platform bridges the gap between static lecture slides and practical algorithm understanding through interactive textbook-style lessons, integrated visualizations, and an AI-powered teaching assistant.

## 🚀 Key Features

- **Interactive Lectures**: Structured reading layouts for all course chapters (Brute Force, Decrease & Conquer, Divide & Conquer, etc.).
- **Algorithm Visualizers**: Step-by-step interactive tracing for key algorithms including:
  - **Sorting**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort.
  - **Searching**: Sequential Search, Binary Search.
  - **Other**: String Matching, Hashing, Knapsack (DP).
- **AI Tutor (Antigravity AI)**: A custom-tuned AI assistant (powered by Google Gemini) that understands the specific context of Dr. Moheeb's lecture slides to provide instant explanations and guidance.
- **Section Practice**: Integrated access to course practice sheets and worked examples.
- **Cheat Sheets & Quizzes**: Quick reference guides and self-assessment tools.

## 🛠️ Technical Stack

- **Frontend**: React 19 + Vite 8
- **Routing**: React Router 7
- **AI Integration**: Google Gemini API (via custom Tutor Service)
- **Styling**: Vanilla CSS with a custom Design System
- **Content**: Markdown-driven lessons with LaTeX-style equations

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- Gemini API Key (for the AI Tutor)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/comp-algo.git
   cd comp-algo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/components/lectures`: Custom interactive lesson components.
- `src/components/visualization`: Core algorithm visualization logic.
- `src/data/lectures`: Extracted slide content and metadata (JSON).
- `src/pages`: Main application views (Home, Lecture, Section, Quiz).
- `src/services`: External API integrations (Gemini AI).

---
Built with ⚡ for AAST Computing Algorithms — Spring 2025.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
