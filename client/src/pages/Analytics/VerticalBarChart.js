import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function VerticalBarChar(props) {

    const { labels, dataSets } = props;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const data = {
        labels,
        datasets: dataSets
    };

    return (
        <div style={{ width: "calc(100vw - calc(30% + 40px))", margin: "auto auto" }}>
            <Bar
                options={options}
                data={data}
            />
        </div>
    )
}