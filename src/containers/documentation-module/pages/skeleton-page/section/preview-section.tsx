import InputCode from "src/components/ui/input-code"
import Skeleton from "src/components/ui/skeleton"
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
                <div>
                    <Skeleton width={'40px'} height={'40px'} shape="circle"/>
                    <Skeleton width={'60%'}/>
                    <Skeleton width={'100px'}/>
                    <Skeleton height={'320px'}/>
                    <Skeleton/>
                    <Skeleton/>
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
        <div>
            <Skeleton width={'40px'} height={'40px'} shape="circle"/>
            <Skeleton width={'60%'}/>
            <Skeleton width={'100px'}/>
            <Skeleton height={'320px'}/>
            <Skeleton/>
            <Skeleton/>
        </div>
    )
}`