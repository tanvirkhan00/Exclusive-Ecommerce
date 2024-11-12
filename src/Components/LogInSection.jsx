import React, { useState } from 'react';

// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


// Img
import sideImg from "/src/assets/SideImage.png"

// Icon
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const LogInSection = () => {

    let [email, setEmail] = useState('')
    let [emailErr, setEmailErr] = useState('')
    let [passWord, setpassWord] = useState('')
    let [passWordErr, setPassWordErr] = useState('')
    let navigate = useNavigate()
    const auth = getAuth();


    const handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailErr('')
    }
    const handleLogIn = () => {
        if (!email) {
            setEmailErr('Please Input Email Address')
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailErr("Email is not valid")
            }
        }
        if (!passWord) {
            setPassWordErr('Please Input Your Password')
        } else {
            if (!/(?=.*[a-z])/.test(passWord)) {
                setPassWordErr('Must contain at least one lowercase')
            } else if (!/(?=.*[A-Z])/.test(passWord)) {
                setPassWordErr('Must contain at least one uppercase')
            } else if (!/(?=.*[0-9])/.test(passWord)) {
                setPassWordErr('Must contain at least one number')
            } else if (!/(?=.*[!@#$%^&*])/.test(passWord)) {
                setPassWordErr('Must contain at least one special character')
            } else if (!/(?=.{8,})/.test(passWord)) {
                setPassWordErr('Must at least 8 character')
            }
        }

        if (email && passWord && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            signInWithEmailAndPassword(auth, email, passWord)
                .then(() => {
                    setTimeout(() => {
                        navigate("/")
                    }, 2000)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes('auth/invalid-credential')) {
                        setEmailErr('Account Not Match')
                        console.log(emailErr);
                    }
                });
        }
    }

    // PassWord Input
    const handlePass = (e) => {
        setpassWord(e.target.value)
        setPassWordErr('')
    }


    return (
        <>

            <section>
                <div className="container mt-[150px] mb-[50px]">
                    <div className='flex flex-wrap gap-[20px] items-center lg:justify-center lg:gap-[50px]'>
                        <div className='md:basis-[47%]'>
                            <img src={sideImg} alt="" />
                        </div>
                        <div className='md:basis-[47%] lg:basis-[35%] flex flex-col gap-[20px] w-full'>
                            <h1 className='text-[35px] font-semibold text-green-600 font-serif'>Log in to Exclusive</h1>
                            <h3 className='text-[14px]'>Enter your details below</h3>
                            <form className='flex flex-col gap-4'>
                                <input onChange={handleEmail} className='outline-none border-b-2 border-slate-400 py-2 hover:border-black' type="email" placeholder='Email or Phone Number' />
                                {emailErr &&
                                    <p className='text-[14px] flex items-center gap-2 '><span className='text-red-500'><MdErrorOutline /></span>{emailErr}</p>
                                }
                                <input onChange={handlePass} className='outline-none border-b-2 border-slate-400 py-2 hover:border-black' type="password" placeholder='Password' />
                                {passWordErr &&
                                    <p className='text-[14px] flex items-center gap-2 '><span className='text-red-500'><MdErrorOutline /></span>{passWordErr}</p>
                                }
                            </form>
                            <div className='flex items-center justify-between'>
                                <button onClick={handleLogIn} className='py-3  rounded-md px-[40px] border-2 border-black hover:bg-red-500'>
                                    <a>Log In</a>
                                </button>
                                <button className='text-red-600'>
                                    <a className=''> Forget Password ?</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default LogInSection;