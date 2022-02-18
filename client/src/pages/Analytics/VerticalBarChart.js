import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

export const options = {
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [156, 126, 684, 564, 654, 315, 456],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [124, 196, 376, 455, 254, 786, 553],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export default function VerticalBarChart() {

    return (
        <div>

            <h1 style={{ textAlign: 'center' }}>
                Vertical Bar Chart
            </h1>

            <div style={{ width: 600, margin: "0 auto" }}>
                <Bar
                    options={options}
                    data={data}
                />
            </div>

        </div >
    )
}