import InputCode from "src/components/ui/input-code"
import Tooltip from "src/components/ui/tooltip"
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
                <div style={{display:'flex', justifyContent:'center', gap:'var(--space-500)'}}>
                    <Tooltip
                        content={"Hi👋 Im have a tooltip"}
                    >
                        <span>Hover me first!</span>
                    </Tooltip>
                    <Tooltip
                        content={"Hi👋 Im also have a tooltip"}
                        placement="bottom"
                    >
                        <span>Hover me next!</span>
                    </Tooltip>

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