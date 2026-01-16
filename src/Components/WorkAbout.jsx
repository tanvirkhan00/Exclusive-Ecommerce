import React from 'react';
import { FaCaravan } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { ImHeadphones } from "react-icons/im";

const WorkAbout = () => {
    const features = [
        {
            icon: <FaCaravan />,
            title: "Free And Fast Delivery",
            description: "Free delivery for all orders over $140",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: <ImHeadphones />,
            title: "24/7 Customer Service",
            description: "Friendly 24/7 customer support",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: <GoShieldCheck />,
            title: "Money Back Guarantee",
            description: "We return money within 30 days",
            gradient: "from-orange-500 to-red-500"
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                        >
                            {/* Animated background gradient on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                            
                            {/* Icon container with gradient */}
                            <div className="relative flex justify-center mb-6">
                                <div className={`relative bg-gradient-to-br ${feature.gradient} p-5 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <span className="text-white text-3xl">
                                        {feature.icon}
                                    </span>
                                    
                                    {/* Animated ring */}
                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${feature.gradient} animate-ping opacity-20 group-hover:opacity-40`}></div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Bottom accent line */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkAbout;