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
import { FaCircleChevronUp } from "react-icons/fa6";
import { FaCircleChevronDown } from "react-icons/fa6";




const Shop = () => {

    let products = useContext(apiData)
    let [category, setCategory] = useState([])
    let [categoryItem, setCategoryItem] = useState([])
    let [priceItem, setPriceItem] = useState([])
    let dispatch = useDispatch()


    let [currentPage, setCurrentPage] = useState(1) //define currentpage number, default is 1
    let [perPage, setPerPage] = useState(15) //define per page items number


    let lastItemIndex = currentPage * perPage //find the index of last item

    let firstItemIndex = lastItemIndex - perPage //find the index of first item

    let currentItems = products.slice(firstItemIndex, lastItemIndex) //extract items from main array by currentpage and perpage


    let pageNumber = Math.ceil(products.length / perPage); //define total page numbers

    let pageNumbers = [] //for storing 1 - last page number

    for (let i = 1; i <= pageNumber; i++) {
        pageNumbers.push(i);
    } //for printing 1 - last page number

    let handlePage = (item) => {
        setCurrentPage(item)
    }

    // Category Item
    useEffect(() => {
        setCategory([...new Set(products.map((item) => item.category))])
    }, [products])

    // Category Wise Items
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

    // Page Prev and Next
    let HandlePagePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    let HandlePageNext = () => {
        if (currentPage !== pageNumber) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Category visibility
    let [isCategoryVisible, setIsCategoryVisible] = useState(false);
    let toggleCategoryVisibility = () => {
        setIsCategoryVisible(!isCategoryVisible)
    }

    // Show item by Number
    let handleShowByNumber = (e) => {
        let inputValue = Number(e.target.value) || 15;
        setPerPage(inputValue)
        setCurrentPage(1)
    }


    // Add page show and hide text
    let [limitedItems, setLimitedItems] = useState([]);
    useEffect(() => {
        let filteredItems = priceItem.slice(0, 6)
        setLimitedItems(filteredItems)
    }, [priceItem])

    let handleShowAll = () => {
        setLimitedItems(priceItem)
    }

    let handleHide = () => {
        let ddd = limitedItems.slice(0, 6)
        setLimitedItems(ddd)
    }

    // Show all and hide categoryItem
    let [limitedItemsCategory, setLimitedItemsCategory] = useState([]);
    useEffect(() => {
        let filteredItemsCategory = categoryItem.slice(0, 6)
        setLimitedItemsCategory(filteredItemsCategory)
    }, [categoryItem])

    let handleShowAllCategory = () => {
        setLimitedItemsCategory(categoryItem)
    }
    let handleHideCategory = () => {
        let sliceItem= limitedItemsCategory.slice(0, 6)
        setLimitedItemsCategory(sliceItem)
    }



    return (
        <>

            <section>
                <div className="container mt-[150px] mb-[50px]">
                    <div className='md:flex justify-between gap-2 items-start'>
                        <div className='flex justify-between md:flex-col gap-10 md:basis-[15%] md:border-r-2 md:border-slate-500'>
                            <div className=''>
                                <h1 className='text-[20px] font-semibold' onClick={toggleCategoryVisibility}>Category Products</h1>
                                <div>
                                    {isCategoryVisible && (
                                        <div className='h-[220px] overflow-y-scroll'>
                                            {category.map((item) => (
                                                <div className='mt-4'>
                                                    <ul className='flex flex-col gap-2'>
                                                        <li onClick={() => handleCategory(item)}>
                                                            <a className='text-[14px] capitalize cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>{item}</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='group'>
                                <h1 className='font-semibold cursor-pointer'>Pricing</h1>
                                <div className='flex flex-col gap-2 text-[14px] mt-3 transition-all duration-500 ease-in-out 
                           opacity-0 transform -translate-y-5 group-hover:opacity-100 group-hover:translate-y-0'>
                                    <a onClick={() => priceWiseItems({ low: 1, high: 100 })} className='cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>1-100</a>
                                    <a onClick={() => priceWiseItems({ low: 101, high: 500 })} className='cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>101-500</a>
                                    <a onClick={() => priceWiseItems({ low: 501, high: 1000 })} className='cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>501-1000</a>
                                    <a onClick={() => priceWiseItems({ low: 1001, high: 5000 })} className='cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>1001-5000</a>
                                    <a onClick={() => priceWiseItems({ low: 5001, high: 1000000 })} className='cursor-pointer duration-300 ease-in-out border-b-4 pb-1 border-transparent hover:border-b-slate-800'>5001-1000000</a>
                                </div>
                            </div>
                        </div>
                        <div className='md:basis-[80%] flex flex-col gap-5'>
                            <div className='flex items-center justify-between '>
                                <input onChange={handleShowByNumber} type="text" placeholder='Provide Item Quantity' className='py-2 border-[1px] border-[#000] pl-3' />
                                <p className='border-b-2 border-red-500 '>Products from {firstItemIndex + 1} to {lastItemIndex}</p>
                            </div>
                            <div>
                                {categoryItem.length > 0 ?
                                    <div className='flex flex-col  lg:gap-5 items-center'>
                                        <div className="flex flex-wrap gap-4">
                                            {limitedItemsCategory.map((item) => (
                                                <div className='relative basis-[48%]  lg:basis-[32%] pb-2 overflow-hidden group'>
                                                    <div className='bg-slate-200 relative group flex items-center justify-center'>
                                                        <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[180px] w-[200px]' /></Link>
                                                        <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100'>
                                                            <h3 onClick={() => handleCart(item)} className='flex items-center justify-center gap-2 text-[14px]'><BsCartPlusFill />Add To Cart</h3>
                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px]'>
                                                        <h1 className=' font-semibold w-[200px] truncate'>{item.title}</h1>
                                                        <h3 className='text-red-500 font-semibold my-1 text-[14px]'>${item.price}</h3>
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
                                        <div>
                                            {limitedItemsCategory.length > 6 ?
                                                <button className='bg-black text-white border-2 border-red-500 px-8 py-2 flex items-center gap-4 group' onClick={handleHideCategory}>Hide <span className='text-[18px] duration-500 ease-in-out group-hover:-translate-y-1 group-hover:text-red-600'><FaCircleChevronUp /></span> </button>
                                                :
                                                <button className={`bg-black text-white border-2 border-red-500 px-5 py-2 flex items-center gap-4 group ${limitedItemsCategory.length > 5 ?"opacity-100" : "opacity-0"}`} onClick={handleShowAllCategory}>Show All <span className='text-[18px] duration-500 ease-in-out group-hover:translate-y-1 group-hover:text-red-600'><FaCircleChevronDown /></span></button>
                                            }
                                        </div>
                                    </div>
                                    :
                                    priceItem.length > 0 ?
                                        <div className='flex flex-col lg:gap-5 items-center'>
                                            <div className="flex flex-wrap gap-4">
                                                {limitedItems.map((item) => (
                                                    <div className='relative basis-[48%] lg:basis-[32%] pb-2 overflow-hidden group'>
                                                        <div className='bg-slate-200 relative group flex items-center justify-center'>
                                                            <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[180px] w-[200px]' /></Link>
                                                            <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100'>
                                                                <h3 onClick={() => handleCart(item)} className='flex items-center justify-center gap-2 text-[14px]'><BsCartPlusFill />Add To Cart</h3>
                                                            </div>
                                                        </div>
                                                        <div className='mt-[10px]'>
                                                            <h1 className=' font-semibold w-[200px] truncate'>{item.title}</h1>
                                                            <h3 className='text-red-500 font-semibold my-1 text-[14px]'>${item.price}</h3>
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
                                            <div>
                                                {limitedItems.length > 6 ?
                                                    <button className='bg-black text-white border-2 border-red-500 px-8 py-2 flex items-center gap-4 group' onClick={handleHide}>Hide <span className='text-[18px] duration-500 ease-in-out group-hover:-translate-y-1 group-hover:text-red-600'><FaCircleChevronUp /></span> </button>
                                                    :
                                                    <button className='bg-black text-white border-2 border-red-500 px-5 py-2 flex items-center gap-4 group' onClick={handleShowAll}>Show All <span className='text-[18px] duration-500 ease-in-out group-hover:translate-y-1 group-hover:text-red-600'><FaCircleChevronDown /></span></button>
                                                }
                                            </div>
                                        </div>
                                        :
                                        <div className='flex flex-wrap lg:gap-4'>
                                            {currentItems.map((item) => (
                                                <div className='relative basis-[48%]  lg:basis-[32%] pb-2 overflow-hidden group'>
                                                    <div className='bg-slate-200 relative group flex items-center justify-center'>
                                                        <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[180px] lg:h-[230px]' /></Link>
                                                        <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100'>
                                                            <h3 onClick={() => handleCart(item)} className='flex items-center justify-center gap-2 text-[14px]'><BsCartPlusFill />Add To Cart</h3>
                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px]'>
                                                        <h1 className=' font-semibold w-[200px] truncate'>{item.title}</h1>
                                                        <h3 className='text-red-500 text-[14px] font-semibold my-1'>${item.price}</h3>
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
                            <div className='flex justify-center mt-10 gap-4 text-[20px] flex-wrap'>
                                <span className='border-2 px-3 py-1 duration-500 border-red-500  rounded-md ease-in-out hover:bg-green-600 hover:border-black' onClick={HandlePagePrev} >Prev</span>
                                {pageNumbers.map((item) => (
                                    <span onClick={() => handlePage(item)}>
                                        <h4 className={`py-1 px-5 border-2 border-[#000] duration-1000 rounded-md hover:bg-green-400  ease-in-out ${item === currentPage ? "bg-black text-white" : ""}`}>{item}</h4>
                                    </span>
                                ))}
                                <span className='border-2 px-3 py-1 duration-500 border-red-500 rounded-md ease-in-out hover:bg-green-600 hover:border-black' onClick={HandlePageNext} >Next</span>
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

        </>
    );
};

export default Shop;