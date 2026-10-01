const MovieDetailPage = async ({ params }) => {
    const { id } = await params;
    return (<><h3>Movie Detail : {id}</h3></>)
};

export default MovieDetailPage;