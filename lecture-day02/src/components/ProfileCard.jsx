import { useState } from "react";

function ProfileCard({ name, role }) {
    const [isFavorite, setIsFavorite] = useState(false);
    console.log("isFavorite ProfileCard Onclick >> ", isFavorite);

    return (
        <div className="border rounded p-4">
            <h2>{name}</h2>
            <p>{role}</p>
            <button
                onClick={() => {
                    setIsFavorite(!isFavorite);
                }}
            >
                {isFavorite ? "กดถูกใจแล้ว" : "กดถูกใจ"}
            </button>
        </div>
    );
}

export default ProfileCard;