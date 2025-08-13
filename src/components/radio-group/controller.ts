import type { optionItemType } from "../_types";

export const onRadioClicked = (
    option:optionItemType,
    value:string,
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    onChange?:(newValue:string, option:optionItemType, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
) =>{
    const newValue = (option.id===value)?(''):(option.id)

    if(onChange){
        onChange(newValue, option, event)
    }
}