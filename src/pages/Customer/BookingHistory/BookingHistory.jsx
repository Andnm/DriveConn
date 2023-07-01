import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { AuthContext } from '../../../context/authContext'
import LoadingCar from '../../../components/LoadingCar/LoadingCar'
import { getAllOfCustomerBookings } from '../../../api/booking'
import BookingItem from '../../../components/UI/Booking/BookingItem'

const BookingHistory = () => {

  const { currentToken, userDecode } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)
  const [bookingList, setBookingList] = useState([])

  const handleGetAllBookingOfCustomer = async () => {
    setIsLoading(true)
    const response = await getAllOfCustomerBookings(currentToken);
    if (response) {
      setBookingList(response)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetAllBookingOfCustomer()
  }, []);

  return (

    <div className="d-flex justify-content-center flex-column history-booking-container gap-3">
      <div className='title'>Lịch sử chuyến đi</div>
      <div className='body d-flex flex-wrap gap-2 justify-content-center'>
        {isLoading
          ?
          <LoadingCar className={'blank-container'} />
          :
          (bookingList && bookingList.length ? (
            bookingList.map((item) => (
              !item.isRented ? <BookingItem item={item} /> : null
            ))
          ) : (
            <h3>Bạn chưa có đi thuê xe lần nào cả</h3>
          ))
        }
      </div>
    </div>
  )
}

export default BookingHistory