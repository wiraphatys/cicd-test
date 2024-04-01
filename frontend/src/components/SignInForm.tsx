"use client"

import config from '@/utils/config'
import axios from 'axios'
import { error } from 'console'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

function SignInForm() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault()
            const user = { email, password }
            await axios.post(`${config.api}/auth/login`, user).then((res) => {
                if (res.data.success === true) {
                    Swal.fire({
                        title: 'Sign In',
                        text: 'sign in successfully.',
                        icon: 'success',
                        timer: 2000
                    })

                    localStorage.setItem(config.tokenName, res.data.token)
                    
                    setTimeout(() => {
                        router.push('/')
                    }, 1000)

                } else {
                    Swal.fire({
                        title: 'Sign In',
                        text: `sign in failed ${res.data.message}`,
                        icon: "error",
                        timer: 2000
                    })
                }
            }).catch(err => {
                throw err.response.data;
            })
            // console.log("result", response.data)
        } catch (e: any) {
            console.log(e)
            Swal.fire({
                title: 'Sign In',
                text: `sign in failed ${e.message}`,
                icon: "error",
                timer: 2000
            })
        }
    } 

  return (
      <div className="hero min-h-screen bg-emerald-100" >
          <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left lg:ml-12 animate-fade-right">
                  <h1 className="text-5xl font-bold">Sign In now!</h1>
                  <p className="py-6">Welcome to MRS - Your Gateway to Relaxation and Wellness. Sign in to start your journey.</p>
              </div>
              <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <form className="card-body">
                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">Email</span>
                          </label>
                          <input type="email" placeholder="email" className="input input-bordered" required 
                            onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>
                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">Password</span>
                          </label>
                          <input type="password" placeholder="password" className="input input-bordered" required 
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="label">
                              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                          </label>
                      </div>
                      <div className="form-control mt-6">
                          <button className="btn btn-outline btn-success"
                            onClick={(e) => handleSubmit(e)}
                          >Sign In</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  )
}

export default SignInForm