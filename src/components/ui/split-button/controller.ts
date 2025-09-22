export const doOptionClick = (
    id:string,
    event:React.MouseEvent<HTMLButtonElement>,
    onClickFunction?:(idButton:string, e:React.MouseEvent<HTMLButtonElement>)=>void,
) =>{
    if(onClickFunction){
        onClickFunction(id, event)
    }
}

export const doOnClick = (
    event:React.MouseEvent<HTMLButtonElement>,
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void,
) =>{
    if(onClick){
        onClick(event)
    }
}