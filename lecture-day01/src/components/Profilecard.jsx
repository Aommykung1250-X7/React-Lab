import Badge from "./Badge";

const Profilecard = ({ name = "", role = "", department = "", isOnline = false }) => {

    let isOnlineMessage = "";
    if (isOnline) {
        isOnlineMessage = "Online";
    } else {
        isOnlineMessage = "Offline";
    }

    return (
        <div className="text-amber-200 bg-amber-700 flex justify-center gap-2 text-center rounded-sm p-3">
            <div className="flex items-center gap-2">
                <span>name: {name}</span>
                <Badge>
                    <span>{isOnline ? "Online" : "Offline"}</span>
                </Badge>
            </div>
            <span>role: {role}</span>
            <span>department: {department}</span>
        </div>
    )
}

export default Profilecard