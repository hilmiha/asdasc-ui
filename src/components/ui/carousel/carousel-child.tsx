const CarouselChild = ({
    children
}:{
    children:React.ReactNode
}) =>{
    return(
        <div className='carousel-child-box'>
            {children}
        </div>
    )
}

export default CarouselChild