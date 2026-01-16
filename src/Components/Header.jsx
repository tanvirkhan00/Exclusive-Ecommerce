import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiData } from './ContextApi';
import { useSelector } from 'react-redux';

// Icons
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FaShopify } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const Header = () => {
    let accountRef = useRef();
    let menuRef = useRef();
    let searchRef = useRef();
    
    let [accountShow, setAccountShow] = useState(false);
    let [menuShow, setMenuShow] = useState(false);
    let [searchShow, setSearchShow] = useState(false);
    let [scrolled, setScrolled] = useState(false);
    
    let navigate = useNavigate();
    let location = useLocation();
    let data = useContext(apiData);
    
    let [searchItem, setSearchItem] = useState([]);
    let [inputValue, setInputValue] = useState("");

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle search
    let handleSearch = (e) => {
        setInputValue(e.target.value);
        if (e.target.value === "") {
            setSearchItem([]);
        } else {
            let filterData = data.filter((item) => 
                item.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchItem(filterData);
        }
    };

    let handleToDetails = (id) => {
        navigate(`/shop/${id}`);
        setInputValue("");
        setSearchItem([]);
        setSearchShow(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setAccountShow(false);
            }
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuShow(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuShow(false);
    }, [location.pathname]);

    // Cart Quantity
    let cartQuantity = useSelector((state) => state.product.CartItem);
    let arrayLength = cartQuantity.length;

    // Check if link is active
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <header className={`border-b-4 border-yellow-500 mx-auto fixed w-full z-50 top-0 left-0 transition-all duration-300 ${
                scrolled ? 'bg-blue-800 shadow-lg' : 'bg-blue-700'
            }`}>
                <div className="container mx-auto px-4 lg:px-6">
                    <div className='flex items-center justify-between h-20 lg:h-24 relative'>
                        
                        {/* Logo */}
                        <Link to="/" className="group">
                            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-500 transition-all duration-300 group-hover:text-yellow-400 group-hover:scale-105'>
                                Exclusive
                            </h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className='hidden md:block'>
                            <ul className='flex items-center gap-8 lg:gap-10'>
                                <Link to="/">
                                    <li className={`text-base lg:text-lg font-medium border-b-2 pb-1 transition-all duration-300 ${
                                        isActive('/') 
                                            ? 'border-yellow-500 text-yellow-500' 
                                            : 'border-transparent text-white hover:text-yellow-400 hover:-translate-y-0.5'
                                    }`}>
                                        Home
                                    </li>
                                </Link>
                                <Link to="/shop">
                                    <li className={`text-base lg:text-lg font-medium border-b-2 pb-1 transition-all duration-300 ${
                                        isActive('/shop') 
                                            ? 'border-yellow-500 text-yellow-500' 
                                            : 'border-transparent text-white hover:text-yellow-400 hover:-translate-y-0.5'
                                    }`}>
                                        Shop
                                    </li>
                                </Link>
                                <Link to="/about">
                                    <li className={`text-base lg:text-lg font-medium border-b-2 pb-1 transition-all duration-300 ${
                                        isActive('/about') 
                                            ? 'border-yellow-500 text-yellow-500' 
                                            : 'border-transparent text-white hover:text-yellow-400 hover:-translate-y-0.5'
                                    }`}>
                                        About
                                    </li>
                                </Link>
                                <Link to="/contact">
                                    <li className={`text-base lg:text-lg font-medium border-b-2 pb-1 transition-all duration-300 ${
                                        isActive('/contact') 
                                            ? 'border-yellow-500 text-yellow-500' 
                                            : 'border-transparent text-white hover:text-yellow-400 hover:-translate-y-0.5'
                                    }`}>
                                        Contact
                                    </li>
                                </Link>
                                <Link to="/signUp">
                                    <li className='px-5 py-2 bg-yellow-500 text-blue-900 font-semibold rounded-lg transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-0.5'>
                                        Sign Up
                                    </li>
                                </Link>
                            </ul>
                        </nav>

                        {/* Right Side Icons */}
                        <div className='flex items-center gap-4 lg:gap-6'>
                            
                            {/* Search Icon (Mobile) */}
                            <button 
                                onClick={() => setSearchShow(!searchShow)}
                                className='md:hidden text-2xl text-white transition-all duration-300 hover:text-yellow-400 hover:scale-110'
                            >
                                {searchShow ? <IoClose /> : <CiSearch />}
                            </button>

                            {/* Search Bar (Desktop) */}
                            <div ref={searchRef} className='hidden md:block relative'>
                                <div className='flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full border-2 border-white border-opacity-20 w-48 lg:w-64 transition-all duration-300 hover:bg-opacity-20 hover:border-opacity-40 focus-within:bg-opacity-20 focus-within:border-yellow-500'>
                                    <input 
                                        onChange={handleSearch} 
                                        value={inputValue} 
                                        className='bg-transparent flex-1 text-white placeholder-gray-300 outline-none text-sm' 
                                        type="text" 
                                        placeholder='Search products...' 
                                    />
                                    <CiSearch className='text-white text-xl' />
                                </div>
                                
                                {/* Search Results Dropdown */}
                                {searchItem.length > 0 && (
                                    <div className="absolute top-14 right-0 w-80 lg:w-96 max-h-96 bg-white rounded-lg shadow-2xl overflow-y-auto border-2 border-yellow-500 animate-fadeIn">
                                        {searchItem.map((item) => (
                                            <div 
                                                key={item.id}
                                                onClick={() => handleToDetails(item.id)} 
                                                className="flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 border-b last:border-b-0"
                                            >
                                                <img className='h-16 w-16 object-cover rounded-md' src={item.thumbnail} alt={item.title} />
                                                <div className='flex-1'>
                                                    <h2 className='font-semibold text-gray-800 text-sm line-clamp-1'>{item.title}</h2>
                                                    <h4 className='text-red-600 font-bold text-base mt-1'>$ {item.price}</h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Wishlist */}
                            <Link to="/wishList" className='relative group'>
                                <div className='text-2xl text-white transition-all duration-300 group-hover:text-red-500 group-hover:scale-110'>
                                    <CiHeart />
                                </div>
                            </Link>

                            {/* Cart */}
                            <Link to="/cart" className='relative group'>
                                <div className='text-2xl text-white transition-all duration-300 group-hover:text-yellow-400 group-hover:scale-110'>
                                    <IoCartOutline />
                                </div>
                                {arrayLength > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-white flex items-center justify-center text-xs font-bold animate-pulse'>
                                        {arrayLength}
                                    </span>
                                )}
                            </Link>

                            {/* Account */}
                            <div ref={accountRef} className='relative'>
                                <button 
                                    onClick={() => setAccountShow(!accountShow)}
                                    className='text-2xl text-white transition-all duration-300 hover:text-yellow-400 hover:scale-110'
                                >
                                    <VscAccount />
                                </button>

                                {/* Account Dropdown */}
                                {accountShow && (
                                    <div className='absolute right-0 top-12 bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-xl shadow-2xl p-6 w-64 border-2 border-yellow-500 animate-fadeIn'>
                                        <ul className='flex flex-col gap-3'>
                                            <Link to="/account" onClick={() => setAccountShow(false)}>
                                                <li className='flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10 cursor-pointer'>
                                                    <VscAccount className='text-xl' />
                                                    <span className='font-medium'>My Account</span>
                                                </li>
                                            </Link>
                                            <Link to="/cart" onClick={() => setAccountShow(false)}>
                                                <li className='flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10 cursor-pointer'>
                                                    <FaShopify className='text-xl' />
                                                    <span className='font-medium'>My Orders</span>
                                                </li>
                                            </Link>
                                            <li className='flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10 cursor-pointer'>
                                                <IoCloseCircleOutline className='text-xl' />
                                                <span className='font-medium'>Cancellations</span>
                                            </li>
                                            <li className='flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10 cursor-pointer'>
                                                <FaRegStar className='text-xl' />
                                                <span className='font-medium'>My Reviews</span>
                                            </li>
                                            <li className='flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-red-500 hover:bg-opacity-20 cursor-pointer text-red-400'>
                                                <CiLogout className='text-xl' />
                                                <span className='font-medium'>Logout</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button 
                                ref={menuRef}
                                onClick={() => setMenuShow(!menuShow)}
                                className='md:hidden text-2xl text-white transition-all duration-300 hover:text-yellow-400'
                            >
                                {menuShow ? <IoClose /> : <CiMenuFries />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    {searchShow && (
                        <div className='md:hidden pb-4 animate-fadeIn'>
                            <div className='flex items-center gap-2 px-4 py-2 bg-white rounded-lg'>
                                <input 
                                    onChange={handleSearch} 
                                    value={inputValue} 
                                    className='flex-1 outline-none text-gray-800' 
                                    type="text" 
                                    placeholder='Search products...' 
                                    autoFocus
                                />
                                <CiSearch className='text-gray-600 text-xl' />
                            </div>
                            
                            {/* Mobile Search Results */}
                            {searchItem.length > 0 && (
                                <div className="mt-2 max-h-64 bg-white rounded-lg shadow-lg overflow-y-auto">
                                    {searchItem.map((item) => (
                                        <div 
                                            key={item.id}
                                            onClick={() => handleToDetails(item.id)} 
                                            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                                        >
                                            <img className='h-12 w-12 object-cover rounded' src={item.thumbnail} alt={item.title} />
                                            <div>
                                                <h2 className='font-semibold text-gray-800 text-sm'>{item.title}</h2>
                                                <h4 className='text-red-600 font-bold text-sm'>$ {item.price}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu */}
                    {menuShow && (
                        <div className='md:hidden pb-4 animate-slideDown'>
                            <ul className='flex flex-col gap-3 bg-blue-800 rounded-lg p-4'>
                                <Link to="/" onClick={() => setMenuShow(false)}>
                                    <li className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                                        isActive('/') 
                                            ? 'bg-yellow-500 text-blue-900' 
                                            : 'text-white hover:bg-white hover:bg-opacity-10'
                                    }`}>
                                        Home
                                    </li>
                                </Link>
                                <Link to="/shop" onClick={() => setMenuShow(false)}>
                                    <li className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                                        isActive('/shop') 
                                            ? 'bg-yellow-500 text-blue-900' 
                                            : 'text-white hover:bg-white hover:bg-opacity-10'
                                    }`}>
                                        Shop
                                    </li>
                                </Link>
                                <Link to="/about" onClick={() => setMenuShow(false)}>
                                    <li className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                                        isActive('/about') 
                                            ? 'bg-yellow-500 text-blue-900' 
                                            : 'text-white hover:bg-white hover:bg-opacity-10'
                                    }`}>
                                        About
                                    </li>
                                </Link>
                                <Link to="/contact" onClick={() => setMenuShow(false)}>
                                    <li className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                                        isActive('/contact') 
                                            ? 'bg-yellow-500 text-blue-900' 
                                            : 'text-white hover:bg-white hover:bg-opacity-10'
                                    }`}>
                                        Contact
                                    </li>
                                </Link>
                                <Link to="/signUp" onClick={() => setMenuShow(false)}>
                                    <li className='py-2 px-4 bg-yellow-500 text-blue-900 font-semibold rounded-lg text-center transition-all duration-200 hover:bg-yellow-400'>
                                        Sign Up
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            {/* Add custom CSS animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        max-height: 0;
                    }
                    to {
                        opacity: 1;
                        max-height: 500px;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }

                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
};

export default Header;