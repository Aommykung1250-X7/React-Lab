// ว่างไว้ตั้งใจ — เขียนเองใน Lab A แล้วขยายต่อใน Lab B (B1)
// 🔴 ต้องรับ children ไม่ใช่ prop ชื่อ text (Twist ข้อ 3 — อธิบายความต่างใน README ด้วย)
// 🔴 สีของทุก variant (online / away / offline / lead) ต้องอยู่ใน object เดียวในไฟล์นี้
//    ห้าม if/else หรือ ternary ซ้อนหลายชั้น (Twist ข้อ 4)

const Badge = ({ variant, children }) => {
    const variantcolors = {
        online: "bg-green-100 text-green-800",
        away: "bg-yellow-100 text-yellow-800",
        offline: "bg-gray-100 text-gray-800",
        lead: "bg-purple-100 text-purple-800",
    }

    const text = {
        online: "ออนไลน์",
        away: "ไม่อยู่โต๊ะ",
        offline: "ออฟไลน์",
        lead: "หัวหน้าทีม",
    }

    return (
        <span className={`${variantcolors[variant]} px-2 py-1 rounded-full text-xs`}>
            {text[children]}
        </span>
    )
}

export default Badge