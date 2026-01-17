import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deletItem } from './Slice/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

// React Icons
import { CiStar } from "react-icons/ci";
import { HiOutlineTrash, HiOutlineHeart } from "react-icons/hi2";
import { BsCartPlusFill } from "react-icons/bs";
import { FiShoppingBag, FiStar } from "react-icons/fi";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

const WishlistProducts = () => {
    const WishList = useSelector((state) => state.product.WishListItem);
    const dispatch = useDispatch();
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    const deleteItem = (itemId) => {
        dispatch(deletItem(itemId));
        toast.success('Item removed from wishlist');
    };

    const moveAllToBag = () => {
        if (WishList.length === 0) {
            toast.warning('Your wishlist is empty');
            return;
        }
        // Add logic to move all items to cart
        toast.success(`${WishList.length} items moved to cart`);
    };

    const addToCart = (item) => {
        // Add your cart logic here
        toast.success('Item added to cart');
    };

    // Star rating component
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

    return (
        <>
            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20 py-12 mt-[100px]">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <HiOutlineHeart className="text-white text-2xl" />
                            </div>
                            <div>
                                <h1 className='text-4xl font-bold text-slate-900'>
                                    My Wishlist
                                </h1>
                                <p className="text-slate-600 mt-1">
                                    {WishList.length} {WishList.length === 1 ? 'item' : 'items'} saved
                                </p>
                            </div>
                        </div>

                        {/* Action Bar */}
                        {WishList.length > 0 && (
                            <div className='flex items-center justify-between flex-wrap gap-4 bg-white rounded-xl shadow-md border border-slate-200 p-4'>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-600">
                                        <span className="font-bold text-red-500">{WishList.length}</span> items in wishlist
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    {/* View Toggle */}
                                    <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`px-4 py-2 rounded-md transition-all duration-300 ${
                                                viewMode === 'grid'
                                                    ? 'bg-white shadow-md text-red-500'
                                                    : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                        >
                                            Grid
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`px-4 py-2 rounded-md transition-all duration-300 ${
                                                viewMode === 'list'
                                                    ? 'bg-white shadow-md text-red-500'
                                                    : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                        >
                                            List
                                        </button>
                                    </div>

                                    {/* Move All Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={moveAllToBag}
                                        className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2'
                                    >
                                        <FiShoppingBag />
                                        Move All To Cart
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Empty State */}
                    {WishList.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <HiOutlineHeart className="text-6xl text-slate-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
                            <p className="text-slate-600 mb-8">Save items you love to buy them later!</p>
                            <Link to="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Start Shopping
                                </motion.button>
                            </Link>
                        </motion.div>
                    ) : (
                        <>
                            {/* Grid View */}
                            {viewMode === 'grid' && (
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                    <AnimatePresence>
                                        {WishList.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.3 }}
                                                layout
                                                className='group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200'
                                            >
                                                {/* Discount Badge */}
                                                {item.discountPercentage > 0 && (
                                                    <div className='absolute top-3 left-3 z-20'>
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg'
                                                        >
                                                            -{item.discountPercentage}%
                                                        </motion.div>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className='absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500'>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => deleteItem(index)}
                                                        className='w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-red-500 hover:bg-red-50 transition-all duration-300'
                                                    >
                                                        <HiOutlineTrash className="text-lg" />
                                                    </motion.button>
                                                </div>

                                                {/* Product Image */}
                                                <div className='relative bg-slate-50 overflow-hidden aspect-square'>
                                                    <Link to={`/shop/${item.id}`}>
                                                        <img 
                                                            src={item.thumbnail} 
                                                            alt={item.title}
                                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                                                        />
                                                    </Link>
                                                    
                                                    {/* Add to Cart Overlay */}
                                                    <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4'>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => addToCart(item)}
                                                            className='bg-white text-slate-900 px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-xl hover:bg-red-500 hover:text-white transition-all duration-300'
                                                        >
                                                            <BsCartPlusFill />
                                                            Add to Cart
                                                        </motion.button>
                                                    </div>
                                                </div>

                                                {/* Product Details */}
                                                <div className='p-4'>
                                                    <Link to={`/shop/${item.id}`}>
                                                        <h3 className='font-semibold text-slate-900 hover:text-red-500 transition-colors duration-300 line-clamp-2 mb-2 min-h-[3rem]'>
                                                            {item.title}
                                                        </h3>
                                                    </Link>
                                                    
                                                    {/* Price */}
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className='text-xl font-bold text-red-500'>
                                                            ${item.price.toFixed(2)}
                                                        </span>
                                                        {item.discountPercentage > 0 && (
                                                            <span className='text-sm text-slate-400 line-through'>
                                                                ${(item.price * 1.2).toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Rating */}
                                                    <div className='flex items-center gap-2'>
                                                        <StarRating rating={4.5} />
                                                        <span className='text-xs text-slate-500'>(4.5)</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* List View */}
                            {viewMode === 'list' && (
                                <div className='space-y-4'>
                                    <AnimatePresence>
                                        {WishList.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 50 }}
                                                transition={{ duration: 0.3 }}
                                                layout
                                                className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-slate-200 overflow-hidden group'
                                            >
                                                <div className='flex gap-6 p-6'>
                                                    {/* Product Image */}
                                                    <Link to={`/shop/${item.id}`} className="flex-shrink-0">
                                                        <div className='relative w-32 h-32 bg-slate-50 rounded-xl overflow-hidden'>
                                                            <img 
                                                                src={item.thumbnail} 
                                                                alt={item.title}
                                                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                                            />
                                                            {item.discountPercentage > 0 && (
                                                                <div className='absolute top-2 left-2'>
                                                                    <div className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold'>
                                                                        -{item.discountPercentage}%
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>

                                                    {/* Product Details */}
                                                    <div className='flex-1 min-w-0'>
                                                        <Link to={`/shop/${item.id}`}>
                                                            <h3 className='text-xl font-bold text-slate-900 hover:text-red-500 transition-colors duration-300 mb-2'>
                                                                {item.title}
                                                            </h3>
                                                        </Link>
                                                        
                                                        <div className='flex items-center gap-2 mb-3'>
                                                            <StarRating rating={4.5} />
                                                            <span className='text-sm text-slate-500'>(4.5)</span>
                                                        </div>

                                                        <div className="flex items-center gap-3 mb-4">
                                                            <span className='text-2xl font-bold text-red-500'>
                                                                ${item.price.toFixed(2)}
                                                            </span>
                                                            {item.discountPercentage > 0 && (
                                                                <span className='text-lg text-slate-400 line-through'>
                                                                    ${(item.price * 1.2).toFixed(2)}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className='flex gap-3'>
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => addToCart(item)}
                                                                className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300'
                                                            >
                                                                <BsCartPlusFill />
                                                                Add to Cart
                                                            </motion.button>
                                                            
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => deleteItem(index)}
                                                                className='border-2 border-slate-300 text-slate-700 px-6 py-2.5 rounded-xl font-semibold hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-300 flex items-center gap-2'
                                                            >
                                                                <HiOutlineTrash />
                                                                Remove
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </>
                    )}

                    {/* Continue Shopping */}
                    {WishList.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 text-center"
                        >
                            <Link to="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                                >
                                    Continue Shopping
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}
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
            </section>
        </>
    );
};

export default WishlistProducts;