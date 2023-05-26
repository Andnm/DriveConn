import React, { useState } from 'react'
import './signup.css'
import FormInput from '../../../components/FormInput/FormInput'
import { Link } from "react-router-dom";
import logo_google from '../../../assets/all-images/google/google_logo.png'
import axios from "axios";
import API_URL from "../../../api/Router";
import toastOption from '../../../config/toast';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Message from '../../../components/shared/Message'

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    address: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    birthday: "",
    phone: ""
  });

  const [error, setError] = useState('')

  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "Firstname",
      errorMessage:
        "Firstname should be have at least 1 characters and shouldn't include any special character!",
      label: "Firstname",
      pattern: "^[ a-zA-Z\-\']+$",
      required: true,
    },
    {
      id: 2,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "Address should be 3-50 characters!",
      label: "Address",
      pattern: "^[A-Za-z0-9 ]{3,50}$",
      required: true,
    },
    {
      id: 3,
      name: "lastName",
      type: "text",
      placeholder: "Lastname",
      errorMessage:
        "Firstname should be have at least 1 characters and shouldn't include any special character!",
      label: "Lastname",
      pattern: "^[ a-zA-Z\-\']+$",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 5,
      name: "gender",
      type: "radio",
      label: "Gender",
    },
    {
      id: 6,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Please do not leave this field blank!",
      label: "Password",
      required: true,
    },
    {
      id: 7,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 8,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 9,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      errorMessage: "Phone number is not valid!",
      label: "Phone",
      pattern: "^[0-9]{3,16}$",
      required: true,
    }
  ];

  const option = [
    {
      name: 'gender',
      value: 'Male',
      label: 'Male'
    },
    {
      name: 'gender',
      value: 'Female',
      label: 'Female'
    },
    {
      name: 'gender',
      value: 'Other',
      label: 'Other'
    }
  ]

  const registerHandle = async (e) => {
    e.preventDefault();

    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      dob: values.birthday,
      address: values.address,
      phone: values.phone,
      email: values.email,
      password: values.password,
      roleName: 'Customer'
    }

    try {
      const res = await axios.post(`${API_URL}/api/users/register`, data)

      console.log(res)

      if (res.status === 201) {
        setValues({
          firstName: "",
          address: "",
          lastName: "",
          email: "",
          gender: "",
          password: "",
          birthday: "",
          phone: ""
        })
        toast.success('Your account has been created successfully!');
        navigate('/login')
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Create Error!", toastOption);
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const googleAuth = async () => {
    // window.open(`${API_URL}/api/auth/login/google`, "_blank")

    const popW = 500;
    const popH = 1000;

    const left = (window.innerWidth - popW) / 3;
    const top = (window.innerHeight - popH) / 2;

    // mở cửa sổ popup mới và đặt nó ở giữa trang web
    const newWindow = window.open(`${API_URL}/api/auth/login/google`, '_blank', 'width=' + popW + ', height=' + popH + ', top=' + top + ', left=' + left);

    if (newWindow) {
      const intervalId = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(intervalId);

          axios.get(`${API_URL}/api/auth/me`).then((response) => {
            const { accessToken } = response.data;
            console.log(accessToken)
          });
        }
      }, 1000);
    }

  }

  return (
    <div className='background-img'>
      <div className="input-form">
        <h1>Sign Up Form</h1>
        {error && <Message variant='danger'>{error}</Message>}
        <Link to="/home" className='home-icon-register'><i className="ri-home-4-line"></i><p>Home</p></Link>
        <ToastContainer />
        <form onSubmit={registerHandle} className="position-relative pb-5 pt-2 d-flex justify-content-between flex-wrap">
          {inputs?.length && inputs?.map((input) => {
            if (input.type === "radio") {
              return (<div className="form-group">
                <label htmlFor="gender" className="form-label">{input.label}</label>
                <div className='d-flex gap-5'>
                  {option.map((option) => (
                    <div key={option.value} className='option-radio'>
                      <input
                        type="radio"
                        id={option.value}
                        name={input.name}
                        value={option.value}
                        onChange={onChange}
                        checked={values[input.name] === option.value}
                        className='m-2'
                      />
                      <label htmlFor={option.value}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              )
            } else {
              return (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              );
            }
          })}

          <button type="submit" value="Register" className="btn btn-signup position-absolute bottom-0">Sign up</button>
        </form>

        <div className='other-option d-flex flex-column justify-content-center align-items-center'>
          <p className='text'>or</p>
          <button className='google_btn' onClick={googleAuth}>
            <img src={logo_google} alt="google icon" />
            <span>Sign up with Google</span>
          </button>
          <p className='text'>Have an account ? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup