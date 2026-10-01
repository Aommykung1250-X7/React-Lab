// R4, R5 — createContext + TeamProvider + useTeam() (พร้อม guard) · สูงสุด 6 ตัว ห้ามซ้ำ · เก็บใน localStorage
import { createContext, useContext, useEffect, useState } from 'react'
import { MAX_ID } from '../lib/pokemon.js'

const MAX_TEAM = 6
const STORAGE_KEY = 'pokedex-team'

// ค่าเริ่มต้น null → ใช้ตรวจว่า useTeam() ถูกเรียกนอก Provider หรือไม่
const TeamContext = createContext(null)

// R5 — อ่านทีมจาก localStorage แบบไม่เชื่อข้อมูล: เสีย/ผิดรูปแบบ = ทีมว่าง (ไม่จอขาว)
function loadTeam() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!Array.isArray(parsed)) return []

    const seen = new Set()
    const team = []
    for (const p of parsed) {
      const valid =
        p !== null &&
        typeof p === 'object' &&
        Number.isInteger(p.id) &&
        p.id >= 1 &&
        p.id <= MAX_ID &&
        typeof p.name === 'string'
      if (valid && !seen.has(p.id)) {
        seen.add(p.id)
        team.push({ id: p.id, name: p.name })
      }
    }
    return team.slice(0, MAX_TEAM)
  } catch {
    // JSON.parse('abc') throw → ถือว่าทีมว่าง (Twist 7)
    return []
  }
}

export function TeamProvider({ children }) {
  // lazy initializer: อ่าน localStorage ครั้งเดียวตอน mount
  const [team, setTeam] = useState(loadTeam)

  // R5 — ทีมเปลี่ยนเมื่อไหร่ เขียนลง localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(team))
  }, [team])

  // R4 — อัปเดตแบบ immutable และเช็กกติกาใน updater (ใช้ prev ล่าสุดเสมอ แม้กดรัว)
  function add(pokemon) {
    setTeam((prev) => {
      if (prev.length >= MAX_TEAM) return prev // ห้ามเกิน 6
      if (prev.some((p) => p.id === pokemon.id)) return prev // ห้ามซ้ำ
      return [...prev, { id: pokemon.id, name: pokemon.name }]
    })
  }

  function remove(id) {
    setTeam((prev) => prev.filter((p) => p.id !== id))
  }

  function clear() {
    setTeam([])
  }

  // R4 — ค่าที่คำนวณได้ คำนวณตอน render ไม่เก็บเป็น state แยก
  const count = team.length
  const isFull = count >= MAX_TEAM
  const has = (id) => team.some((p) => p.id === id)

  const value = { team, count, isFull, maxTeam: MAX_TEAM, has, add, remove, clear }

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}

// R4 — ทางเข้าเดียวของ Context: ทั้งโปรเจกต์อ่าน TeamContext ผ่าน hook นี้ที่เดียว
export function useTeam() {
  const ctx = useContext(TeamContext)
  if (ctx === null) {
    throw new Error('useTeam() ต้องถูกเรียกภายใน <TeamProvider> — ตรวจว่า main.jsx ครอบ <App /> ด้วย <TeamProvider> แล้ว')
  }
  return ctx
}
