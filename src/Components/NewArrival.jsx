import React from 'react';

// Img
import speaker from "/src/assets/Speaker.png"
import speaker1 from "/src/assets/Speaker1.png"
import woman from "/src/assets/attractive-woman.png"
import perfume from "/src/assets/perfume.png"

const NewArrival = () => {
    return (
        <>

            <section>
                <div className="container mt-[50px]">
                    <div>
                        <div className='flex items-center gap-[10px]'>
                            <span className='w-[10px] h-[20px] bg-red-600'></span>
                            <h1 className='font-semibold text-red-600'>Featured</h1>
                        </div>
                        <h1 className='text-[35px] font-semibold mt-[20px]'>New Arriaval</h1>
                        <div className='flex flex-wrap items-center justify-between mt-[20px] gap-[20px]'>
                            <div className='relative bg-black h-full md:h-[500px] pt-[80px] md:basis-[48%]'>
                                <img src={speaker1} alt="" className='lg:h-[400px]' />
                                <div className='absolute bottom-0 p-[50px] text-white w-[70%] flex flex-col gap-2'>
                                    <h1 className='text-[30px] font-semibold'>Play Station 5</h1>
                                    <p className='font-semibold text-[14px]'>Black and White verson of the FS5 coming out on sale</p>
                                    <a className='border-b-2 border-white max-w-fit'>Shop Now</a>
                                </div>
                            </div>
                            <div className='flex flex-col gap-[20px] md:basis-[48%]'>
                                <div className='relative flex items-end'>
                                    <img src={woman} alt="" className='w-full h-[290px]' />
                                    <div className='absolute bottom-0 p-[30px] text-white flex flex-col gap-2'>
                                        <h1 className='text-[30px] font-semibold'>Woman's Collections</h1>
                                        <p className='font-semibold text-[14px] w-[60%]'>Featured woman collections that give you another vibe</p>
                                        <a className='border-b-2 border-white max-w-fit'>Shop Now</a>
                                    </div>
                                </div>
                                <div className='basis-[100%] flex gap-[20px] justify-between'>
                                    <div className='relative bg-black basis-[48%] p-[30px] md:p-[10px]'>
                                        <img src={speaker} alt="" className='w-full h-[220px] md:h-[130px]' />
                                        <div className='absolute bottom-[20px] text-white flex flex-col gap-2'>
                                            <h1 className='text-[30px] font-semibold'>Speakers</h1>
                                            <p className='font-semibold text-[14px]'>Amazon wireless speakers</p>
                                            <a className='border-b-2 border-white max-w-fit'>Shop Now</a>
                                        </div>
                                    </div>
                                    <div className='relative bg-black basis-[48%] flex items-center px-[30px] md:p-[30px]'>
                                        <img src={perfume} alt="" className='w-full h-[220px] md:h-[130px]' />
                                        <div className='absolute bottom-[20px]  text-white flex flex-col gap-2'>
                                            <h1 className='text-[30px] font-semibold'>Perfume</h1>
                                            <p className='font-semibold text-[14px]'>Gucci Intence OUD EDP</p>
                                            <a className='border-b-2 border-white max-w-fit'>Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default NewArrival;