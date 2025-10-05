import { lazy } from 'react';
const GetStartedPage   = lazy(() => import('./pages/get-started-page'));
const ComponentsPage   = lazy(() => import('./pages/components-page'));
const ColorsPage   = lazy(() => import('./pages/colors-page'));
const AccordionPage   = lazy(() => import('./pages/accordion-page'));
const BottomSheetPage   = lazy(() => import('./pages/bottom-sheet-page'));
const ButtonPage   = lazy(() => import('./pages/button-page'));
const CalendarPage   = lazy(() => import('./pages/calendar-page'));
const CarouselPage   = lazy(() => import('./pages/carousel-page'));

const routes = [
    {key:'get-started', path: '/', component: <GetStartedPage/>},
    {key:'components', path: '/components', component: <ComponentsPage/>},
    {key:'colors', path: '/colors', component: <ColorsPage/>},
    {key:'accordion', path: '/accordion', component: <AccordionPage/>},
    {key:'bottom-sheet', path: '/bottom-sheet', component: <BottomSheetPage/>},
    {key:'button', path: '/button', component: <ButtonPage/>},
    {key:'calendar', path: '/calendar', component: <CalendarPage/>},
    {key:'carousel', path: '/carousel', component: <CarouselPage/>},
];

export default routes;