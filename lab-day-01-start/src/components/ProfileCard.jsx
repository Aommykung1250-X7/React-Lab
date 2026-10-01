// ว่างไว้ตั้งใจ — เขียนเองใน Lab A
// หน้าที่: การ์ดพนักงาน 1 ใบ = <Avatar /> + ชื่อ/ตำแหน่ง/แผนก + <Badge />
// 🔴 ห้ามยาวเกิน 35 บรรทัด (Twist ข้อ 2) — ถ้าเกิน แปลว่ายังไม่ได้แตกงานไปให้ Avatar/Badge จริง
// Lab B: ใบของ isLead ต้องส่ง size="lg" color="purple" ให้ Avatar และมี Badge variant="lead"
import Badge from "./Badge";
import Avatar from "./Avatar";

const ProfileCard = ({ name, role, department, status, isLead }) => {
    // let statusMessage = "";
    // if (status === "online") {
    //     statusMessage = "ออนไลน์";
    // } else if (status === "away") {
    //     statusMessage = "ไม่อยู่โต๊ะ";
    // } else if (status === "offline") {
    //     statusMessage = "ออฟไลน์";
    // }

    return (
        <div className={`bg-white border border-gray-200 rounded-lg p-4 ${isLead ? "border-2 border-purple-800" : ''} `}>
            <div className="flex items-center space-x-4">
                <Avatar name={name} size={isLead ? "lg" : "md"} color={isLead ? "purple" : "blue"}></Avatar>
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-sm text-gray-600">{role} • {department}</p>
                    <div className="flex space-x-2 mt-2">
                        <Badge variant={status} children={status}></Badge>
                        {isLead && <Badge variant="lead" children="lead"></Badge>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;