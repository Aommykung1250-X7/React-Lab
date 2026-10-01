// ว่างไว้ตั้งใจ — ฟังก์ชันล้วน ไม่ใช่ component (import ได้ทั้งจาก Server และ Client)
// TheMealDB เก็บส่วนผสมเป็น strIngredient1..20 + strMeasure1..20 — รวบเป็น array [{ name, measure }]
// แล้วตัดช่องว่าง/ค่าว่างทิ้ง (ตรรกะเดียวกับวันที่ 4)
// export function getIngredients(meal) { ... }
export function getIngredients(meal) {
    return Array.from({ length: 20 }, (_, index) => {
        const number = index + 1

        return {
            name: meal[`strIngredient${number}`]?.trim() ?? '',
            measure: meal[`strMeasure${number}`]?.trim() ?? '',
        }
    }).filter(({ name }) => name !== '')
}