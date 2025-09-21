
import './styles.scss'
import Button from "../../components/button"
import Radio from "../../components/radio-button/radio"

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