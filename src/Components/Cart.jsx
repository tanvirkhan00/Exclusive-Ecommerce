import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { decrement, deletProduct, increment } from './Slice/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { IoIosCloseCircle } from "react-icons/io";
import { FiShoppingBag, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { BiLockAlt } from "react-icons/bi";
import { HiOutlineTag } from "react-icons/hi";
import { MdLocalShipping } from "react-icons/md";

const Cart = () => {
    const cartItems = useSelector((state) => state.product.CartItem);
    const dispatch = useDispatch();
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const handleIncrement = (itemId) => {
        dispatch(increment(itemId));
    };

    const handleDecrement = (itemId) => {
        dispatch(decrement(itemId));
    };

    const deleteItem = (itemId) => {
        dispatch(deletProduct(itemId));
        toast.success('Item removed from cart');
    };

    // Calculate totals
    const subtotal = cartItems.reduce((acc, curr) => {
        return acc + (curr.price * curr.qty);
    }, 0);

    const shippingCost = subtotal > 100 ? 0 : 15; // Free shipping over $100
    const discount = appliedCoupon ? subtotal * 0.1 : 0; // 10% discount if coupon applied
    const total = subtotal + shippingCost - discount;

    const handleApplyCoupon = () => {
        if (couponCode.toLowerCase() === 'save10') {
            setAppliedCoupon('SAVE10');
            toast.success('Coupon applied! 10% discount added');
        } else if (couponCode) {
            toast.error('Invalid coupon code');
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        toast.info('Coupon removed');
    };

    return (
        <>
            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20 py-12 lg:mt-[100px]">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FiShoppingBag className="text-3xl text-red-500" />
                            <h1 className="text-4xl font-bold text-slate-900">Shopping Cart</h1>
                        </div>
                        <p className="text-slate-600">
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </motion.div>

                    {cartItems.length === 0 ? (
                        // Empty Cart State
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <FiShoppingBag className="text-6xl text-slate-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                            <p className="text-slate-600 mb-8">Add some products to get started!</p>
                            <Link to="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Continue Shopping
                                </motion.button>
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {/* Table Header - Desktop Only */}
                                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white rounded-xl shadow-sm border border-slate-200">
                                    <div className="col-span-6 text-sm font-semibold text-slate-700">PRODUCT</div>
                                    <div className="col-span-2 text-sm font-semibold text-slate-700 text-center">PRICE</div>
                                    <div className="col-span-2 text-sm font-semibold text-slate-700 text-center">QUANTITY</div>
                                    <div className="col-span-2 text-sm font-semibold text-slate-700 text-right">TOTAL</div>
                                </div>

                                {/* Cart Items */}
                                <AnimatePresence>
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6">
                                                {/* Product Info */}
                                                <div className="md:col-span-6 flex items-center gap-4">
                                                    {/* Delete Button */}
                                                    <motion.button
                                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => deleteItem(index)}
                                                        className="text-slate-400 hover:text-red-500 transition-colors duration-300"
                                                    >
                                                        <FiTrash2 className="text-xl" />
                                                    </motion.button>

                                                    {/* Product Image */}
                                                    <Link to={`/shop/${item.id}`} className="flex-shrink-0">
                                                        <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden">
                                                            <img 
                                                                src={item.thumbnail} 
                                                                alt={item.title}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        </div>
                                                    </Link>

                                                    {/* Product Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <Link to={`/shop/${item.id}`}>
                                                            <h3 className="font-semibold text-slate-900 hover:text-red-500 transition-colors duration-300 truncate">
                                                                {item.title}
                                                            </h3>
                                                        </Link>
                                                        <p className="text-sm text-slate-500 mt-1">
                                                            SKU: {item.id}
                                                        </p>
                                                        {/* Mobile Price */}
                                                        <p className="md:hidden text-red-500 font-semibold mt-2">
                                                            Rs. {item.price.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Price - Desktop */}
                                                <div className="hidden md:flex md:col-span-2 items-center justify-center">
                                                    <p className="text-slate-900 font-semibold">
                                                        Rs. {item.price.toFixed(2)}
                                                    </p>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="md:col-span-2 flex items-center justify-center">
                                                    <div className="inline-flex items-center border-2 border-slate-200 rounded-lg overflow-hidden">
                                                        <motion.button
                                                            whileHover={{ backgroundColor: '#fee2e2' }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => handleDecrement(index)}
                                                            className="p-3 hover:bg-red-50 transition-colors duration-200"
                                                            disabled={item.qty <= 1}
                                                        >
                                                            <FiMinus className={`text-lg ${item.qty <= 1 ? 'text-slate-300' : 'text-slate-700'}`} />
                                                        </motion.button>
                                                        
                                                        <span className="px-6 py-3 font-semibold text-slate-900 border-x-2 border-slate-200">
                                                            {item.qty}
                                                        </span>
                                                        
                                                        <motion.button
                                                            whileHover={{ backgroundColor: '#fee2e2' }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => handleIncrement(index)}
                                                            className="p-3 hover:bg-red-50 transition-colors duration-200"
                                                        >
                                                            <FiPlus className="text-lg text-slate-700" />
                                                        </motion.button>
                                                    </div>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="md:col-span-2 flex items-center justify-end">
                                                    <p className="text-lg font-bold text-slate-900">
                                                        Rs. {(item.qty * item.price).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                                    <Link to="/shop" className="w-full sm:w-auto">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                                        >
                                            Continue Shopping
                                        </motion.button>
                                    </Link>
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full sm:w-auto border-2 border-red-500 text-red-500 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300"
                                    >
                                        Clear Cart
                                    </motion.button>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8 space-y-6">
                                    {/* Coupon Section */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
                                    >
                                        <div className="flex items-center gap-2 mb-4">
                                            <HiOutlineTag className="text-xl text-red-500" />
                                            <h3 className="font-semibold text-slate-900">Have a coupon?</h3>
                                        </div>
                                        
                                        {!appliedCoupon ? (
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                    placeholder="Enter code"
                                                    className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg outline-none focus:border-red-500 transition-colors duration-300"
                                                />
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleApplyCoupon}
                                                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                                                >
                                                    Apply
                                                </motion.button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between bg-green-50 border-2 border-green-200 rounded-lg p-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-sm">✓</span>
                                                    </div>
                                                    <span className="font-semibold text-green-700">{appliedCoupon}</span>
                                                </div>
                                                <button 
                                                    onClick={removeCoupon}
                                                    className="text-green-700 hover:text-green-900"
                                                >
                                                    <IoIosCloseCircle className="text-xl" />
                                                </button>
                                            </div>
                                        )}
                                        
                                        <p className="text-xs text-slate-500 mt-3">
                                            Try code: <span className="font-semibold text-red-500">SAVE10</span>
                                        </p>
                                    </motion.div>

                                    {/* Order Summary */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
                                    >
                                        <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
                                        
                                        <div className="space-y-4">
                                            {/* Subtotal */}
                                            <div className="flex justify-between text-slate-600">
                                                <span>Subtotal</span>
                                                <span className="font-semibold">Rs. {subtotal.toFixed(2)}</span>
                                            </div>

                                            {/* Shipping */}
                                            <div className="flex justify-between text-slate-600">
                                                <div className="flex items-center gap-1">
                                                    <MdLocalShipping className="text-lg" />
                                                    <span>Shipping</span>
                                                </div>
                                                <span className="font-semibold">
                                                    {shippingCost === 0 ? (
                                                        <span className="text-green-500">FREE</span>
                                                    ) : (
                                                        `Rs. ${shippingCost.toFixed(2)}`
                                                    )}
                                                </span>
                                            </div>

                                            {/* Discount */}
                                            {appliedCoupon && (
                                                <div className="flex justify-between text-green-600">
                                                    <span>Discount (10%)</span>
                                                    <span className="font-semibold">-Rs. {discount.toFixed(2)}</span>
                                                </div>
                                            )}

                                            {/* Free Shipping Progress */}
                                            {shippingCost > 0 && (
                                                <div className="pt-2">
                                                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                                                        <span>Free shipping at Rs. 100</span>
                                                        <span className="font-semibold">Rs. {(100 - subtotal).toFixed(2)} to go</span>
                                                    </div>
                                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(subtotal / 100) * 100}%` }}
                                                            transition={{ duration: 0.5 }}
                                                            className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="border-t-2 border-slate-200 pt-4 mt-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-lg font-bold text-slate-900">Total</span>
                                                    <span className="text-2xl font-bold text-red-500">Rs. {total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Checkout Button */}
                                        <Link to="/checkOut">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold mt-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                                <BiLockAlt className="text-xl" />
                                                Proceed to Checkout
                                            </motion.button>
                                        </Link>

                                        {/* Security Badge */}
                                        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-500">
                                            <BiLockAlt />
                                            <span>Secure checkout</span>
                                        </div>
                                    </motion.div>

                                    {/* Trust Badges */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="bg-slate-50 rounded-xl p-4 border border-slate-200"
                                    >
                                        <div className="grid grid-cols-2 gap-4 text-center text-sm">
                                            <div>
                                                <div className="text-2xl mb-1">🚚</div>
                                                <p className="font-semibold text-slate-900">Free Shipping</p>
                                                <p className="text-xs text-slate-500">On orders over Rs. 100</p>
                                            </div>
                                            <div>
                                                <div className="text-2xl mb-1">🔒</div>
                                                <p className="font-semibold text-slate-900">Secure Payment</p>
                                                <p className="text-xs text-slate-500">100% protected</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
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

export default Cart;