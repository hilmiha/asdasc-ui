import type { dropdownMenuOptionType } from ".";

export const onRadioClicked = (
    option:dropdownMenuOptionType,
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    onChange?:(newValue:string, option:dropdownMenuOptionType, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
) =>{
    const newValue = option.id
    if(onChange){
        onChange(newValue, option, event)
    }
}