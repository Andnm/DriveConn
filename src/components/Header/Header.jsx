import React, { useContext, useState } from 'react'
import { Container, DropdownItem } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import logo from '../../assets/all-images/logo/Final_DriveConn_logo.png'
import { AuthContext } from "../../context/authContext";
import Dropdown from 'react-bootstrap/Dropdown'
import Login from '../../pages/Auth/Login/Login'
import Signup from '../../pages/Auth/Signup/Signup'
import LoadingCar from '../LoadingCar/LoadingCar'
import incognitoAvatar from '../../assets/all-images/avatar.jpg'

const Header = () => {

  const { currentToken, logout, userDecode, isLoadingEvent } = useContext(AuthContext);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalSignupOpen, setModalSignupOpen] = useState(false);
  const [isOpenCurrentPwdModal, setIsOpenCurrentPwdModal] = useState(false)
  const [headerLogin, setHeaderLogin] = useState(false)

  const openCurrentPwdModal = () => {
    setIsOpenCurrentPwdModal(true)
  }

  const closeCurrentPwdModal = () => {
    setIsOpenCurrentPwdModal(false)
  }

  const handleClose = () => {
    setModalLoginOpen(false);
    console.log(headerLogin)
    setHeaderLogin(true)
  }

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
    logout();
  }

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

            {/* <div className="d-flex justify-content-center align-items-center gap-1 change-language nav__item">
              <i className="ri-global-line"></i>
              <p>EN</p>
            </div> */}
            <div className='separation-line'>
            </div>

            {!userDecode && (
              <div className="header-button">
                <button
                  onClick={() => {
                    setModalLoginOpen(true);
                  }}
                  className="btn btn-outline-light"
                >
                  Đăng nhập
                </button>
                <Login open={modalLoginOpen} onClose={() => setModalLoginOpen(false)} />

                <button
                  onClick={() => {
                    setModalSignupOpen(true);
                  }}
                  className="btn btn-light"
                >
                  Đăng ký
                </button>
                <Signup open={modalSignupOpen} onClose={() => setModalSignupOpen(false)} />
              </div>
            )}

            {userDecode && Object.keys(userDecode).length === 0 && (
              <div className="header-button">
                <button
                  onClick={() => {
                    setModalLoginOpen(true);
                  }}
                  className="btn btn-outline-light"
                >
                  Đăng nhập
                </button>
                <Login open={modalLoginOpen} onClose={() => setModalLoginOpen(false)} />

                <button
                  onClick={() => {
                    setModalSignupOpen(true);
                  }}
                  className="btn btn-light"
                >
                  Đăng ký
                </button>
                <Signup open={modalSignupOpen} onClose={() => setModalSignupOpen(false)} />
              </div>
            )}

            {userDecode && Object.keys(userDecode).length !== 0 && (
              <div className='headerAfterLogin gap-3'>
                <div className='bell'>
                  <i className="ri-notification-4-line"></i>
                </div>

                <div className='personal-page'>
                  <NavLink to="/my_account" className='d-flex gap-3 justify-content-center align-items-center' >
                    <div className="avatar-profile">
                      <img src={userDecode?.imgURL || incognitoAvatar}
                        alt={userDecode?.imgURL ? "UserAva" : "IncognitoAva"} />
                    </div>
                    <p >{userDecode?.lastName + ' ' + userDecode?.firstName}</p>
                  </NavLink>
                </div>
              </div>           
            )}
            {isLoadingEvent && <LoadingCar background={true} />}
          </div>
        </Container >
      </div >
    </header >
  );
};

export default Header;
