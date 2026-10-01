// บล็อก 2.2 (ISR — Incremental Static Regeneration · TheMealDB Seafood + next: { revalidate: 60 })
import RecipeList from "@/components/RecipeList"

export default async function ProductsPage() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood", {
    next: { revalidate: 60 },
  })
  const { meals } = await res.json()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">เมนูอาหารทะเล Seafood (ISR)</h1>
        <p className="text-sm text-gray-500">
          ตั้งค่า Revalidate ทุก 60 วินาที ด้วย <code>next: &#123; revalidate: 60 &#125;</code>
        </p>
      </div>
      <RecipeList recipes={meals || []} />
    </div>
  )
}
