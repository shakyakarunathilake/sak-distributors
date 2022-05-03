import React from 'react';
import { Line } from 'react-chartjs-2';

import { Tableau20 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau";

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
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: label.axisLabelOne,
                },
                ticks: {
                    callback: function (value) {
                        return 'Rs ' + value.toLocaleString();
                    }
                },
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: label.axisLabelTwo,
                },
            }],
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: label.label,
                data: chartData,
                borderColor: Tableau20[0],
                backgroundColor: Tableau20[0],
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
