import React, { useContext } from 'react';
import { apiData } from './ContextApi';
import { Link } from 'react-router-dom';
import { addToCart, WishListProduct } from './Slice/CartSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';




// React Icon
import { CiStar } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";

const BestSelling = () => {

    let dispatch = useDispatch()

    let info = useContext(apiData)
    let filterProducts = info.filter((item) => item.id >= 22 == item.id <= 25)

    // Add Cart
    let handleCart = (itemId) => {
        dispatch(addToCart({ ...itemId, qty: 1 }))
    }

    // Add WishList
    let handleWishList = (itemId) => {
        dispatch(WishListProduct({ ...itemId, qty: 1 }))
    }

    return (
        <>
            <section>
                <div className="container mt-[50px]">
                    <div>
                        <div className='flex items-center gap-[10px]'>
                            <span className='w-[10px] h-[20px] bg-red-600'></span>
                            <h1 className='font-semibold text-red-600'>This Month</h1>
                        </div>
                        <div className='flex justify-between items-center mt-[20px]'>
                            <h1 className='text-[25px] font-semibold'>Best Selling Products</h1>
                            <Link to="/shop"><button className='w-[100px] text-center py-2 rounded-md border-2 border-black duration-300 hover:bg-red-600'>
                                View all
                            </button></Link>
                        </div>
                        <div className='flex gap-2 lg:gap-4 flex-wrap mt-[20px]'>
                            {filterProducts.map((item) => (
                                <div className='relative basis-[48%] md:basis-[32%] lg:basis-[24%] pb-2 overflow-hidden group'>
                                    <div className='bg-slate-200 relative group flex items-center justify-center'>
                                        <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[250px] w-[200px]' /></Link>
                                        <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100'>
                                            <h3 onClick={() => handleCart(item)} className='flex items-center justify-center gap-2'><BsCartPlusFill />Add To Cart</h3>
                                        </div>
                                    </div>
                                    <div className='mt-[10px] text-center flex flex-col items-center'>
                                        <h1 className=' font-semibold '>{item.title}</h1>
                                        <h3 className='text-red-500 font-semibold my-1'>${item.price}</h3>
                                        <div className='flex'>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                        </div>
                                    </div>
                                    <div className='absolute top-0 p-[20px]'>
                                        <h3 className='bg-red-500 w-[50px] text-center text-[14px] font-semibold rounded-[5px]'>{item.discountPercentage}%</h3>
                                    </div>
                                    <div className='absolute right-0  p-[20px] flex flex-col gap-2 -top-[100px] duration-700 ease-in-out group-hover:top-0'>
                                        <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600' onClick={() => handleWishList(item)}><CiHeart /></span>
                                        <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600'><IoEyeOutline /></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
                </div>
            </section>
        </>
    );
};

export default BestSelling;