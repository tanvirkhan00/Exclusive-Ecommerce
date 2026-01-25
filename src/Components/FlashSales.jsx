import React, { useContext, useState, useEffect } from 'react';
import { apiData } from './ContextApi';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, WishListProduct } from './Slice/CartSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from 'firebase/auth';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// React Icons
import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiArrowRight, HiFire } from "react-icons/hi";

const FlashSales = () => {
    let info = useContext(apiData);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let auth = getAuth();

    // Filter products
    let filterProduct = info.filter((item) => item.id >= 40 && item.id <= 55);

    // Wishlist state for UI
    const [wishlistItems, setWishlistItems] = useState([]);

    // Countdown Timer State
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 19,
        seconds: 56
    });

    // Real Countdown Timer
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

    // Check if user is logged in
    const checkAuth = () => {
        return auth.currentUser !== null;
    };

    // Handle Add to Cart with Auth Check
    const handleCart = (item) => {
        if (!checkAuth()) {
            toast.error('Please login to add items to cart!', {
                position: "top-center",
                autoClose: 2000,
            });
            setTimeout(() => {
                navigate('/signUp');
            }, 2000);
            return;
        }

        dispatch(addToCart({ ...item, qty: 1 }));
        toast.success('Added to cart successfully!', {
            position: "top-right",
            autoClose: 1500,
        });
    };

    // Handle Add to Wishlist with Auth Check
    const handleWishList = (item) => {
        if (!checkAuth()) {
            toast.error('Please login to add items to wishlist!', {
                position: "top-center",
                autoClose: 2000,
            });
            setTimeout(() => {
                navigate('/signUp');
            }, 2000);
            return;
        }

        // Toggle wishlist
        if (wishlistItems.includes(item.id)) {
            setWishlistItems(wishlistItems.filter(id => id !== item.id));
            toast.info('Removed from wishlist');
        } else {
            setWishlistItems([...wishlistItems, item.id]);
            dispatch(WishListProduct({ ...item, qty: 1 }));
            toast.success('Added to wishlist!');
        }
    };

    // Render star rating
    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<CiStar key={`empty-${i}`} className="text-gray-400" />);
        }
        return stars;
    };

    return (
        <>
            <section className='relative bg-gradient-to-b from-white via-red-50/30 to-white py-12 overflow-hidden'>
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className='flex flex-col gap-8'>
                        
                        {/* Section Header */}
                        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6'>
                            {/* Left Side - Title */}
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-1 h-10 bg-gradient-to-b from-red-500 to-pink-500 rounded-full'></div>
                                    <h2 className='text-lg font-bold text-red-600 tracking-wide flex items-center gap-2'>
                                        <HiFire className="text-orange-500 text-2xl animate-pulse" />
                                        TODAY'S DEALS
                                    </h2>
                                </div>
                                <h1 className='text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent'>
                                    Flash Sales
                                </h1>
                                <p className="text-slate-600">Limited time offers - Don't miss out!</p>
                            </div>

                            {/* Right Side - Countdown Timer */}
                            <div className='flex items-center gap-3 lg:gap-6 bg-white rounded-2xl shadow-xl p-4 lg:p-6 border-2 border-red-100'>
                                <FiClock className='text-red-500 text-3xl hidden lg:block animate-pulse' />
                                <div className='flex items-center gap-2 lg:gap-4'>
                                    {/* Days */}
                                    <div className='text-center'>
                                        <p className='text-xs lg:text-sm text-gray-600 font-medium mb-1'>Days</p>
                                        <div className='bg-gradient-to-br from-red-500 to-pink-500 text-white font-bold text-xl lg:text-3xl w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-xl shadow-lg'>
                                            {String(timeLeft.days).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <span className='text-2xl lg:text-4xl font-bold text-red-500 mt-6'>:</span>
                                    
                                    {/* Hours */}
                                    <div className='text-center'>
                                        <p className='text-xs lg:text-sm text-gray-600 font-medium mb-1'>Hours</p>
                                        <div className='bg-gradient-to-br from-red-500 to-pink-500 text-white font-bold text-xl lg:text-3xl w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-xl shadow-lg'>
                                            {String(timeLeft.hours).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <span className='text-2xl lg:text-4xl font-bold text-red-500 mt-6'>:</span>
                                    
                                    {/* Minutes */}
                                    <div className='text-center'>
                                        <p className='text-xs lg:text-sm text-gray-600 font-medium mb-1'>Mins</p>
                                        <div className='bg-gradient-to-br from-red-500 to-pink-500 text-white font-bold text-xl lg:text-3xl w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-xl shadow-lg'>
                                            {String(timeLeft.minutes).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <span className='text-2xl lg:text-4xl font-bold text-red-500 mt-6'>:</span>
                                    
                                    {/* Seconds */}
                                    <div className='text-center'>
                                        <p className='text-xs lg:text-sm text-gray-600 font-medium mb-1'>Secs</p>
                                        <div className='bg-gradient-to-br from-red-500 to-pink-500 text-white font-bold text-xl lg:text-3xl w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-xl shadow-lg animate-pulse'>
                                            {String(timeLeft.seconds).padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="hidden lg:flex justify-end gap-2 -mb-4">
                            <button className="flash-sales-prev w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:border-red-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300 shadow-md">
                                <FiChevronLeft className="text-xl" />
                            </button>
                            <button className="flash-sales-next w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:border-red-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300 shadow-md">
                                <FiChevronRight className="text-xl" />
                            </button>
                        </div>

                        {/* Products Carousel */}
                        <div className="flash-sales-swiper">
                            <style jsx>{`
                                .flash-sales-swiper .swiper-button-disabled {
                                    opacity: 0.5;
                                    cursor: not-allowed;
                                }
                                .flash-sales-swiper .swiper-pagination-bullet {
                                    width: 10px;
                                    height: 10px;
                                    background: #cbd5e1;
                                    opacity: 1;
                                    transition: all 0.3s ease;
                                }
                                .flash-sales-swiper .swiper-pagination-bullet-active {
                                    background: linear-gradient(to right, #ef4444, #ec4899);
                                    width: 24px;
                                    border-radius: 5px;
                                }
                                .line-clamp-2 {
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                }
                            `}</style>

                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={24}
                                slidesPerView={2}
                                navigation={{
                                    prevEl: '.flash-sales-prev',
                                    nextEl: '.flash-sales-next',
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                loop={filterProduct.length > 4}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 24,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        spaceBetween: 24,
                                    },
                                    1280: {
                                        slidesPerView: 5,
                                        spaceBetween: 24,
                                    },
                                }}
                                className="pb-12"
                            >
                                {filterProduct.map((item, index) => (
                                    <SwiperSlide key={item.id}>
                                        <div className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2 h-full border border-slate-100'>
                                            {/* Image Container */}
                                            <div className='relative bg-gradient-to-br from-slate-50 to-slate-100 aspect-square overflow-hidden'>
                                                <Link to={`/shop/${item.id}`}>
                                                    <img 
                                                        src={item.thumbnail} 
                                                        alt={item.title}
                                                        className='w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700' 
                                                    />
                                                </Link>

                                                {/* Discount Badge */}
                                                <div className='absolute top-3 left-3 z-10'>
                                                    <div className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1'>
                                                        <HiFire className="text-orange-200" />
                                                        -{Math.round(item.discountPercentage)}% OFF
                                                    </div>
                                                </div>

                                                {/* Action Icons */}
                                                <div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 z-10'>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleWishList(item);
                                                        }}
                                                        className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-125 shadow-lg ${
                                                            wishlistItems.includes(item.id)
                                                                ? 'bg-red-500 text-white'
                                                                : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
                                                        }`}
                                                    >
                                                        {wishlistItems.includes(item.id) ? (
                                                            <FaHeart className='text-lg' />
                                                        ) : (
                                                            <CiHeart className='text-xl' />
                                                        )}
                                                    </button>
                                                    <Link to={`/shop/${item.id}`}>
                                                        <button className='bg-white p-2.5 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-125 shadow-lg'>
                                                            <IoEyeOutline className='text-xl' />
                                                        </button>
                                                    </Link>
                                                </div>

                                                {/* Add to Cart Overlay */}
                                                <div className='absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleCart(item);
                                                        }}
                                                        className='w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 font-semibold flex items-center justify-center gap-2 hover:from-red-600 hover:to-pink-600 transition-all duration-300'
                                                    >
                                                        <BsCartPlusFill className='text-lg' />
                                                        Add To Cart
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className='p-4'>
                                                <Link to={`/shop/${item.id}`}>
                                                    <h3 className='font-semibold text-sm text-gray-800 line-clamp-2 hover:text-red-600 transition-colors duration-300 mb-2 min-h-[40px]'>
                                                        {item.title}
                                                    </h3>
                                                </Link>
                                                
                                                {/* Price */}
                                                <div className='flex items-center gap-2 mb-2'>
                                                    <span className='text-xl font-bold text-red-600'>
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                    {item.discountPercentage > 0 && (
                                                        <span className='text-sm text-gray-400 line-through'>
                                                            ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Rating */}
                                                <div className='flex items-center gap-1 mb-2'>
                                                    <div className="flex text-sm">
                                                        {renderRating(item.rating || 4.5)}
                                                    </div>
                                                    <span className='text-xs text-gray-500 ml-1'>
                                                        ({item.rating || 4.5})
                                                    </span>
                                                </div>

                                                {/* Stock Badge */}
                                                {item.stock && item.stock < 10 && (
                                                    <div className='animate-pulse'>
                                                        <span className='text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-semibold'>
                                                            🔥 Only {item.stock} left!
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* View All Button */}
                        <div className='flex justify-center mt-4'>
                            <Link to="/shop">
                                <button className='group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105'>
                                    View All Products
                                    <HiArrowRight className='text-2xl group-hover:translate-x-2 transition-transform duration-300' />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                limit={3}
            />
        </>
    );
};

export default FlashSales;