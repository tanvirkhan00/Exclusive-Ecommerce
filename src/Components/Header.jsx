import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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



const Header = () => {

    let accountRef = useRef()
    let [accountShow, setAccountShow] = useState(false)
    let navigate = useNavigate()
    let data = useContext(apiData)
    let [searchItem, setSearchItem] = useState([])
    let [inputValue, setInputValue] = useState("")

    let handleSearch = (e) => {
        setInputValue(e.target.value)
        if (e.target.value == "") {
            setSearchItem([])
        } else {
            let filterData = data.filter((item) => item.title.toLowerCase().startsWith(e.target.value.toLowerCase()))
            setSearchItem(filterData)
        }
    }

    let handleToDetails = (id) => {
        navigate(`/shop/${id}`)
        setInputValue("")
        setSearchItem([])

    }

    document.addEventListener("click", (e) => {
        if (accountRef.current.contains(e.target)) {
            setAccountShow(!accountShow)
        } else {
            setAccountShow(false)
        }
    })

    // Cart Quantity
    let cartQuantity = useSelector((state) => state.product.CartItem)

    let arrayLength = cartQuantity.length

    let menuRef = useRef()

    let [menuShow, setMenuShow] = useState(false)

    document.addEventListener('click', (e)=>{
        if(menuRef.current.contains(e.target)){
            setMenuShow(!menuShow)
        } else {
            setMenuShow(false)
        }
    })

    return (
        <>

            <header className='border-b-4 border-yellow-500 mx-auto fixed w-full bg-blue-700 z-50 top-0 left-0'>
                <div className="container px-[10px]">
                    <div className='flex items-center justify-between h-[80px] relative '>
                        <Link to="/"><h1 className='text-[30px] font-bold text-yellow-500'>Exclusive</h1></Link>
                        <div className=''>
                            <ul className={`md:flex items-center md:gap-6 ${menuShow === true ? "block" : "hidden" }`}>
                                <Link to="/"><li className="border-b-4 border-transparent duration-500 ease-in-out hover:-translate-y-1 hover:border-black hover:text-white">Home</li></Link>
                                <Link to="/contact"><li className="border-b-4 border-transparent duration-500 ease-in-out hover:-translate-y-1 hover:border-black hover:text-white">Contact</li></Link>
                                <Link to="/shop"><li className="border-b-4 border-transparent duration-500 ease-in-out hover:-translate-y-1 hover:border-black hover:text-white">Shop</li></Link>
                                <Link to="/about"><li className="border-b-4 border-transparent duration-500 ease-in-out hover:-translate-y-1 hover:border-black hover:text-white">About</li></Link>
                                <Link to="/signUp"><li className="border-b-4 border-transparent duration-500 ease-in-out hover:-translate-y-1 hover:border-black hover:text-white">Sign Up</li></Link>
                            </ul>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='md:flex items-center gap-3 px-2 duration-300 border-2 border-white rounded-md border-transparent md:w-[130px] lg:w-[250px]  overflow-hidden hover:border-black hidden'>
                                <input onChange={handleSearch} value={inputValue} className='bg-transparent px-2 py-2  outline-none' type="text" placeholder='What are you looking for?' />
                                <CiSearch />
                                {searchItem.length > 0 &&
                                    <div className="absolute top-16 right-0 w-[350px] z-50 h-[500px] border-2 border-black bg-white overflow-y-scroll flex flex-col gap-3 p-2">
                                        {searchItem.map((item) => (
                                            <div onClick={() => handleToDetails(item.id)} className="flex items-center gap-2 shadow-sm shadow-black  p-1">
                                                <img className='h-[60px]' src={item.thumbnail} alt="" />
                                                <div>
                                                    <h2 className='font-semibold text-[16px]'>{item.title}</h2>
                                                    <h4 className='text-red-700 text-[14px]'>$ {item.price}</h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                            <a className='cursor-pointer text-[20px] duration-300 hover:text-red-600 hover:-translate-y-1'><Link to="/wishList"><CiHeart /></Link></a>
                            <div className='relative'>
                                <a className='cursor-pointer text-[20px] duration-300 hover:text-red-600 hover:-translate-y-1'><Link to="/cart"><IoCartOutline /> </Link></a>
                                <span className='absolute -top-4 -right-2 bg-red-500 rounded-full w-[20px] h-[20px] text-white flex items-center justify-center text-[14px]'>{arrayLength}</span>
                            </div>
                            <a ref={accountRef} className='cursor-pointer text-[20px] duration-300 hover:text-red-600 hover:-translate-y-1'><VscAccount /></a>
                        </div>
                        {accountShow &&
                            <div className='absolute right-0 top-[65px] bg-black text-white z-50 bg-opacity-90 p-[30px] rounded-md border-2 border-yellow-500'>
                                <ul className='flex flex-col gap-2 text-[20px]'>
                                    <Link to="/account"><li className='flex items-center gap-4 cursor-pointer'><span><VscAccount /></span>Manage My Account</li></Link>
                                    <Link to="/cart"><li className='flex items-center gap-4 cursor-pointer'><span><FaShopify /></span> My Order</li></Link>
                                    <li className='flex items-center gap-4 cursor-pointer'><span><IoCloseCircleOutline /></span>My Cancellations</li>
                                    <li className='flex items-center gap-4 cursor-pointer'><span><FaRegStar /></span>My Reviews</li>
                                    <li className='flex items-center gap-4 cursor-pointer'><span><CiLogout /></span>Logout</li>
                                </ul>
                            </div>
                        }
                        <span ref={menuRef} className='text-[25px] hover:text-yellow-500 md:hidden'><CiMenuFries/></span>
                    </div>
                </div>

            </header>
        </>
    );
};

export default Header;