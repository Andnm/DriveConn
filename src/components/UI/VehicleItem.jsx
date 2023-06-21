import React from "react";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/vehicle-item.css";
import icon_oto from '../../assets/all-images/icon_oto.png'
import avatar from '../../assets/all-images/avatar.jpg'
import { formatPrice } from "../../utils/utils";

const VehicleItem = (props) => {
  const { autoMaker_id, category_id, fuel, model_id, otherFacilities, transmission, vehicle_id } = props.item;
  const action = props.action
  const navigate = useNavigate();

  const handleToOpenVehicleDetail = () => {
    navigate(`/vehicles/${vehicle_id.licensePlate}`, { state: { props } })
  }

  const handleToOpenUpdateVehicleDetail = () => {
    
  }

  return (
    <Col lg="3" md="3" sm="6" className="mb-5 vehicle-item">
      <div className="card">
        <div className="card-details">
          <div className="car__img">
            <img src={vehicle_id.images[0] ? vehicle_id.images[0] : icon_oto} alt="" />
            <img src={vehicle_id.user_id?.imgURL ? vehicle_id.user_id?.imgURL : avatar} alt="" className="owner" />
          </div>

          <div className="card__body gap-1">
            <div className="services d-flex gap-2">
              {!vehicle_id.mortage && <button className="mortgage">Miễn thế chấp</button>}
              {transmission === 'Manual'
                ?
                <button className="transmission">Số sàn</button>
                :
                (transmission === 'Auto'
                  ? <button className="transmission">Số tự động</button>
                  : <></>
                )
              }
            </div>

            <div className="name d-flex gap-2 align-items-center">
              <p>{vehicle_id.name}</p>
              {vehicle_id.insurance && <i className="ri-shield-check-line"></i>}
            </div>

            <div className="other-info d-flex gap-3">
              <div className="rating d-flex gap-1">
                <i className="ri-star-fill"></i>
                <p className="score">{vehicle_id.rate} sao</p>
              </div>

              <div className="numberBooked d-flex gap-1">
                <i className="ri-suitcase-3-line"></i>
                <p className="number">{vehicle_id.booked} chuyến</p>
              </div>
            </div>

            <div className="location d-flex gap-1">
              <i className="ri-map-pin-line"></i>
              <p className="address">{vehicle_id.location}</p>
            </div>
          </div>

          <div className="separation-line"></div>

          <div className="card__footer d-flex justify-content-center">
            <div className="d-flex align-items-center">
              <p className="price">{formatPrice(vehicle_id.price)}k</p>
              <p>/ngày</p>
            </div>
          </div>
        </div>

        {action === 'Sửa thông tin'
          ?
          <button className="card-button" onClick={handleToOpenUpdateVehicleDetail}>
            {action}
          </button>
          :
          <button className="card-button" onClick={handleToOpenVehicleDetail}>
            Thuê ngay
          </button>
        }

      </div>
    </Col>
  );
};

export default VehicleItem;
