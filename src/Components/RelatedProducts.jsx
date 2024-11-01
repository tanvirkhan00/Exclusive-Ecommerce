import React from 'react';
import { Link } from 'react-router-dom';

// Icon
import { CiStar } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";

const RelatedProducts = ({filterProducts}) => {
    
    return (
        <>

            <section>
                <div className="container my-[50px] mx-auto">
                    <div className='flex flex-col gap-8'>
                        <div className='flex items-center gap-4'>
                            <span className='bg-red-500 w-[15px] h-[30px]'></span>
                            <h1 className='font-semibold text-[30px]'>Related Item</h1>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {filterProducts?.map((item) => (
                                <div className='relative basis-[24%]'>
                                <div className='bg-slate-200 relative group'>
                                    <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" /></Link>
                                    <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-500 ease-in-out cursor-pointer group-hover:opacity-100'>
                                        <h3 onClick={() => handleToCart(item)} className='flex items-center justify-center gap-2'><BsCartPlusFill />Add To Cart</h3>
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
    window.reload(RelatedProducts)
   
};

export default RelatedProducts;