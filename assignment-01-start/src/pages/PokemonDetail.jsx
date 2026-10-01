// R3 — รายละเอียด: useParams · แปลงหน่วย · เพิ่ม/เอาออกจากทีม · ก่อนหน้า/ถัดไป
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { API, MAX_ID, artworkUrl } from '../lib/pokemon.js'
import { useTeam } from '../context/TeamContext.jsx'

export default function PokemonDetail() {
  // R3 — แหล่งความจริงเดียวคือ URL: เปิดตรง ๆ กับกดลิงก์มา ได้ผลเหมือนกัน
  const { nameOrId } = useParams()
  const { has, add, remove, isFull, maxTeam } = useTeam()

  // ถ้าเป็นตัวเลขที่เกิน 151 รู้ได้ทันทีโดยไม่ต้องยิง API (Twist 3)
  const asNumber = Number(nameOrId)
  const isId = Number.isInteger(asNumber)
  const outOfDexById = isId && (asNumber < 1 || asNumber > MAX_ID)

  // ตัวเลขส่งเป็น id ตรง ๆ (025 → 25) · ชื่อแปลงเป็นตัวเล็ก (Pikachu → pikachu)
  const { data, loading, error } = useFetch(
    outOfDexById ? null : `${API}/pokemon/${isId ? asNumber : nameOrId.toLowerCase()}`
  )

  // ชื่อที่มีจริงใน API แต่อยู่นอก 151 เช่น chikorita → รู้ได้หลัง fetch
  const outOfDex = outOfDexById || (data && data.id > MAX_ID)

  if (outOfDex) {
    return (
      <Message title="ไม่อยู่ใน Pokédex นี้">
        Pokédex นี้มีเฉพาะรุ่นแรก #1–#{MAX_ID} เท่านั้น
      </Message>
    )
  }
  if (loading) return <Message title="กำลังโหลด…" />
  if (error) {
    return (
      <Message title={error.message === 'NOT_FOUND' ? 'ไม่พบ Pokémon นี้' : 'เกิดข้อผิดพลาด'}>
        {error.message === 'NOT_FOUND'
          ? `ไม่พบ "${nameOrId}" ใน PokéAPI`
          : `โหลดข้อมูลไม่สำเร็จ (${error.message})`}
      </Message>
    )
  }
  if (!data) return null

  const { id, name, types, height, weight } = data
  const inTeam = has(id)

  return (
    <section>
      <Link to="/pokemon" className="text-sm text-gray-500 hover:underline">&larr; กลับไปรายการ</Link>

      <div className="mt-3 grid gap-6 rounded-xl border bg-white p-6 sm:grid-cols-[220px_1fr]">
        <img src={artworkUrl(id)} alt={name} className="mx-auto h-52 w-52 object-contain" />

        <div>
          <p className="text-gray-400">#{String(id).padStart(3, '0')}</p>
          <h1 className="text-3xl font-bold capitalize">{name}</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {types.map((t) => (
              <span key={t.type.name} className="rounded-full bg-gray-100 px-3 py-1 text-sm capitalize">
                {t.type.name}
              </span>
            ))}
          </div>

          {/* R3 — API ให้ height เป็นเดซิเมตร, weight เป็นเฮกโตกรัม → หาร 10 */}
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">ส่วนสูง</dt>
              <dd className="text-lg font-semibold">{(height / 10).toFixed(1)} ม.</dd>
            </div>
            <div>
              <dt className="text-gray-500">น้ำหนัก</dt>
              <dd className="text-lg font-semibold">{(weight / 10).toFixed(1)} กก.</dd>
            </div>
          </dl>

          <div className="mt-6">
            {inTeam ? (
              <button
                onClick={() => remove(id)}
                className="rounded-lg bg-gray-800 px-5 py-2.5 font-medium text-white hover:bg-gray-900"
              >
                เอาออกจากทีม
              </button>
            ) : (
              <>
                <button
                  onClick={() => add({ id, name })}
                  disabled={isFull}
                  className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  เพิ่มเข้าทีม
                </button>
                {isFull && (
                  <p className="mt-2 text-sm text-red-600">ทีมเต็มแล้ว ({maxTeam}/{maxTeam}) — เอาตัวอื่นออกก่อน</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* R3 — ก่อนหน้า/ถัดไป: #1 ไม่มีก่อนหน้า · #151 ไม่มีถัดไป */}
      <nav className="mt-4 flex justify-between">
        {id > 1 ? (
          <Link to={`/pokemon/${id - 1}`} className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-100">
            &larr; #{id - 1}
          </Link>
        ) : <span />}
        {id < MAX_ID ? (
          <Link to={`/pokemon/${id + 1}`} className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-100">
            #{id + 1} &rarr;
          </Link>
        ) : <span />}
      </nav>
    </section>
  )
}

function Message({ title, children }) {
  return (
    <section className="py-16 text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children && <p className="mt-2 text-gray-600">{children}</p>}
      <Link to="/pokemon" className="mt-6 inline-block rounded-lg border bg-white px-5 py-2.5 hover:bg-gray-100">
        กลับไปรายการ
      </Link>
    </section>
  )
}
