import React from 'react'

function AboutTeam() {
  return (
    <div className='container mx-auto'>
        <h1 className='text-4xl text-emerald-900 text-center font-bold pt-12 pb-6'>Our Team</h1>
        <hr />
          <div className='grid grid-cols-1 xl:grid-cols-3 animate-fade animate-once my-8'>
              <div className="flex justify-center my-4">
                  <div className="card w-96 bg-base-100 shadow-xl">
                      <figure style={{ height: '400px' }}><img src="/img/profile_banky.jpg" alt="Shoes" /></figure>
                      <div className="card-body">
                          <h2 className="card-title">Wiraphat Yodsri</h2>
                          <p>SID: 6633229721</p>
                      </div>
                  </div>
              </div>

              <div className="flex justify-center my-4">
                  <div className="card w-96 bg-base-100 shadow-xl">
                      <figure style={{ height: '400px' }}><img src="/img/profile_vine.jpg" alt="Shoes" /></figure>
                      <div className="card-body">
                          <h2 className="card-title">Achiravit Sukganpean</h2>
                          <p>SID: 6633276121</p>
                      </div>
                  </div>
              </div>

              <div className="flex justify-center my-4">
                  <div className="card w-96 bg-base-100 shadow-xl">
                      <figure style={{ height: '400px' }}><img src="/img/profile_oho.jpg" alt="Shoes" /></figure>
                      <div className="card-body">
                          <h2 className="card-title">Ditlap Lapchaicharoenkit</h2>
                          <p>SID: 6633079921</p>
                      </div>
                  </div>
              </div>
          </div>
          <hr />
    </div>
  )
}

export default AboutTeam