export const thisOnClick = (
    id:string,
    e:React.MouseEvent<HTMLButtonElement>,
    onClickFunction?:(idButton:string, e:React.MouseEvent<HTMLButtonElement>)=>void,
) =>{
    if(onClickFunction){
        onClickFunction(id, e)
    }
}