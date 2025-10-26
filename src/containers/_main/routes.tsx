
import { lazy } from 'react';
import { Navigate } from 'react-router';
const PlaygroundModule    = lazy(() => import('../playground-module'));
const DocsModule   = lazy(() => import('../documentation-module'));
const GenerateColorsModule   = lazy(() => import('../generate-colors-module'));

const routes = [
    {key:'home', path: '/', component: <Navigate to={'/docs'}/>},
    {key:'docs', path: '/docs/*', component: <DocsModule/>},
    {key:'docs', path: '/testing-world', component: <PlaygroundModule/>},
    {key:'generate-colors', path: '/generate-colors/*', component: <GenerateColorsModule/>},
    {key:'404', path: '/*', component: <>404</>},
];

export default routes;