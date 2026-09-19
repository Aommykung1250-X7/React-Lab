import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center py-10">
      <p className="text-5xl font-extrabold text-slate-300">404</p>
      <p className="text-lg font-bold mt-2">ไม่พบหน้านี้</p>
      <p className="text-sm text-slate-500 mt-1 mb-5">ลองตรวจ URL อีกครั้ง</p>
      <Link
        to="/"
        className="inline-block border border-slate-300 rounded-md px-4 py-2 text-sm hover:bg-slate-50"
      >
        กลับหน้าแรก
      </Link>
    </div>
  )
}

export default NotFound
