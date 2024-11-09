import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { decrement, deletProduct, increment } from './Slice/CartSlice';
import { useDispatch, useSelector } from 'react-redux';


// Icon
import { IoIosCloseCircle } from "react-icons/io";


const Cart = () => {

    let cartItems = useSelector((state) => state.product.CartItem)

    let dispatch = useDispatch()

    let handleIncrement = (itemId) => {
        dispatch(increment(itemId))
    }

    let handleDecrement = (itemId) => {
        dispatch(decrement(itemId))
    }

    // Plus total price

    let total = cartItems.reduce((acc, curr) => {
        return acc + (curr.price * curr.qty)
    }, 0)

    let deleteItem = (itemId) => {
        dispatch(deletProduct(itemId))
    }





    return (
        <>

            <section>
                <div className="container mt-[150px] mb-[50px] mx-auto">
                    <div className='flex flex-col gap-[30px]'>
                        <div>
                            <ul className='flex items-center justify-between gap-2 px-5 shadow-slate-600 shadow-sm py-2'>
                                <li className='basis-[40%] pl-10'>Product</li>
                                <li className='basis-[10%] text-center'>Price</li>
                                <li className='basis-[20%] text-center'>Quantity</li>
                                <li className='basis-[23%] text-end'>Subtotal</li>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-6'>
                            {cartItems.map((item, index) => (
                                <div className='flex items-center justify-between gap-2 group px-2 shadow-slate-600 shadow-sm py-1'>
                                    <div className='flex items-center gap-2 relative basis-[40%]'>
                                        <div className=''>
                                            <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[50px] w-[50px]' /></Link>
                                        </div>
                                        <h2 className='text-[14px]'>{item.title}</h2>
                                        <span className='absolute top-0 left-0 text-red-500 opacity-0 duration-700 ease-in-out cursor-pointer group-hover:opacity-100 ' onClick={() => deleteItem(index)}><IoIosCloseCircle /></span>
                                    </div>
                                    <div className='basis-[10%] text-center text-[14px]'><h4>{item.price}</h4></div>
                                    <div className='basis-[20%] text-center flex justify-center'>

                                        <div className='w-[60px] border-2 border-black flex items-center justify-center gap-2 text-[20px]'>
                                            <span className='cursor-pointer text-[20px] hover:text-red-600' onClick={() => handleIncrement(index)}>+</span>
                                            <span className='text-[14px]'>{item.qty}</span>
                                            <span className='cursor-pointer hover:text-red-600' onClick={() => handleDecrement(index)}>-</span>
                                        </div>
                                    </div>
                                    <div className='basis-[23%] text-end'>
                                        <h3>Rs. {((item.qty) * (item.price)).toFixed(2)}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex items-center justify-between gap-2'>
                            <button className='border-2 border-black rounded-md px-6 py-2'>
                                <Link to="/shop"><a>Return To Shop</a></Link>
                            </button>
                            <button className='border-2 border-black rounded-md px-6 py-2'>
                                <a>Update Cart</a>
                            </button>
                        </div>
                        <div className='flex flex-col justify-center md:items-end items-center gap-4 mt-8'>
                            <div className='flex items-center gap-5'>
                                <input className='outline-0 border-slate-600 border-2 rounded-md py-3 px-2' type="text" placeholder='Coupon Code' />
                                <button className='px-7 py-3 rounded-md border-2 border-black duration-300 hover:bg-red-500'>
                                    <a>Apply Coupon</a>
                                </button>
                            </div>
                            <div className='border-2 border-black p-5 w-[350px] flex flex-col gap-4'>
                                <h2 className='text-[20px] font-semibold'>Cart Total</h2>
                                <div className='flex items-center justify-between border-b-2 border-slate-300 pb-2 duration-300 hover:border-black'>
                                    <h4>Subtotal</h4>
                                    <h5>Rs. {total.toFixed(2)}</h5>
                                </div>
                                <div className='flex items-center justify-between border-b-2 border-slate-300 pb-2 duration-300 hover:border-black'>
                                    <h4>Shipping</h4>
                                    <h5>Rs. {total.toFixed(2)}</h5>
                                </div>
                                <div className='flex items-center justify-between border-b-2 border-slate-300 pb-2 duration-300 hover:border-black'>
                                    <h4>Total</h4>
                                    <h5>Rs. {total.toFixed(2)}</h5>
                                </div>
                                <button className='px-7 py-3 rounded-md mt-5 max-w-fit mx-auto border-2 border-black duration-300 hover:bg-red-500'>
                                    <Link to="/checkOut"><a>Process to Checkout</a></Link>
                                </button>
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
                </div>
            </section>
        </>
    );
};

export default Cart;