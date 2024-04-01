"use client"

import React, { useEffect, useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, FormLabel } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import getMassageByID from '@/libs/getMassageByID';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '@/utils/config';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

interface Props {
    params: {
        massageID: string
    }
}

interface MassageItem {
    _id: string;
    name: string;
    address: string;
    province: string;
    tel: string;
    openTime: string;
    closeTime: string;
}

interface ResponseJSON {
    success: boolean;
    data: MassageItem
}

function ReservePage({ params }: Props) {
    const [massage, setMassage] = useState<MassageItem>({ _id: "", name: "", address: "", province: "", tel: "", openTime: "", closeTime: "" });
    const [date, setDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true)
            const response: ResponseJSON = await getMassageByID({ mid: params.massageID });
            setMassage(response.data);
        } catch (err) {
            console.log("Error: ", err);
        } finally {
            setLoading(false)
        }
    };

    const handleDateChange = (newDate: Date | null) => {
        setDate(newDate);
    };

    const handleReservation = async () => {
        try {
            if (date) {
                const formattedDate: string = date.toISOString();
                const payload = {
                    resvDate: formattedDate
                };

                const response = await axios.post(`${config.api}/massages/${params.massageID}/reservations`, payload, config.headers());

                if (response.data.success) {
                    Swal.fire({
                        title: "Confirmed",
                        text: "Reserved successfully",
                        icon: "success",
                        timer: 2000
                    });

                    router.push("/massages")
                } else {
                    throw new Error(response.data.message);
                }
            } else {
                throw new Error("Please select a date.");
            }
        } catch (error: any) {
            if (error.response.data.message === "Not authorize to access this route") {
                Swal.fire({
                    title: "Authorized failed",
                    text: "Please login before reserve a massage service",
                    icon: "error",
                    timer: 2000
                })

                setTimeout(() => {
                    router.push("/signin")
                }, 500)
            } else {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    icon: "error",
                    timer: 2000
                });
            }
        }
    };

    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                        <div className='container min-h-screen py-10 lg:py-20 px-10 md:px-0 mx-auto lg:w-1/3 animate-fade-up'>
                            <p className='font-bold text-3xl text-center pt-6 text-emerald-900'>Massage Shop</p>
                            <div className='border p-4 my-4 rounded-xl hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 bg-white'>
                                <h2 className='font-bold text-lg'>{massage.name}</h2>
                                <p className='text-gray-600 my-2'>
                                    <LocationOnIcon className='text-teal-400' /> {massage.address}, {massage.province}
                                </p>
                                <p className='text-gray-600 my-2'>
                                    <LocalPhoneIcon className='text-teal-400' /> {massage.tel}
                                </p>
                                <p className='text-gray-600 my-2'>
                                    <WatchLaterIcon className='text-teal-400' /> {massage.openTime} - {massage.closeTime}
                                </p>
                            </div>

                            <div className="card shadow-2xl bg-base-100 my-8">
                                <p className='font-bold text-2xl text-center pt-6 text-emerald-900'>Reserve Form</p>
                                <form className="card-body">
                                    <FormControl>
                                        <label className="label">
                                            <span className='label-text'>Date</span>
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={date}
                                                onChange={handleDateChange}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-outline btn-success" type="button" onClick={handleReservation}>Confirm</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                )
            }
        </>
    );
}

export default ReservePage;
