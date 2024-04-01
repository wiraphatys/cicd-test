"use client"

import React, { useEffect, useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, FormLabel } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '@/utils/config';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

interface Props {
    params: {
        reservationID: string
    }
}

interface ReservationItem {
    massage: {
        address: string;
        name: string;
        tel: string;
    };
    user: string
    resvDate: string;
    _id: string;
}

interface ResponseResvJSON {
    success: boolean;
    data: ReservationItem;
}

interface UserRole {
    _id: string,
    role: string
}

interface ResponseUserJSON {
    success: boolean;
    data: UserRole;
    message: string;
}

function ReservePage({ params }: Props) {
    const [user, setUser] = useState<UserRole>(Object);
    const [reservation, setReservation] = useState<ReservationItem>({
        massage: {
            name: "",
            address: "",
            tel: "",
        },
        user: "",
        resvDate: "",
        _id: ""
    });
    const [date, setDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        fetchData();
        fetchUserRole();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<ResponseResvJSON>(`${config.api}/reservations/${params.reservationID}`, config.headers());
            if (response.data.success === true) {
                setReservation(response.data.data)
            } else {
                throw new Error("failed to fetch data.")
            }
        } catch (err: any) {
            console.log("Error: ", err);
        }
    };

    const fetchUserRole = async () => {
        try {
            const response = await axios.get<ResponseUserJSON>(`${config.api}/auth/me`, config.headers());
            if (response.data.success === true) {
                setUser(response.data.data)

                setLoading(false)
            } else {
                throw new Error(response.data.message)
            }
        } catch (err: any) {
            console.log(err.message)
            router.push("/")

            Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error",
                timer: 2000
            })
        }
    }

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

                const response = await axios.put(`${config.api}/reservations/${params.reservationID}`, payload, config.headers());

                if (response.data.success) {
                    Swal.fire({
                        title: "Confirmed",
                        text: "Reserved successfully",
                        icon: "success",
                        timer: 2000
                    });

                    router.push("/reservations")
                } else {
                    throw new Error(response.data.message);
                }
            } else {
                throw new Error("Please select a date.");
            }
        } catch (error: any) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                timer: 2000
            });
        }
    };

    // Function to format the reservation date to show only the date part
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options = { month: '2-digit' as const, day: '2-digit' as const, year: 'numeric' as const };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                        <div className='container min-h-screen py-10 lg:py-20 px-10 md:px-0 mx-auto lg:w-1/3 animate-fade-up'>
                            <p className='font-bold text-3xl text-center pt-6 text-emerald-900'>Target Reservation</p>
                            <div className='border p-4 mt-4 rounded-xl hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 bg-white'>
                                <h2 className='font-bold text-lg'>{reservation.massage.name}</h2>
                                <p className='text-gray-600 my-2'>
                                    <LocationOnIcon className='text-teal-400' /> {reservation.massage.address}
                                </p>
                                <p className='text-gray-600 my-2'>
                                    <LocalPhoneIcon className='text-teal-400' /> {reservation.massage.tel}
                                </p>
                                <p className='text-gray-600 my-2'>
                                    <CalendarMonthIcon className='text-teal-400' /> {formatDate(reservation.resvDate)}
                                </p>
                                {
                                    user.role === "admin" ?
                                        <p className='text-gray-600 my-2'>
                                            <PersonIcon className='text-teal-400' /> {reservation.user}
                                        </p>
                                        : ''
                                }
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
