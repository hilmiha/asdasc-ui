import { useState } from "react"
import { PiStarFourBold } from "react-icons/pi"
import Accordion from "src/components/ui/accordion"
import AccordionGroup from "src/components/ui/accordion-group"
import InputCode from "src/components/ui/input-code"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    const [listAccordionOpen, setListAccordionOpen] = useState<string[]>(['1', '2', '3'])
    const [isOpen, setIsOpen] = useState(true);

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
                <p className="text-title-lg">Allow multiple items open at the same time</p>
                <p>Set <span className="text-code">isAllowMultipleOpen</span> to <span className="text-code">true</span> to enable opening multiple items at once.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <AccordionGroup
                            listOpen={listAccordionOpen}
                            setListOpen={setListAccordionOpen}
                            isAllowMultipleOpen={true}
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Accordion</span> as individual component</p>
                <p><span className="text-code">Accordion</span> can be use outside of <span className="text-code">AccordionGroup</span> if needed</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <Accordion 
                            id='1' 
                            txtLabel='Heading' 
                            iconBefore={<PiStarFourBold className="global-icon"/>}
                            isOpen={isOpen} 
                            onClickTrigger={()=>{setIsOpen(!isOpen)}}
                        >
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sapiente accusamus necessitatibus ratione tempora, magnam harum repudiandae aperiam similique, itaque, incidunt fuga molestias repellat praesentium molestiae veritatis amet illo minus?</p>
                        </Accordion>
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



const example_1_code = `<AccordionGroup
    listOpen={listAccordionOpen}
    setListOpen={setListAccordionOpen}
    isAllowMultipleOpen={true} //to enable opening multiple items at once.
>
    ...
</AccordionGroup>`

const example_2_code = `<Accordion 
    id='1' 
    txtLabel='Heading' 
    iconBefore={<PiStarFourBold className="global-icon"/>}
    isOpen={isOpen} 
    onClickTrigger={()=>{setIsOpen(!isOpen)}}
>
    <p>Lorem ipsum dolor sit amet ...</p>
</Accordion>`