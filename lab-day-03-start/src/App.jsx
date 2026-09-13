import { useState } from 'react'
import { users as ALL_USERS } from './data/users.js'
import FilterBar from './components/FilterBar.jsx'
import UserCard from './components/UserCard.jsx'
import useFetch from './hooks/useFetch.js'

const API_BASE_URL = 'https://mock-server-xi-one.vercel.app/users'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [minFollowers, setMinFollowers] = useState(0)

  const filteredUsers = ALL_USERS.filter((user) => {
    const query = searchQuery.toLowerCase().trim()
    const matchLogin = user.login.toLowerCase().includes(query)
    const matchName = user.name ? user.name.toLowerCase().includes(query) : false
    const matchSearch = matchLogin || matchName

    const followers = user.followers ?? 0
    const matchFollowers = followers >= Number(minFollowers || 0)

    return matchSearch && matchFollowers
  })

  const handleClearStatic = () => {
    setSearchQuery('')
    setMinFollowers(0)
  }

  const [inputLogin, setInputLogin] = useState('')
  const [loginMode, setLoginMode] = useState('like')
  const [inputMinFollowers, setInputMinFollowers] = useState('')
  const [inputMaxFollowers, setInputMaxFollowers] = useState('')
  const [inputExactFollowers, setInputExactFollowers] = useState('')
  const [sortOrder, setSortOrder] = useState('none')

  const [submittedQuery, setSubmittedQuery] = useState({
    login: '',
    loginMode: 'like',
    minFollowers: '',
    maxFollowers: '',
    exactFollowers: '',
    sortOrder: 'none',
    hasSearched: false,
  })

  const buildApiUrl = () => {
    if (!submittedQuery.hasSearched) return null

    const params = new URLSearchParams()

    if (submittedQuery.login.trim()) {
      if (submittedQuery.loginMode === 'exact') {
        params.append('login', submittedQuery.login.trim())
      } else {
        params.append('login_like', submittedQuery.login.trim())
      }
    }

    if (submittedQuery.exactFollowers.trim()) {
      params.append('followers', submittedQuery.exactFollowers.trim())
    } else {
      if (submittedQuery.minFollowers.trim()) {
        params.append('followers_gte', submittedQuery.minFollowers.trim())
      }
      if (submittedQuery.maxFollowers.trim()) {
        params.append('followers_lte', submittedQuery.maxFollowers.trim())
      }
    }

    if (submittedQuery.sortOrder === 'desc') {
      params.append('_sort', 'followers')
      params.append('_order', 'desc')
    } else if (submittedQuery.sortOrder === 'asc') {
      params.append('_sort', 'followers')
      params.append('_order', 'asc')
    }

    const queryString = params.toString()
    return queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL
  }

  const apiUrl = buildApiUrl()
  const { data: apiUsers, loading, error, refetch } = useFetch(apiUrl)

  const handleApiSubmit = (e) => {
    e.preventDefault()
    setSubmittedQuery({
      login: inputLogin,
      loginMode,
      minFollowers: inputMinFollowers,
      maxFollowers: inputMaxFollowers,
      exactFollowers: inputExactFollowers,
      sortOrder,
      hasSearched: true,
    })
  }

  const handleClearApi = () => {
    setInputLogin('')
    setLoginMode('like')
    setInputMinFollowers('')
    setInputMaxFollowers('')
    setInputExactFollowers('')
    setSortOrder('none')
    setSubmittedQuery({
      login: '',
      loginMode: 'like',
      minFollowers: '',
      maxFollowers: '',
      exactFollowers: '',
      sortOrder: 'none',
      hasSearched: false,
    })
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-8 font-sans text-slate-900">
      <div className="max-w-[960px] mx-auto">
        <section className="mb-14">
          <h1 className="text-2xl font-extrabold text-center text-slate-900 mb-1.5">
            GitHub User Browser
          </h1>

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            minFollowers={minFollowers}
            onMinFollowersChange={setMinFollowers}
            matchCount={filteredUsers.length}
            totalCount={ALL_USERS.length}
            onClear={handleClearStatic}
          />

          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl py-10 px-5 text-center my-6">
              <div className="text-3xl mb-2.5">🔍</div>
              <div className="text-[15px] font-bold text-slate-900 mb-1.5">
                ไม่พบผู้ใช้ที่ตรงกับเงื่อนไข
              </div>
              <div className="text-[13px] text-slate-500 mb-4">
                ลองลดค่า "ผู้ติดตามขั้นต่ำ" หรือแก้คำค้นหา
              </div>
              <button
                type="button"
                onClick={handleClearStatic}
                className="text-[13px] text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-100 cursor-pointer inline-block transition-colors"
              >
                ล้างตัวกรอง
              </button>
            </div>
          )}
        </section>

        <hr className="border-t-2 border-slate-200 my-12" />

        <section className="pb-16">
          <h2 className="text-2xl font-extrabold text-center text-slate-900 mb-1.5">
            GitHub User Browser (Backend API)
          </h2>

          <form onSubmit={handleApiSubmit} className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
              <div className="sm:col-span-8">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  ค้นหาชื่อ Login
                </label>
                <input
                  type="text"
                  value={inputLogin}
                  onChange={(e) => setInputLogin(e.target.value)}
                  placeholder="เช่น octocat, torvalds..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  รูปแบบการค้นหา
                </label>
                <select
                  value={loginMode}
                  onChange={(e) => setLoginMode(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="like">มีคำนี้อยู่ (login_like)</option>
                  <option value="exact">ตรงเป๊ะ (login)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  ผู้ติดตามขั้นต่ำ (followers_gte)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputMinFollowers}
                  onChange={(e) => {
                    setInputMinFollowers(e.target.value)
                    if (e.target.value) setInputExactFollowers('')
                  }}
                  placeholder="เช่น 20000"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  ผู้ติดตามสูงสุด (followers_lte)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputMaxFollowers}
                  onChange={(e) => {
                    setInputMaxFollowers(e.target.value)
                    if (e.target.value) setInputExactFollowers('')
                  }}
                  placeholder="เช่น 100000"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  ผู้ติดตามตรงเป๊ะ (followers)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputExactFollowers}
                  onChange={(e) => {
                    setInputExactFollowers(e.target.value)
                    if (e.target.value) {
                      setInputMinFollowers('')
                      setInputMaxFollowers('')
                    }
                  }}
                  placeholder="เช่น 98000"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  เรียงตาม Followers (_sort)
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="none">ค่าเริ่มต้น</option>
                  <option value="desc">มาก ➔ น้อย (desc)</option>
                  <option value="asc">น้อย ➔ มาก (asc)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 border-t border-slate-100 gap-3">
              <div className="text-xs text-slate-500 break-all">
                {apiUrl ? (
                  <span>
                    URL ที่เรียก: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono text-[11px]">{apiUrl}</code>
                  </span>
                ) : (
                  <span>พร้อมยิง API (กดปุ่ม "ค้นหาผ่าน API")</span>
                )}
              </div>
              <div className="flex gap-2 self-end sm:self-auto">
                {submittedQuery.hasSearched && (
                  <button
                    type="button"
                    onClick={handleClearApi}
                    className="text-[13px] text-slate-600 border border-slate-300 bg-white px-3.5 py-1.5 rounded-lg font-semibold hover:bg-slate-100 cursor-pointer transition-colors"
                  >
                    ล้างตัวกรอง
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors shadow-sm"
                >
                  ค้นหาผ่าน API
                </button>
              </div>
            </div>
          </form>

          {loading && (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500 shadow-sm my-6">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-3"></div>
              <p className="text-sm font-medium">กำลังโหลดข้อมูลจาก Mock Server API...</p>
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700 shadow-sm my-6">
              <div className="text-3xl mb-2">⚠️</div>
              <p className="font-semibold text-sm mb-1">{error}</p>
              <p className="text-xs text-red-500 mb-4">
                เกิดข้อผิดพลาดในการเชื่อมต่อกับ Server
              </p>
              <button
                type="button"
                onClick={refetch}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                ลองใหม่
              </button>
            </div>
          )}

          {!loading && !error && apiUsers && apiUsers.length > 0 && (
            <div>
              <div className="text-[13px] text-slate-600 mb-3">
                พบ <b className="text-slate-900">{apiUsers.length}</b> รายการ จาก API Server
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {apiUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>
          )}

          {!loading && !error && apiUsers && apiUsers.length === 0 && (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl py-10 px-5 text-center my-6">
              <div className="text-3xl mb-2.5">🔍</div>
              <div className="text-[15px] font-bold text-slate-900 mb-1.5">
                ไม่พบผู้ใช้ที่ตรงกับเงื่อนไขใน API Server
              </div>
              <div className="text-[13px] text-slate-500 mb-4">
                ลองปรับคำค้นหาหรือลดค่าผู้ติดตามขั้นต่ำ
              </div>
              <button
                type="button"
                onClick={handleClearApi}
                className="text-[13px] text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-100 cursor-pointer inline-block transition-colors"
              >
                ล้างตัวกรอง
              </button>
            </div>
          )}

          {!loading && !error && !submittedQuery.hasSearched && (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center text-slate-400">
              <div className="text-3xl mb-2">🌐</div>
              <p className="text-sm font-medium text-slate-600">ยังไม่ได้ยิงค้นหาผ่าน API</p>
              <p className="text-xs text-slate-400 mt-1">
                กรอกเงื่อนไขด้านบน แล้วกดปุ่ม <b>"ค้นหาผ่าน API"</b>
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
