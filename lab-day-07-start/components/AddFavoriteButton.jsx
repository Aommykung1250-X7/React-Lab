"use client"

import { useState } from "react"

export default function AddFavoriteButton({ mealId, name, thumb }) {
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

  async function addFavorite() {
    setStatus("saving")
    setError("")

    try {
      const res = await fetch("/api/my-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealId, name, thumb })
      })
      const data = await res.json()

      if (res.ok || res.status === 409) {
        setStatus("saved")
      } else {
        setStatus("idle")
        setError(data.error)
      }
    } catch {
      setStatus("idle")
      setError("เชื่อมต่อ API ไม่สำเร็จ")
    }
  }

  let buttonText = "เพิ่มในสูตรโปรด"
  if (status === "saving") buttonText = "กำลังบันทึก..."
  if (status === "saved") buttonText = "เพิ่มไว้แล้ว ✓"

  return (
    <div className="mt-4">
      <button
        onClick={addFavorite}
        disabled={status === "saving" || status === "saved"}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
      >
        {buttonText}
      </button>
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  )
}
