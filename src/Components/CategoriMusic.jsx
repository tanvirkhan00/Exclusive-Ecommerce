import React from 'react';

// Img
import jblMusic from "/src/assets/JBL_BOOMBOX.png"

const CategoriMusic = () => {
    return (
        <>

            <section>
                <div className="container mx-auto mt-[50px]">
                    <div className='flex flex-wrap justify-between items-center bg-black gap-[20px] gap-y-10 py-[50px] px-5'>
                        <div className='basis-[35%] text-white'>
                            <h4 className='text-green-600'>Categories</h4>
                            <h1 className='text-[30px]'>Enhance Your Music Experience</h1>
                            <div className='flex items-center gap-[20px] mt-[20px]'>
                                <div className='h-[60px] w-[60px] bg-white rounded-full text-black flex flex-col text-center justify-center font-bold leading-[15px] text-[12px]'>
                                    <h3>23</h3>
                                    <h4>Hours</h4>
                                </div>
                                <div className='h-[60px] w-[60px] bg-white rounded-full text-black flex flex-col text-center justify-center font-bold leading-[15px] text-[12px]'>
                                    <h3>05</h3>
                                    <h4>Days</h4>
                                </div>
                                <div className='h-[60px] w-[60px] bg-white rounded-full text-black flex flex-col text-center justify-center font-bold leading-[15px] text-[12px]'>
                                    <h3>59</h3>
                                    <h4>Munite</h4>
                                </div>
                                <div className='h-[60px] w-[60px] bg-white rounded-full text-black flex flex-col text-center justify-center font-bold leading-[15px] text-[12px]'>
                                    <h3>35</h3>
                                    <h4>Seconds</h4>
                                </div>
                            </div>
                            <button className='mt-[40px]'>
                                <a className=' px-[50px] py-[15px] bg-green-500 rounded-md'>Buy Now</a>
                            </button>
                        </div>
                        <div className='basis-[50%]'>
                            <img src={jblMusic} alt="" className='h-[170px]' />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default CategoriMusic;