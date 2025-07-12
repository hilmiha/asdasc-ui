import './index.scss'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalProvider from './context/global-context.tsx'

createRoot(document.getElementById('root')!).render(
    <GlobalProvider>
        <App/>
    </GlobalProvider>
)
