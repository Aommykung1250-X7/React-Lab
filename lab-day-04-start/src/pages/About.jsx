function About() {
  return (
    <div>
      <h2 className="text-lg font-extrabold mb-3">เกี่ยวกับ</h2>
      <p className="text-sm text-slate-600 leading-7">
        มินิแอป #2 ของวิชา React — ฝึกใช้ React Router: layout route, nested route,
        dynamic route <code className="bg-slate-100 px-1 rounded">:id</code> และ query string
      </p>
      <ul className="text-sm text-slate-600 mt-4 space-y-1 list-disc list-inside">
        <li>ผู้จัดทำ: (ใส่ชื่อ-นามสกุล / รหัสนักศึกษา)</li>
        <li>กลุ่ม: (ใส่กลุ่ม)</li>
        <li>ข้อมูล: TheMealDB API</li>
      </ul>
    </div>
  )
}

export default About
