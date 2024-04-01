"use client"

import config from '@/utils/config'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

function SignInForm() {

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tel, setTel] = useState('')

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault()
            const payload = { 
                name,
                email,
                password,
                tel,
                role: "user"
             }
            await axios.post(`${config.api}/auth/register`, payload).then((res) => {
                if (res.data.success === true) {

                    Swal.fire({
                        title: 'Sign Up',
                        text: 'sign up successfully.',
                        icon: 'success',
                        timer: 2000
                    })
                    
                    setTimeout(() => {
                        router.push('/signin')
                    }, 1000)
                } else {
                    throw new Error("Sign Up failed.")
                }
            })
        } catch (e: any) {
            Swal.fire({
                title: "Sign Up Error",
                text: e.response.data.message,
                icon: "error",
                timer: 2000
            })
            console.log(e.response.data.message)
        }
    }

    return (
        <div className="hero min-h-screen bg-emerald-100" >
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left lg:ml-12 animate-fade-right">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">Make your massage experience memorable with MRS today! Sign up for free and start reserving instantly.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered" required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Telephone</span>
                            </label>
                            <input type="text" placeholder="telephone" className="input input-bordered" required
                                onChange={(e) => setTel(e.target.value)}
                            />
                        </div>
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
                            >Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInForm