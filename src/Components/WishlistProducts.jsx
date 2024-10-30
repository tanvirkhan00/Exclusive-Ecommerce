import React, { useContext } from 'react';
import { apiData } from './ContextApi';
import { Link } from 'react-router-dom';

// React Icon
import { CiStar } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { BsCartPlusFill } from "react-icons/bs";



const WishlistProducts = () => {

    let info = useContext(apiData)
    let filterProducts = info.filter((item) => item.id >= 10 == item.id <= 13)

    return (
        <>

            <section>
                <div className="container mx-auto mt-[50px]">
                    <div>
                        <div className='flex items-center justify-between'>
                            <h3 className='font-semibold text-[20px]'>Wishlist (4)</h3>
                            <button className='border-2 border-slate-500 px-[30px] py-3 rounded-md duration-300 hover:bg-red-500'>
                                <a>Move All To Bag</a>
                            </button>
                        </div>
                        <div className='flex justify-between gap-3 flex-wrap mt-[20px]'>
                            {filterProducts.map((item) => (
                                <div className='relative basis-[24%]'>
                                    <div className='bg-slate-200 relative group'>
                                        <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" /></Link>
                                        <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-500 ease-in-out cursor-pointer group-hover:opacity-100'>
                                            <h3 className='flex items-center justify-center gap-2'><BsCartPlusFill />Add To Cart</h3>
                                        </div>
                                    </div>
                                    <div className='mt-[20px]'>
                                        <h1 className='text-[20px] font-semibold '>{item.title}</h1>
                                        <h3 className='text-red-500 font-semibold my-2'>${item.price}</h3>
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
                                    <div className='absolute right-0 top-0 p-[20px] flex flex-col gap-2'>
                                        <span className='bg-white p-1 text-[20px] rounded-full cursor-pointer'><HiOutlineTrash /></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default WishlistProducts;