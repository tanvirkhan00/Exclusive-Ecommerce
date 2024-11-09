import React from 'react';

// Icons
import { TbHomeHeart } from "react-icons/tb";
import { CiDollar } from "react-icons/ci";
import { HiShoppingBag } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";


const OurReview = () => {
    return (
        <>

                <section>
                    <div className="container mt-[50px]">
                        <div className='flex items-center justify-between flex-wrap gap-4'>
                            <div className='border-2 border-slate-500 rounded-md flex flex-col gap-3 items-center py-10 basis-[48%] lg:basis-[23%] duration-300 ease-in-out hover:bg-red-500'>
                                <span className='border-[8px] border-slate-400 rounded-full bg-black text-white text-[30px] p-1'><TbHomeHeart/></span>
                                <h3 className='text-[30px] font-bold'>10.5k</h3>
                                <h5>Sallers active our site</h5>
                            </div>
                            <div className='border-2 border-slate-500 rounded-md flex flex-col gap-3 items-center py-10 basis-[48%] lg:basis-[23%] duration-300 ease-in-out hover:bg-red-500'>
                                <span className='border-[8px] border-slate-400 rounded-full bg-black text-white text-[30px] p-1'><CiDollar/></span>
                                <h3 className='text-[30px] font-bold'>33k</h3>
                                <h5>Monthly Product Sale</h5>
                            </div>
                            <div className='border-2 border-slate-500 rounded-md flex flex-col gap-3 items-center py-10 basis-[48%] lg:basis-[23%] duration-300 ease-in-out hover:bg-red-500'>
                                <span className='border-[8px] border-slate-400 rounded-full bg-black text-white text-[30px] p-1'><HiShoppingBag/></span>
                                <h3 className='text-[30px] font-bold'>45.5k</h3>
                                <h5>Customer active in our site</h5>
                            </div>
                            <div className='border-2 border-slate-500 rounded-md flex flex-col gap-3 items-center py-10 basis-[48%] lg:basis-[23%] duration-300 ease-in-out hover:bg-red-500'>
                                <span className='border-[8px] border-slate-400 rounded-full bg-black text-white text-[30px] p-1'><FaSackDollar/></span>
                                <h3 className='text-[30px] font-bold'>25k</h3>
                                <h5>Anual gross sale in our site</h5>
                            </div>
                        </div>
                    </div>
                </section>
            
        </>
    );
};

export default OurReview;