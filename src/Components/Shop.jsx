import React, { useContext, useEffect, useState } from 'react';
import { apiData } from './ContextApi';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, WishListProduct } from './Slice/CartSlice';

// Icon
import { CiStar } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";
import { FaCircleChevronUp } from "react-icons/fa6";
import { FaCircleChevronDown } from "react-icons/fa6";
import { IoFilterSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const Shop = () => {
    let products = useContext(apiData)
    let [category, setCategory] = useState([])
    let [categoryItem, setCategoryItem] = useState([])
    let [priceItem, setPriceItem] = useState([])
    let dispatch = useDispatch()
    let [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    let [currentPage, setCurrentPage] = useState(1)
    let [perPage, setPerPage] = useState(15)

    let lastItemIndex = currentPage * perPage
    let firstItemIndex = lastItemIndex - perPage
    let currentItems = products.slice(firstItemIndex, lastItemIndex)

    let pageNumber = Math.ceil(products.length / perPage);
    let pageNumbers = []

    for (let i = 1; i <= pageNumber; i++) {
        pageNumbers.push(i);
    }

    let handlePage = (item) => {
        setCurrentPage(item)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        setCategory([...new Set(products.map((item) => item.category))])
    }, [products])

    let handleCategory = (cat) => {
        let filteredCat = products.filter((item) => item.category == cat)
        setCategoryItem(filteredCat)
        setPriceItem([])
        setCurrentPage(1)
        setIsMobileFilterOpen(false)
    }

    let priceWiseItems = (value) => {
        let priceFilter = products.filter((item) => item.price >= value.low && item.price <= value.high)
        setPriceItem(priceFilter)
        setCategoryItem([])
        setCurrentPage(1)
        setIsMobileFilterOpen(false)
    }

    let handleCart = (item) => {
        dispatch(addToCart({ ...item, qty: 1 }))
    }

    let handleWishList = (itemId) => {
        dispatch(WishListProduct({ ...itemId, qty: 1 }))
    }

    let HandlePagePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    let HandlePageNext = () => {
        if (currentPage !== pageNumber) {
            setCurrentPage(currentPage + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    let handleShowByNumber = (e) => {
        let inputValue = Number(e.target.value) || 15;
        setPerPage(inputValue)
        setCurrentPage(1)
    }

    let [limitedItems, setLimitedItems] = useState([]);
    useEffect(() => {
        let filteredItems = priceItem.slice(0, 6)
        setLimitedItems(filteredItems)
    }, [priceItem])

    let handleShowAll = () => {
        setLimitedItems(priceItem)
    }

    let handleHide = () => {
        let ddd = limitedItems.slice(0, 6)
        setLimitedItems(ddd)
    }

    let [limitedItemsCategory, setLimitedItemsCategory] = useState([]);
    useEffect(() => {
        let filteredItemsCategory = categoryItem.slice(0, 6)
        setLimitedItemsCategory(filteredItemsCategory)
    }, [categoryItem])

    let handleShowAllCategory = () => {
        setLimitedItemsCategory(categoryItem)
    }

    let handleHideCategory = () => {
        let sliceItem = limitedItemsCategory.slice(0, 6)
        setLimitedItemsCategory(sliceItem)
    }

    let clearFilters = () => {
        setCategoryItem([])
        setPriceItem([])
        setCurrentPage(1)
    }

    // Product Card Component
    const ProductCard = ({ item }) => (
        <div className='group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'>
            {/* Image Container */}
            <div className='relative bg-gradient-to-br from-gray-100 to-gray-50 aspect-square overflow-hidden'>
                <Link to={`/shop/${item.id}`}>
                    <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700' 
                    />
                </Link>
                
                {/* Discount Badge */}
                <div className='absolute top-4 left-4 z-10'>
                    <span className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg'>
                        -{Math.round(item.discountPercentage)}% OFF
                    </span>
                </div>

                {/* Quick Actions */}
                <div className='absolute top-4 right-4 flex flex-col gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 z-10'>
                    <button 
                        onClick={() => handleWishList(item)}
                        className='bg-white p-3 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110'
                    >
                        <CiHeart className='text-xl' />
                    </button>
                    <Link to={`/shop/${item.id}`}>
                        <button className='bg-white p-3 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110'>
                            <IoEyeOutline className='text-xl' />
                        </button>
                    </Link>
                </div>

                {/* Add to Cart Overlay */}
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                    <button 
                        onClick={() => handleCart(item)}
                        className='w-full bg-white text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors duration-300'
                    >
                        <BsCartPlusFill className='text-lg' />
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className='p-4'>
                <h3 className='font-bold text-gray-800 text-sm mb-2 truncate group-hover:text-blue-600 transition-colors duration-300'>
                    {item.title}
                </h3>
                
                <div className='flex items-center justify-between mb-2'>
                    <span className='text-xl font-bold text-red-500'>${item.price}</span>
                    <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className='text-yellow-400 text-xs' />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Filter Sidebar Component
    const FilterSidebar = ({ isMobile = false }) => (
        <div className={`${isMobile ? 'fixed inset-0 bg-black/50 z-50' : ''}`}>
            <div className={`${
                isMobile 
                    ? 'fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto' 
                    : 'sticky top-24'
            }`}>
                {isMobile && (
                    <div className='flex items-center justify-between p-6 border-b'>
                        <h2 className='text-2xl font-bold'>Filters</h2>
                        <button onClick={() => setIsMobileFilterOpen(false)} className='p-2 hover:bg-gray-100 rounded-full'>
                            <IoClose className='text-2xl' />
                        </button>
                    </div>
                )}

                <div className='p-6 space-y-8'>
                    {/* Clear Filters */}
                    {(categoryItem.length > 0 || priceItem.length > 0) && (
                        <button 
                            onClick={clearFilters}
                            className='w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 font-semibold'
                        >
                            Clear All Filters
                        </button>
                    )}

                    {/* Categories */}
                    <div>
                        <h3 className='text-lg font-bold mb-4 flex items-center gap-2'>
                            <span className='w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full'></span>
                            Categories
                        </h3>
                        <div className='space-y-2 max-h-64 overflow-y-auto custom-scrollbar'>
                            {category.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCategory(item)}
                                    className='w-full text-left px-4 py-3 rounded-lg capitalize text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 border border-transparent hover:border-blue-200'
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className='text-lg font-bold mb-4 flex items-center gap-2'>
                            <span className='w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full'></span>
                            Price Range
                        </h3>
                        <div className='space-y-2'>
                            {[
                                { label: '$1 - $100', value: { low: 1, high: 100 } },
                                { label: '$101 - $500', value: { low: 101, high: 500 } },
                                { label: '$501 - $1,000', value: { low: 501, high: 1000 } },
                                { label: '$1,001 - $5,000', value: { low: 1001, high: 5000 } },
                                { label: '$5,000+', value: { low: 5001, high: 1000000 } }
                            ].map((range, index) => (
                                <button
                                    key={index}
                                    onClick={() => priceWiseItems(range.value)}
                                    className='w-full text-left px-4 py-3 rounded-lg text-sm hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600 transition-all duration-300 border border-transparent hover:border-green-200'
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <section className='bg-gradient-to-b from-gray-50 to-white min-h-screen'>
                <div className="container mx-auto px-4 pt-32 pb-16">
                    {/* Header */}
                    <div className='mb-12'>
                        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                            Discover Our Collection
                        </h1>
                        <p className='text-gray-600 text-lg'>
                            Explore {products.length}+ amazing products
                        </p>
                    </div>

                    <div className='flex gap-8'>
                        {/* Desktop Sidebar */}
                        <div className='hidden lg:block w-72 flex-shrink-0'>
                            <FilterSidebar />
                        </div>

                        {/* Main Content */}
                        <div className='flex-1'>
                            {/* Toolbar */}
                            <div className='bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-wrap items-center justify-between gap-4'>
                                <div className='flex items-center gap-4 flex-wrap'>
                                    <button 
                                        onClick={() => setIsMobileFilterOpen(true)}
                                        className='lg:hidden flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300'
                                    >
                                        <IoFilterSharp />
                                        Filters
                                    </button>
                                    
                                    <input 
                                        onChange={handleShowByNumber}
                                        type="number" 
                                        placeholder='Items per page'
                                        className='px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 w-40'
                                    />
                                </div>

                                <div className='flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl'>
                                    <span className='font-semibold'>Showing:</span>
                                    <span className='text-blue-600 font-bold'>{firstItemIndex + 1} - {Math.min(lastItemIndex, products.length)}</span>
                                    <span>of {products.length}</span>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div>
                                {categoryItem.length > 0 ? (
                                    <div className='space-y-8'>
                                        <div className='bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg'>
                                            <p className='text-blue-800 font-semibold'>
                                                Filtered by category • {categoryItem.length} products found
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {limitedItemsCategory.map((item) => (
                                                <ProductCard key={item.id} item={item} />
                                            ))}
                                        </div>
                                        <div className='flex justify-center'>
                                            {limitedItemsCategory.length > 6 ? (
                                                <button 
                                                    className='bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 group' 
                                                    onClick={handleHideCategory}
                                                >
                                                    Show Less 
                                                    <FaCircleChevronUp className='text-xl group-hover:-translate-y-1 transition-transform duration-300' />
                                                </button>
                                            ) : (
                                                <button 
                                                    className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 group ${limitedItemsCategory.length > 5 ? "opacity-100" : "opacity-0"}`} 
                                                    onClick={handleShowAllCategory}
                                                >
                                                    Show All 
                                                    <FaCircleChevronDown className='text-xl group-hover:translate-y-1 transition-transform duration-300' />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : priceItem.length > 0 ? (
                                    <div className='space-y-8'>
                                        <div className='bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg'>
                                            <p className='text-green-800 font-semibold'>
                                                Filtered by price • {priceItem.length} products found
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {limitedItems.map((item) => (
                                                <ProductCard key={item.id} item={item} />
                                            ))}
                                        </div>
                                        <div className='flex justify-center'>
                                            {limitedItems.length > 6 ? (
                                                <button 
                                                    className='bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 group' 
                                                    onClick={handleHide}
                                                >
                                                    Show Less 
                                                    <FaCircleChevronUp className='text-xl group-hover:-translate-y-1 transition-transform duration-300' />
                                                </button>
                                            ) : (
                                                <button 
                                                    className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 group' 
                                                    onClick={handleShowAll}
                                                >
                                                    Show All 
                                                    <FaCircleChevronDown className='text-xl group-hover:translate-y-1 transition-transform duration-300' />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {currentItems.map((item) => (
                                            <ProductCard key={item.id} item={item} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {!categoryItem.length && !priceItem.length && (
                                <div className='flex justify-center items-center gap-2 mt-12 flex-wrap'>
                                    <button 
                                        className='px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                        onClick={HandlePagePrev}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    
                                    <div className='flex gap-2 flex-wrap'>
                                        {pageNumbers.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => handlePage(item)}
                                                className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                                                    item === currentPage 
                                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-110' 
                                                        : 'bg-white border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>

                                    <button 
                                        className='px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                        onClick={HandlePageNext}
                                        disabled={currentPage === pageNumber}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Modal */}
                {isMobileFilterOpen && (
                    <FilterSidebar isMobile={true} />
                )}

                <ToastContainer
                    position="top-right"
                    autoClose={1000}
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

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #2563eb, #7c3aed);
                }
            `}</style>
        </>
    );
};

export default Shop;