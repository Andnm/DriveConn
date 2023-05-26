import React, { useState } from "react";
import { Form, FormGroup, Row, Col, Input, Button, InputGroup, Label } from "reactstrap";
import "../../styles/car-owner-register-form.css"

const inputValues = {
    referral: "",
    carModel: "",
    ownerName: "",
    insured: true,
    phoneNumber: "",
    vehicleNumber: "",
}

const errorValues = {
    carModelError: false,
    ownerNameError: false,
    phoneNumberError: false,
    vehicleNumberError: false,
}

const errorMessage = {
    carModelMessage: "Car model should be have at least 1 characters",
    ownerNameMessage: "Owner model should be have at least 1 characters",
    phoneNumberMessage: "Mobile number should be have 8 to 12 digits",
    vehicleNumberMessage: "Vehicle number should match form be like (12K3-45678)"
}

const RegisterForm = () => {

    const validateRegisterForm = (e) => {

        e.preventDefault();

        let error = false
        const phoneRegex = /^\d{8,12}$/
        const vehicleRegex = /^\d{2}[A-Za-z]\d-\d{5}$/
        let errorValueChange = {
            carModelError: false,
            ownerNameError: false,
            phoneNumberError: false,
            vehicleNumberError: false,
        }

        if (!inputValue.carModel) {
            errorValueChange.carModelError = true
            error = true
        }
        if (!inputValue.ownerName) {
            errorValueChange.ownerNameError = true
            error = true
        }
        if (!inputValue.phoneNumber || !phoneRegex.test(inputValue.phoneNumber)) {
            errorValueChange.phoneNumberError = true
            error = true
        }
        if (!inputValue.vehicleNumber || !vehicleRegex.test(inputValue.vehicleNumber)) {
            errorValueChange.vehicleNumberError = true
            error = true
        }

        setErrorValue(errorValueChange)
    }

    function handleChange(event, _name) {
        const changeValues = { ...inputValue, [_name]: event.target.value }
        setInputValue(changeValues);
    }

    const [errorValue, setErrorValue] = useState(errorValues);
    const [inputValue, setInputValue] = useState(inputValues);

    return (
        <Form className="car_owner_register_form" onSubmit={validateRegisterForm}>
            <Row className="register_form_row">
                <Col md="6" className="d-flex">
                    <FormGroup>
                        <InputGroup>
                            <Input type="text" placeholder="Enter Referral / Offer Code (optional)" className="form_input input_referral" name="referral" value={inputValue.referral} onChange={(event) => handleChange(event, "referral")}></Input>
                            <Button color="primary">
                                APPLY
                            </Button>
                        </InputGroup>
                        <p className="register_form_guide_text">If you got to know about Host program through  a friend, enter friend’s Referral Code. This field is OPTIONAL </p>
                    </FormGroup>

                </Col>
                <Col md="6">
                    <FormGroup>
                        <Input type="text" placeholder="Enter the CAR MODEL you own*" className="form_input" name="carModel" value={inputValue.carModel} onChange={(event) => handleChange(event, "carModel")}></Input>
                        <p className="register_form_message">{errorValue.carModelError ? errorMessage.carModelMessage : ""}</p>
                        <p className="register_form_guide_text">(Vinfast, Toyota, Honda, Tesla, ... )</p>
                    </FormGroup>
                </Col>
            </Row>

            <Row className="register_form_row">
                <Col md="6">
                    <FormGroup>
                        <Input type="text" placeholder="Vehicle owner’s name*" className="form_input" name="ownerName" value={inputValue.ownerName} onChange={(event) => handleChange(event, "ownerName")}></Input>
                        <p className="register_form_message">{errorValue.ownerNameError ? errorMessage.ownerNameMessage : ""}</p>
                        <p className="register_form_guide_text">(Your name: Ex: Nguyen Van A)</p>
                    </FormGroup>
                </Col>
                <Col md="6">
                    <FormGroup>
                        <Label>Is your car insured?*</Label>
                    </FormGroup>
                    <FormGroup check inline>
                        <Input type="radio" name="insured" id="insured_yes" value="true" onChange={(event) => handleChange(event, "insured")} checked />
                        <Label for="insured_yes" check>
                            Yes
                        </Label>
                    </FormGroup>
                    <FormGroup check inline >
                        <Input type="radio" name="insured" id="insured_no" value="false" onChange={(event) => handleChange(event, "insured")} />
                        <Label for="insured_no" check>
                            No
                        </Label>
                    </FormGroup>

                </Col>
            </Row>

            <Row>
                <Col md="6">
                    <FormGroup>
                        <Input type="text" placeholder="Mobile number*" className="form_input" name="phoneNumber" value={inputValue.phoneNumber} onChange={(event) => handleChange(event, "phoneNumber")}></Input>
                        <p className="register_form_message">{errorValue.phoneNumberError ? errorMessage.phoneNumberMessage : ""}</p>
                        <p className="register_form_guide_text">(Your number that we can contact with you)</p>
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col md="6">
                    <FormGroup>
                        <Input type="text" placeholder="What is your vehicle number?*" className="form_input" name="vehicleNumber" value={inputValue.vehicleNumber} onChange={(event) => handleChange(event, "vehicleNumber")}></Input>
                        <p className="register_form_message">{errorValue.vehicleNumberError ? errorMessage.vehicleNumberMessage : ""}</p>
                        <p className="register_form_guide_text">(Ex: 12K3 - 45678)</p>
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col md="6" className="register_form_submit_button">
                    <Button color="primary" >
                        SEND INFORMATION TO DRIVECONN
                    </Button>
                </Col>
            </Row>
        </Form>
    )

}

export default RegisterForm;