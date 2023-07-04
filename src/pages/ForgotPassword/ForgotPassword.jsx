import React, { useState, useRef, useContext } from 'react'
import './style.css'
import CardBox from '../../components/Card/CardBox'
import InputBox from '../../components/InputBox/InputBox'
import { checkEmailExists, confirmOtpHandle } from '../../api/user'
import LoadingCar from '../../components/LoadingCar/LoadingCar'
import OtpForm from '../../components/OtpForm/OtpForm'
import { EMAIL_FORMAT } from '../../constants/default'
import ModalBox from '../../components/Modal/ModalBox'
import { AuthContext } from '../../context/authContext'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmOTP, setIsConfirmOTP] = useState(false)
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false)
  const { logout } = useContext(AuthContext);

  const inputsOtpRef = useRef([])

  const confirmEmail = async () => {
    const emailRegex = EMAIL_FORMAT;

    if (!email) {
      setError('Vui lòng nhập email!');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Vui lòng nhập email hợp lệ!');
      return;
    }

    setIsLoading(true);
    const response = await checkEmailExists(email);
    setIsLoading(false);

    if (response) {
      setIsConfirmOTP(true);
    } else {
      setError('Email này chưa thuộc về sở hữu của tài khoản nào. Vui lòng nhập lại!');
    }

  }

  const confirmOTP = async () => {
    const otp = [
      inputsOtpRef.current[0].value,
      ...inputsOtpRef.current.slice(1).map(input => input.value)
    ].join('')
    setIsLoading(true);
    const response = await confirmOtpHandle(email, otp)
    setIsLoading(false);
    if (response) {
      setIsOpenModalConfirm(true)
    } else {
      setError('OTP không đúng vui lòng nhập lại')
    }
  }

  const resendOtp = async () => {
    const response = await checkEmailExists(email);
    console.log(response)
  }

  return (
    <div className='forgot-password-container'>
      <div className='d-flex justify-content-center align-items-center'>
        {!isConfirmOTP
          ?
          <CardBox
            header={'Đặt lại mật khẩu của bạn'}
            body_title={'Nhập email bạn muốn lấy lại mật khẩu:'}
            body_content={
              <InputBox type={'text'}
                value={email}
                onChangeFunction={(e) => { setEmail(e.target.value); setError('') }}
                onFocusFunction={() => { setError('') }}
                label={'Email'}
                error={error}
              />
            }
            btnAction={'Tiếp tục'}
            actionToContinue={confirmEmail}
          />
          :
          <CardBox
            header={'Xác nhận OTP'}
            body_title={'OTP đã được gửi vui lòng kiểm tra gmail và nhập vào đây:'}
            body_content={
              <OtpForm
                verifyAction={confirmOTP}
                resendOtpAction={resendOtp}
                inputsRef={inputsOtpRef}
                error={error}
                setError={() => setError('')}
              />
            }
          />
        }

      </div>

      {isLoading && <LoadingCar background={true} />}
      {isOpenModalConfirm
        &&
        <ModalBox
          open={isOpenModalConfirm}
          onClose={() => { setIsOpenModalConfirm(false); logout() }}
          body={'Mật khẩu mới đã được gửi tới gmail của bạn. Vui lòng kiểm tra!'}
          btnActionYes={'Xác nhận'}
          eventToContinue={logout}
        />}
    </div>
  )
}

export default ForgotPassword