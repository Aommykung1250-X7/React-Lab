import Link from 'next/link'
import RecipeDetailCard from './RecipeDetailCard'

export default async function RecipeDetailPage({ params }) {
    const { id } = await params
    let meal = null
    let error = false

    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`,
            { cache: 'no-store' }
        )
        if (!response.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ')

        const data = await response.json()
        meal = data.meals?.[0] ?? null
    } catch {
        error = true
    }

    if (error) {
        return <p className="text-red-700">⚠️ โหลดสูตรอาหารไม่สำเร็จ</p>
    }

    if (!meal) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500 mb-4">ไม่พบสูตรนี้ (id: {id})</p>
                <Link href="/recipes" className="border px-4 py-2 rounded">
                    ← กลับไปหน้ารายการ
                </Link>
            </div>
        )
    }

    return <RecipeDetailCard meal={meal} />
}