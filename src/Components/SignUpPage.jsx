import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { MdErrorOutline, MdCheckCircle } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from "react-icons/fi";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        agreeToTerms: false
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'Must be at least 2 characters';
        }
        
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'Must be at least 2 characters';
        }
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }
        
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) return;
        
        setLoading(true);
        setErrors({});
        
        try {
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                formData.email, 
                formData.password
            );
            
            // Update profile
            await updateProfile(userCredential.user, { 
                displayName: `${formData.firstName} ${formData.lastName}` 
            });
            
            // Save to Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                fullName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                createdAt: new Date().toISOString()
            });
            
            // Success - stop loading and show success
            setLoading(false);
            setSuccess(true);
            
            // Redirect after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            
        } catch (error) {
            console.error("Signup error:", error);
            
            // Stop loading on error
            setLoading(false);
            setSuccess(false);
            
            // Handle specific errors
            if (error.code === 'auth/email-already-in-use') {
                setErrors({ email: 'This email is already registered' });
            } else if (error.code === 'auth/weak-password') {
                setErrors({ password: 'Password is too weak' });
            } else if (error.code === 'auth/invalid-email') {
                setErrors({ email: 'Invalid email address' });
            } else {
                setErrors({ general: error.message || 'Something went wrong. Please try again.' });
            }
        }
    };

    return (
        <>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes pulse-ring {
                    0% { transform: scale(0.8); opacity: 1; }
                    100% { transform: scale(1.4); opacity: 0; }
                }
                
                @keyframes draw-line {
                    0% { stroke-dashoffset: 1000; }
                    100% { stroke-dashoffset: 0; }
                }
                
                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }
                
                .float-delay-1 {
                    animation-delay: 0.5s;
                }
                
                .float-delay-2 {
                    animation-delay: 1s;
                }
                
                .pulse-ring {
                    animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
                }
            `}</style>
            
            <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                        
                        {/* Left Side - Custom Animation */}
                        <div className="w-full lg:w-1/2 hidden lg:flex flex-col items-center justify-center">
                            <div className="relative w-full max-w-xl h-[500px]">
                                {/* Background decoration */}
                                <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-orange-100/50 rounded-3xl"></div>
                                
                                <svg viewBox="0 0 400 400" className="w-full h-full">
                                    {/* Connecting lines */}
                                    <path
                                        d="M 100 200 Q 200 150 300 200"
                                        stroke="#EF4444"
                                        strokeWidth="3"
                                        fill="none"
                                        strokeDasharray="1000"
                                        className="animate-pulse"
                                        style={{
                                            animation: 'draw-line 3s ease-in-out infinite'
                                        }}
                                    />
                                    
                                    {/* User circles */}
                                    <g className="float-animation">
                                        <circle cx="100" cy="200" r="40" fill="#FEE2E2" />
                                        <circle cx="100" cy="200" r="35" fill="#FECACA" />
                                        <circle cx="100" cy="200" r="30" fill="white" />
                                        <circle cx="100" cy="185" r="12" fill="#EF4444" />
                                        <path d="M 80 210 Q 100 220 120 210" stroke="#EF4444" strokeWidth="3" fill="none" strokeLinecap="round" />
                                    </g>
                                    
                                    <g className="float-animation float-delay-1">
                                        <circle cx="300" cy="200" r="40" fill="#FEE2E2" />
                                        <circle cx="300" cy="200" r="35" fill="#FECACA" />
                                        <circle cx="300" cy="200" r="30" fill="white" />
                                        <circle cx="300" cy="185" r="12" fill="#F97316" />
                                        <path d="M 280 210 Q 300 220 320 210" stroke="#F97316" strokeWidth="3" fill="none" strokeLinecap="round" />
                                    </g>
                                    
                                    {/* Center connection point */}
                                    <g className="float-animation float-delay-2">
                                        <circle cx="200" cy="175" r="25" fill="white" className="drop-shadow-lg" />
                                        <circle cx="200" cy="175" r="20" fill="#EF4444" />
                                        <text x="200" y="183" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">✓</text>
                                    </g>
                                    
                                    {/* Bottom user */}
                                    <g className="float-animation">
                                        <circle cx="200" cy="320" r="35" fill="#FEF3C7" />
                                        <circle cx="200" cy="320" r="30" fill="#FDE68A" />
                                        <circle cx="200" cy="320" r="25" fill="white" />
                                        <circle cx="200" cy="310" r="10" fill="#F59E0B" />
                                        <path d="M 185 330 Q 200 338 215 330" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                    </g>
                                    
                                    <path
                                        d="M 200 240 L 200 285"
                                        stroke="#F59E0B"
                                        strokeWidth="3"
                                        fill="none"
                                        strokeDasharray="5,5"
                                        className="animate-pulse"
                                    />
                                    
                                    {/* Floating icons */}
                                    <g className="float-animation" style={{transformOrigin: '80px 120px'}}>
                                        <circle cx="80" cy="120" r="18" fill="white" className="drop-shadow" />
                                        <text x="80" y="128" textAnchor="middle" fontSize="20">💌</text>
                                    </g>
                                    
                                    <g className="float-animation float-delay-1" style={{transformOrigin: '320px 120px'}}>
                                        <circle cx="320" cy="120" r="18" fill="white" className="drop-shadow" />
                                        <text x="320" y="128" textAnchor="middle" fontSize="20">🎉</text>
                                    </g>
                                    
                                    <g className="float-animation float-delay-2" style={{transformOrigin: '150px 350px'}}>
                                        <circle cx="150" cy="350" r="15" fill="white" className="drop-shadow" />
                                        <text x="150" y="357" textAnchor="middle" fontSize="18">⭐</text>
                                    </g>
                                    
                                    <g className="float-animation" style={{transformOrigin: '250px 350px'}}>
                                        <circle cx="250" cy="350" r="15" fill="white" className="drop-shadow" />
                                        <text x="250" y="357" textAnchor="middle" fontSize="18">🎁</text>
                                    </g>
                                </svg>
                            </div>
                            
                            <div className="text-center mt-6">
                                <h2 className="text-3xl font-bold text-gray-800 mb-3">Join Our Community!</h2>
                                <p className="text-gray-600 text-lg">Connect with thousands of shoppers</p>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="w-full lg:w-1/2 max-w-xl">
                            <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-100 rounded-full -ml-12 -mb-12 opacity-50"></div>
                                
                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                                            <FiUser className="text-white text-2xl" />
                                        </div>
                                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                                        <p className="text-gray-500 text-sm lg:text-base">Sign up to get started</p>
                                    </div>

                                    {/* Success Message */}
                                    {success && (
                                        <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3">
                                            <MdCheckCircle className="text-green-500 text-2xl flex-shrink-0" />
                                            <div>
                                                <p className="text-green-700 font-semibold">Account Created Successfully!</p>
                                                <p className="text-green-600 text-sm">Redirecting to login page...</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* General Error */}
                                    {errors.general && (
                                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3">
                                            <MdErrorOutline className="text-red-500 text-2xl flex-shrink-0" />
                                            <p className="text-red-700 font-medium text-sm">{errors.general}</p>
                                        </div>
                                    )}

                                    {/* Form */}
                                    <div className="space-y-4">
                                        {/* Name Fields */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    placeholder="John"
                                                    disabled={loading || success}
                                                    className={`w-full px-3 py-2.5 border-2 rounded-xl outline-none transition-all text-sm ${
                                                        errors.firstName 
                                                            ? 'border-red-300 bg-red-50' 
                                                            : 'border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                                />
                                                {errors.firstName && (
                                                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                        <MdErrorOutline className="text-sm"/>{errors.firstName}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    placeholder="Doe"
                                                    disabled={loading || success}
                                                    className={`w-full px-3 py-2.5 border-2 rounded-xl outline-none transition-all text-sm ${
                                                        errors.lastName 
                                                            ? 'border-red-300 bg-red-50' 
                                                            : 'border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                                />
                                                {errors.lastName && (
                                                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                        <MdErrorOutline className="text-sm"/>{errors.lastName}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                                                <FiMail className="text-gray-400" />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                disabled={loading || success}
                                                className={`w-full px-3 py-2.5 border-2 rounded-xl outline-none transition-all text-sm ${
                                                    errors.email 
                                                        ? 'border-red-300 bg-red-50' 
                                                        : 'border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                    <MdErrorOutline className="text-sm"/>{errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone Number */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                                                <FiPhone className="text-gray-400" />
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                placeholder="+1 (234) 567-8900"
                                                disabled={loading || success}
                                                className={`w-full px-3 py-2.5 border-2 rounded-xl outline-none transition-all text-sm ${
                                                    errors.phoneNumber 
                                                        ? 'border-red-300 bg-red-50' 
                                                        : 'border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                            />
                                            {errors.phoneNumber && (
                                                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                    <MdErrorOutline className="text-sm"/>{errors.phoneNumber}
                                                </p>
                                            )}
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                                                <FiMapPin className="text-gray-400" />
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="123 Main St, City, Country"
                                                disabled={loading || success}
                                                className={`w-full px-3 py-2.5 border-2 rounded-xl outline-none transition-all text-sm ${
                                                    errors.address 
                                                        ? 'border-red-300 bg-red-50' 
                                                        : 'border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                            />
                                            {errors.address && (
                                                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                    <MdErrorOutline className="text-sm"/>{errors.address}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                                                <FiLock className="text-gray-400" />
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                disabled={loading || success}
                                                className={`w-full px-3 py-2.5 border-2 rounded-xl outline-none transition-all text-sm ${
                                                    errors.password 
                                                        ? 'border-red-300 bg-red-50' 
                                                        : 'border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                            />
                                            {errors.password && (
                                                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                    <MdErrorOutline className="text-sm"/>{errors.password}
                                                </p>
                                            )}
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                                                <FiLock className="text-gray-400" />
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                disabled={loading || success}
                                                className={`w-full px-3 py-2.5 border-2 rounded-xl outline-none transition-all text-sm ${
                                                    errors.confirmPassword 
                                                        ? 'border-red-300 bg-red-50' 
                                                        : 'border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                            />
                                            {errors.confirmPassword && (
                                                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                                    <MdErrorOutline className="text-sm"/>{errors.confirmPassword}
                                                </p>
                                            )}
                                        </div>

                                        {/* Terms Checkbox */}
                                        <div className="pt-2">
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="agreeToTerms"
                                                    checked={formData.agreeToTerms}
                                                    onChange={handleChange}
                                                    disabled={loading || success}
                                                    className="w-5 h-5 text-red-600 border-gray-300 rounded mt-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                />
                                                <span className="text-sm text-gray-600">
                                                    I agree to the{' '}
                                                    <a href="#" className="text-red-600 hover:underline font-semibold">
                                                        Terms & Conditions
                                                    </a>{' '}
                                                    and{' '}
                                                    <a href="#" className="text-red-600 hover:underline font-semibold">
                                                        Privacy Policy
                                                    </a>
                                                </span>
                                            </label>
                                            {errors.agreeToTerms && (
                                                <p className="mt-1 ml-8 text-xs text-red-600 flex items-center gap-1">
                                                    <MdErrorOutline className="text-sm"/>{errors.agreeToTerms}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading || success}
                                            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                                                    Creating Account...
                                                </>
                                            ) : success ? (
                                                <>
                                                    <MdCheckCircle className="text-xl" />
                                                    Account Created!
                                                </>
                                            ) : (
                                                'Create Account'
                                            )}
                                        </button>

                                        {/* Divider */}
                                        <div className="relative my-4">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                                            </div>
                                        </div>

                                        {/* Google Sign Up */}
                                        <button
                                            type="button"
                                            disabled={loading || success}
                                            className="w-full border-2 border-gray-300 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-3 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FcGoogle className="text-2xl" />
                                            Sign up with Google
                                        </button>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-5 text-center">
                                        <p className="text-gray-600 text-sm">
                                            Already have an account?{' '}
                                            <Link to="/login" className="text-red-600 font-semibold hover:underline">
                                                Log In
                                            </Link>
                                        </p>
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

export default SignUpPage;