// บล็อก 1.1–1.2: async Server Component + แสดงเมนูแนะนำ FeaturedRecipes
import RecipeList from "@/components/RecipeList"
import FeaturedRecipes from "@/components/FeaturedRecipes"

export default async function RecipesPage() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
  const data = await res.json()
  const recipes = data.meals || []
  const featured = recipes.slice(0, 3)

  return (
    <div>
      <FeaturedRecipes recipes={featured} />
      <h1 className="text-2xl font-bold mb-4">สูตรของหวานทั้งหมด</h1>
      <RecipeList recipes={recipes} />
    </div>
  )
}
