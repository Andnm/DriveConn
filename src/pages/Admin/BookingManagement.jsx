import React, { useContext, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from "react-toastify";
import * as moment from "moment";

import SearchBar from "../../components/UI/SearchBar";
import { AuthContext } from "../../context/authContext";
import Pagination from "../../components/UI/Pagination";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { cancelBookingById, getBookingList, changeBookingStatus } from "../../api/booking";
import { DATE_FORMAT } from "../../constants/default";
import LoadingCar from '../../components/LoadingCar/LoadingCar'

const filterableFields = [{
    label: "Status",
    options: [
        { value: "Completed", label: "Completed" },
        { value: "Processing", label: "Processing" },
        { value: "Cancelled", label: "Cancelled" },
        { value: "Done", label: "Done" }],
    field: "bookingStatus",
}, {
    label: "Has driver", options: [{ value: true, label: "Yes" }, { value: false, label: "No" },], field: "hasDriver",
},];

const messageKey = "ADMIN_USER_MANAGEMENT";
const itemsPerPage = 10;

const BookingManagement = () => {
    const { currentToken } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        handleSearchBar();
    }, []);

    useEffect(() => {
        handleSearchBar();
    }, [page]);

    const handleSearchBar = (criteria = {}) => {
        getBookingList(currentToken).then((res) => {
            const filteredList = res
                .filter(item => item.role_id?.roleName !== 'Admin')
                .filter(item => {
                    if (criteria?.filter?.field) {
                        const { field, value } = criteria.filter;
                        return String(item[field]) === value;
                    }
                    return true;
                })
                .filter(item => {
                    if (criteria?.keyword) {
                        return item.email?.toLowerCase().includes(criteria?.keyword?.toLowerCase()) || `${item.firstName} ${item.lastName}`.toLowerCase().includes(criteria?.keyword.toLowerCase());
                    }
                    return true;
                })
                .reverse();

            setMaxPage(filteredList.length % itemsPerPage === 0 && filteredList.length !== 0 ? filteredList.length / itemsPerPage : Math.floor(filteredList.length / itemsPerPage) + 1);

            setBookings(filteredList.slice(itemsPerPage * (page - 1), itemsPerPage * page));
        });
    };

    const confirmPayment = (bookingId) => {
        confirmAlert({
            message: 'Do you want to confirm payment this booking?', buttons: [{
                label: 'Yes', onClick: () => {
                    changeBookingStatus(currentToken, bookingId).then(res => {
                        if (res) {
                            toast.success("Confirm successfully!");
                            handleSearchBar();
                        }
                    }).catch(e => {
                        toast.error(e.message);
                    });
                },
            }, {
                label: 'No', onClick: null,
            }]
        });
    }

    const confirmTransferred = (bookingId) => {
        confirmAlert({
            message: 'Would you like to confirm that the money has been transferred to the owner of this booking?', buttons: [{
                label: 'Yes', onClick: () => {
                    changeBookingStatus(currentToken, bookingId).then(res => {
                        if (res) {
                            toast.success("Confirm successfully!");
                            handleSearchBar();
                        }
                    }).catch(e => {
                        toast.error(e.message);
                    });
                },
            }, {
                label: 'No', onClick: null,
            }]
        });
    }

    const getColor = (status) => {
        return status === 'Completed' ? "text-success" : (status === 'Processing' ? "text-warning" : (status === 'Done') ? "text-secondary" : "text-danger");
    };

    const onChangePage = (page) => {
        setPage(page);
    }

    return (
        <div className="pt-5"><SearchBar
            filterableFields={filterableFields}
            onSearch={handleSearchBar}
            messageKey={messageKey}
        />
            {bookings.length > 0
                ?
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Thao tác
                                </th>
                                <th scope="col" style={{ width: '15%' }}>
                                    Biển số xe
                                </th>
                                <th scope="col">
                                    Từ
                                </th>
                                <th scope="col">
                                    Đến
                                </th>
                                <th scope="col" style={{ width: '15%' }}>
                                    Khách hàng
                                </th>
                                <th scope="col">
                                    Tổng tiền
                                </th>
                                <th scope="col">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {bookings.map((booking) => (<tr key={booking._id}>
                                    <td className="d-flex">
                                        {
                                            booking.bookingStatus === "Processing"
                                                ?
                                                <i className="ri-bank-card-line cursor-pointer mx-2" title="Confirm"
                                                    onClick={() => confirmPayment(booking._id)}>
                                                </i>
                                                :
                                                (booking.bookingStatus === "Completed"
                                                    ?
                                                    <i className="ri-wallet-3-line cursor-pointer mx-2" title="Confirm"
                                                        onClick={() => confirmTransferred(booking._id)}>
                                                    </i>
                                                    : 'N/A'
                                                )
                                        }
                                    </td>
                                    <td>{booking.vehicle_id.licensePlate ?? 'N/A'}</td>
                                    <td>{moment(booking.bookingStart).format(DATE_FORMAT) ?? 'N/A'}</td>
                                    <td>{moment(booking.bookingEnd).format(DATE_FORMAT) ?? 'N/A'}</td>
                                    <td
                                        className="text-truncate"
                                        title={`${booking.user_id?.firstName} ${booking.user_id?.lastName}`}
                                    >
                                        {`${booking.user_id?.firstName} ${booking.user_id?.lastName}`}
                                    </td>
                                    <td>{booking.totalPrice ?? 0}</td>
                                    <td className={getColor(booking.bookingStatus)}>
                                        {booking.bookingStatus ?? 'N/A'}
                                    </td>
                                </tr>))}
                            </>
                        </tbody>
                    </table>

                    <Pagination maxPage={maxPage} onChangePage={onChangePage} />
                </>
                :
                <LoadingCar />
            }
        </div>
    )
}

export default BookingManagement;