import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

// React Icon
import { FaApple } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { BsSmartwatch } from "react-icons/bs";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { IoLaptopOutline } from "react-icons/io5";
import { FiHeadphones } from "react-icons/fi";

// Img
import HiroImg from "/src/assets/mobile.png";

const HeroHome = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            id: 1,
            brand: "Apple",
            icon: FaApple,
            title: "iPhone 14 Series",
            subtitle: "Up to 10% off Voucher",
            image: HiroImg,
            bgGradient: "from-gray-900 via-gray-800 to-black",
            textColor: "text-white",
            accentColor: "text-blue-400"
        },
        {
            id: 2,
            brand: "Apple",
            icon: BsSmartwatch,
            title: "Apple Watch Series 9",
            subtitle: "Up to 15% off + Free Shipping",
            image: HiroImg,
            bgGradient: "from-purple-900 via-purple-800 to-black",
            textColor: "text-white",
            accentColor: "text-purple-400"
        },
        {
            id: 3,
            brand: "Samsung",
            icon: HiOutlineDevicePhoneMobile,
            title: "Galaxy S24 Ultra",
            subtitle: "Up to 20% off Limited Time",
            image: HiroImg,
            bgGradient: "from-blue-900 via-blue-800 to-black",
            textColor: "text-white",
            accentColor: "text-cyan-400"
        },
        {
            id: 4,
            brand: "MacBook",
            icon: IoLaptopOutline,
            title: "MacBook Pro M3",
            subtitle: "Up to $300 off + Free AirPods",
            image: HiroImg,
            bgGradient: "from-green-900 via-green-800 to-black",
            textColor: "text-white",
            accentColor: "text-green-400"
        },
        {
            id: 5,
            brand: "Sony",
            icon: FiHeadphones,
            title: "Premium Headphones",
            subtitle: "Up to 25% off This Week",
            image: HiroImg,
            bgGradient: "from-red-900 via-red-800 to-black",
            textColor: "text-white",
            accentColor: "text-red-400"
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "ease-in-out",
        pauseOnHover: true,
        beforeChange: (current, next) => setCurrentSlide(next),
        customPaging: (i) => (
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'bg-yellow-500 w-8' : 'bg-gray-400 hover:bg-gray-300'
            }`}></div>
        ),
        dotsClass: "slick-dots custom-dots",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false
                }
            }
        ]
    };

    return (
        <>
            <section className='min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black pt-20 md:pt-24'>
                <div className="container mx-auto px-4 w-full">
                    <div className="w-full max-w-7xl mx-auto">
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <Slider {...settings}>
                                {heroSlides.map((slide, index) => (
                                    <div key={slide.id}>
                                        <div className={`bg-gradient-to-r ${slide.bgGradient} ${slide.textColor} relative overflow-hidden`}>
                                            {/* Background Pattern */}
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                                                <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                                            </div>

                                            {/* Floating particles */}
                                            <div className="absolute inset-0 overflow-hidden">
                                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-float opacity-30"></div>
                                                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white rounded-full animate-float opacity-20" style={{ animationDelay: '2s' }}></div>
                                                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-float opacity-40" style={{ animationDelay: '4s' }}></div>
                                            </div>

                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 min-h-[calc(100vh-120px)] px-6 md:px-12 lg:px-16 py-12 md:py-16'>
                                                {/* Left Content */}
                                                <div className='space-y-6 lg:space-y-8 animate-fadeInLeft'>
                                                    {/* Brand Tag */}
                                                    <div className='flex items-center gap-4 group'>
                                                        <div className={`text-6xl md:text-7xl lg:text-8xl ${slide.accentColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 drop-shadow-2xl`}>
                                                            <slide.icon />
                                                        </div>
                                                        <span className='text-xl md:text-2xl font-light tracking-wider opacity-90'>{slide.brand}</span>
                                                    </div>

                                                    {/* Main Title */}
                                                    <h2 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-lg'>
                                                        {slide.title}
                                                    </h2>

                                                    {/* Subtitle */}
                                                    <p className='text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 drop-shadow-md'>
                                                        {slide.subtitle}
                                                    </p>

                                                    {/* Features/Benefits */}
                                                    <div className='flex flex-wrap gap-3 lg:gap-4 pt-2'>
                                                        <div className='flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-md px-5 py-3 rounded-full border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300'>
                                                            <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
                                                            <span className='text-sm md:text-base font-medium'>Free Delivery</span>
                                                        </div>
                                                        <div className='flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-md px-5 py-3 rounded-full border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300'>
                                                            <span className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'></span>
                                                            <span className='text-sm md:text-base font-medium'>2 Year Warranty</span>
                                                        </div>
                                                        <div className='flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-md px-5 py-3 rounded-full border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300'>
                                                            <span className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></span>
                                                            <span className='text-sm md:text-base font-medium'>Easy Returns</span>
                                                        </div>
                                                    </div>

                                                    {/* CTA Button */}
                                                    <Link 
                                                        to="/shop"
                                                        className='inline-flex items-center gap-4 group cursor-pointer mt-6 bg-white bg-opacity-10 backdrop-blur-md px-8 py-4 rounded-full border-2 border-white hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 hover:scale-105 shadow-lg'
                                                    >
                                                        <span className='text-xl md:text-2xl font-bold'>
                                                            Shop Now
                                                        </span>
                                                        <GoArrowRight className='text-3xl transition-all duration-300 group-hover:translate-x-2' />
                                                    </Link>
                                                </div>

                                                {/* Right Image */}
                                                <div className='relative flex items-center justify-center'>
                                                    <div className='relative animate-fadeInRight'>
                                                        {/* Multiple Glow Effects */}
                                                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-60 blur-[100px] rounded-full scale-110`}></div>
                                                        <div className={`absolute inset-0 bg-gradient-to-l ${slide.bgGradient} opacity-40 blur-[80px] rounded-full scale-125 animate-pulse`}></div>
                                                        
                                                        {/* Product Image */}
                                                        <img 
                                                            src={slide.image} 
                                                            alt={slide.title}
                                                            className='relative h-72 md:h-96 lg:h-[500px] xl:h-[600px] w-auto object-contain drop-shadow-2xl transform transition-all duration-700 hover:scale-110 hover:rotate-3'
                                                        />

                                                        {/* Floating Badge */}
                                                        <div className='absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-bold text-base md:text-lg shadow-2xl animate-bounce'>
                                                            HOT SALE
                                                        </div>

                                                        {/* Discount Badge */}
                                                        <div className='absolute -bottom-4 -left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full font-bold text-sm md:text-base shadow-xl'>
                                                            Save Up to 20%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className='absolute bottom-0 left-0 w-full h-1 bg-gray-800'>
                                                <div 
                                                    className={`h-full bg-gradient-to-r ${slide.accentColor.replace('text', 'from')}-400 to-yellow-500 transition-all duration-300 shadow-lg`}
                                                    style={{
                                                        width: currentSlide === index ? '100%' : '0%',
                                                        transition: 'width 5s linear'
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .animate-fadeInLeft {
                    animation: fadeInLeft 1s ease-out;
                }

                .animate-fadeInRight {
                    animation: fadeInRight 1s ease-out;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .custom-dots {
                    bottom: 30px !important;
                    display: flex !important;
                    justify-content: center !important;
                    gap: 10px !important;
                }

                .custom-dots li {
                    margin: 0 !important;
                }

                .custom-dots li button {
                    padding: 0 !important;
                }

                .custom-dots li button:before {
                    display: none !important;
                }

                .slick-prev,
                .slick-next {
                    width: 60px !important;
                    height: 60px !important;
                    z-index: 10 !important;
                    background: rgba(255, 255, 255, 0.1) !important;
                    backdrop-filter: blur(10px) !important;
                    border-radius: 50% !important;
                    transition: all 0.3s ease !important;
                }

                .slick-prev:hover,
                .slick-next:hover {
                    background: rgba(255, 255, 255, 0.2) !important;
                    transform: scale(1.1) !important;
                }

                .slick-prev {
                    left: 30px !important;
                }

                .slick-next {
                    right: 30px !important;
                }

                .slick-prev:before,
                .slick-next:before {
                    font-size: 40px !important;
                    opacity: 0.8 !important;
                }

                .slick-prev:hover:before,
                .slick-next:hover:before {
                    opacity: 1 !important;
                }

                @media (max-width: 768px) {
                    .custom-dots {
                        bottom: 15px !important;
                        gap: 6px !important;
                    }

                    .slick-prev,
                    .slick-next {
                        width: 40px !important;
                        height: 40px !important;
                    }

                    .slick-prev {
                        left: 15px !important;
                    }

                    .slick-next {
                        right: 15px !important;
                    }

                    .slick-prev:before,
                    .slick-next:before {
                        font-size: 30px !important;
                    }
                }
            `}</style>
        </>
    );
};

export default HeroHome;