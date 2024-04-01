// MassageList.tsx

"use client"

import { getMassages } from '@/libs/getMassages';
import config from '@/utils/config';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Loading from './Loading';

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
    count: number;
    pagination: { prev?: { page: number; limit: number }; next?: { page: number; limit: number } };
    data: MassageItem[];
}

function MassageList() {
    // { page }: { page: number }
    const router = useRouter()

    const [page, setPage] = useState(1); // Start from page 1
    const [massageList, setMassageList] = useState<MassageItem[]>([])
    const [searchbox, setSearchbox] = useState<string>('')
    const [searchSubmitBtn, setSearchSubmitBtn] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<string>('Name');
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchData()
    }, [page, searchSubmitBtn])

    const fetchData = async () => {
        try {
            setLoading(true)
            let url = `${config.api}/massages?page=${page}`;
            if (searchbox !== '') {
                if (selectedOption === 'Name') {
                    url += `&name=${searchbox}`;
                } else if (selectedOption === 'Province') {
                    url += `&province=${searchbox}`;
                } else if (selectedOption === 'Tel') {
                    url += `&tel=${searchbox}`;
                }
            }
            const response: ResponseJSON = await getMassages({ url });
            setMassageList(response.data);
        } catch (e) {
            console.log("Error: ", e);
        } finally {
            setLoading(false)
        }
    };

    const handleSearch = () => {
        setSearchSubmitBtn(!searchSubmitBtn)
        setPage(1)
    }

    const handleClickBtn = (massageID: string) => {
        router.push(`/reserve/${massageID}`)
    }

    const decreasePage = () => {
        if (page > 1) setPage(page - 1); // Ensure page doesn't go below 1
    };

    const increasePage = () => {
        setPage(page + 1);
    };
    
    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                        <>
                            <p className='font-bold text-3xl text-center pt-6 pb-4 text-emerald-900'>Massage List</p>
                            <div className="form-control">
                                <label className='label'>
                                    <span className='label-text text-md font-semibold'>Search Box</span>
                                </label>
                                <div className='grid grid-cols-10'>
                                    <input type="text" placeholder="Search..." className="col-span-8 md:col-span-9 input input-bordered mr-4" value={searchbox}
                                        onChange={(e) => setSearchbox(e.target.value)}
                                    />
                                    <button className='btn bg-rose-600 hover:bg-rose-700 text-white col-span-2 md:col-span-1'
                                        onClick={() => handleSearch()}
                                    >Enter</button>
                                </div>
                            </div>
                            <div className="form-control grid grid-cols-3">
                                <label className="label cursor-pointer flex justify-start">
                                    <input type="radio" name="radio-10" className="radio checked:bg-emerald-800" checked={selectedOption === 'Name'} onChange={() => setSelectedOption('Name')} />
                                    <span className="label-text p-4">Name</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start">
                                    <input type="radio" name="radio-10" className="radio checked:bg-emerald-800" checked={selectedOption === 'Province'} onChange={() => setSelectedOption('Province')} />
                                    <span className="label-text p-4">Province</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start">
                                    <input type="radio" name="radio-10" className="radio checked:bg-emerald-800" checked={selectedOption === 'Tel'} onChange={() => setSelectedOption('Tel')} />
                                    <span className="label-text p-4">Telephone</span>
                                </label>
                            </div>
                            {
                                massageList.length >= 5 ? (
                                    <div className='join grid grid-cols-2'>
                                        <button className={`join-item text-white btn btn-error ${page === 1 ? 'btn-disabled cursor-not-allowed' : ''}`} onClick={decreasePage} disabled={page === 1}>Previous</button>
                                        <button className={`join-item text-white btn btn-success ${massageList.length === 0 ? 'btn-disabled cursor-not-allowed' : ''}`} onClick={increasePage} disabled={massageList.length !== 25}>Next</button>
                                    </div>
                                ) : ''
                            }
                            <div>
                                {massageList.map((massage: MassageItem) => (
                                    <div key={massage._id} id={massage._id}
                                        className='border p-4 my-4 rounded-xl hover:shadow-lg transition duration-300 
                                        ease-in-out transform hover:scale-105 bg-white animate-fade-up animate-once'>
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
                                        <button className='text-white btn btn-accent btn-sm rounded-md mt-2'
                                            onClick={() => handleClickBtn(massage._id)}
                                        >Reserve</button>
                                    </div>
                                ))}
                            </div>
                            <div className='join grid grid-cols-2 pb-8'>
                                <button className={`join-item text-white btn btn-error ${page === 1 ? 'btn-disabled cursor-not-allowed' : ''}`} onClick={decreasePage} disabled={page === 1}>Previous</button>
                                <button className={`join-item text-white btn btn-success ${massageList.length === 0 ? 'btn-disabled cursor-not-allowed' : ''}`} onClick={increasePage} disabled={massageList.length !== 25}>Next</button>
                            </div>
                    </>
                )
            }
        </>
    );
}

export default MassageList;
