
export const onCheckboxClicked = (
    newValue:boolean,
    event:React.MouseEvent<HTMLButtonElement>,
    onClick?:(newValue:boolean, e:React.MouseEvent<HTMLButtonElement>)=>void
) =>{
    if(onClick){
        onClick(newValue, event)
    }
}