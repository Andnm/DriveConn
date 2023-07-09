import React from 'react'
import './style.css'

import { formatVNDateForm, formatPriceNumber, distanceDate } from '../../../../utils/utils'


const BookingDetail = (props) => {

  const { bookingEnd, bookingStart,
    bookingStatus, isPaid, isTransferred,
    totalPrice, user_id, vehicle_id, _id } = props.data

    console.log(_id)
    
  return (
    <div className='booking-detail-container d-flex flex-column gap-4'>
      <div className='img-background'>
        <img src={vehicle_id?.images[0]}></img>
      </div>

      <div className='vehicle-info'>
        <h4>Thông tin xe</h4>
        <div className='info-detail'>
          <p style={{textTransform: 'uppercase'}}>{vehicle_id.name}</p>
          <p>Biển số xe: {vehicle_id.licensePlate}</p>
        </div>
      </div>

      <div className='time'>
        <h4>Thời gian</h4>
        <div className='time-detail d-flex align-items-center gap-3'>
          <i className="ri-calendar-2-line"></i>
          <div>
            <p>Bắt đầu: {formatVNDateForm(bookingStart)}</p>
            <p>Kết thúc: {formatVNDateForm(bookingEnd)}</p>
          </div>
        </div>
      </div>

      <div className="price-details">
        <h4>Bảng giá chi tiết</h4>

        <div className='price-list'>
          <div className='item'>
            <p>Đơn giá thuê</p>
            <p>{formatPriceNumber(vehicle_id.price)} / ngày</p>
          </div>

          <div className='item'>
            <p>Phí dịch vụ</p>
            <p>Chưa hỗ trợ</p>
          </div>

          <div className='item'>
            <p>Phí bảo hiểm</p>
            <p>Chưa hỗ trợ</p>
          </div>
        </div>

        <div className='separator-line'></div>

        <div className="price-calculator">
          <div className='item'>
            <p>Tổng phí thuê xe</p>
            <p>{formatPriceNumber(vehicle_id.price)} x {distanceDate(bookingStart, bookingEnd) || 1} ngày</p>
          </div>
        </div>

        <div className='separator-line'></div>

        <div className="total-price">
          <div className='item'>
            <p>Tổng tiền</p>
            <p>{formatPriceNumber(totalPrice)} VND</p>
          </div>
        </div>
      </div>

      <div className='customer-profile'>
        <h4>Hồ sơ người thuê</h4>
        <div className='customer-info d-flex gap-3 align-items-center'>
          <img src={user_id.imgURL}></img>
          <p>{user_id.lastName + ' ' + user_id.firstName}</p>
        </div>
      </div>

    </div>
  )
}

export default BookingDetail