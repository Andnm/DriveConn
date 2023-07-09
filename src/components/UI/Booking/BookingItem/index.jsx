import React, { useState, useContext } from 'react'
import './style.css'
import { Col } from "reactstrap";
import { formatVNDateForm, formatPrice, getBookingStatusColor, getCircleColor } from '../../../../utils/utils';
import ModalBox from '../../../Modal/ModalBox'
import BookingDetail from '../BookingDetail'
import { changeBookingStatus } from '../../../../api/booking'
import { toast } from 'react-toastify';
import toastOption from '../../../../config/toast'
import LoadingCar from '../../../LoadingCar/LoadingCar';
import { AuthContext } from '../../../../context/authContext'
import Payment from '../Payment';

const BookingItem = (props) => {
  const { bookingEnd, bookingStart,
    bookingStatus, isPaid, isTransferred,
    totalPrice, user_id, vehicle_id, _id } = props.item

  const { currentToken, userDecode } = useContext(AuthContext);

  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(bookingStatus)

  const [isOpenModalPayment, setIsOpenModalPayment] = useState(false);

  const circleStyle = {
    backgroundColor: getCircleColor(status)
  };

  const handleAgreeBookingByOwner = async () => {
    setIsLoading(true)
    const response = await changeBookingStatus(currentToken, _id)

    if (response.status === 200) {
      toast.success('Đồng ý cho thuê xe thành công', toastOption)
      setStatus(response.data.bookingStatus)
    } else {
      toast.error('Đã có lỗi xảy ra vui lòng thử lại sau', toastOption)
    }

    setIsOpenModalDetail(false)
    setIsLoading(false)
  }

  const handlePaymentModal = () => {
    setIsOpenModalDetail(false)
    setIsOpenModalPayment(true)
  }

  const handlePaymentApi = async () => {
    setIsLoading(true)
    const response = await changeBookingStatus(currentToken, _id)

    if (response.status === 200) {
      toast.success('Vui lòng chờ trong khi xác nhận thanh toán', toastOption)
      setStatus(response.data.bookingStatus)
    } else {
      toast.error('Đã có lỗi xảy ra vui lòng thử lại sau', toastOption)
    }

    setIsOpenModalPayment(false)
    setIsLoading(false)
  }

  const handleConfirmDeliveryApi = async () => {
    setIsLoading(true)
    const response = await changeBookingStatus(currentToken, _id)

    if (response.status === 200) {
      toast.success('Đã xác nhận bàn giao xe xong', toastOption)
      setStatus(response.data.bookingStatus)
    } else {
      toast.error('Đã có lỗi xảy ra vui lòng thử lại sau', toastOption)
    }

    setIsOpenModalDetail(false)
    setIsOpenModalPayment(false)
    setIsLoading(false)
  }

  const handleConfirmCompletedBooking = async () => {
    setIsLoading(true)
    const response = await changeBookingStatus(currentToken, _id)

    if (response.status === 200) {
      toast.success('Cảm ơn bạn đã tin tưởng và thuê xe!', toastOption)
      setStatus(response.data.bookingStatus)
    } else {
      toast.error('Đã có lỗi xảy ra vui lòng thử lại sau', toastOption)
    }

    setIsOpenModalDetail(false)
    setIsLoading(false)
  }

  const isOwner = userDecode?.role_id?.roleName === 'Owner';

  
  const actionMapping = {
    Pending: {
      btnActionYes: {
        isOwner: 'Đồng ý cho thuê',
        isNotOwner: null
      },
      eventToContinue: {
        isOwner: handleAgreeBookingByOwner,
        isNotOwner: null
      }
    },
    Paying: {
      btnActionYes: {
        isOwner: null,
        isNotOwner: 'Tiến hành thanh toán'
      },
      eventToContinue: {
        isOwner: null,
        isNotOwner: handlePaymentModal
      }
    },
    Delivering: {
      btnActionYes: {
        isOwner: 'Xác nhận đã bàn giao xe',
        isNotOwner: null
      },
      eventToContinue: {
        isOwner: handleConfirmDeliveryApi,
        isNotOwner: null
      }
    },
    Delivered: {
      btnActionYes: {
        isOwner: 'Xác nhận hoàn thành chuyến đi',
        isNotOwner: null
      },
      eventToContinue: {
        isOwner: handleConfirmCompletedBooking,
        isNotOwner: null
      }
    },
    Completed: {
      btnActionYes: {
        isOwner: null,
        isNotOwner: null
      },
      eventToContinue: {
        isOwner: null,
        isNotOwner: null
      }
    },
    Done: {
      btnActionYes: {
        isOwner: null,
        isNotOwner: null
      },
      eventToContinue: {
        isOwner: null,
        isNotOwner: null
      }
    },
  };

  const { btnActionYes, eventToContinue } = actionMapping[status] || {
    btnActionYes: {
      isOwner: null,
      isNotOwner: null
    },
    eventToContinue: {
      isOwner: null,
      isNotOwner: null
    }
  };

  return (
    <Col lg="5" md="5" sm="6" className="mb-5 booking-item">
      <div className="card-booking" onClick={() => setIsOpenModalDetail(true)}>
        <div className="main d-flex flex-column justify-content-between gap-3">
          <div className='header'>
            <p>{vehicle_id.name}</p>
          </div>

          <div className='body d-flex gap-3'>
            <div className='img-car'>
              <img src={vehicle_id.images[0]}></img>
            </div>

            <div className='content '>
              <p>Bắt đầu: {formatVNDateForm(bookingStart)}</p>
              <p>Kết thúc: {formatVNDateForm(bookingEnd)}</p>
              <p>Tổng tiền: {formatPrice(totalPrice)}k</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer d-flex align-items-center gap-3">
        <div className='circle' style={circleStyle}></div>
        <p style={{ color: getBookingStatusColor(status).color }}>{getBookingStatusColor(status).text}</p>

        {isOpenModalDetail
          &&
          <ModalBox
            open={isOpenModalDetail}
            onClose={() => setIsOpenModalDetail(false)}
            title={'Thông tin chuyến'}
            body={
              <BookingDetail data={props.item} />
            }
            btnActionYes={isOwner ? btnActionYes.isOwner : btnActionYes.isNotOwner}
            eventToContinue={isOwner ? eventToContinue.isOwner : eventToContinue.isNotOwner}
          />
        }

        {isOpenModalPayment
          &&
          <ModalBox
            open={isOpenModalPayment}
            onClose={() => setIsOpenModalPayment(false)}
            title={'Thanh toán'}
            body={
              <Payment />
            }
            btnActionYes={'Xác nhận thanh toán'}
            eventToContinue={handlePaymentApi}
          />
        }

        {isLoading && <LoadingCar background={true} />}
      </div>
    </Col>
  )
}

export default BookingItem