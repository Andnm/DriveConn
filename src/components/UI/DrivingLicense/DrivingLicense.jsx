import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/authContext';
import { getDrivingLicense } from '../../../api/drivingLicense';
import './style.css';
import UpdateDrivingLicense from '../../Profile/UpdateDrivingLicense/UpdateDrivingLicense';

const DrivingLicense = () => {
    const { currentToken, userDecode } = useContext(AuthContext);
    const [licenseList, setLicenseList] = useState([])

    const [isOpenModalAddGplx, setIsOpenModalAddGplx] = useState(false)


    const handleGetDrivingLicense = async () => {
        const response = await getDrivingLicense(currentToken);
        if (response) {
            setLicenseList(response)
        }
    }

    useEffect(() => {
        handleGetDrivingLicense()
    }, [])

    const vehicleRow = (type, vehicleClass) => {
        const vehicle = licenseList?.find(item => item.licenseClass.includes(vehicleClass))
        if (vehicle) {
            return (
                <div className='driving-license-box d-flex justify-content-around align-items-center gap-1'>
                    <p>{vehicle.licenseClass}</p>
                    <div className="content d-flex justify-content-center">
                        {vehicle.isConfirmed
                            ?
                            <div className='verified-box d-flex gap-1'>
                                <p className='mb-0'>Đã xác thực</p>
                            </div>
                            :
                            <div className='unverified-box d-flex gap-1'>
                                <p className='mb-0'>Chưa xác thực</p>
                            </div>
                        }
                    </div>
                </div>
            );
        }
        return (
            <div className='driving-license-box d-flex justify-content-around align-items-center gap-1'>
                <p className='w-25'>{type}: </p>
                <div className='add-something d-flex justify-content-center gap-2' onClick={() => setIsOpenModalAddGplx(true)}>
                    <p className='mb-0'>Thêm GPLX</p>
                    <i className="ri-edit-line"></i>
                </div>
            </div>
        )
    }

    return (
        <div className="driving-license">
            <div className='header'>
                <div className="text">GPLX</div>
                <div className='line'></div>
            </div>

            <div className='main d-flex flex-column gap-3'>
                {vehicleRow('Xe máy', 'A')}
                {vehicleRow('Ô tô', 'B')}
            </div>

            {isOpenModalAddGplx
                &&
                <UpdateDrivingLicense   
                    currentToken={currentToken}
                    open={isOpenModalAddGplx}
                    onClose={() => setIsOpenModalAddGplx(false)}
                />
            }
        </div>
    )
}

export default DrivingLicense