import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'

const LIST_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'
const SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''        // ★ ค่าในช่องค้นหา "มาจาก URL"

  // หน่วงการยิง API 400ms (ช่องค้นหายังตอบสนองทันที เพราะ value มาจาก q)
  const [debouncedQ, setDebouncedQ] = useState(q)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 400)
    return () => clearTimeout(t)
  }, [q])

  const url = debouncedQ ? SEARCH_URL + encodeURIComponent(debouncedQ) : LIST_URL
  const { data, loading, error } = useFetch(url)

  function handleChange(e) {
    const value = e.target.value
    // ★ replace: true → ไม่ push history ทีละตัวอักษร กด back ทีเดียวกลับหน้าเดิม
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  const meals = data?.meals ?? []

  return (
    <div>
      <h2 className="text-lg font-extrabold mb-3">สูตรอาหาร</h2>

      <input
        type="search"
        value={q}
        onChange={handleChange}
        placeholder="ค้นหาสูตรอาหาร เช่น chicken"
        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-4
                   focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {loading ? (
        <p className="text-sm text-slate-500 py-8">กำลังโหลด...</p>
      ) : error ? (
        <p className="text-sm text-red-600 py-8">เกิดข้อผิดพลาด: {error}</p>
      ) : meals.length === 0 ? (
        <p className="text-sm text-slate-500 py-8">
          ไม่พบสูตรอาหาร{debouncedQ && ` สำหรับ "${debouncedQ}"`}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {meals.map(meal => (
            <Link
              key={meal.idMeal}
              to={`/recipes/${meal.idMeal}`}
              className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="aspect-[4/3] w-full object-cover"
              />
              <p className="text-xs font-semibold px-2 py-1.5">{meal.strMeal}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Recipes
