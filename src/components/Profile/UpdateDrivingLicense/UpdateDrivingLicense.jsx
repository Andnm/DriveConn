import React, { useState } from 'react'
import './style.css'
import InputBox from '../../InputBox/InputBox'
import ModalBox from '../../Modal/ModalBox'
import { registerDrivingLicense } from '../../../api/drivingLicense'
import { toast } from 'react-toastify';
import toastOption from '../../../config/toast'
import { storage } from "../../../config/configFirebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LoadingCar from '../../../components/LoadingCar/LoadingCar'

const UpdateDrivingLicense = ({ currentToken, open, onClose }) => {
    const [licenseClass, setLicenseClass] = useState('')
    const [licenseNo, setLicenseNo] = useState('')
    const [expireDate, setExpireDate] = useState('')
    const [urlImage, setUrlImage] = useState('')

    const [preImgDrivingLicense, setPreImgDrivingLicense] = useState('')
    const [imgDrivingLicense, setImgDrivingLicense] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [errorLicenseNo, setErrorLicenseNo] = useState('')
    const [errorLicenseClass, setErrorLicenseClass] = useState('')
    const [errorExpireDate, setErrorExpireDate] = useState('')


    const handleRegisterDrivingLicense = async () => {
        handleSubmit()
        if (urlImage) {
            const response = await registerDrivingLicense(currentToken, licenseNo, licenseClass, expireDate, urlImage);
            console.log(response)
            if (response != '') {
                onClose()
                toast.success('Cập nhập GPLX thành công. Đang được xác minh!', toastOption)
            } else {
                onClose()
                toast.error('Cập nhập GPLX thất bại. Vui lòng thử lại!', toastOption)
            }
        }
    }

    const handleSubmit = () => {
        const fileName = generateFileName();
        const imageRef = ref(storage, fileName);
        uploadBytes(imageRef, imgDrivingLicense)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        setUrlImage(url);
                    })
                    .catch((error) => {
                        console.log(error.message, "error getting the image url");
                    });
                setImgDrivingLicense(null);
                setPreImgDrivingLicense(null)
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const generateFileName = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");

        const fileName = `image_${hours}${minutes}${seconds}_${day}${month}${year}`;
        return fileName;
    };

    const handleRemoveImage = () => {
        setImgDrivingLicense('')
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        setImgDrivingLicense(event.target.files[0])

        reader.onload = (e) => {
            setPreImgDrivingLicense(e.target.result);
        }

        if (file) {
            reader.readAsDataURL(file)
        }
    };

    return (
        <ModalBox
            open={open}
            onClose={onClose}
            title={'Cập nhập giấy phép lái xe'}
            body={
                <div className='update-driving-license-container'>
                    <InputBox
                        type={'text'}
                        value={licenseClass}
                        onChangeFunction={(e) => setLicenseClass(e.target.value)}
                        label={'Loại GPLX'}
                        error={errorLicenseClass}
                    />

                    <InputBox
                        type={'text'}
                        value={licenseNo}
                        onChangeFunction={(e) => setLicenseNo(e.target.value)}
                        label={'Số GPLX'}
                        error={errorLicenseNo}
                    />

                    <InputBox
                        type={'date'}
                        value={expireDate}
                        onChangeFunction={(e) => setExpireDate(e.target.value)}
                        label={'Ngày hết hạn'}
                        error={errorExpireDate}
                    />

                    <div className='upload-image-box'>
                        <p>Ảnh giấy phép lái xe</p>
                        <div className='d-flex justify-content-center align-items-center flex-column'>
                            <label className="custom-file-upload" htmlFor="file">
                                {preImgDrivingLicense
                                    ?
                                    <div className='img-upload'>
                                        <div className='remove-img d-flex justify-content-center align-items-center' onClick={handleRemoveImage}>X</div>
                                        <img src={preImgDrivingLicense} alt="picture"></img>
                                    </div>
                                    :
                                    <>
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                                        </div>
                                        <div className="text">
                                            <span>Bấm vào đây để đăng ảnh</span>
                                        </div>
                                    </>
                                }
                                <input type="file" id="file" onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>
                    {isLoading && <LoadingCar />}
                </div>
            }
            btnActionYes={'Xác nhận'}
            eventToContinue={handleRegisterDrivingLicense}
        />
    )
}

export default UpdateDrivingLicense;