import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart, WishListProduct } from './Slice/CartSlice';
import { useDispatch } from 'react-redux';
import RelatedProducts from './RelatedProducts';
import { apiData } from './ContextApi';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { IoRefreshCircleOutline } from "react-icons/io5";
import { TbCar, TbTruckDelivery } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BiShield, BiSupport } from "react-icons/bi";
import { HiOutlineTag } from "react-icons/hi";
import { BsCartPlusFill, BsBoxSeam } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

const SingleProduct = () => {
    const [info, setInfo] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setInfo(data);
            })
            .catch((error) => console.error("Error fetching product:", error));
    }, [id]);

    if (!info) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className='text-slate-600 text-lg'>Loading product details...</p>
                </div>
            </div>
        );
    }

    const products = useContext(apiData);
    const filterProducts = products.filter((item) => item.category === info.category);

    // Mock product images (in real app, use info.images)
    const productImages = info.images || [info.thumbnail, info.thumbnail, info.thumbnail, info.thumbnail];
    
    const colors = [
        { name: 'Green', class: 'bg-green-500' },
        { name: 'Red', class: 'bg-red-500' },
        { name: 'Blue', class: 'bg-blue-500' }
    ];

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    // Add to Cart
    const handleCart = () => {
        dispatch(addToCart({ ...info, qty: quantity }));
        toast.success(`${quantity} item(s) added to cart!`);
    };

    // Add to Wishlist
    const handleWishList = () => {
        dispatch(WishListProduct({ ...info, qty: 1 }));
        setIsWishlisted(!isWishlisted);
        toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
    };

    const incrementQuantity = () => {
        if (quantity < info.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <>
            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20 py-12 mt-[70px]">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 flex items-center gap-2 text-sm text-slate-600"
                    >
                        <span>Home</span>
                        <span>/</span>
                        <span className="capitalize">{info.category}</span>
                        <span>/</span>
                        <span className="text-slate-900 font-semibold truncate">{info.title}</span>
                    </motion.div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                        {/* Left Side - Product Images */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Main Image */}
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                                <div className="relative aspect-square flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={selectedImage}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            src={productImages[selectedImage]}
                                            alt={info.title}
                                            className='max-w-full max-h-full object-contain'
                                        />
                                    </AnimatePresence>
                                    
                                    {/* Discount Badge */}
                                    {info.discountPercentage > 0 && (
                                        <div className='absolute top-4 left-4'>
                                            <div className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg'>
                                                -{info.discountPercentage}% OFF
                                            </div>
                                        </div>
                                    )}

                                    {/* Stock Badge */}
                                    <div className='absolute top-4 right-4'>
                                        <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                                            info.stock > 10 
                                                ? 'bg-green-500 text-white' 
                                                : 'bg-orange-500 text-white'
                                        }`}>
                                            {info.stock > 10 ? 'In Stock' : `Only ${info.stock} left`}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="grid grid-cols-4 gap-4">
                                {productImages.map((img, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                                            selectedImage === index
                                                ? 'border-red-500 shadow-lg'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Product ${index + 1}`}
                                            className='w-full h-full object-cover'
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Side - Product Details */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className='space-y-6'
                        >
                            {/* Product Title */}
                            <div>
                                <h1 className='text-3xl lg:text-4xl font-bold text-slate-900 mb-3'>{info.title}</h1>
                                
                                {/* Rating & Reviews */}
                                <div className='flex items-center gap-4 flex-wrap'>
                                    <div className='flex items-center gap-1'>
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className='text-yellow-500 text-lg' />
                                        ))}
                                    </div>
                                    <span className='text-slate-600'>(130 Reviews)</span>
                                    <div className='flex items-center gap-2 pl-4 border-l-2 border-slate-300'>
                                        <MdVerified className="text-green-500 text-xl" />
                                        <span className='text-green-600 font-semibold'>{info.availabilityStatus}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200">
                                <div className='flex items-baseline gap-3'>
                                    <span className='text-4xl font-bold text-red-500'>${info.price.toFixed(2)}</span>
                                    {info.discountPercentage > 0 && (
                                        <span className='text-xl text-slate-400 line-through'>
                                            ${(info.price * 1.2).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-600 mt-2">Tax included. Shipping calculated at checkout.</p>
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200">
                                <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
                                <p className='text-slate-600 leading-relaxed'>{info.description}</p>
                            </div>

                            {/* Product Details Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-4 border border-slate-200">
                                    <p className="text-sm text-slate-500 mb-1">Category</p>
                                    <p className="font-semibold text-slate-900 capitalize">{info.category}</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-slate-200">
                                    <p className="text-sm text-slate-500 mb-1">Brand</p>
                                    <p className="font-semibold text-slate-900 capitalize">{info.brand || 'Generic'}</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-slate-200">
                                    <p className="text-sm text-slate-500 mb-1">Warranty</p>
                                    <p className="font-semibold text-slate-900 text-sm">{info.warrantyInformation || 'N/A'}</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-slate-200">
                                    <p className="text-sm text-slate-500 mb-1">Stock</p>
                                    <p className="font-semibold text-green-600">{info.stock} units available</p>
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div>
                                <p className='text-lg font-semibold text-slate-900 mb-3'>Color</p>
                                <div className='flex items-center gap-3'>
                                    {colors.map((color, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSelectedColor(index)}
                                            className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${color.class} ${
                                                selectedColor === index
                                                    ? 'border-slate-900 ring-4 ring-slate-200'
                                                    : 'border-slate-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <p className='text-lg font-semibold text-slate-900 mb-3'>Size</p>
                                <div className='flex items-center gap-3'>
                                    {sizes.map((size) => (
                                        <motion.button
                                            key={size}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                selectedSize === size
                                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                                                    : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-slate-400'
                                            }`}
                                        >
                                            {size}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & Actions */}
                            <div className='flex items-center gap-4 flex-wrap'>
                                {/* Quantity Selector */}
                                <div className="flex items-center border-2 border-slate-300 rounded-xl overflow-hidden">
                                    <button
                                        onClick={decrementQuantity}
                                        className='px-6 py-3 hover:bg-slate-100 transition-colors duration-300 font-bold text-xl'
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, Math.min(info.stock, parseInt(e.target.value) || 1)))}
                                        className='w-20 text-center outline-none font-semibold text-lg'
                                    />
                                    <button
                                        onClick={incrementQuantity}
                                        className='px-6 py-3 hover:bg-slate-100 transition-colors duration-300 font-bold text-xl'
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Add to Cart Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCart}
                                    className='flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2'
                                >
                                    <BsCartPlusFill className="text-xl" />
                                    Add to Cart
                                </motion.button>

                                {/* Wishlist Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleWishList}
                                    className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                                        isWishlisted
                                            ? 'bg-red-500 border-red-500 text-white'
                                            : 'bg-white border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-500'
                                    }`}
                                >
                                    {isWishlisted ? <IoMdHeart className="text-2xl" /> : <IoMdHeartEmpty className="text-2xl" />}
                                </motion.button>
                            </div>

                            {/* Service Features */}
                            <div className='space-y-3'>
                                <div className='flex items-center gap-4 bg-white border-2 border-slate-200 rounded-xl p-4 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300'>
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <TbTruckDelivery className='text-white text-2xl' />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className='font-semibold text-slate-900'>Free Delivery</h3>
                                        <p className='text-sm text-slate-600'>Enter your postal code for delivery availability</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4 bg-white border-2 border-slate-200 rounded-xl p-4 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300'>
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <IoRefreshCircleOutline className='text-white text-2xl' />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className='font-semibold text-slate-900'>Return Policy</h3>
                                        <p className='text-sm text-slate-600'>{info.returnPolicy || '30 day return policy'}</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4 bg-white border-2 border-slate-200 rounded-xl p-4 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300'>
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <BiShield className='text-white text-2xl' />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className='font-semibold text-slate-900'>Secure Payment</h3>
                                        <p className='text-sm text-slate-600'>100% secure transaction guarantee</p>
                                    </div>
                                </div>
                            </div>
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

            <RelatedProducts filterProducts={filterProducts} />
        </>
    );
};

export default SingleProduct;