import { addDays } from "date-fns"
import { useState } from "react"
import Calendar, { type validCalendarValue } from "src/components/ui/calendar"
import InputCode from "src/components/ui/input-code"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    const [value, setValue] = useState< validCalendarValue >(undefined)
    const [valueDtTm, setValueDtTm] = useState< validCalendarValue >(undefined)
    const [valueDtMultiple, setValueDtMultiple] = useState< validCalendarValue >(undefined)
    const [valueDtRange, setValueDtRange] = useState< validCalendarValue >(undefined)
    
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
                <p className="text-title-lg">Single selection with time</p>
                <p>Single selection type of the calendar can also comes with input time.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Calendar
                                type='single-with-time'
                                value={valueDtTm}
                                onChange={setValueDtTm}
                            />
                        </div>
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
                <p className="text-title-lg">Multiple dates</p>
                <p>To allow selecting multiple datse, use type <span className="text-code">"multiple"</span> for the <span className="text-code">"Calendar"</span></p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Calendar
                                type='multiple'
                                value={valueDtMultiple}
                                onChange={setValueDtMultiple}
                            />
                        </div>
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
            <div
                id="example_3" 
                ref={setSectionRef('example_3')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Range dates</p>
                <p>To selcting date in a range, use type <span className="text-code">"range"</span> for the <span className="text-code">"Calendar"</span></p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Calendar
                                type='range'
                                value={valueDtRange}
                                onChange={setValueDtRange}
                            />
                        </div>
                    </PreviewBox>
                    <InputCode
                        lang="tsx"
                        isDisabled={true}
                        value={example_3_code}
                        style={{
                            inputCode:{
                                maxHeight:'50vh'
                            }
                        }}
                    />
                </div>
            </div>
            <div
                id="example_4" 
                ref={setSectionRef('example_4')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Disabling dates</p>
                <p>Dates can be disabled by providing array of dates or range of dates inside <span className="text-code">disabledDates</span> prop.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Calendar
                                type='single'
                                value={value}
                                onChange={setValue}
                                disabledDates={[
                                    {from:addDays(new Date(), 1), to:addDays(new Date(), 7)}
                                ]}
                            />
                        </div>
                    </PreviewBox>
                    <InputCode
                        lang="tsx"
                        isDisabled={true}
                        value={example_4_code}
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

const example_1_code = `<Calendar
    type='single-with-time'
    value={value}
    onChange={setValue}
/>`

const example_2_code = `<Calendar
    type='multiple'
    value={value}
    onChange={setValue}
/>`

const example_3_code = `<Calendar
    type='range'
    value={value}
    onChange={setValue}
/>`

const example_4_code = `<Calendar
    type='single'
    value={value}
    onChange={setValue}
    disabledDates={[
        {from:addDays(new Date(), 1), to:addDays(new Date(), 7)}
    ]}
/>`