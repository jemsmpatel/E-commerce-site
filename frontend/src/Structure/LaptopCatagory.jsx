import React from 'react';
import { useState } from "react";
import { Link } from 'react-router';

const LaptopCatagory = () => {

    const [openDropdown, setOpenDropdown] = useState(null);
    const categories = [
        {
            title: "Men ▾",
            subcategories: [
                { header: "Top Wear", items: ["All Top Wear", "T-Shirts", "Shirts"] },
                { header: "Bottom Wear", items: ["Track Pants", "Jeans", "Trousers"] },
                { header: "Men Accessories", items: ["All Men Accessories", "Watches", "Belts", "Wallets", "Jeweller", "Sunglasses", "Bags"] },
                { header: "Men Footwear", items: ["Casual Shoes", "Sports Shoes", "Sandals", "Formal Shoes"] },
                { header: "Ethnic Wear", items: ["Men Kurtas", "Ethnic Jackets"] },
                { header: "Inner & Sleep Wear", items: ["All Inner & Sleep Wear", "Vests"] },
            ],
        },
        {
            title: "Women ▾",
            subcategories: [
                { header: "Top Wear", items: ["All Tops", "Dresses", "Sweaters"] },
                { header: "Bottom Wear", items: ["Jeans", "Jeggings", "Palazzos", "Shorts", "Skirts"] },
                { header: "inner Wear", items: ["Bra", "Briefs"] },
                { header: "sleep Wear", items: ["Nightsuits", "Babydolls"] },
            ],
        },
        {
            title: "Women Ethnic ▾",
            subcategories: [
                { header: "Sarees", items: ["All Sarees", "Silk Sarees", "Cotton Silk Sarees", "Cotton Sarees", "Georgette Sarees", "Chiffon Sarees", "Satin Sarees", "Embroidered Sarees"] },
                { header: "Kurtis", items: ["All Kurtis", "Anarkali Kurtis", "Rayon Kurtis", "Cotton Kurtis", "Embroidered Kurtis"] },
                { header: "Kurta Sets", items: ["All Kurta Sets"] },
                { header: "Suits & Dress Material", items: ["All Suits & Dress Material", "Cotton Suits", "Embroidered Suits", "Chanderi Suits"] },
                { header: "Other Ethnic", items: ["Blouses", "Dupattas", "Lehanga", "Gown", "Ethnic Bottomwear"] },
            ],
        },
        {
            title: "Kids ▾",
            subcategories: [
                { header: "Boys & Girls 2+ Years", items: ["Dresses"] },
                { header: "Infant 0-2 Years", items: ["Rompers"] },
                { header: "Toys & Accessories", items: ["Soft Toys", "Footwear", "Stationery", "Watches", "Bags & Backpacks"] },
                { header: "Baby Care", items: ["All Baby Care"] },
            ],
        },
        {
            title: "Electronics ▾",
            subcategories: [
                { header: "Mobile & Accessories", items: ["All Mobile & Accessories", "Smartwatches", "Mobile Holders", "Mobile cases and covers"] },
                { header: "Appliances", items: ["All Appliances", "Grooming", "Home Appliances"] },
            ],
        },
        {
            title: "Jewellery ▾",
            subcategories: [
                { header: "Jewellery", items: ["Jewellery Set", "Earrings", "Mangalsutras", "Studs", "Bangles", "Necklaces", "Rings", "Anklets"] },
                { header: "Women Accessory", items: ["Bags", "Watches", "Hair Accessories", "Sunglasses", "Socks"] },
            ],
        },
        {
            title: "Home & Kitchen ▾",
            subcategories: [
                { header: "Home Furnishing", items: ["Bedsheets", "Doormats", "Curtains & Sheers", "Cushions & Cushion Covers", "Mattress Protectors"] },
                { header: "Home Decor", items: ["All Home Decor", "Stickers", "Clocks", "Showpieces"] },
                { header: "Kitchen & Dining", items: ["Kitchen Storage", "Cookware & Bakeware"] },
            ],
        },
    ];

    return (
        <ul className="flex justify-evenly w-full border-b h-[40px]">
            {categories.map((category, index) => (
                <div key={index} className='h-full'>
                    <button
                        className={`px-4 border h-full rounded-md border-transparent hover:border-black hover:rounded
                                ${openDropdown === index ? "bg-gray-500 text-white" : ""}
                            `}
                        onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    >
                        {category.title}
                    </button>
                    {openDropdown === index && (
                        <ul className={`bg-white border rounded-md w-auto lg:flex absolute z-10
                                ${index === 6 ? `right-14` : ""}`
                        }>
                            {category.subcategories.map((sub, subIndex) => (
                                <li key={subIndex} className="p-2 border-b lg:border-b-0">
                                    <div className="font-semibold text-gray-600">{sub.header}</div>
                                    <ul className="mt-1">
                                        {sub.items.map((item, itemIndex) => (
                                            <li key={itemIndex}>
                                                <Link to={`/search/${category.title.slice(0, -2)} ${item}`} onClick={() => setOpenDropdown(null)} className="block p-2 hover:bg-gray-100">
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </ul>
    )
}

export default LaptopCatagory;