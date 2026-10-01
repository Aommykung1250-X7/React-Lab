// บล็อก 2.2 (SSG — Static Site Generation · TheMealDB lookup.php?i=52772)
export default async function BlogPage() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772", {
    cache: "force-cache",
  })
  const { meals } = await res.json()
  const recipe = meals ? meals[0] : null

  if (!recipe) {
    return <p>ไม่พบข้อมูลสูตรอาหาร</p>
  }

  return (
    <article className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
        <div className="flex gap-3 text-sm text-gray-500">
          <span>หมวดหมู่: <strong className="text-gray-700">{recipe.strCategory}</strong></span>
          <span>•</span>
          <span>สัญชาติ: <strong className="text-gray-700">{recipe.strArea}</strong></span>
        </div>
      </div>

      {recipe.strMealThumb && (
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full max-w-lg rounded-xl shadow-md"
        />
      )}

      <div className="border-t pt-4">
        <h2 className="text-xl font-bold mb-2">วิธีทำ (Instructions):</h2>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">
          {recipe.strInstructions}
        </p>
      </div>
    </article>
  )
}