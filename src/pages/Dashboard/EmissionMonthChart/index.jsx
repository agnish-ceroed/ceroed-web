import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from "@mui/material"
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    registerables as registerablesJS
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import { getEmissionsByMonth } from '../../../redux/actions';
import useStyles from './styles'

ChartJS.register(...registerablesJS)
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);

const EmissionMonthChart = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const emissionData = useSelector(state => state.dashboard.getEmissionsByMonth.data);
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
                type: 'line',
                label: 'Total CO2e(tonnes)',
                data: emissionData.map(item => { return item.total_co2e }),
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
            },
            {
                type: 'bar',
                label: 'Total CO2(tonnes)',
                data: emissionData.map(item => { return item.total_co2 }),
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                type: 'bar',
                label: 'Total CH4(tonnes)',
                data: emissionData.map(item => { return item.total_ch4 }),
                backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                type: 'bar',
                label: 'Total N2O(tonnes)',
                data: emissionData.map(item => { return item.total_n2o }),
                backgroundColor: '#003f5c',
            },
        ],
    };

    useEffect(() => {
        dispatch(getEmissionsByMonth(props.filter));
    }, [dispatch, props.filter]);

    return (
        <Paper className={classes.container}>
            <Chart data={data} options={options} height={150} />
        </Paper>
    )
}

export default EmissionMonthChart
