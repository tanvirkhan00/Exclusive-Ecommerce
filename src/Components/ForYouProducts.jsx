import React, { useContext } from 'react';
import { apiData } from './ContextApi';
import { Link } from 'react-router-dom';

// Icon
import { CiStar } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { BsCartPlusFill } from "react-icons/bs";


const ForYouProducts = () => {

    let info = useContext(apiData)
    let filterProducts = info.filter((item) => item.id >= 25 == item.id <= 28)
    return (
        <>

            <section>
                <div className="container mx-auto my-[50px]">
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
                                        <span className='bg-white p-1 text-[20px] rounded-full'><CiHeart /></span>
                                        <span className='bg-white p-1 text-[20px] rounded-full'><IoEyeOutline /></span>
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

export default ForYouProducts;