import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Icon
import { IoIosCloseCircle } from "react-icons/io";
import { apiData } from './ContextApi';


const Cart = () => {

    let products = useContext(apiData)

    let filterProducts = products.filter((item) => item.id >= 23 == item.id <= 28)
    return (
        <>

            <section>
                <div className="container my-[50px] mx-auto">
                    <div className='flex flex-col gap-[30px]'>
                        <div>
                            <ul className='flex items-center justify-between gap-2 px-5 shadow-slate-600 shadow-sm py-2'>
                                <li className='basis-[23%] pl-10'>Product</li>
                                <li className='basis-[23%] text-center'>Price</li>
                                <li className='basis-[23%] text-center'>Quantity</li>
                                <li className='basis-[23%] text-end'>Subtotal</li>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-6'>
                            {filterProducts.map((item) => (
                                <div className='flex items-center justify-between gap-2 group px-5 shadow-slate-600 shadow-sm py-1'>
                                    <div className='flex items-center gap-4 relative basis-[23%]'>
                                        <img className='h-[70px]' src={item.thumbnail} alt="" />
                                        <h2>{item.title}</h2>
                                        <span className='absolute top-0 left-0 text-red-500 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100 '><IoIosCloseCircle /></span>
                                    </div>
                                    <div className='basis-[23%] text-center'><h4>{item.price}</h4></div>
                                    <div className='basis-[23%] text-center'><input className='border-2  w-[50px]' type="number" placeholder='1' /></div>
                                    <div className='basis-[23%] text-end'>
                                        <h3>{item.price}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex items-center justify-between gap-2'>
                            <button className='border-2 border-black rounded-md px-6 py-2'>
                                <Link to="/"><a>Return To Shop</a></Link>
                            </button>
                            <button className='border-2 border-black rounded-md px-6 py-2'>
                                <a>Update Cart</a>
                            </button>
                        </div>
                        <div className='flex justify-between gap-2 items-start mt-8'>
                            <div className='flex items-center gap-3'>
                                <input className='outline-0 border-slate-600 border-2 rounded-md py-3 px-2' type="text" placeholder='Coupon Code' />
                                <button className='bg-red-600 px-7 py-3 rounded-md text-white'>
                                    <a>Apply Coupon</a>
                                </button>
                            </div>
                            <div className='border-2 border-black p-5 w-[350px] flex flex-col gap-4'>
                                <h2 className='text-[20px] font-semibold'>Cart Total</h2>
                                <div className='flex items-center justify-between border-b-2 border-slate-300 pb-2'>
                                    <h4>Subtotal</h4>
                                    <h5>$2372</h5>
                                </div>
                                <div className='flex items-center justify-between border-b-2 border-slate-300 pb-2'>
                                    <h4>Shipping</h4>
                                    <h5>$2372</h5>
                                </div>
                                <div className='flex items-center justify-between border-b-2 border-slate-300 pb-2'>
                                    <h4>Total</h4>
                                    <h5>$2372</h5>
                                </div>
                                <button className='bg-red-600 px-7 py-3 rounded-md text-white mt-5 max-w-fit mx-auto'>
                                    <Link to="/checkOut"><a>Process to Checkout</a></Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Cart;