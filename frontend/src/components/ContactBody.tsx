import React from 'react'
import '@/components/ContactBody.css'

function ContactBody() {
    return (
        <div className='bg-emerald-800'>

            {/* grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 animate-fade animate-once'>
                <div className='text-gray-200 text-center py-20 hover:bg-emerald-700 duration-500'>
                    <h1 className='font-bold text-2xl mb-2'>HOURS OF OPERATION</h1>
                    <span className='text-gray-300 text-lg link-underline link-underline-black'>9:00 to 17:00, Mon-Fri (Excluding Holidays)</span>
                </div>
                <div className='text-gray-200 text-center py-20 hover:bg-emerald-700 duration-500'>
                    <h1 className='font-bold text-2xl mb-2'>PHONE NUMBER</h1>
                    <span className='text-gray-300 text-lg link-underline link-underline-black'>(+66) 29998844</span>
                </div>
                <div className='text-gray-200 text-center py-20 hover:bg-emerald-700 duration-500'>
                    <h1 className='font-bold text-2xl mb-2'>GENERAL INQUIRIES</h1>
                    <span className='text-gray-300 text-lg link-underline link-underline-black'>biz@mrs.com</span>
                </div>
            </div>

            {/* more content */}
            <div className="text-center py-16 bg-emerald-900">
                <h1 className='font-bold text-gray-200 text-xl animate-fade'>Our partnership service team is waiting for you to join us !</h1>
                <p className='max-w-2xl mx-auto my-4 text-gray-300 animate-fade'>Our partnership service team is dedicated to helping massage shops like yours thrive in today's market. 
                    Join us to expand your reach, increase bookings, and elevate your business to new heights. 
                    Let's work together to create unforgettable experiences for your clients and grow your success!</p>
            </div>
        </div>
    )
}

export default ContactBody
