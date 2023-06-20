import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/vehicle-item.css";
import icon_oto from '../../assets/all-images/icon_oto.png'
import avatar from '../../assets/all-images/avatar.jpg'

const VehicleItem = (props) => {
  const { booked, description, images,
    insurance, licensePlate, location, mortage,
    name, price, rate, user_id, yearOfManufacturer } = props.item;

  const handleClickVehicleItem = () => {

  }

  function formatPrice(price) {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(0);
    } else if (price >= 1000) {
      return (price / 1000).toFixed(0);
    } else {
      return price.toString();
    }
  }

  return (
    <Col lg="3" md="3" sm="6" className="mb-5 vehicle-item">

      <div className="card">
        <div className="card-details">
          <div className="car__img">
            <img src={images[0] ? images[0] : icon_oto} alt="" />
            <img src={user_id?.imgURL ? user_id?.imgURL : avatar} alt="" className="owner" />
          </div>

          <div className="card__body gap-1">
            <div className="services d-flex gap-2">
              {!mortage && <button className="mortgage">Miễn thế chấp</button>}
              <button className="transmission">Số tự động</button>
            </div>

            <div className="name d-flex gap-2 align-items-center">
              <p>{name}</p>
              {insurance && <i className="ri-shield-check-line"></i>}
            </div>

            <div className="other-info d-flex gap-3">
              <div className="rating d-flex gap-1">
                <i className="ri-star-fill"></i>
                <p className="score">{rate} sao</p>
              </div>

              <div className="numberBooked d-flex gap-1">
                <i className="ri-suitcase-3-line"></i>
                <p className="number">{booked} chuyến</p>
              </div>
            </div>

            <div className="location d-flex gap-1">
              <i className="ri-map-pin-line"></i>
              <p className="address">{location}</p>
            </div>
          </div>

          <div className="separation-line"></div>

          <div className="card__footer d-flex justify-content-center">
            <div className="d-flex align-items-center">
              <p className="price">{formatPrice(price)}k</p>
              <p>/ngày</p>
            </div>
          </div>
        </div>
        <Link to={`/vehicles/${licensePlate}`} className="card-button" onClick={handleClickVehicleItem}>Thuê ngay</Link>
      </div>
    </Col>
  );
};

export default VehicleItem;
