import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box, Tabs, Tab, IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { resetAddCombustionStatus, deleteEmissions } from '../../../redux/actions';
import { getMonth } from '../../../services/utilityService';
import CeroButton from '../../../components/CeroButton';
import ListComments from '../ListComment';
import ListAuditTrails from '../ListAuditTrails';
import ListEmissionFiles from '../ListEmissionFiles';
import ListTicketDrawer from '../../common/ListTicketsDrawer';
import CeroConfirmDrawer from '../../../components/CeroConfirmDrawer';
import useStyles from "./styles";

const WaterConsumptionDetails = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, onCancel, isDeleteEnable, setIsDrawerOpen, isAuditor, company } = props

    const [value, setValue] = useState(0);
    const [showTickets, setShowTickets] = useState(false);
    const [displayWarning, setDisplayWarning] = useState(false);

    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Water Consumption deleted successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar(deleteEmissionData.message.message || "Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onUpdatePurchasedElectricity = () => {
        navigate(`/emissions/edit/water_consumption/${emissionId}`);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const onConfirmDelete = () => {
        const requestData = {
            id: emissionId
        }
        dispatch(deleteEmissions(requestData))
    };

    const onclickShowTickets = () => {
        setShowTickets(true);
    };

    const onCloseTickets = () => {
        setShowTickets(false);
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Box className={classes.header}>
                    <Typography variant="h6" component="div" >Water Consumptions</Typography>
                    <Box>
                        <CeroButton
                            variant="outlined"
                            buttonText="Raise a ticket"
                            className={classes.buttonSecondary}
                            onClick={() => setIsDrawerOpen(true)}
                        />
                        <IconButton onClick={onclickShowTickets}>
                            <AssignmentIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box className={classes.topContainer}>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction={'column'} xs={12}>
                            <Typography className={classes.previewItem}>Facility: {emissionData.facility_name}</Typography>
                            <Typography className={classes.previewItem}>Month and year: {getMonth[emissionData.month]} {emissionData.year}</Typography>
                            <Typography className={classes.previewItem}>Source: {emissionData.water_source_name}</Typography>
                            <Typography className={classes.previewItem}>Source type: {emissionData.water_source_type_name}</Typography>
                            <Typography className={classes.previewItem}>Stress type: {emissionData.water_source_stress_type_name}</Typography>
                            <Typography className={classes.previewItem}>Amount: {emissionData.amount}{emissionData.unit}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.bottomContainer}>
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>Usage: {emissionData.usage} {emissionData.usage_unit}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Back"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSecondary)}
                    onClick={props.onCancel} />
                {isDeleteEnable && <CeroButton
                    buttonText={<DeleteOutlineIcon />}
                    className={clsx(classes.button, classes.deleteButton)}
                    onClick={() => setDisplayWarning(true)} />}
                <CeroButton
                    buttonText="Update"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onUpdatePurchasedElectricity}
                    disabled={isAuditor} />
            </Box>
            <Box className={classes.tabContainer} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="emission tabs">
                    <Tab label="Comments" id="comments" />
                    <Tab label="Attachment" id="files" />
                    {!isAuditor && <Tab label="Audit History" id="audit-history" />}
                </Tabs>
            </Box>
            {value === 0 && <ListComments emissionId={emissionId} isAuditor={isAuditor} company={company}/>}
            {value === 2 && <ListAuditTrails emissionId={emissionId} isAuditor={isAuditor} company={company}/>}
            {value === 1 && <ListEmissionFiles emissionId={emissionId} isAuditor={isAuditor} company={company}/>}
            {displayWarning && <CeroConfirmDrawer
                isOpen={displayWarning}
                onClose={() => setDisplayWarning(false)}
                onConfirm={onConfirmDelete}
            />}
            {showTickets && <ListTicketDrawer isOpen={showTickets} scope="emission" scopeId={emissionId} onClose={onCloseTickets} isAuditor={isAuditor} company={company}/>}
        </Container>
    )
}

export default WaterConsumptionDetails;
