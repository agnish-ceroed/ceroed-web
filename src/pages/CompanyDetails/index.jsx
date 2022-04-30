import { useEffect } from 'react'
import { Box, Container, Grid, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { getCompanyAuditHistory, getCompanyDetails } from '../../redux/actions'
import { STATUS } from '../../redux/constants'

import DashboardLayout from "../../layouts/DashboardLayout"
import AuditHistory from './AuditHistory'
import useStyles from "./styles"

const CompanyDetails = () => {
    const classes = useStyles()
    const { companyId } = useParams()
    const dispatch = useDispatch()
    
    const companyData = useSelector((state) => state.company.companyDetails)
    const auditHistory = useSelector((state) => state.company.auditHistory)

    const isLoading = companyData.status === STATUS.RUNNING || auditHistory.status === STATUS.RUNNING

    useEffect(() => {
        dispatch(getCompanyDetails(companyId))
        dispatch(getCompanyAuditHistory(companyId))
    }, [dispatch, companyId])

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                {!isLoading ? (
                    <>
                        <Box className={classes.topContainer}>
                            <Typography variant="h6" component="h6" className={classes.previewTitle}>{companyData.data.name}</Typography>
                            <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                                <Grid item container direction='column' xs={6}>
                                    <Typography className={classes.previewItem}>Email: {companyData.data.email}</Typography>
                                    <Typography className={classes.previewItem}>Phone: {companyData.data.phone}</Typography>
                                </Grid>
                                <Grid item container direction='column' xs={6}>
                                    <Typography className={classes.previewItem}>Website:  {companyData.data.website}</Typography>
                                    <Typography className={classes.previewItem}>Established year: {companyData.data.estd_year}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <AuditHistory auditData={auditHistory.data} />
                    </>
                ) : <Typography>Loading</Typography>}
            </Container>
        </DashboardLayout>
    )
}

export default CompanyDetails