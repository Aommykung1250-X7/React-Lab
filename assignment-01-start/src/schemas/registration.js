// R6 — zod schema ของฟอร์มลงทะเบียนทีม (แยกไฟล์ตามโจทย์)
import { z } from 'zod'

// รับชื่อ Pokémon ในทีมเข้ามา เพราะกติกา "ชื่อทีมห้ามซ้ำกับสมาชิก" ขึ้นกับทีมปัจจุบัน
export function createRegistrationSchema(teamNames = []) {
  const taken = teamNames.map((n) => n.toLowerCase())

  return z
    .object({
      trainerName: z
        .string()
        .trim()
        .min(2, 'ชื่อเทรนเนอร์ต้องมีอย่างน้อย 2 ตัวอักษร')
        .max(30, 'ชื่อเทรนเนอร์ต้องไม่เกิน 30 ตัวอักษร'),

      teamName: z
        .string()
        .trim()
        .min(3, 'ชื่อทีมต้องมีอย่างน้อย 3 ตัวอักษร')
        .max(20, 'ชื่อทีมต้องไม่เกิน 20 ตัวอักษร')
        .regex(/^[A-Za-z0-9 ]+$/, 'ใช้ได้เฉพาะ A–Z a–z 0–9 และช่องว่างเท่านั้น')
        .refine((v) => !taken.includes(v.toLowerCase()), {
          message: 'ชื่อทีมห้ามซ้ำกับชื่อ Pokémon ที่อยู่ในทีม',
        }),

      email: z.string().trim().email('รูปแบบอีเมลไม่ถูกต้อง'),

      confirmEmail: z.string().trim().min(1, 'กรุณายืนยันอีเมล'),
    })
    // error ต้องขึ้นที่ช่อง confirmEmail ไม่ใช่ระดับฟอร์ม → ใช้ path
    .refine((data) => data.email.toLowerCase() === data.confirmEmail.toLowerCase(), {
      path: ['confirmEmail'],
      message: 'อีเมลยืนยันไม่ตรงกับอีเมลด้านบน',
    })
}
