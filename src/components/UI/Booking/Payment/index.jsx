import React from 'react'
import './style.css'

const Payment = () => {
  return (
    <div className='qr-code'>
      <img src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.15752-9/351763320_263732523007111_2493281988088569250_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=qFxGje5Mfj0AX_daLrv&_nc_ht=scontent.fsgn3-1.fna&oh=03_AdToMnVK-Tq2CjVFX-GKJAeu8fYmhBmln3aYiWbw6WIkZw&oe=64BA3C73"></img>

      <div className='name-qr d-flex flex-column justify-content-center align-items-center'>
        <p>Tên tài khoản: </p>
        <p>Huỳnh Trùng Dương</p>
      </div>

      <div className='content-qr d-flex flex-column justify-content-center align-items-center'>
        <p>Nội dung chuyển khoản: </p>
        <p>Họ và tên_Biển số xe</p>
      </div>
    </div>
  )
}

export default Payment