import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, Navigate } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import './style.css'
import img_tmp from '../../assets/all-images/avatar.jpg'
import DrivingLicense from '../../components/UI/DrivingLicense/DrivingLicense';

const UserInfo = () => {
  const { currentToken, userDecode } = useContext(AuthContext);

  if (!userDecode) {
    return <Navigate to="/home" />;
  }

  const StarRating = ({ rate }) => {
    const filledStars = [...Array(rate)].map((_, index) => (
      <i key={index} className="ri-star-fill"></i>
    ));

    const emptyStars = [...Array(5 - rate)].map((_, index) => (
      <i key={index} className="ri-star-line"></i>
    ));

    return (
      <div className='star'>
        {filledStars}
        {emptyStars}
      </div>
    );
  }

  const RenderRole = ({ role }) => {
    let roleString = '';

    if (role === 'Customer') {
      roleString = 'Khách hàng';
    } else if (role === 'Business') {
      roleString = 'Doanh nghiệp';
    } else if (role === 'Owner') {
      roleString = 'Chủ xe';
    }

    return (<p>{roleString}</p>);
  }

  return (
    (userDecode
      &&
      <div className="d-flex justify-content-center flex-column profile-container gap-3">
        <div className='title'>Trang cá nhân</div>
        <div className='user-profile d-flex gap-5 '>
          <div className='left d-flex flex-column gap-3'>
            <div className='avatar-user'>
              <img src={userDecode.imgURL || img_tmp}></img>
            </div>
            <div className="another-info d-flex flex-column gap-4">
              <DrivingLicense />
              {/* <div className="citizen-identification">
                <div className='header'>
                  <div className="text">CCCD</div>
                  <div className='line'></div>
                </div>
                <div className="content d-flex justify-content-center">
                  <div className='verified-box d-flex gap-1'>
                    <p className='mb-0'>Đã xác thực</p>
                    <i className="ri-checkbox-circle-fill"></i>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className='right d-flex flex-column'>
            <div className="header d-flex flex-column">
              <div className='top-header d-flex justify-content-between align-items-center gap-3'>
                <div className="left-top-header d-flex justify-content-center align-items-center gap-3">
                  <p className='user-name'>{userDecode.firstName || ''}</p>
                  <div className='user-location d-flex'>
                    <i className="ri-map-pin-line"></i>
                    <p className=''>{userDecode.address || ''}</p>
                  </div>
                </div>

                <div className='edit-profile d-flex gap-2'>
                  <i className="ri-edit-line"></i>
                  <p>Sửa trang cá nhân</p>
                </div>
              </div>

              <div className='role-name'>
                <RenderRole role={userDecode.role_id.roleName} />
              </div>

              <div className='rate-section'>
                <p className='title-rate'>Lượt đánh giá</p>
                <div className='d-flex rate-data'>
                  {userDecode.rate === '0'
                    ? <p className='h6'><em>Chưa có lượt đánh giá nào</em></p>
                    :
                    <>
                      <p className='score'>{userDecode.rate.toFixed(1)}</p>
                      <StarRating rate={userDecode.rate} />
                    </>
                  }
                </div>
              </div>
            </div>

            <div className="main d-flex flex-column">
              <div className="main-top d-flex gap-4">
                <NavLink to="/my_account" className='about d-flex gap-2 active'>
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
                      <p>{userDecode.phone || ''}</p>
                      <p>{userDecode.address_detail || ''}</p>
                      <p>{userDecode.email || ''}</p>
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
                      <p>{userDecode.lastName || ''}</p>
                      <p>{userDecode.firstName || ''}</p>
                      <p>{userDecode.dob || 'rỗng'}</p>
                      <p>{userDecode.gender === 'Male' ? 'Nam' : (userDecode.gender === 'Female' ? 'Nữ' : '')}</p>
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