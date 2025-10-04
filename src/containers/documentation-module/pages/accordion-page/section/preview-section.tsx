import { useState } from "react"
import Accordion from "src/components/ui/accordion"
import AccordionGroup from "src/components/ui/accordion-group"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{
    const [listAccordionOpen, setListAccordionOpen] = useState<string[]>(['1'])

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
                <AccordionGroup
                    listOpen={listAccordionOpen}
                    setListOpen={setListAccordionOpen}
                >
                    <Accordion id='1' txtLabel='Heading One'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sapiente accusamus necessitatibus ratione tempora, magnam harum repudiandae aperiam similique, itaque, incidunt fuga molestias repellat praesentium molestiae veritatis amet illo minus?</p>
                    </Accordion>
                    <Accordion id='2' txtLabel='Heading Two'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sapiente accusamus necessitatibus ratione tempora, magnam harum repudiandae aperiam similique, itaque, incidunt fuga molestias repellat praesentium molestiae veritatis amet illo minus?</p>
                    </Accordion>
                    <Accordion id='3' txtLabel='Heading Three'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sapiente accusamus necessitatibus ratione tempora, magnam harum repudiandae aperiam similique, itaque, incidunt fuga molestias repellat praesentium molestiae veritatis amet illo minus?</p>
                    </Accordion>
                </AccordionGroup>
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
import Accordion from "src/components/ui/accordion"
import AccordionGroup from "src/components/ui/accordion-group"

const AccordionDemo = () =>{

    const [listAccordionOpen, setListAccordionOpen] = useState<string[]>(['1'])

    return(
        <AccordionGroup
            listOpen={listAccordionOpen}
            setListOpen={setListAccordionOpen}
        >
            <Accordion id='1' txtLabel='Heading One'>
                <p>Lorem ipsum dolor sit amet ...</p>
            </Accordion>

            <Accordion id='2' txtLabel='Heading Two'>
                <p>Lorem ipsum dolor sit amet ...</p>
            </Accordion>

            <Accordion id='3' txtLabel='Heading Three'>
                <p>Lorem ipsum dolor sit amet ...</p>
            </Accordion>
        </AccordionGroup>
    )
}`