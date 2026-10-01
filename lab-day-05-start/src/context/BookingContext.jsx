import { createContext, useContext, useMemo, useState } from 'react'
import { BOOKED, MAX_HOURS, dayOf } from '../data/rooms.js'

// 🔴 context ตัวจริง ไม่ export ออกไปข้างนอก — component อื่นเข้าถึงได้ผ่าน useBooking() เท่านั้น
const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [slots, setSlots] = useState([])

  const value = useMemo(() => {
    // กฎทั้ง 4 ข้อของห้องอยู่ตรงนี้ที่เดียว
    const toggle = (id) => {
      setSlots((prev) => {
        // กดช่องที่เลือกไว้แล้วซ้ำ = ยกเลิกช่องนั้น (ต้องเช็กก่อนกฎอื่นเสมอ)
        if (prev.includes(id)) return prev.filter((s) => s !== id)
        // ช่องที่ฝ่ายอื่นจองแล้ว เลือกไม่ได้
        if (BOOKED.includes(id)) return prev
        // ไม่เกิน MAX_HOURS ชั่วโมงต่อการจอง 1 ครั้ง
        if (prev.length >= MAX_HOURS) return prev
        // ทุกช่องต้องเป็นวันเดียวกัน
        if (prev.length > 0 && dayOf(prev[0]) !== dayOf(id)) return prev
        return [...prev, id]
      })
    }

    const remove = (id) => setSlots((prev) => prev.filter((s) => s !== id))
    const clear = () => setSlots([])

    // เหตุผลที่กดช่องนั้นไม่ได้ — undefined = กดได้
    const reasonFor = (id) => {
      if (slots.includes(id)) return undefined
      if (BOOKED.includes(id)) return 'ฝ่ายอื่นจองไปแล้ว'
      if (slots.length > 0 && dayOf(slots[0]) !== dayOf(id))
        return 'จองข้ามวันไม่ได้ — ล้างรายการก่อนถ้าจะเปลี่ยนวัน'
      if (slots.length >= MAX_HOURS) return `จองได้ครั้งละไม่เกิน ${MAX_HOURS} ชั่วโมง`
      return undefined
    }

    return {
      slots,
      totalHours: slots.length,
      maxHours: MAX_HOURS,
      isPicked: (id) => slots.includes(id),
      isBooked: (id) => BOOKED.includes(id),
      reasonFor,
      toggle,
      remove,
      clear,
    }
  }, [slots])

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

// custom hook — component อื่นเรียกตัวนี้เท่านั้น
export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
