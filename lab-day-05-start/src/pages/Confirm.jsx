import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DEPARTMENTS, hourOf, slotLabel } from '../data/rooms.js'
import { bookingSchema } from '../schemas/booking.js'
import { useBooking } from '../context/BookingContext.jsx'

function Confirm() {
  const { slots, totalHours, clear } = useBooking()
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    // ไม่ขึ้น error ตั้งแต่ยังพิมพ์ไม่เสร็จ: เช็กตอนกดส่งครั้งแรก แล้วค่อยอัปเดตสดตอนแก้
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { bookerName: '', department: '', email: '', confirmEmail: '', purpose: '' },
  })

  // ยังไม่เลือกเวลา → ห้ามเข้ามากรอกฟอร์มตรง ๆ
  if (slots.length === 0 && !done) return <Navigate to="/summary" replace />

  const onSubmit = (data) => {
    console.log('booking', { ...data, slots })
    clear()
    setDone(true)
  }

  if (done) {
    return (
      <section>
        <h1 className="text-2xl font-bold">✅ จองสำเร็จ</h1>
        <p className="mt-2 text-sm text-gray-500">ระบบบันทึกการจองเรียบร้อยแล้ว</p>
        <Link to="/" className="mt-6 inline-block rounded bg-blue-600 px-4 py-2 font-semibold text-white">
          กลับหน้าแรก
        </Link>
      </section>
    )
  }

  const sorted = [...slots].sort((a, b) => hourOf(a) - hourOf(b))

  return (
    <section>
      <h1 className="mb-1 text-2xl font-bold">ยืนยันการจอง</h1>
      <p className="mb-6 text-sm text-gray-500">
        รวม {totalHours} ชั่วโมง · {sorted.map(slotLabel).join(' , ')}
      </p>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
        <label className="mb-4 block">
          <span className="text-sm font-medium">ชื่อผู้จอง</span>
          <input {...register('bookerName')} className="mt-1 w-full rounded border px-3 py-2" />
          {errors.bookerName && <p className="mt-1 text-sm text-red-600">{errors.bookerName.message}</p>}
        </label>

        <label className="mb-4 block">
          <span className="text-sm font-medium">แผนก</span>
          <select {...register('department')} className="mt-1 w-full rounded border px-3 py-2">
            <option value="">— เลือกแผนก —</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
        </label>

        <label className="mb-4 block">
          <span className="text-sm font-medium">อีเมล</span>
          <input {...register('email')} className="mt-1 w-full rounded border px-3 py-2" />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </label>

        <label className="mb-4 block">
          <span className="text-sm font-medium">ยืนยันอีเมลอีกครั้ง</span>
          <input {...register('confirmEmail')} className="mt-1 w-full rounded border px-3 py-2" />
          {errors.confirmEmail && <p className="mt-1 text-sm text-red-600">{errors.confirmEmail.message}</p>}
        </label>

        <label className="mb-4 block">
          <span className="text-sm font-medium">วัตถุประสงค์การใช้ห้อง</span>
          <textarea rows="3" {...register('purpose')} className="mt-1 w-full rounded border px-3 py-2" />
          {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          ยืนยันการจอง
        </button>
      </form>
    </section>
  )
}
export default Confirm
