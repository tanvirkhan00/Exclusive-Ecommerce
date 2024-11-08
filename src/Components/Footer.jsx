import React from 'react';
import { Link } from 'react-router-dom';

// Icon
import { FaFacebookF } from "react-icons/fa6";
import { FiTwitter } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io5";
import { RiLinkedinFill } from "react-icons/ri";
import { BsQrCode } from "react-icons/bs";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";



const Footer = () => {
    return (
        <>

            <footer className='bg-black px-[10px]'>
                <div className="container mx-auto">
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[20px] text-white py-[50px] text-[12px]'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[30px] font-bold'>Exclusive</h1>
                            <h3 className='text-[20px]'>Subscribe</h3>
                            <h4 className=''>Get 10% off your first order</h4>
                            <div className='mt-[10px]'>
                                <input className='outline-none py-2 px-2 bg-transparent border-2 border-white rounded-md' type="text" placeholder='Enter your email' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[25px]'>Support</h1>
                            <h3>111 Bijoy sarani, Dhaka , DH 1515, Bangladesh</h3>
                            <h4>exclusive@gmail.com</h4>
                            <p>+880195-9948542</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[25px]'>Account</h1>
                            <Link to="account"><h3>My Account</h3></Link>
                            <Link to="signUp"><h3>Login/ Register</h3></Link>
                            <Link to="/cart"><h3>Cart</h3></Link>
                            <Link to="/wishList"><h3>Wishlist</h3></Link>
                            <Link to="/shop"><h1>Shop</h1></Link>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[25px]'>Quick Link</h1>
                            <h3>Privacy Policy</h3>
                            <h3>Terms Of Use</h3>
                            <h3>FAQ</h3>
                            <Link to="/contact"><h3>Contact</h3></Link>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[25px]'>Download App</h1>
                            <h4>Save $3 with App New User Only</h4>
                            <div className='flex items-center gap-2'>
                                <div>
                                    <span className='text-[80px]'><BsQrCode /></span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex items-center gap-2 border-2 border-white rounded-md px-2'>
                                        <span className='text-green-500 text-[20px]'><IoLogoGooglePlaystore /></span>
                                        <div>
                                            <h3 className='text-[8px]'>Get It On</h3>
                                            <h2 className='text-[10px] font-semibold'>Google Play</h2>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 border-2 border-white rounded-md px-2'>
                                        <span className=' text-[20px]'><FaApple /></span>
                                        <div>
                                            <h3 className='text-[8px]'>Download on the</h3>
                                            <h2 className='text-[10px] font-semibold'>App Store</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-8 text-[15px] mt-2'>
                                <span><FaFacebookF /></span>
                                <span><FiTwitter /></span>
                                <span><IoLogoInstagram /></span>
                                <span><RiLinkedinFill /></span>
                            </div>
                        </div>
                    </div>
                    <div className="text-white text-center border-t-2 border-slate-600 py-4 opacity-50 text-[14px]">
                        <p>Copyright Tanvir Khan 2024. All right reserved</p>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default Footer;