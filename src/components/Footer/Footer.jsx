import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "./footer.css";
import logo from '../../assets/all-images/logo/Final_DriveConn_logo.png'

const quickLinks = [
  {
    path: "/policy",
    display: "Policy",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/vehicle_owner",
    display: "Become a vehicle owner",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div>
      <div className="banner__footer">

      </div>

      <footer className="footer">
        <Container>
          <Row>
            <Col lg="4" md="4" sm="12">
              <div className="logo footer__logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <img src={logo}></img>
                    <h3>DriveConn</h3>
                  </Link>
                </h1>
              </div>
              <p className="footer__logo-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, distinctio, itaque reiciendis ab cupiditate harum ex
                quam veniam, omnis expedita animi quibusdam obcaecati mollitia?
                Delectus et ad illo recusandae temporibus?
              </p>
            </Col>

            <Col lg="2" md="4" sm="6">
              <div className="mb-4">
                <h5 className="footer__link-title">Quick Links</h5>
                <ListGroup>
                  {quickLinks.map((item, index) => (
                    <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            </Col>

            <Col lg="3" md="4" sm="6">
              <div className="mb-4">
                <h5 className="footer__link-title mb-4">Head Office</h5>
                <p className="office__info">123 abc xyz</p>
                <p className="office__info">Phone: +09xxxxxxxx</p>

                <p className="office__info">Email: infor.driveconn@gmail.com</p>

                <p className="office__info">Thời gian hoạt động: 8am - 17pm</p>
              </div>
            </Col>

            <Col lg="3" md="4" sm="12">
              <div className="mb-4">
                <h5 className="footer__link-title">Newsletter</h5>
                <p className="section__description">Subscribe our newsletter</p>
                <div className="newsletter">
                  <input type="email" placeholder="Email" />
                  <span>
                    <i className="ri-send-plane-line"></i>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>

  );
};

export default Footer;
