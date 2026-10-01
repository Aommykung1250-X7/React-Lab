// ข้อ 2 — Routes ทั้งหมด อยู่ใต้ layout route เดียว
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import PokemonList from './pages/PokemonList.jsx'
import PokemonDetail from './pages/PokemonDetail.jsx'
import Team from './pages/Team.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pokemon" element={<PokemonList />} />
        <Route path="pokemon/:nameOrId" element={<PokemonDetail />} />
        <Route path="team" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
