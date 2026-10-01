import { slotId } from '../data/rooms.js'
import { useBooking } from '../context/BookingContext.jsx'

// ✅ เรียก useBooking() เอง ไม่ต้องรับ slots/toggle จากข้างบน
function SlotButton({ dayCode, hour }) {
  const { isPicked, isBooked, reasonFor, toggle } = useBooking()

  const id = slotId(dayCode, hour)
  const picked = isPicked(id)
  const takenByOthers = isBooked(id)
  const reason = reasonFor(id)
  // ช่องที่เลือกไว้แล้ว ต้องกดยกเลิกได้เสมอ แม้จะครบ 4 ชม.
  const disabled = !picked && Boolean(reason)

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      disabled={disabled}
      title={reason}
      className={
        'w-full rounded border px-1 py-1.5 text-xs ' +
        (picked
          ? 'border-blue-600 bg-blue-600 font-semibold text-white'
          : takenByOthers
            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 line-through'
            : disabled
              ? 'cursor-not-allowed border-gray-200 bg-white text-gray-300'
              : 'border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50')
      }
    >
      {String(hour).padStart(2, '0')}:00
    </button>
  )
}
export default SlotButton
