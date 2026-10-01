import SearchBox from './SearchBox'
import RecipeCard from './RecipeCard'

export default async function RecipesPage({ searchParams }) {
    const { q: rawQ } = await searchParams
    const q = typeof rawQ === 'string' ? rawQ.trim() : ''

    const apiUrl = q
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`
        : 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'

    let meals = []
    let error = false

    try {
        const response = await fetch(apiUrl, { cache: 'no-store' })
        if (!response.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ')

        const data = await response.json()
        meals = data.meals ?? []
    } catch {
        error = true
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">สูตรอาหาร</h1>

            <SearchBox key={q} initialQuery={q} />

            {error ? (
                <p className="text-red-700">⚠️ โหลดสูตรอาหารไม่สำเร็จ</p>
            ) : meals.length === 0 ? (
                <p className="text-gray-500">
                    {q ? `ไม่พบสูตรที่ตรงกับ "${q}"` : 'ไม่มีข้อมูล'}
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {meals.map((meal) => (
                        <RecipeCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
            )}
        </>
    )
}