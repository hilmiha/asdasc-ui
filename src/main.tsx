import './index.scss'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename="/asdasc-ui">
        <App/>
    </BrowserRouter>
)
