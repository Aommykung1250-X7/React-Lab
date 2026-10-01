"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/recipes', label: 'สูตรอาหาร (Server)' },
  { href: '/recipes-old', label: 'สูตรอาหาร (Client)' },
  { href: '/demo', label: 'Demo (Cache)' },
  { href: '/stock', label: 'Stock (SSR)' },
  { href: '/blog', label: 'Blog (SSG)' },
  { href: '/products', label: 'Products (ISR)' },
  { href: '/my-recipes', label: 'My Recipes' },
  { href: '/about', label: 'เกี่ยวกับ' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-white">
      <nav className="max-w-5xl mx-auto flex flex-wrap items-center gap-x-4 gap-y-2 p-4 text-sm">
        {links.map(({ href, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={
                isActive
                  ? 'font-bold text-orange-600'
                  : 'text-gray-600 hover:text-gray-900 transition-colors'
              }
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
