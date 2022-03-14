import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import CreateIcon from '@mui/icons-material/CreateOutlined';
import CeroButton from '../../../components/CeroButton';

import CeroTable from '../../../components/CeroTable';
import {getEmissionsColumnConfig} from '../../../config/emission-table-column-config'
import useStyles from "./styles";

const EmissionTable = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const {emissionType, emissionData, onLoadMore} = props

    const onSelectEmissionData = (emission) => {
        navigate(`/emissions/edit/${emissionType}/${emission.id}`);
    };

    const getEmissionData = () => emissionData.map(item => ({
        ...item,
        action: emissionType === 'purchased_electricity' ? <IconButton>
        <CreateIcon  />
    </IconButton> : <CeroButton className={classes.button} buttonText="Audited" />
    }))


    return (
        <CeroTable
            columns={getEmissionsColumnConfig(emissionType)}
            data={getEmissionData()}
            hasMore={false}
            loading={false}
            loadMore={onLoadMore}
            onSelectRow={onSelectEmissionData}
        />
    )
}

export default EmissionTable;
