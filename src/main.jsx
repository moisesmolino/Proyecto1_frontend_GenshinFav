import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App'
import { ProveedorToast } from './contexto/ToastContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProveedorToast>
        <App />
      </ProveedorToast>
    </BrowserRouter>
  </StrictMode>
)