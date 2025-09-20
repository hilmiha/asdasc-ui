import './index.scss'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalProvider from './context/global-context.tsx'
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <GlobalProvider>
            <App/>
        </GlobalProvider>
    </BrowserRouter>
)
