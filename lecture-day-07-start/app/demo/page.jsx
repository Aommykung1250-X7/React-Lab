// บล็อก 1.3 → 1.4 → 1.5
// Server Component: async function DemoPage() → await fetch("http://localhost:3000/api/time")
// Next.js 15: ใส่ { cache: "force-cache" } เพื่อทดสอบ Static Fetch Caching
export default async function DemoPage() {
  const response = await fetch("http://localhost:3000/api/time", {
    cache: "force-cache",
  })
  const data = await response.json()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Demo Page (Static Fetch Caching)</h1>
      <div className="p-4 border rounded-lg bg-blue-50 text-blue-900">
        <p className="text-sm text-blue-700 mb-1">
          ทดสอบ <code>cache: "force-cache"</code> (เวลาจะไม่เปลี่ยนเมื่อ refresh ธรรมดา):
        </p>
        <p className="text-xl font-semibold">
          เวลาที่ดึงมา: <span className="font-mono text-blue-800">{data.time}</span>
        </p>
      </div>
    </div>
  )
}