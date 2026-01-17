import React from 'react';
import Slider from "react-slick";
import { motion } from 'framer-motion';

// Icon
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";

// Image
import Team1 from "/src/assets/Team1.png";
import Team2 from "/src/assets/Team2.png";
import Team3 from "/src/assets/Team3.png";

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TeamMember = () => {
    const teamMembers = [
        {
            name: "Tom Cruise",
            position: "Founder & Chairman",
            image: Team1,
            social: {
                twitter: "#",
                instagram: "#",
                linkedin: "#"
            }
        },
        {
            name: "Emma Watson",
            position: "Managing Director",
            image: Team2,
            social: {
                twitter: "#",
                instagram: "#",
                linkedin: "#"
            }
        },
        {
            name: "Will Smith",
            position: "Product Designer",
            image: Team3,
            social: {
                twitter: "#",
                instagram: "#",
                linkedin: "#"
            }
        },
        {
            name: "Tom Cruise",
            position: "Founder & Chairman",
            image: Team1,
            social: {
                twitter: "#",
                instagram: "#",
                linkedin: "#"
            }
        },
        {
            name: "Emma Watson",
            position: "Managing Director",
            image: Team2,
            social: {
                twitter: "#",
                instagram: "#",
                linkedin: "#"
            }
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(239,68,68,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_40%)]"></div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block">
                            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-4"></div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3">Meet Our Team</h2>
                            <p className="text-slate-600 text-lg">The brilliant minds behind Exclusive</p>
                        </div>
                    </motion.div>

                    {/* Custom Slider Styles */}
                    <style>{`
                        .team-slider .slick-dots {
                            bottom: -50px;
                        }
                        .team-slider .slick-dots li button:before {
                            font-size: 12px;
                            color: #cbd5e1;
                            opacity: 1;
                            transition: all 0.3s ease;
                        }
                        .team-slider .slick-dots li.slick-active button:before {
                            color: #ef4444;
                            transform: scale(1.3);
                        }
                        .team-slider .slick-dots li:hover button:before {
                            color: #f87171;
                        }
                        .team-slider .slick-arrow {
                            width: 45px;
                            height: 45px;
                            z-index: 10;
                        }
                        .team-slider .slick-prev {
                            left: -60px;
                        }
                        .team-slider .slick-next {
                            right: -60px;
                        }
                        .team-slider .slick-prev:before,
                        .team-slider .slick-next:before {
                            font-size: 45px;
                            color: #ef4444;
                            opacity: 0.8;
                        }
                        .team-slider .slick-prev:hover:before,
                        .team-slider .slick-next:hover:before {
                            opacity: 1;
                        }
                    `}</style>

                    <div className='team-slider px-4'>
                        <Slider {...settings}>
                            {teamMembers.map((member, index) => (
                                <div key={index} className='px-3'>
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className='group'
                                    >
                                        <div className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'>
                                            {/* Image Container */}
                                            <div className='relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50'>
                                                <img 
                                                    className='w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700' 
                                                    src={member.image} 
                                                    alt={member.name} 
                                                />
                                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                                                
                                                {/* Social Icons - Appear on Hover */}
                                                <div className='absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                                                    <div className='flex items-center justify-center gap-3'>
                                                        <a 
                                                            href={member.social.twitter}
                                                            className='w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110'
                                                        >
                                                            <CiTwitter className='text-xl' />
                                                        </a>
                                                        <a 
                                                            href={member.social.instagram}
                                                            className='w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110'
                                                        >
                                                            <FaInstagram className='text-xl' />
                                                        </a>
                                                        <a 
                                                            href={member.social.linkedin}
                                                            className='w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110'
                                                        >
                                                            <RiLinkedinLine className='text-xl' />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info Container */}
                                            <div className='p-6 text-center bg-white'>
                                                <h3 className='text-2xl font-bold text-slate-900 mb-2 group-hover:text-red-500 transition-colors duration-300'>
                                                    {member.name}
                                                </h3>
                                                <p className='text-slate-600 font-medium'>
                                                    {member.position}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamMember;