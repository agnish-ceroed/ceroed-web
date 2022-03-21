import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import CreateIcon from '@mui/icons-material/CreateOutlined';
import CeroButton from '../../../components/CeroButton';

import { StationaryColumns, MobileColumns } from './TableColumns'
import CeroButton from '../../../components/CeroButton';
import CeroTable from '../../../components/CeroTable';
import {getEmissionsColumnConfig} from '../../../config/emission-table-column-config'
import useStyles from "./styles";

const EmissionTable = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const {emissionType, emissionData, onLoadMore} = props

    const getTableColumn = {
        stationary_combustion: StationaryColumns,
        mobile_combustion: MobileColumns
    }

    const onSelectEmissionData = (emission) => {
        navigate(`/emissions/edit/${emissionType}/${emission.id}`);
    };

    const getEmissionData = () => props.emissionData.map((item) => ({
        ...item,
        amount: `${item.amount}  ${item.unit}`,
        action: <CeroButton className={classes.button} buttonText={item.status} />,
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
