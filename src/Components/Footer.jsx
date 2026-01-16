import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Icon
import { FaFacebookF } from "react-icons/fa6";
import { FiTwitter } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io5";
import { RiLinkedinFill } from "react-icons/ri";
import { BsQrCode } from "react-icons/bs";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Add your subscribe logic here
        console.log('Subscribed with:', email);
        setEmail('');
    };

    return (
        <>
            <footer className='bg-gradient-to-b from-gray-900 to-black relative overflow-hidden'>
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden opacity-5">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Main Footer Content */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 text-white py-16 md:py-20'>
                        
                        {/* Exclusive/Subscribe Section */}
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'>
                                Exclusive
                            </h1>
                            <h3 className='text-xl font-semibold'>Subscribe</h3>
                            <p className='text-gray-400 text-sm'>Get 10% off your first order</p>
                            <form onSubmit={handleSubscribe} className='mt-2'>
                                <div className='relative group'>
                                    <input 
                                        className='w-full outline-none py-3 px-4 pr-12 bg-white bg-opacity-10 backdrop-blur-sm border-2 border-gray-700 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:border-yellow-500 focus:bg-opacity-20' 
                                        type="email" 
                                        placeholder='Enter your email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button 
                                        type="submit"
                                        className='absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-md hover:scale-110 transition-transform duration-300'
                                    >
                                        <IoSend className='text-black text-lg' />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Support Section */}
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-2xl font-bold mb-2'>Support</h1>
                            <p className='text-gray-400 text-sm leading-relaxed hover:text-white transition-colors duration-300 cursor-pointer'>
                                111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh
                            </p>
                            <a href="mailto:exclusive@gmail.com" className='text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-300'>
                                exclusive@gmail.com
                            </a>
                            <a href="tel:+8801959948542" className='text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-300'>
                                +880195-9948542
                            </a>
                        </div>

                        {/* Account Section */}
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-2xl font-bold mb-2'>Account</h1>
                            <Link to="/account" className='text-gray-400 text-sm hover:text-yellow-400 hover:translate-x-2 transition-all duration-300'>
                                My Account
                            </Link>
                            <Link to="/signUp" className='text-gray-400 text-sm hover:text-yellow-400 hover:translate-x-2 transition-all duration-300'>
                                Login / Register
                            </Link>
                            <Link to="/cart" className='text-gray-400 text-sm hover:text-yellow-400 hover:translate-x-2 transition-all duration-300'>
                                Cart
                            </Link>
                            <Link to="/wishList" className='text-gray-400 text-sm hover:text-yellow-400 hover:translate-x-2 transition-all duration-300'>
                                Wishlist
                            </Link>
                            <Link to="/shop" className='text-gray-400 text-sm hover:text-yellow-400 hover:translate-x-2 transition-all duration-300'>
                                Shop
                            </Link>
                        </div>

                        {/* Quick Link Section */}
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-2xl font-bold mb-2'>Quick Link</h1>
                            <Link to="/privacy" className='text-gray-400 text-sm hover:text-yellow-400 hover:translate-x-2 transition-all duration-300'>
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className='text-gray-400 text-sm hover:text-yellow-400 hover:translate-x-2 transition-all duration-300'>
                                Terms Of Use
                            </Link>
                            <Link to="/faq" className='text-gray-400 text-sm hover:text-yellow-400 hover:translate-x-2 transition-all duration-300'>
                                FAQ
                            </Link>
                            <Link to="/contact" className='text-gray-400 text-sm hover:text-yellow-400 hover:translate-x-2 transition-all duration-300'>
                                Contact
                            </Link>
                        </div>

                        {/* Download App Section */}
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-2xl font-bold mb-2'>Download App</h1>
                            <p className='text-gray-400 text-xs'>Save $3 with App New User Only</p>
                            
                            <div className='flex items-center gap-3'>
                                <div className='bg-white p-2 rounded-lg'>
                                    <BsQrCode className='text-black text-5xl' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <a 
                                        href="#" 
                                        className='flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 hover:bg-opacity-20 hover:border-yellow-500 transition-all duration-300 group'
                                    >
                                        <IoLogoGooglePlaystore className='text-green-500 text-2xl group-hover:scale-110 transition-transform duration-300' />
                                        <div>
                                            <p className='text-[9px] text-gray-400'>Get It On</p>
                                            <p className='text-xs font-bold'>Google Play</p>
                                        </div>
                                    </a>
                                    <a 
                                        href="#" 
                                        className='flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 hover:bg-opacity-20 hover:border-yellow-500 transition-all duration-300 group'
                                    >
                                        <FaApple className='text-white text-2xl group-hover:scale-110 transition-transform duration-300' />
                                        <div>
                                            <p className='text-[9px] text-gray-400'>Download on the</p>
                                            <p className='text-xs font-bold'>App Store</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Social Media Icons */}
                            <div className='flex items-center gap-4 mt-4'>
                                <a 
                                    href="#" 
                                    className='bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-full border border-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:border-blue-500 transition-all duration-300 hover:scale-110'
                                >
                                    <FaFacebookF className='text-lg' />
                                </a>
                                <a 
                                    href="#" 
                                    className='bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-full border border-gray-700 hover:bg-gradient-to-r hover:from-sky-400 hover:to-blue-500 hover:border-sky-400 transition-all duration-300 hover:scale-110'
                                >
                                    <FiTwitter className='text-lg' />
                                </a>
                                <a 
                                    href="#" 
                                    className='bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-full border border-gray-700 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:border-pink-500 transition-all duration-300 hover:scale-110'
                                >
                                    <IoLogoInstagram className='text-lg' />
                                </a>
                                <a 
                                    href="#" 
                                    className='bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-full border border-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:border-blue-600 transition-all duration-300 hover:scale-110'
                                >
                                    <RiLinkedinFill className='text-lg' />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Copyright Section */}
                    <div className="text-gray-400 text-center border-t border-gray-800 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className='text-sm'>
                                © {new Date().getFullYear()} Copyright Tanvir Khan. All rights reserved
                            </p>
                            <div className="flex items-center gap-6 text-sm">
                                <Link to="/privacy" className="hover:text-yellow-400 transition-colors duration-300">Privacy</Link>
                                <Link to="/terms" className="hover:text-yellow-400 transition-colors duration-300">Terms</Link>
                                <Link to="/cookies" className="hover:text-yellow-400 transition-colors duration-300">Cookies</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;