import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { MdErrorOutline, MdCheckCircle, MdEdit, MdLogout } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiUser, FiMail, FiMapPin, FiLock, FiHeart, FiPackage, FiRefreshCw } from "react-icons/fi";

const Account = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phoneNumber: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [errors, setErrors] = useState({});

    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const user = auth.currentUser;
            
            if (!user) {
                navigate('/login');
                return;
            }

            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            
            if (userDoc.exists()) {
                const data = userDoc.data();
                setUserData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || user.email,
                    address: data.address || '',
                    phoneNumber: data.phoneNumber || ''
                });
            } else {
                // If no Firestore data, use auth data
                setUserData({
                    firstName: user.displayName?.split(' ')[0] || '',
                    lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
                    email: user.email || '',
                    address: '',
                    phoneNumber: ''
                });
            }
            
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false);
            setMessage({ type: 'error', text: 'Error loading user data' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateProfileUpdate = () => {
        const newErrors = {};

        if (!userData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (userData.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)) {
            newErrors.email = 'Invalid email format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        if (!validateProfileUpdate()) return;

        setUpdateLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const user = auth.currentUser;

            // Update Firestore
            await updateDoc(doc(db, "users", user.uid), {
                firstName: userData.firstName,
                lastName: userData.lastName,
                address: userData.address,
                phoneNumber: userData.phoneNumber,
                updatedAt: new Date().toISOString()
            });

            // Handle password update if provided
            if (passwordData.currentPassword && passwordData.newPassword) {
                if (passwordData.newPassword !== passwordData.confirmPassword) {
                    setErrors({ confirmPassword: 'Passwords do not match' });
                    setUpdateLoading(false);
                    return;
                }

                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(passwordData.newPassword)) {
                    setErrors({ newPassword: 'Password must contain uppercase, lowercase, number, special character and be 8+ characters' });
                    setUpdateLoading(false);
                    return;
                }

                // Re-authenticate user before password change
                const credential = EmailAuthProvider.credential(
                    user.email,
                    passwordData.currentPassword
                );

                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, passwordData.newPassword);

                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setEditMode(false);
            setUpdateLoading(false);

            setTimeout(() => setMessage({ type: '', text: '' }), 3000);

        } catch (error) {
            setUpdateLoading(false);
            
            if (error.code === 'auth/wrong-password') {
                setErrors({ currentPassword: 'Current password is incorrect' });
            } else {
                setMessage({ type: 'error', text: 'Error updating profile. Please try again.' });
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <AiOutlineLoading3Quarters className="animate-spin text-4xl text-green-600" />
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome back, <span className="text-green-600">{userData.firstName}!</span>
                        </h1>
                        <p className="text-gray-500 mt-1">Manage your account and preferences</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <MdLogout className="text-xl" />
                        Logout
                    </button>
                </div>

                {/* Message Alert */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                        message.type === 'success' 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-red-50 border border-red-200'
                    }`}>
                        {message.type === 'success' ? (
                            <MdCheckCircle className="text-green-500 text-2xl" />
                        ) : (
                            <MdErrorOutline className="text-red-500 text-2xl" />
                        )}
                        <p className={message.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                            {message.text}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                            
                            {/* Account Section */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiUser className="text-green-600" />
                                    Manage Account
                                </h2>
                                <ul className="space-y-3">
                                    <li className="text-gray-600 hover:text-green-600 cursor-pointer transition-colors py-2 px-3 rounded-lg hover:bg-green-50">
                                        My Profile
                                    </li>
                                    <li className="text-gray-600 hover:text-green-600 cursor-pointer transition-colors py-2 px-3 rounded-lg hover:bg-green-50">
                                        Address Book
                                    </li>
                                    <li className="text-gray-600 hover:text-green-600 cursor-pointer transition-colors py-2 px-3 rounded-lg hover:bg-green-50">
                                        Payment Options
                                    </li>
                                </ul>
                            </div>

                            {/* Orders Section */}
                            <div className="border-t pt-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiPackage className="text-green-600" />
                                    My Orders
                                </h2>
                                <ul className="space-y-3">
                                    <li className="text-gray-600 hover:text-green-600 cursor-pointer transition-colors py-2 px-3 rounded-lg hover:bg-green-50">
                                        <div className="flex items-center gap-2">
                                            <FiRefreshCw className="text-sm" />
                                            My Returns
                                        </div>
                                    </li>
                                    <li className="text-gray-600 hover:text-green-600 cursor-pointer transition-colors py-2 px-3 rounded-lg hover:bg-green-50">
                                        My Cancellations
                                    </li>
                                </ul>
                            </div>

                            {/* Wishlist */}
                            <div className="border-t pt-6">
                                <Link to="/wishList">
                                    <h2 className="text-xl font-bold text-gray-800 hover:text-green-600 transition-colors flex items-center gap-2 cursor-pointer">
                                        <FiHeart className="text-green-600" />
                                        My Wishlist
                                    </h2>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Profile Edit */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Edit Your Profile</h2>
                                {!editMode && (
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                                    >
                                        <MdEdit />
                                        Edit
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSaveChanges} className="space-y-6">
                                
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <FiUser className="text-gray-400" />
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={userData.firstName}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all ${
                                                !editMode 
                                                    ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                                                    : 'border-gray-300 focus:border-green-500'
                                            }`}
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={userData.lastName}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all ${
                                                !editMode 
                                                    ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                                                    : 'border-gray-300 focus:border-green-500'
                                            }`}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <FiMail className="text-gray-400" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        disabled
                                        className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-lg outline-none cursor-not-allowed"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <FiMapPin className="text-gray-400" />
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={userData.address}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        placeholder="Enter your address"
                                        className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all ${
                                            !editMode 
                                                ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                                                : 'border-gray-300 focus:border-green-500'
                                        }`}
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={userData.phoneNumber}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        placeholder="Enter your phone number"
                                        className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all ${
                                            !editMode 
                                                ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                                                : 'border-gray-300 focus:border-green-500'
                                        }`}
                                    />
                                </div>

                                {/* Password Section */}
                                {editMode && (
                                    <div className="border-t pt-6 mt-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                            <FiLock className="text-gray-400" />
                                            Change Password (Optional)
                                        </h3>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={passwordData.currentPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="Current Password"
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-green-500"
                                                />
                                                {errors.currentPassword && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                                                )}
                                            </div>

                                            <div>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={passwordData.newPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="New Password"
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-green-500"
                                                />
                                                {errors.newPassword && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                                                )}
                                            </div>

                                            <div>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={passwordData.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="Confirm New Password"
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-green-500"
                                                />
                                                {errors.confirmPassword && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                {editMode && (
                                    <div className="flex gap-4 justify-end pt-6 border-t">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditMode(false);
                                                fetchUserData();
                                                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                            }}
                                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updateLoading}
                                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 disabled:opacity-50"
                                        >
                                            {updateLoading ? (
                                                <>
                                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <MdCheckCircle />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Account;