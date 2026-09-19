import { Outlet } from 'react-router-dom'
import Nav from './Nav.jsx'

function Layout() {
  return (
    <div className="max-w-4xl mx-auto my-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <Nav />

      {/* เนื้อหาของแต่ละหน้าจะถูกเสียบตรงนี้ */}
      <main className="px-5 py-4 min-h-[300px]">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 p-2 text-center text-[11px] text-slate-400">
        Recipe Browser · Lab Day 4 · ข้อมูลจาก TheMealDB
      </footer>
    </div>
  )
}

export default Layout
