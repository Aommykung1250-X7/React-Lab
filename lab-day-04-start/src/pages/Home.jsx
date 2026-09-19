import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-extrabold">ยินดีต้อนรับสู่ Recipe Browser</h2>
      <p className="text-slate-500 mt-2 mb-5">
        เลือกดูสูตรของหวานจาก TheMealDB แล้วกดเข้าไปดูวิธีทำได้เลย
      </p>
      <Link
        to="/recipes"
        className="inline-block border border-slate-300 rounded-md px-4 py-2 text-sm hover:bg-slate-50"
      >
        ดูสูตรอาหาร →
      </Link>
    </div>
  )
}

export default Home
