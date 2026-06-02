import { HashRouter, Routes, Route, useParams } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import LecturePage from './pages/LecturePage'
import SectionPage from './pages/SectionPage'
import QuizPage from './pages/QuizPage'
import CheatSheetPage from './pages/CheatSheetPage'
import Lec06 from './pages/lectures/Lec06'
import Lec07 from './pages/lectures/Lec07'
import Lec09 from './pages/lectures/Lec09'
import Lec10 from './pages/lectures/Lec10'
import Lec11 from './pages/lectures/Lec11'
import Lec13 from './pages/lectures/Lec13'

function LecturePageRoute() {
  const { id } = useParams()
  if (id === '06') return <Lec06 />
  if (id === '07') return <Lec07 />
  if (id === '09') return <Lec09 />
  if (id === '10') return <Lec10 />
  if (id === '11') return <Lec11 />
  if (id === '13') return <Lec13 />
  return <LecturePage />
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
