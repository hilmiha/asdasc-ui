import { lazy } from 'react';
const GetStartedPage   = lazy(() => import('./pages/get-started-page'));
const ComponentsPage   = lazy(() => import('./pages/components-page'));
const ColorsPage   = lazy(() => import('./pages/colors-page'));
const AccordionPage   = lazy(() => import('./pages/accordion-page'));


const routes = [
    {key:'get-started', path: '/', component: <GetStartedPage/>},
    {key:'components', path: '/components', component: <ComponentsPage/>},
    {key:'colors', path: '/colors', component: <ColorsPage/>},
    {key:'accordion', path: '/accordion', component: <AccordionPage/>},
];

export default routes;