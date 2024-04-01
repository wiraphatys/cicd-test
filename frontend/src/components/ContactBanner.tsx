import React from 'react';

function ContactBanner() {
    return (
        <div className="hero min-h-[32vh]" style={{ backgroundImage: 'url(/img/banner2.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-white">
                <div className="max-w-2xl animate-fade-down animate-once">
                    <p className='mb-8'>Partner with us to enhance customer experiences! Join today.</p>
                    <h1 className="mb-5 text-5xl font-bold">Contact Us</h1>
                </div>
            </div>
        </div>
    );
}

export default ContactBanner;
