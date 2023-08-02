import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../../../context/authContext";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import "./style.css";
import { getBookingList } from '../../../../api/booking';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

function RevenueChart() {
    const { currentToken, userDecode } = useContext(AuthContext);
    const [dataBooking, setDataBooking] = useState([]);
    const [reportType, setReportType] = useState('quarter');

    const quarters = [1, 2, 3, 4];
    const months = [...Array(12)].map((_, i) => i + 1);
    const years = [2022, 2023, 2024, 2025];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentQuarter = Math.floor((currentMonth + 2) / 3);
    const currentYear = currentDate.getFullYear();

    const dataTotalPriceBookingsHandle = reportType === 'quarter'
        ? quarters.map((quarter) => {
            if (quarter <= currentQuarter) {
                const bookingsInQuarter = dataBooking.filter((booking) => {
                    if (
                        (booking.bookingStatus === 'Delivered' ||
                            booking.bookingStatus === 'Completed' ||
                            booking.bookingStatus === 'Done' ||
                            booking.bookingStatus === 'Delivering') &&
                        Math.floor((new Date(booking.createdAt).getMonth() + 3) / 3) === quarter &&
                        booking.totalPrice
                    ) {
                        return true;
                    }
                    return false;
                });

                const total = bookingsInQuarter.reduce((acc, item) => {
                    return acc + item.totalPrice;
                }, 0);
                return total;
            }
            return null;
        })
        : reportType === 'month'
            ? months.map((month) => {
                if (month <= currentMonth) {
                    const bookingsInMonth = dataBooking.filter((booking) => {
                        if (
                            (booking.bookingStatus === 'Delivered' ||
                                booking.bookingStatus === 'Completed' ||
                                booking.bookingStatus === 'Done' ||
                                booking.bookingStatus === 'Delivering') &&
                            new Date(booking.createdAt).getMonth() + 1 === month &&
                            booking.totalPrice
                        ) {
                            return true;
                        }
                        return false;
                    });

                    const total = bookingsInMonth.reduce((acc, item) => {
                        return acc + item.totalPrice;
                    }, 0);
                    return total;
                }
                return null;
            })
            : years.map((year) => {
                if (year <= currentYear) {
                    const bookingsInYear = dataBooking.filter((booking) => {
                        if (
                            (booking.bookingStatus === 'Delivered' ||
                                booking.bookingStatus === 'Completed' ||
                                booking.bookingStatus === 'Done' ||
                                booking.bookingStatus === 'Delivering') &&
                            new Date(booking.createdAt).getFullYear() === parseInt(year) &&
                            booking.totalPrice
                        ) {
                            return true;
                        }
                        return false;
                    });

                    const total = bookingsInYear.reduce((acc, item) => {
                        return acc + item.totalPrice;
                    }, 0);
                    return total;
                }
                return null
            });

    useEffect(() => {
        getBookingList(currentToken).then((res) => {
            setDataBooking(res);
        });
    }, [currentToken]);

    const labels = reportType === 'quarter'
        ? ['Q1', 'Q2', 'Q3', 'Q4']
        : reportType === 'month'
            ? [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
            : years.map(String);


    let dataRevenueHandle;

    if (reportType === 'quarter') {
        dataRevenueHandle = quarters.map((quarter, index) => {
            if (quarter <= currentQuarter) {
                return dataTotalPriceBookingsHandle[index] * 0.1;
            }
            return null;
        });
    } else if (reportType === 'month') {
        dataRevenueHandle = months.map((month, index) => {
            if (month <= currentMonth) {
                return dataTotalPriceBookingsHandle[index] * 0.1;
            }
            return null;
        });
    } else {
        dataRevenueHandle = years.map((year, index) => {
            if (year <= currentYear) {
                return dataTotalPriceBookingsHandle[index] * 0.1;
            }
            return null;
        });
    }

    const data = {
        height: '100%',
        labels,
        datasets: [
            {
                type: 'line',
                label: 'Total price of bookings',
                borderColor: 'rgb(255, 99, 132)',
                pointBorderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: dataTotalPriceBookingsHandle,
                tension: 0.1,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                type: 'line',
                label: 'Revenue',
                borderColor: 'rgb(162, 210, 255)',
                pointBorderColor: 'rgb(162, 210, 255)',
                borderWidth: 2,
                fill: false,
                data: dataRevenueHandle,
                tension: 0.1,
                backgroundColor: "rgb(162, 210, 255)"
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="row">
            <div className="col-3 col-sm-3 col-xxl-3 justify-content-center align-items-center d-flex">
                <div className="card flex-fill">
                    <div className="card-body pt-4">
                        <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                                <div className="mb-0 d-flex mt-4">
                                    <div className='title'>
                                        <div className='d-flex gap-2 title-price-dashboard'>
                                            <p >Booking Transaction: </p>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <p className="price-dashboard">5.430.000 VND</p>
                                        </div>

                                        <div className='d-flex gap-2 title-price-dashboard'>
                                            <p >Revenue: </p>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <p className="price-dashboard">543.000 VND</p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="d-inline-block ms-3">
                                <div className="stat">
                                    {/* <SlUser /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-9 col-sm-9 col-xxl-9 d-flex">
                <div className='barchart d-flex flex-column justify-content-center gap-1'>
                    <div className='d-flex justify-content-between'>
                        <h4>Business situation</h4>
                        <button className='btn btn-outline-secondary'>{currentYear}</button>
                    </div>
                    <div className='h-85'>
                        <Chart type='bar' data={data} options={options} />
                    </div>
                    <div className='d-flex justify-content-end gap-2 pt-1'>
                        <button
                            type='button'
                            className={`btn ${reportType === 'quarter' ? 'btn-outline-secondary' : 'btn-secondary'}`}
                            onClick={() => setReportType('quarter')}
                        >
                            Quarter
                        </button>
                        <button
                            type='button'
                            className={`btn ${reportType === 'month' ? 'btn-outline-secondary' : 'btn-secondary'}`}
                            onClick={() => setReportType('month')}
                        >
                            Month
                        </button>
                        <button
                            type='button'
                            className={`btn ${reportType === 'year' ? 'btn-outline-secondary' : 'btn-secondary'}`}
                            onClick={() => setReportType('year')}
                        >
                            Year
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default RevenueChart;
