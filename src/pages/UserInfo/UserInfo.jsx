import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import { toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../config/configFirebase';
import { updateProfileImage, updateProfileUser } from '../../api/user';
import { formatDate, generateFileNameImage } from '../../utils/utils';

import './style.css';
import img_tmp from '../../assets/all-images/avatar.jpg';
import toastOption from '../../config/toast';
import DrivingLicense from '../../components/UI/DrivingLicense/DrivingLicense';
import StarRating from '../../components/UI/StarRating/StarRating';
import ModalBox from '../../components/Modal/ModalBox';
import LoadingCar from '../../components/LoadingCar/LoadingCar';
import InputBox from '../../components/InputBox/InputBox';

const UserInfo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { currentToken, userDecode, setUserDecode } = useContext(AuthContext);
  const [urlAvatar, setUrlAvatar] = useState(userDecode.imgURL)

  //variable state support UPLOAD IMAGE function
  const [openUploadAvatar, setOpenUploadAvatar] = useState(false)
  const [isOpenConfirmCancelAction, setIsOpenConfirmCancelAction] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [preImgLoad, setPreImgLoad] = useState('')
  const [imageLoad, setImageLoad] = useState('')

  //variable state support UPLOAD PROFILE function
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false)
  const [newDataProfile, setNewDataProfile] = useState({
    lastName: userDecode.lastName || "",
    firstName: userDecode.firstName || "",
    gender: userDecode.gender || "",
    dob: formatDate(userDecode.dob) || "",
    address: userDecode.address || "",
    address_details: userDecode.address_details || "",
    phone: userDecode.phone || ""
  })
  const [isProfileChanged, setIsProfileChanged] = useState(false);

  //
  if (!userDecode) {
    return <Navigate to="/home" />;
  }

  const RenderRole = ({ role }) => {
    const roles = {
      Customer: 'Khách hàng',
      Business: 'Doanh nghiệp',
      Owner: 'Chủ xe'
    };

    return <p>{roles[role] || ''}</p>;
  };

  //-------handle upload image
  const actionCloseUploadAvatar = () => {
    if (preImgLoad) {
      setIsOpenConfirmCancelAction(true)
    } else {
      setPreImgLoad('')
      setOpenUploadAvatar(false)
    }
  }

  const handleSaveUpdateAvatar = async () => {
    setIsLoading(true)
    handleSubmit()
  }

  const handleSubmit = () => {
    const fileName = generateFileNameImage();
    const imageRef = ref(storage, fileName);
    uploadBytes(imageRef, imageLoad)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) => {
            setIsLoading(true)
            const updateImageResponse = await updateProfileImage(currentToken, url);

            if (updateImageResponse.status === 200) {
              setUrlAvatar(url);
              setUserDecode({ ...userDecode, imgURL: url })
              setOpenUploadAvatar(false)
              toast.success('Cập nhập ảnh đại diện thành công!', toastOption)
              setPreImgLoad(null)
            } else {
              setOpenUploadAvatar(false)
              toast.error('Cập nhập ảnh đại diện thất bại. Vui lòng thử lại sau!', toastOption)
            }
            setPreImgLoad(null);
            setIsLoading(false)
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });

      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleCancelConfirmModal = () => {
    setPreImgLoad('')
    setOpenUploadAvatar(false)
    setIsOpenConfirmCancelAction(false)
    setOpenUpdateProfile(false)
    setIsProfileChanged(false)
    setNewDataProfile({
      lastName: userDecode.lastName || "",
      firstName: userDecode.firstName || "",
      gender: userDecode.gender || "",
      dob: formatDate(userDecode?.dob) || "",
      address: userDecode.address || "",
      address_details: userDecode.address_details || "",
      phone: userDecode.phone || ""
    })
  }

  const handleRemoveImage = () => {
    setPreImgLoad('')
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setImageLoad(event.target.files[0])

    reader.onload = (e) => {
      setPreImgLoad(e.target.result);
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  };

  //-----------Update profile---------
  const handleUpdateProfile = () => {
    setOpenUpdateProfile(true)
  }

  const handleSaveUpdateProfile = async () => {
    setIsLoading(true)
    const response = await updateProfileUser(currentToken, userDecode._id, newDataProfile)

    if (response.status === 200) {
      toast.success('Cập nhập hồ sơ thành công!', toastOption)
      setUserDecode({ ...userDecode, ...newDataProfile })

      setNewDataProfile({ ...newDataProfile })
    } else {
      toast.error('Cập nhập hồ sơ thất bại!', toastOption)
    }

    setIsProfileChanged(false)
    setOpenUpdateProfile(false)
    setIsLoading(false)
  }

  const actionCloseUploadProfile = () => {
    if (isProfileChanged) {
      setIsOpenConfirmCancelAction(true)
    } else {
      setOpenUpdateProfile(false)
    }
  }

  return (
    (userDecode
      &&
      <div className="d-flex justify-content-center flex-column profile-container gap-3">
        <div className='title'>Trang cá nhân</div>
        <div className='user-profile d-flex gap-5 '>
          <div className='left d-flex flex-column gap-3'>
            <div className='avatar-user'>
              <img src={urlAvatar ? urlAvatar : img_tmp} alt="Avatar"></img>

              <div className="camera-wrapper d-flex justify-content-center align-items-center"
                onClick={() => setOpenUploadAvatar(true)}
              >
                <i className="ri-camera-fill"></i>
              </div>

              {openUploadAvatar &&
                <ModalBox
                  open={openUploadAvatar}
                  onClose={actionCloseUploadAvatar}
                  centerAction={true}
                  title={'Cập nhập ảnh đại diện'}
                  body={
                    <>
                      <div className='upload-image-box'>
                        <div className='d-flex justify-content-center align-items-center flex-column'>
                          <div className="custom-file-upload">
                            {!preImgLoad
                              ?
                              <label htmlFor="file">
                                <div className="icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                                </div>
                                <div className="text">
                                  <span>Bấm vào đây để đăng ảnh</span>
                                </div>
                                <input type="file" id="file" onChange={handleImageChange} />
                              </label>
                              :
                              <div className='img-upload'>
                                <div className='remove-img d-flex justify-content-center align-items-center' onClick={handleRemoveImage}>X</div>
                                <img src={preImgLoad} alt="picture"></img>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  btnActionNo={'Hủy'}
                  btnActionYes={'Lưu'}
                  eventToContinue={handleSaveUpdateAvatar}
                />
              }

              {isOpenConfirmCancelAction &&
                <ModalBox
                  open={isOpenConfirmCancelAction}
                  onClose={() => { setIsOpenConfirmCancelAction(false) }}
                  centerAction={true}
                  styleModal={'cancel-modal-update-avatar'}
                  title={'Bỏ thay đổi'}
                  body={'Bạn có chắc chắn muốn bỏ các thay đổi không?'}
                  btnActionNo={'Hủy'}
                  btnActionYes={'Bỏ'}
                  eventToContinue={handleCancelConfirmModal}
                />
              }
            </div>

            {isLoading && <LoadingCar background={true} />}

            <div className="another-info d-flex flex-column gap-4">
              <DrivingLicense />
            </div>
          </div>

          <div className='right d-flex flex-column'>
            <div className="header d-flex flex-column">
              <div className='top-header d-flex justify-content-between align-items-center gap-3'>
                <div className="left-top-header d-flex justify-content-center align-items-center gap-3">
                  <p className='user-name'>{userDecode?.firstName !== ' ' && userDecode?.firstName ? userDecode?.firstName : '(Chưa cập nhập thông tin)'}</p>
                  <div className='user-location d-flex'>
                    <i className="ri-map-pin-line"></i>
                    <p className=''>{userDecode?.address !== ' ' && userDecode?.address ? userDecode?.address : '(Chưa cập nhập thông tin)'}</p>
                  </div>
                </div>

                <div className='edit-profile d-flex gap-2' onClick={handleUpdateProfile}>
                  <i className="ri-edit-line"></i>
                  <p>Sửa trang cá nhân</p>
                </div>

                {openUpdateProfile
                  &&
                  <ModalBox
                    open={openUpdateProfile}
                    onClose={actionCloseUploadProfile}
                    centerAction={true}
                    title={'Cập nhập hồ sơ cá nhân'}
                    body={
                      <div className='d-flex flex-wrap'>
                        <InputBox
                          styleContainer={'w-50 d-flex flex-column justify-content-center align-items-center'}
                          type={'text'}
                          value={newDataProfile.lastName}
                          onChangeFunction={(e) => {
                            setNewDataProfile((prevData) => ({
                              ...prevData,
                              lastName: e.target.value
                            }));
                            setIsProfileChanged(true)
                          }}
                          label={'Họ'}
                        />

                        <InputBox
                          styleContainer={'w-50 d-flex flex-column justify-content-center align-items-center'}
                          type={'text'}
                          value={newDataProfile.firstName}
                          onChangeFunction={(e) => {
                            setNewDataProfile((prevData) => ({
                              ...prevData,
                              firstName: e.target.value
                            }));
                            setIsProfileChanged(true)
                          }}
                          label={'Tên'}
                        />

                        <InputBox
                          styleContainer={'w-50 d-flex flex-column justify-content-center align-items-center'}
                          type={'text'}
                          value={newDataProfile.gender}
                          onChangeFunction={(e) => {
                            setNewDataProfile((prevData) => ({
                              ...prevData,
                              gender: e.target.value
                            }));
                            setIsProfileChanged(true)
                          }}
                          label={'Giới tính'}
                        />

                        <InputBox
                          styleContainer={'w-50 d-flex flex-column justify-content-center align-items-center'}
                          type={'text'}
                          value={newDataProfile.dob}
                          onChangeFunction={(e) => {
                            setNewDataProfile((prevData) => ({
                              ...prevData,
                              dob: e.target.value
                            }));
                            setIsProfileChanged(true)
                          }}
                          label={'Ngày sinh'}
                        />

                        <InputBox
                          styleContainer={'w-50 d-flex flex-column justify-content-center align-items-center'}
                          type={'text'}
                          value={newDataProfile.address}
                          onChangeFunction={(e) => {
                            setNewDataProfile((prevData) => ({
                              ...prevData,
                              address: e.target.value
                            }));
                            setIsProfileChanged(true)
                          }}
                          label={'Địa chỉ'}
                        />

                        <InputBox
                          styleContainer={'w-50 d-flex flex-column justify-content-center align-items-center'}
                          type={'text'}
                          value={newDataProfile.address_details}
                          onChangeFunction={(e) => {
                            setNewDataProfile((prevData) => ({
                              ...prevData,
                              address_details: e.target.value
                            }));
                            setIsProfileChanged(true)
                          }}
                          label={'Địa chỉ chi tiết'}
                        />

                        <InputBox
                          styleContainer={'w-50 d-flex flex-column justify-content-center align-items-center'}
                          type={'text'}
                          value={newDataProfile.phone}
                          onChangeFunction={(e) => {
                            setNewDataProfile((prevData) => ({
                              ...prevData,
                              phone: e.target.value
                            }));
                            setIsProfileChanged(true)
                          }}
                          label={'Số điện thoại'}
                        />
                      </div>
                    }
                    btnActionNo={'Hủy'}
                    btnActionYes={'Xác nhận'}
                    eventToContinue={handleSaveUpdateProfile}
                    isChanged={isProfileChanged}
                  />
                }
              </div>

              <div className='role-name'>
                <RenderRole role={userDecode.role_id?.roleName} />
              </div>

              <div className='d-flex gap-5 align-items-center'>
                <div className='rate-section'>
                  <p className='title-rate'>Lượt đánh giá</p>
                  <div className='d-flex rate-data'>
                    {userDecode.rate === 0
                      ? <p className='h6'><em>Chưa có lượt đánh giá nào</em></p>
                      :
                      <>
                        <p className='score'>{userDecode.rate?.toFixed(1)}</p>
                        <StarRating rate={Math.floor(userDecode?.rate)} />
                      </>
                    }
                  </div>
                </div>

                <div className='separation-vertical-line'></div>

                <div className='rate-section'>
                  <p className='title-rate'>{userDecode.role_id?.roleName === 'Customer' ? 'Số chuyến đã đi' : 'Số chuyến đã được đặt'}</p>
                  <div className='d-flex rate-data'>
                    {userDecode.booked ? userDecode.booked : 0} chuyến
                  </div>
                </div>

              </div>

            </div>

            <div className="main d-flex flex-column">
              <div className="main-top d-flex gap-4">
                <NavLink to="/my_account" className='about d-flex gap-2 active'>
                  <i className="ri-account-box-fill"></i>
                  <p>Bản thân</p>
                </NavLink>

                <NavLink to="/#" className='timeline d-flex gap-2'>
                  <i className="ri-time-fill"></i>
                  <p>Mốc thời gian</p>
                </NavLink>
              </div>

              <div className="main-info d-flex flex-column justify-content-around">
                <div className="contact-info">
                  <p className='text-header'>Thông tin liên lạc</p>
                  <div className="content d-flex ">
                    <div className="label-info d-flex flex-column">
                      <p>Số điện thoại: </p>
                      <p>Địa chỉ cụ thể: </p>
                      <p>Email: </p>
                    </div>
                    <div className="input-info d-flex flex-column">
                      <p>{userDecode?.phone !== " " && userDecode?.phone ? userDecode?.phone : '(Chưa cập nhập thông tin)'}</p>
                      <p>{userDecode?.address_details !== " " && userDecode?.address_details ? userDecode?.address_details : '(Chưa cập nhập thông tin)'}</p>
                      <p>{userDecode?.email !== " " && userDecode?.email ? userDecode?.email : '(Chưa cập nhập thông tin)'}</p>
                    </div>
                  </div>
                </div>

                <div className="basic-info">
                  <p className='text-header'>Thông tin cơ bản</p>
                  <div className="content d-flex">
                    <div className="label-info d-flex flex-column">
                      <p>Họ: </p>
                      <p>Tên: </p>
                      <p>Ngày sinh: </p>
                      <p>Giới tính: </p>
                    </div>
                    <div className="input-info d-flex flex-column">
                      <p>{userDecode?.lastName !== " " && userDecode?.lastName ? userDecode?.lastName : '(Chưa cập nhập thông tin)'}</p>
                      <p>{userDecode?.firstName !== " " && userDecode?.firstName ? userDecode?.firstName : '(Chưa cập nhập thông tin)'}</p>
                      <p>{userDecode?.dob !== " " && userDecode?.dob ? formatDate(userDecode?.dob)  : '(Chưa cập nhập thông tin)'}</p>
                      <p>{userDecode?.gender === 'Male' ? 'Nam' : (userDecode?.gender === 'Female' ? 'Nữ' : '(Chưa cập nhập thông tin)')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)
  )
}

export default UserInfo