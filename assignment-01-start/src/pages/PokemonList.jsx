// R1, R2 — รายการ 151 ตัว · ค้นหา ?q= · กรองธาตุ ?type= (เก็บใน URL เท่านั้น)
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { API, MAX_ID, TYPES, idFromUrl } from '../lib/pokemon.js'
import PokemonCard from '../components/PokemonCard.jsx'

export default function PokemonList() {
  // R2 — แหล่งความจริงเดียวคือ URL ไม่มี useState ซ้ำ
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const type = searchParams.get('type') ?? ''

  // ยิงครั้งเดียว: รายชื่อทั้ง 151 ตัว
  const { data: listData, loading: listLoading, error: listError } = useFetch(`${API}/pokemon?limit=${MAX_ID}`)

  // R1 — url = null ตอนยังไม่เลือกธาตุ = ไม่ยิง
  const { data: typeData, loading: typeLoading, error: typeError } = useFetch(
    type ? `${API}/type/${type}` : null
  )

  const loading = listLoading || typeLoading
  const error = listError || typeError

  // เขียนค่าลง URL แทน setState
  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    // replace: true ตอนพิมพ์ → Twist 2 กด back ครั้งเดียวออกจากการค้นหา ไม่ใช่ถอยทีละตัวอักษร
    setSearchParams(next, { replace: key === 'q' })
  }

  // ---- กรองจากข้อมูลที่ fetch มาแล้ว ไม่ยิง API ใหม่ทุกครั้งที่พิมพ์ ----
  const all = (listData?.results ?? []).map((p) => ({ id: idFromUrl(p.url), name: p.name }))

  // ธาตุ: API คืนทุกรุ่น ต้องกรองเหลือ id <= 151 เอง (Twist 3)
  const typeIds = typeData
    ? new Set(
        typeData.pokemon
          .map((entry) => idFromUrl(entry.pokemon.url))
          .filter((id) => id <= MAX_ID)
      )
    : null

  const keyword = q.trim().toLowerCase()
  const results = all
    .filter((p) => (keyword ? p.name.toLowerCase().includes(keyword) : true)) // ไม่สนตัวพิมพ์ + บางส่วน
    .filter((p) => (typeIds ? typeIds.has(p.id) : true))                       // AND กับธาตุ

  return (
    <section>
      <h1 className="text-2xl font-bold">Pokédex (#1–#{MAX_ID})</h1>

      {/* ---- ช่องค้นหา + dropdown ธาตุ: value มาจาก URL = controlled by URL ---- */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={q}
          onChange={(e) => updateParam('q', e.target.value)}
          placeholder="ค้นหาชื่อ เช่น char"
          className="flex-1 rounded-lg border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
        />
        <select
          value={type}
          onChange={(e) => updateParam('type', e.target.value)}
          className="rounded-lg border bg-white px-3 py-2 capitalize outline-none focus:ring-2 focus:ring-red-500"
        >
          {TYPES.map((t) => (
            <option key={t || 'all'} value={t}>
              {t === '' ? 'ทุกธาตุ' : t}
            </option>
          ))}
        </select>
      </div>

      {/* ---- 3 สถานะ: loading / error / ไม่พบ ---- */}
      {loading && <p className="mt-10 text-center text-gray-500">กำลังโหลด…</p>}

      {!loading && error && (
        <p className="mt-10 text-center text-red-600">
          เกิดข้อผิดพลาดในการโหลดข้อมูล ({error.message}) — ลองรีเฟรชอีกครั้ง
        </p>
      )}

      {!loading && !error && results.length === 0 && (
        <p className="mt-10 text-center text-gray-500">ไม่พบผลลัพธ์ที่ตรงกับเงื่อนไข</p>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <p className="mt-4 text-sm text-gray-500">พบ {results.length} ตัว</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => (
              <PokemonCard key={p.id} id={p.id} name={p.name} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
