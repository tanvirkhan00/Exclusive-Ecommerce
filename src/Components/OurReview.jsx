import React from 'react';
import { motion } from 'framer-motion';

// Icons
import { TbHomeHeart } from "react-icons/tb";
import { CiDollar } from "react-icons/ci";
import { HiShoppingBag } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";

const OurReview = () => {
    const stats = [
        {
            icon: TbHomeHeart,
            value: "10.5k",
            label: "Sellers active on our site",
            gradient: "from-red-500 to-pink-500",
            delay: 0.1
        },
        {
            icon: CiDollar,
            value: "33k",
            label: "Monthly Product Sales",
            gradient: "from-blue-500 to-cyan-500",
            delay: 0.2
        },
        {
            icon: HiShoppingBag,
            value: "45.5k",
            label: "Customers active on our site",
            gradient: "from-purple-500 to-pink-500",
            delay: 0.3
        },
        {
            icon: FaSackDollar,
            value: "25k",
            label: "Annual gross sales on our site",
            gradient: "from-orange-500 to-red-500",
            delay: 0.4
        }
    ];

    return (
        <>
            <section className="py-20 bg-white relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.05),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block">
                            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-4"></div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3">Our Achievements</h2>
                            <p className="text-slate-600 text-lg">Numbers that speak for themselves</p>
                        </div>
                    </motion.div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: stat.delay }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className='group relative'
                            >
                                {/* Card */}
                                <div className='relative bg-white border-2 border-slate-100 rounded-2xl p-8 flex flex-col gap-4 items-center overflow-hidden transition-all duration-500 hover:border-transparent hover:shadow-2xl'>
                                    {/* Animated background gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon container */}
                                        <div className='relative mb-2'>
                                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
                                            <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                                                <stat.icon className='text-white text-4xl' />
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <h3 className='text-5xl font-bold text-slate-900 group-hover:text-white transition-colors duration-500 mb-1'>
                                            {stat.value}
                                        </h3>
                                        <p className='text-slate-600 group-hover:text-white/90 transition-colors duration-500 text-center font-medium'>
                                            {stat.label}
                                        </p>
                                    </div>

                                    {/* Decorative corner */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurReview;