import React, { useContext } from 'react';
import { apiData } from './ContextApi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, WishListProduct } from './Slice/CartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';

// Icons
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { BsCartPlusFill } from "react-icons/bs";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { FiChevronRight, FiStar } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

const ForYouProducts = () => {
    const info = useContext(apiData);
    const filterProducts = info.filter((item) => item.id >= 25 && item.id <= 32); // Fixed filter logic
    const dispatch = useDispatch();

    // Add to Cart
    const handleCart = (item) => {
        dispatch(addToCart({ ...item, qty: 1 }));
        toast.success('Added to cart!');
    };

    // Add to Wishlist
    const handleWishList = (item) => {
        dispatch(WishListProduct({ ...item, qty: 1 }));
        toast.success('Added to wishlist!');
    };

    // Star Rating Component
    const StarRating = ({ rating = 4.5 }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<IoMdStar key={i} className="text-yellow-500" />);
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                stars.push(<IoMdStarHalf key={i} className="text-yellow-500" />);
            } else {
                stars.push(<IoMdStarOutline key={i} className="text-slate-300" />);
            }
        }
        return <div className="flex items-center gap-0.5">{stars}</div>;
    };

    // Container variants for staggered animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <>
            <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="space-y-8">
                        {/* Section Header */}
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className='flex items-center justify-between flex-wrap gap-4'
                        >
                            <div className='flex items-center gap-4'>
                                <div className="relative">
                                    <div className='w-1 h-10 bg-gradient-to-b from-red-500 to-pink-500 rounded-full'></div>
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 0.8, 0.5]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full blur-sm"
                                    />
                                </div>
                                <div>
                                    <h2 className='text-3xl lg:text-4xl font-bold text-slate-900 flex items-center gap-2'>
                                        <HiSparkles className="text-yellow-500" />
                                        Just For You
                                    </h2>
                                    <p className="text-slate-600 text-sm mt-1">Handpicked recommendations</p>
                                </div>
                            </div>
                            
                            <Link to="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2'
                                >
                                    See All
                                    <FiChevronRight className="text-lg" />
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Products Grid */}
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                        >
                            {filterProducts.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    className='group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200'
                                >
                                    {/* Discount Badge */}
                                    {item.discountPercentage > 0 && (
                                        <div className='absolute top-3 left-3 z-20'>
                                            <motion.div
                                                initial={{ scale: 0, rotate: -12 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: index * 0.05, type: "spring" }}
                                                className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg'
                                            >
                                                -{item.discountPercentage}% OFF
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* New Badge */}
                                    <div className='absolute top-3 right-3 z-10'>
                                        <div className='bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1'>
                                            <HiSparkles className="text-sm" />
                                            NEW
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='absolute top-14 right-3 z-20 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500'>
                                        {/* Wishlist Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.15 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleWishList(item);
                                            }}
                                            className='w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-red-500 hover:bg-red-50 transition-all duration-300 group/btn'
                                        >
                                            <CiHeart className="text-xl group-hover/btn:scale-110 transition-transform" />
                                        </motion.button>

                                        {/* Quick View Button */}
                                        <Link to={`/shop/${item.id}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.9 }}
                                                className='w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300 group/btn'
                                            >
                                                <IoEyeOutline className="text-xl group-hover/btn:scale-110 transition-transform" />
                                            </motion.button>
                                        </Link>
                                    </div>

                                    {/* Product Image */}
                                    <div className='relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden aspect-square flex items-center justify-center p-4'>
                                        <Link to={`/shop/${item.id}`} className="relative w-full h-full flex items-center justify-center">
                                            <img 
                                                src={item.thumbnail} 
                                                alt={item.title}
                                                className='max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700'
                                            />
                                        </Link>

                                        {/* Add to Cart Overlay */}
                                        <div className='absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCart(item);
                                                }}
                                                className='w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300'
                                            >
                                                <BsCartPlusFill className="text-lg" />
                                                <span className="text-sm">Add to Cart</span>
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className='p-4'>
                                        <Link to={`/shop/${item.id}`}>
                                            <h3 className='font-semibold text-slate-900 hover:text-red-500 transition-colors duration-300 line-clamp-2 mb-2 min-h-[3rem] text-sm'>
                                                {item.title}
                                            </h3>
                                        </Link>

                                        {/* Price */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className='text-lg font-bold text-red-500'>
                                                ${item.price.toFixed(2)}
                                            </span>
                                            {item.discountPercentage > 0 && (
                                                <span className='text-xs text-slate-400 line-through'>
                                                    ${(item.price * 1.2).toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Rating */}
                                        <div className='flex items-center gap-2'>
                                            <div className="flex text-sm">
                                                <StarRating rating={4.5} />
                                            </div>
                                            <span className='text-xs text-slate-500'>(4.5)</span>
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent"></div>
                                    </div>

                                    {/* Recommended Badge on Hover */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-full group-hover:translate-y-0">
                                        ⭐ Recommended for you
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-200 text-center"
                        >
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <HiSparkles className="text-3xl text-yellow-500" />
                                <h3 className="text-2xl font-bold text-slate-900">Discover More</h3>
                                <HiSparkles className="text-3xl text-yellow-500" />
                            </div>
                            <p className="text-slate-600 mb-6">
                                We have thousands of products waiting for you to explore!
                            </p>
                            <Link to="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                                >
                                    Explore All Products
                                    <FiChevronRight className="text-xl" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </section>
        </>
    );
};

export default ForYouProducts;