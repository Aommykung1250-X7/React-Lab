import { NavLink } from 'react-router-dom'

// คลาสของลิงก์: ถ้า active ให้เป็นสีส้มตัวหนา
const linkClass = ({ isActive }) =>
  isActive
    ? 'text-orange-600 font-bold'
    : 'text-gray-600 hover:text-gray-900'

function Nav() {
  return (
    <nav className="flex gap-5 px-5 py-3 border-b border-slate-200 text-sm">
      <NavLink to="/" end className={linkClass}>หน้าแรก</NavLink>
      <NavLink to="/recipes" className={linkClass}>สูตรอาหาร</NavLink>
      <NavLink to="/about" className={linkClass}>เกี่ยวกับ</NavLink>
    </nav>
  )
}

export default Nav
