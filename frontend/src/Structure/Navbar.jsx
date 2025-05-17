import React from 'react';
import image from '../assets/1..png';
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(useLocation().pathname);

    const [isOpenprofile, setIsOpenProfile] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "text-blue-500" : "text-dark";

    const [searchString, setSearchString] = useState("");


    return (
        <nav className="flex flex-col lg:flex-row px-2 pb-0 h-[76px] border-b border-gray-400">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="inline-block p-0 pb-2 mr-4 mt-2">
                    <img src={image} alt="logo" className="h-[60px] min-w-[85px] rounded-full" />
                </Link>

                {/* Navbar Links */}
                <ul
                    className={`${isOpen ? "flex flex-col absolute top-full left-0 w-full bg-gray-200 shadow-lg" : "hidden"}
                    lg:flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 lg:bg-transparent p-4 lg:p-0 w-full lg:w-auto border-b border-gray-400 pb-2`}
                >
                    <NavItem to="/" label="Home" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <NavItem to="/about" label="About Us" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <NavItem to="/contact" label="Contact Us" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <NavItem to="/download" label="Download App" activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Profile Dropdown */}
                    <li className="relative items-center justify-center flex">
                        <button
                            onClick={() => setIsOpenProfile(!isOpenprofile)}
                            className={`nav-link ${isActive("/login")} ${isActive("/profile")} ${isActive("/registration")} ${isActive("/wishlist")} dropdown-toggle px-3 py-2 text-gray-800 border border-transparent hover:border-black hover:rounded-t-md`}
                        >
                            Profile ▾
                        </button>
                        {isOpenprofile && (
                            <div className="absolute left-0 top-10 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                                <Link to="/profile" onClick={() => { setIsOpenProfile(false); setIsOpen(false); }} className="block px-4 py-2 hover:bg-gray-100">Profile View</Link>
                                <Link to="/wishlist" onClick={() => { setIsOpenProfile(false); setIsOpen(false); }} className="block px-4 py-2 hover:bg-gray-100">Wishlist</Link>
                                <Link to="/login" onClick={() => { setIsOpenProfile(false); setIsOpen(false); }} className="block px-4 py-2 hover:bg-gray-100">Sign In</Link>
                            </div>
                        )}
                    </li>

                    {/* Cart */}
                    <NavItem to="/cart" label="Cart 🛒" activeTab={activeTab} setActiveTab={setActiveTab} />
                </ul>
                {/* Search Bar */}
                <form className="flex space-x-2 w-auto lg:ml-auto mr-2" style={{ maxWidth: "300px", width: "100%", minWidth: "50px", flexShrink: 1 }}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        className="border px-2 py-1 bg-white border-gray-400 rounded flex-grow min-w-0"
                    />
                    <Link to={`/search/${searchString}`} className="bg-gray-500 text-white px-4 py-1 rounded whitespace-nowrap">
                        Search
                    </Link>
                </form>


                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 border rounded">
                    ☰
                </button>
            </div>
        </nav>
    )
}


// Reusable Nav Item Component
function NavItem({ to, label, activeTab, setActiveTab }) {
    return (
        <li className='flex items-center justify-center pb-1 flex-col'>
            <Link
                to={to}
                onClick={() => {
                    setActiveTab(to);
                    setIsOpen(false);
                }}
                className={`px-3 py-2 border border-transparent w-full text-center rounded-t-md transition-all duration-300 whitespace-nowrap ${activeTab === to
                    ? "bg-gray-500 text-white border-black"
                    : "bg-transparent text-black hover:border-black hover:rounded-t-md"
                    }`}
            >
                {label}
            </Link>
        </li>
    );
}


export default Navbar;