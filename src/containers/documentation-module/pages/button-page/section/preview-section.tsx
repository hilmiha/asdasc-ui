import { useState } from "react"
import Button from "src/components/ui/button"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{
    const [count, setCount] = useState(0)
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
                <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                    <div style={{display:"flex",  justifyContent:'center'}}>
                        <Button 
                            txtLabel={'Button'}
                            onClick={()=>{setCount(count+1)}}
                        />
                    </div>
                    <p style={{textAlign:'center'}}>{`Count: ${count}`}</p>
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


const sampleCode = `import { useState } from "react"
import Button from "src/components/ui/button"

const ButtonDemo = () =>{

    const [count, setCount] = useState(0)

    return(
        <>
            <Button 
                txtLabel={'Button'}
                onClick={()=>{setCount(count+1)}}
            />
            <p style={{textAlign:'center'}}>{\`Count: \${count}\`}</p>
        </>
    )
}`