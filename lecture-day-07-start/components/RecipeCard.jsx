export default function RecipeCard({ recipe }) {
  return (
    <div className="block border rounded-lg overflow-hidden">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full aspect-square object-cover" />
      <div className="p-3">
        <h3 className="font-bold text-sm line-clamp-1">{recipe.strMeal}</h3>
      </div>
    </div>
  )
}
