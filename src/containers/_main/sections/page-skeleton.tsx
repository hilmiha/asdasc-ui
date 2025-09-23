import Spinner from "src/components/ui/spinner"

const PageSkeleton = () =>{
    return(
        <div
            style={{
                display:'grid',
                justifyContent:'center',
                alignItems:'center',
                height:'89vh',
                gap:'var(--space-400)'
            }}
        >
            <Spinner size="large"/>
        </div>
    )
}

export default PageSkeleton