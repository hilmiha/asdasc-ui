import Button from "src/components/ui/button"
import Dropdown from "src/components/ui/dropdown"
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
                    <Dropdown
                        trigger={
                            <Button 
                                txtLabel={'Show Dropdown'}
                            />
                        }
                        elementHeader={(
                            <p className="text-title-lg">Header</p>
                        )}
                        elementFooter={(
                            <div style={{display:'flex', justifyContent:'end'}}>
                                <Button txtLabel={'Button'}/>
                                <Button txtLabel={'Button'} appearance="primary"/>
                            </div>
                        )}
                    >
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, eius recusandae nam aliquid repudiandae accusantium? Dolor cupiditate autem voluptatum praesentium consectetur quisquam. Voluptates, tenetur? Maxime cum voluptatibus totam fugit natus!</p>
                    </Dropdown>
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
import Dropdown from "src/components/ui/dropdown"

const DropdownDemo = () =>{

    return(
        <Dropdown
            trigger={(
                <Button txtLabel={'Show Dropdown'}/>
            )}
            elementHeader={(
                <p className="text-title-lg">Header</p>
            )}
            elementFooter={(
                <div style={{display:'flex', justifyContent:'end'}}>
                    <Button txtLabel={'Button'}/>
                    <Button txtLabel={'Button'} appearance="primary"/>
                </div>
            )}
        >
            <p>Lorem ipsum dolor sit amet...</p>
        </Dropdown>
    )
}`