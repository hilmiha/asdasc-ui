import type { dropdownMenuOptionType } from "."

export const onOptionClick = (
    option:dropdownMenuOptionType,
    e:React.MouseEvent<HTMLButtonElement>,
    onClickFunction?:(idOption:string, option:dropdownMenuOptionType, e:React.MouseEvent<HTMLButtonElement>)=>void,
) =>{
    if(onClickFunction){
        onClickFunction(option.id, option, e)
    }
}