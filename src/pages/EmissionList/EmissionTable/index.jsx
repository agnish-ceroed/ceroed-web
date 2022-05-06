import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Chip } from "@mui/material";
import CreateIcon from '@mui/icons-material/CreateOutlined';

import {
    StationaryColumns,
    MobileColumns,
    PurchasedElectricityColumns,
    WaterDischargeColumns,
    WaterConsumptionColumns,
    RefrigerantsColumns,
    TransportationColumns,
    WasteCombustionColumns,
} from "./TableColumns";
import CeroTable from '../../../components/CeroTable';
import useStyles from "./styles";

const EmissionTable = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { emissionType, emissionData, onLoadMore } = props

    const getTableColumn = {
        stationary_combustion: StationaryColumns,
        mobile_combustion: MobileColumns,
        purchased_electricity: PurchasedElectricityColumns,
        water_discharge: WaterDischargeColumns,
        water_consumption: WaterConsumptionColumns,
        refrigerants: RefrigerantsColumns,
        transportation: TransportationColumns,
        waste: WasteCombustionColumns
    }

    const onSelectEmissionData = (emission) => {
        navigate(`/emissions/${emissionType}/details/${emission.id}`);
    };

    const onEditEmissionData = (e, emission) => {
        e.stopPropagation()
        e.preventDefault()
        navigate(`/emissions/edit/${emissionType}/${emission}`);
    };

    const getStatus = (status) => {
        if (status === 'approved') {
            return <Chip label={status} color="primary" variant='outlined' />
        } else if (status === 'audited') {
            return <Chip label={status} color="secondary" variant='outlined' />
        } else if (status === 'reported') {
            return <Chip label={status} color="warning" variant='outlined' />
        } else {
            return <Chip label={status} color="info" variant='outlined' />
        }
    };

    const getEmissionData = () => emissionData.map((item) => ({
        ...item,
        year: `${item.month}/${item.year}`,
        amount: `${item.amount}  ${item.unit}`,
        status: getStatus(item.status),
        treatment_required: item.treatment_required ? "Yes" : "No",
        action: (
            <Box className={classes.actionContainer}>
                {/* <CeroButton className={classes.button} buttonText={item.status} /> */}
                <IconButton className={classes.editIcon} onClick={(e) => onEditEmissionData(e, item.id)}>
                    <CreateIcon />
                </IconButton>
            </Box>
        ),
    }));

    return (
        <CeroTable
            columns={getTableColumn[props.emissionType] || []}
            data={getEmissionData()}
            hasMore={false}
            loading={false}
            loadMore={onLoadMore}
            onSelectRow={onSelectEmissionData}
            classes={{ tableContainer: classes.tableContainer }}
        />
    )
}

export default EmissionTable;
