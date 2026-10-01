export default function MoviesLayout({ children }) {
    return (
        <>
            <nav>
                หมวดหนัง: <a href="/movies">รายการทั้งหมด</a>
            </nav>
            {children}
        </>
    )
};