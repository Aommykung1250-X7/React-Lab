"use client"

// บล็อก 2.5 (Client Component)
// ฟอร์มสำหรับ POST ข้อมูลไปที่ "/api/recipes"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddRecipeForm() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("Chicken")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category }),
      })

      if (res.ok) {
        setName("")
        router.refresh() // รีเฟรชข้อมูล Server Component บนหน้าจอ
      }
    } catch (err) {
      console.error("Failed to add recipe:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded-lg mb-6 bg-gray-50 flex flex-col sm:flex-row gap-3 items-center"
    >
      <input
        type="text"
        placeholder="ชื่อสูตรอาหารใหม่ เช่น ต้มยำกุ้ง..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-3 py-2 rounded-md flex-1 w-full bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded-md bg-white text-gray-800 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="Chicken">Chicken</option>
        <option value="Dessert">Dessert</option>
        <option value="Soup">Soup</option>
        <option value="Seafood">Seafood</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-md text-sm transition-colors w-full sm:w-auto disabled:opacity-50"
      >
        {loading ? "กำลังบันทึก..." : "+ เพิ่มสูตรอาหาร"}
      </button>
    </form>
  )
}
