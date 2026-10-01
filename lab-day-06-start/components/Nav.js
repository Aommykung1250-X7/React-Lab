// ว่างไว้ตั้งใจ — Lab A: เมนู 3 อัน (หน้าแรก / สูตรอาหาร / เกี่ยวกับ) + active link แทน NavLink เดิม
// Server หรือ Client? → ต้องรู้ว่าตอนนี้อยู่ path ไหน (usePathname จาก 'next/navigation') ... ตัดสินใจเอง
// "/" ต้องตรงเป๊ะ ไม่งั้นเข้มค้างทุกหน้า (เทียบ NavLink end ของวันที่ 4)
'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Nav() {
    const pathname = usePathname()

    const linkClass = (active) =>
        active
            ? 'font-bold text-orange-600'
            : 'text-gray-600 hover:text-gray-900'

    return (
        <nav className="max-w-4xl mx-auto flex gap-6 p-4">
            <Link href="/" className={linkClass(pathname === '/')}>
                หน้าแรก
            </Link>

            <Link
                href="/recipes"
                className={linkClass(
                    pathname === '/recipes' || pathname.startsWith('/recipes/')
                )}
            >
                สูตรอาหาร
            </Link>

            <Link href="/about" className={linkClass(pathname === '/about')}>
                เกี่ยวกับ
            </Link>
        </nav>
    )
}

