import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import VehicleItem from "../components/UI/VehicleItem";
// import carData from "../assets/data/carData";

import axios from 'axios'
import API_URL from "../api/Router";
import Loading from 'react-loading';


const CarListing = () => {
  const [carData, setCarData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1500);

  //   return () => clearTimeout(timer);
  // }, []);

  const getAllVehicles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/vehicles/home`);
      if (res.status === 200) {
        console.log(res)
        setCarData(res.data)
        setIsLoading(false)
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllVehicles()
  }, [])

  return (
    <Helmet title="Cars">
      <CommonSection title="Vehicle Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {isLoading ? <div className="d-flex justify-content-center"><Loading type="spin" color="#000" /></div> :
              carData?.length && carData?.map((item) => (
                (!item.isRented ? <VehicleItem item={item} key={item.id} /> : '')
              ))
            }

          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
