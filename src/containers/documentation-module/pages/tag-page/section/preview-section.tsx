import InputCode from "src/components/ui/input-code"
import Tag from "src/components/ui/tag"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{
    return(
        <div 
            style={{
                display:'grid',
                gap:'var(--space-100)',
                marginTop:"var(--space-300)",
                alignItems:'center',
            }}
        >
            <PreviewBox>
                <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-100)', alignItems:'center'}}>
                    <p>Text Only: </p>
                    <Tag txtLabel="Tag 1"/>
                    <Tag txtLabel="Tag 2" appearance="subtle"/>
                    <Tag txtLabel="Tag 3" appearance="primary"/>
                    <Tag txtLabel="Tag 4" appearance="success"/>
                    <Tag txtLabel="Tag 5" appearance="warning"/>
                    <Tag txtLabel="Tag 6" appearance="danger"/>
                </div>
                
                <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-100)', marginTop:'var(--space-200)', alignItems:'center'}}>
                    <p>With X button: </p>
                    <Tag txtLabel="Tag 1" onClickRemove={()=>{alert('Tag 1 remove button pressed')}}/>
                    <Tag txtLabel="Tag 2" onClickRemove={()=>{alert('Tag 2 remove button pressed')}} appearance="subtle"/>
                    <Tag txtLabel="Tag 3" onClickRemove={()=>{alert('Tag 3 remove button pressed')}} appearance="primary"/>
                    <Tag txtLabel="Tag 4" onClickRemove={()=>{alert('Tag 4 remove button pressed')}} appearance="success"/>
                    <Tag txtLabel="Tag 5" onClickRemove={()=>{alert('Tag 5 remove button pressed')}} appearance="warning"/>
                    <Tag txtLabel="Tag 6" onClickRemove={()=>{alert('Tag 6 remove button pressed')}} appearance="danger"/>
                </div>
                <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-100)', marginTop:'var(--space-200)', alignItems:'center'}}>
                    <p>Clickable : </p>
                    <Tag txtLabel="Tag 1" onClick={()=>{alert('Tag 1 pressed')}}/>
                    <Tag txtLabel="Tag 2" onClick={()=>{alert('Tag 2 pressed')}}appearance="subtle"/>
                    <Tag txtLabel="Tag 3" onClick={()=>{alert('Tag 3 pressed')}}appearance="primary"/>
                    <Tag txtLabel="Tag 4" onClick={()=>{alert('Tag 4 pressed')}}appearance="success"/>
                    <Tag txtLabel="Tag 5" onClick={()=>{alert('Tag 5 pressed')}}appearance="warning"/>
                    <Tag txtLabel="Tag 6" onClick={()=>{alert('Tag 6 pressed')}}appearance="danger"/>
                </div>
                
            </PreviewBox>
            <InputCode
                lang="tsx"
                isDisabled={true}
                value={sampleCode}
                style={{
                    inputCode:{
                        maxHeight:'50vh'
                    }
                }}
            />
        </div>
    )
}

export default PreviewSection


const sampleCode = `//Documentation in progress`