import React, { useContext, useEffect, useState } from 'react';
import { apiData } from './ContextApi';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, WishListProduct } from './Slice/CartSlice';

// Icon
import { CiStar } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BsCartPlusFill } from "react-icons/bs";

const Shop = () => {

    let products = useContext(apiData)
    let [category, setCategory] = useState([])
    let [categoryItem, setCategoryItem] = useState([])
    let [priceItem, setPriceItem] = useState([])
    let dispatch = useDispatch()


    // Category Item
    useEffect(() => {
        setCategory([...new Set(products.map((item) => item.category))])
    }, [products])

    let handleCategory = (cat) => {
        let filteredCat = products.filter((item) => item.category == cat)
        setCategoryItem(filteredCat)
        setPriceItem([])
    }


    // Item pricing
    let priceWiseItems = (value) => {
        let priceFilter = products.filter((item) => item.price >= value.low && item.price <= value.high)
        setPriceItem(priceFilter)
        setCategoryItem([])
    }


    // Add to Cart
    let handleCart = (item) => {
        dispatch(addToCart({ ...item, qty: 1 }))
    }

    // Add WishList Product
    let handleWishList = (itemId) => {
        dispatch(WishListProduct({ ...itemId, qty: 1 }))
    }




    return (
        <>

            <section>
                <div className="container mt-[150px] mb-[50px] mx-auto">
                    <div className='flex justify-between gap-2 items-start'>
                        <div className='flex flex-col gap-10 basis-[25%] border-r-2 border-slate-500 '>
                            <div className='h-[400px] overflow-y-scroll'>
                                <h1 className='text-[30px] font-semibold'>Category Products</h1>
                                {category.map((item) => (
                                    <div className='mt-4'>
                                        <ul className='flex flex-col gap-2'>
                                            <li onClick={() => handleCategory(item)}>
                                                <a className='text-[20px] capitalize cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>{item}</a>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h1 className='text-[30px] font-semibold'>Pricing</h1>
                                <div className='flex flex-col gap-2 mt-2'>
                                    <a onClick={() => priceWiseItems({ low: 1, high: 100 })} className='cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>1-100</a>
                                    <a onClick={() => priceWiseItems({ low: 101, high: 500 })} className='cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>101-500</a>
                                    <a onClick={() => priceWiseItems({ low: 501, high: 1000 })} className='cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>501-1000</a>
                                    <a onClick={() => priceWiseItems({ low: 1001, high: 5000 })} className='cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>1001-5000</a>
                                    <a onClick={() => priceWiseItems({ low: 5001, high: 1000000 })} className='cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>5001-1000000</a>
                                </div>
                            </div>
                        </div>
                        {categoryItem.length > 0 ?
                            <div className='basis-[70%] flex flex-wrap gap-4'>
                                {categoryItem.map((item) => (
                                    <div className='relative basis-[32%] pb-2 overflow-hidden group'>
                                        <div className='bg-slate-200 relative group flex items-center justify-center'>
                                            <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[250px] w-[200px]' /></Link>
                                            <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100'>
                                                <h3 onClick={() => handleCart(item)} className='flex items-center justify-center gap-2'><BsCartPlusFill />Add To Cart</h3>
                                            </div>
                                        </div>
                                        <div className='mt-[10px]'>
                                            <h1 className='text-[20px] font-semibold '>{item.title}</h1>
                                            <h3 className='text-red-500 font-semibold my-1'>${item.price}</h3>
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
                                        <div className='absolute right-0  p-[20px] flex flex-col gap-2 -top-[100px] duration-700 ease-in-out group-hover:top-0'>
                                            <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600' onClick={() => handleWishList(item)}><CiHeart /></span>
                                            <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600'><IoEyeOutline /></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            :
                            priceItem.length > 0 ?
                                <div className="basis-[70%] flex flex-wrap gap-4">
                                    {priceItem.map((item) => (
                                        <div className='relative basis-[32%] pb-2 overflow-hidden group'>
                                            <div className='bg-slate-200 relative group flex items-center justify-center'>
                                                <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[250px] w-[200px]' /></Link>
                                                <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100'>
                                                    <h3 onClick={() => handleCart(item)} className='flex items-center justify-center gap-2'><BsCartPlusFill />Add To Cart</h3>
                                                </div>
                                            </div>
                                            <div className='mt-[10px]'>
                                                <h1 className='text-[20px] font-semibold '>{item.title}</h1>
                                                <h3 className='text-red-500 font-semibold my-1'>${item.price}</h3>
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
                                            <div className='absolute right-0  p-[20px] flex flex-col gap-2 -top-[100px] duration-700 ease-in-out group-hover:top-0'>
                                                <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600' onClick={() => handleWishList(item)}><CiHeart /></span>
                                                <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600'><IoEyeOutline /></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className='basis-[70%] flex flex-wrap gap-4'>
                                    {products.map((item) => (
                                        <div className='relative basis-[32%] pb-2 overflow-hidden group'>
                                            <div className='bg-slate-200 relative group flex items-center justify-center'>
                                                <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[250px] w-[200px]' /></Link>
                                                <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100'>
                                                    <h3 onClick={() => handleCart(item)} className='flex items-center justify-center gap-2'><BsCartPlusFill />Add To Cart</h3>
                                                </div>
                                            </div>
                                            <div className='mt-[10px]'>
                                                <h1 className='text-[20px] font-semibold '>{item.title}</h1>
                                                <h3 className='text-red-500 font-semibold my-1'>${item.price}</h3>
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
                                            <div className='absolute right-0  p-[20px] flex flex-col gap-2 -top-[100px] duration-700 ease-in-out group-hover:top-0'>
                                                <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600' onClick={() => handleWishList(item)}><CiHeart /></span>
                                                <span className='bg-white p-1 text-[20px] rounded-full duration-300 ease-in-out hover:scale-125 hover:text-red-600'><IoEyeOutline /></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        }
                    </div>
                    <div className='flex justify-center mt-10 gap-7'>
                        <span className='border-2 border-slate-500 px-4 py-1 cursor-pointer'>1</span>
                        <span className='border-2 border-slate-500 px-4 py-1 cursor-pointer'>2</span>
                        <span className='border-2 border-slate-500 px-4 py-1 cursor-pointer'>3</span>
                        <span className='border-2 border-slate-500 px-4 py-1 cursor-pointer'>4</span>
                        <span className='border-2 border-slate-500 px-4 py-1 cursor-pointer'>5</span>
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

export default Shop;