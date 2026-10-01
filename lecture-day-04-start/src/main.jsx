import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// ⌨️ พิมพ์ตาม #1 (1.1): import { BrowserRouter } แล้วครอบ <App /> ด้วย <BrowserRouter>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
