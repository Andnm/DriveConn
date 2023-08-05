import React, { useContext, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from "react-toastify";
import * as moment from "moment";

import SearchBar from "../../components/UI/SearchBar";
import { AuthContext } from "../../context/authContext";
import Pagination from "../../components/UI/Pagination";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getBookingList, changeBookingStatus } from "../../api/booking";
import { DATE_FORMAT } from "../../constants/default";
import LoadingCar from '../../components/LoadingCar/LoadingCar'
import { formatPriceNumber } from '../../utils/utils';
import DrawerBooking from '../../components/Drawer/DrawerBooking';

const filterableFields = [{
    label: "Status",
    options: [
        { value: "All", label: "All" },
        { value: "Pending", label: "Pending" },
        { value: "Paying", label: "Paying" },
        { value: "Processing", label: "Processing" },
        { value: "Delivering", label: "Delivering" },
        { value: "Delivered", label: "Delivered" },
        { value: "Completed", label: "Completed" },
        { value: "Cancelled", label: "Cancelled" },
        { value: "Done", label: "Done" }
    ],
    field: "status",
},];

const messageKey = "ADMIN_USER_MANAGEMENT";
const itemsPerPage = 10;

const BookingManagement = () => {
    const { currentToken } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [bookingDetail, setBookingDetail] = useState("");

    useEffect(() => {
        handleSearchBar();
    }, []);

    useEffect(() => {
        handleSearchBar();
    }, [page]);

    const handleSearchBar = (criteria = {}) => {
        setIsLoading(true)
        getBookingList(currentToken).then((res) => {
            const filteredList = res
                .filter((item) => item.role_id?.roleName !== "Admin")
                .filter((item) => {
                    if (criteria?.filter?.field) {
                        const { field, value } = criteria.filter;
                        if (field === "status") {
                            return value === "All" ? true : item?.bookingStatus === value;
                        }
                        return String(item[field]) === value;
                    }
                    return true;
                })
                .filter((item) => {
                    if (criteria?.keyword) {
                        return (
                            item.email?.toLowerCase().includes(criteria?.keyword?.toLowerCase()) ||
                            `${item.firstName} ${item.lastName}`.toLowerCase().includes(criteria?.keyword.toLowerCase())
                        );
                    }
                    return true;
                })
                .sort((a, b) => {
                    if (a.createdAt < b.createdAt) return 1;
                    if (a.createdAt > b.createdAt) return -1;
                    return 0;
                });

            setMaxPage(filteredList.length % itemsPerPage === 0 && filteredList.length !== 0 ? filteredList.length / itemsPerPage : Math.floor(filteredList.length / itemsPerPage) + 1);

            setBookings(filteredList.slice(itemsPerPage * (page - 1), itemsPerPage * page));
            setIsLoading(false);
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
        switch (status) {
            case 'Pending':
                return "text-warning";
            case 'Paying':
                return "text-warning";
            case 'Processing':
                return "text-primary";
            case 'Delivering':
                return "text-info";
            case 'Delivered':
                return "text-warning";
            case 'Completed':
                return "text-success";
            case 'Done':
                return "text-dark";
            case 'Cancelled':
                return "text-danger";
            default:
                return "text-warning";
        }
    };

    const onChangePage = (page) => {
        setPage(page);
    }

    const clickToViewDetailBooking = (booking) => {
        setIsDrawerOpen(true);
        setBookingDetail(booking)
    }

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="pt-5">
            <SearchBar
                filterableFields={filterableFields}
                onSearch={(criteria) => handleSearchBar(criteria)}
                messageKey={messageKey}
            />
            {!isLoading ?
                bookings.length > 0
                    ?
                    <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        Actions
                                    </th>
                                    <th scope="col" style={{ width: '15%' }}>
                                        License Plate
                                    </th>
                                    <th scope="col">
                                        Booking Creation
                                    </th>
                                    <th scope="col">
                                        Booking Start
                                    </th>
                                    <th scope="col">
                                        Booking End
                                    </th>
                                    <th scope="col" style={{ width: '15%' }}>
                                        Customer
                                    </th>
                                    <th scope="col">
                                        Total Price
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
                                                        : null
                                                    )
                                            }
                                            <i className="ri-file-info-line cursor-pointer mx-2"
                                                title="Detail"
                                                onClick={() => clickToViewDetailBooking(booking)}
                                            />
                                        </td>
                                        <td>{booking.vehicle_id.licensePlate ?? 'N/A'}</td>
                                        <td>{moment(booking.createdAt).format(DATE_FORMAT) ?? 'N/A'}</td>
                                        <td>{moment(booking.bookingStart).format(DATE_FORMAT) ?? 'N/A'}</td>
                                        <td>{moment(booking.bookingEnd).format(DATE_FORMAT) ?? 'N/A'}</td>
                                        <td
                                            className="text-truncate"
                                            title={`${booking.user_id?.lastName} ${booking.user_id?.firstName}`}
                                        >
                                            {`${booking.user_id?.lastName} ${booking.user_id?.firstName}`}
                                        </td>
                                        <td>{formatPriceNumber(booking.totalPrice) ?? 0}</td>
                                        <td className={getColor(booking.bookingStatus)}>
                                            {booking.bookingStatus ?? 'N/A'}
                                        </td>
                                    </tr>))}
                                </>
                            </tbody>
                        </table>
                        {isDrawerOpen && <DrawerBooking isOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer} content={bookingDetail} />}

                        <Pagination maxPage={maxPage} onChangePage={onChangePage} />
                    </>
                    :
                    <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        Actions
                                    </th>
                                    <th scope="col" style={{ width: '15%' }}>
                                        License Plate
                                    </th>
                                    <th scope="col">
                                        Booking Creation
                                    </th>
                                    <th scope="col">
                                        Booking Start
                                    </th>
                                    <th scope="col">
                                        Booking End
                                    </th>
                                    <th scope="col" style={{ width: '15%' }}>
                                        Customer
                                    </th>
                                    <th scope="col">
                                        Total Price
                                    </th>
                                    <th scope="col">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <div className='w-100 d-flex justify-content-center'>
                            No data matching
                        </div>
                    </>
                :
                <LoadingCar />
            }
        </div>
    )
}

export default BookingManagement;