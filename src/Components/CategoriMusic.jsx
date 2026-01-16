import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Icons
import { BsMusicNoteBeamed } from "react-icons/bs";
import { IoVolumeMediumSharp } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";

// Img
import jblMusic from "/src/assets/JBL_BOOMBOX.png";

const CategoryMusic = () => {
    // Real countdown timer
    const [timeLeft, setTimeLeft] = useState({
        days: 5,
        hours: 23,
        minutes: 59,
        seconds: 35
    });

    // Countdown logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                let { days, hours, minutes, seconds } = prevTime;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else if (days > 0) {
                    days--;
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <section className='relative overflow-hidden my-12 md:my-16'>
                {/* Full-width container without container class */}
                <div className='w-full px-4 md:px-6 lg:px-8'>
                    <div className='relative bg-gradient-to-r from-black via-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl'>
                        {/* Background Pattern */}
                        <div className='absolute inset-0 opacity-10'>
                            <div className='absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl'></div>
                            <div className='absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full blur-3xl'></div>
                        </div>

                        {/* Animated Sound Waves */}
                        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                            <div className='absolute top-1/4 left-10 w-32 h-32 border-4 border-green-500 rounded-full opacity-20 animate-ping'></div>
                            <div className='absolute bottom-1/4 right-10 w-40 h-40 border-4 border-green-400 rounded-full opacity-20 animate-ping animation-delay-1000'></div>
                            <div className='absolute top-1/2 left-1/3 w-24 h-24 border-4 border-green-600 rounded-full opacity-20 animate-ping animation-delay-2000'></div>
                        </div>

                        {/* Content Grid */}
                        <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 md:p-12 lg:p-16 min-h-[500px]'>
                            
                            {/* Left Content */}
                            <div className='text-white space-y-6 z-10'>
                                {/* Category Badge */}
                                <div className='inline-flex items-center gap-2 bg-green-500 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500 border-opacity-30'>
                                    <BsMusicNoteBeamed className='text-green-400 text-lg' />
                                    <span className='text-green-400 font-semibold text-sm tracking-wider'>CATEGORIES</span>
                                </div>

                                {/* Main Heading */}
                                <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight'>
                                    Enhance Your
                                    <span className='block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mt-2'>
                                        Music Experience
                                    </span>
                                </h1>

                                {/* Description */}
                                <p className='text-gray-300 text-base md:text-lg max-w-xl'>
                                    Immerse yourself in premium sound quality with our exclusive collection of high-performance speakers.
                                </p>

                                {/* Countdown Timer */}
                                <div className='flex flex-wrap gap-3 md:gap-4 pt-4'>
                                    {/* Days */}
                                    <div className='flex flex-col items-center justify-center bg-white rounded-2xl w-16 h-16 md:w-20 md:h-20 shadow-xl transform hover:scale-110 transition-transform duration-300'>
                                        <span className='text-black text-xl md:text-2xl font-bold'>
                                            {String(timeLeft.days).padStart(2, '0')}
                                        </span>
                                        <span className='text-gray-600 text-xs font-medium'>Days</span>
                                    </div>

                                    {/* Hours */}
                                    <div className='flex flex-col items-center justify-center bg-white rounded-2xl w-16 h-16 md:w-20 md:h-20 shadow-xl transform hover:scale-110 transition-transform duration-300'>
                                        <span className='text-black text-xl md:text-2xl font-bold'>
                                            {String(timeLeft.hours).padStart(2, '0')}
                                        </span>
                                        <span className='text-gray-600 text-xs font-medium'>Hours</span>
                                    </div>

                                    {/* Minutes */}
                                    <div className='flex flex-col items-center justify-center bg-white rounded-2xl w-16 h-16 md:w-20 md:h-20 shadow-xl transform hover:scale-110 transition-transform duration-300'>
                                        <span className='text-black text-xl md:text-2xl font-bold'>
                                            {String(timeLeft.minutes).padStart(2, '0')}
                                        </span>
                                        <span className='text-gray-600 text-xs font-medium'>Mins</span>
                                    </div>

                                    {/* Seconds */}
                                    <div className='flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-green-600 rounded-2xl w-16 h-16 md:w-20 md:h-20 shadow-xl animate-pulse'>
                                        <span className='text-white text-xl md:text-2xl font-bold'>
                                            {String(timeLeft.seconds).padStart(2, '0')}
                                        </span>
                                        <span className='text-white text-xs font-medium'>Secs</span>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className='flex flex-wrap gap-4 pt-6'>
                                    <Link to="/shop">
                                        <button className='group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
                                            <span className='relative z-10 flex items-center gap-2'>
                                                Buy Now
                                                <FaPlay className='group-hover:translate-x-1 transition-transform duration-300' />
                                            </span>
                                            <div className='absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
                                        </button>
                                    </Link>

                                    <button className='px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm text-white font-semibold text-lg rounded-full border-2 border-white border-opacity-30 hover:bg-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:scale-105'>
                                        Learn More
                                    </button>
                                </div>

                                {/* Features */}
                                <div className='flex flex-wrap gap-6 pt-4'>
                                    <div className='flex items-center gap-2'>
                                        <div className='bg-green-500 bg-opacity-20 p-2 rounded-lg'>
                                            <IoVolumeMediumSharp className='text-green-400 text-xl' />
                                        </div>
                                        <div>
                                            <p className='text-white font-semibold text-sm'>Premium Sound</p>
                                            <p className='text-gray-400 text-xs'>Crystal Clear</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <div className='bg-green-500 bg-opacity-20 p-2 rounded-lg'>
                                            <HiSpeakerWave className='text-green-400 text-xl' />
                                        </div>
                                        <div>
                                            <p className='text-white font-semibold text-sm'>Deep Bass</p>
                                            <p className='text-gray-400 text-xs'>Powerful Output</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - Product Image */}
                            <div className='relative flex items-center justify-center lg:justify-end z-10'>
                                <div className='relative group'>
                                    {/* Glow Effect */}
                                    <div className='absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-30 blur-3xl rounded-full group-hover:opacity-50 transition-opacity duration-500'></div>
                                    
                                    {/* Product Image */}
                                    <div className='relative'>
                                        <img 
                                            src={jblMusic} 
                                            alt="JBL Boombox Speaker"
                                            className='h-48 md:h-64 lg:h-80 xl:h-96 w-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700 animate-float'
                                        />
                                        
                                        {/* Floating Badge */}
                                        <div className='absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce'>
                                            HOT DEAL
                                        </div>

                                        {/* Price Tag */}
                                        <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-2xl'>
                                            <div className='text-center'>
                                                <p className='text-gray-500 text-xs line-through'>$399.99</p>
                                                <p className='text-green-600 text-2xl font-bold'>$299.99</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Circles */}
                                    <div className='absolute top-1/4 -right-8 w-24 h-24 bg-green-500 rounded-full opacity-20 blur-xl animate-pulse'></div>
                                    <div className='absolute bottom-1/4 -left-8 w-32 h-32 bg-green-400 rounded-full opacity-20 blur-xl animate-pulse animation-delay-1000'></div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Stats Bar */}
                        <div className='relative bg-white bg-opacity-5 backdrop-blur-sm border-t border-white border-opacity-10'>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-6'>
                                <div className='text-center'>
                                    <p className='text-green-400 text-2xl md:text-3xl font-bold'>50%</p>
                                    <p className='text-gray-400 text-xs md:text-sm mt-1'>Discount</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-green-400 text-2xl md:text-3xl font-bold'>24h</p>
                                    <p className='text-gray-400 text-xs md:text-sm mt-1'>Battery Life</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-green-400 text-2xl md:text-3xl font-bold'>IPX7</p>
                                    <p className='text-gray-400 text-xs md:text-sm mt-1'>Waterproof</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-green-400 text-2xl md:text-3xl font-bold'>360°</p>
                                    <p className='text-gray-400 text-xs md:text-sm mt-1'>Sound</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom CSS Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                @keyframes ping {
                    75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }

                .animate-ping {
                    animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </>
    );
};

export default CategoryMusic;