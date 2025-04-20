import React from 'react';
import image from '../assets/1..png';
import youtube from '../assets/youtube.svg';
import linkedin from '../assets/linkedin.svg';
import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';

const Footer = () => {
    return (
        <footer className="bg-gray-200 border-t border-gray-700 min-h-[334px] py-[48px]">
            <div className="container lg:mx-[100px] py-[48px] px-4 h-full w-auto">
                <div className="flex flex-col md:flex-row h-full items-center w-auto justify-between">
                    {/* Left: Logo */}
                    <div className="w-1/2 mb-3 md:mb-0 h-[140px] w-[200px] ">
                        <img src={image} alt="Logo" className="" />
                    </div>

                    {/* Right: Social Media and Text */}
                    <div className="text-center md:text-right">
                        <div className="flex justify-center md:justify-end space-x-4 mb-2">
                            <a href="https://facebook.com">
                                <img
                                    src={youtube}
                                    alt="YouTube"
                                    className="h-12 m-3 w-12 hover:opacity-80 transition"
                                />
                            </a>
                            <a href="https://twitter.com">
                                <img
                                    src={linkedin}
                                    alt="LinkedIn"
                                    className="h-12 m-3 w-12 hover:opacity-80 transition"
                                />
                            </a>
                            <a href="https://facebook.com">
                                <img
                                    src={facebook}
                                    alt="Facebook"
                                    className="h-12 m-3 w-12 hover:opacity-80 transition"
                                />
                            </a>
                            <a href="https://instagram.com">
                                <img
                                    src={instagram}
                                    alt="Instagram"
                                    className="h-12 m-3 w-12 hover:opacity-80 transition"
                                />
                            </a>
                        </div>
                        <p className="text-gray-700">
                            Connect with us on social media for updates and more.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;