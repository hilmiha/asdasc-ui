import { lazy } from 'react';

const UnterConstruction   = lazy(() => import('./pages/under-construction-page'));
const GetStartedPage   = lazy(() => import('./pages/get-started-page'));
const ComponentsPage   = lazy(() => import('./pages/components-page'));
const ColorsPage   = lazy(() => import('./pages/colors-page'));
const AccordionPage   = lazy(() => import('./pages/accordion-page'));
const BottomSheetPage   = lazy(() => import('./pages/bottom-sheet-page'));
const ButtonPage   = lazy(() => import('./pages/button-page'));
const CalendarPage   = lazy(() => import('./pages/calendar-page'));
const ColorPickerPage   = lazy(() => import('./pages/color-picker-page'));
const CarouselPage   = lazy(() => import('./pages/carousel-page'));
const CheckboxPage   = lazy(() => import('./pages/checkbox-page'));
const DropdownPage   = lazy(() => import('./pages/dropdown-page'));
const DropdownMenuPage   = lazy(() => import('./pages/dropdown-menu-page'));
const IconButtonPage   = lazy(() => import('./pages/icon-button-page'));
const InputCodePage   = lazy(() => import('./pages/input-code-page'));
const InputColorPage   = lazy(() => import('./pages/input-color-page'));
const InputDatePage   = lazy(() => import('./pages/input-date-page'));
const InputPassowordPage   = lazy(() => import('./pages/input-password-page'));
const InputSelectionPage   = lazy(() => import('./pages/input-selection-page'));
const InputTagPage   = lazy(() => import('./pages/input-tag-page'));
const InputTextPage   = lazy(() => import('./pages/input-text-page'));
const InputTextareaPage   = lazy(() => import('./pages/input-textarea-page'));
const ModalPage   = lazy(() => import('./pages/modal-page'));
const RadioPage   = lazy(() => import('./pages/radio-page'));
const ResizablePage   = lazy(() => import('./pages/resizable-page'));
const SkeletonPage   = lazy(() => import('./pages/skeleton-page'));
const SpinnerPage   = lazy(() => import('./pages/spinner-page'));
const SplitButtonPage   = lazy(() => import('./pages/split-button-page'));

const routes = [
    {key:'get-started', path: '/', component: <GetStartedPage/>},
    {key:'components', path: '/components', component: <ComponentsPage/>},
    {key:'colors', path: '/colors', component: <ColorsPage/>},
    {key:'accordion', path: '/accordion', component: <AccordionPage/>},
    {key:'bottom-sheet', path: '/bottom-sheet', component: <BottomSheetPage/>},
    {key:'button', path: '/button', component: <ButtonPage/>},
    {key:'calendar', path: '/calendar', component: <CalendarPage/>},
    {key:'color-picker', path: '/color-picker', component: <ColorPickerPage/>},
    {key:'carousel', path: '/carousel', component: <CarouselPage/>},
    {key:'checkbox', path: '/checkbox', component: <CheckboxPage/>},
    {key:'dropdown', path: '/dropdown', component: <DropdownPage/>},
    {key:'dropdown-menu', path: '/dropdown-menu', component: <DropdownMenuPage/>},
    {key:'icon-button', path: '/icon-button', component: <IconButtonPage/>},
    {key:'input-code', path: '/input-code', component: <InputCodePage/>},
    {key:'input-color', path: '/input-color', component: <InputColorPage/>},
    {key:'input-date', path: '/input-date', component: <InputDatePage/>},
    {key:'input-password', path: '/input-password', component: <InputPassowordPage/>},
    {key:'input-selection', path: '/input-selection', component: <InputSelectionPage/>},
    {key:'input-tag', path: '/input-tag', component: <InputTagPage/>},
    {key:'input-text', path: '/input-text', component: <InputTextPage/>},
    {key:'input-textarea', path: '/input-textarea', component: <InputTextareaPage/>},
    {key:'modal', path: '/modal', component: <ModalPage/>},
    {key:'radio', path: '/radio', component: <RadioPage/>},
    {key:'resizable', path: '/resizable', component: <ResizablePage/>},
    {key:'skeleton', path: '/skeleton', component: <SkeletonPage/>},
    {key:'spinner', path: '/spinner', component: <SpinnerPage/>},
    {key:'split-button', path: '/split-button', component: <SplitButtonPage/>},

    {key:'unknown', path: '/*', component: <UnterConstruction/>},
];

export default routes;