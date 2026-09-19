import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Recipes from './pages/Recipes.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      {/* layout route: ไม่มี path ของตัวเอง แต่ห่อทุกหน้าไว้ */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
        <Route path="about" element={<About />} />

        {/* ต้องอยู่ล่างสุด: * = อะไรก็ได้ที่ไม่ตรงข้างบน */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
