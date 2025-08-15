import './index.scss'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalProvider from './context/global-context.tsx'
// import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
        <GlobalProvider>
            <App/>
        </GlobalProvider>
    // </StrictMode>
)
