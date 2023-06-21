import React, { useState } from "react";
import { Form, FormGroup, Row, Col, Input, Button, InputGroup, Label } from "reactstrap";
import "../../styles/car-owner-register-form.css"
import InputBox from "../InputBox/InputBox";
import { toast } from 'react-toastify';
import toastOption from "../../config/toast"; 
import { sendMailWhenRegisterOwner } from "../../api/user";

const RegisterForm = () => {

    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [address, setAddress] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: fullName,
            phone: phoneNumber,
            vehicleType: vehicleType,
            address: address
        }

        const response = await sendMailWhenRegisterOwner(data)

        if (response.status === 200 || response.status === 201) {
            toast.success('Gửi mail thành công!', toastOption)
            setFullName('')
            setPhoneNumber('')
            setVehicleType('')
            setAddress('')
        }else {
            toast.error('Gửi mail thất bại, vui lòng thử lại sau!', toastOption)
        }
    }

    return (
        <Form className="car_owner_register_form" onClick={handleSubmit}>
            <Row className="w-50" style={{margin: '0 auto'}}>
                <InputBox
                    styleContainer={'w-100 d-flex flex-column justify-content-center align-items-center'}
                    type={'text'}
                    value={fullName}
                    onChangeFunction={(e) => setFullName(e.target.value)}
                    label={'Họ và tên'}
                />

                <InputBox
                    styleContainer={'w-100 d-flex flex-column justify-content-center align-items-center'}
                    type={'text'}
                    value={phoneNumber}
                    onChangeFunction={(e) => setPhoneNumber(e.target.value)}
                    label={'Số điện thoại'}
                />

                <InputBox
                    styleContainer={'w-100 d-flex flex-column justify-content-center align-items-center'}
                    type={'text'}
                    value={vehicleType}
                    onChangeFunction={(e) => setVehicleType(e.target.value)}
                    label={'Loại xe muốn đăng'}
                />

                <InputBox
                    styleContainer={'w-100 d-flex flex-column justify-content-center align-items-center'}
                    type={'text'}
                    value={address}
                    onChangeFunction={(e) => setAddress(e.target.value)}
                    label={'Địa chỉ'}
                />
            </Row>


            <Row>
                <Col md="4" className="register_form_submit_button">
                    <Button color="primary" className="mt-3">
                        Gửi thông tin tới Driveconn
                    </Button>
                </Col>
            </Row>
        </Form>
    )

}

export default RegisterForm;