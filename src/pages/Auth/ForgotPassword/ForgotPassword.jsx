import React, { useState } from 'react'
import './style.css'
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal'
import axios from "axios";
import API_URL from "../../../api/Router";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [formOtp, setFormOtp] = useState(false)
    const [otp, setOtp] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [sendingOtp, setSendingOtp] = useState(false)
    const [errOtp, setErrOtp] = useState('')

    const navigate = useNavigate();

    const cancelHandle = () => {
        navigate('/login')
    }

    const findHandle = async () => {
        try {
            const data = {
                email: email
            }

            setSendingOtp(true)
            const res = await axios.post(`${API_URL}/api/users/forgotPassword`, data);
            localStorage.setItem('email', email)

            if (res.status === 200) {
                setFormOtp(true)
                setSendingOtp(false)
            }
        } catch (error) {
            console.log(error)
            setErrEmail(true)
            setSendingOtp(false)
        }
    }

    const handleEmailChange = (e) => {
        setErrEmail('')
        setEmail(e.target.value)
    }

    const handleOtpChange = (e) => {
        setSendingOtp(false)
        setErrOtp('')
        setOtp(e.target.value)
    }

    const confirmOtpHandle = async () => {
        try {
            const data = {
                email: localStorage.getItem('email'),
                otp: otp
            }
            setSendingOtp(true)
            const res = await axios.post(`${API_URL}/api/users/resetPassword`, data);
            if (res.status === 200) {
                setFormOtp(true)
                setSendingOtp(false)
                setIsOpenModal(true)
            }
        } catch (error) {
            console.log(error)
            setErrOtp(true)
            setSendingOtp(false)

        }
    }

    const handleOk = () => {
        navigate('/login')
    }

    return (
        <div className='background-img'>
            {!formOtp
                ?
                <div className='card_forgot_password'>
                    <div className='d-flex form_forgot_password'>
                        <h2>Find your account</h2>
                        <hr></hr>
                        <label htmlFor="email" className="form-label">Please enter your email to find your account</label>
                        <input type="email" id="email" placeholder='Email' value={email} onChange={handleEmailChange} />
                        {errEmail ? <span style={{ color: 'red' }}>Email not found in system</span> : <></>}
                        {sendingOtp ? <span style={{ color: 'black', textTransform: 'initial' }}>OTP is being sent ...</span> : ""}
                        <hr></hr>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-outline-secondary mr-5' onClick={cancelHandle}>Cancel</button>
                            <button className='btn btn-primary' onClick={findHandle}>Find</button>
                        </div>
                    </div>
                </div>
                :
                <div className='card_otp'>
                    <div className='d-flex card_form'>
                        <h2>Confirm OTP</h2>
                        <hr></hr>
                        <label htmlFor="email" className="form-label">OTP is sent to your email, please check and enter to here</label>
                        <input type="number" id="email" placeholder='Enter OTP' value={otp} onChange={handleOtpChange} />
                        {errOtp ? <span style={{ color: 'red' }}>OTP is not correct</span> : <></>}
                        {sendingOtp ? <span style={{ color: 'black', textTransform: 'initial' }}>Loading ...</span> : ""}

                        <hr></hr>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-outline-secondary mr-5' onClick={cancelHandle}>Cancel</button>
                            <button className='btn btn-primary' onClick={confirmOtpHandle}>Confirm</button>
                        </div>
                    </div>

                    <Modal ariaHideApp={false} isOpen={isOpenModal} style={{
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
                        <p>The new password was sent to you, please check your email and login with new password!</p>
                        <div className='mt-3'>
                            <button type="submit" className='btn btn-primary position-absolute' onClick={handleOk}>OK</button>
                        </div>
                    </Modal>
                </div>
            }
        </div>
    )
}

export default ForgotPassword