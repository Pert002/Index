import React, { useState } from 'react';
import {Link} from "react-router-dom";
import '../styles/Carousel.css';
import arrowLeftImage from './images/arrow-left.jpg';
import arrowRightImage from './images/arrow-right.jpg';


const Slide = ({ slide }) => (
    <div className="slide">
        <Link to={`/`} >
            <h3>{slide.caption}</h3>
            <img src={slide.image} alt={slide.caption}/>
        </Link>
    </div>
);

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { id: 1, image: 'https://placekitten.com/800/400', caption: 'News 1', link: `/news/2024/1`},
        { id: 2, image: 'https://placekitten.com/800/401', caption: 'News 2', link: '/news/2024/2'},
        { id: 3, image: 'https://placekitten.com/800/402', caption: 'News 3', link: '/news/2024/3'},
    ];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    return (
        <div className="carousel-container">
            <div className="arrow-container">
                <div className="arrow-button prev-button" onClick={prevSlide}>
                    <img src={arrowLeftImage} alt="Previous" />
                </div>
                <div className="slide-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <Slide key={slide.id} slide={slide} slides={slides}/>
                    ))}
                </div>
                <div className="arrow-button next-button" onClick={nextSlide}>
                    <img src={arrowRightImage} alt="Next" />
                </div>
            </div>
        </div>
    );
};

export default Carousel;




