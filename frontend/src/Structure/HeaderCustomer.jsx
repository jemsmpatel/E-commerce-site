import React from 'react';
import MobileCategories from './MobileCategories';
import Navbar from './Navbar';
import LaptopCatagory from './LaptopCatagory';

const HeaderCustomer = () => {
    return (
        <header className="sticky z-50 top-0 bg-gray-200">
            <Navbar />
            {window.innerWidth > 840 ?
                <LaptopCatagory /> :
                <MobileCategories />
            }
        </header >
    )
}

export default HeaderCustomer;