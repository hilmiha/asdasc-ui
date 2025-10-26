import { useState } from "react"
import { PiChatBold, PiCircleFill, PiHouseBold, PiStackBold } from "react-icons/pi"
import Button from "src/components/ui/button"
import InputCode from "src/components/ui/input-code"
import Tabs from "src/components/ui/tabs"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{

    const [selectedTab, setSelectedTab] = useState('dashboard')
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
                    <Tabs
                        selectedItem={selectedTab}
                        tabItem={[
                            {id:'dashboard', txtLabel:'Dashboard', iconBefore:(<PiHouseBold className="global-icon"/>)},
                            {id:'projects', txtLabel:'Projects', iconBefore:(<PiStackBold className="global-icon"/>), iconAfter:(<PiCircleFill color='var(--clr-primary-700)' size={8}/>)},
                            {id:'chat', txtLabel:'Chat', iconBefore:(<PiChatBold className="global-icon"/>), isDisabled:true},
                        ]}
                        onClickTabItem={(id)=>{setSelectedTab(id)}}
                        appearance="detached"
                    />
                    <div
                        className={`global-radius`}
                        style={{
                            border:'1px solid var(--clr-border)',
                            height:"200px",
                            maxHeight:"200px",
                            overflow:'auto',
                            marginTop:'var(--space-100)',
                            padding:'var(--space-200)',
                        }}
                    >
                        {
                            (selectedTab==='dashboard')&&(
                                <>
                                    <h1>Dashboard</h1>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    </p>
                                </>
                            )
                        }
                        {
                            (selectedTab==='projects')&&(
                                <>
                                    <h1>Projects</h1>
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.</p>
                                    <div style={{display:'flex', marginTop:"var(--space-400)"}}>
                                        <Button
                                            txtLabel={'Hello'}
                                            appearance='primary'
                                        />
                                    </div>
                                </>
                            )
                        }
                    </div>
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


const sampleCode = `//Documentation in progress`