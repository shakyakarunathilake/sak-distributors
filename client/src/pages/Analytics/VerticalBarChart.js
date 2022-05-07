import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Tableau20 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau";

export default function VerticalBarChar(props) {

    const { label, labels, chartData, } = props;

    const colorArray = [
        ...Tableau20, ...Tableau20,
        ...Tableau20, ...Tableau20,
        ...Tableau20, ...Tableau20,
        ...Tableau20, ...Tableau20,
        ...Tableau20, ...Tableau20,
        ...Tableau20, ...Tableau20,
        ...Tableau20, ...Tableau20,
        ...Tableau20, ...Tableau20,
        ...Tableau20, ...Tableau20
    ]

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
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: label.axisLabelTwo,
                }
            }]
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: label.label,
                data: chartData,
                backgroundColor: colorArray.reverse(),
            }
        ]
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