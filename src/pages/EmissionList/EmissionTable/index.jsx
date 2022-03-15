import React from 'react';
import { useNavigate } from 'react-router-dom';

import { StationaryColumns, MobileColumns } from './TableColumns'
import CeroButton from '../../../components/CeroButton';
import CeroTable from '../../../components/CeroTable';
import useStyles from "./styles";

const EmissionTable = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const getTableColumn = {
        stationary_combustion: StationaryColumns,
        mobile_combustion: MobileColumns
    }

    const onSelectEmissionData = (emission) => {
        navigate(`/emissions/${emission.id}`);
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
            loadMore={props.onLoadMore}
            onSelectRow={onSelectEmissionData}
        />
    )
}

export default EmissionTable;
