import React, { useContext, useEffect, useState, useRef } from 'react'
import './styles/profile.css'
import { AuthContext } from "../context/authContext";
import logo from '../assets/all-images/avatar.jpg'
import axios from 'axios'
import API_URL from '../api/Router';
import UpdateInformation from '../components/UI/UpdateInformation/UpdateInformation';
import './styles/profile.css'
import { toast } from 'react-toastify';
import toastOption from "../config/toast";
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';
import LoadingCar from '../components/LoadingCar/LoadingCar'
import incognitoAvatar from '../assets/all-images/avatar.jpg'

const Profile = () => {

  const { currentToken, userDecode, logout } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [stateUpdateProfile, setStateUpdateProfile] = useState(false)
  const [isOpenCurrentPwdModal, setIsOpenCurrentPwdModal] = useState(false)
  const [isOpenChangePwdModal, setIsOpenChangePwdModal] = useState(false)
  const [currentPwd, setCurrentPwd] = useState('')
  const [errConfirmCurrent, setErrConfirmCurrent] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmNewPwd, setConfirmNewPwd] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [modalLoginAgain, setModalLoginAgain] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const userFirstName = useRef();
  const userLastName = useRef();
  const userGender = useRef();
  const userBirthDay = useRef();
  const userAddress = useRef();
  const userPhone = useRef();
  const userEmail = useRef();

  const getUserProfile = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      };

      const res = await axios.get(`${API_URL}/api/users/${userDecode._id}`, config);

      if (res.status === 200) {
        setUserProfile(res.data);
        userFirstName.current = res.data.firstName
        userLastName.current = res.data.lastName
        userGender.current = res.data.gender
        userBirthDay.current = res.data.dob
        userAddress.current = res.data.address
        userPhone.current = res.data.phone
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const handleUpdateProfile = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      };

      const data = {
        firstName: userFirstName.current.value,
        lastName: userLastName.current.value,
        gender: userGender.current.value,
        dob: userBirthDay.current.value,
        address: userAddress.current.value,
        phone: userPhone.current.value
      }

      const res = await axios.put(`${API_URL}/api/users/${userDecode._id}`, data, config);

      if (res.status === 200) {
        const updateProfile = { ...userProfile, ...res.data }
        setUserProfile(updateProfile)
        setStateUpdateProfile(false)
        toast.success('Update profile successfully', toastOption)
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const openCurrentPwdModal = () => {
    setIsOpenCurrentPwdModal(true)
  }

  const closeCurrentPwdModal = () => {
    setCurrentPwd('')
    setIsOpenCurrentPwdModal(false)
  }

  const openChangePwdModal = () => {
    setIsOpenChangePwdModal(true)
  }

  const closeChangePwdModal = () => {
    setNewPwd('')
    setConfirmNewPwd('')
    setIsOpenChangePwdModal(false)
  }


  const handleSubmitCurrentPassword = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      };

      const data = {
        password: currentPwd,
      }

      const res = await axios.post(`${API_URL}/api/users/checkOldPassword/${userDecode._id}`, data, config);

      if (res.status === 200) {
        setIsOpenCurrentPwdModal(false)
        setIsOpenChangePwdModal(true)
        setCurrentPwd('')
      }

    } catch (error) {
      setErrConfirmCurrent('Incorrect Password!')
      console.log(error.message);
    }


  }

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    console.log(newPwd)
    console.log(confirmNewPwd)
    if (newPwd !== confirmNewPwd) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
        };

        const data = {
          password: newPwd,
          confirmPassword: confirmNewPwd
        }

        const res = await axios.put(`${API_URL}/api/users/changePassword/${userDecode._id}`, data, config);
        console.log('res', res)
        if (res.status === 200) {
          toast.success('Change Password Successfully!', toastOption)
          setIsOpenChangePwdModal(false)
          setModalLoginAgain(true)
        }

      } catch (error) {
        setErrConfirmCurrent('Incorrect Password!')
        console.log(error.message);
      }
    }

  }

  const handleNewPwd = (e) => {
    setNewPwd(e.target.value)
  }

  const handleConfirmNewPwd = (e) => {
    setPasswordsMatch(true)
    setConfirmNewPwd(e.target.value)
  }

  const closeModalLoginAgain = () => {
    logout()
    navigate('/login')
  }


  useEffect(() => {
    getUserProfile()
  }, [])

  //render UI
  const ProfileInformation = ({ userProfile }) => {
    return (
      <>
        <div className='d-flex gap-5'>
          <p className='fs-4'>First Name: {userProfile?.firstName} </p>
          <p className='fs-4'>Last Name: {userProfile?.lastName}</p>
        </div>
        <p className='fs-4'>Gender: {userProfile?.gender} </p>
        <p className='fs-4'>Birthday: {userProfile?.dob} </p>
        <p className='fs-4'>Address: {userProfile?.address} </p>
        <p className='fs-4'>Phone: {userProfile?.phone} </p>
        <p className='fs-4'>Email: {userProfile?.email} </p>
      </>
    )
  }

  return (
    <div className="container container-profile rounded bg-white ">

      {isLoading
        ? <LoadingCar />
        : <div className="row">
          <div className="col-md-6 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" width="200px"
                src={userDecode?.imgURL || incognitoAvatar}
                alt={userDecode?.imgURL ? "UserAva" : "IncognitoAva"}
              />
              <span className="font-weight-bold fs-4">{userDecode.lastName}</span>
              <span className="text-black-50 fs-4">{userDecode.email}</span>
              <div>
                <button className='btn btn-primary mt-3' onClick={openCurrentPwdModal}>Change password</button>

                <Modal ariaHideApp={false} isOpen={isOpenCurrentPwdModal} onRequestClose={closeCurrentPwdModal} style={{
                  content: {
                    width: '350px',
                    height: '250px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    padding: '20px'
                  },
                }}>
                  <h2>Re-Login:</h2>
                  <form onSubmit={handleSubmitCurrentPassword} className='form_current_password'>
                    <label htmlFor="current-password">Please enter your current password:</label>
                    <input className='mt-2' type="password" id="current-password" value={currentPwd} onChange={(e) => { setCurrentPwd(e.target.value); setErrConfirmCurrent('') }} required />
                    {errConfirmCurrent ? <span style={{ color: 'red' }}>{errConfirmCurrent}</span> : ''}
                    <div className='mt-3 position-relative'>
                      <button onClick={closeCurrentPwdModal} className='btn btn-outline-secondary'>Close</button>
                      <button type="submit" className='btn btn-primary position-absolute bottom-0'>Submit</button>
                    </div>
                  </form>
                </Modal>

                <Modal ariaHideApp={false} isOpen={isOpenChangePwdModal} onRequestClose={closeChangePwdModal} style={{
                  content: {
                    width: '350px',
                    height: '300px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    padding: '20px'
                  },
                }}>
                  <h2>Change Password:</h2>
                  <form onSubmit={handleSubmitChangePassword} className='form_change_password'>
                    <label htmlFor="new-password">New Password:</label>
                    <input type="password" id="new-password" className='mt-2' value={newPwd} onChange={handleNewPwd} required />
                    <label className='mt-2' htmlFor="confirm-password" >Confirm Password:</label>
                    <input type="password" id="confirm-password" className='mt-2' value={confirmNewPwd} onChange={handleConfirmNewPwd} required />
                    {!passwordsMatch && <span style={{ color: 'red' }}>Passwords do not match</span>}
                    <div className=' position-relative mt-3'>
                      <button onClick={closeChangePwdModal} className='btn btn-outline-secondary'>Close</button>
                      <button type="submit" className='btn btn-primary position-absolute'>Submit</button>
                    </div>
                  </form>
                </Modal>

                <Modal ariaHideApp={false} isOpen={modalLoginAgain} onRequestClose={closeModalLoginAgain} style={{
                  content: {
                    width: '350px',
                    height: '200px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    padding: '20px'
                  },
                }}>
                  <h2>The password has been changed, you need to log in again!</h2>
                  <div className=' position-relative mt-3'>
                    <button type="submit" className='btn btn-primary position-absolute' onClick={closeModalLoginAgain}>OK</button>
                  </div>
                </Modal>

              </div>
            </div>
          </div>
          <div className="col-md-6 position-relative">
            <div className="p-3 py-5">
              <div className="mb-3">
                <h4 className="text-right">Personal Information</h4>
                <a className='edit-profile d-flex align-items-center' onClick={() => setStateUpdateProfile(!stateUpdateProfile)}><i className="ri-file-edit-line"></i>Edit profile</a>
              </div>

              {!stateUpdateProfile
                ? <ProfileInformation userProfile={userProfile} />
                : <UpdateInformation
                  userProfile={userProfile}
                  userFirstName={userFirstName}
                  userLastName={userLastName}
                  userGender={userGender}
                  userBirthDay={userBirthDay}
                  userAddress={userAddress}
                  userPhone={userPhone}
                  userEmail={userEmail}
                />}

              {!stateUpdateProfile
                ? <></>
                : <div className='handle-button'>
                  <button type='submit' className='btn btn-primary' onClick={handleUpdateProfile}>Save</button>
                  <button className='btn btn-outline-secondary' onClick={() => setStateUpdateProfile(false)}>Cancel</button>
                </div>
              }
            </div>
          </div>
        </div>}
    </div>
  );

}

export default Profile