// บล็อก 2.2 (SSR — Dynamic Data / ราคาหุ้นสมมติ)
// ใช้ { cache: "no-store" } เพื่อดึงข้อมูลใหม่ทุกครั้งที่เปิด/รีเฟรชหน้า
export default async function StockPage() {
  const res = await fetch("http://localhost:3000/api/stock", {
    cache: "no-store",
  })
  const { symbol, price } = await res.json()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Stock Price (SSR — cache: "no-store")</h1>
      <div className="p-4 border rounded-lg bg-green-50 text-green-950">
        <p className="text-sm text-green-700 mb-1">
          ดึงข้อมูลแบบ Dynamic ทุกครั้งที่โหลดหน้า (รีเฟรชแล้วราคาเปลี่ยนทันที):
        </p>
        <p className="text-xl font-semibold">
          ราคาหุ้น <span className="font-mono">{symbol}</span>:{" "}
          <span className="font-mono text-green-700">{price}</span> THB
        </p>
      </div>
    </div>
  )
}