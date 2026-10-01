import { connection } from "next/server"

export default async function MyRecipesPage() {
  await connection()
  const res = await fetch("http://localhost:3000/api/my-recipes", {
    next: { revalidate: 15 }
  })
  const recipes = await res.json()
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">สูตรโปรดของฉัน</h1>
      {recipes.length === 0 ? (
        <p>ยังไม่มีสูตรโปรด ลองเปิดหน้ารายละเอียดสูตรแล้วกดเพิ่ม</p>
      ) : (
        <ul className="list-disc pl-6">
          {recipes.map(recipe => <li key={recipe.id}>{recipe.name}</li>)}
        </ul>
      )}
    </div>
  )
}
