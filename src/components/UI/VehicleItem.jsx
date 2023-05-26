import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/vehicle-item.css";
import { useNavigate } from "react-router-dom";
import icon_oto from '../../assets/all-images/icon_oto.png'
import icon_motobike from '../../assets/all-images/icon_motobike.jpg'

const VehicleItem = (props) => {
  const { image, description, model, insurance, isRented, price, licensePlate } = props.item;
  const navigate = useNavigate();

  const handleClickVehicleItem = () => {
    navigate(`/vehicles/${licensePlate}`)
  }

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item" onClick={handleClickVehicleItem}>
        <div className="car__img">
          <img src={!image ? (description.includes('Car') ? icon_oto : icon_motobike) : image} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{licensePlate}</h4>
          <h6 className="rent__price text-center mt-">
            {price ? <span> {price.toLocaleString('vi', {style : 'currency', currency : 'VND'})} / Day</span> : <span>Free</span>}
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              {description.includes('Car') ? <><i className="ri-car-line"></i>{description}</> : <><i className="ri-motorbike-fill"></i>{description}</>}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {(insurance == 'Have') ? 'Have Insurance' : `Haven't Insurance`}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {isRented ? 'Unrentable' : 'Rentable'}
            </span>
          </div>

          {/* <button className=" w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${carName}`}>Rent</Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details">
            <Link to={`/cars/${carName}`}>Details</Link>
          </button> */}
        </div>
      </div>
    </Col>
  );
};

export default VehicleItem;
