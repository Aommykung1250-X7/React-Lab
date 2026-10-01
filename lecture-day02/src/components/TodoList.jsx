import { useState, Fragment } from "react";

function TodoList() {
    const [items, setItems] = useState([]);

    const handleAddItem = () => {
        const tempItem = [...items];
        tempItem.push("new item");
        setItems(tempItem);
    };

    const handleDeleteItem = (index) => {
        const tempItem = [...items];
        tempItem.splice(index, 1);
        setItems(tempItem);
    };

    return (
        <div className="p-8">
            <button onClick={handleAddItem}>เพิ่ม</button>
            <ul>
                {items.map((item, index) => (
                    <Fragment key={index}>
                        <li>{index}.{item}</li>
                        <button onClick={() => handleDeleteItem(index)}>ลบ</button>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;