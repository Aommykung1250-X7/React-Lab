// ว่างไว้ตั้งใจ — Lab A: การ์ดหนึ่งใบ (รูป + ชื่อ + ลิงก์ไป /recipes/<idMeal>) + <FavoriteButton /> ข้างใน
// 🔴 Twist ข้อ 1: การ์ดทั้งใบไม่จำเป็นต้องเป็น Client — คิดก่อนว่าไฟล์นี้เองมี hook/event handler ไหม
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'

export default function RecipeCard({ meal }) {
    return (
        <article className="border rounded overflow-hidden">
            <Link href={`/recipes/${meal.idMeal}`}>
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    loading="lazy"
                    className="w-full aspect-square object-cover"
                />
                <p className="p-2 text-sm font-medium">{meal.strMeal}</p>
            </Link>

            <div className="px-2 pb-2">
                <FavoriteButton />
            </div>
        </article>
    )
}