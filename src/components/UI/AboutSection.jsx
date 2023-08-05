import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">Thông tin chúng tôi</h4>
              <h2 className="section__title">Chào mừng tới dịch vụ cho thuê xe</h2>
              <p className="section__description">
                Các dịch vụ thuê xe thường cung cấp nhiều loại xe đa dạng để phù hợp với nhu cầu và ngân sách của khách hàng. Chúng bao gồm các dòng xe từ tiết kiệm nhiên liệu như xe hạng nhẹ và xe tải nhỏ, đến các loại xe sang trọng như xe hạng sang và SUV. Khách hàng có thể lựa chọn từ các loại xe khác nhau để phù hợp với số lượng hành khách, mục đích di chuyển và các yêu cầu cụ thể khác.
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Linh hoạt
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Dịch vụ chuyên nghiệp
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Sự đa dạng và lựa chọn
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Hỗ trợ 24/7
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
