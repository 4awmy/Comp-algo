import { HashRouter, Routes, Route, useParams } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import LecturePage from './pages/LecturePage'
import SectionPage from './pages/SectionPage'
import QuizPage from './pages/QuizPage'
import CheatSheetPage from './pages/CheatSheetPage'
import Lec06 from './pages/lectures/Lec06'

function LecturePageRoute() {
  const { id } = useParams()
  return id === '06' ? <Lec06 /> : <LecturePage />
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lecture/:id" element={<LecturePageRoute />} />
          <Route path="section/:id" element={<SectionPage />} />
          <Route path="quiz/:id" element={<QuizPage />} />
          <Route path="cheatsheet" element={<CheatSheetPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
