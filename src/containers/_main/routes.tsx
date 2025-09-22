
import { lazy } from 'react';
const PlaygroundModule    = lazy(() => import('../playground-module'));
const DocsModule   = lazy(() => import('../documentation-module'));

const routes = [
    {key:'playground', path: '/', component: <PlaygroundModule/>},
    {key:'docs', path: '/docs/*', component: <DocsModule/>},
    {key:'404', path: '/*', component: <>404</>},
];

export default routes;