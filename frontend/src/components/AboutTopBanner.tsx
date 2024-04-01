import React from 'react'

function AboutTopBanner() {
  return (
      <div className="hero min-h-[32vh]" style={{ backgroundImage: 'url(/img/banner3.jpg)' }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-white">
              <div className="max-w-3xl animate-fade animate-once">
                  <h1 className="mb-5 text-3xl font-bold">We’re proud to give you</h1>
                  <h1 className="mb-5 text-3xl font-bold">The best massage experience</h1>
              </div>
          </div>
      </div>
  )
}

export default AboutTopBanner