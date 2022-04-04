import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from "@mui/material"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';

import { getEmissionYear } from '../../../redux/actions';

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
    const dispatch = useDispatch();

    const emissionData = useSelector(state => state.dashboard.getEmissionYear.data);

    useEffect(() => {
        dispatch(getEmissionYear());
    }, []);

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
                text: 'Total CO2 emission per year',
                font: {
                    size: 18,
                    family: 'Roboto'
                }
            },
        }
    };

    const data = {
        labels: _.map(emissionData, (item) => item.year),
        datasets: [
            {
                label: 'Total Emission (tonnes)',
                data: _.map(emissionData, (item) => item.total_co2e),
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
