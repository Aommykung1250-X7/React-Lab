// ข้อ 2 — 404
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="py-20 text-center">
      <p className="text-6xl font-bold text-gray-300">404</p>
      <h1 className="mt-4 text-2xl font-bold">ไม่พบหน้านี้</h1>
      <p className="mt-2 text-gray-600">ลิงก์อาจพิมพ์ผิด หรือหน้าถูกย้ายไปแล้ว</p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700">
        กลับหน้าแรก
      </Link>
    </section>
  )
}
