// Lab A a) — สร้างหน้า detail เป็น Server Component ใหม่ทั้งไฟล์
// - ไม่มี "use client" · ไม่มี useEffect/useState · await fetch(...) ตรง ๆ ใน component
// - TheMealDB: https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}
// - ⚠️ Next.js 15: params เป็น Promise → const { id } = await params
// - แสดงรูป ชื่อ หมวดหมู่ และวิธีทำ
// - แสดงรายการวัตถุดิบ + ปริมาณ (เช่น "3/4 cup · soy sauce") และหัวข้อ "วัตถุดิบ (N อย่าง)"
//   ⚠️ API ให้มาเป็น field แบน ๆ strIngredient1..20 + strMeasure1..20 ไม่ใช่ array — แปลงเอง แล้วตัดช่องว่างทิ้ง
// Lab A c) — ไม่พบสูตร → notFound() จาก "next/navigation"
//   ⚠️ ต้องรอดทั้ง /recipes/99999 และ /recipes/xxxxx — เปิด lookup.php?i=99999 กับ ?i=xxxxx เทียบดูก่อน
// Lab B c) — วาง <AddFavoriteButton /> ไว้ในหน้านี้ ส่ง mealId / name / thumb ลงไปเป็น props
import { notFound } from "next/navigation"
import AddFavoriteButton from "@/components/AddFavoriteButton"

export default async function RecipeDetailPage({ params }) {
    const { id } = await params
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const { meals } = await res.json()

    // API อาจส่ง meals เป็น null หรือค่าอื่นที่ไม่ใช่ array เมื่อหาไม่เจอ
    const meal = Array.isArray(meals) ? meals[0] : null
    if (!meal) notFound()

    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        if (typeof ingredient !== "string" || !ingredient.trim()) continue

        const amount = typeof measure === "string" ? measure.trim() : ""
        ingredients.push(amount ? `${amount} · ${ingredient.trim()}` : ingredient.trim())
    }
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mt-8">{meal.strMeal}</h1>
            <p className="mt-2">หมวดหมู่: {meal.strCategory}</p>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="mt-4 rounded" />
            <AddFavoriteButton mealId={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />
            <h2 className="text-xl font-bold mt-8">วัตถุดิบ ({ingredients.length} อย่าง)</h2>
            <ul className="mt-2 list-disc pl-6">
                {ingredients.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            <h2 className="text-xl font-bold mt-8">วิธีทำ</h2>
            <p className="mt-2 whitespace-pre-line">{meal.strInstructions}</p>
        </div>
    )
}