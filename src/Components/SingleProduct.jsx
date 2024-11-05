import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart, WishListProduct } from './Slice/CartSlice';
import { useDispatch } from 'react-redux';
import RelatedProducts from './RelatedProducts';
import { apiData } from './ContextApi';
import { ToastContainer } from 'react-toastify';


// Icons
import { IoRefreshCircleOutline } from "react-icons/io5";
import { TbCar } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";





const SingleProduct = () => {

    const [info, setInfo] = useState(null);
    let dispatch = useDispatch()

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setInfo(data)
            })
            .catch((error) => console.error("This is the error", error));
    }, [id])

    if (!info) {
        return <p className='text-center py-[150px]'>Loading product details...</p>;
    }

    let products = useContext(apiData)
    let filterProducts = products.filter((item) => item.category == info.category)

    // Add Cart
    let handleCart = (itemId) => {
        dispatch(addToCart({ ...itemId, qty: 1 }))
    }

    // Add wishList
    let handleWishList = (itemId) => {
        dispatch(WishListProduct({ ...itemId, qty: 1 }))
    }


    return (
        <>
            <section>
                <div className="container mx-auto mt-[150px]">
                    <div className='flex justify-between flex-wrap gap-2'>
                        <div className='basis-[60%] flex items-center justify-center'>
                            <img src={info.thumbnail} alt="" className='w-[60%]' />
                        </div>
                        <div className='flex flex-col gap-2 basis-[35%]'>
                            <h1 className='text-[25px] font-semibold'>{info.title}</h1>
                            <div className='flex items-center gap-2'>
                                <span className='text-yellow-500'><FaStar /></span>
                                <span className='text-yellow-500'><FaStar /></span>
                                <span className='text-yellow-500'><FaStar /></span>
                                <span className='text-yellow-500'><FaStar /></span>
                                <span className='text-yellow-500'><FaStar /></span>
                                <p className=''>(130 Reviews)</p>
                                <p className='border-l-2 pl-4 border-slate-400 text-green-600'>In Stock</p>
                            </div>
                            <h2 className='text-red-500 text-[20px]'>${info.price}</h2>
                            <p className='pb-3'>{info.description}</p>
                            <p className='flex items-center gap-2 text-[20px] font-semibold border-t-2 border-slate-400 pt-4'>Colors: <span className='h-[17px] w-[17px] rounded-full bg-green-500'></span> <span className='h-[17px] w-[17px] rounded-full bg-red-500'></span></p>
                            <p className='text-[20px] font-semibold'>Category: <span className='font-normal text-red-700 capitalize'>{info.category}</span></p>
                            <div className='flex items-center gap-4 mt-2'>
                                <p className='text-[20px] font-semibold'>Size: </p>
                                <div className='flex items-center gap-2'>
                                    <p className='border-2 border-slate-600 rounded-md w-[30px] text-center font-semibold'>XS</p>
                                    <p className='border-2 border-slate-600 rounded-md w-[30px] text-center font-semibold'>S</p>
                                    <p className='border-2 border-slate-600 rounded-md w-[30px] text-center bg-red-500 text-white font-semibold'>M</p>
                                    <p className='border-2 border-slate-600 rounded-md w-[30px] text-center font-semibold'>L</p>
                                    <p className='border-2 border-slate-600 rounded-md w-[30px] text-center font-semibold'>XL</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 mt-2'>
                                <input className='border-2 border-slate-600 outline-none py-1 rounded-md px-2 ' type="number" placeholder='1' />
                                <button className='bg-red-500 px-10 py-2 text-white font-semibold rounded-md' onClick={() => handleCart(info)}>Buy Now</button>
                                <span className='border-2 border-slate-500 rounded-md px-2 py-2 text-[20px]' onClick={() => handleWishList(info)}><IoMdHeartEmpty /></span>
                            </div>
                            <div className='mt-5'>
                                <div className='flex items-center gap-4 border-2 border-slate-500 py-2 px-4'>
                                    <span className='text-[30px]'><TbCar /></span>
                                    <div>
                                        <h3 className='font-semibold text-[18px]'>Free Delivery</h3>
                                        <a className='border-b-2 border-slate-400'>Enter your postal code for delivery available</a>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4 border-2 border-slate-500 py-2 px-4'>
                                    <span className='text-[30px]'><IoRefreshCircleOutline /></span>
                                    <div>
                                        <h1 className='font-semibold text-[18px]'>Return Delivery</h1>
                                        <a>Free 30 days delivery returns. <span className='border-b-2 border-slate-400'>Details</span></a>
                                    </div>
                                </div>
                            </div>
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

            <RelatedProducts filterProducts={filterProducts} />

        </>
    );
};

export default SingleProduct;