import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import LoadingCar from '../../components/LoadingCar/LoadingCar'

const NotFound = () => {
    return (
        <Container>
            {<LoadingCar background={true}/>}
            <section className="page_404">
                <div className="container d-flex justify-content-center gap-5">
                    <div className="">
                        <div className="four_zero_four_bg">
                        </div>
                    </div>

                    <div className="d-flex justify-content-center flex-column">
                        <h1 className="text-center">404</h1>
                        <div className="contant_box_404 d-flex justify-content-center flex-column align-items-center">
                            <h3 className="h2">
                                Có vẻ như bạn đang bị lạc?
                            </h3>

                            <p>Chúng tôi không thể thấy trang bạn đang tìm. Vui lòng thử lại sau!</p>

                            <Link to="/home" className="link_404">Quay lại tranh chủ</Link>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default NotFound