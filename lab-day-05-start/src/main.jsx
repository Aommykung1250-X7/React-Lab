import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { BookingProvider } from './context/BookingContext.jsx'
import './index.css'

// ครอบสูงกว่า <App /> ทั้งก้อน → ทั้ง Header และทุก route อยู่ใต้ Provider เดียวกัน
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookingProvider>
        <App />
      </BookingProvider>
    </BrowserRouter>
  </StrictMode>
)
