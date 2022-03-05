import React from 'react';
import { Paper } from "@mui/material"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import useStyles from './styles'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TotalEmissionChart = () => {
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
                text: 'Total Emission',
                font: {
                    size: 18,
                    family: 'Roboto'
                }
            },
        }
    };

    const labels = ['2019', '2020', '2021', '2022'];

    const data = {
        labels,
        datasets: [
            {
                label: 'CO2',
                data: [150, 400, 800, 300, 750],
                backgroundColor: '#b33dc6',
                maxBarThickness: 20,
                borderRadius: 3
            },
        ],
    };


    return (
        <Paper className={classes.container} >
            <Bar options={options} data={data} height={190} />
        </Paper >
    )
}

export default TotalEmissionChart
