import { lazy } from 'react';
const GetStartedPage   = lazy(() => import('./pages/get-started-page'));
const ComponentsPage   = lazy(() => import('./pages/components-page'));
const ColorsPage   = lazy(() => import('./pages/colors-page'));
const AccordionPage   = lazy(() => import('./pages/accordion-page'));
const BottomSheetPage   = lazy(() => import('./pages/bottom-sheet-page'));
const ButtonPage   = lazy(() => import('./pages/button-page'));
const CalendarPage   = lazy(() => import('./pages/calendar-page'));
const CarouselPage   = lazy(() => import('./pages/carousel-page'));
const CheckboxPage   = lazy(() => import('./pages/checkbox-page'));
const DropdownPage   = lazy(() => import('./pages/dropdown-page'));

const routes = [
    {key:'get-started', path: '/', component: <GetStartedPage/>},
    {key:'components', path: '/components', component: <ComponentsPage/>},
    {key:'colors', path: '/colors', component: <ColorsPage/>},
    {key:'accordion', path: '/accordion', component: <AccordionPage/>},
    {key:'bottom-sheet', path: '/bottom-sheet', component: <BottomSheetPage/>},
    {key:'button', path: '/button', component: <ButtonPage/>},
    {key:'calendar', path: '/calendar', component: <CalendarPage/>},
    {key:'carousel', path: '/carousel', component: <CarouselPage/>},
    {key:'checkbox', path: '/checkbox', component: <CheckboxPage/>},
    {key:'dropdown', path: '/dropdown', component: <DropdownPage/>},
    {key:'unknown', path: '/*', component: <>🚧 Coming Soon...</>},
];

export default routes;