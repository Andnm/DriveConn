import React, { useState } from 'react'
import './styles/maintenance.css'
import image_svg from '../assets/Under-construction-cuate.svg'
import logo_brand from '../assets/all-images/logo/Final_DriveConn_logo.png'
import logo_contact from '../assets/phone.png'

const Maintenance = () => {

    const [showEmail, setShowEmail] = useState(false);

    const handleClick = () => {
        setShowEmail(true);
    };

    return (
        <div className='background-maintenance'>
            <div className='logo another-css-logo'>
                <img src={logo_brand} alt="logo"></img>
            </div>
            <div className='main-maintenance'>
                <div className="content-maintenance">
                    <h3 className='title-maintenance'>Trang web đang sửa chữa</h3>
                    <p>Driveconn xin lỗi vì sự bất tiện này, nhưng chúng tôi đang thực hiện một số bảo trì để mang lại trải nghiệm tốt nhất cho khách hàng.</p>
                </div>
                <div className='img-svg'>
                    <img src={image_svg} alt="SVG image"></img>
                </div>
            </div>

            <div className='contact-maintenance'>
                <h5>Thông tin liên lạc: </h5>
                <div className="social-links">
                    <a href="https://www.facebook.com/DriveConn" target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                            <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                        </svg>
                    </a>

                    <div className='logo-email'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                            <path fill="#e0e0e0" d="M5.5,40.5h37c1.933,0,3.5-1.567,3.5-3.5V11c0-1.933-1.567-3.5-3.5-3.5h-37C3.567,7.5,2,9.067,2,11v26C2,38.933,3.567,40.5,5.5,40.5z"></path><path fill="#d9d9d9" d="M26,40.5h16.5c1.933,0,3.5-1.567,3.5-3.5V11c0-1.933-1.567-3.5-3.5-3.5h-37C3.567,7.5,2,9.067,2,11L26,40.5z"></path><path fill="#eee" d="M6.745,40.5H42.5c1.933,0,3.5-1.567,3.5-3.5V11.5L6.745,40.5z"></path><path fill="#e0e0e0" d="M25.745,40.5H42.5c1.933,0,3.5-1.567,3.5-3.5V11.5L18.771,31.616L25.745,40.5z"></path><path fill="#ca3737" d="M42.5,9.5h-37C3.567,9.5,2,9.067,2,11v26c0,1.933,1.567,3.5,3.5,3.5H7V12h34v28.5h1.5c1.933,0,3.5-1.567,3.5-3.5V11C46,9.067,44.433,9.5,42.5,9.5z"></path><path fill="#f5f5f5" d="M42.5,7.5H24H5.5C3.567,7.5,2,9.036,2,11c0,1.206,1.518,2.258,1.518,2.258L24,27.756l20.482-14.497c0,0,1.518-1.053,1.518-2.258C46,9.036,44.433,7.5,42.5,7.5z"></path><path fill="#e84f4b" d="M43.246,7.582L24,21L4.754,7.582C3.18,7.919,2,9.297,2,11c0,1.206,1.518,2.258,1.518,2.258L24,27.756l20.482-14.497c0,0,1.518-1.053,1.518-2.258C46,9.297,44.82,7.919,43.246,7.582z"></path>
                        </svg>
                        <div className="emailContainer d-flex justify-content-center align-items-center">
                            <p className="hidden-text">infor.driveconn@gmail.com</p>
                        </div>
                    </div>

                    {/* <div >
                        <img src={logo_contact} className="logo-phone" alt="phone" />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Maintenance