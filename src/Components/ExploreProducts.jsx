import React, { useContext, useState, useEffect } from 'react';
import { apiData } from './ContextApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart, WishListProduct } from './Slice/CartSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

// React Icons
import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";
import { HiArrowRight, HiSparkles } from "react-icons/hi";
import { FiClock } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";

const ExploreProducts = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let auth = getAuth();
    let info = useContext(apiData);

    // Filter beauty products
    let filterProducts = info.filter((item) => item.category === "beauty");

    // Wishlist state
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
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
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
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    // Handle Add to Wishlist with Auth Check
    const handleWishList = (item) => {
        if (!checkAuth()) {
            toast.error('Please login to add items to wishlist!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                navigate('/signUp');
            }, 2000);
            return;
        }

        // Toggle wishlist
        if (wishlistItems.includes(item.id)) {
            setWishlistItems(wishlistItems.filter(id => id !== item.id));
            toast.info('Removed from wishlist', {
                position: "top-right",
                autoClose: 1500,
            });
        } else {
            setWishlistItems([...wishlistItems, item.id]);
            dispatch(WishListProduct({ ...item, qty: 1 }));
            toast.success('Added to wishlist!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
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
            <section className='bg-gradient-to-b from-white to-purple-50 py-12'>
                <div className="container mx-auto px-4 border-b-2 border-purple-200 pb-16">
                    <div className='flex flex-col gap-8'>

                        {/* Section Header */}
                        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6'>
                            {/* Left Side - Title */}
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-5 h-10 bg-gradient-to-b from-purple-500 to-purple-600 rounded-sm'></div>
                                    <h2 className='text-lg font-bold text-purple-600 tracking-wide flex items-center gap-2'>
                                        <BiCategory className='text-xl' />
                                        OUR PRODUCTS
                                    </h2>
                                </div>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 flex items-center gap-3'>
                                        Explore Our Products
                                        <HiSparkles className='text-yellow-500 animate-pulse' />
                                    </h1>
                                </div>
                                <p className='text-gray-600 text-sm md:text-base max-w-2xl'>
                                    Discover our exclusive beauty collection with premium quality products and amazing deals!
                                </p>
                            </div>

                            {/* Right Side - Countdown Timer */}
                            <div className='flex items-center gap-3 md:gap-6 bg-white rounded-2xl shadow-xl p-4 md:p-6 border-2 border-purple-100'>
                                <FiClock className='text-purple-500 text-3xl hidden md:block' />
                                <div className='flex items-center gap-2 md:gap-4'>
                                    {/* Days */}
                                    <div className='text-center'>
                                        <p className='text-xs md:text-sm text-gray-600 font-medium mb-1'>Days</p>
                                        <div className='bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-xl md:text-3xl w-12 md:w-16 h-12 md:h-16 flex items-center justify-center rounded-lg shadow-md'>
                                            {String(timeLeft.days).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <span className='text-2xl md:text-4xl font-bold text-purple-500 mt-6'>:</span>

                                    {/* Hours */}
                                    <div className='text-center'>
                                        <p className='text-xs md:text-sm text-gray-600 font-medium mb-1'>Hours</p>
                                        <div className='bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-xl md:text-3xl w-12 md:w-16 h-12 md:h-16 flex items-center justify-center rounded-lg shadow-md'>
                                            {String(timeLeft.hours).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <span className='text-2xl md:text-4xl font-bold text-purple-500 mt-6'>:</span>

                                    {/* Minutes */}
                                    <div className='text-center'>
                                        <p className='text-xs md:text-sm text-gray-600 font-medium mb-1'>Mins</p>
                                        <div className='bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-xl md:text-3xl w-12 md:w-16 h-12 md:h-16 flex items-center justify-center rounded-lg shadow-md'>
                                            {String(timeLeft.minutes).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <span className='text-2xl md:text-4xl font-bold text-purple-500 mt-6'>:</span>

                                    {/* Seconds */}
                                    <div className='text-center'>
                                        <p className='text-xs md:text-sm text-gray-600 font-medium mb-1'>Secs</p>
                                        <div className='bg-gradient-to-br from-pink-500 to-pink-600 text-white font-bold text-xl md:text-3xl w-12 md:w-16 h-12 md:h-16 flex items-center justify-center rounded-lg shadow-md animate-pulse'>
                                            {String(timeLeft.seconds).padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-4'>
                            {filterProducts.map((item) => (
                                <div
                                    key={item.id}
                                    className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-3 border-2 border-transparent hover:border-purple-300'
                                >
                                    {/* Image Container */}
                                    <div className='relative bg-gradient-to-br from-purple-50 to-pink-50 aspect-square overflow-hidden'>
                                        <Link to={`/shop/${item.id}`}>
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                                            />
                                        </Link>

                                        {/* Discount Badge */}
                                        <div className='absolute top-3 left-3'>
                                            <div className='bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg flex items-center gap-1'>
                                                <HiSparkles className='text-yellow-300' />
                                                -{Math.round(item.discountPercentage)}%
                                            </div>
                                        </div>

                                        {/* NEW Badge for beauty products */}
                                        <div className='absolute top-3 right-3'>
                                            <div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg'>
                                                NEW
                                            </div>
                                        </div>

                                        {/* Action Icons */}
                                        <div className='absolute top-16 right-3 flex flex-col gap-2 opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500'>
                                            <button
                                                onClick={() => handleWishList(item)}
                                                className={`p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-125 ${wishlistItems.includes(item.id)
                                                        ? 'bg-pink-500 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-pink-500 hover:text-white'
                                                    }`}
                                            >
                                                {wishlistItems.includes(item.id) ? (
                                                    <FaHeart className='text-lg md:text-xl' />
                                                ) : (
                                                    <CiHeart className='text-lg md:text-xl' />
                                                )}
                                            </button>
                                            <Link to={`/shop/${item.id}`}>
                                                <button className='bg-white p-2 md:p-3 rounded-full text-gray-700 hover:bg-purple-500 hover:text-white transition-all duration-300 hover:scale-125'>
                                                    <IoEyeOutline className='text-lg md:text-xl' />
                                                </button>
                                            </Link>
                                        </div>

                                        {/* Add to Cart Overlay */}
                                        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900 via-purple-800 to-transparent text-white py-3 md:py-4 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500'>
                                            <button
                                                onClick={() => handleCart(item)}
                                                className='w-full flex items-center justify-center gap-2 font-semibold text-sm md:text-base hover:text-yellow-400 transition-colors duration-300'
                                            >
                                                <BsCartPlusFill className='text-lg md:text-xl' />
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className='p-4'>
                                        <Link to={`/shop/${item.id}`}>
                                            <h3 className='font-bold text-sm md:text-base text-gray-800 line-clamp-2 hover:text-purple-600 transition-colors duration-300 mb-2 min-h-[40px]'>
                                                {item.title}
                                            </h3>
                                        </Link>

                                        {/* Category Tag */}
                                        <div className='mb-2'>
                                            <span className='text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-semibold'>
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className='flex items-center gap-2 mb-3'>
                                            <span className='text-xl md:text-2xl font-bold text-purple-600'>
                                                ${item.price}
                                            </span>
                                            {item.discountPercentage > 0 && (
                                                <span className='text-sm text-gray-400 line-through'>
                                                    ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Rating */}
                                        <div className='flex items-center gap-1 mb-3'>
                                            {renderRating(item.rating || 4.5)}
                                            <span className='text-xs text-gray-500 ml-1'>
                                                ({item.rating || 4.5})
                                            </span>
                                        </div>

                                        {/* Quick Features */}
                                        <div className='flex gap-2'>
                                            <div className='flex-1 bg-pink-50 rounded-lg p-2 text-center'>
                                                <p className='text-xs text-pink-600 font-semibold'>✨ Premium</p>
                                            </div>
                                            <div className='flex-1 bg-purple-50 rounded-lg p-2 text-center'>
                                                <p className='text-xs text-purple-600 font-semibold'>🎁 Gift Ready</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* View All Button */}
                        <div className='flex justify-center mt-8'>
                            <Link to="/shop">
                                <button className='group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 hover:scale-105'>
                                    View All Products
                                    <HiArrowRight className='text-2xl group-hover:translate-x-2 transition-transform duration-300' />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Why Choose Section */}
                <div className='bg-gradient-to-r from-purple-100 to-pink-100 '>
                    <div className='container mx-auto p-8 md:p-12 mt-8'>
                        <h2 className='text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800'>
                            Why Choose Our Beauty Products?
                        </h2>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className='text-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300'>
                                <div className='bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <HiSparkles className='text-3xl text-white' />
                                </div>
                                <h3 className='font-bold text-xl mb-2 text-gray-800'>Premium Quality</h3>
                                <p className='text-gray-600 text-sm'>
                                    Only the finest ingredients for your beauty routine
                                </p>
                            </div>
                            <div className='text-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300'>
                                <div className='bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <FaHeart className='text-3xl text-white' />
                                </div>
                                <h3 className='font-bold text-xl mb-2 text-gray-800'>Dermatologist Tested</h3>
                                <p className='text-gray-600 text-sm'>
                                    Safe for all skin types, clinically proven
                                </p>
                            </div>
                            <div className='text-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300'>
                                <div className='bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <BiCategory className='text-3xl text-white' />
                                </div>
                                <h3 className='font-bold text-xl mb-2 text-gray-800'>Wide Selection</h3>
                                <p className='text-gray-600 text-sm'>
                                    Extensive range for all your beauty needs
                                </p>
                            </div>
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

            {/* Custom Styles */}
            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
};

export default ExploreProducts;