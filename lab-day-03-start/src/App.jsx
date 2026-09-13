import { users as ALL_USERS } from './data/users.js'

// TODO Lab A: filter ALL_USERS ตาม query + minFollowers (คำนวณสดตอน render — ห้ามเก็บเป็น state)
// TODO Lab A: import และใช้ FilterBar.jsx + UserCard.jsx (เขียนเองก่อน — ตอนนี้ยังว่างอยู่)
// TODO Lab A: แสดงเป็น grid + "พบ X รายการ" + empty state + ปุ่มล้างตัวกรอง

function App() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">GitHub User Browser</h1>
      {/* TODO: FilterBar + grid ของ UserCard จาก ALL_USERS (18 คนพร้อมใช้ใน data/users.js) */}
    </div>
  )
}

export default App
