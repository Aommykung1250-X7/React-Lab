export default function AboutPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">เกี่ยวกับ</h1>
            <p className="text-gray-600">
                แอปนี้จัดทำเพื่อฝึก Next.js App Router — ข้อมูลสูตรอาหารมาจาก{' '}
                <a
                    href="https://www.themealdb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    TheMealDB
                </a>
            </p>
        </div>
    )
}