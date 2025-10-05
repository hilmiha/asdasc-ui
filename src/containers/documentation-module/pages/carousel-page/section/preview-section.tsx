import Carousel from "src/components/ui/carousel"
import CarouselChild from "src/components/ui/carousel/carousel-child"
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
                <Carousel
                    isAutoRunning={true}
                    height='40vh'
                >
                    <CarouselChild>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                            <p>Page 1</p>
                        </div>
                    </CarouselChild>
                    <CarouselChild>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                            <p>Page 2</p>
                        </div>
                    </CarouselChild>
                    <CarouselChild>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                            <p>Page 3</p>
                        </div>
                    </CarouselChild>
                    <CarouselChild>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                            <p>Page 4</p>
                        </div>
                    </CarouselChild>
                </Carousel>
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


const sampleCode = `import Carousel from "src/components/ui/carousel"
import CarouselChild from "src/components/ui/carousel/carousel-child"

const CarouselDemo = () =>{

    return(
        <Carousel
            isAutoRunning={true}
            height='40vh'
        >
            <CarouselChild>
                <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                    <p>Page 1</p>
                </div>
            </CarouselChild>
            <CarouselChild>
                <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                    <p>Page 2</p>
                </div>
            </CarouselChild>
            <CarouselChild>
                <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                    <p>Page 3</p>
                </div>
            </CarouselChild>
            <CarouselChild>
                <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                    <p>Page 4</p>
                </div>
            </CarouselChild>
        </Carousel>
    )
}`