import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {SnackbarProvider} from 'notistack'
import StoreContextProvider from './ContextApi/ContextApi.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>
  <SnackbarProvider>
    <App />
    </SnackbarProvider>
    </StoreContextProvider>
  </BrowserRouter>,
)
