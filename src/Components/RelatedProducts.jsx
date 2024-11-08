import React from 'react';
import { Link } from 'react-router-dom';

// Icon
import { CiStar } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { addToCart, WishListProduct } from './Slice/CartSlice';

const RelatedProducts = ({ filterProducts }) => {

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
                    <div className='flex flex-col gap-8'>
                        <div className='flex items-center gap-4'>
                            <span className='bg-red-500 w-[15px] h-[30px]'></span>
                            <h1 className='font-semibold text-[30px]'>Related Item</h1>
                        </div>
                        <div className='flex flex-wrap gap-5'>
                            {filterProducts?.map((item) => (
                                <div className='relative basis-[30%] lg:basis-[23%] pb-2 overflow-hidden group'>
                                    <div className='bg-slate-200 relative group flex items-center justify-center'>
                                        <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[180px] w-[200px]' /></Link>
                                        <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100'>
                                            <h3 onClick={() => handleCart(item)} className='flex items-center justify-center gap-2 text-[14px]'><BsCartPlusFill />Add To Cart</h3>
                                        </div>
                                    </div>
                                    <div className='mt-[10px]'>
                                        <h1 className='text-[14px] font-semibold '>{item.title}</h1>
                                        <h3 className='text-red-500 font-semibold my-1 text-[14px]'>${item.price}</h3>
                                        <div className='flex'>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                        <span className=' text-yellow-600 text-[14px]'><CiStar /></span>
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
                    </div>
                </div>
            </section>

        </>

    );
    window.reload(RelatedProducts)

};

export default RelatedProducts;