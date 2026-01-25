import React, { useState } from 'react';
import { MdErrorOutline, MdCheckCircle, MdVisibility, MdVisibilityOff, MdEmail, MdLock } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LogInSection = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!formData.email) {
            newErrors.email = 'Please enter your email address';
            isValid = false;
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Please enter your password';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogIn = () => {
        if (!validateForm()) return;
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            
            setTimeout(() => {
                alert('Login successful! Redirecting to dashboard...');
                setSuccess(false);
                setFormData({ email: '', password: '' });
            }, 2000);
        }, 2000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogIn();
        }
    };

    // Animated Person Shopping Illustration
    const AnimatedPerson = () => (
        <div className="relative w-full max-w-lg mx-auto h-96">
            {/* Background circles */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-80 h-80 bg-gradient-to-br from-green-100 to-green-200 rounded-full animate-pulse-slow opacity-30"></div>
                <div className="absolute w-64 h-64 bg-gradient-to-br from-green-200 to-green-300 rounded-full animate-pulse-medium opacity-20"></div>
            </div>

            {/* Person illustration */}
            <svg className="relative z-10 w-full h-full" viewBox="0 0 400 400" fill="none">
                {/* Shopping bags - floating animation */}
                <g className="animate-float-slow">
                    <rect x="280" y="200" width="40" height="50" rx="4" fill="#10b981" opacity="0.8"/>
                    <path d="M285 200 Q300 185 315 200" stroke="#059669" strokeWidth="3" fill="none"/>
                    <circle cx="295" cy="215" r="3" fill="#fff" opacity="0.5"/>
                </g>
                
                <g className="animate-float-medium" style={{animationDelay: '0.3s'}}>
                    <rect x="70" y="220" width="35" height="45" rx="4" fill="#34d399" opacity="0.7"/>
                    <path d="M75 220 Q87 208 99 220" stroke="#10b981" strokeWidth="2.5" fill="none"/>
                    <circle cx="85" cy="235" r="2.5" fill="#fff" opacity="0.5"/>
                </g>

                {/* Person body */}
                <g className="animate-bounce-gentle">
                    {/* Head */}
                    <circle cx="200" cy="120" r="35" fill="#fbbf24" className="animate-float-head"/>
                    
                    {/* Hair */}
                    <ellipse cx="185" cy="100" rx="25" ry="20" fill="#92400e" className="animate-hair-wave"/>
                    <ellipse cx="215" cy="100" rx="25" ry="20" fill="#92400e" className="animate-hair-wave" style={{animationDelay: '0.2s'}}/>
                    
                    {/* Face details */}
                    <circle cx="190" cy="120" r="3" fill="#1f2937"/>
                    <circle cx="210" cy="120" r="3" fill="#1f2937"/>
                    <path d="M195 132 Q200 137 205 132" stroke="#1f2937" strokeWidth="2" fill="none" className="animate-smile"/>
                    
                    {/* Blush */}
                    <ellipse cx="180" cy="128" rx="6" ry="4" fill="#f87171" opacity="0.4"/>
                    <ellipse cx="220" cy="128" rx="6" ry="4" fill="#f87171" opacity="0.4"/>
                    
                    {/* Body */}
                    <rect x="170" y="155" width="60" height="80" rx="30" fill="#3b82f6" className="animate-body-sway"/>
                    
                    {/* Arms */}
                    <g className="animate-arm-wave-left">
                        <ellipse cx="155" cy="180" rx="12" ry="35" fill="#2563eb" transform="rotate(-20 155 180)"/>
                        <circle cx="148" cy="210" r="10" fill="#fbbf24"/>
                    </g>
                    
                    <g className="animate-arm-wave-right">
                        <ellipse cx="245" cy="180" rx="12" ry="35" fill="#2563eb" transform="rotate(20 245 180)"/>
                        <circle cx="252" cy="210" r="10" fill="#fbbf24"/>
                    </g>
                    
                    {/* Legs */}
                    <rect x="180" y="235" width="16" height="50" rx="8" fill="#1e40af" className="animate-leg-left"/>
                    <rect x="204" y="235" width="16" height="50" rx="8" fill="#1e40af" className="animate-leg-right"/>
                    
                    {/* Shoes */}
                    <ellipse cx="188" cy="285" rx="12" ry="6" fill="#1f2937" className="animate-leg-left"/>
                    <ellipse cx="212" cy="285" rx="12" ry="6" fill="#1f2937" className="animate-leg-right"/>
                </g>

                {/* Shopping cart - moving */}
                <g className="animate-cart-move">
                    <rect x="320" y="280" width="50" height="40" rx="4" fill="#6b7280" opacity="0.6"/>
                    <circle cx="330" cy="325" r="6" fill="#1f2937"/>
                    <circle cx="360" cy="325" r="6" fill="#1f2937"/>
                    <path d="M325 275 L330 280 L365 280 L370 275" stroke="#4b5563" strokeWidth="2" fill="none"/>
                </g>

                {/* Floating shopping items */}
                <g className="animate-item-float-1">
                    <rect x="100" y="100" width="25" height="25" rx="3" fill="#ec4899" opacity="0.6"/>
                    <circle cx="112" cy="112" r="2" fill="#fff"/>
                </g>
                
                <g className="animate-item-float-2">
                    <circle cx="320" cy="120" r="15" fill="#8b5cf6" opacity="0.6"/>
                    <path d="M315 115 L320 120 L325 115" stroke="#fff" strokeWidth="2" fill="none"/>
                </g>
                
                <g className="animate-item-float-3">
                    <rect x="130" y="300" width="20" height="30" rx="3" fill="#f59e0b" opacity="0.6"/>
                    <rect x="135" y="305" width="10" height="3" fill="#fff" opacity="0.5"/>
                </g>

                {/* Stars and sparkles */}
                <circle cx="350" cy="80" r="3" fill="#fbbf24" className="animate-twinkle" opacity="0.8"/>
                <circle cx="80" cy="150" r="2" fill="#fbbf24" className="animate-twinkle" style={{animationDelay: '0.3s'}} opacity="0.8"/>
                <circle cx="360" cy="200" r="2.5" fill="#fbbf24" className="animate-twinkle" style={{animationDelay: '0.6s'}} opacity="0.8"/>
                <circle cx="60" cy="280" r="3" fill="#fbbf24" className="animate-twinkle" style={{animationDelay: '0.9s'}} opacity="0.8"/>
                
                {/* Plus signs */}
                <g className="animate-rotate-slow" opacity="0.4">
                    <path d="M90 90 L90 100 M85 95 L95 95" stroke="#10b981" strokeWidth="2"/>
                </g>
                <g className="animate-rotate-slow" style={{animationDelay: '0.5s'}} opacity="0.4">
                    <path d="M340 250 L340 260 M335 255 L345 255" stroke="#3b82f6" strokeWidth="2"/>
                </g>
            </svg>

            {/* Floating text bubbles */}
            <div className="absolute top-10 right-10 bg-white px-4 py-2 rounded-full shadow-lg animate-float-bubble-1 opacity-90">
                <span className="text-sm font-semibold text-green-600">50% OFF!</span>
            </div>
            <div className="absolute bottom-20 left-10 bg-white px-4 py-2 rounded-full shadow-lg animate-float-bubble-2 opacity-90">
                <span className="text-sm font-semibold text-blue-600">Free Shipping</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative pt-[150px]">
            
            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-1"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-2"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-3"></div>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Side - Animated Person */}
                    <div className="order-2 lg:order-1">
                        <div className="animate-fade-slide-in">
                            <AnimatedPerson />
                            <div className="text-center mt-8 space-y-3">
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                                    Shop Without Limits
                                </h2>
                                <p className="text-gray-600 text-lg animate-fade-in-delayed">
                                    Join thousands of happy shoppers today! 🛍️
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-10 relative overflow-hidden border border-white/50 animate-slide-in-right">
                            
                            {/* Decorative corner elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-400 rounded-full -mr-16 -mt-16 opacity-20 animate-pulse-slow"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full -ml-12 -mb-12 opacity-20 animate-pulse-medium"></div>
                            
                            <div className="relative z-10">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl mb-4 shadow-xl animate-bounce-gentle transform hover:scale-110 transition-transform">
                                        <MdLock className="text-4xl text-white animate-lock-wiggle" />
                                    </div>
                                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-3 animate-text-shimmer">
                                        Welcome Back!
                                    </h1>
                                    <p className="text-gray-600 text-lg">Continue your shopping journey ✨</p>
                                </div>

                                {success && (
                                    <div className="mb-6 p-5 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl flex items-center gap-3 animate-success-pop shadow-lg">
                                        <div className="animate-spin-success">
                                            <MdCheckCircle className="text-green-600 text-4xl" />
                                        </div>
                                        <div>
                                            <p className="text-green-800 font-bold text-lg">Success!</p>
                                            <p className="text-green-700 text-sm">Redirecting to your dashboard...</p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-6">
                                    
                                    {/* Email Input */}
                                    <div className="animate-input-slide-1">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <MdEmail className="text-green-600 text-lg" />
                                            Email Address
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onKeyPress={handleKeyPress}
                                                placeholder="your.email@example.com"
                                                className={`w-full px-5 py-4 border-2 rounded-xl outline-none transition-all duration-300 text-lg ${
                                                    errors.email 
                                                        ? 'border-red-400 bg-red-50 focus:border-red-500 animate-shake' 
                                                        : 'border-gray-200 focus:border-green-500 focus:bg-white focus:shadow-xl focus:scale-[1.02] hover:border-green-300'
                                                }`}
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-600 flex items-center gap-2 font-semibold animate-error-appear">
                                                <MdErrorOutline className="text-xl" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password Input */}
                                    <div className="animate-input-slide-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <MdLock className="text-green-600 text-lg" />
                                            Password
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Enter your password"
                                                className={`w-full px-5 py-4 pr-14 border-2 rounded-xl outline-none transition-all duration-300 text-lg ${
                                                    errors.password 
                                                        ? 'border-red-400 bg-red-50 focus:border-red-500 animate-shake' 
                                                        : 'border-gray-200 focus:border-green-500 focus:bg-white focus:shadow-xl focus:scale-[1.02] hover:border-green-300'
                                                }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-all duration-300 hover:scale-125 active:scale-95"
                                            >
                                                {showPassword ? (
                                                    <MdVisibilityOff className="text-2xl" />
                                                ) : (
                                                    <MdVisibility className="text-2xl" />
                                                )}
                                            </button>
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-2 text-sm text-red-600 flex items-center gap-2 font-semibold animate-error-appear">
                                                <MdErrorOutline className="text-xl" />
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Remember & Forgot */}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500 cursor-pointer transition-all group-hover:scale-110"
                                            />
                                            <span className="text-sm text-gray-700 font-medium group-hover:text-green-600 transition-colors">Remember me</span>
                                        </label>
                                        <button 
                                            type="button"
                                            className="text-sm text-green-600 hover:text-green-700 font-bold hover:underline transition-all hover:scale-105 active:scale-95"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        onClick={handleLogIn}
                                        disabled={loading || success}
                                        className="w-full bg-gradient-to-r from-green-500 via-green-600 to-blue-600 text-white py-5 rounded-xl font-bold text-lg hover:from-green-600 hover:via-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                        {loading ? (
                                            <>
                                                <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
                                                <span className="animate-pulse">Logging you in...</span>
                                            </>
                                        ) : success ? (
                                            <>
                                                <MdCheckCircle className="text-3xl animate-bounce" />
                                                <span>Success!</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Login to Your Account</span>
                                                <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="my-8 relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t-2 border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-4 bg-white text-gray-500 font-semibold">or</span>
                                    </div>
                                </div>

                                {/* Social Login */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 group">
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                        <span className="font-bold text-gray-700">Google</span>
                                    </button>
                                    
                                    <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 group">
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="#1877F2" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        <span className="font-bold text-gray-700">Facebook</span>
                                    </button>
                                </div>

                                {/* Sign Up Link */}
                                <div className="mt-8 text-center">
                                    <p className="text-gray-600">
                                        Don't have an account?{' '}
                                        <button className="text-green-600 font-bold hover:text-green-700 hover:underline transition-all hover:scale-105 inline-block">
                                            Create Account →
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }
                
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(-8deg); }
                }
                
                @keyframes float-head {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes bounce-gentle {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes arm-wave-left {
                    0%, 100% { transform: rotate(-20deg); }
                    50% { transform: rotate(-35deg); }
                }
                
                @keyframes arm-wave-right {
                    0%, 100% { transform: rotate(20deg); }
                    50% { transform: rotate(35deg); }
                }
                
                @keyframes body-sway {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(2deg); }
                }
                
                @keyframes leg-left {
                    0%, 100% { transform: translateX(0px); }
                    50% { transform: translateX(-3px); }
                }
                
                @keyframes leg-right {
                    0%, 100% { transform: translateX(0px); }
                    50% { transform: translateX(3px); }
                }
                
                @keyframes hair-wave {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(1.1); }
                }
                
                @keyframes smile {
                    0%, 100% { d: path("M195 132 Q200 137 205 132"); }
                    50% { d: path("M195 134 Q200 140 205 134"); }
                }
                
                @keyframes cart-move {
                    0%, 100% { transform: translateX(0px); }
                    50% { transform: translateX(-30px); }
                }
                
                @keyframes item-float-1 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(-10px, -20px) rotate(10deg); }
                    66% { transform: translate(10px, -15px) rotate(-10deg); }
                }
                
                @keyframes item-float-2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(15px, -25px) scale(1.1); }
                }
                
                @keyframes item-float-3 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(-20px, -30px) rotate(-15deg); }
                }
                
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.3); }
                }
                
                @keyframes rotate-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes float-bubble-1 {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-15px) scale(1.05); }
                }
                
                @keyframes float-bubble-2 {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }
                
                @keyframes blob-1 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    33% { transform: translate(30px, -30px) scale(1.1) rotate(120deg); }
                    66% { transform: translate(-20px, 20px) scale(0.9) rotate(240deg); }
                }
                
                @keyframes blob-2 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    33% { transform: translate(-40px, 40px) scale(1.2) rotate(120deg); }
                    66% { transform: translate(30px, -20px) scale(0.95) rotate(240deg); }
                }
                
                @keyframes blob-3 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    33% { transform: translate(20px, -40px) scale(1.15) rotate(120deg); }
                    66% { transform: translate(-30px, 30px) scale(0.9) rotate(240deg); }
                }
                
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.05); opacity: 0.5; }
                }
                
                @keyframes pulse-medium {
                    0%, 100% { transform: scale(1); opacity: 0.2; }
                    50% { transform: scale(1.1); opacity: 0.4; }
                }
                
                @keyframes fade-slide-in {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-in-right {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fade-in-delayed {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                
                @keyframes lock-wiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-5deg); }
                    75% { transform: rotate(5deg); }
                }
                
                @keyframes text-shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                
                @keyframes success-pop {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes spin-success {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.2); }
                    100% { transform: rotate(360deg) scale(1); }
                }
                
                @keyframes input-slide-1 {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes input-slide-2 {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes error-appear {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
                .animate-float-medium { animation: float-medium 3.5s ease-in-out infinite; }
                .animate-float-head { animation: float-head 2.5s ease-in-out infinite; }
                .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
                .animate-arm-wave-left { animation: arm-wave-left 2s ease-in-out infinite; }
                .animate-arm-wave-right { animation: arm-wave-right 2s ease-in-out infinite; }
                .animate-body-sway { animation: body-sway 3s ease-in-out infinite; }
                .animate-leg-left { animation: leg-left 2s ease-in-out infinite; }
                .animate-leg-right { animation: leg-right 2s ease-in-out infinite 0.5s; }
                .animate-hair-wave { animation: hair-wave 2.5s ease-in-out infinite; }
                .animate-smile { animation: smile 3s ease-in-out infinite; }
                .animate-cart-move { animation: cart-move 4s ease-in-out infinite; }
                .animate-item-float-1 { animation: item-float-1 5s ease-in-out infinite; }
                .animate-item-float-2 { animation: item-float-2 4.5s ease-in-out infinite; }
                .animate-item-float-3 { animation: item-float-3 5.5s ease-in-out infinite; }
                .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
                .animate-rotate-slow { animation: rotate-slow 10s linear infinite; }
                .animate-float-bubble-1 { animation: float-bubble-1 3s ease-in-out infinite; }
                .animate-float-bubble-2 { animation: float-bubble-2 3.5s ease-in-out infinite; }
                .animate-blob-1 { animation: blob-1 20s ease-in-out infinite; }
                .animate-blob-2 { animation: blob-2 25s ease-in-out infinite; }
                .animate-blob-3 { animation: blob-3 22s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
                .animate-pulse-medium { animation: pulse-medium 2.5s ease-in-out infinite; }
                .animate-fade-slide-in { animation: fade-slide-in 1s ease-out; }
                .animate-slide-in-right { animation: slide-in-right 1s ease-out; }
                .animate-fade-in-delayed { animation: fade-in-delayed 1s ease-out 0.5s backwards; }
                .animate-shake { animation: shake 0.5s ease-in-out; }
                .animate-lock-wiggle { animation: lock-wiggle 2s ease-in-out infinite; }
                .animate-text-shimmer { 
                    background-size: 200% auto;
                    animation: text-shimmer 3s linear infinite;
                }
                .animate-success-pop { animation: success-pop 0.6s ease-out; }
                .animate-spin-success { animation: spin-success 1s ease-in-out; }
                .animate-input-slide-1 { animation: input-slide-1 0.6s ease-out; }
                .animate-input-slide-2 { animation: input-slide-2 0.6s ease-out 0.1s backwards; }
                .animate-error-appear { animation: error-appear 0.3s ease-out; }
                .animate-gradient { 
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default LogInSection;