import { HashRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import LecturePage from './pages/LecturePage'
import SectionPage from './pages/SectionPage'
import QuizPage from './pages/QuizPage'
import CheatSheetPage from './pages/CheatSheetPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lecture/:id" element={<LecturePage />} />
          <Route path="section/:id" element={<SectionPage />} />
          <Route path="quiz/:id" element={<QuizPage />} />
          <Route path="cheatsheet" element={<CheatSheetPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
