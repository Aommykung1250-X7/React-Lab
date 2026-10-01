// ข้อ 2 — NavLink + active state · จำนวนทีมมาจาก useTeam()
import { NavLink } from 'react-router-dom'
import { useTeam } from '../context/TeamContext.jsx'

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
    isActive ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'
  }`

export default function Nav() {
  const { count, maxTeam } = useTeam()

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <nav className="mx-auto flex max-w-5xl items-center gap-2 p-3">
        <span className="mr-auto text-lg font-bold">
          <span className="text-red-600">Poké</span>dex
        </span>
        <NavLink to="/" end className={linkClass}>หน้าแรก</NavLink>
        <NavLink to="/pokemon" className={linkClass}>Pokédex</NavLink>
        <NavLink to="/team" className={linkClass}>ทีม ({count}/{maxTeam})</NavLink>
      </nav>
    </header>
  )
}
