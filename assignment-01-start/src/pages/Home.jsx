// ข้อ 2 — หน้าแรก: ต้อนรับ + ลิงก์ไป /pokemon + จำนวนสมาชิกทีม
import { Link } from 'react-router-dom'
import { useTeam } from '../context/TeamContext.jsx'

export default function Home() {
  const { count, maxTeam } = useTeam()

  return (
    <section className="mx-auto max-w-xl py-12 text-center">
      <h1 className="text-3xl font-bold sm:text-4xl">Pokédex Team Builder</h1>
      <p className="mt-3 text-gray-600">
        เลือก Pokémon รุ่นแรก (#1–#{151}) มาจัดทีมของคุณ สูงสุด {maxTeam} ตัว
      </p>

      <p className="mt-6 text-lg">
        ตอนนี้ทีมมี <strong className="text-red-600">{count}</strong> / {maxTeam} ตัว
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <Link to="/pokemon" className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700">
          เปิด Pokédex
        </Link>
        <Link to="/team" className="rounded-lg border px-5 py-2.5 font-medium hover:bg-gray-100">
          ดูทีมของฉัน
        </Link>
      </div>
    </section>
  )
}
