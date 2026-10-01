import Link from 'next/link'

const topics = [
  {
    href: '/recipes',
    title: 'บล็อก 1.1–1.2: Server Component',
    desc: 'แปลง recipes/page.jsx เป็น async Server Component + ดึง FeaturedRecipes',
    badge: 'Server Component',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    href: '/recipes-old',
    title: 'บล็อก 1.1 (เดิม): Client Fetch',
    desc: 'แบบเดิมวันที่ 6 ("use client" + useFetch) เพื่อเปรียบเทียบกับ Server Component',
    badge: 'Client Component',
    badgeColor: 'bg-gray-100 text-gray-800',
  },
  {
    href: '/demo',
    title: 'บล็อก 1.3: Static Fetch Caching',
    desc: 'ดึงเวลาจาก /api/time พร้อม cache: "force-cache"',
    badge: 'Static Cache',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    href: '/stock',
    title: 'บล็อก 2.2: SSR (Server-Side Rendering)',
    desc: 'ราคาหุ้น dynamic ด้วย cache: "no-store" (เปลี่ยนค่าทุกครั้งที่ refresh)',
    badge: 'SSR / no-store',
    badgeColor: 'bg-red-100 text-red-800',
  },
  {
    href: '/blog',
    title: 'บล็อก 2.2: SSG (Static Site Generation)',
    desc: 'ดึงสูตร TheMealDB 1 รายการ ด้วย cache: "force-cache"',
    badge: 'SSG / force-cache',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    href: '/products',
    title: 'บล็อก 2.2: ISR (Incremental Static Regeneration)',
    desc: 'ดึงหมวด Seafood พร้อม next: { revalidate: 60 }',
    badge: 'ISR / revalidate: 60s',
    badgeColor: 'bg-cyan-100 text-cyan-800',
  },
  {
    href: '/my-recipes',
    title: 'บล็อก 2.4–2.6: Route Handlers & In-Memory Store',
    desc: 'GET, POST /api/recipes พร้อม AddRecipeForm และ revalidate: 15s',
    badge: 'Route Handlers + ISR',
    badgeColor: 'bg-orange-100 text-orange-800',
  },
]

export default function HomePage() {
  return (
    <div className="py-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Next.js Lecture Day 07
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-sm">
          Data Fetching, Rendering Strategies (SSR, SSG, ISR) & Route Handlers
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="border rounded-xl p-5 bg-white hover:border-orange-500 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${t.badgeColor}`}>
                  {t.badge}
                </span>
                <span className="text-xs text-gray-400 font-mono">{t.href}</span>
              </div>
              <h2 className="text-base font-bold text-gray-900">{t.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
            </div>
            <div className="text-sm font-medium text-orange-600 flex items-center gap-1">
              เปิดดูหน้านี้ →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
