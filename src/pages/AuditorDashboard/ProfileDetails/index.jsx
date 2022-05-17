import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import CeroInfoPair from "../../../components/CeroInfoPair";
import useStyles from "./styles";

const ProfileDetails = () => {
    const classes = useStyles();
    const dashboardDetails = useSelector(state => state.company.dashboardSummary.data)

    return (
        <Box className={classes.container}>
            <Box className={classes.firstContainer}>
                <CeroInfoPair title="Role" value={dashboardDetails?.role} />
                <CeroInfoPair title="Number of Open Tickets" value={dashboardDetails?.open_ticket_count} />
                <CeroInfoPair title="Number of Tickets Raised" value={dashboardDetails?.total_ticket_raised} />
                <CeroInfoPair title="Ticket Waiting for Action" value={dashboardDetails?.total_ticket_waiting_action} />
            </Box>
            <Box className={classes.secondContainer}>
                <CeroInfoPair title="Audit Requests this Year" value={dashboardDetails?.auditor_request} />
                <CeroInfoPair title="Completed Audits" value={dashboardDetails?.auditor_request_completed} />
                <CeroInfoPair title="Pending Audits" value={dashboardDetails?.auditor_request_pending} />
                <CeroInfoPair title="Companies Associated" value={dashboardDetails?.company_associated} />
            </Box>
        </Box>
    )
}

export default ProfileDetails