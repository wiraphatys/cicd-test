import React from 'react'

function Footer() {
    return (
        <>
            <footer className="footer p-10 text-neutral-content bg-emerald-950">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover" href='/massages'>Availability</a>
                    <a className="link link-hover" href='/reservations'>Reservation</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover" href='/about'>About</a>
                    <a className="link link-hover" href='/contact'>Contact</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Copyright © 2024 - All right reserved by MRS Co.,Ltd</a>
                </nav>
            </footer>
        </>
    )
}

export default Footer