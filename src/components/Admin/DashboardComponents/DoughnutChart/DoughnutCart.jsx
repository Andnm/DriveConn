import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import "./style.css";
import { FcCalendar, FcCancel, FcCheckmark } from "react-icons/fc"
import axios from 'axios';
import API_URL from '../../../../api/Router';
import { Colors } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
    const [labels, setLabels] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [dataService, setDataService] = useState([]);
    const [total, setTotal] = useState(0);

    const labelColor = ["#7AA874", "#F7DB6A", "#EBB02D", "#D864A9", "#245953", "#19A7CE", "#F6F1F1", "#635985", "#ABC270"]

    // const getData = async () => {
    //     try {
    //         const { data } = await axios.get(`${ROUTER}/api/dashboard/service`);
    //         const labelsFormat = [];
    //         const dataFormat = [];
    //         const dataService = [];
    //         const { formatServiceList } = data;
    //         for (const key in formatServiceList) {
    //             labelsFormat.push(formatServiceList[key].name);
    //             dataFormat.push(formatServiceList[key].quantity);
    //             dataService.push(formatServiceList[key])
    //         }
    //         setLabels(labelsFormat);
    //         setQuantity(dataFormat);
    //         setTotal(data.total);
    //         setDataService(dataService);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getData();
    // }, [])


    const data = {
        height: "100px",
        labels: labels,
        datasets: [
            {
                label: ' Book quantity',
                data: quantity,
                backgroundColor: labelColor,
                // borderColor: [
                //     '#5fb2ff',
                //     'rgb(255, 99, 132)',
                //     '#cccccc',
                // ],
                borderWidth: 1,
            },
        ],
    };

    const option = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                display: false
            },

        },
    }

    return (
        <>
            <div className='doughnut'>
                <Doughnut data={data} options={option} />
            </div>
            <div className='custom-legend d-flex flex-column py-3' style={{ paddingLeft: "20px" }}>
                <table>
                    <tr>
                        <th>Color</th>
                        <th>Service</th>
                        <th>Percent</th>
                    </tr>
                    {
                        dataService.map((service, index) =>
                            <tr>
                                <th style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <div style={{ backgroundColor: labelColor[index], height: "30px", width: "30px" }}>

                                    </div>
                                </th>
                                <th style={{ verticalAlign: "middle", }}>{service.name}</th>
                                <th>{Number.parseFloat((service.quantity * 100 / total).toFixed(2)).toFixed(2)}%</th>
                            </tr>
                        )
                    }
                </table>
            </div>
        </>
    )
}

export default DoughnutChart
