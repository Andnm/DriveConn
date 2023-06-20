import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/authContext';
import { getDrivingLicense } from '../../../api/drivingLicense';
import './style.css';
import UpdateDrivingLicense from '../../Profile/UpdateDrivingLicense/UpdateDrivingLicense';
import TextLoading from '../../SkeletonLoading/TextLoading';

const DrivingLicense = () => {
    const { currentToken, userDecode } = useContext(AuthContext);
    const [licenseList, setLicenseList] = useState([])

    const [isOpenModalAddGplx, setIsOpenModalAddGplx] = useState(false)
    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false)

    const handleGetDrivingLicense = async () => {
        setIsLoadingSkeleton(true)
        const response = await getDrivingLicense(currentToken, userDecode._id);
        if (response) {
            setLicenseList(response)
            setIsLoadingSkeleton(false)
        }
    }

    useEffect(() => {
        handleGetDrivingLicense()
    }, [])

    const vehicleRow = (type, vehicleClass) => {
        const vehicle = licenseList?.find(item => item.licenseClass.includes(vehicleClass))
        if (vehicle) {
            return (
                <div className='driving-license-box d-flex justify-content-around align-items-center flex-column gap-1'>
                    <div className='d-flex justify-content-around align-items-center w-80'>
                        <p>{vehicle.licenseClass}:</p>
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
                    <div className='update-container-box d-flex justify-content-between align-items-center gap-3' onClick={() => setIsOpenModalAddGplx(true)}>
                        <p>{vehicle.licenseNo}</p>
                        <i className="ri-edit-line"></i>
                    </div>
                </div>
            );
        }
        return (
            <div className='driving-license-box add-something d-flex justify-content-around align-items-center gap-1'>
                <p>{type}: </p>
                <div className='d-flex justify-content-center w-80 gap-2' onClick={() => setIsOpenModalAddGplx(true)}>
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

            <div className='main d-flex flex-column gap-3 mt-3'>
                {isLoadingSkeleton ? <TextLoading /> : vehicleRow('Xe máy', 'A')}
                {isLoadingSkeleton ? <TextLoading /> : <div className='separation-line'></div>}
                {isLoadingSkeleton ? <TextLoading /> : vehicleRow('Ô tô', 'B')}
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