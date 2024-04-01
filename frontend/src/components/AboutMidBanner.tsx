import React from 'react'

function AboutMidBanner() {
  return (
      <div className="hero min-h-[40vh]" style={{ backgroundImage: 'url(/img/banner4.jpg)' }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-white">
              <div className="max-w-3xl animate-fade animate-once">
                  <h1 className="mb-5 text-4xl font-bold">Our Goal</h1>
                  <p className='text-xl px-12'>
                      Together, we're reshaping relaxation. By reimagining the massage experience, we empower them to reclaim control over their well-being. Join us in unlocking ultimate relaxation, one reservation at a time.
                  </p>
              </div>
          </div>
      </div>
  )
}

export default AboutMidBanner