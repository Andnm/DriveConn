import React, { useState, useContext } from 'react'
import './style.css'
import { AuthContext } from '../../../context/authContext';
import { getDrivingLicense } from '../../../api/drivingLicense';
import { useEffect } from 'react';
import UpdateDrivingLicense from '../../Profile/UpdateDrivingLicense/UpdateDrivingLicense';

const DrivingLicense = () => {
    const { currentToken, userDecode } = useContext(AuthContext);
    const [license, setLicense] = useState()

    const [isOpenModalAddGplx, setIsOpenModalAddGplx] = useState(false)

    const handleGetDrivingLicense = async () => {
        try {
            const response = await getDrivingLicense(currentToken);
            if (response) {
                setLicense(response)
                console.log(license)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        handleGetDrivingLicense()
    }, [])

    return (
        <div className="driving-license">
            <div className='header'>
                <div className="text">GPLX</div>
                <div className='line'></div>
            </div>

            <div className='main d-flex flex-column gap-3'>
                <div className='driving-license-motorbike d-flex justify-content-center align-items-center gap-1'>
                    <p>A1</p>
                    {license
                        ?
                        <div className="content d-flex justify-content-center">

                            {!license?.isConfirmed === true
                                ?
                                <div className='unverified-box d-flex gap-1'>
                                    <p className='mb-0'>Chưa xác thực</p>
                                </div>
                                :
                                <div className='verified-box d-flex gap-1'>
                                    <p className='mb-0'>Đã xác thực</p>
                                </div>
                            }
                        </div>
                        :
                        <div className='add-something d-flex justify-content-center gap-2' onClick={() => setIsOpenModalAddGplx(true)}>
                            <p className='mb-0'>Thêm GPLX</p>
                            <i className="ri-edit-line"></i>
                        </div>
                    }
                </div>

                <div className='driving-license-car d-flex justify-content-center align-items-center gap-1'>
                    <p>B2</p>
                    {license
                        ?
                        <div className="content d-flex justify-content-center">

                            {license?.isConfirmed === true
                                ?
                                <div className='unverified-box d-flex gap-1'>
                                    <p className='mb-0'>Chưa xác thực</p>
                                </div>
                                :
                                <div className='verified-box d-flex gap-1'>
                                    <p className='mb-0'>Đã xác thực</p>
                                </div>
                            }
                        </div>
                        :
                        <div className='add-something d-flex justify-content-center gap-2' onClick={() => setIsOpenModalAddGplx(true)}>
                            <p className='mb-0'>Thêm GPLX</p>
                            <i className="ri-edit-line"></i>
                        </div>
                    }
                </div>
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