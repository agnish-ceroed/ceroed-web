import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Chip } from "@mui/material";
import CreateIcon from '@mui/icons-material/CreateOutlined';

import { StationaryColumns, MobileColumns, PurchasedElectricityColumns } from './TableColumns'
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
    }

    const onSelectEmissionData = (emission) => {
        navigate(`/emissions/edit/${emissionType}/${emission.id}`);
    };

    const getStatus = (status) => {
        if(status === 'approved') {
            return <Chip label={status} color="primary" variant='outlined'/>
        }else if(status === 'audited') {
            return <Chip label={status} color="secondary" variant='outlined'/>
        }else if(status === 'reported') {
            return <Chip label={status} color="warning" variant='outlined'/>
        } else {
            return <Chip label={status} color="info" variant='outlined'/>
        }
    };

    const getEmissionData = () => emissionData.map((item) => ({
        ...item,
        amount: `${item.amount}  ${item.unit}`,
        status: getStatus(item.status),
        action: (
            <Box className={classes.actionContainer}>
                {/* <CeroButton className={classes.button} buttonText={item.status} /> */}
                <IconButton className={classes.editIcon}>
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
        />
    )
}

export default EmissionTable;
