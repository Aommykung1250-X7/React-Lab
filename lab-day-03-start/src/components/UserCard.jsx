function UserCard({ user }) {
  const hasFollowers = user.followers !== undefined

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center text-center gap-1.5 shadow-sm hover:shadow-md transition-shadow">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full object-cover mb-1 bg-slate-100 border border-slate-100"
        onError={(e) => {
          e.target.src = 'https://github.com/ghost.png'
        }}
      />
      <div className="text-sm font-bold text-slate-900">{user.login}</div>
      <div className="text-xs text-slate-500 line-clamp-2 min-h-[32px] leading-snug">
        {user.bio || '-'}
      </div>
      {hasFollowers ? (
        <div className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full mt-0.5">
          {user.followers.toLocaleString()} ผู้ติดตาม
        </div>
      ) : (
        <div className="text-xs font-semibold text-slate-400 bg-slate-50 italic px-2.5 py-0.5 rounded-full mt-0.5">
          ยังไม่ทราบจำนวนผู้ติดตาม
        </div>
      )}
    </div>
  )
}

export default UserCard
