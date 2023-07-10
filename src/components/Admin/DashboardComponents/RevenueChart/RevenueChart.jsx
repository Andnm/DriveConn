import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from "../../../../context/authContext";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import "./style.css"
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
    const { currentToken } = useContext(AuthContext);

    const getCount = () => {

        getBookingList(currentToken).then((res) => {

        });

    }

    useEffect(() => {
        getCount();
    }, []);

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
        height: '100%',
        labels,
        datasets: [
            {
                type: 'line',
                label: 'Revenue',
                borderColor: 'rgb(255, 99, 132)',
                pointBorderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
                tension: 0.1,
                backgroundColor: "rgb(255, 99, 132)"
            },
        ],
    };
    const option = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    }
    return (
        <div className='barchart d-flex flex-column justify-content-center gap-1'>
            <h4>Business situation</h4>
            <div className='h-85'>
                <Chart type='bar' data={data} options={option} />
            </div>
            {/* <div className=' d-flex justify-content-end gap-2 pt-1'>
                <button type="button" className="btn btn-secondary">Quarter </button>
                <button type="button" className="btn btn-secondary">Month</button>
                <button type="button" className="btn btn-secondary">Year</button>
            </div> */}
        </div>
    )
}

export default RevenueChart