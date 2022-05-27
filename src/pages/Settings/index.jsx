import { useState } from "react";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";

import DashboardLayout from '../../layouts/DashboardLayout'
import AccountSettings from "./AccountSettings";
import useStyles from "./styles";
import CompanySettingsForm from "./CompanySettingsForm";

const Settings = () => {
    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <Typography variant="h5" component="h5">Settings Page</Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Profile" id="profile" />
                        <Tab label="Company" id="compnay" />
                    </Tabs>
                </Box>
                {value === 0 && <AccountSettings />}
                {value === 1 && <CompanySettingsForm />}
            </Container>
        </DashboardLayout>
    );
};

export default Settings;