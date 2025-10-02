import { useContext, useEffect } from 'react'
import './styles.scss'
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context'
import IconButton from 'src/components/ui/icon-button'
import { PiArrowRightBold } from 'react-icons/pi'
import { useNavigate } from 'react-router'
import { baseUrl } from '../../constant'
import { useDocModule } from '../..'
import { sections } from './constant'



const GetStartedPage = () =>{
    const navigate = useNavigate()
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    const {
        setSectionList,
        setSectionRef
    } = useDocModule()


    useEffect(() => {
        setSectionList(sections)
    }, [])

    return(
        <div
            style={{
                display:'grid',
                gap:'var(--space-400)'
            }}
        >
            <div
                id="introduction"
                ref={setSectionRef('introduction')} 
                style={{
                    display:'grid',
                    gap:'var(--space-100)'
                }}
            >
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <p className="text-title-xl">Introduction</p>
                    <div style={{display:'flex', gap:'var(--space-25)'}}>
                        <IconButton
                            icon={<PiArrowRightBold className="global-icon"/>}
                            txtLabel="to Components"
                            onClick={()=>{navigate(`${baseUrl}/components`)}}
                        />
                    </div>
                </div>
                <p className="text-sub">Another Scalable Design And Stuff, Components</p>
                <p>ASDASC is my personal exploration into building React components the way I think they should work. It's not about reinventing the wheel, but it's about understanding how the wheel is made and building one that fits my specific needs and preferences. This React component collection built from years of front-end development experience and my journey of learning how to create my own components from scratch.</p>
            </div>
            <div 
                id="features" 
                ref={setSectionRef('features')}
            >
                <p className="text-title-xl">Features</p>
                
            </div>
            <div
                id="features_1" 
                ref={setSectionRef('features_1')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">🎨 Flexible Theming</p>
                <div style={{display:'grid', gap:'var(--space-100)', gridTemplateColumns:screenSize!=='laptop'?'1fr':'1fr 1fr'}}>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Light and dark modes</p>
                        <p className="text-sub">And everything in between</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Color-tone based themes</p>
                        <p className="text-sub">Life is not just black and white, but filled with colors</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Plenty of colors to choose from</p>
                        <p className="text-sub">Swatches galore</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Easy to custom colors</p>
                        <p className="text-sub">Using variables for maximum flexibility</p>
                    </div>
                </div>
            </div>
            <div
                id="features_2" 
                ref={setSectionRef('features_2')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)',
                }}
            >
                <p className="text-title-lg">🔧 Multiple Design Systems To Choose From</p>
                <div style={{display:'grid', gap:'var(--space-100)', gridTemplateColumns:screenSize!=='laptop'?'1fr':'1fr 1fr'}}>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Rounded</p>
                        <p className="text-sub">For that friendly, modern feel</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Circle</p>
                        <p className="text-sub">When you want things smooth & flowing</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Square</p>
                        <p className="text-sub">Sharp, clean, and professional</p>
                    </div>
                </div>
            </div>
            <div
                id="features_3" 
                ref={setSectionRef('features_3')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)',
                }}
            >
                <p className="text-title-lg">♿ Keyboard Accessibility And Color Contrast</p>
                <div style={{display:'grid', gap:'var(--space-100)', gridTemplateColumns:screenSize!=='laptop'?'1fr':'1fr 1fr'}}>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Keyboard navigation</p>
                        <p className="text-sub">Tab through everything like a pro</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Color contrast compliance</p>
                        <p className="text-sub">Text that's actually readable</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Focus management</p>
                        <p className="text-sub">Visual indicators that make sense</p>
                    </div>
                </div>
            </div>
            <div
                id="features_4" 
                ref={setSectionRef('features_4')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)',
                }}
            >
                <p className="text-title-lg">🧩 Developer Experience</p>
                <div style={{display:'grid', gap:'var(--space-100)', gridTemplateColumns:screenSize!=='laptop'?'1fr':'1fr 1fr'}}>
                    <div className='feature-box global-radius'>
                        <p className="text-title">TypeScript support</p>
                        <p className="text-sub">Because we're not animals</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Customizable components</p>
                        <p className="text-sub">Tweak everything</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className="text-title">Modular and atomic architecture</p>
                        <p className="text-sub">Components built from small things to complete components</p>
                    </div>
                </div>
            </div>
            <div
                id="why" 
                ref={setSectionRef('why')}
                style={{
                    display:'grid',
                    gap:'var(--space-100)'
                }}
            >
                <p className="text-title-xl">Why Build My Own Components?</p>
                <p className="text-sub">Here's the honest answer: "I wanted to understand how to build components from the ground up"</p>
                <p>What've i learned from this journey:</p>
                <div className='feature-box global-radius'>
                    <p>Understanding component architecture and patterns</p>
                </div>
                <div className='feature-box global-radius'>
                    <p>Implementing proper theming systems</p>
                </div>
                <div className='feature-box global-radius'>
                    <p>Building accessibility into components from day one</p>
                </div>
                <div className='feature-box global-radius'>
                    <p>Creating flexible APIs that actually make sense</p>
                </div>
                <div className='feature-box global-radius'>
                    <p>Learning the intricacies of design systems</p>
                </div>
                <p>ASDASC is my attempt to apply everything I've learned about front-end development into creating components that work the way I think they should.</p>
            </div>

            <div
                id="philosophy" 
                ref={setSectionRef('philosophy')}
                style={{
                    display:'grid',
                    gap:'var(--space-100)'
                }}
            >
                <p className="text-title-xl">Philosophy</p>
                <div style={{display:'grid', gap:'var(--space-100)', gridTemplateColumns:screenSize!=='laptop'?'1fr':'1fr 1fr'}}>
                    <div className='feature-box global-radius'>
                        <p className='text-title'>Learning by building</p>
                        <p className='text-sub'>The best way to understand components is to create them</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className='text-title'>Practical implementation</p>
                        <p className='text-sub'>Every feature exists because I needed to figure out how to build it</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className='text-title'>Accessibility as education</p>
                        <p className='text-sub'>Learning to build inclusive components from the start</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className='text-title'>Personal growth</p>
                        <p className='text-sub'>Each component teaches me something new about React and design systems</p>
                    </div>
                    <div className='feature-box global-radius'>
                        <p className='text-title'>Real-world application</p>
                        <p className='text-sub'>Built while learning, tested by using</p>
                    </div>
                </div>
                <p>Keep in mind: this is my journey of learning how to build components, so expect some experimentation and iteration along the way.</p>
            </div>
        </div>
    )
}

export default GetStartedPage