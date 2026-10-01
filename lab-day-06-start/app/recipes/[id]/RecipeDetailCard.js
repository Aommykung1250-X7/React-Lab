// ว่างไว้ตั้งใจ — Lab A: แสดงรายละเอียดสูตร (ลิงก์กลับ / รูป / ชื่อ / หมวด·ประเทศ / ส่วนผสม / วิธีทำ)
// รับ { meal } จาก app/recipes/[id]/page.js · ส่วนผสมใช้ getIngredients จาก '@/lib/getIngredients'
// ⚠️ Lab B (14:00) TA จะแจกไฟล์นี้เวอร์ชันพังมาให้วางทับ — เก็บเวอร์ชันของตัวเองไว้ก่อน (commit หรือก็อปสำรอง)
import Link from 'next/link'
import { getIngredients } from '@/lib/getIngredients'
import SaveButton from './SaveButton'

export default function RecipeDetailCard({ meal }) {
    const ingredients = getIngredients(meal)

    return (
        <article>
            <Link href="/recipes" className="text-sm text-gray-500">
                ← กลับ
            </Link>

            <h1 className="text-3xl font-bold my-3">{meal.strMeal}</h1>
            <p className="text-sm text-gray-500 mb-4">
                {meal.strCategory} · {meal.strArea}
            </p>

            <div className="mb-4">
                <SaveButton />
            </div>

            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full max-w-md rounded mb-6"
            />

            <h2 className="text-xl font-bold mb-2">ส่วนผสม</h2>
            <ul className="mb-6 space-y-1">
                {ingredients.map(({ name, measure }, index) => (
                    <li key={`${index}-${name}`}>
                        • {measure} {name}
                    </li>
                ))}
            </ul>

            <h2 className="text-xl font-bold mb-2">วิธีทำ</h2>
            <p className="whitespace-pre-line leading-relaxed">
                {meal.strInstructions}
            </p>
        </article>
    )
}