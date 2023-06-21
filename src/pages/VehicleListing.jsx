import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import VehicleItem from "../components/UI/VehicleItem";
import { getVehicleList } from "../api/vehicle";
import { getAllMotorbikes } from "../api/motorbike";
import { getAllCars } from "../api/car";
import VehicleLoading from "../components/SkeletonLoading/VehicleLoading";
import { useLocation } from "react-router-dom";
import FilterVehicle from "../components/FilterVehicle";

const CarListing = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [vehicleData, setVehicleData] = useState();

  const [carData, setCarData] = useState();
  const [motorbikeData, setMotorbikeData] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const locationState = useLocation();
  const radioOption = locationState?.state?.radioOption ?? '';

  const [selectedFilter, setSelectedFilter] = useState(0);

  const handleGetVehicleList = async () => {
    setIsLoading(true)

    const responseMotorbike = await getAllMotorbikes();
    if (responseMotorbike) {
      setMotorbikeData(responseMotorbike)
    }
    const responseCar = await getAllCars();
    if (responseCar) {
      setCarData(responseCar)
    }
    const response = await getVehicleList();
    if (response) {
      setVehicleData(response)
    }

    setIsLoading(false)
  }


  useEffect(() => {
    if (radioOption === "Motorbike") {
      setSelectedFilter(1);
    } else if (radioOption === "car") {
      setSelectedFilter(2);
    } else {
      setSelectedFilter(0);
    }
    handleGetVehicleList()
  }, [])

  return (
    <Helmet title="Vehicle">
      <CommonSection title="Danh sách xe" />

      <FilterVehicle
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <section>
        <Container>
          <Row>
            {isLoading ? (
              <>
                {Array.from({ length: 2 }).map(() => (
                  <VehicleLoading />
                ))}
              </>
            ) : selectedFilter === 0 ? (
              vehicleData?.length &&
              vehicleData?.map((item) =>
                !item.vehicle_id.isRented ? (
                  <VehicleItem item={item} key={item.id} />
                ) : <p></p>
              )
            ) : selectedFilter === 1 ? (
              motorbikeData?.length &&
              motorbikeData?.map((item) =>
                !item.vehicle_id.isRented ? (
                  <VehicleItem item={item} key={item.id} />
                ) : <p style={{textAlign:'center'}}>Không có xe nào phù hợp nhu cầu bạn muốn!</p>
              )
            ) : (
              carData?.length &&
              carData?.map((item) =>
                !item.vehicle_id.isRented ? (
                  <VehicleItem item={item} key={item.id} />
                ) : <p style={{textAlign:'center'}}>Không có xe nào phù hợp nhu cầu bạn muốn!</p>
              )
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
