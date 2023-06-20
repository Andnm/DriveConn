import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import VehicleItem from "../components/UI/VehicleItem";
import { getVehicleList } from "../api/vehicle";
import LoadingCar from "../components/LoadingCar/LoadingCar";

const CarListing = () => {
  const [vehicleData, setVehicleData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleGetVehicleList = async () => {
    setIsLoading(true)
    const response = await getVehicleList();
    if (response) {
      setVehicleData(response)
      setIsLoading(false)
    }

  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    handleGetVehicleList()
  }, [])

  return (
    <Helmet title="Cars">
      <CommonSection title="Vehicle Listing" />

      <section>
        <Container>
          <Row>
            {/* <Col lg="12">
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
            </Col> */}

            {console.log(vehicleData)}

            {/* {isLoading ?
              <LoadingCar className={'blank-container'} /> :
              vehicleData?.length && vehicleData?.map((item) => (
                (!item.isRented ? <VehicleItem item={item} key={item.id} /> : '')
              ))
            } */}

            {isLoading ? (
              <LoadingCar className={'blank-container'} />
            ) : (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <VehicleItem item={vehicleData[0]} key={index} />
                ))}
              </>
            )}

          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
