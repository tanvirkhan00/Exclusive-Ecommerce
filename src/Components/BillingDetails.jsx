import React from 'react';
import { Link } from 'react-router-dom';


// Icon
import { CiSquareCheck } from "react-icons/ci";

// Image
import Bkash from "/src/assets/Bkash.png";
import Visa from "/src/assets/Visa.png";
import Nagad from "/src/assets/Nagad.png";
import MasterCart from "/src/assets/Mastercard.png";
import { useSelector } from 'react-redux';

const BillingDetails = () => {

    let cartProduct = useSelector((state) =>state.product.CartItem)

    let total = cartProduct.reduce((acc, curr) => {
        return acc + (curr.price * curr.qty)
    },0)
    
    return (
        <>
            <section>
                <div className="container mt-[150px] mb-[50px] mx-auto">
                    <h1 className='text-[35px] font-semibold'>Billing Details</h1>
                    <div className='flex justify-between gap-2 flex-wrap mt-[40px]'>
                        <div className='basis-[40%]'>
                            <form className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-slate-500' htmlFor="name">First Name</label>
                                    <input className='bg-slate-100 outline-none rounded-md py-2 px-3 border-2 border-slate-300 duration-300 hover:border-black' type="text" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-slate-500' htmlFor="company">Company name</label>
                                    <input className='bg-slate-100 outline-none rounded-md py-2 px-3 border-2 border-slate-300 duration-300 hover:border-black' type="text" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-slate-500' htmlFor="street">Street Address</label>
                                    <input className='bg-slate-100 outline-none rounded-md py-2 px-3 border-2 border-slate-300 duration-300 hover:border-black' type="text" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-slate-500' htmlFor="appartment">Apartment, floor, etc.(optional)</label>
                                    <input className='bg-slate-100 outline-none rounded-md py-2 px-3 border-2 border-slate-300 duration-300 hover:border-black' type="text" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-slate-500' htmlFor="town">Town/City</label>
                                    <input className='bg-slate-100 outline-none rounded-md py-2 px-3 border-2 border-slate-300 duration-300 hover:border-black' type="text" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-slate-500' htmlFor="number">Phone Number</label>
                                    <input className='bg-slate-100 outline-none rounded-md py-2 px-3 border-2 border-slate-300 duration-300 hover:border-black' type="number" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-slate-500' htmlFor="email">Email Address</label>
                                    <input className='bg-slate-100 outline-none rounded-md py-2 px-3 border-2 border-slate-300 duration-300 hover:border-black' type="email" />
                                </div>
                            </form>
                            <div className='mt-5'>
                                <p className='flex items-center gap-4'><span className='text-[30px] text-red-500'><CiSquareCheck /></span>Save this information for faster check-out next time</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6 basis-[40%] mt-5'>
                            <div className='flex flex-col gap-4'>
                                {cartProduct.map((item) => (
                                    <div className='flex items-center gap-2 justify-between shadow-sm shadow-black px-2 py-1 duration-500 ease-in-out hover:-translate-y-2'>
                                        <div className='flex items-center gap-3 basis-[60%]'>
                                            <Link to={`/shop/${item.id}`}><img src={item.thumbnail} alt="" className='h-[50px]' /></Link>
                                            <h4>{item.title}</h4>
                                        </div>
                                        <span className='basis-[10%]'>{item.qty}*</span>
                                        <h4 className='basis-[20%] text-end'>${item.price}</h4>
                                    </div>
                                ))}
                            </div>
                            <div className='flex items-center justify-between border-b-2 border-slate-300 pb-2 duration-300 hover:border-black'>
                                <h3 className='font-semibold'>Subtotal</h3>
                                <h4>${total.toFixed(2)}</h4>
                            </div>
                            <div className='flex items-center justify-between border-b-2 border-slate-300 pb-2 duration-300 hover:border-black'>
                                <h3 className='font-semibold'>Shipping</h3>
                                <h4>Free</h4>
                            </div>
                            <div className='flex items-center justify-between'>
                                <h3 className='font-semibold'>Total</h3>
                                <h4>${total.toFixed(2)}</h4>
                            </div>
                            <form className='flex flex-col gap-4' action="">
                                <div className='flex items-center gap-2 justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <input type="radio" id='bank' name="fav_language" value="BANK" />
                                        <label htmlFor="bank">Bank</label>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <img src={Bkash} alt="" />
                                        <img src={Visa} alt="" />
                                        <img src={MasterCart} alt="" />
                                        <img src={Nagad} alt="" />
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" id='cash' name="fav_language" value="CASH" />
                                    <label htmlFor="cash">Cash on Delivery</label>
                                </div>
                            </form>
                            <div className='flex items-center flex-wrap gap-4 justify-between'>
                                <div className='border-2 border-slate-500 px-4 py-3 rounded-md flex-1'>
                                    <input className='outline-none' type="text" placeholder='Coupon Code' />
                                </div>
                                <div>
                                    <button className='py-3 px-10 rounded-md border-2 border-black duration-300 hover:bg-red-500'>
                                        <a>Apply Coupon</a>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button className='py-3 px-8 rounded-md border-2 border-black duration-300 hover:bg-red-500'>
                                    <a>Place Order</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BillingDetails;