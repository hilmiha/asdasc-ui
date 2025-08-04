export const onClickAccordion = (
    id?:string,
    listOpen?:string[],
    setListOpen?:React.Dispatch<React.SetStateAction<string[]>>,
    isAllowMultipleOpen?:boolean
) =>{
    if(!id || !listOpen || !setListOpen){
        return
    }
    if(listOpen.includes(id)){
        if(!isAllowMultipleOpen){
            setListOpen([])
        }else{
            setListOpen((prev)=>{
                const tamp = [...prev].filter(itm=>itm!==id)
                return tamp
            })
        }
    }else{
        if(!isAllowMultipleOpen){
            setListOpen([id])
        }else{
            setListOpen((prev)=>{
                const tamp = [...prev]
                tamp.push(id)
                return tamp
            })
        }
    }
}