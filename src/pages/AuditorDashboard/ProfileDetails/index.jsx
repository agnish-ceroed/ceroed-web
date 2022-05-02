import React from "react";
// import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import CeroInfoPair from "../../../components/CeroInfoPair";
import useStyles from "./styles";

const auditorProdile = {
    name: 'Joe Eiden',
    role: 'Auditor',
    openTickets: 4,
    ticketRaised: 12,
    awaitingAction: 10,
    auditRequest: 100,
    auditCompleted: 29,
    pendingAudits: 71,
    componiesAssociated: 12,
}

const ProfileDetails = () => {
    const classes = useStyles();
    // const companyList = useSelector(state => state.company.companyList.data)

    return (
        <Box className={classes.container}>
            <Box className={classes.firstContainer}>
                <CeroInfoPair title="Role" value={auditorProdile.role} />
                <CeroInfoPair title="Number of Open Tickets" value={auditorProdile.openTickets} />
                <CeroInfoPair title="Number of Tickets Raised" value={auditorProdile.ticketRaised} />
                <CeroInfoPair title="Ticket Waiting for Action" value={auditorProdile.awaitingAction} />
            </Box>
            <Box className={classes.secondContainer}>
                <CeroInfoPair title="Audit Requests this Year" value={auditorProdile.auditRequest} />
                <CeroInfoPair title="Completed Audits" value={auditorProdile.auditCompleted} />
                <CeroInfoPair title="Pending Audits" value={auditorProdile.pendingAudits} />
                <CeroInfoPair title="Companies Associated" value={auditorProdile.componiesAssociated} />
            </Box>
        </Box>
    )
}

export default ProfileDetails