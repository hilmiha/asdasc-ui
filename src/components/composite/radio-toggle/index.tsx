
import './styles.scss'
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"

const RadioToggle = ({
    icon,
    txtLabel,
    isSelected = false,
    type = "horizontal",
    onClick
}:{
    icon?:React.ReactElement,
    txtLabel:string,
    isSelected:boolean,
    type:'vertical' | "horizontal"
    onClick?:()=>void
}) =>{
    return(
        <Button
            className={`radio-toggle-${type}`}
            iconBefore={icon}
            iconAfter={<Radio isSelected={isSelected}/>}
            txtLabel={txtLabel}
            onClick={onClick}
            isSelected={isSelected}
        />
    )
}

export default RadioToggle