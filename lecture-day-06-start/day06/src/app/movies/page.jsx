const getMovies = async () => {
    const res = await fetch("https://ghibliapi.vercel.app/films")
    if (!res.ok) {
        throw new Error("โหลดข้อมูลไม่สำเร็จ");
    }
    return res.json();
};

const MoviesPage = async () => {
    const movies = await getMovies();
    return (<>
        <h2>รายการหนัง</h2>
        <ul>
            {movies.map((movie) => (
                <li key={movie.id}>
                    {movie.title}
                </li>
            ))}
        </ul>
    </>)
};

export default MoviesPage;