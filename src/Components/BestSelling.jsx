import React, { useContext, useState } from 'react';
import { apiData } from './ContextApi';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, WishListProduct } from './Slice/CartSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from 'firebase/auth';

// React Icons
import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";
import { FaTrophy, FaFire, FaCrown } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";

const BestSelling = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let auth = getAuth();
    let info = useContext(apiData);

    // Filter products (fixed logic)
    let filterProducts = info.filter((item) => item.id >= 22 && item.id <= 25);

    // Wishlist state
    const [wishlistItems, setWishlistItems] = useState([]);

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

    // Badge icons for top products
    const getBadgeIcon = (index) => {
        switch(index) {
            case 0:
                return <FaCrown className="text-yellow-500" />;
            case 1:
                return <FaTrophy className="text-gray-400" />;
            case 2:
                return <FaTrophy className="text-orange-600" />;
            default:
                return <FaFire className="text-red-500" />;
        }
    };

    return (
        <>
            <section className='bg-gradient-to-b from-gray-50 to-white py-16'>
                <div className="container mx-auto px-4">
                    <div className='flex flex-col gap-8'>
                        
                        {/* Section Header */}
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                            {/* Left Side - Title */}
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-5 h-10 bg-gradient-to-b from-red-500 to-red-600 rounded-sm'></div>
                                    <h2 className='text-lg font-bold text-red-600 tracking-wide flex items-center gap-2'>
                                        THIS MONTH
                                        <AiFillThunderbolt className='text-yellow-500 animate-pulse' />
                                    </h2>
                                </div>
                                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800'>
                                    Best Selling Products
                                </h1>
                                <p className='text-gray-600 text-sm md:text-base max-w-2xl'>
                                    Our top-rated products loved by thousands of customers. Don't miss out on these bestsellers!
                                </p>
                            </div>

                            {/* Right Side - View All Button */}
                            <Link to="/shop">
                                <button className='group flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-800 text-gray-800 font-semibold rounded-lg hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105'>
                                    View All
                                    <HiArrowRight className='text-xl group-hover:translate-x-2 transition-transform duration-300' />
                                </button>
                            </Link>
                        </div>

                        {/* Stats Banner */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl'>
                            <div className='text-center'>
                                <p className='text-3xl md:text-4xl font-bold'>1000+</p>
                                <p className='text-sm md:text-base opacity-90 mt-1'>Products Sold</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-3xl md:text-4xl font-bold'>4.8★</p>
                                <p className='text-sm md:text-base opacity-90 mt-1'>Avg Rating</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-3xl md:text-4xl font-bold'>98%</p>
                                <p className='text-sm md:text-base opacity-90 mt-1'>Satisfaction</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-3xl md:text-4xl font-bold'>24/7</p>
                                <p className='text-sm md:text-base opacity-90 mt-1'>Support</p>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
                            {filterProducts.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-3 border-2 border-transparent hover:border-red-500'
                                >
                                    {/* Image Container */}
                                    <div className='relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-square overflow-hidden'>
                                        <Link to={`/shop/${item.id}`}>
                                            <img 
                                                src={item.thumbnail} 
                                                alt={item.title}
                                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' 
                                            />
                                        </Link>

                                        {/* Rank Badge */}
                                        <div className='absolute top-3 left-3'>
                                            <div className='bg-gradient-to-br from-white to-gray-100 backdrop-blur-sm p-3 rounded-full shadow-lg flex items-center justify-center border-2 border-yellow-400'>
                                                <span className='text-2xl'>
                                                    {getBadgeIcon(index)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Best Seller Badge */}
                                        <div className='absolute top-3 right-3'>
                                            <div className='bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg flex items-center gap-1'>
                                                <FaFire />
                                                BEST SELLER
                                            </div>
                                        </div>

                                        {/* Discount Badge */}
                                        {item.discountPercentage > 0 && (
                                            <div className='absolute bottom-3 left-3'>
                                                <div className='bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg'>
                                                    -{Math.round(item.discountPercentage)}% OFF
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Icons */}
                                        <div className='absolute top-20 right-3 flex flex-col gap-2 opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500'>
                                            <button 
                                                onClick={() => handleWishList(item)}
                                                className={`p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-125 ${
                                                    wishlistItems.includes(item.id)
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
                                                }`}
                                            >
                                                {wishlistItems.includes(item.id) ? (
                                                    <FaHeart className='text-lg md:text-xl' />
                                                ) : (
                                                    <CiHeart className='text-lg md:text-xl' />
                                                )}
                                            </button>
                                            <Link to={`/shop/${item.id}`}>
                                                <button className='bg-white p-2 md:p-3 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-125'>
                                                    <IoEyeOutline className='text-lg md:text-xl' />
                                                </button>
                                            </Link>
                                        </div>

                                        {/* Add to Cart Overlay */}
                                        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent text-white py-3 md:py-4 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500'>
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
                                            <h3 className='font-bold text-sm md:text-base text-gray-800 line-clamp-2 hover:text-red-600 transition-colors duration-300 mb-2 min-h-[40px]'>
                                                {item.title}
                                            </h3>
                                        </Link>
                                        
                                        {/* Price */}
                                        <div className='flex items-center gap-2 mb-3'>
                                            <span className='text-xl md:text-2xl font-bold text-red-600'>
                                                ${item.price}
                                            </span>
                                            {item.discountPercentage > 0 && (
                                                <span className='text-sm text-gray-400 line-through'>
                                                    ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Rating and Reviews */}
                                        <div className='flex items-center justify-between mb-3'>
                                            <div className='flex items-center gap-1'>
                                                {renderRating(item.rating || 4.8)}
                                            </div>
                                            <span className='text-xs text-gray-600 font-semibold'>
                                                ({item.rating || 4.8})
                                            </span>
                                        </div>

                                        {/* Sales Count */}
                                        <div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-2 text-center'>
                                            <p className='text-xs md:text-sm font-bold text-orange-600'>
                                                🔥 {Math.floor(Math.random() * 500) + 200}+ sold this month
                                            </p>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className='flex gap-2 mt-3'>
                                            <div className='flex-1 bg-blue-50 rounded-lg p-2 text-center'>
                                                <p className='text-xs text-blue-600 font-semibold'>⚡ Fast Ship</p>
                                            </div>
                                            <div className='flex-1 bg-green-50 rounded-lg p-2 text-center'>
                                                <p className='text-xs text-green-600 font-semibold'>✓ In Stock</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Why Buy Section */}
                        <div className='bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-white mt-8'>
                            <h2 className='text-2xl md:text-3xl font-bold text-center mb-8'>
                                Why Choose Our Best Sellers?
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                <div className='text-center'>
                                    <div className='bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                                        <FaTrophy className='text-3xl' />
                                    </div>
                                    <h3 className='font-bold text-xl mb-2'>Top Quality</h3>
                                    <p className='text-gray-300 text-sm'>
                                        Hand-picked products with highest customer ratings
                                    </p>
                                </div>
                                <div className='text-center'>
                                    <div className='bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                                        <FaCrown className='text-3xl text-white' />
                                    </div>
                                    <h3 className='font-bold text-xl mb-2'>Trusted by Thousands</h3>
                                    <p className='text-gray-300 text-sm'>
                                        Join thousands of satisfied customers worldwide
                                    </p>
                                </div>
                                <div className='text-center'>
                                    <div className='bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                                        <AiFillThunderbolt className='text-3xl' />
                                    </div>
                                    <h3 className='font-bold text-xl mb-2'>Fast Delivery</h3>
                                    <p className='text-gray-300 text-sm'>
                                        Quick shipping on all bestselling items
                                    </p>
                                </div>
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

                @media (max-width: 768px) {
                    .aspect-square {
                        aspect-ratio: 1 / 1;
                    }
                }
            `}</style>
        </>
    );
};

export default BestSelling;