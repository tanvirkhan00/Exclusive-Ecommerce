import React from 'react';
import { motion } from 'framer-motion';

// Img
import Girls from "/src/assets/Girls.png"

const OurStory = () => {
    
    return (
        <>
            <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-red-50/30 lg:mt-[100px]">
                <div className="container mx-auto px-4">
                    <div className='flex justify-between items-center flex-wrap gap-12 lg:gap-12'>
                        {/* Text Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className='flex flex-col gap-6 lg:basis-[48%]'
                        >
                            <div className="space-y-3">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "60px" }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="h-1 bg-gradient-to-r from-red-500 to-red-600"
                                />
                                <h1 className='text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent'>
                                    Our Story
                                </h1>
                            </div>
                            
                            <div className="space-y-5 text-slate-600 leading-relaxed">
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="text-lg"
                                >
                                    Launched in 2015, <span className="font-semibold text-red-500">Exclusive</span> is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has <span className="font-semibold text-slate-900">10,500 sellers</span> and <span className="font-semibold text-slate-900">300 brands</span> and serves <span className="font-semibold text-slate-900">3 million customers</span> across the region.
                                </motion.p>
                                
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="text-lg"
                                >
                                    Exclusive has more than <span className="font-semibold text-slate-900">1 Million products</span> to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer electronics to fashion and lifestyle.
                                </motion.p>
                            </div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="flex gap-8 pt-4"
                            >
                                <div className="space-y-1">
                                    <div className="text-3xl font-bold text-red-500">8+</div>
                                    <div className="text-sm text-slate-500">Years Experience</div>
                                </div>
                                <div className="w-px bg-slate-200"></div>
                                <div className="space-y-1">
                                    <div className="text-3xl font-bold text-red-500">1M+</div>
                                    <div className="text-sm text-slate-500">Products</div>
                                </div>
                                <div className="w-px bg-slate-200"></div>
                                <div className="space-y-1">
                                    <div className="text-3xl font-bold text-red-500">3M+</div>
                                    <div className="text-sm text-slate-500">Happy Customers</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Image */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className='lg:basis-[48%] relative group'
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700' 
                                    src={Girls} 
                                    alt="Our Story" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurStory;