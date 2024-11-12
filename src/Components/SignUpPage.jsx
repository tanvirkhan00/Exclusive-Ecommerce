import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// Img
import sideImg from "/src/assets/SideImage.png"

// Icon
import { FcGoogle } from "react-icons/fc";
import { MdErrorOutline } from "react-icons/md";


// Firebase

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const SignUpPage = () => {

    let [email, setEmail] = useState('')
    let [fullName, setFullName] = useState('')
    let [passWord, setPassWord] =useState('')
    const [emailErr, setEmailErr] = useState('')
    const [nameErr, setNameErr] =useState('')
    const [passErr, setPassErr] =useState('')

    const auth = getAuth();

    const navigate = useNavigate()


    const handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailErr('')
    } 
    const handleSubmit = () => {
        if(!email){
            setEmailErr("Please input an email")
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                setEmailErr("Email is not valid")
            }
        }


        if (!fullName) {
            setNameErr ('Please input name')
        }

        if(!passWord) {
            setPassErr('Please input password')
        }else{
            if(!/(?=.*[a-z])/.test(passWord)){
                setPassErr('Must contain at least one lowercase')
            }else if(!/(?=.*[A-Z])/.test(passWord)){
                setPassErr('Must contain at least one uppercase')
            }else if(!/(?=.*[0-9])/.test(passWord)){
                setPassErr('Must contain at least one number')
            }else if(!/(?=.*[!@#$%^&*])/.test(passWord)){
                setPassErr('Must contain at least one special character')
            }else if(!/(?=.{8,})/.test(passWord)){
                setPassErr('Must at least 8 character')
            }
        }


        if(email && fullName && passWord && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            createUserWithEmailAndPassword(auth, email, passWord)
                .then(() => {
                    setTimeout(()=>{
                        navigate("/login")
                    }, 2000)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if(errorCode.includes('auth/email-already-in-use')){
                        setEmailErr("Email is already used")
                    }
                });
        }
    }

    const handleName = (e) => {
        setFullName(e.target.value)
        setNameErr('')
    }

    const handlePass =(e) => {
        setPassWord(e.target.value) 
        setPassErr('')
    }
    

    return (
        <>

            <section>
                <div className="container mx-auto mt-[150px] mb-[50px]">
                    <div className='flex flex-wrap gap-[50px] items-center lg:justify-center'>
                        <div className='lg:basis-[48%]'>
                            <img src={sideImg} alt="" />
                        </div>
                        <div className='lg:basis-[35%] flex flex-col gap-[20px] w-full'>
                            <h1 className='text-[35px] font-semibold'>Create an account</h1>
                            <h3 className='text-[14px]'>Enter your details below</h3>
                            <form className='flex flex-col gap-4'>
                                <input onChange={handleName} className='outline-none border-b-2 border-slate-400 py-2 duration-300 ease-in-out hover:border-black' type="text" placeholder='Name' />
                                {nameErr && 
                                    <p className='flex items-center gap-2'><span className='text-red-500'><MdErrorOutline/></span>{nameErr}</p>
                                }
                                <input onChange={handleEmail} className='outline-none border-b-2 border-slate-400 py-2 duration-300 ease-in-out hover:border-black' type="email" placeholder='Email or Phone Number' />
                                {emailErr &&
                                    <p className='flex items-center gap-2'><span className='text-red-500'><MdErrorOutline/></span>{emailErr}</p>
                                }
                                <input onChange={handlePass} className='outline-none border-b-2 border-slate-400 py-2 duration-300 ease-in-out hover:border-black' type="password" placeholder='Password' />
                                {passErr && 
                                    <p className='flex items-center gap-2'><span className='text-red-500'><MdErrorOutline/></span>{passErr}</p>
                                }
                            </form>
                            <button onClick={handleSubmit} className='bg-red-600 py-3 text-white rounded-sm hover:bg-red-700'>
                                <a className=''>Create Account</a>
                            </button>
                            <button className='border-2 border-slate-300 py-3 rounded-sm'>
                                <a className='flex items-center gap-2 justify-center'> <span><FcGoogle /></span> Sign up with Google</a>
                            </button>
                            <div className='flex items-center gap-[10px] justify-center'>
                                <h4>Already have account?</h4>
                                <Link to="/login"><a className='font-semibold border-b-2 border-slate-700 cursor-pointer'>Log in</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default SignUpPage;