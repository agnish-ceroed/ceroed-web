import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from "@mui/material"
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import _ from 'lodash';

import { getEmissionsByMonth } from '../../../redux/actions';
import useStyles from './styles'

ChartJS.register(ArcElement, Tooltip, Legend);

const EmissionMonthChart = () => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const emissionData = useSelector(state => state.dashboard.getEmissionsByMonth.data);
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

    const options = {
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
                text: 'GHG Emission - Month',
                font: {
                    size: 18,
                    family: 'Roboto'
                }
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Total CO2e',
                data: emissionData.map(item => { return item.total_co2e }),
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Total CO2',
                data: emissionData.map(item => { return item.total_co2 }),
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'Total CH4',
                data: emissionData.map(item => { return item.total_ch4 }),
                backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                label: 'Total N2O',
                data: emissionData.map(item => { return item.total_n2o }),
                backgroundColor: '#003f5c',
            },
        ],
    };

    useEffect(() => {
        dispatch(getEmissionsByMonth());
    }, [dispatch]);

    return (
        <Paper className={classes.container}>
            <Bar data={data} options={options} height={150} />
        </Paper>
    )
}

export default EmissionMonthChart
