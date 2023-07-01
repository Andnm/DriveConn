import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";


import CarouselVehicle from "../components/UI/VehicleDetails/Carousel/CarouselVehicle";
import DataBooking from "../components/UI/VehicleDetails/DataBooking";
import DetailInfo from "../components/UI/VehicleDetails/DetailInfo";

const VehicleDetails = () => {
  const locationState = useLocation();
  const { vehicle_id } = locationState.state.props.item || locationState.state.props
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <button className="btn btn-outline-secondary mb-3 mt-3" onClick={() => navigate(-1)}><i className="ri-arrow-go-back-line"></i></button>

      <CarouselVehicle imagesArray={vehicle_id.images} />

      <Container className="d-flex justify-content-between detail-content-container">
        <DetailInfo props={locationState.state.props.item || locationState.state.props}/>

        <DataBooking props={locationState.state.props.item || locationState.state.props}/>
      </Container>

    </Container>
  )
}

export default VehicleDetails;
