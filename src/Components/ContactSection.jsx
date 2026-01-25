import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Icon
import { TbPhoneCall } from "react-icons/tb";
import { CiMail } from "react-icons/ci";
import { FiMapPin, FiClock } from "react-icons/fi";
import { BiPaperPlane } from "react-icons/bi";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    };

    const contactInfo = [
        {
            icon: TbPhoneCall,
            title: "Call To Us",
            subtitle: "We are available 24/7, 7 days a week",
            details: ["Phone: +880 19599-48542"],
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: CiMail,
            title: "Write to Us",
            subtitle: "Fill out our form and we will contact you within 24 hours",
            details: ["Email: kmtanvir1111@gmail.com", "Support: support@exclusive.com"],
            gradient: "from-red-500 to-pink-500"
        }
    ];

    return (
        <>
            <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-red-50/30 relative overflow-hidden mt-[60px]">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>

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
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3">Get In Touch</h2>
                            <p className="text-slate-600 text-lg">We'd love to hear from you. Let's talk!</p>
                        </div>
                    </motion.div>

                    <div className='flex justify-between gap-8 flex-wrap'>
                        {/* Contact Information */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className='basis-[100%] lg:basis-[47%] space-y-6'
                        >
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 group border border-slate-100 hover:border-transparent relative overflow-hidden'
                                >
                                    {/* Gradient background on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                    
                                    <div className='relative z-10 space-y-4'>
                                        {/* Icon and Title */}
                                        <div className='flex items-center gap-4'>
                                            <div className='relative'>
                                                <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                                                <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${info.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                                                    <info.icon className='text-white text-2xl' />
                                                </div>
                                            </div>
                                            <h2 className='text-2xl font-bold text-slate-900 group-hover:text-red-500 transition-colors duration-300'>
                                                {info.title}
                                            </h2>
                                        </div>

                                        {/* Subtitle */}
                                        <p className='text-slate-600 leading-relaxed pl-[72px]'>
                                            {info.subtitle}
                                        </p>

                                        {/* Details */}
                                        <div className='pl-[72px] space-y-2'>
                                            {info.details.map((detail, idx) => (
                                                <h4 key={idx} className='text-slate-700 font-medium hover:text-red-500 transition-colors duration-300 cursor-pointer'>
                                                    {detail}
                                                </h4>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Additional Info Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className='bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl p-8 text-white'
                            >
                                <div className='space-y-4'>
                                    <div className='flex items-center gap-3'>
                                        <FiMapPin className='text-red-400 text-xl' />
                                        <div>
                                            <h4 className='font-semibold'>Visit Us</h4>
                                            <p className='text-slate-300 text-sm'>Dhaka, Bangladesh</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <FiClock className='text-blue-400 text-xl' />
                                        <div>
                                            <h4 className='font-semibold'>Working Hours</h4>
                                            <p className='text-slate-300 text-sm'>24/7 Customer Support</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className='basis-[100%] lg:basis-[47%]'
                        >
                            <div className='bg-white rounded-2xl shadow-lg p-8 lg:p-10 border border-slate-100'>
                                <h3 className='text-2xl font-bold text-slate-900 mb-6'>Send us a message</h3>
                                
                                <form onSubmit={handleSubmit} className='space-y-6'>
                                    {/* Name Input */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        viewport={{ once: true }}
                                        className='relative'
                                    >
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full bg-slate-50 py-4 px-4 outline-none border-2 rounded-xl transition-all duration-300 ${
                                                focusedField === 'name' 
                                                    ? 'border-red-500 bg-white shadow-lg shadow-red-500/10' 
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                            placeholder='Your Name *'
                                            required
                                        />
                                    </motion.div>

                                    {/* Email Input */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        viewport={{ once: true }}
                                        className='relative'
                                    >
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full bg-slate-50 py-4 px-4 outline-none border-2 rounded-xl transition-all duration-300 ${
                                                focusedField === 'email' 
                                                    ? 'border-red-500 bg-white shadow-lg shadow-red-500/10' 
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                            placeholder='Your Email *'
                                            required
                                        />
                                    </motion.div>

                                    {/* Phone Input */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        viewport={{ once: true }}
                                        className='relative'
                                    >
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('phone')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full bg-slate-50 py-4 px-4 outline-none border-2 rounded-xl transition-all duration-300 ${
                                                focusedField === 'phone' 
                                                    ? 'border-red-500 bg-white shadow-lg shadow-red-500/10' 
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                            placeholder='Your Phone *'
                                            required
                                        />
                                    </motion.div>

                                    {/* Message Textarea */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        viewport={{ once: true }}
                                        className='relative'
                                    >
                                        <textarea 
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField(null)}
                                            rows="5"
                                            className={`w-full bg-slate-50 py-4 px-4 outline-none border-2 rounded-xl resize-none transition-all duration-300 ${
                                                focusedField === 'message' 
                                                    ? 'border-red-500 bg-white shadow-lg shadow-red-500/10' 
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                            placeholder='Your Message *'
                                            required
                                        />
                                    </motion.div>

                                    {/* Submit Button */}
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className='w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 flex items-center justify-center gap-2 group'
                                    >
                                        Send Message
                                        <BiPaperPlane className='text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300' />
                                    </motion.button>
                                </form>

                                {/* Privacy Note */}
                                <p className='text-slate-500 text-sm text-center mt-6'>
                                    We respect your privacy. Your information is secure with us.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactSection;