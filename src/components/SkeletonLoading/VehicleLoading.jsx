import React from 'react'
import { Col } from 'reactstrap'
import './style.css'

const VehicleLoading = () => {
    return (
        <Col lg="3" md="3" sm="6" className="mb-5 vehicle-item-skeleton">
            <div className="card">
                <div className="card-details">
                    <div className="car__img skeleton">
                    </div>
                    <div className="card__body gap-2">
                        <div className="location skeleton">
                        </div>
                        <div className="location skeleton">
                        </div>
                        <div className="location skeleton">
                        </div>
                        <div className="location skeleton">
                        </div>
                    </div>

                    <div className="card__footer skeleton mt-5">
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default VehicleLoading