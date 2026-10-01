import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.jsx'

// ✅ อ่านจาก context เอง ไม่รับ prop จาก App (คนละกิ่งกับ BookingPage)
function Header() {
  const { totalHours, maxHours } = useBooking()

  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3">
      <Link to="/" className="text-lg font-bold">
        🏢 จองห้องประชุม
      </Link>
      <Link to="/summary" className="text-sm text-blue-600 hover:underline">
        จองแล้ว {totalHours} ชม. / สูงสุด {maxHours} ชม.
      </Link>
    </header>
  )
}
export default Header
