import InputCode from "src/components/ui/input-code"
import Resizable from "src/components/ui/resizable"
import ResizableHandle from "src/components/ui/resizable/resizable-handle"
import ResizablePanel from "src/components/ui/resizable/resizable-panel"
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
                <Resizable direction="horizontal">
                    <ResizablePanel>
                        <div style={{padding:'var(--space-250)'}}>
                            <p>Panel 1</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla error esse magnam at nobis, facilis sequi provident similique neque perferendis hic minima, quidem dignissimos rem velit possimus dolorem. Inventore, nulla.</p>
                            <p>...</p>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle direction="horizontal"/>
                    <ResizablePanel>
                        <div style={{padding:'var(--space-250)'}}>
                            <p>Panel 2</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla error esse magnam at nobis, facilis sequi provident similique neque perferendis hic minima, quidem dignissimos rem velit possimus dolorem. Inventore, nulla.</p>
                            <p>...</p>
                        </div>
                    </ResizablePanel>
                </Resizable>
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


const sampleCode = `import Resizable from "src/components/ui/resizable"

const ResizableDemo = () =>{

    return(
        <Resizable direction="horizontal">
            <ResizablePanel>
                <div style={{padding:'var(--space-300)'}}>
                    <p>Panel 1</p>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
            </ResizablePanel>
            <ResizableHandle direction="horizontal"/>
            <ResizablePanel>
                <div style={{padding:'var(--space-300)'}}>
                    <p>Panel 2</p>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
            </ResizablePanel>
        </Resizable>
    )
}`