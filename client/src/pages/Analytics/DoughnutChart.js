import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Tableau20 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau";

export default function DoughnutChart(props) {

    const { labels, chartData } = props;

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

    const data = {
        labels: labels,
        datasets: [{
            data: chartData,
            backgroundColor: colorArray.reverse(),
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
