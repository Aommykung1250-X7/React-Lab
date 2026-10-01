'use client';

import { useEffect, useState } from "react";

const Where = () => {
    const [where, setWhere] = useState(null);

    useEffect(() => {
        setWhere(typeof window);
    }, []);

    return (
        <p>
            ตัวนี้ render ที่: {where === "undefined" ? "Server" : "Browser"}
        </p>
    )
};

export default Where;