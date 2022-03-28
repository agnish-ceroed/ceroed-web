import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from "@mui/material"
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import _ from 'lodash';
import { getEmissionRegion } from '../../../redux/actions';
import { emissionTypes } from '../../../constants';

import useStyles from './styles'

ChartJS.register(ArcElement, Tooltip, Legend);

const GeographicalChart = () => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const emissionData = useSelector(state => state.dashboard.getEmissionRegion.data);

    useEffect(() => {
        dispatch(getEmissionRegion());
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
        labels: _.map(emissionData, (item) => emissionTypes.find(data => data.id === item.country).title),
        datasets: [
            {
                label: 'Emissions',
                data: _.map(emissionData, item => item.total_co2e),
                backgroundColor: [
                    '#e60049',
                    '#665191',
                    '#7c1158',
                    '#003f5c',
                    '#2f4b7c',
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
