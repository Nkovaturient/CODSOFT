import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './ContextAPI/StoreContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS bundle (includes Popper.js)


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <StoreContextProvider>
    <App />
    </StoreContextProvider>
  </BrowserRouter>
  </StrictMode>
)
