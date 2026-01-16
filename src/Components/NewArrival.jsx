import React from 'react';
import { Link } from 'react-router-dom';

// Icons
import { HiArrowRight, HiSparkles } from "react-icons/hi";
import { BsController } from "react-icons/bs";
import { GiLargeDress } from "react-icons/gi";
import { HiSpeakerWave } from "react-icons/hi2";
import { GiPerfumeBottle } from "react-icons/gi";
import { FaFire } from "react-icons/fa";

// Img
import speaker from "/src/assets/Speaker.png";
import speaker1 from "/src/assets/Speaker1.png";
import woman from "/src/assets/attractive-woman.png";
import perfume from "/src/assets/perfume.png";

const NewArrival = () => {
    return (
        <>
            <section className='bg-gradient-to-b from-gray-50 to-white py-12 md:py-16'>
                <div className="container mx-auto px-4">
                    <div className='flex flex-col gap-8'>
                        
                        {/* Section Header */}
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-3'>
                                <div className='w-5 h-10 bg-gradient-to-b from-red-500 to-red-600 rounded-sm'></div>
                                <h2 className='text-lg font-bold text-red-600 tracking-wide flex items-center gap-2'>
                                    <FaFire className='text-xl animate-pulse' />
                                    FEATURED
                                </h2>
                            </div>
                            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 flex items-center gap-3'>
                                    New Arrival
                                    <HiSparkles className='text-yellow-500 animate-pulse' />
                                </h1>
                                <Link to="/shop">
                                    <button className='group flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors duration-300'>
                                        View All
                                        <HiArrowRight className='group-hover:translate-x-2 transition-transform duration-300' />
                                    </button>
                                </Link>
                            </div>
                            <p className='text-gray-600 text-sm md:text-base max-w-2xl'>
                                Discover our latest arrivals featuring exclusive collections and trending products
                            </p>
                        </div>

                        {/* Products Grid */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4'>
                            
                            {/* PlayStation 5 - Large Featured Item */}
                            <div className='group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500'>
                                {/* Background Glow */}
                                <div className='absolute inset-0 bg-gradient-to-t from-blue-600 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500'></div>
                                
                                {/* NEW Badge */}
                                <div className='absolute top-4 right-4 z-10'>
                                    <div className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce'>
                                        NEW
                                    </div>
                                </div>

                                {/* Category Icon */}
                                <div className='absolute top-4 left-4 z-10'>
                                    <div className='bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-full'>
                                        <BsController className='text-white text-2xl' />
                                    </div>
                                </div>

                                {/* Image Container */}
                                <div className='flex items-center justify-center pt-12 md:pt-20 pb-32 md:pb-40 px-4'>
                                    <img 
                                        src={speaker1} 
                                        alt="PlayStation 5"
                                        className='h-64 md:h-80 lg:h-96 w-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700' 
                                    />
                                </div>

                                {/* Content Overlay */}
                                <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black via-black to-transparent'>
                                    <div className='max-w-md space-y-3'>
                                        <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>
                                            PlayStation 5
                                        </h3>
                                        <p className='text-gray-300 text-sm md:text-base'>
                                            Black and White version of the PS5 coming out on sale
                                        </p>
                                        <Link to="/shop">
                                            <button className='group/btn inline-flex items-center gap-2 text-white font-semibold border-b-2 border-white pb-1 hover:text-yellow-400 hover:border-yellow-400 transition-all duration-300'>
                                                Shop Now
                                                <HiArrowRight className='group-hover/btn:translate-x-2 transition-transform duration-300' />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - 3 Items */}
                            <div className='grid grid-cols-1 gap-6'>
                                
                                {/* Women's Collections */}
                                <div className='group relative bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[280px]'>
                                    {/* Background Pattern */}
                                    <div className='absolute inset-0 opacity-10'>
                                        <div className='absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl'></div>
                                    </div>

                                    {/* Category Icon */}
                                    <div className='absolute top-4 left-4 z-10'>
                                        <div className='bg-white bg-opacity-80 backdrop-blur-sm p-3 rounded-full shadow-lg'>
                                            <GiLargeDress className='text-pink-600 text-2xl' />
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <img 
                                        src={woman} 
                                        alt="Women's Collections"
                                        className='absolute right-0 bottom-0 h-full w-auto object-cover transform group-hover:scale-105 transition-transform duration-700' 
                                    />

                                    {/* Content */}
                                    <div className='relative h-full flex items-end p-6 md:p-8 bg-gradient-to-t from-black via-transparent to-transparent'>
                                        <div className='max-w-xs space-y-2'>
                                            <h3 className='text-2xl md:text-3xl font-bold text-white'>
                                                Women's Collections
                                            </h3>
                                            <p className='text-gray-200 text-sm'>
                                                Featured women collections that give you another vibe
                                            </p>
                                            <Link to="/shop">
                                                <button className='group/btn inline-flex items-center gap-2 text-white font-semibold border-b-2 border-white pb-1 hover:text-yellow-400 hover:border-yellow-400 transition-all duration-300'>
                                                    Shop Now
                                                    <HiArrowRight className='group-hover/btn:translate-x-2 transition-transform duration-300' />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Row - Speakers & Perfume */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    
                                    {/* Speakers */}
                                    <div className='group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[240px]'>
                                        {/* Glow Effect */}
                                        <div className='absolute inset-0 bg-gradient-to-t from-green-500 via-transparent to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500'></div>

                                        {/* Category Icon */}
                                        <div className='absolute top-4 left-4 z-10'>
                                            <div className='bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full'>
                                                <HiSpeakerWave className='text-white text-xl' />
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div className='flex items-center justify-center pt-12 pb-24 px-4'>
                                            <img 
                                                src={speaker} 
                                                alt="Speakers"
                                                className='h-32 md:h-40 w-auto object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-700' 
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className='absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black to-transparent'>
                                            <div className='space-y-2'>
                                                <h3 className='text-xl md:text-2xl font-bold text-white'>
                                                    Speakers
                                                </h3>
                                                <p className='text-gray-300 text-xs md:text-sm'>
                                                    Amazon wireless speakers
                                                </p>
                                                <Link to="/shop">
                                                    <button className='group/btn inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-white pb-1 hover:text-green-400 hover:border-green-400 transition-all duration-300'>
                                                        Shop Now
                                                        <HiArrowRight className='text-xs group-hover/btn:translate-x-1 transition-transform duration-300' />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Perfume */}
                                    <div className='group relative bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[240px]'>
                                        {/* Glow Effect */}
                                        <div className='absolute inset-0 bg-gradient-to-t from-pink-500 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500'></div>

                                        {/* Category Icon */}
                                        <div className='absolute top-4 left-4 z-10'>
                                            <div className='bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full'>
                                                <GiPerfumeBottle className='text-white text-xl' />
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div className='flex items-center justify-center pt-12 pb-24 px-4'>
                                            <img 
                                                src={perfume} 
                                                alt="Perfume"
                                                className='h-32 md:h-40 w-auto object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-700' 
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className='absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black to-transparent'>
                                            <div className='space-y-2'>
                                                <h3 className='text-xl md:text-2xl font-bold text-white'>
                                                    Perfume
                                                </h3>
                                                <p className='text-gray-300 text-xs md:text-sm'>
                                                    Gucci Intense OUD EDP
                                                </p>
                                                <Link to="/shop">
                                                    <button className='group/btn inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-white pb-1 hover:text-pink-400 hover:border-pink-400 transition-all duration-300'>
                                                        Shop Now
                                                        <HiArrowRight className='text-xs group-hover/btn:translate-x-1 transition-transform duration-300' />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewArrival;