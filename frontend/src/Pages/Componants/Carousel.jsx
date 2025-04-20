import React from 'react';
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import crousel1 from "../../assets/crousel1.jfif"
import crousel2 from "../../assets/crousel2.jfif"
import crousel3 from "../../assets/crousel3.jfif"

const slides = [
    { src: crousel1, alt: "First slide", title: "First Slide", caption: "This is the first slide caption." },
    { src: crousel2, alt: "Second slide", title: "Second Slide", caption: "This is the second slide caption." },
    { src: crousel3, alt: "Third slide", title: "Third Slide", caption: "This is the third slide caption." }
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Auto scroll every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full overflow-hidden shadow-lg">
            <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full flex-shrink-0">
                        <img src={slide.src} alt={slide.alt} className="w-full lg:h-[70vh] md:h-[450px] h-[230px] object-cover" />
                        <div className="absolute lg:bottom-12 md:bottom-8 bottom-5 left-0 right-0 text-center bg-transperent bg-opacity-50 p-4">
                            <h5 className="text-white text-lg font-bold">{slide.title}</h5>
                            <p className="text-white text-sm">{slide.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700">
                <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700">
                <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-500"}`}></button>
                ))}
            </div>
        </div>
    );
}

export default Carousel;