import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart(props) {

    const { label, labels, chartData, } = props;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: label,
                data: chartData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                fill: false
            }
        ]
    };

    return (
        <div style={{ width: "calc(100vw - calc(30% + 40px))", margin: "auto auto" }}>
            <Line options={options} data={data} />
        </div>
    )
}
