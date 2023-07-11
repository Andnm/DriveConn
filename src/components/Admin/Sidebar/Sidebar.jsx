import React, { useContext, useEffect, useState } from 'react'
import logo from "../../../assets/all-images/logo/Final_DriveConn_logo.png";
import './sidebar.css'
import { AuthContext } from "../../../context/authContext";

import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const { userDecode, currentToken, logout } = useContext(AuthContext);

  const menuItem = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: "ri-dashboard-line"
    },
    {
      path: "/admin/user_management",
      name: "User Management",
      icon: "ri-user-line"
    },
    {
      path: "/admin/vehicle_management",
      name: "Vehicle Management",
      icon: "ri-car-line"
    },
    {
      path: "/admin/drivingLicense_management",
      name: "License Management",
      icon: "ri-bank-card-line"
    },
    {
      path: "/admin/booking_management",
      name: "Booking Management",
      icon: "ri-user-line"
    },
    {
      path: "/admin/blog_management",
      name: "Blog Management",
      icon: "ri-file-line"
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar__top d-flex justify-content-center align-items-center">

      </div>

      <div className="sidebar__middle d-flex justify-content-center flex-column">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
          >
            <i className={item.icon}></i>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>

      <div className='sidebar__bottom__btn d-flex justify-content-center'>
        <div >
          <div className='d-flex justify-content-center align-items-center'>
            <div className="sidebar__top__logo">
              <img src={logo}></img>
            </div>
            <p className="sidebar__top__text fs-5">
              {userDecode.lastName + ' ' + userDecode.firstName}
            </p>
          </div>
        </div>

        <button className="btn logout_btn" onClick={logout}>
          <i className="ri-logout-box-r-line fs-5"></i>
        </button>
      </div>

    </div>
  )
}

export default Sidebar