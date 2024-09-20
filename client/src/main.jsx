import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GlobalProvider from './context/GlobalContext.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GlobalProvider>
    <App />
    </GlobalProvider>
    <ToastContainer />
  </StrictMode>,
)
