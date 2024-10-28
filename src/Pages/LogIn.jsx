import React from 'react';

// Img
import sideImg from "/src/assets/SideImage.png"

const LogIn = () => {
    return (
        <>

            <section>
                <div className="container mx-auto my-[50px]">
                    <div className='flex flex-wrap gap-[150px] items-center'>
                        <div className='basis-[48%]'>
                            <img src={sideImg} alt="" />
                        </div>
                        <div className='basis-[30%] flex flex-col gap-[20px]'>
                            <h1 className='text-[35px] font-semibold'>Log in to Exclusive</h1>
                            <h3 className='text-[14px]'>Enter your details below</h3>
                            <input className='outline-none border-b-2 border-slate-400 py-2' type="text" placeholder='Email or Phone Number' />
                            <input className='outline-none border-b-2 border-slate-400 py-2' type="text" placeholder='Password' />
                            <div className='flex items-center justify-between'>
                                <button className='bg-red-600 py-3 text-white rounded-sm px-[40px]'>
                                    <a className=''>Log In</a>
                                </button>
                                <button className='text-red-600'>
                                    <a className=''> Forget Password ?</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default LogIn;