import { useContext } from "react"
import { GlobalContext, type _GlobalContextType } from "../../../context/global-context"
import IconButton from "../../icon-button"
import { PiArrowLineUpBold, PiCaretDownBold, PiCaretLeftBold, PiCaretLineLeftBold, PiCaretLineRightBold, PiCaretRightBold, PiRowsBold } from "react-icons/pi"
import DropdownMenu from "../../dropdown-menu"
import Button from "../../button"

const TableFooter = ({
    tableContainerRef,
    maxRow,
    isTableScrolled,
    setMaxRow
}:{
    tableContainerRef:React.RefObject<HTMLDivElement | null>
    maxRow:string,
    isTableScrolled:boolean
    setMaxRow: React.Dispatch<React.SetStateAction<string>>
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType

    return(
        <div
            className='table-footer-floating'
            style={{
                gridTemplateColumns:screenSize==='laptop'?('1fr 1fr 1fr'):('1fr max-content')
            }}
        >
            {
                (screenSize==='laptop')&&(
                    <div className='footer-left'>
                        <p>Showing 1-25 of 25</p>
                    </div>
                )
            }
            <div 
                className='footer-pagination'
                style={{
                    justifyContent:screenSize==='laptop'?('center'):('start')
                }}
            >
                <IconButton
                    icon={<PiCaretLineLeftBold className='global-icon'/>}
                    txtLabel='First Page'
                    appearance='subtle'
                />
                <IconButton
                    icon={<PiCaretLeftBold className='global-icon'/>}
                    txtLabel='Previous Page'
                    appearance='subtle'
                />
                <p className='page-info-box'>Page 1 / 1</p>
                <IconButton
                    icon={<PiCaretRightBold className='global-icon'/>}
                    txtLabel='Next Page'
                    appearance='subtle'
                />
                <IconButton
                    icon={<PiCaretLineRightBold className='global-icon'/>}
                    txtLabel='Last Page'
                    appearance='subtle'
                />
            </div>
            <div className='footer-right'>
                <DropdownMenu
                    trigger={
                        (screenSize==='mobile')?(
                            <IconButton
                                icon={<PiRowsBold className="global-icon"/>}
                                txtLabel={`Show ${maxRow} Rows`}
                                appearance='subtle'
                            />
                        ):(
                            <Button
                                className='max-row-button'
                                txtLabel={`Show ${maxRow} Rows`}
                                iconAfter={<PiCaretDownBold className='global-icon'/>}
                                appearance='subtle'
                            />
                        )
                        
                    }
                    optionSelected={[maxRow]}
                    options={[
                        {id:'10', txtLabel:'10 Rows'},
                        {id:'25', txtLabel:'25 Rows'},
                        {id:'50', txtLabel:'50 Rows'},
                        {id:'100', txtLabel:'100 Rows'},
                    ]}
                    onClick={(id)=>{
                        setMaxRow(id)
                    }}
                    floatingConfig={{
                        isContainerWidthSameAsTrigger:true,
                        placement:'bottom-end',
                        fallbackPlacement:['top-end']
                    }}
                />
                {
                    (screenSize!=='mobile')&&(
                        <>
                            <div className='separator'></div>
                            <IconButton
                                icon={<PiArrowLineUpBold className='global-icon'/>}
                                txtLabel='Go To Top'
                                onClick={()=>{
                                    tableContainerRef.current?.scrollTo({top:0, behavior:'smooth'})
                                }}
                                isDisabled={!isTableScrolled}
                                appearance='subtle'
                            />
                        </>
                    )
                }
                
            </div>
        </div>
    )
}

export default TableFooter