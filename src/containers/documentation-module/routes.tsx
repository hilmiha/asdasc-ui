import { lazy } from 'react';
const GetStartedPage   = lazy(() => import('./pages/get-started-page'));
const ComponentsPage   = lazy(() => import('./pages/components-page'));


const routes = [
    {key:'get-started', path: '/', component: <GetStartedPage/>},
    {key:'components', path: '/components', component: <ComponentsPage/>},
];

export default routes;