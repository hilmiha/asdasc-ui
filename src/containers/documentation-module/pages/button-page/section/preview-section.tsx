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
                <Button 
                    txtLabel={'Click Here'}
                    onClick={()=>{alert("Button Clicked");}}
                />
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

const BottomSheetDemo = () =>{

    return(
        <Button 
            txtLabel={'Click Here'}
            onClick={()=>{alert("Button Clicked");}}
        />
    )
}`