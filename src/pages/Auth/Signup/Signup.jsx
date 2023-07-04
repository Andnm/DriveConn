import React, { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import './signup.css';

import FormInput from '../../../components/FormInput/FormInput';
import Message from '../../../components/shared/Message';
import CardBox from '../../../components/Card/CardBox';
import OtpForm from '../../../components/OtpForm/OtpForm';
import LoadingCar from '../../../components/LoadingCar/LoadingCar';

import { splitFullName } from '../../../utils/utils';
import { registerAccount, sendOtpWhenRegister, verifyOtpWhenRegister } from '../../../api/user';

import toastOption from '../../../config/toast';
import { AuthContext } from '../../../context/authContext';

const Signup = ({ open, onClose }) => {
  const { login } = useContext(AuthContext);

  const [formState, setFormState] = useState({
    values: {
      fullName: "",
      email: "",
      password: "",
    },
    sendOtpData: {
      otpExpired: "",
      otpStored: ""
    },
    isLoading: false,
    inputsOtpRef: useRef([]),
    isOpenModalConfirmOTP: false,
    error: ''
  });

  const { values, sendOtpData, isLoading, inputsOtpRef, isOpenModalConfirmOTP, error } = formState;

  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Tên hiển thị",
      errorMessage:
        "Tên hiển thị phải có ít nhất 1 kí tự và không chứa kí tự đặc biệt!",
      label: "Tên hiển thị",
      pattern: "^[ a-zA-Z\-\']+$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Please do not leave this field blank!",
      label: "Password",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const registerHandle = async (e) => {
    e.preventDefault();
    setFormState(prevState => ({ ...prevState, isLoading: true }));

    const { status: responseSendOtpStatus, data: responseSendOtpData } = await sendOtpWhenRegister(values.email);
    setFormState(prevState => ({ ...prevState, isLoading: false }));
    console.log(responseSendOtpData.otp)
    if (responseSendOtpStatus === 200) {
      setFormState(prevState => ({
        ...prevState,
        isOpenModalConfirmOTP: true,
        sendOtpData: {
          otpExpired: responseSendOtpData.otpExpires,
          otpStored: responseSendOtpData.otp
        }
      }));
    } else if (responseSendOtpStatus === 400) {
      setFormState(prevState => ({ ...prevState, error: 'Tài khoản này đã tồn tại!' }));
    } else {
      setFormState(prevState => ({ ...prevState, error: 'Đã có lỗi xảy ra khi gửi OTP. Vui lòng thử lại sau!' }));
    }
  };

  const onChange = (e) => {
    setFormState(prevState => ({
      ...prevState,
      error: '',
      values: { ...prevState.values, [e.target.name]: e.target.value }
    }));
  };

  const closeRegisterForm = () => {
    onClose();
    setFormState(prevState => ({ ...prevState, isOpenModalConfirmOTP: false, error: '' }));
  };

  const confirmOTP = async () => {
    setFormState(prevState => ({ ...prevState, isLoading: true }));

    const otp = [
      inputsOtpRef.current[0].value,
      ...inputsOtpRef.current.slice(1).map(input => input.value)
    ].join('');

    const { lastName, firstName } = splitFullName(values.fullName);

    const data = {
      lastName: lastName,
      firstName: firstName,
      email: values.email,
      password: values.password,
      roleName: "Customer",
      gender: "",
      dob: "",
      address: "",
      address_details: "",
      phone: "",
    };

    const dataOtp = {
      otp: otp.toString(),
      otpExpired: sendOtpData.otpExpired,
      otpStored: sendOtpData.otpStored.toString()
    };

    const { status: responseVerifyOtpStatus } = await verifyOtpWhenRegister(dataOtp);

    if (responseVerifyOtpStatus === 200) {
      const responseRegisterAccount = await registerAccount(data);

      if (responseRegisterAccount.status === 200 || responseRegisterAccount.status === 201) {
        setFormState(prevState => ({ ...prevState, isOpenModalConfirmOTP: false, error: '', isLoading: false }));

        let loginUser = {
          email: values.email,
          password: values.password,
        };

        login(loginUser);

        toast.success('Đăng kí tài khoản thành công!', toastOption);
        closeRegisterForm()
      } else {
        toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!', toastOption);
        setFormState(prevState => ({ ...prevState, isLoading: false }));
      }
    } else {
      setFormState(prevState => ({ ...prevState, error: 'OTP không đúng vui lòng nhập lại', isLoading: false }));
    }
  };

  return (
    <Modal show={open} onHide={closeRegisterForm} dialogClassName="d-flex justify-content-center signUp-modal">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className="input-form">
          {!isOpenModalConfirmOTP ? (
            <>
              <h1>Đơn đăng kí</h1>
              <ToastContainer />
              <form onSubmit={registerHandle} className="position-relative mt-3 mb-3 pb-5 pt-2 d-flex justify-content-between flex-wrap">
                {inputs?.length && inputs?.map((input) => {
                  return (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                    />
                  );
                })}

                {error && (
                  <div className='d-flex justify-content-center w-100 mt-3'>
                    <Message text_color={'text-danger'} children={error} />
                  </div>
                )}

                <div className='d-flex justify-content-center w-100 mt-4'>
                  <button type="submit" value="Register" className="btn-signup position-absolute bottom-0">Tạo tài khoản</button>
                </div>
              </form>
              <div className='other-option d-flex flex-column justify-content-center align-items-center'>
                <p className='text'>Đã có tài khoản? <Link to="#">Đăng ký</Link></p>
              </div>
            </>
          ) : (
            <>
              <CardBox
                header={'Xác nhận OTP'}
                body_title={'OTP đã được gửi vui lòng kiểm tra gmail và nhập vào đây:'}
                body_content={
                  <OtpForm
                    verifyAction={confirmOTP}
                    inputsRef={inputsOtpRef}
                    error={error}
                    setError={() => setFormState(prevState => ({ ...prevState, error: '' }))}
                  />
                }
              />
            </>
          )}
          {isLoading && <LoadingCar background={true} />}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
