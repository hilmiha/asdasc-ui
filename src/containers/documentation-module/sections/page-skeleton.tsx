import Skeleton from "src/components/ui/skeleton"

const PageSkeleton = () =>{
    return(
        <div
            style={{
                display:'grid',
                gap:'var(--space-400)'
            }}
        >
            <div
                style={{
                    display:'grid',
                    gap:'var(--space-100)',
                    alignItems:'center'
                }}
            >
                <div style={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>
                    <Skeleton height={32} width={'30vw'}/>
                    <Skeleton height={32} width={'10vw'}/>
                </div>
            </div>
            <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton width={'40vw'}/>
            </div>
            <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton width={'40vw'}/>
            </div>
            <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton width={'40vw'}/>
            </div>
        </div>
    )
}

export default PageSkeleton