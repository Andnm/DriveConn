import React, { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { formatVNDateForm, formatPriceNumber, getBookingStatusColorEnglish, getCircleColor, formatDate } from '../../../utils/utils'

const BookingInfor = (props) => {
    console.log(props.data)
    const { bookingEnd, bookingStart, bookingStatus, createdAt, totalPrice, user_id, vehicle_id, cancel_reason, user_canceled } = props.data;
    const { userDecode } = useContext(AuthContext);

    const circleStyle = {
        backgroundColor: getCircleColor(bookingStatus),
        width: '15px',
        height: '15px',
        borderRadius: '50px'
    };

    const renderCustomerRole = () => {
        if (cancel_reason && bookingStatus === 'Cancelled' && user_canceled?.role_id !== userDecode?.role_id._id) {
            return <p style={{ color: getBookingStatusColorEnglish(bookingStatus).color }}>Khách hàng</p>;
        } else if (cancel_reason && bookingStatus === 'Cancelled') {
            return <p style={{ color: getBookingStatusColorEnglish(bookingStatus).color }}>Bạn</p>;
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
                            <p style={{ color: getBookingStatusColorEnglish(bookingStatus).color }}>
                                {cancel_reason && bookingStatus === 'Cancelled' ? getBookingStatusColorEnglish(bookingStatus).text.toLowerCase() : getBookingStatusColorEnglish(bookingStatus).text}
                            </p>
                        </div>
                        {cancel_reason && bookingStatus === 'Cancelled' && <p style={{ color: '#808080' }}>Lý do: {cancel_reason}</p>}
                    </div>
                </div>
                <div className='w-100' style={{ height: '10px', backgroundColor: '#808080', opacity: '0.3' }}></div>
            </div>

            <div className='time'>
                <h4>Booking Information</h4>
                <div className='time-detail d-flex align-items-start gap-5'>
                    <div className="d-flex flex-column">
                        <p>Address: </p>
                        <p>Booking Creation:</p>
                        <p>Booking Start:</p>
                        <p>Booking End:</p>

                    </div>
                    <div className="d-flex flex-column">
                        <p>Thủ Đức, Hồ Chí Minh </p>
                        <p>{formatVNDateForm(createdAt)}</p>
                        <p>{formatVNDateForm(bookingStart)}</p>
                        <p>{formatVNDateForm(bookingEnd)}</p>
                    </div>
                </div>

                <div className='time-detail d-flex align-items-start justify-content-center gap-3 mt-3'>
                    <div className="d-flex flex-column">
                        <p style={{ fontWeight: 'bold', fontSize: '25px' }}>Total price:</p>
                    </div>
                    <div className="d-flex flex-column">
                        <p style={{ fontWeight: 'bold', fontSize: '25px' }}>{formatPriceNumber(totalPrice)} VNĐ</p>
                    </div>
                </div>
            </div>

            <div className='vehicle-info'>
                <h4>Vehicle</h4>
                <div className='info-detail'>
                    <p style={{ textTransform: 'uppercase' }}>Name: {vehicle_id.name}</p>
                    <p>License Plate: {vehicle_id.licensePlate}</p>
                </div>
            </div>

            <div className='customer-profile'>
                <h4>Customer</h4>
                <div className='customer-info-drawer d-flex gap-3 align-items-center' style={{ paddingLeft: "20px" }}>
                    <img src={user_id.imgURL} alt='Customer' />
                    <p style={{ fontSize: '25px' }}>{user_id.lastName + ' ' + user_id.firstName}</p>
                </div>

                <div className='time mt-2'>
                    <div className='time-detail d-flex align-items-start gap-5'>
                        <div className="d-flex flex-column">
                            <p>Email:</p>
                            <p>Phone:</p>
                            <p>Gender:</p>
                            <p>Birthday:</p>
                            <p>Address:</p>
                        </div>
                        <div className="d-flex flex-column">
                            <p>{user_id.email ? user_id.email : '(User not updated)'}</p>
                            <p>{user_id.phone ? user_id.phone : '(User not updated)'}</p>
                            <p>{user_id.gender ? user_id.gender : '(User not updated)'}</p>
                            <p>{user_id.dob ? formatDate(user_id.dob) : '(User not updated)'}</p>
                            <p>{user_id.address ? user_id.address : '(User not updated)'}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BookingInfor;
