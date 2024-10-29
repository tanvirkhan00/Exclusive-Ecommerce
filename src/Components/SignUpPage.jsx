import React from 'react';
import { Link } from 'react-router-dom';


// Img
import sideImg from "/src/assets/SideImage.png"


// Icon
import { FcGoogle } from "react-icons/fc";


const SignUpPage = () => {
    return (
        <>

            <section>
                <div className="container mx-auto my-[50px]">
                    <div className='flex flex-wrap gap-[150px] items-center'>
                        <div className='basis-[48%]'>
                            <img src={sideImg} alt="" />
                        </div>
                        <div className='basis-[30%] flex flex-col gap-[20px]'>
                            <h1 className='text-[35px] font-semibold'>Create an account</h1>
                            <h3 className='text-[14px]'>Enter your details below</h3>
                            <form className='flex flex-col gap-4'>
                                <input className='outline-none border-b-2 border-slate-400 py-2 duration-300 ease-in-out hover:border-black' type="text" placeholder='Name' />
                                <input className='outline-none border-b-2 border-slate-400 py-2 duration-300 ease-in-out hover:border-black' type="text" placeholder='Email or Phone Number' />
                                <input className='outline-none border-b-2 border-slate-400 py-2 duration-300 ease-in-out hover:border-black' type="password" placeholder='Password' />
                            </form>
                            <button className='bg-red-600 py-3 text-white rounded-sm hover:bg-red-700'>
                                <a className=''>Create Account</a>
                            </button>
                            <button className='border-2 border-slate-300 py-3 rounded-sm'>
                                <a className='flex items-center gap-2 justify-center'> <span><FcGoogle /></span> Sign up with Google</a>
                            </button>
                            <div className='flex items-center gap-[10px] justify-center'>
                                <h4>Already have account?</h4>
                                <Link to="/login"><a className='font-semibold border-b-2 border-slate-700 cursor-pointer'>Log in</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default SignUpPage;