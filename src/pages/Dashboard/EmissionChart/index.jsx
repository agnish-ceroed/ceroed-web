import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from "@mui/material"
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import _ from 'lodash';
import { getEmissionTypes } from '../../../redux/actions';
import { emissionTypes } from '../../../constants';

import useStyles from './styles'

ChartJS.register(ArcElement, Tooltip, Legend);

const EmissionChart = () => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const emissionData = useSelector(state => state.dashboard.getEmissionTypes.data);

    useEffect(() => {
        dispatch(getEmissionTypes());
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
        labels: _.map(emissionData, (item) => emissionTypes.find(data => data.id === item.type).title),
        datasets: [
            {
                label: 'Emissions',
                data: _.map(emissionData, item => item.total_co2e),
                backgroundColor: [
                    '#ea5545',
                    '#5ad45a',
                    '#ffa300',
                    '#488f31',
                    '#6aa040',
                    '#89b050',
                    '#a7c162',
                    '#c5d275',
                    '#de425b',
                    '#faa15e'
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
