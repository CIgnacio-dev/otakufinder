import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchAnime from './pages/SearchAnime'
import AnimeDetail from './pages/AnimeDetail'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchAnime />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
      </Routes>
    </Router>
  )
}
