import React from 'react';
import Slider from "react-slick";

// Icon
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";


// Image
import Team1 from "/src/assets/Team1.png";
import Team2 from "/src/assets/Team2.png";
import Team3 from "/src/assets/Team3.png";

const TeamMember = () => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 7000,
        autoplaySpeed: 2000,
        cssEase: "linear",
         responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
    };

    return (
        <>

            <section>
                <div className="container mx-auto mt-[50px]">
                    <div className='slider-container w-[100%]'>
                        <Slider {...settings}>
                            <div className=''>
                                <div className='w-[90%]'>
                                    <img className='w-full' src={Team1} alt="" />
                                    <div className='flex flex-col gap-2 items-center'>
                                        <h2 className='text-[25px] font-semibold'>Tom Cruise</h2>
                                        <p>Founder & Chairmen</p>
                                        <div className='flex items-center gap-3'>
                                            <span><CiTwitter /></span>
                                            <span><FaInstagram /></span>
                                            <span><RiLinkedinLine /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='w-[90%]'>
                                    <img src={Team2} alt="" />
                                    <div className='flex flex-col gap-2 items-center'>
                                        <h2 className='text-[25px] font-semibold'>Emma Watson</h2>
                                        <p>Managing Director</p>
                                        <div className='flex items-center gap-3'>
                                            <span><CiTwitter /></span>
                                            <span><FaInstagram /></span>
                                            <span><RiLinkedinLine /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='w-[90%]'>
                                    <img src={Team3} alt="" />
                                    <div className='flex flex-col gap-2 items-center'>
                                        <h2 className='text-[25px] font-semibold'>Will Smith</h2>
                                        <p>Product Designer</p>
                                        <div className='flex items-center gap-3'>
                                            <span><CiTwitter /></span>
                                            <span><FaInstagram /></span>
                                            <span><RiLinkedinLine /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='w-[90%]'>
                                    <img src={Team1} alt="" />
                                    <div className='flex flex-col gap-2 items-center'>
                                        <h2 className='text-[25px] font-semibold'>Tom Cruise</h2>
                                        <p>Founder & Chairmen</p>
                                        <div className='flex items-center gap-3'>
                                            <span><CiTwitter /></span>
                                            <span><FaInstagram /></span>
                                            <span><RiLinkedinLine /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='w-[90%]'>
                                    <img src={Team2} alt="" />
                                    <div className='flex flex-col gap-2 items-center'>
                                        <h2 className='text-[25px] font-semibold'>Emma Watson</h2>
                                        <p>Managing Director</p>
                                        <div className='flex items-center gap-3'>
                                            <span><CiTwitter /></span>
                                            <span><FaInstagram /></span>
                                            <span><RiLinkedinLine /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>

        </>
    );
};

export default TeamMember;