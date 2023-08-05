import React from 'react';
import { formatPriceNumber } from '../../../utils/utils'

const VehicleInfo = (props) => {
    const { autoMaker_id, category_id, fuel, model_id, vehicle_id } = props.data;

    return (
        <div className='booking-detail-container d-flex flex-column gap-4'>
            <div className='img-background'>
                <img src={vehicle_id?.images[0]} alt='Vehicle' />
            </div>

            <div className='time'>
                <h4>Vehicle Information</h4>
                <div className='time-detail d-flex align-items-start gap-5'>
                    <div className="d-flex flex-column">
                        <p>LicensePlate:</p>
                        <p>Automaker: </p>
                        <p>Model</p>
                        <p>Category:</p>
                        <p>Fuel:</p>
                        <p>Location:</p>
                        <p>Description:</p>
                    </div>
                    <div className="d-flex flex-column">
                        <p>{vehicle_id.licensePlate}</p>
                        <p>{autoMaker_id.name}</p>
                        <p>{category_id.name}</p>
                        <p>{model_id.name}</p>
                        <p>{fuel}</p>
                        <p>{vehicle_id.location}</p>
                        <p>{vehicle_id.description}</p>
                    </div>
                </div>

                <div className='time-detail d-flex align-items-start justify-content-center gap-3 mt-3'>
                    <div className="d-flex flex-column">
                        <p style={{ fontWeight: 'bold', fontSize: '25px' }}>Price:</p>
                    </div>
                    <div className="d-flex flex-column">
                        <p style={{ fontWeight: 'bold', fontSize: '25px' }}>{formatPriceNumber(vehicle_id.price)} VNĐ</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VehicleInfo;
