import React from 'react';

const Account = () => {
    return (
        <>

            <section>
                <div className="container mx-auto my-[50px]">
                    <h1 className='text-end'>Welcome! <span className='text-red-600'>Tanvir Khan</span></h1>
                    <div className='flex justify-between gap-4 mt-5'>
                        <div className='basis-[30%] flex flex-col gap-6'>
                            <div>
                                <h1 className='text-[35px] font-semibold'>Manage My Account</h1>
                                <ul className='flex flex-col gap-2 text-slate-500'>
                                    <li className='text-red-500'>My Profile</li>
                                    <li>Address Book</li>
                                    <li>My Payment Options</li>
                                </ul>
                            </div>
                            <div>
                                <h1 className='text-[35px] font-semibold'>My Orders</h1>
                                <ul className='flex flex-col gap-2 text-slate-500'>
                                    <li>My Returns</li>
                                    <li>My Cancellations</li>
                                </ul>
                            </div>
                            <div>
                                <h1 className='text-[35px] font-semibold'>My WishList</h1>
                            </div>
                        </div>
                        <div className='basis-[60%] flex flex-col gap-4 shadow-lg p-8'>
                            <h1 className='text-[30px] font-semibold'>Edit Your Profile</h1>
                            <div className='flex flex-wrap gap-x-[50px] gap-y-4'>
                                <div className='basis-[45%] flex flex-col gap-1'>
                                    <label htmlFor="fname">First Name</label>
                                    <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md' type="text" placeholder='Tanvir' />
                                </div>
                                <div className='basis-[45%] flex flex-col gap-1'>
                                    <label htmlFor="lname">Last Name</label>
                                    <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md' type="text" placeholder='Khan' />
                                </div>
                                <div className='basis-[45%] flex flex-col gap-1'>
                                    <label htmlFor="email">Email</label>
                                    <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md' type="text" placeholder='kmtanvir1111@gmail.com' />
                                </div>
                                <div className='basis-[45%] flex flex-col gap-1'>
                                    <label htmlFor="address">Address</label>
                                    <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md' type="text" placeholder='Bhederganj, Shariatpur, Dhaka' />
                                </div>
                                <div className='basis-[97%] flex flex-col gap-1'>
                                    <label htmlFor="password">Password Changes</label>
                                    <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md' type="text" placeholder='Current Password' />
                                </div>
                                <div className='basis-[97%] flex flex-col gap-1'>
                                    <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md' type="text" placeholder='New Password' />
                                </div>
                                <div className='basis-[97%] flex flex-col gap-1'>
                                    <input className='outline-none bg-slate-100 py-2 px-2 border-2 border-slate-300 rounded-md' type="text" placeholder='Confirm New Password' />
                                </div>
                                <div className='flex gap-4 items-center justify-end basis-[97%]'>
                                    <button className='border-2 border-slate-400 px-7 py-3 rounded-md'>
                                        <a>Cancel</a>
                                    </button>
                                    <button className='border-2 border-slate-400 px-7 py-3 rounded-md bg-red-600 text-white'>
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