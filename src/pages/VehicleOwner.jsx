import React, { useEffect } from 'react'
import { Container } from "reactstrap";
import RegisterForm from "../components/UI/CarOwnerRegisterForm"
import "../styles/vehicle-owner.css"


const VehicleOwner = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="vehicle_owner">
      <div className="vehicle_owner_header">
        <div className="vehicle_owner_header_content">
          <p className="content_title">KHÔNG QUÁ KHÓ ĐỂ</p>
          <p className="content_title">TĂNG THÊM THU NHẬP CỦA BẠN</p>
          <p className="content_title">VỚI DRIVECONN</p>
          <br /><br /><br /><br />
          <p className="content_text">Hotline: 1900100x</p>
          <p className="content_text">Hoặc để lại thông tin liên lạc</p>
          <p className="content_text">ở form dưới này nhé</p>
        </div>
      </div>
      <Container>
        <div className="content_title">
          <h1>DriveConn Host</h1>
          <p>Chia sẻ thêm một vài chi tiết và tiến một bước gần hơn đến KIẾM TIỀN. Nhóm của chúng tôi sẽ liên hệ với bạn để hướng dẫn bạn thông qua chương trình
          </p>
        </div>
        <RegisterForm />
      </Container>
    </div>

  )
}

export default VehicleOwner