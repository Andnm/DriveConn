import { Container } from "reactstrap";
import React, { useEffect, useContext, useState } from "react";
import './style.css'
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import API_URL from "../../api/Router";
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import './style.css'
import Loading from 'react-loading';
import Modal from 'react-modal'
import { toast } from "react-toastify";
import toastOption from "../../config/toast";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const BookingHistory = () => {
  const { currentToken, userDecode } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const dataPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [rowId, setRowId] = useState('')
  const [isOpenModalDetailBooking, setIsOpenModalDetailBooking] = useState(false)
  const [dataBookingDetail, setDataBookingDetail] = useState([]);
  const [dataVehicle, setDataVehicle] = useState([])

  const getBookingHistory = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      };

      const res = await axios.get(`${API_URL}/api/bookings`, config);
      if (res.status === 200) {
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

  const actions = (row) => {
    if (row.bookingStatus === 'Processing') {
      return (
        <div>
          <button class="btn btn-sm btn-outline-danger mx-1" onClick={() => openModalConfirm(row._id)}>
            <i class="ri-close-line"></i>
          </button>
          <button class="btn btn-sm btn-outline-primary mx-1" onClick={() => handleDetailRental(row._id, row.licensePlate)}>
            <i class="ri-edit-box-line"></i>
          </button>
        </div>
      )
    } else {
      return (
        <button class="btn btn-sm btn-outline-primary mx-1" onClick={() => handleDetailRental(row._id)}>
          <i class="ri-edit-box-line"></i>
        </button>
      );
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

  const handleCancelRental = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      };

      const res = await axios.get(`${API_URL}/api/bookings/${rowId}/cancel`, config);
      console.log(res)
      if (res.status === 200) {
        setData(list => updateList(res.data, list))
        closeModalConfirm()
        toast.success('Cancel Successfully!', toastOption)
      }
    } catch (error) {
      console.log(error.message);
    }
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
      alert('Old booking is not support this feature')
    }
  }

  const closeModalConfirm = () => {
    setIsOpenModal(false)
  }

  const openModalConfirm = (id) => {
    setRowId(id)
    setIsOpenModal(true)
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
    getBookingHistory();
  }, [])

  const [prescriptionContent, setPrescriptionContent] = useState('');

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <Container className="mb-5">
      <h3 className="mt-5">Booking History </h3>

      {isLoading ? <Loading type="spin" color="#000" /> :
        <>{!data
          ? <p>You have never booked, just bring your ass to travel and rent a car. <Link to="/vehicles" style={{ textDecoration: 'underline !important' }}>Booking now!</Link></p>
          : <div>

            <div class="input-group" style={{ marginBottom: '30px' }}>
              <div class="form-outline">
                <input type="search" id="form1" class="form-control" placeholder="Search" />
              </div>
              <button type="button" class="btn btn-primary" style={{ marginLeft: '20px' }}>
                <i class="ri-search-line"></i>
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
          </div>
        }</>
      }

      <Modal ariaHideApp={false} isOpen={isOpenModal} onRequestClose={closeModalConfirm} style={{
        content: {
          width: '500px',
          height: '380px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          padding: '20px'
        },
      }}>
        <h4 style={{ marginBottom: '30px' }}>Are you sure want to cancel this booking?</h4>
        <div>
          <div class="form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '200px' }}></textarea>
            <label for="floatingTextarea2">Reason for canceling</label>
          </div>
        </div>

        <div className="confirm_cancel_booking" style={{ marginTop: '20px' }}>
          <button onClick={closeModalConfirm} className='btn btn-outline-secondary'>Cancel</button>
          <button onClick={handleCancelRental} className='btn btn-primary'>Confirm</button>
        </div>
      </Modal>


      <Modal ariaHideApp={false} isOpen={isOpenModalDetailBooking} onRequestClose={closeModalDetail} style={{
        content: {
          width: '600px',
          height: '370px',
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
          <div class="modal-body">
            <p>License Plate: {dataVehicle.licensePlate}</p>
            <p>Manufacturer: {dataVehicle.manufacturer}</p>
            <p>Model: {dataVehicle.model}</p>
            <p>Transmission: {dataVehicle.transmission}</p>
            <p>Year Of Manufacturer: {dataVehicle.yearOfManufacturer}</p>
            <p>Total price: {dataBookingDetail?.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
          </div>
        </div>


      </Modal>
    </Container>
  )
}

export default BookingHistory