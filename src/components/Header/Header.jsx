import React, { useContext, useEffect, useState } from 'react'
import { Container, DropdownItem } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import logo from '../../assets/all-images/logo/Final_DriveConn_logo.png'
import jwt_decode from 'jwt-decode'
import { AuthContext } from "../../context/authContext";
import Dropdown from 'react-bootstrap/Dropdown'

const Header = () => {

  const { currentToken, logout, userDecode } = useContext(AuthContext);
  const [userInfor, setUserInfor] = useState('');

  const navLinks = [
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

  const handleLogout = () => {
    setUserInfor('')
    logout();
  }

  useEffect(() => {
    try {
      const decodedToken = jwt_decode(currentToken);
      if (decodedToken.user.roleName != 'Admin') {
        setUserInfor(userDecode)
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <header className="header">
      <div className="main__navbar">
        <Container className="d-flex align-items-center gap-1 justify-content-between">
          <div className="logo">
            <Link to='/home' className="d-flex align-items-center gap-2">
              <img src={logo}></img>
              <h3>DriveConn</h3>
            </Link>
          </div>

          <div className="menu">
            {navLinks.map((item, index) => (
              <NavLink
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? "nav__active nav__item" : "nav__item"
                }
                key={index}
              >
                {item.display}
              </NavLink>
            ))}

            <div className="d-flex justify-content-center align-items-center gap-1 change-language nav__item">
              <i className="ri-global-line"></i>
              <p>EN</p>
            </div>

            {userInfor && (
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {userDecode?.lastName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link to="/profile">Profile</Link>

                  {(userInfor.role_id.roleName === 'Customer')
                    ? <Link to="/booking_history">Booking History</Link>
                    : <>
                      <Link to="/vehicle_registration">Vehicle Registration</Link>
                      <Link to="/rental_history">Rental History</Link>
                    </>

                  }
                  <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
                </Dropdown.Menu>
              </Dropdown>
            )}

            {!userInfor && (
              <div className="header-button">
                <Link to='/login' className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Log in
                </Link>

                <Link to='/signup' className="btn btn-light">
                  Sign up
                </Link>
              </div>
            )}

          </div>
        </Container>

      </div >
    </header >
  );
};

export default Header;
