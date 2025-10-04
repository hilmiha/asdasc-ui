export const doClickAccordionButton = (
    id:string,
    currentIsOpen?:boolean,
    onClickTrigger?:(id:string)=>void
) =>{
    if(currentIsOpen===undefined){
        return 
    }
    if(onClickTrigger){
        onClickTrigger(id)
    }
}