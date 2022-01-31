import { Typography, Grid } from '@mui/material';

import CeroInput from '../../../components/CeroInput'

const userDetails = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>User details</Typography>
            <CeroInput required id="name" label="Name" fullWidth />
            <CeroInput required id="email" label="Email address" fullWidth />
            <CeroInput required id="contactNo" label="Contact Number" fullWidth />
            <CeroInput required id="password" label="Password" fullWidth />
        </>
    );
}

export default userDetails
