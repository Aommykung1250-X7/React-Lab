function FilterBar({
  searchQuery,
  onSearchChange,
  minFollowers,
  onMinFollowersChange,
  matchCount,
  totalCount,
  onClear,
}) {
  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row gap-3 mb-3.5">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            ค้นหา (login หรือ name)
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="เช่น torvalds, dan..."
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="w-full sm:w-[220px]">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            ผู้ติดตามขั้นต่ำ
          </label>
          <input
            type="number"
            min="0"
            value={minFollowers}
            onChange={(e) => onMinFollowersChange(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-[13px] text-slate-600">
          พบ <b className="text-slate-900">{matchCount}</b> รายการ จากทั้งหมด {totalCount} คน
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-[13px] text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-100 cursor-pointer transition-colors"
        >
          ล้างตัวกรอง
        </button>
      </div>
    </div>
  )
}

export default FilterBar
