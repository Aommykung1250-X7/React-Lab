// ว่างไว้ตั้งใจ — เขียนเองใน Lab A
// หน้าที่: header (title + subtitle) + container ที่ห่อเนื้อหาไว้ข้างใน
// 🔴 ต้องรับ children (ไม่ใช่ prop ชื่อ content) — Layout ต้องไม่รู้จัก ProfileCard เลย
const Layout = ({ children }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
        <header className="flex flex-col items-center mb-4">
            <h1 className="text-xl font-bold">ทีมของเรา</h1>
            <span>Engineering & Product</span>
        </header>
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {children}
        </main>
    </div>

)

export default Layout