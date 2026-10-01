const Badge = ({ children, color = "bg-red-500" }) => {
    return (
        <div className={`rounded-2xl ${color} text-white font-bold text-lg px-2 py-1 w-fit`}>
            {children}
        </div>
    )
}

export default Badge