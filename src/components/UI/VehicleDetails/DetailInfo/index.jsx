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
          <img src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.15752-9/355741070_589697909897997_3347119866354177015_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=PI0bBn3koJIAX-6sJYV&_nc_ht=scontent.fsgn19-1.fna&oh=03_AdT7BqEgn0jqBG2OrQOvBMSMHJMIr8mvu5ZkJNDEM9sDBg&oe=64B9FC09"></img>
        </div>

        <div className="mortgage m-4">
          <h4>Tài sản thế chấp</h4>
          <img src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.15752-9/355796931_5824678424304805_6764203593921554258_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=FRjTWFgYfBsAX8GFjC1&_nc_ht=scontent.fsgn19-1.fna&oh=03_AdRykBgeqfNveIZwoVKEB-1byjwZF1RkcoTr92d3QXvXpw&oe=64B9EA9C"></img>
        </div>

        <div className="rules m-4">
          <h4>Các quy định khác</h4>
          <img src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.15752-9/355807356_967729924267668_3007285587427635364_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=wObv4DTWCnUAX9KEYYQ&_nc_ht=scontent.fsgn19-1.fna&oh=03_AdTS9Ud1xqB5uNk_GFHdcQknty6rDVKRZynoS2JIYtK3Gg&oe=64B9F88A'></img>
        </div>

        <div className="cancel-booking-policy m-4">
          <h4>Chính sách hủy truyến</h4>
          <img src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.15752-9/353503097_586924310222010_6217897559197281080_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=8IF0mnm1JIcAX8Uj_rf&_nc_ht=scontent.fsgn19-1.fna&oh=03_AdS3lj90Rp6_XhPNxn24C5vQhsRdgZMN6DcbUWNQmWcBHg&oe=64B9F7A9'></img>
        </div>
      </div>

      <div className='separation-line'></div>

      <div className="map">
        <h3>Vị trí xe</h3>
        <img className="w-100" src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.15752-9/355754085_188439897525705_7523887877261689213_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=KHMzBym7PJAAX-Ued5a&_nc_ht=scontent.fsgn19-1.fna&oh=03_AdQU8IlJJhX2h6bbUzZuiZPStFxfI35ybaZU0SO94kSGDw&oe=64B9EF84"></img>
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