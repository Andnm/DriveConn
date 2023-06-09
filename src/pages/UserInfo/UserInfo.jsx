import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import './style.css'
import img_tmp from '../../assets/all-images/avatar.jpg'


const UserInfo = () => {
  const { currentToken, logout, userDecode } = useContext(AuthContext);

  console.log(userDecode)

  return (

    (userDecode && <div className="d-flex justify-content-center flex-column profile-container gap-3">
      <div className='title'>Trang cá nhân</div>
      <div className='user-profile d-flex gap-5 '>
        <div className='left d-flex flex-column'>
          <div className='avatar-user'>
            <img src={img_tmp}></img>
          </div>
          <div className="another-info">
            {/* <div className="">unknown</div>
          <div className="">unknown</div> */}
          </div>
        </div>

        <div className='right d-flex flex-column'>
          <div className="header d-flex flex-column">
            <div className='top-header d-flex justify-content-between align-items-center gap-3'>
              <div className="left-top-header d-flex justify-content-center align-items-center gap-3">
                <p className='user-name'>Minh An</p>
                <div className='user-location d-flex'>
                  <i className="ri-map-pin-line"></i>
                  <p className=''>Thủ Đức, TP.Hồ Chí Minh</p>
                </div>
              </div>

              <div className='edit-profile d-flex gap-2'>
                <i className="ri-edit-line"></i>
                <p>Sửa trang cá nhân</p>
              </div>
            </div>

            <div className='role-name'>
              <p>{userDecode.role_id.roleName}</p>
            </div>

            <div className='rate-section'>
              <p className='title-rate'>Lượt đánh giá</p>
              <div className='d-flex rate-data'>
                <p className='score'>4.0</p>
                <div className='star'>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-line"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="main d-flex flex-column">
            <div className="main-top d-flex gap-4">
              <NavLink to="/#" className='about d-flex gap-2 active'>
                <i className="ri-account-box-fill"></i>
                <p>Bản thân</p>
              </NavLink>

              <NavLink to="/#" className='timeline d-flex gap-2'>
                <i className="ri-time-fill"></i>
                <p>Mốc thời gian</p>
              </NavLink>
            </div>

            <div className="main-info d-flex flex-column justify-content-around">
              <div className="contact-info">
                <p className='text-header'>Thông tin liên lạc</p>
                <div className="content d-flex ">
                  <div className="label-info d-flex flex-column">
                    <p>Số điện thoại: </p>
                    <p>Địa chỉ cụ thể: </p>
                    <p>Email: </p>
                  </div>
                  <div className="input-info d-flex flex-column">
                    <p>{userDecode.phone}</p>
                    <p>data</p>
                    <p>{userDecode.email}</p>
                  </div>
                </div>
              </div>

              <div className="basic-info">
                <p className='text-header'>Thông tin cơ bản</p>
                <div className="content d-flex">
                  <div className="label-info d-flex flex-column">
                    <p>Họ: </p>
                    <p>Tên: </p>
                    <p>Ngày sinh: </p>
                    <p>Giới tính: </p>
                  </div>
                  <div className="input-info d-flex flex-column">
                    <p>{userDecode.lastName}</p>
                    <p>{userDecode.firstName}</p>
                    <p>{userDecode.dob}</p>
                    <p>{userDecode.gender === 'Male' ? 'Nam' : 'Nữ'}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>)
  )
}

export default UserInfo