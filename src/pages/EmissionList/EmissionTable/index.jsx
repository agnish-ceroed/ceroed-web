import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Chip, Typography } from "@mui/material";
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
    DevelopmentTrainingColumns,
    EmployeeHealthDetailsColumns,
    WorkerSafetyTrainingColumns,
    EmployeeDescriminationIncidentColumns,
    SupplierHumanRightsTrainigColumns,
    SocialHumanRightsTrainigColumns,
    SupplierScreeningColumns,
    LocalCommunitiesColumns,
    PoliticalContributionColumns,
} from "./TableColumns";
import CeroTable from '../../../components/CeroTable';
import useStyles from "./styles";
import { STATUS } from '../../../redux/constants';

const EmissionTable = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { emissionType, emissionData, onLoadMore, dataStatus } = props

    const getTableColumn = {
        stationary_combustion: StationaryColumns,
        mobile_combustion: MobileColumns,
        purchased_electricity: PurchasedElectricityColumns,
        water_discharge: WaterDischargeColumns,
        water_consumption: WaterConsumptionColumns,
        refrigerants: RefrigerantsColumns,
        transportation: TransportationColumns,
        waste: WasteCombustionColumns,
        development_training: DevelopmentTrainingColumns,
        employee_health_safety_incident_record: EmployeeHealthDetailsColumns,
        worker_safety_training_procedures: WorkerSafetyTrainingColumns,
        discrimination_incident_record: EmployeeDescriminationIncidentColumns,
        supplier_screening: SupplierScreeningColumns,
        operational_human_rights_training: SupplierHumanRightsTrainigColumns,
        social_engagement_human_rights_training: SocialHumanRightsTrainigColumns,
        local_communities: LocalCommunitiesColumns,
        political_contributions: PoliticalContributionColumns,
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
        amount: `${item.amount}  ${item.unit ? item.unit : ''}`,
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
        <>
            {dataStatus === STATUS.SUCCESS ? (
                <CeroTable
                columns={getTableColumn[props.emissionType] || []}
                data={getEmissionData()}
                hasMore={false}
                loading={false}
                loadMore={onLoadMore}
                onSelectRow={onSelectEmissionData}
                classes={{ tableContainer: classes.tableContainer }}
            />) : (
                <Box className={classes.loader}>
                    <Typography variant="h7" component="span">
                    {dataStatus === STATUS.RUNNING
                        ? "Loading..."
                        : dataStatus === STATUS.ERROR
                        ? "Something went wrong. Please try again later"
                        : ""}
                    </Typography>
                </Box>
            )}
        </>
    )
}

export default EmissionTable;
