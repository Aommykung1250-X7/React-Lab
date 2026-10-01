// R7 — การ์ดที่ใช้ซ้ำทั้งหน้า /pokemon และ /team
import { Link } from 'react-router-dom'
import { artworkUrl } from '../lib/pokemon.js'
import { useTeam } from '../context/TeamContext.jsx'

export default function PokemonCard({ id, name, footer }) {
  const { has } = useTeam()
  const inTeam = has(id)

  return (
    <article className="relative flex flex-col rounded-xl border bg-white p-3 shadow-sm transition hover:shadow-md">
      {inTeam && (
        <span className="absolute right-2 top-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          อยู่ในทีม
        </span>
      )}

      <Link to={`/pokemon/${id}`} className="flex flex-col items-center">
        <img
          src={artworkUrl(id)}
          alt={name}
          loading="lazy"
          className="h-28 w-28 object-contain"
        />
        <span className="mt-1 text-xs text-gray-400">#{String(id).padStart(3, '0')}</span>
        <span className="font-semibold capitalize">{name}</span>
      </Link>

      {footer && <div className="mt-3">{footer}</div>}
    </article>
  )
}
