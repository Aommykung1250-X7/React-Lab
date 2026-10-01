// บล็อก 2.6 (revalidate + Network tab)
// ดึงข้อมูลจาก Route Handler "/api/recipes" ของเราเอง
import AddRecipeForm from "@/components/AddRecipeForm"

export default async function MyRecipesPage() {
  const res = await fetch("http://localhost:3000/api/recipes", {
    next: { revalidate: 15 },
  })
  const recipes = await res.json()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">สูตรอาหารของฉัน (My Recipes)</h1>
        <p className="text-sm text-gray-500 mt-1">
          ดึงข้อมูลจาก Route Handler <code>/api/recipes</code> พร้อม <code>next: &#123; revalidate: 15 &#125;</code>
        </p>
      </div>

      <AddRecipeForm />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">รายการสูตรอาหาร ({Array.isArray(recipes) ? recipes.length : 0})</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.isArray(recipes) &&
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border p-4 rounded-lg bg-white shadow-xs flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{recipe.name}</h3>
                  <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-medium">
                    {recipe.category}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-mono">#{recipe.id}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
