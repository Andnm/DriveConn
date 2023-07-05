import React from 'react'
import './styles/maintenance.css'
import image_svg from '../assets/Under-construction-cuate.svg'
import logo_brand from '../assets/all-images/logo/Final_DriveConn_logo.png'

const WarningSmallScreen = () => {
    return (
        <div className='background-maintenance'>
            <div className='logo another-css-logo'>
                <img src={logo_brand} alt="logo"></img>
            </div>
            <div className='main-maintenance'>
                <div className="content-maintenance">
                    <h3 className='title-maintenance'>Trang web chưa hỗ trợ</h3>
                    <p>
                        Driveconn xin lỗi vì sự bất tiện này,
                        nhưng hiện tại trang web chúng tôi chỉ mới hỗ trợ trên
                        các thiết bị có màn hình lớn như laptop, macbook trở lên.
                    </p>
                    <p>Vui lòng truy cập vào những thiết bị ấy để có trải nghiệm tốt nhất. Driveconn xin chân thành cảm ơn!</p>
                </div>
                <div className='img-svg'>
                    <img src={image_svg} alt="SVG image"></img>
                </div>
            </div>
        </div>
    )
}

export default WarningSmallScreen