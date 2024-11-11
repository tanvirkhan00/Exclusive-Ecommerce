import React, { useContext } from 'react';
import { apiData } from './ContextApi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, WishListProduct } from './Slice/CartSlice';
import { ToastContainer } from 'react-toastify';



// Icon
import { CiStar } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { BsCartPlusFill } from "react-icons/bs";


const ForYouProducts = () => {

    let info = useContext(apiData)
    let filterProducts = info.filter((item) => item.id >= 25 == item.id <= 28)
    let dispatch = useDispatch()

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
                <div className="container my-[50px]">
                    <div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-[10px]'>
                                <span className='w-[10px] h-[20px] bg-red-600'></span>
                                <h1 className='font-semibold text-black text-[20px]'>Just For You</h1>
                            </div>
                            <Link to="/shop"><button className='border-2 border-slate-600 rounded-md px-[30px] py-2 duration-300 hover:bg-red-500'>
                                <a>See All</a>
                            </button></Link>
                        </div>
                        <div className='flex gap-3 lg:gap-4 flex-wrap mt-[20px]'>
                            {filterProducts.map((item) => (
                                <div className='relative basis-[31%] md:basis-[32%] lg:basis-[24%] pb-2 overflow-hidden group'>
                                    <div className='bg-slate-200 relative group flex items-center justify-center'>
                                        <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[180px]' /></Link>
                                        <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100'>
                                            <h3 onClick={() => handleCart(item)} className='flex items-center justify-center gap-2 text-[14px]'><BsCartPlusFill />Add To Cart</h3>
                                        </div>
                                    </div>
                                    <div className='mt-[10px]'>
                                        <h1 className='text-[14px] md:text-[18px] font-semibold w-[100px] md:w-[200px] truncate'>{item.title}</h1>
                                        <h3 className='text-red-500 font-semibold my-1 text-[14px]'>${item.price}</h3>
                                        <div className='flex'>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                        </div>
                                    </div>
                                    <div className='absolute top-0 p-[10px]'>
                                        <h3 className='bg-red-500 w-[40px] text-center text-[10px] font-semibold rounded-[5px]'>{item.discountPercentage}%</h3>
                                    </div>
                                    <div className='absolute right-0  p-[20px] flex flex-col gap-2 -top-[100px] duration-700 ease-in-out group-hover:top-0'>
                                        <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600' onClick={() => handleWishList(item)}><CiHeart /></span>
                                        <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600'><IoEyeOutline /></span>
                                    </div>
                                </div>
                            ))}
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
                </div>
            </section>

        </>
    );
};

export default ForYouProducts;