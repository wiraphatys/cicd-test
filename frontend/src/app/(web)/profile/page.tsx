"use client"

import config from '@/utils/config'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

interface User {
    name: string,
    email: string,
    password: string,
    role: string,
    tel: string,
    _id: string
}

function ProfilePage() {

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [tel, setTel] = useState('')
    const [id, setId] = useState('')
    const [updatePassword, setUpdatePassword] = useState(false);

    // const [user, setUser] = useState<User>({
    //     name: "",
    //     email: "",
    //     password: "",
    //     role: "",
    //     tel: "",
    //     _id: ""
    // })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await (await axios.get(`${config.api}/auth/me`, config.headers())).data
            if (response.success === true) {
                const user: User = await response.data
                setName(user.name)
                setEmail(user.email)
                setPassword(user.password)
                setRole(user.role),
                    setTel(user.tel)
                setId(user._id)
            }
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault()
            let updatedUser: Partial<User> = {
                name: name,
                tel: tel,
                email: email,
            }

            if (updatePassword) {
                if (password === '' || password === undefined) {
                    throw new Error("Please enter a new password")
                }
                const confirmed = await Swal.fire({
                    title: "Update Confirmation",
                    text: "Are you sure to update profile with password ?",
                    icon: "question",
                    showCancelButton: true,
                    cancelButtonText: "Cancel",
                    confirmButtonText: "Update"
                })
                if (!confirmed.isConfirmed) {
                    return
                }
                updatedUser = {
                    ...updatedUser,
                    password: password
                }
            } else {
                const confirmed = await Swal.fire({
                    title: "Update Confirmation",
                    text: "Are you sure to update profile ?",
                    icon: "question",
                    showCancelButton: true,
                    cancelButtonText: "Cancel",
                    confirmButtonText: "Update"
                })
                if (!confirmed.isConfirmed) {
                    return
                }
            }

            const response = await axios.put(`${config.api}/users/${id}`, updatedUser, config.headers())
            if (response.data.success === true) {
                Swal.fire({
                    title: "Updated Success",
                    text: "Updated user profile successfully",
                    icon: "success",
                    timer: 2000
                })
                setTimeout(() => {
                    router.push("/")
                }, 1500)
            } else {
                throw new Error("Updated failed")
            }
        } catch (err: any) {
            Swal.fire({
                title: "Updated Failed",
                text: err.message,
                icon: "error",
                timer: 2000
            })
        }
    }


    return (
        <>
            <div className='hero min-h-screen animate-fade-up'>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered" required value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Telephone</span>
                            </label>
                            <input type="text" placeholder="telephone" className="input input-bordered" required value={tel}
                                onChange={(e) => setTel(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* <div className="form-control">
                      <label className="label">
                          <span className="label-text">New Password</span>
                      </label>
                      <input type="password" placeholder="new password" className="input input-bordered" required value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </div> */}
                        {/* สร้าง checkbox หรือ toggle switch เพื่อให้ user เลือกการอัพเดต password */}
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text font-semibold">Update Password</span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-success"
                                    checked={updatePassword}
                                    onChange={() => setUpdatePassword(!updatePassword)}
                                />
                            </label>
                        </div>
                        {/* ถ้า user เลือกใส่รหัสผ่านใหม่ให้แสดง input element สำหรับใส่รหัสผ่าน */}
                        {updatePassword && (
                            <div className="form-control animate-fade-right">
                                <label className="label">
                                    <span className="label-text">New Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="new password"
                                    className="input input-bordered"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <input type="text" placeholder="role" className="input input-bordered" required value={role} disabled
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline btn-success" type='submit'
                                onClick={(e) => handleSubmit(e)}
                            >Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProfilePage