import React from 'react';
import { Link } from 'react-router-dom';

const Account = () => {
    return (
        <>

            <section>
                <div className="container mx-auto my-[150px]">
                    <h1 className='text-end'>Welcome! <span className='text-red-600'>Tanvir Khan</span></h1>
                    <div className='flex flex-wrap gap-4 mt-5'>
                        <div className='flex flex-wrap md:flex-col gap-2 md:basis-[48%]'>
                            <div>
                                <h1 className='text-[35px] font-semibold'>Manage My Account</h1>
                                <ul className='flex flex-col gap-2 text-slate-500'>
                                    <li className='hover:text-red-500'>My Profile</li>
                                    <li className='hover:text-red-500'>Address Book</li>
                                    <li className='hover:text-red-500'>My Payment Options</li>
                                </ul>
                            </div>
                            <div>
                                <h1 className='text-[35px] font-semibold'>My Orders</h1>
                                <ul className='flex flex-col gap-2 text-slate-500'>
                                    <li className='hover:text-red-500'>My Returns</li>
                                    <li className='hover:text-red-500'>My Cancellations</li>
                                </ul>
                            </div>
                            <div>
                                <Link to="/wishList"><h1 className='text-[35px] font-semibold'>My WishList</h1></Link>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 shadow-lg p-8 md:basis-[48%]'>
                            <h1 className='text-[30px] font-semibold'>Edit Your Profile</h1>
                            <div className='flex flex-col gap-10'>
                                <form className='flex flex-wrap gap-y-4'>
                                    <div className='basis-[100%] flex flex-col gap-1'>
                                        <label htmlFor="fname">First Name</label>
                                        <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md duration-300 hover:border-black' type="text" placeholder='Tanvir' />
                                    </div>
                                    <div className='basis-[100%] flex flex-col gap-1'>
                                        <label htmlFor="lname">Last Name</label>
                                        <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md duration-300 hover:border-black' type="text" placeholder='Khan' />
                                    </div>
                                    <div className='basis-[100%] flex flex-col gap-1'>
                                        <label htmlFor="email">Email</label>
                                        <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md duration-300 hover:border-black' type="gmail" placeholder='kmtanvir1111@gmail.com' />
                                    </div>
                                    <div className='basis-[100%] flex flex-col gap-1'>
                                        <label htmlFor="address">Address</label>
                                        <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md duration-300 hover:border-black' type="text" placeholder='Bhederganj, Shariatpur, Dhaka' />
                                    </div>
                                    <div className='basis-[100%] flex flex-col gap-1'>
                                        <label htmlFor="password">Password Changes</label>
                                        <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md duration-300 hover:border-black' type="password" placeholder='Current Password' />
                                    </div>
                                    <div className='basis-[100%] flex flex-col gap-1'>
                                        <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md duration-300 hover:border-black' type="password" placeholder='New Password' />
                                    </div>
                                    <div className='basis-[100%] flex flex-col gap-1'>
                                        <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md duration-300 hover:border-black' type="password" placeholder='Confirm New Password' />
                                    </div>
                                </form>
                                <div className='flex gap-4 items-center justify-end'>
                                    <button className='border-2 border-slate-400 px-7 py-3 rounded-md'>
                                        <a>Cancel</a>
                                    </button>
                                    <button className='border-2 border-slate-400 px-7 py-3 rounded-md duration-300 bg-green-500 hover:bg-red-600'>
                                        <a>Save Changes</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Account;