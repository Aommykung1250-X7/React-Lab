// บล็อก 1.3 · export async function GET() คืนเวลาปัจจุบันเป็น JSON
export async function GET() {
  const time = new Date().toLocaleTimeString('th-TH')
  return Response.json({ time })
}
