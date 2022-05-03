import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

export default function HorizontalBarChart(props) {

    const { label, labels, chartData, } = props;

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
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: label.axisLabelTwo,
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: label.axisLabelOne,
                },
                ticks: {
                    callback: function (value) {
                        return 'Rs ' + value.toLocaleString();
                    }
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
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
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
