'use client';

const ErrorPage = ({ error, reset }) => {
    return (<>
        <h3>เกิดข้อผิดพลาด {error?.message}</h3>
        <button onClick={() => reset()}>ลองอีกครั้ง</button>
    </>)
};

export default ErrorPage;
