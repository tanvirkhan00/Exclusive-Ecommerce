import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiData } from './ContextApi';

// Icons
import { FaChevronDown } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FaShopify } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";


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

    // document.addEventListener("click", (e) => {
    //     if (accountRef.current.contains(e.target)) {
    //         setAccountShow(!accountShow)
    //     } else {
    //         setAccountShow(false)
    //     }
    // })


    return (
        <>

            <header className='border-b-2 border-slate-300'>
                <div className='bg-black py-2 text-[14px] text-white flex items-center justify-center gap-[300px]'>
                    <p className='text-center'>Summer Sale For All Swim Suits And Free Express Delivery-Off 50%!  <Link to="/shop"><span className='font-bold hover:text-red-500'> ShopNow</span></Link></p>
                    <h3 className='flex items-center gap-2'>English <FaChevronDown /></h3>
                </div>
                <div className="container mx-auto ">
                    <div className='flex items-center justify-between gap-2 h-[80px] relative'>
                        <Link to="/"><h1 className='text-[50px] font-bold text-yellow-500'>Exclusive</h1></Link>
                        <div>
                            <ul className='flex items-center gap-6'>
                                <Link to="/"><li className="border-b-4 border-transparent duration-300 ease-in-out hover:-translate-y-1 hover:border-black">Home</li></Link>
                                <Link to="/contact"><li className="border-b-4 border-transparent duration-300 ease-in-out hover:-translate-y-1 hover:border-black">Contact</li></Link>
                                <Link to="/about"><li className="border-b-4 border-transparent duration-300 ease-in-out hover:-translate-y-1 hover:border-black">About</li></Link>
                                <Link to="/signUp"><li className="border-b-4 border-transparent duration-300 ease-in-out hover:-translate-y-1 hover:border-black">Sign Up</li></Link>
                            </ul>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='flex items-center gap-3 bg-slate-200 px-2 duration-300 border-2 border-transparent hover:border-black'>
                                <input onChange={handleSearch} value={inputValue} className='bg-transparent px-2 py-2  outline-none' type="text" placeholder='What are you looking for?' />
                                <CiSearch />
                                {searchItem.length > 0 &&
                                    <div className="absolute top-16 right-0 w-[350px] z-50 h-[500px] border-2 border-black bg-white overflow-y-scroll flex flex-col gap-3 p-2">
                                        {searchItem.map((item) => (
                                            <div onClick={() => handleToDetails(item.id)} className="flex items-center gap-2 shadow-sm shadow-black  p-2">
                                                <img className='h-[70px]' src={item.thumbnail} alt="" />
                                                <div>
                                                    <h2 className='font-semibold'>{item.title}</h2>
                                                    <h4 className='text-red-700'>$ {item.price}</h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                            <Link to="/wishList"><a className='cursor-pointer text-[20px] duration-300 hover:text-red-600 hover:-translate-y-1'><CiHeart /></a></Link>
                            <Link to="/cart"> <a className='cursor-pointer text-[20px] duration-300 hover:text-red-600 hover:-translate-y-1'><IoCartOutline /></a> </Link>
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
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;