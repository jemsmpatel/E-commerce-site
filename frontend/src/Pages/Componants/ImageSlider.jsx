import React, { useEffect, useState } from "react";

const ImageSlider = ({ images, alt }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000); // change every 3 seconds

        return () => clearInterval(interval); // cleanup on unmount
    }, [images.length]);

    return (
        <div className="w-[250px] h-[300px] flex justify-center rounded-xl shadow-md">
            <img
                src={images[current]}
                alt={alt}
                className="object-cover h-full transition-all duration-700"
            />
        </div>
    );
};

export default ImageSlider;
