import React from 'react';
import { Paper } from "@mui/material"
import { Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    registerables as registerablesJS
} from 'chart.js';

import useStyles from './styles'

ChartJS.register(...registerablesJS)
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const classes = useStyles()

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    fontColor: 'rgba(0,0,0,.4)'
                },
                align: 'end',
                position: 'top',
            },
            title: {
                align: 'start',
                display: true,
                text: 'Business Units',
                font: {
                    size: 18,
                    family: 'Roboto'
                }
            },
        },
    };

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [100, 200, 150, 260, 100, 500],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ]
    };

    return (
        <Paper className={classes.container}>
            <Line options={options} data={data} height={170} />;
        </Paper>
    )
}

export default LineChart
