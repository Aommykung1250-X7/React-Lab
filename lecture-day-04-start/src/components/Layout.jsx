import { Outlet } from 'react-router-dom'
import Nav from './Nav.jsx'

// 👀 ไฟล์นี้มีให้แล้ว — ใช้ตั้งแต่บล็อก 1.4
// ⌨️ พิมพ์ตาม #2 (1.4): import { Outlet } แล้ววาง <Outlet /> ใน <main>

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <footer className="p-4 border-t text-sm">© 2026 DII CAMT</footer>
    </div>
  )
}
export default Layout
