export const baseUrl = '/docs'

export const componentList = [
    {id:'accordion', txtLabel:'Accordion', to:'/accordion'},
    {id:'bottom-sheet', txtLabel:'Bottom Sheet', to:'/bottom-sheet'},
    {id:'button', txtLabel:'Button', to:'/button'},
    {id:'calendar', txtLabel:'Calendar', to:'/calendar'},
    {id:'carousel', txtLabel:'Carousel', to:'/carousel'},
    {id:'checkbox', txtLabel:'Checkbox', to:'/checkbox'},
    {id:'color-picker', txtLabel:'Color Picker', to:'/color-picker'},
    {id:'dropdown', txtLabel:'Dropdown', to:'/dropdown'},
    {id:'dropdown-menu', txtLabel:'Dropdown Menu', to:'/dropdown-menu'},
    {id:'icon-button', txtLabel:'Icon Button', to:'/icon-button'},
    {id:'input-code', txtLabel:'Input Code', to:'/input-code'},
    {id:'input-color', txtLabel:'Input Color', to:'/input-color'},
    {id:'input-date', txtLabel:'Input Date', to:'/input-date'},
    {id:'input-file', txtLabel:'Input File (dev.)', to:'/input-file'},
    {id:'input-password', txtLabel:'Input Password', to:'/input-password'},
    {id:'input-phone-number', txtLabel:'Input Phone Number (dev.)', to:'/input-phone-number'},
    {id:'input-selection', txtLabel:'Input Selection', to:'/input-selection'},
    {id:'input-tag', txtLabel:'Input Tag', to:'/input-tag'},
    {id:'input-text', txtLabel:'Input Text', to:'/input-text'},
    {id:'input-textarea', txtLabel:'Input Textarea', to:'/input-textarea'},
    {id:'modal', txtLabel:'Modal', to:'/modal'},
    {id:'radio', txtLabel:'Radio', to:'/radio'},
    {id:'resizable', txtLabel:'Resizable', to:'/resizable'},
    {id:'skeleton', txtLabel:'Skeleton', to:'/skeleton'},
    {id:'spinner', txtLabel:'Spinner', to:'/spinner'},
    {id:'split-button', txtLabel:'Split Button', to:'/split-button'},
    {id:'switch', txtLabel:'Switch', to:'/switch'},
    {id:'table', txtLabel:'Table', to:'/table'},
    {id:'tabs', txtLabel:'Tabs', to:'/tabs'},
    {id:'tag', txtLabel:'Tag', to:'/tag'},
    {id:'tooltip', txtLabel:'Tooltip', to:'/tooltip'},
    {id:'wysiwyg', txtLabel:'Wysiwyg', to:'/wysiwyg'},
]

export const sideNavMenues = [
    {
        id:'start',
        txtLabel:'',
        menu:[
            {id:'get-started', txtLabel:'Get Started', to:''},
            {id:'components', txtLabel:'Components', to:'/components'},
            {id:'colors', txtLabel:'Colors', to:'/colors'},
        ]
    },
    {
        id:'components',
        txtLabel:'Components',
        menu:componentList
    }
]