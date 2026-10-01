import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Recipes from './pages/Recipes.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

// ⌨️ พิมพ์ตาม #1 (1.1): เปลี่ยนเป็น <Routes> 3 หน้า (/, /recipes, /about)
// ⌨️ พิมพ์ตาม #2 (1.4): เปลี่ยน route แบนเป็น nested ใต้ <Layout />
// ⌨️ พิมพ์ตาม #3 (1.5): <Route path="*" element={<NotFound />} /> บรรทัดเดียว
// ⌨️ พิมพ์ตาม #4 (2.1): route recipes/:id

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
export default App
