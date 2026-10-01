// บล็อก 2.4 (GET) · 🖐 #11 (?category=) · 2.5 (POST)
// Route Handlers สำหรับจัดการ recipes ในหน่วยความจำ (in-memory)
import { recipes } from "@/lib/data/recipes"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  if (category) {
    const filtered = recipes.filter(
      (r) => r.category.toLowerCase() === category.toLowerCase()
    )
    return Response.json(filtered)
  }

  return Response.json(recipes)
}

export async function POST(request) {
  try {
    const body = await request.json()

    if (!body.name) {
      return Response.json({ error: "Name is required" }, { status: 400 })
    }

    const newRecipe = {
      id: recipes.length > 0 ? Math.max(...recipes.map((r) => r.id)) + 1 : 1,
      name: body.name,
      category: body.category || "General",
    }

    recipes.push(newRecipe)
    return Response.json(newRecipe, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Invalid JSON format" }, { status: 400 })
  }
}
