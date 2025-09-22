export const baseUrl = '/docs'

export const componentList = [
    {id:'accordion', txtLable:'Accordion', to:'/accordion'},
    {id:'bottom-sheet', txtLable:'Bottom Sheet', to:'/bottom-sheet'},
    {id:'button', txtLable:'Botton', to:'/botton'},
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
    {id:'input-text', txtLable:'input-text', to:'/input-text'},
    {id:'input-textarea', txtLable:'input-textarea', to:'/input-textarea'},
    {id:'modal', txtLable:'modal', to:'/modal'},
    {id:'radio', txtLable:'radio', to:'/radio'},
    {id:'resizable', txtLable:'resizable', to:'/resizable'},
    {id:'skeleton', txtLable:'skeleton', to:'/skeleton'},
    {id:'spinner', txtLable:'spinner', to:'/spinner'},
    {id:'split-button', txtLable:'split-button', to:'/split-button'},
    {id:'table', txtLable:'table', to:'/table'},
    {id:'tabs', txtLable:'tabs', to:'/tabs'},
    {id:'tag', txtLable:'tag', to:'/tag'},
    {id:'tooltip', txtLable:'tooltip', to:'/tooltip'},
    {id:'wysiwyg', txtLable:'wysiwyg', to:'/wysiwyg'},
]

export const sideNavMenues = [
    {
        id:'start',
        txtLable:'',
        menu:[
            {id:'get-started', txtLable:'Get Started', to:''},
            {id:'component', txtLable:'Components', to:'/components'},
            {id:'colors', txtLable:'Colors', to:'/colors'},
        ]
    },
    {
        id:'components',
        txtLable:'Components',
        menu:componentList
    }
]