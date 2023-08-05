import React, {useState, useEffect} from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";
import BlogList from "../components/UI/BlogList";
import axios from 'axios'
import API_URL from "../api/Router";
import FeedbackIcon from "../components/FeedbackIcon";
import VehicleItem from "../components/UI/VehicleItem"

const Home = () => {

  const [carData, setCarData] = useState();

  const getAllVehicles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/vehicles/home`);
      if (res.status === 200) {
        setCarData(res.data)
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllVehicles()
  }, [])

  return (
    <Helmet title="Home">
      {/* ================== feedback =============== */}
      <FeedbackIcon/>
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Lựa chọn phương tiện bạn muốn đi</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12" className="d-flex justify-content-center align-items-center">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Cùng đến</h6>
              <h2 className="section__title">Dịch vụ phổ biến</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Đến với</h6>
              <h2 className="section__title">Lựa chọn tốt nhất</h2>
            </Col>

            {carData?.slice(0, 4).map((item) => (
              <VehicleItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
      {/* =========== become a driver section ============ */}
      <BecomeDriverSection />

      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h2 className="section__title">Khách hàng nói gì về chúng tôi?</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

      {/* =============== blog section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Khám phá các bài viết</h6>
              <h2 className="section__title">Bài viết mới nhất</h2>
            </Col>

            <BlogList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
