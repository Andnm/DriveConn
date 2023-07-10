import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from "../../../../context/authContext";
import { SlUser } from "react-icons/sl";
import { RiFilePaperLine } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";

import './style.css'

import { getBookingList } from '../../../../api/booking';
import { getUserList } from '../../../../api/user'
import { getAllCars } from '../../../../api/car';
import { getAllMotorbikes } from '../../../../api/motorbike';

const HeaderDashBoard = () => {
    const [totalAccount, setTotalAccount] = useState(0)
    const [customerAccountCount, setCustomerAccountCount] = useState(0);
    const [hotelierAccountCount, setHotelierAccountCount] = useState(0);
    const [ownerAccountCount, setOwnerAccountCount] = useState(0);

    const [totalVehicle, setTotalVehicle] = useState(0)
    const [carCount, setCarCount] = useState(0);
    const [motorbikeCount, setMotorbikeCount] = useState(0);

    const [bookingCount, setBookingCount] = useState(0)
    const [bookingCompletedCount, setBookingCompletedCount] = useState(0);
    const [bookingCancelledCount, setBookingCancelledCount] = useState(0);

    const { currentToken } = useContext(AuthContext);

    const getCount = () => {
        getUserList(currentToken).then((res) => {
            const customerAccountCount = res.filter(obj => obj.role_id.roleName === 'Customer' && obj.status === true).length;
            const hotelierAccountCount = res.filter(obj => obj.role_id.roleName === 'Hotelier' && obj.status === true).length;
            const ownerAccountCount = res.filter(obj => obj.role_id.roleName === 'Owner' && obj.status === true).length;

            setTotalAccount(res.length)
            setCustomerAccountCount(customerAccountCount);
            setHotelierAccountCount(hotelierAccountCount);
            setOwnerAccountCount(ownerAccountCount);
        })

        getAllCars(currentToken).then((res) => {
            const carCount = res.length;
            setCarCount(carCount);
        })

        getAllMotorbikes(currentToken).then((res) => {
            const motorbikeCount = res.length;
            setMotorbikeCount(motorbikeCount);
        })

        getBookingList(currentToken).then((res) => {
            const completedBooking = res.filter(obj => obj.bookingStatus === 'Completed').length;
            const cancelledBooking = res.filter(obj => obj.bookingStatus === 'Cancelled').length;

            setBookingCount(res.length)
            setBookingCompletedCount(completedBooking)
            setBookingCancelledCount(cancelledBooking)
        });

    }

    useEffect(() => {
        getCount();
    }, []);

    return (
        <div className="row header-dashboard">
            <div className="col-12 col-sm-6 col-xxl-3 d-flex">
                <div className="card illustration flex-fill">
                    <div className="card-body p-0 d-flex flex-fill">
                        <div className="row g-0 w-100">
                            <div className="col-6">
                                <div className="illustration-text p-3 m-1">
                                    <h4 className="illustration-text">Welcome Driveconn Manager!</h4>
                                    <p className="mb-0">Driveconn Dashboard</p>
                                </div>
                            </div>
                            <div className="col-6 align-self-end text-end">
                                <img src="https://appstack.bootlab.io/img/illustrations/customer-support.png" alt="Customer Support" className="img-fluid illustration-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-xxl-3 d-flex">
                <div className="card flex-fill">
                    <div className="card-body pt-4">
                        <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                                <h3>Account</h3>
                                <div className="mb-0 d-flex gap-5 mt-4">
                                    <div></div>
                                    <div className='title'>
                                        <div className='d-flex gap-2'>
                                            <i className="ri-user-line"></i>
                                            <p>Customer</p>
                                        </div>

                                        <div className='d-flex gap-2'>
                                            <i className="ri-hotel-line"></i>
                                            <p>Hotelier</p>
                                        </div>

                                        <div className='d-flex gap-2'>
                                            <i className="ri-user-star-line"></i>
                                            <p>Owner</p>
                                        </div>
                                    </div>

                                    <div className='data'>
                                        <div>
                                            <p>{customerAccountCount}</p>
                                        </div>
                                        <div>
                                            <p>{hotelierAccountCount}</p>
                                        </div>
                                        <div>
                                            <p>{ownerAccountCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-inline-block ms-3">
                                <div className="stat">
                                    <SlUser />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-xxl-3 d-flex">
                <div className="card flex-fill">
                    <div className="card-body pt-4">
                        <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                                <h3 className="mb-2">Vehicle</h3>
                                <div className="mb-0 d-flex gap-5 mt-4">
                                    <div></div>
                                    <div className='title'>
                                        <div className='d-flex gap-2'>
                                            <i className="ri-car-line"></i>
                                            <p>Car</p>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <i className="ri-motorbike-line"></i>
                                            <p>Motorbike</p>
                                        </div>
                                    </div>

                                    <div className='data'>
                                        <div>
                                            <p>{carCount}</p>
                                        </div>
                                        <div>
                                            <p>{motorbikeCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-inline-block ms-3">
                                <div className="stat">
                                    <RiFilePaperLine />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-xxl-3 d-flex">
                <div className="card flex-fill">
                    <div className="card-body pt-4">
                        <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                                <h3 className="mb-2">Booking</h3>
                                <div className="mb-0 d-flex gap-5 mt-4">
                                    <div></div>
                                    <div className='title'>
                                        <div className='d-flex gap-2'>
                                            <i style={{ color: 'purple' }} className="ri-bookmark-line"></i>
                                            <p style={{ color: 'purple' }}>Total</p>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <i style={{ color: 'green' }} className="ri-checkbox-circle-line"></i>
                                            <p style={{ color: 'green' }}>Completed</p>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <i style={{ color: 'red' }} className="ri-indeterminate-circle-line"></i>
                                            <p style={{ color: 'red' }}>Cancelled</p>
                                        </div>
                                    </div>

                                    <div className='data'>
                                        <div>
                                            <p style={{ color: 'purple' }}>{bookingCount}</p>
                                        </div>
                                        <div>
                                            <p style={{ color: 'green' }}>{bookingCompletedCount}</p>
                                        </div>
                                        <div>
                                            <p style={{ color: 'red' }}>{bookingCancelledCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-inline-block ms-3">
                                <div className="stat">
                                    <BiTransfer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeaderDashBoard
