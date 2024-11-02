import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContext, AuthProvider } from './AuthContext/authContext.jsx'
import { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider> 
       <App />
    </AuthProvider>
    </BrowserRouter>
  
  
  
  </StrictMode>,
)
