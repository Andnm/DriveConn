import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/authContext';
import { formatVNDateForm, formatPriceNumber, distanceDate, getBookingStatusColor, getCircleColor } from '../../../../utils/utils';
import './style.css';

const BookingDetail = (props) => {
  // console.log(props.data)
  const { bookingEnd, bookingStart, bookingStatus, isPaid, isTransferred, totalPrice, user_id, vehicle_id, _id, cancel_reason, user_canceled } = props.data;
  const { userDecode } = useContext(AuthContext);

  const circleStyle = {
    backgroundColor: getCircleColor(bookingStatus),
    width: '15px',
    height: '15px',
    borderRadius: '50px'
  };

  const renderCustomerRole = () => {
    if (cancel_reason && bookingStatus === 'Cancelled' && user_canceled?.role_id !== userDecode?.role_id._id) {
      return <p style={{ color: getBookingStatusColor(bookingStatus).color }}>Khách hàng</p>;
    } else if (cancel_reason && bookingStatus === 'Cancelled') {
      return <p style={{ color: getBookingStatusColor(bookingStatus).color }}>Bạn</p>;
    } else {
      return null;
    }
  };

  return (
    <div className='booking-detail-container d-flex flex-column gap-4'>
      <div className='img-background'>
        <img src={vehicle_id?.images[0]} alt='Vehicle' />
      </div>

      <div className='booking-info'>
        <div className='d-flex align-items-center gap-3'>
          <div style={circleStyle}></div>
          <div>
            <div className='d-flex gap-1'>
              {renderCustomerRole()}
              <p style={{ color: getBookingStatusColor(bookingStatus).color }}>
                {cancel_reason && bookingStatus === 'Cancelled' ? getBookingStatusColor(bookingStatus).text.toLowerCase() : getBookingStatusColor(bookingStatus).text}
              </p>
            </div>
            {cancel_reason && bookingStatus === 'Cancelled' && <p style={{ color: '#808080' }}>Lý do: {cancel_reason}</p>}
          </div>
        </div>
        <div className='w-100' style={{ height: '10px', backgroundColor: '#808080', opacity: '0.3' }}></div>
      </div>

      <div className='vehicle-info'>
        <h4>Thông tin xe</h4>
        <div className='info-detail'>
          <p style={{ textTransform: 'uppercase' }}>{vehicle_id.name}</p>
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
          <img src={user_id.imgURL} alt='Customer' />
          <p>{user_id.lastName + ' ' + user_id.firstName}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
