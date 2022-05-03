import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart(props) {

    let colors = [];

    while (colors.length < 1000) {
        colors.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
    }

    function rand(frm, to) {
        return (Math.random() * (to - frm)) + frm;
    }

    const { labels, chartData } = props;

    const data = {
        labels: labels,
        datasets: [{
            data: chartData,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
        }],
    };

    return (
        <div style={{ width: "calc(100vw - calc(30% + 40px))", margin: "auto" }}>
            <Doughnut
                data={data}
            />
        </div>
    )
}
