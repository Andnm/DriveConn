import React, { useContext, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from "react-toastify";
import * as moment from "moment";

import SearchBar from "../../components/UI/SearchBar";
import { AuthContext } from "../../context/authContext";
import Pagination from "../../components/UI/Pagination";
import 'react-confirm-alert/src/react-confirm-alert.css';
import empty from "../../assets/all-images/empty.png";
import { cancelBookingById, getBookingList } from "../../api/booking";
import { DATE_FORMAT } from "../../constants/default";
import LoadingCar from '../../components/LoadingCar/LoadingCar'

const filterableFields = [{
    label: "Status",
    options: [
        { value: "Completed", label: "Completed" },
        { value: "Processing", label: "Processing" },
        { value: "Cancelled", label: "Cancelled" }],
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

    const cancelBooking = (bookingId) => {
        confirmAlert({
            message: 'Do you want to cancel this booking?', buttons: [{
                label: 'Yes', onClick: () => {
                    cancelBookingById(currentToken, bookingId).then(res => {
                        if (res) {
                            toast.success("Cancel successfully!");
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
        return status === 'Completed' ? "text-success" : (status === 'Processing' ? "text-warning" : "text-danger");
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
                                    Actions
                                </th>
                                <th scope="col" style={{ width: '15%' }}>
                                    License plate
                                </th>
                                <th scope="col">
                                    From
                                </th>
                                <th scope="col">
                                    To
                                </th>
                                <th scope="col" style={{ width: '15%' }}>
                                    Customer
                                </th>
                                <th scope="col">
                                    Price
                                </th>
                                <th scope="col">
                                    Has driver
                                </th>
                                <th scope="col">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {bookings.map((booking) => (<tr key={booking._id}>
                                    <td className="d-flex">
                                        {booking.bookingStatus === "Processing" ?
                                            <i className="ri-close-circle-line cursor-pointer mx-2" title="Cancel"
                                                onClick={() => cancelBooking(booking._id)}></i> : 'N/A'}
                                    </td>
                                    <td>{booking.licensePlate ?? 'N/A'}</td>
                                    <td>{moment(booking.bookingStart).format(DATE_FORMAT) ?? 'N/A'}</td>
                                    <td>{moment(booking.bookingEnd).format(DATE_FORMAT) ?? 'N/A'}</td>
                                    <td
                                        className="text-truncate"
                                        title={`${booking.user_id?.firstName} ${booking.user_id?.lastName}`}
                                    >
                                        {`${booking.user_id?.firstName} ${booking.user_id?.lastName}`}
                                    </td>
                                    <td>{booking.totalPrice ?? 0}</td>
                                    <td>{booking.hasDriver ? 'Yes' : 'No'}</td>
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