import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

export default function HorizontalBarChart(props) {

    const { labels, dataSets } = props;

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };

    const data = {
        labels,
        datasets: dataSets,
    };

    return (
        <div style={{ width: "calc(100vw - calc(30% + 40px))", margin: "auto" }}>
            <HorizontalBar
                options={options}
                data={data}
            />
        </div>
    )
}
