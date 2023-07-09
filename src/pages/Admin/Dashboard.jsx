import React, { useContext, useState, useEffect } from 'react'
import DoughnutChart from '../../components/Admin/DashboardComponents/DoughnutChart/DoughnutCart'
import NumberUserCard from '../../components/Admin/DashboardComponents/NumberUserCard/NumberUserCard'
import RevenueChart from '../../components/Admin/DashboardComponents/RevenueChart/RevenueChart'
import { AuthContext } from "../../context/authContext";

import { getBookingList } from '../../api/booking';
import { getVehicleList } from "../../api/vehicle";
import { getUserList } from '../../api/user'


import { RiHotelLine } from "react-icons/ri";
import { SlUser } from "react-icons/sl";
import { AiOutlineCar } from "react-icons/ai";
import { FaMotorcycle } from "react-icons/fa";
import { RiFilePaperLine } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";


const Dashboard = () => {

  const [customerAccountCount, setCustomerAccountCount] = useState(0);
  const [hotelierAccountCount, setHotelierAccountCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [motorbikeCount, setMotorbikeCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);

  const { currentToken } = useContext(AuthContext);
  const { currentvehicle } = useContext(AuthContext);

  const getCount = () => {
    getBookingList(currentToken).then((res) => {
      setBookingCount(res.length)
    });

    getUserList(currentToken).then((res) => {
      const customerAccountCount = res.filter(obj => obj.role_id.roleName === 'Customer' && obj.status === true).length;
      const hotelierAccountCount = res.filter(obj => obj.role_id.roleName === 'Hotelier' && obj.status === true).length;
      
      setCustomerAccountCount(customerAccountCount);
      setHotelierAccountCount(hotelierAccountCount);
    })

    getVehicleList(currentvehicle).then((res) => {
      const carCount = res.filter(obj => obj.description === 'Car').length;
      const motorbikeCount = res.filter(obj => obj.description === 'Motor').length;

      setCarCount(carCount);
      setMotorbikeCount(motorbikeCount);
    })

  }

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className='bg-light container w-100 h-auto d-flex flex-column gap-3'>
      {/* 1 row */}
      <div className='row'>
        <div className="col-12 border py-3">
          <RevenueChart />
        </div>
      </div>

      <div className='row d-flex'>
        <div className="col-12 p-0 d-flex gap-3">
          <div className='border p-0 d-flex flex-column justify-content-between gap-3 p-3' style={{ width: '40%' }}>
            <h4>Total</h4>
            <NumberUserCard title={'Booking'} number={bookingCount} logo={<BiTransfer />} />
            <NumberUserCard title={'Customer'} number={customerAccountCount} logo={<SlUser />} />
            <NumberUserCard title={'Hotelier'} number={hotelierAccountCount} logo={<RiHotelLine />} />
            <NumberUserCard title={'Car'} number={carCount} logo={<AiOutlineCar />} />
            <NumberUserCard title={'Motorbike'} number={motorbikeCount} logo={<FaMotorcycle />} />
            <NumberUserCard title={'Blog'} number={blogCount} logo={<RiFilePaperLine />} />
          </div>
          {/* <div className='border p-3 d-flex' style={{ width: '60%' }}>
            <h4>DoughnutChart</h4>
            <DoughnutChart />
          </div> */}
        </div>
      </div>

    </div>
  )
}

export default Dashboard