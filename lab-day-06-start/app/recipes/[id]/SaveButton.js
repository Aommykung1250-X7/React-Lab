'use client'

import { useState } from 'react'

export default function SaveButton() {
    const [saved, setSaved] = useState(false)

    return (
        <button
            type="button"
            aria-pressed={saved}
            onClick={() => setSaved((current) => !current)}
            className="border rounded px-3 py-2 text-sm"
        >
            {saved ? '✓ บันทึกแล้ว' : '☆ บันทึกสูตร'}
        </button>
    )
}