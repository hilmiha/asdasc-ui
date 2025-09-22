import { PiCheckCircleBold } from "react-icons/pi"
import Dropdown from "../../dropdown"
import IconButton from "../../icon-button"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { GlobalContext, type _GlobalContextType } from "src/context/global-context"
import BottomSheet from "../../bottom-sheet"

const FormatTextColorModule = ({
    selected,
    onApply,
    isDisabled = false
}:{
    selected:string,
    onApply:(value:string)=>void
    isDisabled:boolean
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    const [isOpen, setIsOpen] = useState(false)
    
    const colors = useMemo(()=>{
        return([
            {id:'black', color:'var(--clr-dark)', border:'var(--clr-grey-300)', value:'#000000'},
            {id:'white', color:'var(--clr-light)', border:'var(--clr-grey-300)', value:'#FFFFFF'},
            {id:'rose', border:'var(--clr-rose-700)', color:'#F46580',value:'#F46580'},
            {id:'red', border:'var(--clr-red-700)', color:'#D94D44',value:'#D94D44'},
            {id:'orange', border:'var(--clr-orange-700)', color:'#F46B0C',value:'#F46B0C'},
            {id:'yellow', border:'var(--clr-yellow-700)', color:'#C89D0E',value:'#C89D0E'},
            {id:'lime', border:'var(--clr-lime-700)', color:'#6B982C',value:'#6B982C'},
            {id:'green', border:'var(--clr-green-700)', color:'#13A04D',value:'#13A04D'},
            {id:'emerald', border:'var(--clr-emerald-700)', color:'#09976A',value:'#09976A'},
            {id:'teal', border:'var(--clr-teal-700)', color:'#2E96BA',value:'#2E96BA'},
            {id:'blue', border:'var(--clr-blue-700)', color:'#247BF4',value:'#247BF4'},
            {id:'purple', border:'var(--clr-purple-700)', color:'#8171D5',value:'#8171D5'},
            {id:'magenta', border:'var(--clr-magenta-700)', color:'#C6559C',value:'#C6559C'},
            {id:'grey', border:'var(--clr-grey-700)', color:'#758195',value:'#758195'},
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
    
    return(
        <>
            {
                (screenSize==='mobile')?(
                    <>
                        <IconButton 
                            icon={
                                <div
                                    style={{
                                        height:"13px",
                                        width:'13px',
                                        borderRadius:'16px',
                                        border:'1px solid var(--clr-grey-700)', 
                                        background:(selected==='transparent')?(
                                            'repeating-conic-gradient(var(--clr-border) 0 25%, #0000 0 50%) 50% / 10px 10px'
                                        ):(
                                            selected
                                        ),
                                    }}
                                >
                                </div>
                            }
                            txtLabel={'Text Color'}
                            appearance="subtle"
                            onClick={()=>{setIsOpen(true)}}
                            isSelected={isOpen}
                            isDisabled={isDisabled}
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
                                                    height:"13px",
                                                    width:'13px',
                                                    borderRadius:'16px',
                                                    border:'1px solid var(--clr-grey-700)', 
                                                    background:(selected==='transparent')?(
                                                        'repeating-conic-gradient(var(--clr-border) 0 25%, #0000 0 50%) 50% / 10px 10px'
                                                    ):(
                                                        selected
                                                    ),
                                                }}
                                            >
                                            </div>
                                        }
                                        txtLabel={'Text Color'}
                                        appearance="subtle"
                                        isSelected={isDropdownOpen}
                                        isDisabled={isDisabled}
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

export default FormatTextColorModule