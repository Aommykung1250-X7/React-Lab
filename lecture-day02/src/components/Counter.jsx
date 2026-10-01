import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="p-8">
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => {
                setCount((prev) => prev + 1);
                setCount((prev) => prev + 1);
                setCount((prev) => prev + 1);
            }}>Set to 3</button>
            <button onClick={() => setCount(0)}>reset</button>
        </div>
    );
}

export default Counter;