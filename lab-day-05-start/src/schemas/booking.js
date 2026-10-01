import { z } from 'zod'
import { DEPARTMENTS } from '../data/rooms.js'

export const bookingSchema = z
  .object({
    bookerName: z.string().trim().min(3, 'ชื่อผู้จองอย่างน้อย 3 ตัวอักษร'),
    department: z.string().refine((v) => DEPARTMENTS.includes(v), 'กรุณาเลือกแผนก'),
    email: z.string().trim().min(1, 'กรุณากรอกอีเมล').pipe(z.email('รูปแบบอีเมลไม่ถูกต้อง')),
    confirmEmail: z.string().trim().min(1, 'กรุณายืนยันอีเมลอีกครั้ง'),
    purpose: z.string().trim().min(10, 'อธิบายวัตถุประสงค์อย่างน้อย 10 ตัวอักษร'),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'อีเมลไม่ตรงกัน',
    path: ['confirmEmail'],
  })
