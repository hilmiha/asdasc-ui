// App.jsx
import './App.scss'
import { Routes, Route } from 'react-router'
import HomePage from './pages/Home'
import Playground from './App_'
import DocsTemplate from './templates/docs-template'
import AppTemplate from './templates/app-template'

function App() {
    return (
        <AppTemplate>
            <Routes>
                <Route path="/" element={<Playground />} />
                <Route path="/docs" element={
                    <DocsTemplate>
                        <HomePage/>
                    </DocsTemplate>
                } />
            </Routes>
        </AppTemplate>
    )
}

export default App