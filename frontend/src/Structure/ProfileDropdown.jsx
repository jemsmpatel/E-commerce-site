import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "text-blue-500" : "text-dark";

    return (
        <li className="relative items-center justify-center flex">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`nav-link ${isActive("/login")} ${isActive("/profile")} ${isActive("/registration")} ${isActive("/wishlist")} dropdown-toggle px-3 py-2 text-gray-800 border border-transparent hover:border-black hover:rounded-t-md`}
            >
                Profile ▾
            </button>
            {isOpen && (
                <div className="absolute left-0 top-10 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile View</Link>
                    <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100">Wishlist</Link>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Sign In</Link>
                </div>
            )}
        </li>
    );
};

export default ProfileDropdown;
