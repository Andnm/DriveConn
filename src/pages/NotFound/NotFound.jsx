import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const NotFound = () => {
    return (
        <Container>
            <section class="page_404">
                <div class="container d-flex justify-content-center gap-5">
                    <div class="">
                        <div class="four_zero_four_bg">
                        </div>
                    </div>

                    <div class="d-flex justify-content-center flex-column">
                        <h1 class="text-center">404</h1>
                        <div class="contant_box_404 d-flex justify-content-center flex-column align-items-center">
                            <h3 class="h2">
                                Có vẻ như bạn đang bị lạc?
                            </h3>

                            <p>Chúng tôi không thể thấy trang bạn đang tìm. Vui lòng thử lại sau!</p>

                            <Link to="/home" class="link_404">Quay lại tranh chủ</Link>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default NotFound