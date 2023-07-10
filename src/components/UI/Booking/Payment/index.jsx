import React from 'react'
import './style.css'
import qr_code from '../../../../assets/all-images/qr_code_Cong.jpg'

const Payment = () => {
  return (
    <div className='qr-code' >
      <img src={qr_code}></img>

      {/* <div className='name-qr d-flex flex-column justify-content-center align-items-center'>
        <p>Tên tài khoản: </p>
        <p>Huỳnh Trùng Dương</p>
      </div> */}

      <div className='content-qr d-flex flex-column justify-content-center align-items-center'>
        <p>Nội dung chuyển khoản: </p>
        <p>Họ và tên_Biển số xe</p>
      </div>
    </div>
  )
}

export default Payment