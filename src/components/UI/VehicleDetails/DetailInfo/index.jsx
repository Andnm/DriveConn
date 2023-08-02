import React from 'react'
import './style.css'
import { facilitiesServices } from '../../../../assets/data/facilities'

const DetailInfo = ({ props }) => {

  const { autoMaker_id, category_id, fuel, model_id, otherFacilities, transmission, vehicle_id } = props

  return (
    <div className="vehicle-detail-container">
      <div className="header">
        <h2>{vehicle_id.name}</h2>

        <div className="other-info d-flex align-items-center gap-2">
          <div className="rating">
            <i className="ri-star-fill"></i>
            <p className="score">{vehicle_id.rate} sao</p>
          </div>

          <div>|</div>

          <div className="booked">
            <i className="ri-suitcase-3-line"></i>
            <p className="number">{vehicle_id.booked} chuyến</p>
          </div>

          <div>|</div>

          <div className="location">
            <i className="ri-map-pin-line"></i>
            <p className="address">{vehicle_id.location}</p>
          </div>
        </div>
      </div>

      <div className='separation-line'></div>

      <div className='characteristic'>
        <h3>Đặc điểm</h3>

        <div className='d-flex justify-content-between mt-4'>
          <div className="item">
            <i className="ri-wheelchair-line"></i>
            <p>Loại xe: </p>
            <p>{category_id.name + ' ' + (category_id?.seat !== undefined ? category_id?.seat + ' chỗ' : ' ') || ' '}</p>
          </div>

          <div className="item">
            <i className="ri-sound-module-fill"></i>
            <p>Truyền động: </p>
            <p>{transmission || ' '}</p>
          </div>

          <div className="item">
            <i className="ri-oil-line"></i>
            <p>Nhiên liệu: </p>
            <p>{fuel || ''}</p>
          </div>
        </div>
      </div>

      <div className='separation-line'></div>

      <div className="description">
        <h3>Mô tả</h3>
        <p className='mt-4'>
          {vehicle_id.description}
        </p>
      </div>

      <div className='separation-line'></div>

      <div className="other-facilities">
        <h3>Các tiện nghi khác</h3>

        <div className='list-facilities mt-4'>
          {otherFacilities.map((facilityId) => {
            const facility = facilitiesServices.find((f) => f.id === facilityId);
            if (facility) {
              return (
                <div className="item d-flex gap-2">
                  <i className={facility.icon}></i>
                  <p>{facility.name}</p>
                </div>
              )
            }
            return null;
          })}
        </div>
      </div>

      <div className='separation-line'></div>

      <div className="other-request">
        <h3>Yêu cầu khi thuê xe</h3>

        <div className="car-rental-documents m-4">
          <h4>Giấy tờ xe</h4>
          <img src="https://live.staticflickr.com/65535/53088196509_93109006fd_b.jpg"></img>
        </div>

        <div className="mortgage m-4">
          <h4>Tài sản thế chấp</h4>
          <img src="https://live.staticflickr.com/65535/53088412895_51fcab6898_b.jpg"></img>
        </div>

        <div className="rules m-4">
          <h4>Các quy định khác</h4>
          <img src='https://live.staticflickr.com/65535/53088196514_540997fabb_b.jpg'></img>
        </div>

        <div className="cancel-booking-policy m-4">
          <h4>Chính sách hủy truyến</h4>
          <img src='https://live.staticflickr.com/65535/53088412910_195acd2d98_b.jpg'></img>
        </div>
      </div>

      <div className='separation-line'></div>

      <div className="map">
        <h3>Vị trí xe</h3>
        <img className="w-100" src="https://live.staticflickr.com/65535/53088010711_97532c0383_b.jpg"></img>
      </div>

      <div className='separation-line'></div>

      <div className="owner-container">
        <h3>Chủ xe</h3>
        <div className='owner-profile d-flex gap-3'>
          <img src={vehicle_id.user_id.imgURL} alt="" />
          <p>{vehicle_id.user_id.lastName + ' ' + vehicle_id.user_id.firstName}</p>
        </div>
      </div>

      <div className='separation-line'></div>

      <div className="comment">
        <h3>Đánh giá từ người khác</h3>
        <p>Chưa có đánh giá nào</p>
      </div>
    </div>

  )
}

export default DetailInfo