import React from 'react';

// Icon
import { TbPhoneCall } from "react-icons/tb";
import { CiMail } from "react-icons/ci";



const ContactSection = () => {
    return (
        <>

            <section>
                <div className="container my-[50px] mx-auto">
                    <div className='flex justify-between gap-2 flex-wrap'>
                        <div className='basis-[30%] shadow-lg p-10 flex flex-col gap-5 text-[14px]'>
                            <div className='flex flex-col gap-2 border-b-2 border-slate-300 pb-5'>
                                <h2 className='flex items-center gap-2 text-[20px] font-semibold'><span className='bg-red-500 p-2 rounded-full text-white text-[16px]'><TbPhoneCall /></span>Call To Us</h2>
                                <p>We are available 24/7, 7days a week</p>
                                <h4>Phone : +880 19599-48542</h4>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='flex items-center gap-2 text-[20px] font-semibold'><span className='bg-red-500 p-2 rounded-full text-white text-[16px]'><CiMail /></span>Write to Us</h2>
                                <p>Fill out our form and we will contact you within 24 hour.</p>
                                <h3>Email: kmtanvir1111@gmail.com</h3>
                                <h3>Emails: support@exclusive.com</h3>
                            </div>
                        </div>
                        <div className='basis-[60%] flex flex-wrap justify-between gap-2 max-h-fit shadow-lg p-10'>
                            <input type="text" className='bg-slate-100 py-2 outline-none px-2 border-2 border-slate-200 rounded-sm basis-[32%]' placeholder='Your Name' />
                            <input type="text" className='bg-slate-100 py-2 outline-none px-2 border-2 border-slate-200 rounded-sm basis-[32%]' placeholder='Your Email' />
                            <input type="text" className='bg-slate-100 outline-none px-2 border-2 py-2 border-slate-200 rounded-sm basis-[32%]' placeholder='Your Phone' />
                            <input type="text" className='bg-slate-100 py-2 outline-none px-2 border-2 border-slate-200 rounded-sm basis-[100%] h-[150px] mt-5' placeholder='Your Massage' />
                            <button className='w-full text-end mt-5'>
                                <a className='text-end bg-red-500 px-8 py-3 rounded-sm text-white'>Sent Message</a>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default ContactSection;