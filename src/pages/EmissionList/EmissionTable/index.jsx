import React from 'react';
import { useNavigate } from 'react-router-dom';
import CeroButton from '../../../components/CeroButton';

import CeroTable from '../../../components/CeroTable';
import useStyles from "./styles";

const EmissionTable = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const columns = [{
        columnKey: 'fuel_id',
        columnId: 'fuel',
        columnHeader: 'Fuel',
    }, {
        columnKey: 'amount',
        columnId: 'amount',
        columnHeader: 'Amount',
    }, {
        columnKey: 'co2',
        columnId: 'co2',
        columnHeader: 'CO2(tonnes)',
    }, {
        columnKey: 'ch4',
        columnId: 'ch4',
        columnHeader: 'CH4(tonnes)',
    }, {
        columnKey: 'n2o',
        columnId: 'n2o',
        columnHeader: 'N2O(tonnes)',
    }, {
        columnKey: 'co2e',
        columnId: 'co2e',
        columnHeader: 'CO2e(tonnes)',
    }, {
        columnKey: 'biofuel',
        columnId: 'biofuel',
        columnHeader: 'BioFuel CO2(tonnes)',
    }, {
        columnKey: 'ef',
        columnId: 'ef',
        columnHeader: 'EF (kgCO2e/unit)',
    }, {
        columnKey: 'action',
        columnId: 'action',
        columnHeader: '',
    }]

    const onSelectEmissionData = (emission) => {
        navigate(`/emissions/${emission.id}`);
    };

    const getEmissionData = () => props.emissionData.map(item => ({
        ...item,
        action: <CeroButton className={classes.button} buttonText="Audited" />
    }))


    return (
        <CeroTable
            columns={columns}
            data={getEmissionData()}
            hasMore={false}
            loading={false}
            loadMore={props.onLoadMore}
            onSelectRow={onSelectEmissionData}
        />
    )
}

export default EmissionTable;
