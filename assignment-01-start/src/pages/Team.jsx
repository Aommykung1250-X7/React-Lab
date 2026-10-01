// R4, R6 — ทีมของฉัน + ฟอร์มลงทะเบียน
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTeam } from '../context/TeamContext.jsx'
import { createRegistrationSchema } from '../schemas/registration.js'
import PokemonCard from '../components/PokemonCard.jsx'

const MIN_TO_REGISTER = 3

export default function Team() {
  const { team, count, remove, clear, maxTeam } = useTeam()
  const [summary, setSummary] = useState(null)

  // ให้ resolver อ่าน "ชื่อสมาชิกทีมล่าสุด" เสมอ — ลบ pikachu ออกแล้วกดส่งซ้ำต้องผ่าน (Twist 8)
  const teamNamesRef = useRef([])
  teamNamesRef.current = team.map((p) => p.name)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched', // ยังไม่แตะช่อง = ยังไม่มี error แดง (Twist 9)
    defaultValues: { trainerName: '', teamName: '', email: '', confirmEmail: '' },
    resolver: (values, ctx, opts) =>
      zodResolver(createRegistrationSchema(teamNamesRef.current))(values, ctx, opts),
  })

  const canSubmit = count >= MIN_TO_REGISTER
  const missing = MIN_TO_REGISTER - count

  async function onSubmit(values) {
    await new Promise((r) => setTimeout(r, 800)) // จำลองรอ 800 ms
    setSummary({
      trainerName: values.trainerName,
      teamName: values.teamName,
      email: values.email,
      members: team.map((p) => p.name),
    })
  }

  return (
    <section className="space-y-8">
      {/* ---------- ทีมของฉัน ---------- */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">ทีมของฉัน ({count}/{maxTeam})</h1>
          {count > 0 && (
            <button onClick={clear} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-100">
              ล้างทีม
            </button>
          )}
        </div>

        {count === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed bg-white p-8 text-center text-gray-500">
            ยังไม่มีสมาชิกในทีม —{' '}
            <Link to="/pokemon" className="text-red-600 underline">ไปเลือก Pokémon</Link>
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {team.map((p) => (
              <PokemonCard
                key={p.id}
                id={p.id}
                name={p.name}
                footer={
                  <button
                    onClick={() => remove(p.id)}
                    className="w-full rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    เอาออก
                  </button>
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* ---------- R6: ฟอร์มลงทะเบียนทีม ---------- */}
      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold">ลงทะเบียนทีม</h2>

        {!canSubmit && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
            ต้องมีสมาชิกอย่างน้อย {MIN_TO_REGISTER} ตัวถึงจะลงทะเบียนได้ — ขาดอีก {missing} ตัว
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-4 sm:grid-cols-2" noValidate>
          <Field label="ชื่อเทรนเนอร์" error={errors.trainerName}>
            <input {...register('trainerName')} className={inputClass(errors.trainerName)} />
          </Field>

          <Field label="ชื่อทีม" error={errors.teamName}>
            <input {...register('teamName')} className={inputClass(errors.teamName)} />
          </Field>

          <Field label="อีเมล" error={errors.email}>
            <input type="email" {...register('email')} className={inputClass(errors.email)} />
          </Field>

          <Field label="ยืนยันอีเมล" error={errors.confirmEmail}>
            <input type="email" {...register('confirmEmail')} className={inputClass(errors.confirmEmail)} />
          </Field>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isSubmitting ? 'กำลังส่ง…' : 'ลงทะเบียนทีม'}
            </button>
          </div>
        </form>

        {summary && (
          <div className="mt-6 rounded-xl border border-green-300 bg-green-50 p-4">
            <h3 className="font-bold text-green-800">ลงทะเบียนสำเร็จ</h3>
            <p className="mt-2 text-sm">เทรนเนอร์: <strong>{summary.trainerName}</strong></p>
            <p className="text-sm">ชื่อทีม: <strong>{summary.teamName}</strong></p>
            <p className="text-sm">อีเมล: <strong>{summary.email}</strong></p>
            <p className="mt-2 text-sm">สมาชิก ({summary.members.length}):</p>
            <ul className="mt-1 list-inside list-disc text-sm capitalize">
              {summary.members.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </label>
  )
}

function inputClass(error) {
  return `w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
    error ? 'border-red-400 focus:ring-red-400' : 'focus:ring-red-500'
  }`
}
