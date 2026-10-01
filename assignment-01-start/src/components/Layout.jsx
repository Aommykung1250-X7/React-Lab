// ข้อ 2 — layout route: Nav + <Outlet /> + footer
import { Outlet } from 'react-router-dom'
import Nav from './Nav.jsx'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Nav />
      <main className="flex-1 mx-auto w-full max-w-5xl p-4 sm:p-6">
        <Outlet />
      </main>
      <footer className="border-t bg-white py-4 text-center text-sm text-gray-500">
        Pokédex Team Builder · ข้อมูลจาก PokéAPI
      </footer>
    </div>
  )
}
