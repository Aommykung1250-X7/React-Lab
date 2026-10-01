import { users } from './data/users.js'
import ProfileCard from './components/ProfileCard.jsx'
import Layout from './components/Layout.jsx'

// 🔴 ทั้งไฟล์นี้เป็นแค่หน้าจอเช็กว่าเครื่องพร้อม — ลบทิ้งทั้งก้อนแล้วเขียนใหม่ใน Lab A
// เป้าหมายตอนจบ Lab A: <Layout> ห่อ grid ของ <ProfileCard> ที่วนออกมาจาก users ด้วย .map()
// (อย่าลืม key ที่ element นอกสุดของ .map())

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Layout>
        {users.map((user) => (
          <ProfileCard
            key={user.id}
            name={user.name}
            role={user.role}
            department={user.department}
            status={user.status}
            isLead={user.isLead}
          />
        ))}
      </Layout>
    </div>

  )
}

export default App
