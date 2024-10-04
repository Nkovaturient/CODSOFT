import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './ContextAPI/ContextAPI.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>
    <App />
    </StoreContextProvider>
  </BrowserRouter>,
)
