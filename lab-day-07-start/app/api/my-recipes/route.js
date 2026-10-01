import { NextResponse } from "next/server"
import { myRecipes } from "@/lib/data/my-recipes"

export async function GET(request) {
  const q = new URL(request.url).searchParams.get("q")
  const recipes = q
    ? myRecipes.filter(recipe => recipe.name.toLowerCase().includes(q.toLowerCase()))
    : myRecipes

  return NextResponse.json(recipes)
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "กรุณาส่งข้อมูลเป็น JSON" }, { status: 400 })
  }

  if (typeof body?.mealId !== "string" || !body.mealId.trim() ||
      typeof body?.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "กรุณาระบุ mealId และ name" }, { status: 400 })
  }

  const mealId = body.mealId.trim()
  if (myRecipes.some(recipe => recipe.mealId === mealId)) {
    return NextResponse.json({ error: "สูตรนี้อยู่ในรายการโปรดแล้ว" }, { status: 409 })
  }

  const recipe = {
    id: Date.now(),
    mealId,
    name: body.name.trim(),
    thumb: typeof body.thumb === "string" ? body.thumb : ""
  }
  myRecipes.push(recipe)
  return NextResponse.json(recipe, { status: 201 })
}
