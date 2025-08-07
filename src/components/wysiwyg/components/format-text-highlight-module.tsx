import { PiCheckCircleBold, PiHighlighterBold } from "react-icons/pi"
import Dropdown from "../../dropdown"
import IconButton from "../../icon-button"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { GlobalContext, type _GlobalContextType } from "../../../context/global-context"
import BottomSheet from "../../bottom-sheet"

const FormatTextHighlightModule = ({
    selected,
    onApply
}:{
    selected:string,
    onApply:(value:string)=>void
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    const [isOpen, setIsOpen] = useState(false)
    
    const colors = useMemo(()=>{
        return([
            {id:'black', color:'var(--clr-dark)', border:'var(--clr-grey-300)', value:'#000000'},
            {id:'white', color:'var(--clr-light)', border:'var(--clr-grey-300)', value:'#FFFFFF'},
            {id:'rose', border:'var(--clr-rose-700)', color:'#E8909D', value:'#E8909D'},
            {id:'red', border:'var(--clr-red-700)', color:'#ED756E', value:'#ED756E'},
            {id:'orange', border:'var(--clr-orange-700)', color:'#F89A30', value:'#F89A30'},
            {id:'yellow',border:'var(--clr-yellow-700)', color:'#E1BB30', value:'#E1BB30'},
            {id:'lime', border:'var(--clr-lime-700)', color:'#94BD59', value:'#94BD59'},
            {id:'green', border:'var(--clr-green-700)', color:'#36C981', value:'#36C981'},
            {id:'emerald', border:'var(--clr-emerald-700)', color:'#2CC392', value:'#2CC392'},
            {id:'teal', border:'var(--clr-teal-700)', color:'#61BBDA', value:'#61BBDA'},
            {id:'blue', border:'var(--clr-blue-700)', color:'#599CFA', value:'#599CFA'},
            {id:'purple', border:'var(--clr-purple-700)', color:'#9E91E6', value:'#9E91E6'},
            {id:'magenta', border:'var(--clr-magenta-700)', color:'#DA7BB7', value:'#DA7BB7'},
            {id:'grey', border:'var(--clr-grey-700)', color:'#96A0AF', value:'#96A0AF'},
        ])
    },[])

    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    
    const onClickSwatches = (value:string) =>{
        onApply(value)
        setIsOpen(false)
        triggerButtonRef.current?.click()
    }

    //close when screen change size
    useEffect(()=>{
        if(isOpen){
            setIsOpen(false)
        }
    },[screenSize])

    useEffect(()=>{
        console.log(selected)
    },[selected])
    return(
        <>
            {
                (screenSize==='mobile')?(
                    <>
                        <IconButton 
                            icon={
                                <div
                                    style={{
                                        height:"16px",
                                        borderRadius:'16px',
                                        background:(selected==='transparent')?(
                                            'repeating-conic-gradient(var(--clr-border) 0 25%, #0000 0 50%) 50% / 10px 10px'
                                        ):(
                                            selected
                                        ),
                                    }}
                                >
                                    <PiHighlighterBold className="global-icon"/>
                                </div>
                            }
                            txtLabel={'Text Highlight'}
                            appearance="subtle"
                            onClick={()=>{setIsOpen(true)}}
                            isSelected={isOpen}
                        />
                        <BottomSheet
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        >
                            <div 
                                style={{
                                    display:'flex', 
                                    flexWrap:'wrap',
                                    gap:'var(--space-50)',
                                }}
                            >
                                <button
                                    className="color-swatch"
                                    style={{
                                        background:'repeating-conic-gradient(var(--clr-border) 0 25%, #0000 0 50%) 50% / 10px 10px',
                                        border:`1px solid ${(`${selected}`.toLowerCase()==='transparent')?'var(--clr-surface-2)':'var(--clr-border)'}`
                                    }}
                                    onClick={()=>{onClickSwatches('transparent')}}
                                >
                                    {
                                        (`${selected}`.toLowerCase()==='transparent')&&(
                                            <PiCheckCircleBold
                                                style={{color:'var(--clr-grey-200)'}}
                                            />
                                        )
                                    }
                                </button>
                                {
                                    colors.map((itm)=>(
                                        <button
                                            className="color-swatch"
                                            key={itm.id}
                                            style={{
                                                background:itm.color,
                                                border:`2px solid ${(`${selected}`.toLowerCase()===itm.value.toLowerCase())?'var(--clr-surface-2)':itm.border}`
                                            }}
                                            onClick={()=>{onClickSwatches(itm.value)}}
                                        >
                                            {
                                                (`${selected}`.toLowerCase()===itm.value.toLowerCase())&&(
                                                    <PiCheckCircleBold
                                                        style={{color:'var(--clr-grey-200)'}}
                                                    />
                                                )
                                            }
                                        </button>
                                    ))
                                }
                            </div>
                        </BottomSheet>
                    </>
                ):(
                    <Dropdown
                        trigger={
                            (triggerRef, getReferenceProps, isDropdownOpen, trigger)=>{
                                if(trigger.current){
                                    triggerButtonRef.current = trigger.current as HTMLButtonElement
                                }
                                return(
                                    <IconButton 
                                        ref={triggerRef}
                                        {...(getReferenceProps?.() ?? {})}
                                        icon={
                                            <div
                                                style={{
                                                    height:"16px",
                                                    borderRadius:'16px',
                                                    background:(selected==='transparent')?(
                                                        'repeating-conic-gradient(var(--clr-border) 0 25%, #0000 0 50%) 50% / 10px 10px'
                                                    ):(
                                                        selected
                                                    ),
                                                }}
                                            >
                                                <PiHighlighterBold className="global-icon"/>
                                            </div>
                                        }
                                        txtLabel={'Text Highlight'}
                                        appearance="subtle"
                                        isSelected={isDropdownOpen}
                                    />
                                )
                            }
                        }
                    >
                        <div 
                            style={{
                                display:'flex', 
                                flexWrap:'wrap',
                                gap:'var(--space-50)',
                            }}
                        >
                            <button
                                className="color-swatch"
                                style={{
                                    background:'repeating-conic-gradient(var(--clr-border) 0 25%, #0000 0 50%) 50% / 10px 10px',
                                    border:`1px solid ${(`${selected}`.toLowerCase()==='transparent')?'var(--clr-surface-2)':'var(--clr-border)'}`
                                }}
                                onClick={()=>{onClickSwatches('transparent')}}
                            >
                                {
                                    (`${selected}`.toLowerCase()==='transparent')&&(
                                        <PiCheckCircleBold
                                            style={{color:'var(--clr-grey-200)'}}
                                        />
                                    )
                                }
                            </button>
                            {
                                colors.map((itm)=>(
                                    <button
                                        className="color-swatch"
                                        key={itm.id}
                                        style={{
                                            background:itm.color,
                                            border:`2px solid ${(`${selected}`.toLowerCase()===itm.value.toLowerCase())?'var(--clr-surface-2)':itm.border}`
                                        }}
                                        onClick={()=>{onClickSwatches(itm.value)}}
                                    >
                                        {
                                            (`${selected}`.toLowerCase()===itm.value.toLowerCase())&&(
                                                <PiCheckCircleBold
                                                    style={{color:'var(--clr-grey-200)'}}
                                                />
                                            )
                                        }
                                    </button>
                                ))
                            }
                        </div>
                    </Dropdown>
                )
            }
        </>
    )
}

export default FormatTextHighlightModule