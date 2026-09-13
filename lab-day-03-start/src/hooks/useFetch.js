import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reloadCount, setReloadCount] = useState(0)

  const refetch = () => {
    setReloadCount((prev) => prev + 1)
  }

  useEffect(() => {
    if (!url) {
      setData(null)
      setLoading(false)
      setError(null)
      return
    }

    let isCancelled = false

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('ไม่พบข้อมูลในระบบ (404 Not Found)')
          } else if (response.status === 403) {
            throw new Error('เรียกใช้งาน API เกินจำนวนครั้งที่กำหนด (403 Rate Limit)')
          } else {
            throw new Error(`เกิดข้อผิดพลาดในการโหลดข้อมูล (สถานะ: ${response.status})`)
          }
        }

        const result = await response.json()

        if (!isCancelled) {
          setData(result)
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ')
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isCancelled = true
    }
  }, [url, reloadCount])

  return { data, loading, error, refetch }
}

export default useFetch
