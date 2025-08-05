import { PiCaretDownBold } from "react-icons/pi"
import Button from "../../button"
import DropdownMenu from "../../dropdown-menu"

const FormatTextTypeModule = ({
    selected,
    onClickOption
}:{
    selected:string
    onClickOption:(value:string)=>void
}) =>{
    return(
        <div className="header-dropdown-box">
            <DropdownMenu
                trigger={
                    <Button 
                        txtLabel={`${selected?('Header '):('')}${selected || 'Normal'}`}
                        iconAfter={<PiCaretDownBold/>}
                    />
                }
                options={[
                    {id:'', txtLabel:'Normal'},
                    {id:'1', txtLabel:'Header 1'},
                    {id:'2', txtLabel:'Header 2'},
                    {id:'3', txtLabel:'Header 3'},
                    {id:'4', txtLabel:'Header 4'},
                    {id:'5', txtLabel:'Header 5'},
                    {id:'6', txtLabel:'Header 6'},
                ]}
                onClick={(value)=>{onClickOption(value)}}
            />
        </div>
    )
}

export default FormatTextTypeModule