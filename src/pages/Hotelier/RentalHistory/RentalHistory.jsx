import { Container } from "reactstrap";
import React, { useEffect, useContext, useState } from "react";
import './style.css'
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import API_URL from "../../../api/Router";
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import './style.css'
import { toast } from "react-toastify";
import toastOption from "../../../config/toast";
import LoadingCar from '../../../components/LoadingCar/LoadingCar';
import Modal from 'react-modal'


const RentalHistory = () => {
    const { currentToken, userDecode } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const dataPerPage = 10;
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenModalDetailBooking, setIsOpenModalDetailBooking] = useState(false)
    const [dataBookingDetail, setDataBookingDetail] = useState([]);
    const [dataVehicle, setDataVehicle] = useState([])
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false)
    const [rowId, setRowId] = useState('')

    const getRentalHistory = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentToken}`,
                },
            };

            const res = await axios.get(`${API_URL}/api/bookings/hotelier`, config);
            if (res.status === 200) {
                console.log(res.data)
                setData(res.data.reverse())
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const formatDate = (data) => {
        const date = new Date(data);
        if (date instanceof Date && !isNaN(date.getTime())) {
            return date.toISOString().substring(0, 10);
        } else {
            return null;
        }
    }

    const formatMoney = (money) => {
        return money.toLocaleString('vi', { style: 'currency', currency: 'VND' })
    }

    const getStatusColor = (status) => {
        if (status === 'Completed') {
            return 'green';
        } else if (status === 'Cancelled') {
            return 'red';
        } else {
            return 'orange';
        }
    }

    const getPaymentStatus = (status) => {
        if (status == false) {
            return <div style={{ color: 'red' }}>Unpaid</div>
        } else {
            return <div style={{ color: 'green' }}>Paid</div>
        }
    }

    const openModalConfirm = (id) => {
        setRowId(id)
        setIsOpenModalConfirm(true)
    }

    const actions = (row) => {
        if (row.bookingStatus === 'Processing') {
            return (
                <div>
                    <button className="btn btn-sm btn-outline-success mx-1" onClick={() => openModalConfirm(row._id)}>
                        <i className="ri-check-line"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger mx-1" onClick={() => handleCancelRental(row._id)}>
                        <i className="ri-close-line"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-primary mx-1" onClick={() => handleDetailRental(row._id, row.licensePlate)}>
                        <i className="ri-edit-box-line"></i>
                    </button>
                </div>
            )
        } else {
            return (
                <button className="btn btn-sm btn-outline-primary mx-1" onClick={() => handleDetailRental(row._id, row.licensePlate)}>
                    <i className="ri-edit-box-line"></i>
                </button>
            );
        }
    }

    const handleConfirmRental = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentToken}`,
                },
            };

            console.log('id', rowId)
            const res = await axios.get(`${API_URL}/api/bookings/${rowId}/return`, config);
            if (res.status === 200) {
                setData(list => updateList(res.data, list))
                toast.success('Confirm Successfully!', toastOption)
                setIsOpenModalConfirm(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const updateList = (newItem, currentList) => {
        const list = [...currentList];
        const isExist = list.find(item => item._id === newItem._id);
        if (!isExist) return [...list, newItem];
        const indexOfItem = list.findIndex(item => item._id === newItem._id);
        list[indexOfItem] = newItem;
        return list;
    }

    const handleCancelRental = async (id) => {
        alert('Not support this function')
    }

    const handleDetailRental = async (rowId, licensePlate) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentToken}`,
                },
            };

            const res1 = await axios.get(`${API_URL}/api/bookings/bookingDetails/${rowId}`, config);
            const res2 = await axios.get(`${API_URL}/api/vehicles/vehicleDetails/${licensePlate}`, config);
            if (res1.status === 200 && res2.status === 200) {
                setDataBookingDetail(res1.data)
                setDataVehicle(res2.data)
                openModalDetail()
            } else {
                alert('Old booking is not support this feature')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalConfirm = () => {

    }

    const closeModalConfirm = () => {
        setIsOpenModalConfirm(false)
    }

    const closeModalDetail = () => {
        setIsOpenModalDetailBooking(false)
        setDataBookingDetail([])
        setDataVehicle([])
    }

    const openModalDetail = () => {
        setIsOpenModalDetailBooking(true)
    }

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                borderRight: '1px solid #ccc',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                borderRight: '1px solid #ccc'
            },
        },
    };

    const columns = [
        {
            name: 'No. ',
            cell: (row, index) => index + 1,
            width: "80px",
            center: true,
        },
        {
            name: 'License Plate',
            selector: 'licensePlate',
            center: true,
        },
        {
            name: 'Date Start',
            selector: 'bookingStart',
            cell: (row) => formatDate(row.bookingStart),
            sortable: true,
            center: true,

        },
        {
            name: 'Date End',
            selector: 'bookingEnd',
            cell: (row) => formatDate(row.bookingEnd),
            sortable: true,
            center: true,

        },
        {
            name: 'Total Price',
            selector: 'totalPrice',
            cell: (row) => formatMoney(row.totalPrice),
            sortable: true,
            center: true,

        },
        {
            name: 'Payment Status',
            selector: 'isPaid',
            sortable: true,
            cell: (row) => getPaymentStatus(row.isPaid),
            center: true,
        },
        {
            name: 'Booking Status',
            selector: 'bookingStatus',
            sortable: true,
            cell: (row) => <div style={{ color: getStatusColor(row.bookingStatus) }}>{row.bookingStatus}</div>,
            center: true,
        },
        {
            name: 'Action',
            cell: (row) => actions(row),
            center: true
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        getRentalHistory();
    }, [])

    return (
        <Container className="mb-5">
            <h3 className="mt-5">Lịch sử cho thuê</h3>

            {isLoading ? <LoadingCar className={'blank-container'}/> : (!data
                ? <p>Bạn chưa từng cho thuê xe nào cả <Link to="/vehicles" style={{ textDecoration: 'underline !important' }}>Cho thuê xe nào!</Link></p>
                : <div className="App">
                    <div className="input-group" style={{ marginBottom: '30px' }}>
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Search" />
                        </div>
                        <button type="button" className="btn btn-primary" style={{ marginLeft: '20px' }}>
                            <i className="ri-search-line"></i>
                        </button>
                    </div>

                    <DataTable
                        customStyles={customStyles}
                        columns={columns}
                        data={data}
                        pagination
                        paginationTotalRows={totalRows}
                        paginationPerPage={dataPerPage}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Rows per page:',
                            rangeSeparatorText: 'of',
                            noRowsPerPage: false,
                            selectAllRowsItem: false,
                            selectAllRowsItemText: 'All',
                        }}
                        onChangePage={handlePageChange}
                    />
                </div>)
            }

            <Modal ariaHideApp={false} isOpen={isOpenModalDetailBooking} onRequestClose={closeModalDetail} style={{
                content: {
                    width: '600px',
                    height: '650px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    padding: '0px'
                },
            }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Booking Detail</h3>
                        <button onClick={closeModalDetail} className="btn-close"></button>
                    </div>
                    <hr style={{ width: '100%', margin: '0px' }}></hr>
                    <div className="modal-body">
                        <div className="information-customer">
                            <h5 style={{ color: 'black' }}>Thông tin cá nhân:</h5>
                            <p>Customer name: {dataBookingDetail.custName}</p>
                            <p>Customer email: {dataBookingDetail.custEmail}</p>
                            <p>Customer address: {dataBookingDetail.custAddress}</p>
                            <p>Customer phone: {dataBookingDetail.custPhone}</p>
                        </div>

                        <div className="information-vehicle">
                            <h5 style={{ color: 'black' }}>Thông tin chiếc xe:</h5>
                            <p>License Plate: {dataVehicle.licensePlate}</p>
                            <p>Manufacturer: {dataVehicle.manufacturer}</p>
                            <p>Model: {dataVehicle.model}</p>
                            <p>Transmission: {dataVehicle.transmission}</p>
                            <p>Year Of Manufacturer: {dataVehicle.yearOfManufacturer}</p>
                        </div>


                        <div className="information-booking">
                            <h5 style={{ color: 'black' }}>Thông tin đặt xe:</h5>
                            <div className="d-flex "><p className="total_price">Total price:  </p>
                                <p className="total_price_money">{(dataBookingDetail?.totalPrice)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>

            <Modal ariaHideApp={false} isOpen={isOpenModalConfirm} onRequestClose={closeModalConfirm} style={{
                content: {
                    width: '500px',
                    height: '150px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    padding: '20px'
                },
            }}>
                <h4 style={{ marginBottom: '30px' }}>Are you sure want to confirm this booking?</h4>

                <div className="confirm_cancel_booking" style={{ marginTop: '20px' }}>
                    <button onClick={closeModalConfirm} className='btn btn-outline-secondary'>Cancel</button>
                    <button onClick={handleConfirmRental} className='btn btn-primary'>Confirm</button>
                </div>
            </Modal>

        </Container>
    )
}

export default RentalHistory