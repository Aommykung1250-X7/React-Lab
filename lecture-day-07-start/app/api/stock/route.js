// บล็อก 2.2 · export async function GET() คืนราคาสุ่ม { symbol: "DEMO", price }
export async function GET() {
  const price = (Math.random() * 100 + 900).toFixed(2)
  return Response.json({ symbol: "DEMO", price })
}