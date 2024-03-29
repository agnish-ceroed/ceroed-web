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

import CeroButton from '../../../components/CeroButton';
import CeroInput from '../../../components/CeroInput';
import ListComments from '../ListComment';
import ListAuditTrails from '../ListAuditTrails';
import ListEmissionFiles from '../ListEmissionFiles';
import ListTicketDrawer from '../../common/ListTicketsDrawer';
import CeroConfirmDrawer from '../../../components/CeroConfirmDrawer';
import useStyles from "./styles";

const TransportationDetails = (props) => {
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
            enqueueSnackbar('Transportation Combustion deleted successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onUpdateTransportation = () => {
        navigate(`/emissions/edit/transportation/${emissionId}`);
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
                    <Typography variant="h6" component="div" >Transportation</Typography>
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
                        <Grid item container direction={'column'} xs={6}>
                            <CeroInput
                                required
                                id="facility"
                                key="facility"
                                name="facility"
                                label="Facility"
                                fullWidth
                                value={emissionData.facility_name}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="month"
                                name="month"
                                label="Month"
                                fullWidth
                                value={emissionData.month}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="fuel"
                                key="fuel"
                                name="fuel"
                                label="Fuel"
                                fullWidth
                                value={emissionData.fuel}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="amountOfFuel"
                                key="amountOfFuel"
                                name="amountOfFuel"
                                label="Amount of Fuel"
                                value={emissionData.amount}
                                fullWidth
                                inputProps={{readOnly: true}}
                            />
                        </Grid>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroInput
                                required
                                id="emissionType"
                                name="emissionType"
                                label="Custom Emission Filter"
                                fullWidth
                                value={emissionData.emissionType}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="year"
                                key="year"
                                name="year"
                                label="Year"
                                fullWidth
                                value={emissionData.year}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="fuelUnit"
                                key="fuelUnit"
                                name="fuelUnit"
                                label="Fue lUnit"
                                fullWidth
                                value={emissionData.unit}
                                inputProps={{readOnly: true}}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.bottomContainer}>
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission Preview</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>: {emissionData.co2} tonnes</Typography>
                            <Typography className={classes.previewItem}>CH<sub>4</sub>: {emissionData.ch4} tonnes</Typography>
                            <Typography className={classes.previewItem}>BioFuel CO<sub>2</sub>: {emissionData.biofuel_co2} tonnes</Typography>
                        </Grid>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>e: {emissionData.co2e} tonnes</Typography>
                            <Typography className={classes.previewItem}>N<sub>2</sub>O: {emissionData.n2o} tonnes</Typography>
                            <Typography className={classes.previewItem}>EF: {emissionData.ef} kgCO<sub>2</sub>e/unit</Typography>
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
                {emissionData.status !== 'approved' && (
                    <CeroButton
                        buttonText="Update"
                        className={clsx(classes.button, classes.buttonPrimary)}
                        onClick={onUpdateTransportation}
                        disabled={isAuditor} />
                )}
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

export default TransportationDetails;
