import React, { useContext } from 'react';
import { apiData } from './ContextApi';
import { ToastContainer, toast } from 'react-toastify';
import { addToCart, WishListProduct } from './Slice/CartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// React Icons
import { CiStar } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";

const ExploreProducts = () => {

    let dispatch = useDispatch()
    let info = useContext(apiData)
    let filterProducts = info.filter((item) => item.category === "beauty")
    

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
                <div className="container mt-[50px] border-b-2 border-slate-400 pb-[50px]">
                    <div className='flex flex-col gap-[20px]'>
                        <div className='flex items-center gap-[10px]'>
                            <span className='w-[10px] h-[20px] bg-red-600'></span>
                            <h1 className='font-semibold text-red-600'>Our Products</h1>
                        </div>
                        <div className='flex flex-col items-center justify-between'>
                            <h1 className='font-semibold text-[25px]'>Explore Our Products</h1>
                            <div className='flex items-center gap-[20px] text-center'>
                                <div>
                                    <h3 className='font-semibold'>Days</h3>
                                    <h4 className='font-bold text-[25px]'>03</h4>
                                </div>
                                <div>
                                    <span className='text-[20px] font-bold'>:</span>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>Hour</h3>
                                    <h4 className='font-bold text-[25px]'>23</h4>
                                </div>
                                <div>
                                    <span className='text-[20px] font-bold'>:</span>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>Minutes</h3>
                                    <h4 className='font-bold text-[25px]'>19</h4>
                                </div>
                                <div>
                                    <span className='text-[20px] font-bold'>:</span>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>Seconds</h3>
                                    <h4 className='font-bold text-[25px]'>56</h4>
                                </div>
                            </div>
                        </div>
                        <div className='flex  gap-3 flex-wrap'>
                            {filterProducts.map((item) => (
                                <div className='relative basis-[48%] md:basis-[32%] lg:basis-[24%] pb-2 overflow-hidden group'>
                                    <div className='bg-slate-200 relative group flex items-center justify-center'>
                                        <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[180px] lg:h-[230px] w-[200px]' /></Link>
                                        <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100'>
                                            <h3 onClick={() => handleCart(item)} className='flex items-center justify-center gap-2'><BsCartPlusFill />Add To Cart</h3>
                                        </div>
                                    </div>
                                    <div className='mt-[10px]'>
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
                                    <div className='absolute top-0 p-[10px]'>
                                        <h3 className='bg-red-500 w-[50px] text-center text-[14px] font-semibold rounded-[5px]'>{item.discountPercentage}%</h3>
                                    </div>
                                    <div className='absolute right-0  p-[20px] flex flex-col gap-2 -top-[100px] duration-700 ease-in-out group-hover:top-0'>
                                        <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600' onClick={() => handleWishList(item)}><CiHeart /></span>
                                        <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600'><IoEyeOutline /></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='text-center w-[200px] py-3 mx-auto mt-[20px] rounded-md border-2 border-black duration-300 hover:bg-red-600'>
                            <Link to="/shop"><button className='text-[20px] font-semibold'>View All Products</button></Link>
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

export default ExploreProducts;