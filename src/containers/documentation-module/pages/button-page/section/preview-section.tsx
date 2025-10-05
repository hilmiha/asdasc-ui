import Button from "src/components/ui/button"
import InputCode from "src/components/ui/input-code"
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
                <div style={{display:"flex", justifyContent:'center'}}>
                    <Button 
                        txtLabel={'Button'}
                        onClick={()=>{alert("Button Clicked");}}
                    />
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


const sampleCode = `import Button from "src/components/ui/button"

const ButtonDemo = () =>{

    return(
        <Button 
            txtLabel={'Button'}
            onClick={()=>{alert("Button Clicked");}}
        />
    )
}`