import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { ModalProvider } from "./app/components/Modal.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ModalProvider > */}
    <App />

    {/* </ModalProvider> */}
  </StrictMode>,
)