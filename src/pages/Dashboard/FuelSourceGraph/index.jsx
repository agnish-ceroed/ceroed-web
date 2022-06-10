import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography } from "@mui/material";

import CeroSankeyGraph from '../../../components/CeroSankeyGrpah';
import { getFuelSourceEmission } from '../../../redux/actions';
import { STATUS } from '../../../redux/constants';
import useStyles from './styles';

const FuelSourceGraph = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const graphData = useSelector(state => state.dashboard.getFuelSource.data);
    const isLoading = useSelector(state => state.dashboard.getFuelSource.status) === STATUS.RUNNING;

    useEffect(() => {
        dispatch(getFuelSourceEmission(props.filter));
    }, [dispatch, props.filter]);

    return (
        <Paper className={classes.container}>
            <Typography className={classes.graphTitle} >Fuel Source Emission</Typography>
            <CeroSankeyGraph
                data={graphData}
                width={window.innerWidth - 256 - 36*2}
                isLoading={isLoading}
                noDataText="Fuel Source Data not available for this filter"
            />
        </Paper>
    )
}

export default FuelSourceGraph;
