import { Box, Paper, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

import CeroButton from "../../components/CeroButton"
import useStyles from './styles'

const Home = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    return (
        <Box className={classes.container}>
            <Paper elevation={3} className={classes.card}>
                <Stack direction="column">
                    <Typography className={classes.title}>User Type</Typography>
                    <CeroButton buttonText="Business" className={classes.button} onClick={() => navigate('/login/business')} />
                    <CeroButton buttonText="Auditor" onClick={() => navigate('/login/auditor')} />
                </Stack>
            </Paper>
        </Box>
    )
}

export default Home