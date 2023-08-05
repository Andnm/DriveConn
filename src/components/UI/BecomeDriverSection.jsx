import React from "react";
import "../../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

import driverImg from "../../assets/all-images/toyota-offer-2.png";

const BecomeDriverSection = () => {

  const navigate = useNavigate()

  const navigateToOwner = () => {
    navigate('/vehicle_owner')
  }
  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={driverImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
              Bạn có muốn kiếm thêm thu nhập với chúng tôi? Đừng chậm trễ!
            </h2>

            <button className="btn become__driver-btn mt-4" onClick={navigateToOwner}>
              Trở thành chủ xe
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;
