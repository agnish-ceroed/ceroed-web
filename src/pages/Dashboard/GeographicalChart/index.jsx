import React from 'react';
import { Paper } from "@mui/material"
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

import useStyles from './styles'

ChartJS.register(ArcElement, Tooltip, Legend);

const GeographicalChart = () => {
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
                text: 'Geographical Units',
                font: {
                    size: 18,
                    family: 'Roboto'
                }
            },
        },
        maintainAspectRatio: false
    };

    const data = {
        labels: ['India', 'Singapore', 'China'],
        datasets: [
            {
                label: 'Emissions',
                data: [60, 30, 10],
                backgroundColor: [
                    '#e60049',
                    '#7c1158',
                    '#b2e061',
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

export default GeographicalChart
