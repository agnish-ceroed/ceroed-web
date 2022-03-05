import React from 'react';
import { Paper } from "@mui/material"
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

import useStyles from './styles'

ChartJS.register(ArcElement, Tooltip, Legend);

const EmissionChart = () => {
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
                text: 'Emission Types',
                font: {
                    size: 18,
                    family: 'Roboto'
                }
            },
        },
        maintainAspectRatio: false
    };

    const data = {
        labels: ['Stationary combustion', 'Mobile combustion', 'Transport combustion'],
        datasets: [
            {
                label: 'Emissions',
                data: [60, 30, 10],
                backgroundColor: [
                    '#ea5545',
                    '#5ad45a',
                    '#ffa300',
                ]
            },
        ],
    };

    return (
        <Paper className={classes.container}>
            <Doughnut data={data} options={options} height={300} />
        </Paper>
    )
}

export default EmissionChart
