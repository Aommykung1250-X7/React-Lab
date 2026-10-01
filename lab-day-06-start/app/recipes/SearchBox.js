// ว่างไว้ตั้งใจ — Lab A: ช่องค้นหาที่ผลักคำค้นเข้า URL (/recipes?q=...) แทน setSearchParams เดิม
// รับค่าเริ่มต้นจาก RecipesPage ทาง prop · พิมพ์แล้วอย่าทิ้ง history ทุกตัวอักษร (เทียบ { replace: true } วันที่ 4)
'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBox({ initialQuery }) {
    const [value, setValue] = useState(initialQuery)
    const timer = useRef(null)
    const router = useRouter()

    function updateUrl(text) {
        const q = text.trim()
        const href = q ? `/recipes?q=${encodeURIComponent(q)}` : '/recipes'
        router.replace(href, { scroll: false })
    }

    function handleChange(event) {
        const text = event.target.value
        setValue(text)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => updateUrl(text), 400)
    }

    function handleSubmit(event) {
        event.preventDefault()
        clearTimeout(timer.current)
        updateUrl(value)
    }

    useEffect(() => {
        return () => clearTimeout(timer.current)
    }, [])

    return (
        <form action="/recipes" onSubmit={handleSubmit} className="mb-6">
            <label htmlFor="recipe-search" className="sr-only">
                ค้นหาสูตรอาหาร
            </label>
            <input
                id="recipe-search"
                name="q"
                type="search"
                value={value}
                onChange={handleChange}
                placeholder="ค้นหาเมนู เช่น chicken, pasta"
                className="border rounded px-3 py-2 w-full"
            />
        </form>
    )
}