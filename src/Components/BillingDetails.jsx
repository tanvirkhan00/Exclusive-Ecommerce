import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';

// Icons
import { CiSquareCheck } from "react-icons/ci";
import { BiLockAlt, BiCheck } from "react-icons/bi";
import { FiCreditCard, FiTruck, FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";
import { HiOutlineTag } from "react-icons/hi";

// Images
import Bkash from "/src/assets/Bkash.png";
import Visa from "/src/assets/Visa.png";
import Nagad from "/src/assets/Nagad.png";
import MasterCart from "/src/assets/Mastercard.png";

import { useSelector } from 'react-redux';

const BillingDetails = () => {
    const navigate = useNavigate();
    const cartProduct = useSelector((state) => state.product.CartItem);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        street: '',
        apartment: '',
        city: '',
        phone: '',
        email: '',
        saveInfo: false
    });

    const [paymentMethod, setPaymentMethod] = useState('bank');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [focusedField, setFocusedField] = useState(null);

    const subtotal = cartProduct.reduce((acc, curr) => {
        return acc + (curr.price * curr.qty);
    }, 0);

    const discount = appliedCoupon ? subtotal * 0.1 : 0;
    const shippingCost = 0; // Free shipping
    const total = subtotal - discount + shippingCost;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

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

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.firstName || !formData.email || !formData.phone || !formData.street || !formData.city) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Simulate order placement
        toast.success('Order placed successfully!');
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    const steps = [
        { number: 1, title: 'Cart', completed: true },
        { number: 2, title: 'Checkout', completed: false },
        { number: 3, title: 'Complete', completed: false }
    ];

    return (
        <>
            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20 py-12 lg:mt-[100px]">
                <div className="container mx-auto px-4">
                    {/* Progress Steps */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-center mb-8">
                            {steps.map((step, index) => (
                                <React.Fragment key={step.number}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                                            step.completed 
                                                ? 'bg-green-500 text-white' 
                                                : index === 1 
                                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                                                    : 'bg-slate-200 text-slate-500'
                                        }`}>
                                            {step.completed ? <BiCheck className="text-2xl" /> : step.number}
                                        </div>
                                        <span className={`text-sm mt-2 font-semibold ${
                                            index === 1 ? 'text-red-500' : 'text-slate-500'
                                        }`}>
                                            {step.title}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-24 h-1 mx-4 ${
                                            step.completed ? 'bg-green-500' : 'bg-slate-200'
                                        }`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="text-center">
                            <h1 className='text-4xl lg:text-5xl font-bold text-slate-900 mb-3'>Checkout</h1>
                            <p className="text-slate-600">Complete your purchase securely</p>
                        </div>
                    </motion.div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Billing Form */}
                        <div className='lg:col-span-2'>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <FiUser className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h2 className='text-2xl font-bold text-slate-900'>Billing Details</h2>
                                        <p className="text-sm text-slate-500">Enter your shipping information</p>
                                    </div>
                                </div>

                                <form onSubmit={handlePlaceOrder} className='space-y-6'>
                                    {/* Name Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className='flex flex-col gap-2'
                                        >
                                            <label className='text-sm font-semibold text-slate-700 flex items-center gap-1'>
                                                First Name <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('firstName')}
                                                onBlur={() => setFocusedField(null)}
                                                className={`bg-slate-50 outline-none rounded-xl py-3 px-4 border-2 transition-all duration-300 ${
                                                    focusedField === 'firstName'
                                                        ? 'border-red-500 bg-white shadow-lg shadow-red-500/10'
                                                        : 'border-slate-200 hover:border-slate-300'
                                                }`}
                                                type="text"
                                                placeholder="John"
                                                required
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 }}
                                            className='flex flex-col gap-2'
                                        >
                                            <label className='text-sm font-semibold text-slate-700'>
                                                Last Name
                                            </label>
                                            <input 
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('lastName')}
                                                onBlur={() => setFocusedField(null)}
                                                className={`bg-slate-50 outline-none rounded-xl py-3 px-4 border-2 transition-all duration-300 ${
                                                    focusedField === 'lastName'
                                                        ? 'border-red-500 bg-white shadow-lg shadow-red-500/10'
                                                        : 'border-slate-200 hover:border-slate-300'
                                                }`}
                                                type="text"
                                                placeholder="Doe"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Company */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className='flex flex-col gap-2'
                                    >
                                        <label className='text-sm font-semibold text-slate-700'>
                                            Company Name <span className="text-slate-400 text-xs">(optional)</span>
                                        </label>
                                        <input 
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('company')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`bg-slate-50 outline-none rounded-xl py-3 px-4 border-2 transition-all duration-300 ${
                                                focusedField === 'company'
                                                    ? 'border-red-500 bg-white shadow-lg shadow-red-500/10'
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                            type="text"
                                            placeholder="Your Company Ltd."
                                        />
                                    </motion.div>

                                    {/* Address */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                        className='flex flex-col gap-2'
                                    >
                                        <label className='text-sm font-semibold text-slate-700 flex items-center gap-1'>
                                            <FiMapPin className="text-red-500" />
                                            Street Address <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            name="street"
                                            value={formData.street}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('street')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`bg-slate-50 outline-none rounded-xl py-3 px-4 border-2 transition-all duration-300 ${
                                                focusedField === 'street'
                                                    ? 'border-red-500 bg-white shadow-lg shadow-red-500/10'
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                            type="text"
                                            placeholder="123 Main Street"
                                            required
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className='flex flex-col gap-2'
                                    >
                                        <label className='text-sm font-semibold text-slate-700'>
                                            Apartment, suite, etc. <span className="text-slate-400 text-xs">(optional)</span>
                                        </label>
                                        <input 
                                            name="apartment"
                                            value={formData.apartment}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('apartment')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`bg-slate-50 outline-none rounded-xl py-3 px-4 border-2 transition-all duration-300 ${
                                                focusedField === 'apartment'
                                                    ? 'border-red-500 bg-white shadow-lg shadow-red-500/10'
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                            type="text"
                                            placeholder="Apt 4B"
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35 }}
                                        className='flex flex-col gap-2'
                                    >
                                        <label className='text-sm font-semibold text-slate-700 flex items-center gap-1'>
                                            Town/City <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('city')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`bg-slate-50 outline-none rounded-xl py-3 px-4 border-2 transition-all duration-300 ${
                                                focusedField === 'city'
                                                    ? 'border-red-500 bg-white shadow-lg shadow-red-500/10'
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                            type="text"
                                            placeholder="Dhaka"
                                            required
                                        />
                                    </motion.div>

                                    {/* Contact Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className='flex flex-col gap-2'
                                        >
                                            <label className='text-sm font-semibold text-slate-700 flex items-center gap-1'>
                                                <FiPhone className="text-red-500" />
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('phone')}
                                                onBlur={() => setFocusedField(null)}
                                                className={`bg-slate-50 outline-none rounded-xl py-3 px-4 border-2 transition-all duration-300 ${
                                                    focusedField === 'phone'
                                                        ? 'border-red-500 bg-white shadow-lg shadow-red-500/10'
                                                        : 'border-slate-200 hover:border-slate-300'
                                                }`}
                                                type="tel"
                                                placeholder="+880 1234567890"
                                                required
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.45 }}
                                            className='flex flex-col gap-2'
                                        >
                                            <label className='text-sm font-semibold text-slate-700 flex items-center gap-1'>
                                                <FiMail className="text-red-500" />
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                className={`bg-slate-50 outline-none rounded-xl py-3 px-4 border-2 transition-all duration-300 ${
                                                    focusedField === 'email'
                                                        ? 'border-red-500 bg-white shadow-lg shadow-red-500/10'
                                                        : 'border-slate-200 hover:border-slate-300'
                                                }`}
                                                type="email"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Save Info Checkbox */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className='flex items-center gap-3 bg-slate-50 p-4 rounded-xl border-2 border-slate-200'
                                    >
                                        <input 
                                            type="checkbox"
                                            id="saveInfo"
                                            name="saveInfo"
                                            checked={formData.saveInfo}
                                            onChange={handleInputChange}
                                            className='w-5 h-5 accent-red-500 cursor-pointer'
                                        />
                                        <label htmlFor="saveInfo" className='text-sm text-slate-700 cursor-pointer flex items-center gap-2'>
                                            <CiSquareCheck className='text-2xl text-red-500' />
                                            Save this information for faster checkout next time
                                        </label>
                                    </motion.div>
                                </form>
                            </motion.div>
                        </div>

                        {/* Order Summary */}
                        <div className='lg:col-span-1'>
                            <div className="sticky top-8 space-y-6">
                                {/* Order Items */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
                                >
                                    <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
                                    
                                    <div className='space-y-4 max-h-64 overflow-y-auto mb-6'>
                                        {cartProduct.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className='flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-300'
                                            >
                                                <Link to={`/shop/${item.id}`} className="flex-shrink-0">
                                                    <img 
                                                        src={item.thumbnail} 
                                                        alt={item.title}
                                                        className='h-16 w-16 object-cover rounded-lg' 
                                                    />
                                                </Link>
                                                <div className='flex-1 min-w-0'>
                                                    <h4 className='text-sm font-semibold text-slate-900 truncate'>{item.title}</h4>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <span className='text-xs text-slate-500'>Qty: {item.qty}</span>
                                                        <span className='text-sm font-bold text-red-500'>${item.price.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Pricing Breakdown */}
                                    <div className="space-y-4 border-t-2 border-slate-200 pt-4">
                                        <div className="flex justify-between text-slate-600">
                                            <span>Subtotal</span>
                                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-between text-slate-600">
                                            <div className="flex items-center gap-1">
                                                <MdLocalShipping />
                                                <span>Shipping</span>
                                            </div>
                                            <span className="font-semibold text-green-500">FREE</span>
                                        </div>

                                        {appliedCoupon && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount (10%)</span>
                                                <span className="font-semibold">-${discount.toFixed(2)}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center border-t-2 border-slate-200 pt-4">
                                            <span className="text-lg font-bold text-slate-900">Total</span>
                                            <span className="text-2xl font-bold text-red-500">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Payment Method */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <FiCreditCard className="text-2xl text-red-500" />
                                        <h3 className="text-xl font-bold text-slate-900">Payment Method</h3>
                                    </div>

                                    <div className='space-y-4'>
                                        {/* Bank Payment */}
                                        <div 
                                            onClick={() => setPaymentMethod('bank')}
                                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                                paymentMethod === 'bank'
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <div className='flex items-center justify-between mb-3'>
                                                <div className='flex items-center gap-3'>
                                                    <input 
                                                        type="radio" 
                                                        id='bank' 
                                                        name="payment" 
                                                        value="bank"
                                                        checked={paymentMethod === 'bank'}
                                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                                        className='w-5 h-5 accent-red-500'
                                                    />
                                                    <label htmlFor="bank" className='font-semibold text-slate-900 cursor-pointer'>
                                                        Bank / Card Payment
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-2 flex-wrap pl-8'>
                                                <img src={Bkash} alt="Bkash" className="h-8" />
                                                <img src={Visa} alt="Visa" className="h-8" />
                                                <img src={MasterCart} alt="Mastercard" className="h-8" />
                                                <img src={Nagad} alt="Nagad" className="h-8" />
                                            </div>
                                        </div>

                                        {/* Cash on Delivery */}
                                        <div 
                                            onClick={() => setPaymentMethod('cash')}
                                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                                paymentMethod === 'cash'
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <input 
                                                    type="radio" 
                                                    id='cash' 
                                                    name="payment" 
                                                    value="cash"
                                                    checked={paymentMethod === 'cash'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className='w-5 h-5 accent-red-500'
                                                />
                                                <label htmlFor="cash" className='font-semibold text-slate-900 cursor-pointer flex items-center gap-2'>
                                                    <FiTruck className="text-red-500" />
                                                    Cash on Delivery
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Coupon Code */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <HiOutlineTag className="text-xl text-red-500" />
                                        <h3 className="font-semibold text-slate-900">Discount Code</h3>
                                    </div>
                                    
                                    {!appliedCoupon ? (
                                        <div className='flex gap-2'>
                                            <input 
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Enter code"
                                                className='flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg outline-none focus:border-red-500 transition-colors duration-300'
                                            />
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleApplyCoupon}
                                                className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300'
                                            >
                                                Apply
                                            </motion.button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between bg-green-50 border-2 border-green-200 rounded-lg p-3">
                                            <div className="flex items-center gap-2">
                                                <BiCheck className="text-2xl text-green-600" />
                                                <span className="font-semibold text-green-700">{appliedCoupon} Applied</span>
                                            </div>
                                            <button 
                                                onClick={removeCoupon}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                    
                                    <p className="text-xs text-slate-500 mt-3">
                                        Try: <span className="font-semibold text-red-500">SAVE10</span> for 10% off
                                    </p>
                                </motion.div>

                                {/* Place Order Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handlePlaceOrder}
                                    className='w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2'
                                >
                                    <BiLockAlt className="text-xl" />
                                    Place Order - ${total.toFixed(2)}
                                </motion.button>

                                {/* Security Badge */}
                                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                                    <BiLockAlt />
                                    <span>Secure SSL encrypted checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default BillingDetails;