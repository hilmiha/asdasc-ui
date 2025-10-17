import InputCode from "src/components/ui/input-code"
import Resizable from "src/components/ui/resizable"
import ResizableHandle from "src/components/ui/resizable/resizable-handle"
import ResizablePanel from "src/components/ui/resizable/resizable-panel"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    return(
        <>
            <div 
                id="example" 
                ref={setSectionRef('example')}
            >
                <p className="text-title-xl">Example</p>
            </div>
            <div
                id="example_1" 
                ref={setSectionRef('example_1')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Vertical layout</p>
                <p><span className="text-code">Resizable</span> with vertical layout.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <Resizable direction="vertical" minHeight={'320px'}>
                            <ResizablePanel>
                                <div style={{padding:'var(--space-250)'}}>
                                    <p>Panel 1</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla error esse magnam at nobis, facilis sequi provident similique neque perferendis hic minima, quidem dignissimos rem velit possimus dolorem. Inventore, nulla.</p>
                                    <p>...</p>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle direction="vertical"/>
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
                        value={example_1_code}
                        style={{
                            inputCode:{
                                maxHeight:'50vh'
                            }
                        }}
                    />
                </div>
            </div>
            <div
                id="example_2" 
                ref={setSectionRef('example_2')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Nested groups</p>
                <p>Nested of <span className="text-code">Resizable</span>.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <Resizable direction="horizontal" minHeight={"400px"} maxHeight={'400px'}>
                            <ResizablePanel>
                                <div style={{padding:'var(--space-250)'}}>
                                    <p>Panel 1</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla error esse magnam at nobis, facilis sequi provident similique neque perferendis hic minima, quidem dignissimos rem velit possimus dolorem. Inventore, nulla.</p>
                                    <p>...</p>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle direction="horizontal"/>
                            <ResizablePanel>
                                <Resizable direction="vertical">
                                    <ResizablePanel>
                                        <div style={{padding:'var(--space-250)'}}>
                                            <p>Panel 2</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla error esse magnam at nobis, facilis sequi provident similique neque perferendis hic minima, quidem dignissimos rem velit possimus dolorem. Inventore, nulla.</p>
                                            <p>...</p>
                                        </div>
                                    </ResizablePanel>
                                    <ResizableHandle direction="vertical"/>
                                    <ResizablePanel>
                                        <div style={{padding:'var(--space-250)'}}>
                                            <p>Panel 3</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla error esse magnam at nobis, facilis sequi provident similique neque perferendis hic minima, quidem dignissimos rem velit possimus dolorem. Inventore, nulla.</p>
                                            <p>...</p>
                                        </div>
                                    </ResizablePanel>
                                </Resizable>
                            </ResizablePanel>
                        </Resizable>
                    </PreviewBox>
                    <InputCode
                        lang="tsx"
                        isDisabled={true}
                        value={example_2_code}
                        style={{
                            inputCode:{
                                maxHeight:'50vh'
                            }
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default ExampleSection

const example_1_code = `<Resizable direction="vertical" minHeight={'320px'}>
    <ResizablePanel>
        <div style={{padding:'var(--space-250)'}}>
            <p>Panel 1</p>
            <p>Lorem ipsum dolor sit amet...</p>
        </div>
    </ResizablePanel>
    <ResizableHandle direction="vertical"/>
    <ResizablePanel>
        <div style={{padding:'var(--space-250)'}}>
            <p>Panel 2</p>
            <p>Lorem ipsum dolor sit amet...</p>
        </div>
    </ResizablePanel>
</Resizable>`

const example_2_code = `<Resizable direction="horizontal" minHeight={"400px"} maxHeight={'400px'}>
    <ResizablePanel>
        <div style={{padding:'var(--space-250)'}}>
            <p>Panel 1</p>
            <p>Lorem ipsum dolor sit amet...</p>
        </div>
    </ResizablePanel>
    <ResizableHandle direction="horizontal"/>
    <ResizablePanel>
        <Resizable direction="vertical">
            <ResizablePanel>
                <div style={{padding:'var(--space-250)'}}>
                    <p>Panel 2</p>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
            </ResizablePanel>
            <ResizableHandle direction="vertical"/>
            <ResizablePanel>
                <div style={{padding:'var(--space-250)'}}>
                    <p>Panel 3</p>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
            </ResizablePanel>
        </Resizable>
    </ResizablePanel>
</Resizable>`