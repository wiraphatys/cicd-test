"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import config from '@/utils/config';

function Navbar() {

    const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignOut = () => {

        Swal.fire({
            title: "Log Out Confirmation",
            text: "Are you sure to log out ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Logout",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.get(`${config.api}/auth/logout`)
                console.log(response)
                if (response.data.success === true) {

                    if (typeof window !== 'undefined') {
                        // clear token from browser
                        localStorage.removeItem('token')
                    }

                    setIsLoggedIn(!isLoggedIn)

                    Swal.fire({
                        title: "Log Out",
                        text: "log out successfully",
                        icon: "success",
                        timer: 1500
                    })

                    router.push('/signin')
                }
            }
        })
    }


    useEffect(() => {

        if(typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
    }, [isLoggedIn]);

    return (
        <>
            <div className="navbar bg-emerald-900 text-gray-300 sticky top-0 z-50">

                <div className="navbar-start">

                    {/* mobile view */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-emerald-800 rounded-box w-52 font-bold">
                            <li><a href='/'>Home</a></li>
                            <li><a href='/massages'>Massages</a></li>
                            {
                                isLoggedIn ? (<li><a href='/reservations'>Reservation</a></li>)
                                    : (<li><a href='/reservations' className='btn-disabled text-gray-400'>Reservation</a></li>)
                            }
                            <li><a href='/contact'>Contact</a></li>
                            <li><a href='/about'>About</a></li>
                            {
                                isLoggedIn && (
                                    <>
                                        <li><a href='/profile'>Profile</a></li>
                                        <li><button onClick={handleSignOut}>Logout</button></li>
                                    </>
                                )
                            }
                        </ul>
                    </div>

                    {/* MRS */}
                    <a className="btn btn-ghost text-xl" href='/'>MRS</a>
                </div>

                {/* desktop view */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/massages'>Massages</a></li>
                        {
                            isLoggedIn ? (<li><a href='/reservations'>Reservation</a></li>)
                            : (<li><a href='/reservations' className='btn-disabled text-gray-400'>Reservation</a></li>)
                        }
                        <li><a href='/contact'>Contact</a></li>
                        <li><a href='/about'>About</a></li>
                    </ul>
                </div>

                {/* <div className="navbar-end">
                    {isLoggedIn && (
                        
                        <div className="dropdown dropdown-end">
                            <div>
                                <button className='btn btn-ghost'><AccountCircleIcon fontSize="large" /></button>
                            </div>
                            <ul tabIndex={0} className={`menu dropdown-content z-[1] shadow bg-emerald-800 rounded-box w-40 mt-4 p-2`}>
                                <li><a className='btn btn-success btn-sm text-gray-200 mb-2' href='/profile'>Profile</a></li>
                                <li><button className='btn btn-error btn-outline btn-sm' onClick={handleSignOut}>Logout</button></li>
                            </ul>

                        </div>

                    )}
                </div> */}

                <div className="navbar-end">
                    {isLoggedIn && (
                        <>
                            {/* <div className="dropdown dropdown-end block md:hidden">
                                <div>
                                    <button className='btn btn-ghost'><AccountCircleIcon fontSize="large" /></button>
                                </div>
                                <ul tabIndex={0} className={`menu dropdown-content z-[1] shadow bg-emerald-800 rounded-box w-40 mt-4 p-2`}>
                                    <li><a className='btn btn-success btn-sm text-gray-200 mb-2' href='/profile'>Profile</a></li>
                                    <li><button className='btn btn-error btn-outline btn-sm' onClick={handleSignOut}>Logout</button></li>
                                </ul>
                            </div> */}

                            <div className="dropdown dropdown-end hidden md:block">
                                <div>
                                    <button className='btn btn-ghost'><AccountCircleIcon fontSize="large" /></button>
                                </div>
                                <ul tabIndex={0} className={`menu dropdown-content z-[1] shadow bg-emerald-800 rounded-box w-40 mt-4 p-2`}>
                                    <li><a className='btn btn-success btn-sm text-gray-200 mb-2' href='/profile'>Profile</a></li>
                                    <li><button className='btn btn-error btn-outline btn-sm' onClick={handleSignOut}>Logout</button></li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar