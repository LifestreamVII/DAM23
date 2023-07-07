import { useRef } from 'react';
import arrow from '../assets/images/arrow.svg'

function getScrollSize(carousel) {
    const gapWidth = 20
    const slideWidth = carousel.offsetWidth - gapWidth
    const visibleSlides = Math.floor(carousel.clientWidth / slideWidth)
    return slideWidth * visibleSlides
}

export default function Carousel({children}) {
    
    const carouselWrapper = useRef(null);

    function scrollRight() {
        const carousel = carouselWrapper.current
        carousel.scrollLeft += getScrollSize(carousel)
    }

    function scrollLeft() {
        const carousel = carouselWrapper.current
        carousel.scrollLeft -= getScrollSize(carousel)
    }

    return (
        <div className="carousel container-center">
            <button className="carousel__button carousel__button--left" onClick={scrollLeft}>
                <img src={arrow} alt="" />
            </button>
            <div ref={carouselWrapper} className="carousel__wrapper">
                {children}
                {children}
                {children}
            </div>
            <button className="carousel__button carousel__button--right" onClick={scrollRight}>
                <img src={arrow} alt="" />
            </button>
        </div>
    )
}