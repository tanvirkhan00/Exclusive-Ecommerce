import React from 'react';

// Img
import Girls from "/src/assets/Girls.png"

const OurStory = () => {
    
    return (
        <>
            
            <section>
                <div className="container mt-[150px]">
                    <div className='flex justify-between items-center flex-wrap gap-2'>
                        <div className='flex flex-col gap-4 lg:basis-[48%]'>
                            <h1 className='text-[30px] font-semibold'>Our Story</h1>
                            <p>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                            <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                        </div>
                        <div className='lg:basis-[48%]'>
                            <img className='w-full' src={Girls} alt="" />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default OurStory;