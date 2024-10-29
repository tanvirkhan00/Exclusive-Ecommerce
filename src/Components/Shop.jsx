import React, { useContext, useEffect, useState } from 'react';
import { apiData } from './ContextApi';

// Icon
import { CiStar } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Shop = () => {

    let products = useContext(apiData)

    let [category, setCategory] = useState([])

    useEffect(() => {
        setCategory([...new Set(products.map((item) => item.category))])
    }, [products])

    let [categoryItem, setCategoryItem] = useState([])

    let handleCategory = (cat) => {
        let filteredCat = products.filter((item) => item.category == cat)
        setCategoryItem(filteredCat)
    }



    return (
        <>

            <section>
                <div className="container my-[50px] mx-auto">
                    <div className='flex justify-between gap-2'>
                        <div className='flex flex-col gap-10 basis-[25%] border-r-2 border-slate-500'>
                            <div>
                                <h1 className='text-[30px] font-semibold'>Category Products</h1>
                                {category.map((item) => (
                                    <div className='mt-4'>
                                        <ul className='flex flex-col gap-2'>
                                            <li onClick={() => handleCategory(item)}>
                                                <a className='text-[20px] capitalize cursor-pointer duration-300 ease-in-out border-b-2 '>{item}</a>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h1 className='text-[30px] font-semibold'>Pricing</h1>
                                <div className='flex flex-col gap-2 mt-2'>
                                    <a className='cursor-pointer'>1-100</a>
                                    <a className='cursor-pointer'>101-500</a>
                                    <a className='cursor-pointer'>501-1000</a>
                                    <a className='cursor-pointer'>1001-5000</a>
                                    <a className='cursor-pointer'>5001-1000000</a>
                                </div>
                            </div>
                        </div>
                        {categoryItem.length > 0 ?
                            <div className='basis-[70%] flex flex-wrap gap-4'>
                                {categoryItem.map((item) => (
                                    <div className='relative basis-[32%]'>
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
                            :
                            <div className='basis-[70%] flex flex-wrap gap-4'>
                                {products.map((item) => (
                                    <div className='relative basis-[32%]'>
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
                        }
                    </div>
                </div>
            </section>

        </>
    );
};

export default Shop;