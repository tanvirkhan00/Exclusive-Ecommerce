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

    let info = useContext(apiData)
    let [category, setCategory] = useState([])
    
    useEffect(()=>{
        setCategory([...new Set(info.map((item)=>item.category))])
    },[info])

    let [categoryItem, setCategoryItem] = useState([])
    
    let handleCategory = (cat) => {
        let filteredCat = info.filter((item)=> item.category == cat)
        setCategoryItem(filteredCat)
    }


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
                <div className="container my-[50px] mx-auto">
                    <div className='flex justify-between'>
                        <div className='w-[250px]'>
                            <h1 className='text-[25px] font-bold text-red-600'>Categori Product</h1>
                            {category.map((item) => (
                                <div className='border-r-2 border-slate-400 mt-4'>
                                    <ul className='flex flex-col gap-2'>
                                        <li onClick={() => handleCategory(item)}>
                                            <a className='text-[20px] capitalize cursor-pointer'>{item}</a>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="slider-container w-[70%]">
                            <Slider {...settings}>
                                <div>
                                    <div className='bg-black text-white flex items-center'>
                                        <div className=' pl-[40px]'>
                                            <h3 className='flex items-center'><span className='text-[50px]'><FaApple /></span> Iphone 14 Series </h3>
                                            <h2 className='text-[48px]'>Up to 10% off Voucher</h2>
                                            <a className='flex items-center border-b-2 border-white max-w-fit gap-2'>Shop Now <span><GoArrowRight /></span></a>
                                        </div>

                                        <div className=''>
                                            <img src={HiroImg} alt="" className='h-[350px]' />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='bg-black text-white flex items-center'>
                                        <div className=' pl-[40px]'>
                                            <h3 className='flex items-center'><span className='text-[50px]'><FaApple /></span> Iphone 14 Series </h3>
                                            <h2 className='text-[48px]'>Up to 10% off Voucher</h2>
                                            <a className='flex items-center border-b-2 border-white max-w-fit gap-2'>Shop Now <span><GoArrowRight /></span></a>
                                        </div>

                                        <div className=''>
                                            <img src={HiroImg} alt="" className='h-[350px]' />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='bg-black text-white flex items-center'>
                                        <div className=' pl-[40px]'>
                                            <h3 className='flex items-center'><span className='text-[50px]'><FaApple /></span> Iphone 14 Series </h3>
                                            <h2 className='text-[48px]'>Up to 10% off Voucher</h2>
                                            <a className='flex items-center border-b-2 border-white max-w-fit gap-2'>Shop Now <span><GoArrowRight /></span></a>
                                        </div>

                                        <div className=''>
                                            <img src={HiroImg} alt="" className='h-[350px]' />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='bg-black text-white flex items-center'>
                                        <div className=' pl-[40px]'>
                                            <h3 className='flex items-center'><span className='text-[50px]'><FaApple /></span> Iphone 14 Series </h3>
                                            <h2 className='text-[48px]'>Up to 10% off Voucher</h2>
                                            <a className='flex items-center border-b-2 border-white max-w-fit gap-2'>Shop Now <span><GoArrowRight /></span></a>
                                        </div>

                                        <div className=''>
                                            <img src={HiroImg} alt="" className='h-[350px]' />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='bg-black text-white flex items-center'>
                                        <div className=' pl-[40px]'>
                                            <h3 className='flex items-center'><span className='text-[50px]'><FaApple /></span> Iphone 14 Series </h3>
                                            <h2 className='text-[48px]'>Up to 10% off Voucher</h2>
                                            <a className='flex items-center border-b-2 border-white max-w-fit gap-2'>Shop Now <span><GoArrowRight /></span></a>
                                        </div>

                                        <div className=''>
                                            <img src={HiroImg} alt="" className='h-[350px]' />
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>

            <FlashSales categoryItem={categoryItem} />
        </>
    );
};

export default HiroHome;