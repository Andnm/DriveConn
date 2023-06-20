import React, { useState } from 'react'
import './signup.css'
import FormInput from '../../../components/FormInput/FormInput'
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../api/Router";
import toastOption from '../../../config/toast';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Message from '../../../components/shared/Message'
import Modal from 'react-bootstrap/Modal';

const Signup = ({ open, onClose }) => {
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
        navigate('/home')
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Create Error!", toastOption);
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={open} onHide={onClose} dialogClassName="d-flex justify-content-center signUp-modal">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className="input-form">
          <h1>Đơn đăng kí</h1>
          {error && <Message variant='danger'>{error}</Message>}
          <ToastContainer />
          <form onSubmit={registerHandle} className="position-relative mt-3 mb-3 pb-5 pt-2 d-flex justify-content-between flex-wrap">
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
            <button type="submit" value="Register" className="btn btn-signup position-absolute bottom-0">Tạo tài khoản</button>
          </form>

          <div className='other-option d-flex flex-column justify-content-center align-items-center'>
            <p className='text'>Đã có tài khoản? <Link to="/login">Đăng ký</Link></p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Signup