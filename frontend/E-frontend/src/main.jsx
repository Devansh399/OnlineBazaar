import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import './styles/global.css'
import { Provider } from 'react-redux'
import store from "./redux/store.js";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </Provider>
)
