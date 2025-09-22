export const thisOnClick = (
    event:React.MouseEvent<HTMLButtonElement>,
    onClickFunction?:(e:React.MouseEvent<HTMLButtonElement>)=>void
) =>{
    if(onClickFunction){
        onClickFunction(event)
    }
}