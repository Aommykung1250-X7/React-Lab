import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'

function RecipeDetail() {
  const { id } = useParams()          // ★ อ่านค่า :id จาก URL
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  )

  if (loading) return <p className="text-sm text-slate-500 py-8">กำลังโหลด...</p>
  if (error) return <p className="text-sm text-red-600 py-8">เกิดข้อผิดพลาด: {error}</p>

  const meal = data?.meals?.[0]       // ★ ไม่พบ → meals เป็น null

  if (!meal) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-bold">ไม่พบสูตรนี้</p>
        <p className="text-sm text-slate-500 mt-1 mb-5">id: {id}</p>
        <Link to="/recipes" className="text-orange-600 underline text-sm">
          ← กลับไปหน้าสูตรอาหาร
        </Link>
      </div>
    )
  }

  // รวมวัตถุดิบ: API เก็บเป็น strIngredient1..20 / strMeasure1..20
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (name && name.trim()) ingredients.push(`${name} — ${measure ?? ''}`.trim())
  }

  return (
    <div>
      <Link to="/recipes" className="text-xs text-slate-500 hover:underline">← กลับ</Link>

      <h2 className="text-lg font-extrabold mt-2">{meal.strMeal}</h2>
      <p className="text-xs text-slate-500 mt-0.5 mb-3">
        {meal.strCategory} · {meal.strArea}
      </p>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full max-h-64 object-cover rounded-lg mb-3"
      />

      <h3 className="text-[13px] font-extrabold mt-3 mb-1">วัตถุดิบ</h3>
      <ul className="text-xs text-slate-700 leading-6 list-disc list-inside">
        {ingredients.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <h3 className="text-[13px] font-extrabold mt-4 mb-1">วิธีทำ</h3>
      <p className="text-xs text-slate-700 leading-6 whitespace-pre-line">
        {meal.strInstructions}
      </p>
    </div>
  )
}

export default RecipeDetail
