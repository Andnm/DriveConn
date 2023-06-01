import React, { useEffect, useState, useContext } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import axios from "axios";
import API_URL from "../api/Router";
import { AuthContext } from "../context/authContext";
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { differenceInDays, addDays, startOfDay } from "date-fns";
import { toast } from 'react-toastify';
import toastOption from "../config/toast";
import commentImg from "../assets/all-images/ava-1.jpg";
import LoadingCar from '../components/LoadingCar/LoadingCar'

const VehicleDetails = () => {
  const { currentToken, userDecode } = useContext(AuthContext);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [vehicleDetail, setVehicleDetail] = useState();
  const [vehicle, setVehicle] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalConfirmBooking, setModalConfirmBooking] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(startDate, 1));
  const [diffDate, setDiffDate] = useState(differenceInDays(startOfDay(endDate), startOfDay(startDate)));
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const getVehiclesByLicensePlate = async () => {
    try {
      const res1 = await axios.get(`${API_URL}/api/vehicles/vehicleDetails/${slug}`);
      const res2 = await axios.get(`${API_URL}/api/vehicles/${slug}`);

      if (res1.status === 200) {
        setVehicleDetail(res1.data)
        setVehicle(res2.data)
      }


    } catch (error) {
      console.log(error.message);
    }
  }

  const singleVehicleItem = ''
  // const singleVehicleItem = vehicleDetail?.find((item) => item?.licensePlate === slug);

  const editVehicleHandle = () => {

  }

  const handleRentalVehicle = () => {
    if (!userDecode) {
      openModal()
    } else {
      openConfirmModal()
    }
  }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const openConfirmModal = () => {
    setModalConfirmBooking(true);
  }

  const closeConfirmModal = () => {
    setModalConfirmBooking(false);
    setIsPaid(false)
    setLoadingConfirm(false)
  }

  const handleStartDate = (date) => {
    if (date > endDate) {
      setStartDate(date)
      setEndDate(addDays(date, 1))
    } else {
      setStartDate(date)
    }
  }

  const handleEndDate = (date) => {
    setEndDate(date)
  }

  const confirmBookingHandle = async () => {
    setLoadingConfirm(true)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      };

      const data = {
        licensePlate: slug,
        bookingStart: startDate.toISOString().slice(0, 10),
        bookingEnd: endDate.toISOString().slice(0, 10),
        hasDriver: false,
        isPaid: isPaid
      }

      const res = await axios.post(`${API_URL}/api/bookings`, data, config);
      if (res.status === 200 || res.status === 201) {
        if (isPaid === true) {
          const resPaypal = await axios.get(`${API_URL}/api/paypal?bookingId=${res.data._id}`, config)
          console.log(resPaypal)
          createBookingDetail(res.data._id, config)
        } else {
          closeConfirmModal(true)
          if (createBookingDetail(res.data._id, config)) {
            setLoadingConfirm(false)
            toast.success('Booking successfully!', toastOption)
            navigate('/vehicles')
          }
        }
      }

    } catch (error) {
      toast.error('Booking failed!', toastOption)
    }
  }

  const createBookingDetail = async (id, config) => {

    const checkStatusRes = false;

    const data = {
      custName: (userDecode?.firstName + ' ' + userDecode?.lastName),
      custEmail: userDecode?.email,
      custPhone: userDecode?.phone,
      custAddress: userDecode?.address,
      licensePlate: vehicle?.licensePlate,
      // payment: ....
    }

    try {
      const res = await axios.post(`${API_URL}/api/bookings/bookingDetails/${id}`, data, config)
      if (res.status === 201 || res.status === 200) {
        checkStatusRes = true
      }
    } catch (error) {
      console.log(error)
    }

    return checkStatusRes
  }

  const handlePayment = (event) => {
    const target = event.target;
    const value = target.value;

    if (value === 'no-payment') {
      setIsPaid(false)
    } else if (value === 'paypal-payment') {
      setIsPaid(true)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleVehicleItem]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getVehiclesByLicensePlate()
  }, [])

  useEffect(() => {
    const days = differenceInDays(startOfDay(new Date(endDate)), startOfDay(new Date(startDate)))
    setDiffDate(days)
  }, [startDate, endDate])

  return (
    <div className="d-flex justify-content-center">
      {isLoading ?<LoadingCar className={'blank-container'} />
        :
        <Helmet title={slug}>
          <section>
            <Container>
              <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}><i className="ri-arrow-go-back-line"></i></button>
              <Row>
                <Col lg="6">
                  <img src={vehicle?.image} alt="" className="w-100" />

                  <div className="position-relative">
                    <div className="car__info">
                      <h2 className="section__title">{vehicleDetail?.model}</h2>
                      <h4 className="fw-bold">{vehicle?.licensePlate}</h4>

                      <div className=" d-flex align-items-center gap-5 mb-4 mt-3">

                        <span className=" d-flex align-items-center gap-2">
                          <span style={{ color: "#f9a826" }}>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                            <i className="ri-star-s-fill"></i>
                          </span>
                          ({singleVehicleItem?.rating} ratings)
                        </span>
                      </div>

                      <p className="section__description">
                        {vehicle?.description}
                      </p>

                      <div
                        className=" d-flex align-items-center mt-3"
                        style={{ columnGap: "4rem" }}
                      >
                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i
                            className="ri-roadster-line"
                            style={{ color: "#f9a826" }}
                          ></i>{" "}
                          {vehicleDetail?.transmission}
                        </span>

                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i
                            className="ri-settings-2-line"
                            style={{ color: "#f9a826" }}
                          ></i>{" "}
                          {vehicleDetail?.fuelType}
                        </span>

                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i
                            className="ri-timer-flash-line"
                            style={{ color: "#f9a826" }}
                          ></i>{" "}
                          {vehicle?.isRented ? 'Unrentable' : 'Rentable'}
                        </span>
                      </div>

                      <div
                        className=" d-flex align-items-center mt-3"
                        style={{ columnGap: "2.8rem" }}
                      >
                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i className="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                          Unlocation
                        </span>

                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i
                            className="ri-wheelchair-line"
                            style={{ color: "#f9a826" }}
                          ></i>{" "}
                          {vehicleDetail?.vehicleType}
                        </span>

                        <span className=" d-flex align-items-center gap-1 section__description">
                          <i
                            className="ri-building-2-line"
                            style={{ color: "#f9a826" }}
                          ></i>{" "}
                          {vehicleDetail?.yearOfManufacturer}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col lg="6" className="position-relative detail-vehicle">
                  <h6 className="rent__price__detail fw-bold">
                    {vehicle?.price ? <span> {vehicle?.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })} / Day</span> : <span>Free</span>}
                  </h6>

                  <label htmlFor="start-date">Start booking date:</label>
                  <div className="input_date">
                    <i class="ri-calendar-2-line"></i>
                    <DatePicker
                      id="start-date"
                      selected={startDate}
                      dateFormat="yyyy-MM-dd"
                      onChange={handleStartDate}
                      minDate={new Date()}
                    />
                  </div>


                  <label htmlFor="end-date">End booking Date:</label>
                  <div className="input_date">
                    <i class="ri-calendar-2-line"></i>
                    <DatePicker
                      id="end-date"
                      selected={endDate}
                      dateFormat="yyyy-MM-dd"
                      onChange={handleEndDate}
                      minDate={addDays(startDate, 1)}
                    />

                  </div>

                  <div className="payments">
                    <h3>Payment</h3>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="payment" id="no-payment" value='no-payment' onChange={handlePayment} checked />
                      <label class="form-check-label" for="no-payment">
                        Pay when receiving the vehicle
                      </label>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="payment" id="paypal-payment" value="paypal-payment" onChange={handlePayment} />
                      <label class="form-check-label" for="paypal-payment">
                        Payment via Paypal
                      </label>
                    </div>
                  </div>

                  <div className="detail__price">
                    <h3>Detail price</h3>
                    <div className="d-flex justify-content-between"><p>Rental unit price: </p> <p> {vehicle?.price} / day</p>
                    </div>
                    <div className="d-flex justify-content-between"><p>Service charge: </p> <p>(Not support)</p>
                    </div>
                    <div className="d-flex justify-content-between"><p>Insurance fees: </p> <p>(Not support)</p>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-between align-items-center mb-2 mt-2"><p className="mb-0">Total cost of car rental: </p> <p className="d-flex align-items-center mb-0">{vehicle?.price} x <p className="date_dif mb-0">{diffDate} day</p></p>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-between"><p className="total_price">Total price:  </p>
                      <p className="total_price_money">{(vehicle?.price * diffDate).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                  </div>

                  {!userDecode
                    && <button className="btn btn-primary mt-5 button_booking" onClick={handleRentalVehicle}>Booking now</button>}

                  {userDecode
                    && userDecode.role_id.roleName !== 'Hotelier'
                    && <button className="btn btn-primary mt-5 button_booking" onClick={handleRentalVehicle}>Booking now</button>}

                  {userDecode
                    && userDecode.role_id.roleName === 'Hotelier'
                    && userDecode._id === vehicle?.user_id
                    && <div className="handle__detail__vehicle">
                      <div className='edit__vehicle__item' onClick={editVehicleHandle}><i className="ri-edit-line"></i></div>
                      <div className='delete__vehicle__item' onClick={editVehicleHandle}><i className="ri-delete-bin-line"></i></div>
                    </div>}

                  <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} style={{
                    content: {
                      width: '300px',
                      height: '180px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: '#fff',
                      borderRadius: '5px',
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                      padding: '20px'
                    },
                  }}>
                    <p>You need to login before booking</p>
                    <Link to='/login' style={{ textUnderlineOffset: '3px' }}>Go to login</Link>
                    <br />
                    <br />
                    <button onClick={closeModal} className='btn btn-outline-secondary'>Close</button>
                  </Modal>

                  <Modal ariaHideApp={false} isOpen={modalConfirmBooking} onRequestClose={closeConfirmModal} style={{
                    content: {
                      width: '600px',
                      height: '650px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: '#fff',
                      borderRadius: '5px',
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                      padding: '20px'
                    },
                  }}>
                    <h3 style={{ marginBottom: '30px' }}>Confirm booking</h3>
                    <div className="information-customer">
                      <h5 style={{ color: 'black' }}>Personal Information:</h5>
                      <p>Last Name: {userDecode?.lastName}</p>
                      <p>Email: {userDecode?.email}</p>
                      <p>Address: {userDecode?.address}</p>
                      <p>Phone: {userDecode?.phone}</p>
                    </div>

                    <div className="information-vehicle">
                      <h5 style={{ color: 'black' }}>Vehicle Information:</h5>
                      <p>Model: {vehicleDetail?.model}</p>
                      <p>License Plate: {vehicle?.licensePlate}</p>
                    </div>

                    <div className="information-booking">
                      <h5 style={{ color: 'black' }}>Booking Information:</h5>
                      <p>Start booking date: {startDate.toISOString().slice(0, 10)}</p>
                      <p>End booking date: {endDate.toISOString().slice(0, 10)}</p>
                      <div className="d-flex "><p className="total_price">Total price:  </p>
                        <p className="total_price_money">{(vehicle?.price * diffDate).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                      </div>
                    </div>

                    <div className="button-confirm-cancel">
                      <button onClick={closeConfirmModal} className='btn btn-outline-secondary'>Cancel</button>
                      <button onClick={confirmBookingHandle} className='btn btn-primary'>Confirm</button>
                    </div>

                    {loadingConfirm ? <p style={{ textTransform: 'initial', color: 'orange' }}>Processing...</p> : ''}
                  </Modal>
                </Col>

                <div className="comment__list mt-5">
                  <h4 className="mb-5">3 Comments</h4>

                  <div className="single__comment d-flex gap-3 mb-5">
                    <img src={commentImg} alt="" />
                    <div className="comment__content">
                      <h6 className=" fw-bold">David Visa</h6>
                      <p className="section__description mb-0">14 July, 2022</p>
                      <p className="section__description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eos nobis totam eius laborum molestias itaque minima
                        distinctio, quae velit tempore!
                      </p>

                    </div>
                  </div>

                  <div className="single__comment d-flex gap-3 mb-5">
                    <img src={commentImg} alt="" />
                    <div className="comment__content">
                      <h6 className=" fw-bold">David Visa</h6>
                      <p className="section__description mb-0">14 July, 2022</p>
                      <p className="section__description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eos nobis totam eius laborum molestias itaque minima
                        distinctio, quae velit tempore!
                      </p>

                    </div>
                  </div>

                  <div className="single__comment d-flex gap-3 mb-5">
                    <img src={commentImg} alt="" />
                    <div className="comment__content">
                      <h6 className=" fw-bold">David Visa</h6>
                      <p className="section__description mb-0">14 July, 2022</p>
                      <p className="section__description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eos nobis totam eius laborum molestias itaque minima
                        distinctio, quae velit tempore!
                      </p>

                    </div>
                  </div>



                  {/* =============== comment form ============ */}
                  {/* <div className="leave__comment-form mt-5">
                    <h4>Leave a Comment</h4>
                    <p className="section__description">
                      You must sign-in to make or comment a post
                    </p>

                    <Form>
                      <FormGroup className=" d-flex gap-3">
                        <Input type="text" placeholder="Full name" />
                        <Input type="email" placeholder="Email" />
                      </FormGroup>

                      <FormGroup>
                        <textarea
                          rows="5"
                          className="w-100 py-2 px-3"
                          placeholder="Comment..."
                        ></textarea>
                      </FormGroup>

                      <button className="btn comment__btn mt-3">
                        Post a Comment
                      </button>
                    </Form>
                  </div> */}

                </div>

                {/* <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col> */}

                {/* <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col> */}

              </Row>
            </Container>
          </section>
        </Helmet>}
    </div>
  );
};

export default VehicleDetails;
