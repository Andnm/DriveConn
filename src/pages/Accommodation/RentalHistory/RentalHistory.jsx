import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { AuthContext } from '../../../context/authContext'
import LoadingCar from '../../../components/LoadingCar/LoadingCar'
import { getAllOfHotelierBookings } from '../../../api/booking'
import BookingItem from '../../../components/UI/Booking/BookingItem'

const RentalHistory = () => {

  const { currentToken, userDecode } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)
  const [bookingList, setBookingList] = useState([])

  const handleGetAllBookingOfHotelier = async () => {
    setIsLoading(true)
    const response = await getAllOfHotelierBookings(currentToken);
    if (response) {
      setBookingList(response)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetAllBookingOfHotelier()
  }, []);

  return (
    <div className="d-flex justify-content-center flex-column rental-history-container gap-3">
      <div className='title'>Lịch sử cho thuê xe</div>
      <div className='body d-flex justify-content-around'>
        {isLoading
          ?
          <LoadingCar className={'blank-container'} />
          :
          (bookingList && bookingList.length ? (
            bookingList.map((item) => (
              !item.isRented ? <BookingItem item={item}/> : null
            ))
          ) : (
            <h3>Bạn chưa có cho thuê xe lần nào cả</h3>
          ))
        }
      </div>
    </div>
  )
}

export default RentalHistory