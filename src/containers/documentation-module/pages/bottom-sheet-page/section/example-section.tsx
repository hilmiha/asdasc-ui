import { useState } from "react"
import BottomSheet from "src/components/ui/bottom-sheet"
import Button from "src/components/ui/button"
import InputCode from "src/components/ui/input-code"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    const [isOpen, setIsOpen] = useState(false);

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
                <p className="text-title-lg">Disabling dismis by click outside, x close button, and Esc key</p>
                <p>Using <span className="text-code">bottomSheetFloatingConfig</span> to disabling default dismis behaviour. Give alternative way for user to dismis the <span className="text-code">BottomSheet</span> using button or other action inside the content.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <div style={{display:"flex", justifyContent:'center'}}>
                            <Button 
                                txtLabel={'Click To Open'}
                                onClick={()=>{setIsOpen(true)}}
                            />
                            <BottomSheet
                                isOpen={isOpen}
                                txtTitle="Bottom Sheet Header"
                                floatingConfig={{
                                    isDisableDismiss:true // 
                                }}
                                elementFooter={
                                    <div style={{display:"flex", justifyContent:'end', gap:'var(--space-50)'}}>
                                        <Button txtLabel={'Reject'} onClick={()=>{setIsOpen(false)}}/>
                                        <Button txtLabel={'Accept'} onClick={()=>{setIsOpen(false)}} appearance="primary"/>
                                    </div>
                                }
                            >
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                            </BottomSheet>
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
        </>
    )
}

export default ExampleSection

const example_1_code = `<Button 
    txtLabel={"Click To Open"}
    onClick={()=>{setIsOpen(true)}}
/>
<BottomSheet
    isOpen={isOpen}
    txtTitle={"Bottom Sheet Header"}
    floatingConfig={{
        isDisableDismiss:true // Disabled default dismis behaviour
    }}
    elementFooter={(
        <div style={{display:"flex", justifyContent:'end', gap:'var(--space-50)'}}>
            <Button 
                txtLabel={'Reject'} 
                onClick={()=>{setIsOpen(false)}} // Give access for user to dismis
            />
            <Button 
                txtLabel={'Accept'} 
                onClick={()=>{setIsOpen(false)}} // Give access for user to dismis
                appearance={"primary"}
            />
        </div>
    )}
>
    <p>Lorem ipsum dolor sit amet...</p>
</BottomSheet>`