// ว่างไว้ตั้งใจ — เขียนเองใน Lab A แล้วขยายต่อใน Lab B (B2)
// หน้าที่: วงกลมตัวอักษรย่อของชื่อ (ตัวแรกของชื่อ พิมพ์ใหญ่)
// Lab B: รับ size="sm" | "md" | "lg" และ color="blue" | "purple" | "emerald"
// 🔴 size กับ color ต้องเป็น object คนละก้อน ไม่ใช่ยำรวมเป็น key เดียว เช่น { smBlue: "..." }
const Avatar = ({ name, size, color }) => {
    const sizes = {
        "md": "w-12 h-12",
        "lg": "w-16 h-16"
    }

    const colors = {
        "blue": "bg-blue-500",
        "purple": "bg-purple-500",
    }

    return (
        <div className={`${sizes[size]} ${colors[color]} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}>
            {name.charAt(0).toUpperCase()}
        </div>
    )
}

export default Avatar;