// ⌨️ โครงว่าง — เติมสดในบล็อก 1.4 (dynamic route)
// TODO: MovieDetail รับ { params } เป็น prop (ไม่มี useParams แล้ว)
//       ⚠️ Next.js 15: params เป็น Promise — ต้องประกาศ component เป็น async แล้ว await ก่อนอ่านค่า
//       แสดง "หนังเรื่อง #<id>" ตาม URL เช่น /movies/42
//
// ⚠️ บรรทัด export ข้างล่างเป็นแค่ตัวกันพัง (page.js ที่ไม่มี default export ทำให้ build ไม่ผ่าน)
//    ลบทิ้งแล้วพิมพ์ของจริงแทนตอนถึงบล็อก 1.4

export default function MovieDetail() {
  return null
}
