// R1 — custom hook สำหรับ fetch ทุกจุดในแอป
import { useEffect, useState } from 'react'

export function useFetch(url) {
  // เก็บผลลัพธ์คู่กับ "url เจ้าของผลลัพธ์" → ข้อมูลของ url เก่าจะไม่ถูกแสดงเป็นของ url ใหม่
  const [result, setResult] = useState({ url: null, data: null, error: null })

  useEffect(() => {
    // (3) url = null แปลว่า "ไม่ต้องยิง"
    if (!url) return

    // (2) cleanup: ธง + abort กันไม่ให้ response ของ url เก่ามา setState ทับ url ใหม่ (Twist 5)
    let cancelled = false
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((res) => {
        // (1) PokéAPI คืน 404 จริงเมื่อไม่พบ — fetch ไม่ throw เอง ต้องเช็ก res.ok เอง
        if (!res.ok) throw new Error(res.status === 404 ? 'NOT_FOUND' : `HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setResult({ url, data, error: null })
      })
      .catch((err) => {
        if (!cancelled && err.name !== 'AbortError') setResult({ url, data: null, error: err })
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [url])

  // สถานะคำนวณตอน render: ถ้าผลลัพธ์ที่มียังไม่ใช่ของ url ปัจจุบัน = กำลังโหลด
  const isCurrent = Boolean(url) && result.url === url
  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    loading: Boolean(url) && !isCurrent,
  }
}

export default useFetch
