import InputCode from "src/components/ui/input-code"
import Spinner from "src/components/ui/spinner"
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
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'var(--space-500)'}}>
                    <Spinner/>
                    <Spinner size="medium"/>
                    <Spinner size="large"/>
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


const sampleCode = `import Skeleton from "src/components/ui/skeleton"

const SkeletonDemo = () =>{
    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'var(--space-500)'}}>
            <Spinner/>
            <Spinner size="medium"/>
            <Spinner size="large"/>
        </div>
    )
}`