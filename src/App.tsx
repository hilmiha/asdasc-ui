// App.jsx
import './App.scss'
import { Routes, Route } from 'react-router'
import Playground from './App_'
import AppTemplate from './templates/app-template'
import GetStartedPage from './pages/get-started-page'
import DocsPage from './pages/docs-page'

function App() {
    return (
        <AppTemplate>
            <Routes>
                <Route path="/" element={<Playground />} />
                <Route path="/docs/*" element={
                    <DocsPage>
                        <Routes>
                            <Route path="" element={<GetStartedPage/>} />
                            <Route path="/components" element={<>Components Page</>} />
                        </Routes>
                    </DocsPage>
                } />
            </Routes>
        </AppTemplate>
    )
}

export default App