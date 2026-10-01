// ว่างไว้ตั้งใจ — Lab A: ปุ่ม "☆ ถูกใจ" / "★ ถูกใจแล้ว" กดสลับได้ (state ของปุ่มเอง ไม่ต้องจำข้ามหน้า)
'use client'

import { useState } from 'react'

export default function FavoriteButton() {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <button
            type="button"
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((current) => !current)}
            className="text-sm text-orange-600"
        >
            {isFavorite ? '★ ถูกใจแล้ว' : '☆ ถูกใจ'}
        </button>
    )
}