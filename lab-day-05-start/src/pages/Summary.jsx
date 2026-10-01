import { Link } from 'react-router-dom'
import { hourOf, slotLabel } from '../data/rooms.js'
import { useBooking } from '../context/BookingContext.jsx'

function Summary() {
  const { slots, totalHours, maxHours, remove, clear } = useBooking()

  // เรียงตามเวลาให้อ่านง่าย (ทุกช่องเป็นวันเดียวกันอยู่แล้ว)
  const sorted = [...slots].sort((a, b) => hourOf(a) - hourOf(b))

  if (sorted.length === 0) {
    return (
      <section>
        <h1 className="text-2xl font-bold">รายการที่เลือก (0/{maxHours} ชม.)</h1>
        <p className="mt-4 text-gray-500">ยังไม่ได้เลือกช่วงเวลา</p>
        <Link to="/" className="mt-6 inline-block rounded bg-blue-600 px-4 py-2 font-semibold text-white">
          กลับไปเลือกเวลา
        </Link>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          รายการที่เลือก ({totalHours}/{maxHours} ชม.)
        </h1>
        <button type="button" onClick={clear} className="text-sm text-red-600 hover:underline">
          ล้างทั้งหมด
        </button>
      </div>

      <ul className="mt-4 divide-y rounded border">
        {sorted.map((id) => (
          <li key={id} className="flex items-center justify-between px-4 py-3">
            <span>{slotLabel(id)}</span>
            <button
              type="button"
              onClick={() => remove(id)}
              className="rounded border border-red-600 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
            >
              เอาออก
            </button>
          </li>
        ))}
      </ul>

      <Link to="/confirm" className="mt-6 inline-block rounded bg-blue-600 px-4 py-2 font-semibold text-white">
        ยืนยันการจอง
      </Link>
    </section>
  )
}
export default Summary
