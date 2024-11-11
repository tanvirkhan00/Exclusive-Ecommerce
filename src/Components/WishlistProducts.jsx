import React from 'react';
import { Link } from 'react-router-dom';
import { deletItem } from './Slice/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';


// React Icon
import { CiStar } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { BsCartPlusFill } from "react-icons/bs";



const WishlistProducts = () => {

    let WishList = useSelector((state) => state.product.WishListItem
    )
    let dispatch = useDispatch()
    let deleteItem = (itemId) => {
        dispatch(deletItem(itemId))
    }

    // wishList Length
    let arrayLength = WishList.length





    return (
        <>

            <section>
                <div className="container mt-[150px]">
                    <div>
                        <div className='flex items-center justify-between'>
                            <h3 className='font-semibold text-[20px]'>Wishlist <span className='text-red-500'>({arrayLength})</span></h3>
                            <button className='border-2 border-slate-500 px-[20px] py-2 rounded-md duration-300 hover:bg-red-500'>
                                <a>Move All To Bag</a>
                            </button>
                        </div>
                        <div className='flex gap-4 md:gap-[25px] lg:gap-[32px] flex-wrap mt-[20px]'>
                            {WishList.map((item, index) => (
                                <div className='relative basis-[30%] md:basis-[31%] lg:basis-[23%] group overflow-hidden'>
                                    <div className='bg-slate-200 relative group'>
                                        <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" /></Link>
                                        <div className='absolute bottom-0 text-center w-full bg-black bg-opacity-70 text-white py-2 opacity-0 duration-500 ease-in-out cursor-pointer group-hover:opacity-100'>
                                            <h3 className='flex items-center justify-center gap-2 text-[14px]'><BsCartPlusFill />Add To Cart</h3>
                                        </div>
                                    </div>
                                    <div className='mt-[10px]'>
                                        <h1 className='font-semibold text-[14px] md:text-[18px] w-[100px] md:w-[200px] truncate'>{item.title}</h1>
                                        <h3 className='text-red-500 font-semibold text-[14px] my-2'>${item.price}</h3>
                                        <div className='flex text-[14px]'>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                            <span className=' text-yellow-600'><CiStar /></span>
                                        </div>
                                    </div>
                                    <div className='absolute top-0 p-[10px]'>
                                        <h3 className='bg-red-500 w-[40px] text-center text-[10px] font-semibold rounded-[5px]'>{item.discountPercentage}%</h3>
                                    </div>
                                    <div className='absolute right-0 -top-12 p-[20px] flex flex-col gap-2 duration-700 ease-in-out group-hover:top-0'>
                                        <span className='bg-white p-1 text-[20px] rounded-full cursor-pointer duration-300 ease-in-out hover:scale-110 hover:text-red-500 ' onClick={() => deleteItem(index)}><HiOutlineTrash /></span>
                                    </div>
                                </div>
                            ))}
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
                </div>
            </section>

        </>
    );
};

export default WishlistProducts;