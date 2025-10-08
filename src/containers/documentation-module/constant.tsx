export const baseUrl = '/docs'

export const componentList = [
    {id:'accordion', txtLable:'Accordion', to:'/accordion'},
    {id:'bottom-sheet', txtLable:'Bottom Sheet', to:'/bottom-sheet'},
    {id:'button', txtLable:'Button', to:'/button'},
    {id:'calendar', txtLable:'Calendar', to:'/calendar'},
    {id:'carousel', txtLable:'Carousel', to:'/carousel'},
    {id:'checkbox', txtLable:'Checkbox', to:'/checkbox'},
    {id:'dropdown', txtLable:'Dropdown', to:'/dropdown'},
    {id:'dropdown-menu', txtLable:'Dropdown Menu', to:'/dropdown-menu'},
    {id:'icon-button', txtLable:'Icon Button', to:'/icon-button'},
    {id:'input-date', txtLable:'Input Date', to:'/input-date'},
    {id:'input-password', txtLable:'Input Password', to:'/input-password'},
    {id:'input-selection', txtLable:'Input Selection', to:'/input-selection'},
    {id:'input-tag', txtLable:'Input Tag', to:'/input-tag'},
    {id:'input-text', txtLable:'Input Text', to:'/input-text'},
    {id:'input-textarea', txtLable:'Input Textarea', to:'/input-textarea'},
    {id:'modal', txtLable:'Modal', to:'/modal'},
    {id:'radio', txtLable:'Radio', to:'/radio'},
    {id:'resizable', txtLable:'Resizable', to:'/resizable'},
    {id:'skeleton', txtLable:'Skeleton', to:'/skeleton'},
    {id:'spinner', txtLable:'Spinner', to:'/spinner'},
    {id:'split-button', txtLable:'Split Button', to:'/split-button'},
    {id:'table', txtLable:'Table', to:'/table'},
    {id:'tabs', txtLable:'Tabs', to:'/tabs'},
    {id:'tag', txtLable:'Tag', to:'/tag'},
    {id:'tooltip', txtLable:'Tooltip', to:'/tooltip'},
    {id:'wysiwyg', txtLable:'Wysiwyg', to:'/wysiwyg'},
]

export const sideNavMenues = [
    {
        id:'start',
        txtLable:'',
        menu:[
            {id:'get-started', txtLable:'Get Started', to:''},
            {id:'components', txtLable:'Components', to:'/components'},
            {id:'colors', txtLable:'Colors', to:'/colors'},
        ]
    },
    {
        id:'components',
        txtLable:'Components',
        menu:componentList
    }
]