import React, { useContext, useEffect, useState } from 'react';
import { apiData } from './ContextApi';
import Slider from "react-slick";
import FlashSales from './FlashSales';


// React Icon
import { FaApple } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";

// Img
import HiroImg from "/src/assets/mobile.png";


const HiroHome = () => {


    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 7000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <>
            <section>
                <div className="container mt-[150px] mb-[50px] mx-auto">
                    <div className="slider-container w-[100%] mx-auto">
                        <Slider {...settings}>
                            <div>
                                <div className='bg-black text-white flex items-center'>
                                    <div className=' pl-[40px]'>
                                        <h3 className='flex items-center'><span className='text-[50px]'><FaApple /></span> Iphone 14 Series </h3>
                                        <h2 className='text-[30px]'>Up to 10% off Voucher</h2>
                                        <a className='flex items-center border-b-2 border-white max-w-fit gap-2'>Shop Now <span><GoArrowRight /></span></a>
                                    </div>
                                    <div className=''>
                                        <img src={HiroImg} alt="" className='h-[250px]' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='bg-black text-white flex items-center'>
                                    <div className=' pl-[40px]'>
                                        <h3 className='flex items-center'><span className='text-[50px]'><FaApple /></span> Iphone 14 Series </h3>
                                        <h2 className='text-[30px]'>Up to 10% off Voucher</h2>
                                        <a className='flex items-center border-b-2 border-white max-w-fit gap-2'>Shop Now <span><GoArrowRight /></span></a>
                                    </div>
                                    <div className=''>
                                        <img src={HiroImg} alt="" className='h-[250px]' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='bg-black text-white flex items-center'>
                                    <div className=' pl-[40px]'>
                                        <h3 className='flex items-center'><span className='text-[50px]'><FaApple /></span> Iphone 14 Series </h3>
                                        <h2 className='text-[30px]'>Up to 10% off Voucher</h2>
                                        <a className='flex items-center border-b-2 border-white max-w-fit gap-2'>Shop Now <span><GoArrowRight /></span></a>
                                    </div>
                                    <div className=''>
                                        <img src={HiroImg} alt="" className='h-[250px]' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='bg-black text-white flex items-center'>
                                    <div className=' pl-[40px]'>
                                        <h3 className='flex items-center'><span className='text-[50px]'><FaApple /></span> Iphone 14 Series </h3>
                                        <h2 className='text-[30px]'>Up to 10% off Voucher</h2>
                                        <a className='flex items-center border-b-2 border-white max-w-fit gap-2'>Shop Now <span><GoArrowRight /></span></a>
                                    </div>
                                    <div className=''>
                                        <img src={HiroImg} alt="" className='h-[250px]' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='bg-black text-white flex items-center'>
                                    <div className=' pl-[40px]'>
                                        <h3 className='flex items-center'><span className='text-[50px]'><FaApple /></span> Iphone 14 Series </h3>
                                        <h2 className='text-[30px]'>Up to 10% off Voucher</h2>
                                        <a className='flex items-center border-b-2 border-white max-w-fit gap-2'>Shop Now <span><GoArrowRight /></span></a>
                                    </div>
                                    <div className=''>
                                        <img src={HiroImg} alt="" className='h-[250px]' />
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HiroHome;