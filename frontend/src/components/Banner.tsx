"use client"

import React, { useEffect, useState } from 'react'

function Banner() {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
    }, []);


    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(/img/banner1.jpg)' }} data-testid="hero-section">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-white">
                <div className="max-w-xl animate-fade-down">
                    <h1 className="mb-5 text-5xl font-bold">Massage Reservation</h1>
                    <p className="mb-5">Discover popular massage spots near you or in your travel destination, with a diverse range of services to choose from.</p>
                    {!isLoggedIn && (
                        <div>
                            <a className="btn btn-success mx-3" href='/signup'>Sign Up</a>
                            <a className="btn btn-outline btn-accent mx-3" href='/signin'>Sign In</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Banner
