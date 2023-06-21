import React, { useState, useContext } from 'react'
import { formatPrice, formatPriceNumber, distanceDate } from '../../../../utils/utils'
import './style.css'
import DateInput from '../DateInput'
import ModalBox from '../../../Modal/ModalBox'
import { createBooking } from '../../../../api/booking'
import LoadingCar from '../../../LoadingCar/LoadingCar'
import { toast } from 'react-toastify';
import toastOption from '../../../../config/toast'
import { AuthContext } from '../../../../context/authContext'
import { useParams, useNavigate } from "react-router-dom";


const DataBooking = ({ props }) => {
  const { autoMaker_id, category_id, fuel, model_id, otherFacilities, transmission, vehicle_id } = props

  const { slug } = useParams();

  const { currentToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dateStart, setDateStart] = useState('');
  const [timeStart, setTimeStart] = useState('');

  const [dateEnd, setDateEnd] = useState('');
  const [timeEnd, setTimeEnd] = useState('');

  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const calculatorTotalPrice = () => {
    if (distanceDate(dateStart, dateEnd)) {
      return formatPriceNumber(vehicle_id?.price * distanceDate(dateStart, dateEnd))
    } else {
      return formatPriceNumber(vehicle_id?.price)
    }
  }

  const handleBookingButton = () => {
    setOpenModalConfirm(true)
  }

  const handleBookingApi = async () => {
    setIsLoading(true)

    const bookingStart = new Date(dateStart + 'T' + timeStart);
    const bookingEnd = new Date(dateEnd + 'T' + timeEnd);

    const response = await createBooking(currentToken, slug, bookingStart, bookingEnd);

    if (response) {
      navigate(`/booking_history`)
      toast.success('Thuê xe thành công! Chờ chủ xe phản hồi.', toastOption)
    } else {
      toast.error('Thuê xe thất bại, vui lòng thử lại sau', toastOption)
    }
    
    setOpenModalConfirm(false)
    setIsLoading(false)
  }

  return (
    <div className="data-booking-container d-flex flex-column gap-4">
      <div className="header">
        <p className="price">{formatPrice(vehicle_id.price)}k</p>
        <p>/ ngày</p>
      </div>

      <div className="pickup-date w-100">
        <h4>Ngày nhận xe</h4>
        <DateInput
          date={dateStart}
          handleDateChange={(e) => { setDateStart(e.target.value); }}
          time={timeStart}
          handleTimeChange={(e) => { setTimeStart(e.target.value) }}
        />
      </div>

      <div className="return-date">
        <h4>Ngày trả xe</h4>
        <DateInput
          date={dateEnd}
          handleDateChange={(e) => { setDateEnd(e.target.value); }}
          time={timeEnd}
          handleTimeChange={(e) => { setTimeEnd(e.target.value) }}
        />
      </div>

      <div className="pickup-location">
        <h4>Địa điểm nhận xe</h4>
        <div className='content d-flex gap-2'>
          <i className="ri-map-pin-line"></i>
          <p className="address">{vehicle_id.location}</p>
        </div>
      </div>

      <div className="surcharge">
        <h4>Phụ thu có thể phát sinh</h4>
        <img className="w-100" src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.15752-9/355450726_262915966389356_7833825725190722698_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=cE44kAblOYAAX-gH7V1&_nc_ht=scontent.fsgn19-1.fna&oh=03_AdQ953DCNsMwDzYojELvSlBM7c0-qGLgdry1cMFUh8pkTA&oe=64B9DAB2"></img>
      </div>

      <div className="price-details">
        <h4>Bảng giá chi tiết</h4>

        <div className='price-list'>
          <div className='item'>
            <p>Đơn giá thuê</p>
            <p>{formatPriceNumber(vehicle_id.price)} / day</p>
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
            <p>{formatPriceNumber(vehicle_id.price)} x {distanceDate(dateStart, dateEnd) || 1} day</p>
          </div>

          <div style={{ margin: '0 auto', marginBottom: '10px', marginTop: '15px' }}>
            <img className='w-100' style={{ height: '25px', objectFit: 'contain', cursor: 'pointer' }} src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.15752-9/355688047_766563338594122_6997880366937339016_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=CC2_6-AG9cMAX_3Pdpf&_nc_ht=scontent.fsgn19-1.fna&oh=03_AdQKzOcHM8qf_BgvCQo50WvwvTWsTOVm-U6gvI2fSMMLkQ&oe=64BA0B44"></img>
          </div>
        </div>

        <div className='separator-line'></div>

        <div className="total-price">
          <div className='item'>
            <p>Tổng tiền</p>
            <p>{calculatorTotalPrice()} VND</p>
          </div>
        </div>

      </div>

      <button className={`btn ${!dateStart && !timeStart && !dateEnd && !timeEnd ? 'btn-secondary' : 'btn-primary'}`} onClick={handleBookingButton} style={{ pointerEvents: !dateStart && !timeStart && !dateEnd && !timeEnd ? 'none' : 'auto' }}>
        Đặt xe
      </button>

      {openModalConfirm
        &&
        <ModalBox
          open={openModalConfirm}
          onClose={() => setOpenModalConfirm(false)}
          centerAction={true}
          title={'Xác nhận'}
          body={'Bạn có chắc muốn thuê chiếc xe này?'}
          btnActionNo={'Không'}
          btnActionYes={'Yet sor chéc chén rồi'}
          eventToContinue={handleBookingApi}
        />
      }

      {isLoading && <LoadingCar />}
    </div>
  )
}

export default DataBooking